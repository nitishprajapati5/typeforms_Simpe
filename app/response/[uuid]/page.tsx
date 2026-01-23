import prisma from '@/app/_DatabaseConfiguration/dbConfig';
// import PreviewClient from './_ClientComponents/PreviewClient';
import { redirect } from 'next/navigation';
import ResponsePreviewClient from './_ClientComponent/ResponseUUIDClient';
import { getSession } from '@/app/_ClientComponents/UtiltiyFunction';

interface DynamicUUIDForPreview {
  params: Promise<{ uuid: string }>;
}

export default async function ResponseForm({ params }: DynamicUUIDForPreview) {
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

  const userData = await getSession();

  if (!userData) {
    redirect(`/login?response=true&uuid=${uuid}`);
  }

  const hasUserFilledTheForm = await prisma.responseFromUser.findUnique({
    where: {
      userId: userData?.id,
      isSubmitted: true,
    },
  });

  if (data.formSettings?.limitResponseToOne === true && hasUserFilledTheForm) {
    redirect('/response/submitted');
  }

  if (data.formSettings?.requiredSignIn && !userData) {
    redirect(`/login?response=true?uuid=${uuid}`);
  }

  //let responseFormId;

  const doesResponseExitForForm = await prisma.responseFromUser.findUnique({
    where: {
      formId: data.id,
      userId: userData.id,
    },
  });

  //responseFormId = doesResponseExitForForm?.id

  if (!doesResponseExitForForm) {
    await prisma.responseFromUser.create({
      data: {
        formId: data.id,
        userId: userData.id,
      },
    });

    //responseFormId = createEntryForResponse.id
  }
  return (
    <div>
      <ResponsePreviewClient data={data} formId={data.id!} />
    </div>
  );
}
