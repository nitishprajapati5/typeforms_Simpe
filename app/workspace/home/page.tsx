'use client';

import Image from 'next/image';
import { useWorkSpaceBuilder } from '../hooks/useWorkSpaceBuilder';
import { Button } from '@/components/ui/button';
import AddWorkSpaceDialog from '../_WorkspaceComponents/AddWorkSpace';

export default function HomePage({}) {
  const { isWorkSpaceDialogOpen, setWorkSpaceDialogOpen } =
    useWorkSpaceBuilder();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 flex-col items-center justify-center space-y-2">
        <Image src="/empty-box.svg" alt="Emplty Box" height={400} width={400} />
        <Button onClick={() => setWorkSpaceDialogOpen(!isWorkSpaceDialogOpen)}>
          Create WorkSpace
        </Button>
        <p className="text-md">OR</p>
        <p className="text-sm text-gray-500">
          Select WorkSpace already Created{' '}
        </p>
      </div>
      <AddWorkSpaceDialog
        isWorkSpaceDialogOpen={isWorkSpaceDialogOpen}
        setWorkSpaceDialogOpen={setWorkSpaceDialogOpen}
      />
    </div>
  );
}
