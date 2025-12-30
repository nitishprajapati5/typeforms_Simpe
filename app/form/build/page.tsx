"use client";

import { useState } from "react";
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
} from "lucide-react";

/* ---------------- TYPES ---------------- */

type Question = {
  id: string;
  title: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: Record<string, any>;
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
  "Checkboxes": {
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

  /* ---------------- ACTIONS ---------------- */

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
    console.log(questions)
  };

  const updateQuestionTitle = (id: string, title: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, title } : q))
    );
        console.log(questions)

  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
        console.log(questions)

  };

  /* ---------------- RENDER ---------------- */

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
          <Button className="bg-green-900 hover:bg-green-900">
            Publish
          </Button>
        </header>
      </nav>

      {/* BUILDER AREA */}
      <div className="mt-8 flex flex-col items-center gap-6 px-4">
        {/* ADD QUESTION BAR */}
        <div className="w-full max-w-4xl flex gap-3 items-center border-2 border-dashed rounded-md p-4 bg-gray-50">
          <Input value="Untitled Question" disabled />
          <Select onValueChange={addQuestion}>
            <SelectTrigger className="w-72 bg-white">
              <SelectValue placeholder="Add question type" />
            </SelectTrigger>
            <SelectContent>
              {selectionType.map((group) => (
                <SelectGroup key={group.type}>
                  <SelectLabel>{group.type}</SelectLabel>
                  {group.choices.map((choice) => (
                    <SelectItem key={choice} value={choice}>
                      {choice}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* QUESTIONS */}
        <div className="w-full max-w-4xl space-y-4">
          {questions.map((question) => (
            <div
              key={question.id}
              className="border rounded-md bg-white p-4 space-y-3"
            >
              <div className="flex justify-between items-center gap-3">
                <Input
                  value={question.title}
                  onChange={(e) =>
                    updateQuestionTitle(question.id, e.target.value)
                  }
                  className="font-medium"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteQuestion(question.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              {/* PREVIEW */}
              {question.type === "Single Line Text" && (
                <Input placeholder={question.config.placeholder} disabled />
              )}

              {question.type === "Multi Line Text/Text Area" && (
                <textarea
                  className="w-full border rounded p-2"
                  rows={question.config.rows}
                  placeholder={question.config.placeholder}
                  disabled
                />
              )}

              {(question.type === "Multiple Choice" ||
                question.type === "Checkboxes" ||
                question.type === "Dropdown Menu") && (
                <div className="space-y-2">
                  {/* {question.config.options.map((opt: string, i: number) => (
                    <div
                      key={i}
                      className="border rounded px-3 py-2 text-sm text-muted-foreground"
                    >
                      <Input value={opt}  />
                    </div>
                  ))} */}
                  <Button variant="outline">Add Option 1</Button>
                  <Button variant="outline">Add Option 1</Button>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                {question.type}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT FORM NAME */}
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
            <Button onClick={() => setIsDialogOpen(false)}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
