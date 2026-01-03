// components/DesignSheet.tsx
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { FormSettingsConfiguration } from "../types";

interface DesignSettingSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateFormSettings:(type: "shuffleQuestionOrder" | "showProgressBar" | "responseConfirmationMessage" | "showLinkToSubmitAnotherResponse" | "requiredSignIn" | "limitResponseToOne",key:boolean | string) => void,
  intialFormState:FormSettingsConfiguration
}

export const DesignSettingSheet = ({
  isOpen,
  onOpenChange,
  onUpdateFormSettings,
  intialFormState
}: DesignSettingSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex flex-row gap-2">
            <Settings />
            Design
          </SheetTitle>
          <SheetDescription>Make Setting to your form design</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <Label>Presentation</Label>
          <div className="mt-2 px-2">
            <Label className="text-gray-500">Form Presentation</Label>
            <Label className="text-gray-400 text-xs">Manage how responses are collected and protected</Label>
            <div className="flex flex-row items-center justify-between gap-3 mt-4">
              <Label htmlFor="r1">Shuffle Question Order</Label>
              <Checkbox
                className="border-2 border-black"
                checked={intialFormState.shuffleQuestionOrder}
                id="r1"
                onCheckedChange={(checked) => onUpdateFormSettings("shuffleQuestionOrder",!!checked)}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-3 mt-4">
              <Label htmlFor="r1">Show Progress Bar</Label>
              <Checkbox
                className="border-2 border-black"
                value="default"
                checked={intialFormState.showProgressBar}
                id="r1"
                onCheckedChange={(checked) => onUpdateFormSettings("showProgressBar",!!checked)}
              />
            </div>

            <div className="flex flex-col i justify-between gap-4 mt-1">
              <div className="mt-4">
                <Label htmlFor="r1">Show Confirmation Message</Label>
                <Input
                  defaultValue={intialFormState.responseConfirmationMessage}
                  className="border border-black mt-2"
                  placeholder="Enter the Confirmation Message"
                  onChange={(e) => onUpdateFormSettings("responseConfirmationMessage",e.target.value)}
                  
                />
              </div>
            
            </div>
            <div className="flex flex-row items-center justify-between gap-3 mt-4">
              <Label htmlFor="r1">Show link to submit another response</Label>
              <Checkbox
                className="border-2 border-black"
                value="default"
                id="r1"
                checked={intialFormState.showLinkToSubmitAnotherResponse}
                onCheckedChange={(checked) => onUpdateFormSettings("showLinkToSubmitAnotherResponse",!!checked)}
              />
            </div>

            <div className="flex flex-row items-center justify-between gap-3 mt-4">
              <Label htmlFor="r1">Requires Sign-In</Label>
              <Checkbox
                className="border-2 border-black"
                value="default"
                id="r1"
                checked={intialFormState.requiredSignIn}
                onCheckedChange={(checked) => onUpdateFormSettings("requiredSignIn",!!checked)}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-3 mt-4">
              <Label htmlFor="r1">Limit Response to 1</Label>
              <Checkbox
                className="border-2 border-black"
                value="default"
                id="r1"
                checked={intialFormState.limitResponseToOne}
                onCheckedChange={(checked) => onUpdateFormSettings("limitResponseToOne",!!checked)}
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
