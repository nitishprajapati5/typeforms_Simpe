import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WorkSpaceNameChangeDialogProps {
  isOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  workSpaceName:string,
  setWorkSpaceName:(workSpaceName:string) => void
}

export default function WorkSpaceNameChangeDialog({
  isOpen,
  setDialogOpen,
  setWorkSpaceName,
  workSpaceName
}: WorkSpaceNameChangeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Workspace Name</DialogTitle>
        </DialogHeader>

        <Label>

        </Label>
        <Input defaultValue={workSpaceName} onChange={(e) => setWorkSpaceName(e.target.value)}/>
        <Button>Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
}
