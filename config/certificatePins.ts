/**
 * Certificate Pinning Configuration
 *
 * This file contains the pinned certificate fingerprints for your API domains.
 * Update these when your certificates are rotated.
 *
 * To get a certificate fingerprint:
 * openssl s_client -servername DOMAIN -connect DOMAIN:PORT -showcerts </dev/null 2>/dev/null | openssl x509 -fingerprint -sha256 -noout
 */

import Constants from "expo-constants";

export interface CertificatePin {
  /** SHA256 fingerprint of the certificate (optional, kept for reference only) */
  fingerprint?: string;
  /** Human-readable description */
  description: string;
  /** Expiration date (for tracking) */
  expiresAt?: string;
  /** Whether this is the primary (current) certificate */
  isPrimary?: boolean;
  /** Optional base64(SHA256(SPKI public key)) hash for public key pinning */
  publicKeyHash?: string;
}

export interface DomainPins {
  /** Domain name this applies to */
  domain: string;
  /** List of pinned certificates for this domain */
  pins: CertificatePin[];
  /** Whether pinning is enforced for this domain */
  enforced: boolean;
}

// Certificate pins for example.com
// Load primary and backup pins from build-time injection if present
 const API_BASE_DOMAIN = process.env.EXPO_PUBLIC_BASE_API_DOMAIN; 
const injectedPins = (Constants.expoConfig?.extra as any)?.pins;
const injectedForDomain = injectedPins?.["mobileapp.wegagenbanksc.com.et"];
const injectedHashes: string[] = injectedForDomain?.publicKeyHashes || [];

const primaryHash = injectedHashes[0];
const backup1Hash = injectedHashes[1];
const backup2Hash = injectedHashes[2];

export const EXAMPLE_DOMAIN_PINS: DomainPins = {
  domain: "mobileapp.wegagenbanksc.com.et",
  enforced: true,
  pins: [
    {
      description: "Primary certificate (current)",
      isPrimary: true,
      publicKeyHash: primaryHash,
    },
    {
      description: "Backup 1 certificate for rotation",
      isPrimary: false,
      publicKeyHash: backup1Hash,
    },
    {
      description: "Backup 2 certificate for rotation",
      isPrimary: false,
      publicKeyHash: backup2Hash,
    },
  ],
};

// All domain pins configuration
export const CERTIFICATE_PINS: DomainPins[] = [
  EXAMPLE_DOMAIN_PINS,
  // Add other domains here if needed
];

/**
 * Get certificate pins for a specific domain
 */
export const getPinsForDomain = (domain: string): DomainPins | undefined => {
  return CERTIFICATE_PINS.find((config) => config.domain === domain);
};

export default {
  CERTIFICATE_PINS,
  getPinsForDomain,
};
