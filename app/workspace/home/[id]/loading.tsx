import { Loader2 } from 'lucide-react';

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm z-50">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p>Loading your workspace</p>
    </div>
  );
}
