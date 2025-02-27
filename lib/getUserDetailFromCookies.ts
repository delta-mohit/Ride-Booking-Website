"use server";
import { cookies } from "next/headers";
export default async function getUserDetailFromCookies() {
  const username: string = cookies().get("username")?.value || "";
  const StringID: string = cookies().get("id")?.value || "";
  const id: number = parseInt(StringID, 10);
  return { username: username, id: id };
}
