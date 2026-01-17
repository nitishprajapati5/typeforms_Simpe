import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col space-y-2 items-center justify-center h-screen">
      <Loader2 className="w-12 h-12 animate-spin" />
      <p>Loading your forms...</p>
    </div>
  );
}
