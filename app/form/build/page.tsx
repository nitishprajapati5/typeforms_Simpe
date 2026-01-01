
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
  Italic,
  Underline,
  AlignCenter,
  AlignLeft,
  AlignRight,
  PlusCircle,
  Copy,
  GripVertical,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/* ---------------- TYPES ---------------- */

type Question = {
  id: string;
  title: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: Record<string, any>;
  required: boolean;
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

const questionType = [
  {
    type: "Single Choice",
    useCases: [
      { label: "Text Field" },
      { label: "Multi Line/Text Area" },
      { label: "Email Field" },
      { label: "Number Field" },
      { label: "URL Field" },
    ],
  },
  {
    type: "Selection Components",
    useCases: [
      { label: "Drop Down" },
      { label: "Radio Buttons" },
      { label: "Check Boxes" },
    ],
  },
  {
    type: "Date and Time Components",
    useCases: [
      { label: "Date Picker" },
      { label: "Date and Time Picker" },
    ],
  },
  {
    type: "File and Media Inputs",
    useCases: [
      { label: "File Upload" },
      { label: "Image Upload" },
    ],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const questionConfigMap: Record<string, any> = {
  "Text Field": {
    placeholder: "Enter your answer",
    type: "text",
  },
  "Multi Line/Text Area": {
    placeholder: "Enter detailed answer",
    type: "textarea",
    rows: 4,
  },
  "Email Field": {
    placeholder: "example@email.com",
    type: "email",
  },
  "Number Field": {
    placeholder: "Enter number",
    type: "number",
  },
  "URL Field": {
    placeholder: "https://example.com",
    type: "url",
  },
  "Radio Buttons": {
    options: ["Option 1", "Option 2", "Option 3"],
  },
  "Check Boxes": {
    options: ["Option 1", "Option 2", "Option 3"],
  },
  "Drop Down": {
    options: ["Option 1", "Option 2", "Option 3"],
  },
  "Date Picker": {
    type: "date",
  },
  "Date and Time Picker": {
    type: "datetime-local",
  },
  "File Upload": {
    type: "file",
  },
  "Image Upload": {
    type: "file",
    accept: "image/*",
  },
};

/* ---------------- QUESTION PREVIEW COMPONENT ---------------- */

const QuestionPreview = ({ question }: { question: Question }) => {
  const { type, config } = question;

  if (["Text Field", "Email Field", "Number Field", "URL Field"].includes(type)) {
    return (
      <Input
        type={config.type}
        placeholder={config.placeholder}
        disabled
        className="w-full"
      />
    );
  }

  if (type === "Multi Line/Text Area") {
    return (
      <Textarea
        placeholder={config.placeholder}
        rows={config.rows}
        disabled
        className="w-full"
      />
    );
  }

  if (type === "Radio Buttons") {
    return (
      <RadioGroup disabled>
        {config.options.map((option: string, idx: number) => (
          <div key={idx} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${question.id}-${idx}`} />
            <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    );
  }

  if (type === "Check Boxes") {
    return (
      <div className="space-y-2">
        {config.options.map((option: string, idx: number) => (
          <div key={idx} className="flex items-center space-x-2">
            <Checkbox id={`${question.id}-${idx}`} disabled />
            <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
          </div>
        ))}
      </div>
    );
  }

  if (type === "Drop Down") {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {config.options.map((option: string, idx: number) => (
            <SelectItem  key={idx} value={option && option.trim() != "" ? option : `option-${idx}`}>
              {option || "Please enter the Option"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (type === "Date Picker" || type === "Date and Time Picker") {
    return <Input type={config.type} disabled className="w-full" />;
  }

  if (type === "File Upload" || type === "Image Upload") {
    return <Input type="file" accept={config.accept} disabled className="w-full" />;
  }

  return <div>Preview not available</div>;
};


export default function FormPage() {
  const [formName, setFormName] = useState("My new form");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formHeaderConfiguration, setFormHeaderConfiguration] =
    useState<FormConfigurationType>(formHeaderConfigurationDetails);

  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [selectedTypeOfQuestion, setSelectedTypeOfQuestion] = useState("");


  const handlePublishEvent = () => {
    console.log(questions)
  }

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
  };

  const updateDescriptionFormChanges = <
    K extends keyof FormConfigurationType["description"]
  >(
    formId: string,
    key: K,
    value: FormConfigurationType["description"][K]
  ) => {
    setFormHeaderConfiguration((prev) =>
      prev.formId === formId
        ? {
            ...prev,
            description: {
              ...prev.description,
              [key]: value,
            },
          }
        : prev
    );
  };

  const addQuestion = () => {
    if (!selectedTypeOfQuestion || !newQuestionTitle.trim()) {
      alert("Please enter a question title and select a type");
      return;
    }

    const newQuestion: Question = {
      id: crypto.randomUUID(),
      title: newQuestionTitle,
      type: selectedTypeOfQuestion,
      config: questionConfigMap[selectedTypeOfQuestion] || {},
      required: false,
    };

    setQuestions((prev) => [...prev, newQuestion]);
    setNewQuestionTitle("");
    setSelectedTypeOfQuestion("");
    console.log("Question's Log",questions)
  };

  const updateQuestionTitle = (id: string, title: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, title } : q))
    );
  };

  const updateQuestionRequired = (id: string, required: boolean) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, required } : q))
    );
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const duplicateQuestion = (id: string) => {
    const questionToDuplicate = questions.find((q) => q.id === id);
    if (questionToDuplicate) {
      const newQuestion = {
        ...questionToDuplicate,
        id: crypto.randomUUID(),
        title: `${questionToDuplicate.title} (Copy)`,
      };
      setQuestions((prev) => [...prev, newQuestion]);
    }
  };

  const updateQuestionOptions = (id: string, options: string[]) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, config: { ...q.config, options } }
          : q
      )
    );
  };

  return (
    <div className="w-full overflow-y-auto min-h-screen bg-gray-50">
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
          <Button className="bg-green-700 hover:bg-green-800" onClickCapture={handlePublishEvent}>Publish</Button>
        </header>
      </nav>

      {/* BUILDER AREA */}
      <div className="mt-8 flex flex-col items-center gap-6 px-4 pb-20">
        {/* FORM HEADER */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6 border">
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
              style={{ textAlign: formHeaderConfiguration.title.TitleAlign }}
              className={cn(
                "text-2xl w-full border-gray-300 focus:border-gray-400",
                formHeaderConfiguration.title.isTitleBold && "font-bold",
                formHeaderConfiguration.title.isTitleItalic && "italic",
                formHeaderConfiguration.title.isTitleUnderline && "underline"
              )}
            />
            <div className="flex flex-row gap-2">
              <Bold
                role="button"
                size={24}
                tabIndex={0}
                className={cn(
                  "cursor-pointer p-1 rounded hover:bg-gray-100",
                  formHeaderConfiguration.title.isTitleBold && "bg-amber-100"
                )}
                onClick={() =>
                  updateFormChanges(
                    formHeaderConfiguration.formId,
                    "isTitleBold",
                    !formHeaderConfiguration.title.isTitleBold
                  )
                }
              />
              <Italic
                role="button"
                tabIndex={0}
                className={cn(
                  "cursor-pointer p-1 rounded hover:bg-gray-100",
                  formHeaderConfiguration.title.isTitleItalic && "bg-amber-100"
                )}
                onClick={() =>
                  updateFormChanges(
                    formHeaderConfiguration.formId,
                    "isTitleItalic",
                    !formHeaderConfiguration.title.isTitleItalic
                  )
                }
              />
              <Underline
                role="button"
                tabIndex={0}
                className={cn(
                  "cursor-pointer p-1 rounded hover:bg-gray-100",
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
              <div className="w-px bg-gray-300 mx-1" />
              <AlignLeft
                role="button"
                tabIndex={0}
                className={cn(
                  "cursor-pointer p-1 rounded hover:bg-gray-100",
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
                  "cursor-pointer p-1 rounded hover:bg-gray-100",
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
              <AlignRight
                role="button"
                tabIndex={0}
                className={cn(
                  "cursor-pointer p-1 rounded hover:bg-gray-100",
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
              placeholder="Enter your Form Description"
              onChange={(e) =>
                updateDescriptionFormChanges(
                  formHeaderConfiguration.formId,
                  "formDescription",
                  e.target.value
                )
              }
              style={{ textAlign: formHeaderConfiguration.description.DescriptionAlign }}
              className={cn(
                "text-base w-full border-gray-300 focus:border-gray-400 min-h-20",
                formHeaderConfiguration.description.isDescriptionBold &&
                  "font-bold",
                formHeaderConfiguration.description.isDescriptionItalic &&
                  "italic",
                formHeaderConfiguration.description.isDescriptionUnderline &&
                  "underline"
              )}
            />
            <div className="flex flex-row gap-2">
              <Bold
                role="button"
                tabIndex={0}
                className={cn(
                  "cursor-pointer p-1 rounded hover:bg-gray-100",
                  formHeaderConfiguration.description.isDescriptionBold &&
                    "bg-amber-100"
                )}
                onClick={() =>
                  updateDescriptionFormChanges(
                    formHeaderConfiguration.formId,
                    "isDescriptionBold",
                    !formHeaderConfiguration.description.isDescriptionBold
                  )
                }
              />
              <Italic
                role="button"
                tabIndex={0}
                className={cn(
                  "cursor-pointer p-1 rounded hover:bg-gray-100",
                  formHeaderConfiguration.description.isDescriptionItalic &&
                    "bg-amber-100"
                )}
                onClick={() =>
                  updateDescriptionFormChanges(
                    formHeaderConfiguration.formId,
                    "isDescriptionItalic",
                    !formHeaderConfiguration.description.isDescriptionItalic
                  )
                }
              />
              <Underline
                role="button"
                tabIndex={0}
                className={cn(
                  "cursor-pointer p-1 rounded hover:bg-gray-100",
                  formHeaderConfiguration.description.isDescriptionUnderline &&
                    "bg-amber-100"
                )}
                onClick={() =>
                  updateDescriptionFormChanges(
                    formHeaderConfiguration.formId,
                    "isDescriptionUnderline",
                    !formHeaderConfiguration.description.isDescriptionUnderline
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* EXISTING QUESTIONS */}
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6 border"
          >
            <div className="flex items-start gap-3 mb-4">
              <GripVertical className="text-gray-400 mt-2 cursor-move" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Q{index + 1}
                  </span>
                  <Input
                    value={question.title}
                    onChange={(e) =>
                      updateQuestionTitle(question.id, e.target.value)
                    }
                    className="flex-1 font-medium"
                    placeholder="Question title"
                  />
                  <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded">
                    {question.type}
                  </span>
                </div>

                {/* Question Preview */}
                <div className="mt-4">
                  <QuestionPreview question={question} />
                </div>

                {/* Options editor for selection types */}
                {["Radio Buttons", "Check Boxes", "Drop Down"].includes(
                  question.type
                ) && (
                  <div className="mt-4 space-y-2">
                    <Label className="text-sm">Edit Options:</Label>
                    {question.config.options.map((option: string, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...question.config.options];
                            newOptions[idx] = e.target.value;
                            updateQuestionOptions(question.id, newOptions);
                          }}
                          placeholder={`Option ${idx + 1}`}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newOptions = question.config.options.filter(
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (_: any, i: number) => i !== idx
                            );
                            updateQuestionOptions(question.id, newOptions);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newOptions = [
                          ...question.config.options,
                          `Option ${question.config.options.length + 1}`,
                        ];
                        updateQuestionOptions(question.id, newOptions);
                      }}
                    >
                      Add Option
                    </Button>
                  </div>
                )}

                {/* Required toggle */}
                <div className="flex items-center gap-2 mt-4">
                  <Checkbox
                    id={`required-${question.id}`}
                    checked={question.required}
                    onCheckedChange={(checked: boolean) =>
                      updateQuestionRequired(question.id, checked as boolean)
                    }
                    className="border-2 border-black"
                  />
                  <Label htmlFor={`required-${question.id}`} className="text-sm">
                    Required
                  </Label>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => duplicateQuestion(question.id)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteQuestion(question.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        ))}

        {/* ADD NEW QUESTION */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6 border border-dashed border-gray-300">
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-lg">Add New Question</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                className="flex-1"
                placeholder="Question Title"
                value={newQuestionTitle}
                onChange={(e) => setNewQuestionTitle(e.target.value)}
              />
              <Select
                onValueChange={setSelectedTypeOfQuestion}
                value={selectedTypeOfQuestion}
              >
                <SelectTrigger className="w-full sm:w-62.5">
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {questionType.map((ques) => (
                      <div key={ques.type}>
                        <SelectLabel>{ques.type}</SelectLabel>
                        {ques.useCases.map((u) => (
                          <SelectItem key={u.label} value={u.label}>
                            {u.label}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addQuestion} className="w-full sm:w-auto">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>
      </div>

      {/* DIALOG */}
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