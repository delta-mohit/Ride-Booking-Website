"use server";
import { cookies } from "next/headers";
export default async function setTokenInCookies(
  id: number,
  username: string,
  accessToken: string,
  refreshToken: string
) {
  const isProduction = process.env.NODE_ENV === "production";
  const StringID = id.toString();
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
  cookies().set({
    name: "username",
    value: username,
    httpOnly: true,
    sameSite: "strict",
    secure: isProduction,
    path: "/",
    maxAge: 30 * 24 * 60 * 60, //30 days in seconds
  });
  cookies().set({
    name: "id",
    value: StringID,
    httpOnly: true,
    sameSite: "strict",
    secure: isProduction,
    path: "/",
    maxAge: 30 * 24 * 60 * 60, //30 days in seconds
  });
}
