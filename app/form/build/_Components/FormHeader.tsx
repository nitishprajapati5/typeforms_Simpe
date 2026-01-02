// components/FormHeader.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, Underline, AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormConfigurationType } from '../types';

interface FormHeaderProps {
  config: FormConfigurationType;
  onUpdateTitle: <K extends keyof FormConfigurationType["title"]>(
    formId: string,
    key: K,
    value: FormConfigurationType["title"][K]
  ) => void;
  onUpdateDescription: <K extends keyof FormConfigurationType["description"]>(
    formId: string,
    key: K,
    value: FormConfigurationType["description"][K]
  ) => void;
}

export const FormHeader = ({ config, onUpdateTitle, onUpdateDescription }: FormHeaderProps) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6 border">
      <div className="w-full flex items-center flex-col justify-start gap-3">
        {/* Title Input */}
        <Input
          value={config.title.formTitle}
          placeholder="Enter your Form Name"
          onChange={(e) => onUpdateTitle(config.formId, "formTitle", e.target.value)}
          style={{ textAlign: config.title.TitleAlign }}
          className={cn(
            "text-2xl w-full border-gray-300 focus:border-gray-400",
            config.title.isTitleBold && "font-bold",
            config.title.isTitleItalic && "italic",
            config.title.isTitleUnderline && "underline"
          )}
        />

        {/* Title Formatting Controls */}
        <div className="flex flex-row gap-2">
          <Bold
            role="button"
            size={24}
            tabIndex={0}
            className={cn(
              "cursor-pointer p-1 rounded hover:bg-gray-100",
              config.title.isTitleBold && "bg-amber-100"
            )}
            onClick={() => onUpdateTitle(config.formId, "isTitleBold", !config.title.isTitleBold)}
          />
          <Italic
            role="button"
            tabIndex={0}
            className={cn(
              "cursor-pointer p-1 rounded hover:bg-gray-100",
              config.title.isTitleItalic && "bg-amber-100"
            )}
            onClick={() => onUpdateTitle(config.formId, "isTitleItalic", !config.title.isTitleItalic)}
          />
          <Underline
            role="button"
            tabIndex={0}
            className={cn(
              "cursor-pointer p-1 rounded hover:bg-gray-100",
              config.title.isTitleUnderline && "bg-amber-100"
            )}
            onClick={() => onUpdateTitle(config.formId, "isTitleUnderline", !config.title.isTitleUnderline)}
          />
          <div className="w-px bg-gray-300 mx-1" />
          <AlignLeft
            role="button"
            tabIndex={0}
            className={cn(
              "cursor-pointer p-1 rounded hover:bg-gray-100",
              config.title.TitleAlign === "left" && "bg-amber-100"
            )}
            onClick={() => onUpdateTitle(config.formId, "TitleAlign", "left")}
          />
          <AlignCenter
            role="button"
            tabIndex={0}
            className={cn(
              "cursor-pointer p-1 rounded hover:bg-gray-100",
              config.title.TitleAlign === "center" && "bg-amber-100"
            )}
            onClick={() => onUpdateTitle(config.formId, "TitleAlign", "center")}
          />
          <AlignRight
            role="button"
            tabIndex={0}
            className={cn(
              "cursor-pointer p-1 rounded hover:bg-gray-100",
              config.title.TitleAlign === "right" && "bg-amber-100"
            )}
            onClick={() => onUpdateTitle(config.formId, "TitleAlign", "right")}
          />
        </div>

        {/* Description Textarea */}
        <Textarea
          value={config.description.formDescription}
          placeholder="Enter your Form Description"
          onChange={(e) => onUpdateDescription(config.formId, "formDescription", e.target.value)}
          style={{ textAlign: config.description.DescriptionAlign }}
          className={cn(
            "text-base w-full border-gray-300 focus:border-gray-400 min-h-20",
            config.description.isDescriptionBold && "font-bold",
            config.description.isDescriptionItalic && "italic",
            config.description.isDescriptionUnderline && "underline"
          )}
        />

        {/* Description Formatting Controls */}
        <div className="flex flex-row gap-2">
          <Bold
            role="button"
            tabIndex={0}
            className={cn(
              "cursor-pointer p-1 rounded hover:bg-gray-100",
              config.description.isDescriptionBold && "bg-amber-100"
            )}
            onClick={() => onUpdateDescription(config.formId, "isDescriptionBold", !config.description.isDescriptionBold)}
          />
          <Italic
            role="button"
            tabIndex={0}
            className={cn(
              "cursor-pointer p-1 rounded hover:bg-gray-100",
              config.description.isDescriptionItalic && "bg-amber-100"
            )}
            onClick={() => onUpdateDescription(config.formId, "isDescriptionItalic", !config.description.isDescriptionItalic)}
          />
          <Underline
            role="button"
            tabIndex={0}
            className={cn(
              "cursor-pointer p-1 rounded hover:bg-gray-100",
              config.description.isDescriptionUnderline && "bg-amber-100"
            )}
            onClick={() => onUpdateDescription(config.formId, "isDescriptionUnderline", !config.description.isDescriptionUnderline)}
          />
        </div>
      </div>
    </div>
  );
};