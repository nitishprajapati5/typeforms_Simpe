"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormInput,
  ChevronRight,
  Trash2,
  Bold,
  ItalicIcon,
  UnderlineIcon,
  AlignCenter,
  AlignLeftIcon,
  AlignRightIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

/* ---------------- TYPES ---------------- */

type Question = {
  id: string;
  title: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: Record<string, any>;
};

type Align = "left" | "center" | "right";

type FormConfigurationType = {
  formId: string;
  title: {
    formTitle: string;
    placeholder: string;
    isTitleBold: boolean;
    isTitleItalic: boolean;
    isTitleUnderline: boolean;
    TitleAlign: Align;
  };
  description: {
    formDescription: string;
    placeholder: string;
    isDescriptionBold: boolean;
    isDescriptionItalic: boolean;
    isDescriptionUnderline: boolean;
    DescriptionAlign: Align;
  };
};

const formHeaderConfigurationDetails: FormConfigurationType = {
  formId: crypto.randomUUID(),
  title: {
    formTitle: "My New Form",
    placeholder: "Form Title",
    isTitleBold: false,
    isTitleItalic: false,
    isTitleUnderline: false,
    TitleAlign: "left",
  },
  description: {
    formDescription: "",
    placeholder: "Please enter form description",
    isDescriptionBold: false,
    isDescriptionItalic: false,
    isDescriptionUnderline: false,
    DescriptionAlign: "left",
  },
};

/* ---------------- DATA ---------------- */

