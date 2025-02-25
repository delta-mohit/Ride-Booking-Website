"use server";
import { cookies } from "next/headers";
export default async function setTokenInCookies(
  accessToken: string,
  refreshToken: string
) {
  const isProduction = process.env.NODE_ENV === "production";
  cookies().set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    sameSite: "strict",
    secure: isProduction,
    path: "/",
    maxAge: 30 * 24 * 60 * 60, //30 days in seconds
  });
  cookies().set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    sameSite: "strict",
    secure: isProduction,
    path: "/",
    maxAge: 30 * 24 * 60 * 60, //30 days in seconds
  });
}
