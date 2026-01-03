"use client";
import {
  ArrowDownAZIcon,
  Calendar,
  Ellipsis,
  Grid,
  List,
  Pen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useWorkSpaceBuilder } from "../hooks/useWorkSpaceBuilder";
import WorkSpaceNameChangeDialog from "../_WorkspaceComponents/Dialog";

export default function Home() {
  const { isDialogOpen, setDialogOpen,workSpaceName,setWorkSpaceName } = useWorkSpaceBuilder();

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="flex flex-row items-center gap-2 justify-between">
        <div className="flex flex-row items-center gap-2">
          <div>
            <h1 className="text-2xl font-bold">{workSpaceName || "Work Space Name"}</h1>
            <p className="text-gray-600">Create and manage your survey forms</p>
          </div>
          <div>
            <Ellipsis onClick={() => setDialogOpen(!isDialogOpen)} />
          </div>
        </div>

        <div className="flex">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-2 items-center text-sm">
                <Calendar size={16} />
                Date Created
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex gap-2 items-center text-sm">
                  <Pen size={16} />
                  Last Modified
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 items-center text-sm">
                  <ArrowDownAZIcon size={16} />
                  Alphabetical
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex gap-2 items-center ml-4">
            <List size={16} />
            <span className="text-sm">List</span>
            <Grid size={16} />
            <span className="text-sm">Grid</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Image src="/empty-box.svg" alt="Emplty Box" height={400} width={400} />
      </div>

      <WorkSpaceNameChangeDialog
        isOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        setWorkSpaceName={setWorkSpaceName}
        workSpaceName={workSpaceName}

      />
    </div>
  );
}
