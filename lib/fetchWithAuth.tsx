"use server";
import { cookies } from "next/headers";

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const accessToken = cookies().get("accessToken")?.value;

  // 🔹 Make an API request with the access token
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // 🔹 If the token is expired, refresh it
  if (response.status === 401) {
    console.log("Token expired, attempting refresh...");

    const refreshToken = cookies().get("refreshToken")?.value;
    const refreshResponse = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      credentials: "include",
    });

    const refreshData = await refreshResponse.json();

    if (!refreshResponse.ok) {
      console.log("Refresh failed. Logging out...");
      return null; // Handle logout here
    }

    // 🔹 Save the new tokens
    cookies().set("accessToken", refreshData.accessToken);
    cookies().set("refreshToken", refreshData.refreshToken);

    console.log("Token refreshed, retrying request...");

    // 🔹 Retry the original request with the new token
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${refreshData.accessToken}`,
      },
    });
  }

  return response;
}
export default fetchWithAuth;