const selectionType = [
  {
    type: "Text Input Components",
    choices: [
      "Single Line Text",
      "Multi Line Text/Text Area",
      "Email Input",
      "Phone Number Input",
    ],
  },
  {
    type: "Selection Input Components",
    choices: ["Multiple Choice", "Checkboxes", "Dropdown Menu"],
  },
  {
    type: "Specialized Input Components",
    choices: ["Date Picker", "File Upload"],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const questionConfigMap: Record<string, any> = {
  "Single Line Text": {
    placeholder: "Enter your answer",
    type: "text",
    required: false,
  },
  "Multi Line Text/Text Area": {
    placeholder: "Enter detailed answer",
    type: "textarea",
    rows: 4,
    required: false,
  },
  "Email Input": {
    placeholder: "example@email.com",
    type: "email",
    required: false,
  },
  "Phone Number Input": {
    placeholder: "Enter phone number",
    type: "number",
    required: false,
  },
  "Multiple Choice": {
    options: ["Option 1", "Option 2"],
  },
  Checkboxes: {
    options: ["Option 1", "Option 2"],
  },
  "Dropdown Menu": {
    options: ["Option 1", "Option 2"],
  },
};

/* ---------------- COMPONENT ---------------- */

export default function FormPage() {
  const [formName, setFormName] = useState("My new form");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [description, setDescription] = useState("Form Description");
  const [formHeaderConfiguration, setFormHeaderConfiguration] =
    useState<FormConfigurationType>(formHeaderConfigurationDetails);
  /* ---------------- ACTIONS ---------------- */

  const updateFormChanges = <K extends keyof FormConfigurationType["title"]>(
    formId: string,
    key: K,
    value: FormConfigurationType["title"][K]
  ) => {
    setFormHeaderConfiguration((prev) =>
      prev.formId === formId
        ? {
            ...prev,
            title: {
              ...prev.title,
              [key]: value,
            },
          }
        : prev
    );
    console.log("After Changes", formHeaderConfiguration);
  };

  const updateDescriptionFormChanges = <K extends keyof FormConfigurationType["description"]>(
    formId:string,
    key:K,
    value:FormConfigurationType["description"][K]
  ) => {
    setFormHeaderConfiguration((prev) => 
      prev.formId === formId ?{
        ...prev,
        description :{
          ...prev.description,
          [key]:value
        }
      }:prev
    )
    console.log("File Description Changes",formHeaderConfiguration)
  }

  /*
  const addQuestion = (type: string) => {
    setQuestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "Untitled Question",
        type,
        config: questionConfigMap[type],
      },
    ]);
    console.log(questions);
  };

  const updateQuestionTitle = (id: string, title: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, title } : q))
    );
    console.log(questions);
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    console.log(questions);
  };
*/
  return (
    <div className="w-full overflow-y-auto">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background">
        <header className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <FormInput className="h-5 w-5 shrink-0" />
            <span className="hidden sm:inline font-medium">Form Builder</span>
            <ChevronRight className="hidden sm:block h-4 w-4 text-muted-foreground" />
            <Input
              className="border-0 bg-transparent p-0 text-xl font-semibold focus-visible:ring-0 truncate"
              value={formName}
              onClick={() => setIsDialogOpen(true)}
              readOnly
            />
          </div>
          <Button className="bg-green-900 hover:bg-green-900">Publish</Button>
        </header>
      </nav>

      {/* BUILDER AREA */}
      <div className="mt-8 flex flex-col items-center gap-6 px-4">
        <div className="w-full flex items-center flex-col justify-start gap-3">
          <Input
            value={formHeaderConfiguration.title.formTitle}
            placeholder="Enter your Form Name"
            onChange={(e) =>
              updateFormChanges(
                formHeaderConfiguration.formId,
                "formTitle",
                e.target.value
              )
            }
            className={cn(
              "text-2xl w-full max-w-4xl border-gray-500 focus:border-gray-400",
              formHeaderConfiguration.title.isTitleBold && "font-bold",
              formHeaderConfiguration.title.isTitleItalic && "italic",
              formHeaderConfiguration.title.isTitleUnderline && "underline"
            )}
          />
          <div className="flex flex-row gap-2">
            <Bold
              role="button"
              tabIndex={0}
              className={cn(
                "cursor-pointer",
                formHeaderConfiguration.title.isTitleBold && "bg-amber-100"
              )}
              onClick={() =>
                updateFormChanges(
                  formHeaderConfiguration.formId,
                  "isTitleBold",
                  !formHeaderConfiguration.title.isTitleBold
                )
              }
            />{" "}
            <ItalicIcon
              role="button"
              tabIndex={0}
              className={cn(
                "cursor-pointer",
                formHeaderConfiguration.title.isTitleItalic && "bg-amber-100"
              )}
              onClick={() =>
                updateFormChanges(
                  formHeaderConfiguration.formId,
                  "isTitleItalic",
                  !formHeaderConfiguration.title.isTitleItalic
                )
              }
            />{" "}
            <UnderlineIcon
              role="button"
              tabIndex={0}
              className={cn(
                "cursor-pointer",
                formHeaderConfiguration.title.isTitleUnderline && "bg-amber-100"
              )}
              onClick={() =>
                updateFormChanges(
                  formHeaderConfiguration.formId,
                  "isTitleUnderline",
                  !formHeaderConfiguration.title.isTitleUnderline
                )
              }
            />
            <AlignLeftIcon
              role="button"
              tabIndex={0}
              className={cn(
                "cursor-pointer",
                formHeaderConfiguration.title.TitleAlign === "left" &&
                  "bg-amber-100"
              )}
              onClick={() =>
                updateFormChanges(
                  formHeaderConfiguration.formId,
                  "TitleAlign",
                  "left"
                )
              }
            />
            <AlignCenter
              role="button"
              tabIndex={0}
              className={cn(
                "cursor-pointer",
                formHeaderConfiguration.title.TitleAlign === "center" &&
                  "bg-amber-100"
              )}
              onClick={() =>
                updateFormChanges(
                  formHeaderConfiguration.formId,
                  "TitleAlign",
                  "center"
                )
              }
            />
            <AlignRightIcon
              role="button"
              tabIndex={0}
              className={cn(
                "cursor-pointer",
                formHeaderConfiguration.title.TitleAlign === "right" &&
                  "bg-amber-100"
              )}
              onClick={() =>
                updateFormChanges(
                  formHeaderConfiguration.formId,
                  "TitleAlign",
                  "right"
                )
              }
            />
          </div>
          <Textarea
           value={formHeaderConfiguration.description.formDescription}
            placeholder="Enter your Form Name"
            onChange={(e) =>
              updateDescriptionFormChanges(
                formHeaderConfiguration.formId,
                "formDescription",
                e.target.value
              )
            }
            className={cn(
              "text-2xl w-full max-w-4xl border-gray-500 focus:border-gray-400",
              formHeaderConfiguration.description.isDescriptionBold && "font-bold",
              formHeaderConfiguration.description.isDescriptionItalic && "italic",
              formHeaderConfiguration.description.isDescriptionUnderline && "underline"
            )} />
          <div className="flex flex-row gap-2">
            <Bold  
            role="button"
              tabIndex={0}
              className={cn(
                "cursor-pointer",
                formHeaderConfiguration.description.isDescriptionBold && "bg-amber-100"
              )}
              onClick={() =>
                updateDescriptionFormChanges(
                  formHeaderConfiguration.formId,
                  "isDescriptionBold",
                  !formHeaderConfiguration.description.isDescriptionBold
                )
              }></Bold>
            <ItalicIcon role="button"
              tabIndex={0}
              className={cn(
                "cursor-pointer",
                formHeaderConfiguration.description.isDescriptionItalic && "bg-amber-100"
              )}
              onClick={() =>
                updateDescriptionFormChanges(
                  formHeaderConfiguration.formId,
                  "isDescriptionItalic",
                  !formHeaderConfiguration.description.isDescriptionItalic
                )
              } />{" "}
            
          </div>
        </div>

        <div></div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Form Name</DialogTitle>
            <DialogDescription>
              Update your form name and save changes.
            </DialogDescription>
          </DialogHeader>
          <Label>Form Name</Label>
          <Input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            autoFocus
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => setIsDialogOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
