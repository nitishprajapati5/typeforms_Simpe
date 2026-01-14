'use client';
import { useActionState } from 'react';
import { verifyMagicLinkAction } from '../_ServerActions/action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MagicLinkPage({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(verifyMagicLinkAction, {
    success: false,
    message: '',
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md text-center">
        <h1 className="text-xl font-bold text-gray-900">
          Sign In with Code and Magic Link
        </h1>
        <p className="mt-3 text-gray-600">Click here to login</p>

        <form action={formAction} className="mt-6 space-y-3">
          <input type="hidden" name="token" value={token} />
          <Input type="" name="code" placeholder="Enter your code" />

          <Button
            disabled={isPending}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isPending ? 'Verifying...' : 'Sign In'}
          </Button>
        </form>

        {state?.success === false && (
          <p className="mt-4 text-sm text-red-600 font-medium">
            {state.message}
          </p>
        )}
      </div>
    </div>
  );
}
