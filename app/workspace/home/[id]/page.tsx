import prisma from '@/app/_DatabaseConfiguration/dbConfig';
import HomeClient from './HomeClient';
import { getSession } from '@/app/_ClientComponents/UtiltiyFunction';
import { redirect } from 'next/navigation';
import { getWorkSpaceForms } from '../_ServerComponents/actions';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const user = await getSession();
  const { id } = await params;
  const { page } = await searchParams;

  console.log(typeof page);

  const pageParam = Number(page);

  if (!user) {
    redirect('/login');
  }

  console.log(id);

  const workspace = await prisma.workSpaceSection.findFirst({
    where: {
      id: id,
      userId: user.id,
    },
  });

  // const workSpaceForms = await prisma.formData.findMany({
  //   where: {
  //     workspaceId: id,
  //     userId: user.id,
  //   },
  //   select: {
  //     id: true,
  //     formId: true,
  //     workspaceId: true,
  //     userId: true,
  //     headerConfig: {
  //       select: {
  //         formTitle: true,
  //         id:true
  //       },
  //     },
  //   },
  // });

  const data = await getWorkSpaceForms({
    workspaceId: id,
    userId: user.id,
    page: pageParam,
  });

  console.log(data);

  console.log('WorkSpace', workspace);

  if (!workspace) {
    return <div>WorkSpace not Found!</div>;
  }

  return (
    <HomeClient
      initialWorkSpaceName={workspace.workspacename}
      forms={data.forms}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      workspaceId={id}
    />
  );
}
