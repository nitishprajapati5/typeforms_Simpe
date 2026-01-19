'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { login } from '../_ServerActions/actions';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(login, {
    success: false,
    message: '',
  });

  return (
    <form action={formAction} className="w-1/2 justify-center items-center">
      <div className="flex flex-col space-y-4">
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

        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border-2 border-gray-300 rounded-md"
        />

        {state?.success === false && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}

        {!pending ? (
          <Button type="submit" className="mt-4">
            Login
          </Button>
        ) : (
          <Loader2 className="animate-spin w-full items-center" />
        )}

        <Button type="button" className="flex gap-2">
          <Image
            src="/google_icon.png"
            width={20}
            height={20}
            alt="Google Login"
          />
          Login with Google
        </Button>

        <Button type="button" onClick={() => router.push('/magic-link')}>
          Login with Magic Link
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={() => router.push('/signup')}
        >
          Create an Account
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={() => router.push('/forgot-password')}
        >
          Forgot Password?
        </Button>
      </div>
    </form>
  );
}
