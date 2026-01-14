import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState, useEffect, useState } from 'react';
import { editWorkSpaceName } from '../_ServerActions/actions';
import { Loader2 } from 'lucide-react';

interface WorkSpaceNameChangeDialogProps {
  isOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  workSpaceName: string;
  setWorkSpaceName: (workSpaceName: string) => void;
  workspaceId: string;
}

export default function WorkSpaceNameChangeDialog({
  isOpen,
  setDialogOpen,
  setWorkSpaceName,
  workSpaceName,
  workspaceId,
}: WorkSpaceNameChangeDialogProps) {
  const [name, setName] = useState(workSpaceName);
  const [state, formAction, pending] = useActionState(editWorkSpaceName, {
    success: false,
    message: '',
  });

  useEffect(() => {
    if (state.success) {
      setWorkSpaceName(name);
      setDialogOpen(false);
    }
  }, [name, setDialogOpen, setWorkSpaceName, state.success]);

  return (
    <Dialog open={isOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Workspace Name</DialogTitle>
        </DialogHeader>
        <Label></Label>
        <form action={formAction} className="space-y-2">
          <Input name="workspaceId" value={workspaceId} type="hidden" />
          <Input
            disabled={pending}
            name="workSpaceName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-black/30"
          />
          {state.message && (
            <p className="text-sm text-red-500">{state.message}</p>
          )}
          <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>{' '}
        </form>
      </DialogContent>
    </Dialog>
  );
}
