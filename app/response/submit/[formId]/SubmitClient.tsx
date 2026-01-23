'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ThanksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="mx-auto h-14 w-14 text-green-500 mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>

        <p className="text-gray-600 mb-6">
          Your submission has been received successfully.
        </p>

        <Link
          href="/login"
          className="inline-block px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
