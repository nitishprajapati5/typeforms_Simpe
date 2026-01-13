import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useActionState, useEffect } from "react";
import { createWorkSpace } from "../_ServerActions/actions";
import { Loader2 } from "lucide-react";

interface AddWorkSpaceDialogProps {
  isWorkSpaceDialogOpen: boolean;
  setWorkSpaceDialogOpen: (open: boolean) => void;
}

export default function AddWorkSpaceDialog({
  isWorkSpaceDialogOpen,
  setWorkSpaceDialogOpen,
}: AddWorkSpaceDialogProps) {
  const [state, formAction, pending] = useActionState(createWorkSpace, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success === true) {
      setWorkSpaceDialogOpen(false);
    }
  }, [state.success]);

  return (
    <Dialog open={isWorkSpaceDialogOpen} onOpenChange={setWorkSpaceDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Workspace</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="workspacename mt-2">Workspace Name</Label>
            <Input
              id="workspacename"
              name="workspacename"
              placeholder="Add Workspace"
              className="mt-2"
            />
          </div>

          <Button type="submit" disabled={pending} className="w-full gap-2">
            {pending && <Loader2 className="animate-spin" />}
            {pending ? "Adding Workspace..." : "Add Workspace"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
