"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import toast, { Toaster } from "react-hot-toast";
import loginUser from "@/lib/loginUser";

export default function LoginCard() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    if (!userDetails.username.trim() || !userDetails.password.trim()) {
      toast.error("Username and password are required!");
      return;
    }
    const loginData = userDetails;
    setUserDetails({ username: "", password: "" });
    setLoading(true);
    toast.loading("Logging in...");

    const response = await loginUser(loginData.username, loginData.password); // ✅ Call API function

    if (response.success) {
      toast.dismiss();
      toast.success("Login successful!");
      router.push("/features/book-ride");
    } else {
      toast.dismiss();
      toast.error(response.error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex items-center justify-center ">
      <Toaster position="top-center" />
      <Card className="w-[85%] sm:w-[70%] shadow-lg border-none">
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
              <Label htmlFor="text">Username</Label>
              <Input
                id="text"
                type="text"
                placeholder="Enter your username"
                value={userDetails.username}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="bg-white dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
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
            disabled={loading}
          >
            {loading ? "Loading..." : "Log In"}
          </Button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don{`&apos`}t have an account?{" "}
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
