"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { email, password });
    // Add authentication logic here
  };

  return (
    <div className="w-full flex items-center justify-center ">
      <Card className="w-[70%] shadow-lg border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-bold text-gray-800 dark:text-white">
            <span className="text-[#006b60]">Car</span>
            <span className="text-[#FEC400]">Buk</span>
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Log in to your account
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white dark:bg-gray-800"
              />
            </div>
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-gray-500 text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full bg-[#FEC400] hover:bg-yellow-500 text-black font-semibold"
            onClick={handleLogin}
          >
            Log In
          </Button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#FEC400] font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
