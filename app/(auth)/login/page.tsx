import { Suspense } from 'react';
import Login from './LoginPage';
import { Loader2 } from 'lucide-react';

export default function LoginSuspense() {
  return (
    <Suspense
      fallback={
        <div>
          <Loader2 />
        </div>
      }
    >
      <Login />
    </Suspense>
  );
}
