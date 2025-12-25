// utils/fetchData.ts
import { ENDPOINTS, headers } from "./client";
import { setIsLoading } from "../features/data/dataSlice";
import { store, AppDispatch } from "../store";
import * as SecureStore from "expo-secure-store";
import { publicKeyPinnedAdapter } from "./publicKeyPinning";
import Constants from "expo-constants";
import axios from "axios"
import { RefreshTokenRequest } from "@/types/request";
import { LoginResponse } from "@/types/response";
// Create axios instance with SSL pinning adapter
const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
const isProduction = Constants.expoConfig?.extra?.isProduction || false;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  // Use public key pinning in production
  ...(isProduction && { adapter: publicKeyPinnedAdapter }),
});

// Initialize SSL pinning at module load


export default async function fetchData<TRequest, TResponse>(
  url: string,
  request: TRequest,
  toastService?: any,
  background?: boolean,
  timeoutDuration = 60000
): Promise<TResponse> {
  const dispatch: AppDispatch = store.dispatch;
  const jwt = await SecureStore.getItemAsync("jwt");

  try {
    if (!background) {
      dispatch(setIsLoading(true));
    }

    // Ensure SSL pinning is initialized (only for production)
    

    // Configure request with timeout
    const source = axios.CancelToken.source();
    const timeoutId = setTimeout(() => {
      source.cancel("Request timed out");
    }, timeoutDuration);

    // Make request using axios instance
    const response = await axiosInstance.post(url, request, {
      headers: {
        ...headers,
        Authorization: `Bearer ${jwt}`,
      },
      cancelToken: source.token,
    });

    clearTimeout(timeoutId);

    // Extract data from axios response
    const data: TResponse = response.data;
    console.log("res ",response)
    return data;
  } catch (error: any) {
    // clearTimeout(timeoutId);

    // Handle SSL pinning errors
    if (
      error.code === "CERT_PINNING_FAILED" ||
      error.name === "PublicKeyPinningError"
    ) {
      console.error("SSL Pinning Error:", error);
      if (toastService) {
        toastService.show("Security Error: Could not verify server identity.", {
          type: "danger",
        });
      }
      throw new Error(
        `SSL Pinning failed: The server's certificate does not match the trusted key.`
      );
    }

    // Handle timeout errors
    if (error.code === "ECONNABORTED" || error.message?.includes("timed out")) {
      if (toastService && !background) {
        toastService.show("Request timed out", { type: "warning" });
      }
      throw new Error("Request timed out");
    }

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      try {
        const newJwt = await refreshJwtToken(toastService);

        // Retry request with new token
        const retryResponse = await axiosInstance.post(url, request, {
          headers: {
            ...headers,
            Authorization: `Bearer ${newJwt}`,
          },
        });
console.log("res retry",retryResponse)
        return retryResponse.data as TResponse;
      } catch (refreshError:any) {
        throw new Error(
          `Authentication failed: ${refreshError.message || refreshError}`
        );
      }
    }

    // Handle other HTTP errors
    if (error.response) {
      throw new Error(
        `Network response was not ok: ${error.response.status} ${error.response.statusText}`
      );
    }

    // Handle generic errors
    throw new Error(
      `An error occurred while fetching data: ${error.message || error}`
    );
  } finally {
    if (!background) {
      dispatch(setIsLoading(false));
    }
  }
}

async function refreshJwtToken(toastService?: any): Promise<string> {
  try {
    const imei = await SecureStore.getItemAsync("imei");
    const phone = await SecureStore.getItemAsync("phone");
    const pin = await SecureStore.getItemAsync("pin");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    const refreshTokenReq: RefreshTokenRequest = {
      imei: imei || "",
      phone: phone || "",
      pin: pin || "",
      refresh_token: refreshToken || "",
    };

    // Use axios instance for refresh token request
    const response = await axiosInstance.post(
      ENDPOINTS.RefreshToken,
      refreshTokenReq,
      {
        headers: { ...headers },
      }
    );

    const data: LoginResponse = response.data;
    await SecureStore.setItemAsync("jwt", data.JWT);
    return data.JWT;
  } catch (error: any) {
    // Error handling for SSL pinning failures in token refresh
    if (
      error.code === "CERT_PINNING_FAILED" ||
      error.name === "PublicKeyPinningError"
    ) {
      if (toastService) {
        toastService.show("Critical Security Error during authentication.", {
          type: "danger",
        });
      }
      throw new Error(
        `SSL Pinning failed during token refresh: ${error.message}`
      );
    }

    throw new Error(`Error refreshing token: ${error.message || error}`);
  }
}

// Export axios instance for direct use if needed
export { axiosInstance };
