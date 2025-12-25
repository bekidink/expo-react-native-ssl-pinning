/**
 * Public Key Pinning Implementation
 * Using react-native-ssl-public-key-pinning for better stability
 */

import { initializeSslPinning } from 'react-native-ssl-public-key-pinning';
import { getPinsForDomain } from '../config/certificatePins';
import Constants from 'expo-constants';
// Debug logger removed for production cleanup

/**
 * Initialize SSL pinning with domain configurations
 * This should be called once at app startup
 */
export const initializePublicKeyPinning = async (): Promise<void> => {
  const API_BASE_DOMAIN = process.env.EXPO_PUBLIC_BASE_API_DOMAIN;

  try {
    // Starting public key pinning initialization

    // Prefer build-time injected pins from app.config.js (extra.pins)
    const injectedPins = (Constants.expoConfig?.extra as any)?.publicKeyHashes;
    let publicKeyHashes: string[] | undefined;
    console.log(publicKeyHashes, Constants.expoConfig?.extra);
    if (injectedPins && injectedPins[`${API_BASE_DOMAIN}`]) {
      publicKeyHashes = injectedPins[`${API_BASE_DOMAIN}`];
    }

    // Fallback to local config file if no build-time pins
    if (!publicKeyHashes || publicKeyHashes.length === 0) {
      const localPins = getPinsForDomain(`${API_BASE_DOMAIN}`);
      if (!localPins || localPins.pins.length === 0) {
        // No certificate pins configured for example domain
        return;
      }
      publicKeyHashes = localPins.pins
        .filter((pin: any) => pin.publicKeyHash)
        .map((pin: any) => pin.publicKeyHash as string);
    }

    if (!publicKeyHashes || publicKeyHashes.length === 0) {
      // No valid public key hashes found in pin configuration
      return;
    }

    const pinningConfig = {
      'mobileapp.wegagenbanksc.com.et': {
        includeSubdomains: false,
        publicKeyHashes,
      },
    };

    // Initializing SSL pinning
    await initializeSslPinning(pinningConfig);
    // SSL pinning initialized successfully
  } catch (error) {
    console.log('SSL pinning ', error);
    // Failed to initialize SSL pinning
    // Don't throw - allow app to continue without pinning
  }
};

/**
 * Simple axios adapter that uses standard fetch after SSL pinning is initialized
 * Since react-native-ssl-public-key-pinning works globally, we just use regular axios
 */
export const publicKeyPinnedAdapter = (config: any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Making request with public key pinning

      // Just use normal axios behavior since SSL pinning is initialized globally
      const axios = require('axios');

      // IMPORTANT: Avoid recursion by removing adapter before forwarding the request
      const { adapter: _ignoredAdapter, ...forwardConfig } = config || {};

      // Executing axios request
      const response = await axios.request({
        ...forwardConfig,
        adapter: undefined,
      });

      // Request completed successfully with public key pinning
      resolve(response);
    } catch (error) {
      // Request failed, checking error type

      // Check if it's a certificate/SSL error
      const errorMessage = (error as any)?.message || '';
      const errorCode = (error as any)?.code || '';

      if (
        errorMessage.includes('certificate') ||
        errorMessage.includes('SSL') ||
        errorMessage.includes('TLS') ||
        errorMessage.includes('pinning') ||
        errorCode.includes('SSL') ||
        errorCode.includes('CERT')
      ) {
        const axiosLikeError: any = new Error(
          'Certificate validation failed - secure connection could not be established'
        );
        axiosLikeError.code = 'CERT_PINNING_FAILED';
        axiosLikeError.config = config;
        axiosLikeError.response = undefined;
        axiosLikeError.isAxiosError = true;
        axiosLikeError.name = 'PublicKeyPinningError';

        // SSL/Certificate/Pinning error detected
        reject(axiosLikeError);
      } else {
        // Non-SSL error, passing through
        reject(error);
      }
    }
  });
};

export default {
  initializePublicKeyPinning,
  publicKeyPinnedAdapter,
};
