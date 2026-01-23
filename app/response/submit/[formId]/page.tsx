import prisma from '@/app/_DatabaseConfiguration/dbConfig';
import ThanksPage from './SubmitClient';

interface formIdProps {
  params: Promise<{ formId: string }>;
}

export default async function SubmitPage({ params }: formIdProps) {
  const { formId } = await params;

  await prisma.responseFromUser.update({
    where: {
      formId: formId,
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
