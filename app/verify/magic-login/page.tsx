import prisma from '@/app/_DatabaseConfiguration/dbConfig';
import MagicLinkPage from './_ClientComponents/MagicLink';
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <div>Invalid Link. Not token provided.</div>;
  }

  const isTokenValidateWithTime = await prisma.user.findFirst({
    where: {
      magicToken: token,
      magicExpiresAt: { gt: new Date() },
    },
  });

  if (!isTokenValidateWithTime) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 mb-6">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Link Expired or Invalid
          </h2>
          <p className="mt-3 text-slate-600">
            For your security, magic links are only valid for a short time and
            can only be used once.
          </p>

          <div className="mt-8">
            <a
              href="/login"
              className="inline-flex w-full justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <MagicLinkPage token={token} />;
}
