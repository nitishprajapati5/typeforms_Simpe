// components/DesignSheet.tsx
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Settings } from "lucide-react";


interface DesignSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DesignSettingSheet = ({
  isOpen,
  onOpenChange,
  
}: DesignSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex flex-row gap-2">
            <Settings />
            Design
          </SheetTitle>
          <SheetDescription>
            Make Setting to your form design 
          </SheetDescription>
        </SheetHeader>

       

        <SheetFooter>
          <Button type="submit">
            Save changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};