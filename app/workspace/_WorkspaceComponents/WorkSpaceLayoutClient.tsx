'use client';

import { useWorkSpaceBuilderWithProvider } from '../context/WorkSpaceContext';
import NavigationBar from './NavigationBar';
import { ReactNode } from 'react';

interface WorkspaceLayoutClientProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function WorkspaceLayoutClient({
  children,
  sidebar,
}: WorkspaceLayoutClientProps) {
  const { setSidebarOpen } = useWorkSpaceBuilderWithProvider();

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <NavigationBar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 w-full overflow-hidden">
        {sidebar}
        <main className="flex-1 w-full p-4">{children}</main>
      </div>
    </div>
  );
}
