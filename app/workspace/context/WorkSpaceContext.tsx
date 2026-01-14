'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type WorkSpaceContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  isDialogOpen: boolean;
  setDialogOpen: (v: boolean) => void;
  workSpaceName: string;
  setWorkSpaceName: (v: string) => void;
  isWorkSpaceDialogOpen: boolean;
  setWorkSpaceDialogOpen: (v: boolean) => void;
};

const WorkSpaceContext = createContext<WorkSpaceContextType | null>(null);

export function WorkSpaceProvider({ children }: { children: ReactNode }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [workSpaceName, setWorkSpaceName] = useState('WorkSpace Name');
  const [isWorkSpaceDialogOpen, setWorkSpaceDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <WorkSpaceContext.Provider
      value={{
        isDialogOpen,
        setDialogOpen,
        workSpaceName,
        setWorkSpaceName,
        isWorkSpaceDialogOpen,
        setWorkSpaceDialogOpen,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </WorkSpaceContext.Provider>
  );
}

export function useWorkSpaceBuilderWithProvider() {
  const ctx = useContext(WorkSpaceContext);
  if (!ctx)
    throw new Error(
      'useWorkSpaceBuilder must be used inside WorkSpaceProvider'
    );
  return ctx;
}
