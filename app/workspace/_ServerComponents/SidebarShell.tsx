import prisma from '@/app/_DatabaseConfiguration/dbConfig';
import SidebarClient from '../_WorkspaceComponents/SidebarClient';
import { getSession } from '@/app/_ClientComponents/UtiltiyFunction';
import { redirect } from 'next/navigation';

export default async function SidebarShell() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  const workspaces = await prisma.workSpaceSection.findMany({
    where: { isDeleted: false, userId: session.id },
    orderBy: { workspacename: 'asc' },
  });

  console.log(workspaces);

  return <SidebarClient sideBarClientWorkSpaceProps={workspaces} />;
}
