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
import { Toaster, toast } from "react-hot-toast";
import { createUser } from "@/lib/createUser";
export default function SignupCard() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSignup = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const userData = userDetails;
    setUserDetails({ name: "", email: "", password: "" });
    toast.loading("Creating User...", { id: "signup-toast" });

    const response = await createUser(userData);

    if (response) {
      toast.success("User created successfully!", { id: "signup-toast" });
    } else {
      toast.error("Failed to Sign Up. Try Again!", { id: "signup-toast" });
    }
    setLoading(false);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validateForm = () => {
    if (
      !userDetails.name.trim() ||
      !userDetails.email.trim() ||
      !userDetails.password.trim()
    ) {
      toast.error("All fields are required!");
      return false;
    }

    if (!isValidEmail(userDetails.email)) {
      toast.error("Invalid email format!");
      return false;
    }

    return true;
  };

  return (
    <div className="w-full flex items-center justify-center ">
      <Toaster position="top-center" />
      <Card className="w-[70%] shadow-lg border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-bold text-gray-800 dark:text-white">
            <span className="text-[#006b60]">Car</span>
            <span className="text-[#FEC400]">Buk</span>
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Create a new account
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="bg-white dark:bg-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    email: e.target.value,
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
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full bg-[#FEC400] hover:bg-yellow-500 text-black font-semibold"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#FEC400] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
