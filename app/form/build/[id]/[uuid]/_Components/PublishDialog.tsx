import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { RevertFormPublishActionToServer } from "../_ServerActions/actions";
import { toast } from "sonner";

interface ShareDialogProps {
  isDialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  uuid: string;
}

export default function ShareDialog({
  isDialogOpen,
  setDialogOpen,
  uuid,
}: ShareDialogProps) {
  const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

  const [state, formAction, pending] = useActionState(
    RevertFormPublishActionToServer,
    {
      success: false,
      message: "",
    }
  );

  useEffect(() => {
    if(state.success){
        toast.success(state.message)
        setDialogOpen(!isDialogOpen)
    }
  },[state.message, state.success, isDialogOpen, setDialogOpen])

  const publicLink = `${NEXT_PUBLIC_APP_URL}/response/${uuid}`;

//   if(state.success){
//     toast.success(state.message)
//   }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle>Public Form Link</DialogTitle>
          <DialogDescription>
            Anyone with this link can view and respond to your form.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-2">
          <Input type="hidden" name="uuid" value={uuid} />
          <Input type="hidden" name="publishedWorkSpace" />

          <div className="space-y-2">
            <Label>Shareable Link</Label>
            <Input value={publicLink} readOnly />
          </div>

          {state.success === false && <p className="text-red-500">{state.success}</p>}

          <Button
            type="submit"
            variant="destructive"
            className="w-full"
            disabled={pending}
          >
            {pending ? "Unpublishing..." : "Unpublish Form"}
          </Button>
        </form>

        <DialogClose asChild>
          <Button variant="outline" className="w-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
