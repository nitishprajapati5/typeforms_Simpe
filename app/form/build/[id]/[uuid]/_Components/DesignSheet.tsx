// components/DesignSheet.tsx
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PencilIcon, Check } from "lucide-react";
import { FONT_AND_SIZE_SETTINGS } from '../constants';
import { FormDesignConfiguration, DesignType, Theme } from '../types';
import { themes } from '../_Utils/utils';

interface DesignSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  designConfig: FormDesignConfiguration;
  selectedTheme: Theme | null;
  selectedShade: string | null;
  onUpdateDesign: (
    fontValue: string | undefined,
    sizeValue: number | undefined,
    key: "fontSelected" | "size",
    designType: DesignType
  ) => void;
  onThemeSelect: (theme: Theme) => void;
  onShadeSelect: (shade: string) => void;
  //onSave: () => void;
  uuid:string,
  handleThemeSelection:(theme:Theme) => void;
  handleShadeSelection:(shade:string) => void
}

export const DesignSheet = ({
  isOpen,
  onOpenChange,
  designConfig,
  selectedTheme,
  selectedShade,
  onUpdateDesign,
  onThemeSelect,
  onShadeSelect,
  //onSave,
  handleThemeSelection,
  handleShadeSelection,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uuid
}: DesignSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex flex-row gap-2">
            <PencilIcon />
            Design
          </SheetTitle>
          <SheetDescription>
            Make changes to your form design here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 text-sm font-semibold mt-4">Text Style</div>
        <div className="grid flex-1 auto-rows-min gap-4 px-4">
          {/* Header Design */}
          <Label>Header</Label>
          <div className="flex flex-1 flex-col">
            <Label className="text-sm text-gray-500">Font Name & Font Size</Label>
            <div className="flex flex-1 gap-2">
              <Select
                value={designConfig.headerDesign.fontSelected}
                onValueChange={(value) =>  onUpdateDesign(value, undefined, "fontSelected", "headerDesign")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FONT_AND_SIZE_SETTINGS.Fonts.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                value={designConfig.headerDesign.size.toString()}
                onValueChange={(value) => onUpdateDesign(undefined, Number(value), "size", "headerDesign")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FONT_AND_SIZE_SETTINGS.Size.map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Label Design */}
          <Label>Label</Label>
          <div className="flex flex-1 flex-col">
            <Label className="text-sm text-gray-500">Font Name & Font Size</Label>
            <div className="flex flex-1 gap-2">
              <Select
                value={designConfig.questionDesign.fontSelected}
                onValueChange={(value) => onUpdateDesign(value, undefined, "fontSelected", "questionDesign")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FONT_AND_SIZE_SETTINGS.Fonts.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                value={designConfig.questionDesign.size.toString()}
                onValueChange={(value) =>  onUpdateDesign(undefined, Number(value), "size", "questionDesign")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FONT_AND_SIZE_SETTINGS.Size.map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Text Design */}
          <Label>Text</Label>
          <div className="flex flex-1 flex-col">
            <Label className="text-sm text-gray-500">Font Name & Font Size</Label>
            <div className="flex flex-1 gap-2">
              <Select
                value={designConfig.textDesign.fontSelected}
                onValueChange={(value) => onUpdateDesign(value, undefined, "fontSelected", "textDesign")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FONT_AND_SIZE_SETTINGS.Fonts.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                value={designConfig.textDesign.size.toString()}
                onValueChange={(value) => onUpdateDesign(undefined, Number(value), "size", "textDesign")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {FONT_AND_SIZE_SETTINGS.Size.map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Header Image */}
          <div className="grid gap-3">
            <Label>Header Image</Label>
            <Input type="file" />
          </div>

          {/* Color Selection */}
          <div>
            <Label>Color</Label>
            <div className="grid grid-cols-5 gap-4 mt-2">
              {themes.map((color) => (
                <div key={color.id} className="relative">
                  <Button
                    role="button"
                    className="p-4 h-2"
                    onClick={() => {
                      onThemeSelect(color);
                      onShadeSelect(color.shades[0]);
                      handleThemeSelection(color)
                    }}
                    style={{ backgroundColor: color.base }}
                  />
                  {selectedTheme?.id === color.id && <Check className="absolute inset-1" />}
                </div>
              ))}
            </div>

            {/* Sub Palettes */}
            {selectedTheme && (
              <div className="mt-4">
                <Label>Sub Palettes</Label>
                <div className="grid grid-cols-5 mt-2 gap-2">
                  {selectedTheme.shades.map((shade) => (
                    <div className="relative" key={shade}>
                      <Button
                        onClick={() => {
                           onShadeSelect(shade)
                          handleShadeSelection(shade)
                        }}
                        className="h-4 p-4"
                        style={{ backgroundColor: shade }}
                      />
                      {selectedShade === shade && <Check className="absolute inset-1.5" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};