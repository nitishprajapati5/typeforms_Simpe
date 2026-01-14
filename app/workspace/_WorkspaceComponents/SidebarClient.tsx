'use client';
import { useWorkSpaceBuilderWithProvider } from '../context/WorkSpaceContext';
import CustomSidebar from './Sidebar';
import { workSpaces } from '../types/Tworkspace';

export default function SidebarClient({
  sideBarClientWorkSpaceProps,
}: {
  sideBarClientWorkSpaceProps: workSpaces;
}) {
  const { sidebarOpen, setSidebarOpen } = useWorkSpaceBuilderWithProvider();

  return (
    <CustomSidebar
      open={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      customSideBarWorkSpaceProps={sideBarClientWorkSpaceProps}
    />
  );
}
