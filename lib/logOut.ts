"use server";
import { cookies } from "next/headers";
export default async function logOut() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  cookies().delete("username");
  cookies().delete("id");
}
