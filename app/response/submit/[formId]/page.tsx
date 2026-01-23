import prisma from '@/app/_DatabaseConfiguration/dbConfig';
import ThanksPage from './SubmitClient';
import { getSession } from '@/app/_ClientComponents/UtiltiyFunction';

interface formIdProps {
  params: Promise<{ formId: string }>;
}

export default async function SubmitPage({ params }: formIdProps) {
  const { formId } = await params;
  const session = await getSession();

  if (!session) {
    alert('Something went wrong');
  }

  await prisma.responseFromUser.update({
    where: {
      formId: formId,
      userId: session?.id,
    },
    data: {
      isSubmitted: true,
    },
  });

  return (
    <div>
      <ThanksPage />
    </div>
  );
}
