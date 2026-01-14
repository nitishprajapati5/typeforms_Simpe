// "use client"

// import NavigationBar from "./_WorkspaceComponents/NavigationBar"
// // import CustomSidebar from "./_WorkspaceComponents/Sidebar"
// import { useWorkSpaceBuilder } from "./hooks/useWorkSpaceBuilder"
// import SidebarShell from "./_WorkspaceComponents/SidebarShell"
// export default function WorkspaceLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   //const [sidebarOpen, setSidebarOpen] = useState(false)
//   const {setSidebarOpen} = useWorkSpaceBuilder()

//   return (
//     <div className="h-screen w-full flex flex-col overflow-hidden">
//       {/* 🔝 Navbar */}
//       <NavigationBar onMenuClick={() => setSidebarOpen(true)} />

//       {/* ⬇ Sidebar + Content */}
//       <div className="flex flex-1 w-full overflow-hidden">
//         {/* Sidebar */}
//         {/* <CustomSidebar
//           open={sidebarOpen}
//           onClose={() => setSidebarOpen(false)}
//         /> */}
//         <SidebarShell />

//         {/* Main Content (fixed, no scroll) */}
//         <main className="flex-1 w-full p-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }

// import {  useWorkSpaceBuilderWithProvider, WorkSpaceProvider } from "./context/WorkSpaceContext"
// import NavigationBar from "./_WorkspaceComponents/NavigationBar"
// import SidebarShell from "./_ServerComponents/SidebarShell"

// export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <WorkSpaceProvider>
//       <LayoutBody>{children}</LayoutBody>
//     </WorkSpaceProvider>
//   )
// }

// function LayoutBody({ children }: { children: React.ReactNode }) {

//   const {setSidebarOpen} = useWorkSpaceBuilderWithProvider()

//   return (
//     <div className="h-screen w-full flex flex-col overflow-hidden">
//       <NavigationBar onMenuClick={() => setSidebarOpen(true)} />

//       <div className="flex flex-1 w-full overflow-hidden">
//         <SidebarShell />
//         <main className="flex-1 w-full p-4">{children}</main>
//       </div>
//     </div>
//   )
// }

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
