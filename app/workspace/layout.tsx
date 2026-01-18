import { WorkSpaceProvider } from './context/WorkSpaceContext';
import SidebarShell from './_ServerComponents/SidebarShell';
import WorkspaceLayoutClient from './_WorkspaceComponents/WorkSpaceLayoutClient';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkSpaceProvider>
      <WorkspaceLayoutClient sidebar={<SidebarShell />}>
        {children}
      </WorkspaceLayoutClient>
    </WorkSpaceProvider>
  );
}
