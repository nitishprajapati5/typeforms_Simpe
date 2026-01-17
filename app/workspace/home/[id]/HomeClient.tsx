'use client';
import {
  ArrowDownAZIcon,
  Calendar,
  Ellipsis,
  Grid,
  List,
  Pen,
  PlusCircleIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWorkSpaceBuilder } from '../../hooks/useWorkSpaceBuilder';
import WorkSpaceNameChangeDialog from '../../_WorkspaceComponents/WorkSpaceNameChangeDialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { TworkSpaceFormDetails } from '../../types/TworkSpaceFormDetail';
import { WorkSpaceFormsTable } from '../_ClientComponents/WorkSpaceFormsTable';

interface HomeClientProps {
  initialWorkSpaceName: string;
  forms: TworkSpaceFormDetails;
  currentPage: number;
  totalPages: number;
  workspaceId: string;
}

export default function HomeClient({
  workspaceId,
  forms,
  totalPages,
  currentPage,
  initialWorkSpaceName,
}: HomeClientProps) {
  const router = useRouter();
  const { isDialogOpen, setDialogOpen, setWorkSpaceName } =
    useWorkSpaceBuilder();

  return (
    <div className="min-h-screen flex flex-col p-4 overflow-auto">
      <div className="flex flex-row items-center gap-2 justify-between">
        <div className="flex flex-row items-center gap-2">
          <div>
            <h1 className="text-2xl font-bold">
              {initialWorkSpaceName || 'Work Space Name'}
            </h1>
            <p className="text-gray-600">Create and manage your forms</p>
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

      <div className="mt-2 flex justify-end">
        <Button onClick={() => router.push(`/form/build/${workspaceId}`)}>
          <PlusCircleIcon /> Create a new form
        </Button>
      </div>

      <WorkSpaceFormsTable
        forms={forms}
        currentPage={currentPage}
        totalPages={totalPages}
        workspaceId={workspaceId}
      />

      <WorkSpaceNameChangeDialog
        isOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        setWorkSpaceName={setWorkSpaceName}
        workSpaceName={initialWorkSpaceName}
        workspaceId={workspaceId}
      />
    </div>
  );
}
