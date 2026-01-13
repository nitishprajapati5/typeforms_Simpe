import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

interface AddWorkSpaceDialogProps {
  isWorkSpaceDialogOpen: boolean;
  setWorkSpaceDialogOpen: (open: boolean) => void;
}

export default function AddWorkSpaceDialog({
  isWorkSpaceDialogOpen,
  setWorkSpaceDialogOpen,
}: AddWorkSpaceDialogProps) {
  return (
    <Dialog open={isWorkSpaceDialogOpen} onOpenChange={setWorkSpaceDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Workspace</DialogTitle>
        </DialogHeader>

        <Label></Label>
        <Input placeholder="Add WorkSpace"/>
        <Button>Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
}
