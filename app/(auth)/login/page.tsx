"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-1/2 space-y-4">
      <h1 className="font-bold text-2xl">Login</h1>
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input
        id="email"
        placeholder="Email"
        className="border-2 border-gray-300 rounded-md  transition-colors duration-300"
      />

      <label htmlFor="password" className="text-sm font-medium">
        Password
      </label>
      <Input
        id="password"
        placeholder="Password"
        type="password"
        className="border-2 border-gray-300 rounded-md  transition-colors duration-300"
      />

      <Button className="mt-4 cursor-pointer">Login</Button>
      <Button className="cursor-pointer">
        <Image
          src="/google_icon.png"
          width={20}
          height={20}
          alt="Google Login"
        />
        Login with Google
      </Button>
      <Button className="cursor-pointer">Login with Magic Link</Button>
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => router.push("/signup")}
      >
        Create an Account
      </Button>
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => router.push("/forgot-password")}
      >
        Forgot Password?
      </Button>
    </div>
  );
}
