import {
  ActionResponse,
  getSession,
} from '@/app/_ClientComponents/UtiltiyFunction';
import { redirect } from 'next/navigation';

export function withAuth<T>(
  handler: (
    user: { id: string; email: string },
    formData: FormData
  ) => Promise<ActionResponse<T>>
) {
  return async (prevState: ActionResponse<T>, formData: FormData) => {
    const user = await getSession();

    console.log('User in with Auth Guard', user);

    if (!user) {
      //   return {
      //     success: false,
      //     message: "Unauthorized"
      //   }
      redirect('/login');
    }

    return handler(user, formData);
  };
}
