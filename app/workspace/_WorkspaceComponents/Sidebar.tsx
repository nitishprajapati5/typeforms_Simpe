'use client';

import { Blocks, PlusCircle } from 'lucide-react';
import { useWorkSpaceBuilder } from '../hooks/useWorkSpaceBuilder';
import AddWorkSpaceDialog from './AddWorkSpace';
import { workSpace, workSpaces } from '../types/Tworkspace';
import Link from 'next/link';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  customSideBarWorkSpaceProps: workSpaces;
};

export default function CustomSidebar({
  open,
  onClose,
  customSideBarWorkSpaceProps,
}: SidebarProps) {
  const { isWorkSpaceDialogOpen, setWorkSpaceDialogOpen } =
    useWorkSpaceBuilder();

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-64 bg-background border-r
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0
        `}
      >
        <div className="p-4 flex items-center flex-row justify-between">
          <div className="flex">
            <Blocks />
            <span className="ml-2 font-normal">WorkSpace</span>
          </div>
          <div>
            <PlusCircle
              onClick={() => {
                setWorkSpaceDialogOpen(!isWorkSpaceDialogOpen);
              }}
            />
          </div>
        </div>

        <div className="m-4 space-y-1">
          {customSideBarWorkSpaceProps.map((csp: workSpace) => (
            <div
              key={csp.id}
              className="
                px-3 py-2
                w-full
                rounded-lg
                font-medium text-sm
                text-gray-700
                truncate
                cursor-pointer
                transition-all
                hover:bg-gray-100
                hover:text-gray-900
                active:bg-gray-200
              "
              title={csp.workspacename}
            >
              <Link href={`/workspace/home/${csp.id}`}>
                {csp.workspacename}
              </Link>
            </div>
          ))}
        </div>

        <AddWorkSpaceDialog
          isWorkSpaceDialogOpen={isWorkSpaceDialogOpen}
          setWorkSpaceDialogOpen={setWorkSpaceDialogOpen}
        />
      </aside>
    </>
  );
}
