"use client"

import { useState } from "react"
import NavigationBar from "./_WorkspaceComponents/NavigationBar"
import CustomSidebar from "./_WorkspaceComponents/Sidebar"

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* 🔝 Navbar */}
      <NavigationBar onMenuClick={() => setSidebarOpen(true)} />

      {/* ⬇ Sidebar + Content */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Sidebar */}
        <CustomSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content (fixed, no scroll) */}
        <main className="flex-1 w-full p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
