"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, SearchCode, Blocks, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkSpaceBuilder } from "../hooks/useWorkSpaceBuilder";
import AddWorkSpaceDialog from "./AddWorkSpace";
import { workSpace, workSpaces } from "../types/Tworkspace";
import Link from "next/link";

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
  const router = useRouter();
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
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
      >
        {/* Create Form Button */}
        <div className="p-4 mt-auto">
          <Button
            onClick={() => router.push("/form/build")}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground py-2"
          >
            <Plus size={16} />
            Create a new Form
          </Button>
        </div>

        <div className="p-4 relative">
          <SearchCode
            size={16}
            className="absolute left-6 top-1/2 transform -translate-y-1/2"
          />
          <Input
            placeholder="Search the Forms"
            className="pl-10 border-2 border-gray-300"
          />
        </div>

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
              <Link href={`/workspace/home/${csp.id}`}>{csp.workspacename}</Link>
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
