"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { magicLink } from "../_ServerActions/actions";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function MagicLink() {
  const router = useRouter();
  const [state, formAction] = useActionState(magicLink, {
    success: false,
    message: "",
  });

  const { pending } = useFormStatus();

  if(state.success){
    toast.success("Magic link send! Check your email.")
  }

  return (
    <form action={formAction} className="w-1/2 justify-center items-center">
      <div className="flex flex-col space-y-3">
        <h1 className="font-bold text-2xl">Login</h1>

        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border-2 border-gray-300 rounded-md w-full"
        />

        {state?.success === false && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}

        {!pending ? (
          <Button type="submit" className="mt-4">
            Login
          </Button>
        ) : (
          <Loader2 className="animate-spin" />
        )}

        <Button type="button" onClick={() => router.push("/login")}>
          Login with Credentials
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={() => router.push("/signup")}
        >
          Create an Account
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={() => router.push("/forgot-password")}
        >
          Forgot Password?
        </Button>
      </div>
    </form>
  );
}
