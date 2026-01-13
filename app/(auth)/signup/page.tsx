"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signup } from "../_ServerActions/actions";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [state, formAction] = useActionState(signup, {
    success:false,
    message:""
  });
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="flex w-full justify-center">
      <div className="flex flex-col w-1/2 space-y-4">
        <h1 className="font-bold text-2xl">Sign Up</h1>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          placeholder="Email"
          name="email"
          className="border-2 border-gray-300 rounded-md  transition-colors duration-300"
        />

        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          name="password"
          className="border-2 border-gray-300 rounded-md  transition-colors duration-300"
        />

        {state?.success === false && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        {!pending ? (
          <Button type="submit" className="mt-4">
            Sign Up
          </Button>
        ) : (
          <Loader2 className="animate-spin" />
        )}
        <Button className="cursor-pointer">
          <Image
            src="/google_icon.png"
            width={20}
            height={20}
            alt="Google Login"
          />
          Sign Up with Google
        </Button>
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Already have an Account? Login
        </Button>
      </div>
    </form>
  );
}
