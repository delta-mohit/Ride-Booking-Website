"use server";
import { cookies } from "next/headers";
import fetchWithAuth from "./fetchWithAuth";

export const fetchUserData = async () => {
  try {
    const accessToken = cookies().get("accessToken")?.value; // Get token from cookies

    if (!accessToken) {
      console.warn("No access token found!");
      return;
    }
    const response = await fetchWithAuth("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass JWT in headers
      },
      credentials: "include", // Ensure cookies are included
    });
    if (!response) {
      console.warn(
        "fetchWithAuth returned null, likely due to token refresh failure."
      );
      return null;
    }
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
