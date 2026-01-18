import prisma from '@/app/_DatabaseConfiguration/dbConfig';
import PreviewClient from './_ClientComponents/PreviewClient';
import { redirect } from 'next/navigation';

interface DynamicUUIDForPreview {
  params: Promise<{ uuid: string }>;
}

export default async function PreviewForm({ params }: DynamicUUIDForPreview) {
  const { uuid } = await params;

  const data = await prisma.formData.findUnique({
    where: {
      formId: uuid,
    },
    include: {
      formDesign: true,
      formSettings: true,
      headerConfig: true,
      questions: true,
    },
  });

  console.log(data);

  if (!data) {
    redirect('/login');
  }

  return (
    <div>
      <PreviewClient data={data} />
    </div>
  );
}
