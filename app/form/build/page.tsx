// "use client";

// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
//   DialogClose,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   FormInput,
//   ChevronRight,
//   Trash2,
//   Bold,
//   Italic,
//   Underline,
//   AlignCenter,
//   AlignLeft,
//   AlignRight,
//   PlusCircle,
//   Copy,
//   GripVertical,
//   Settings2Icon,
//   EyeIcon,
//   PencilIcon,
//   Check,
// } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";

// import { questionConfigMap, questionType, themes } from "./_Utils/utils";
// import {
//   DesignKey,
//   FormConfigurationType,
//   FormDesignConfiguration,
//   Question,
//   Theme,
// } from "./types";

// /* ---------------- TYPES ---------------- */

// const formHeaderConfigurationDetails: FormConfigurationType = {
//   formId: crypto.randomUUID(),
//   title: {
//     formTitle: "My New Form",
//     placeholder: "Form Title",
//     isTitleBold: false,
//     isTitleItalic: false,
//     isTitleUnderline: false,
//     TitleAlign: "left",
//   },
//   description: {
//     formDescription: "",
//     placeholder: "Please enter form description",
//     isDescriptionBold: false,
//     isDescriptionItalic: false,
//     isDescriptionUnderline: false,
//     DescriptionAlign: "left",
//   },
// };

// /* ---------------- DATA ---------------- */

// // eslint-disable-next-line @typescript-eslint/no-explicit-any

// const FontAndSizeSetting = {
//   Fonts: ["Roboto", "Sans","Monteserrat"],
//   Size: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
// };

// const formDesignConfigurationIntialState: FormDesignConfiguration = {
//   headerDesign: {
//     fontSelected: "Roboto",
//     size: 18,
//   },
//   questionDesign: {
//     fontSelected: "Roboto",
//     size: 18,
//   },
//   textDesign: {
//     fontSelected: "Roboto",
//     size: 18,
//   },
//   headerImage: "",
//   colorConfiguration: {
//     color: "Red",
//     background: "#fffff",
//   },
// };

// /* ---------------- QUESTION PREVIEW COMPONENT ---------------- */

// const QuestionPreview = ({ question }: { question: Question }) => {
//   const { type, config } = question;

//   if (
//     ["Text Field", "Email Field", "Number Field", "URL Field"].includes(type)
//   ) {
//     return (
//       <Input
//         type={config.type}
//         placeholder={config.placeholder}
//         disabled
//         className="w-full"
//       />
//     );
//   }

//   if (type === "Multi Line/Text Area") {
//     return (
//       <Textarea
//         placeholder={config.placeholder}
//         rows={config.rows}
//         disabled
//         className="w-full"
//       />
//     );
//   }

//   if (type === "Radio Buttons") {
//     return (
//       <RadioGroup disabled>
//         {config.options.map((option: string, idx: number) => (
//           <div key={idx} className="flex items-center space-x-2">
//             <RadioGroupItem value={option} id={`${question.id}-${idx}`} />
//             <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
//           </div>
//         ))}
//       </RadioGroup>
//     );
//   }

//   if (type === "Check Boxes") {
//     return (
//       <div className="space-y-2">
//         {config.options.map((option: string, idx: number) => (
//           <div key={idx} className="flex items-center space-x-2">
//             <Checkbox id={`${question.id}-${idx}`} disabled />
//             <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (type === "Drop Down") {
//     return (
//       <Select disabled>
//         <SelectTrigger>
//           <SelectValue placeholder="Select an option" />
//         </SelectTrigger>
//         <SelectContent>
//           {config.options.map((option: string, idx: number) => (
//             <SelectItem
//               key={idx}
//               value={option && option.trim() != "" ? option : `option-${idx}`}
//             >
//               {option || "Please enter the Option"}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     );
//   }

//   if (type === "Date Picker" || type === "Date and Time Picker") {
//     return <Input type={config.type} disabled className="w-full" />;
//   }

//   if (type === "File Upload" || type === "Image Upload") {
//     return (
//       <Input type="file" accept={config.accept} disabled className="w-full" />
//     );
//   }

//   return <div>Preview not available</div>;
// };

// export default function FormPage() {
//   const [formName, setFormName] = useState("My new form");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [formDesignConfiguration, setFormDesignConfiguration] =
//     useState<FormDesignConfiguration>(formDesignConfigurationIntialState);
//   const [formHeaderConfiguration, setFormHeaderConfiguration] =
//     useState<FormConfigurationType>(formHeaderConfigurationDetails);

//   const [newQuestionTitle, setNewQuestionTitle] = useState("");
//   const [selectedTypeOfQuestion, setSelectedTypeOfQuestion] = useState("");

//   const [selectedTheme, setSelectedTheme] = useState<Theme | null>(themes[0]);
//   const [selectedShade, setSelectedShade] = useState<string | null>(themes[0].shades[0]);

//   const handlePublishEvent = () => {
//     console.log(questions);
//   };

//   const updateFormChanges = <K extends keyof FormConfigurationType["title"]>(
//     formId: string,
//     key: K,
//     value: FormConfigurationType["title"][K]
//   ) => {
//     setFormHeaderConfiguration((prev) =>
//       prev.formId === formId
//         ? {
//             ...prev,
//             title: {
//               ...prev.title,
//               [key]: value,
//             },
//           }
//         : prev
//     );
//   };

//   const updateDescriptionFormChanges = <
//     K extends keyof FormConfigurationType["description"]
//   >(
//     formId: string,
//     key: K,
//     value: FormConfigurationType["description"][K]
//   ) => {
//     setFormHeaderConfiguration((prev) =>
//       prev.formId === formId
//         ? {
//             ...prev,
//             description: {
//               ...prev.description,
//               [key]: value,
//             },
//           }
//         : prev
//     );
//   };

//   const addQuestion = () => {
//     if (!selectedTypeOfQuestion || !newQuestionTitle.trim()) {
//       alert("Please enter a question title and select a type");
//       return;
//     }

//     const newQuestion: Question = {
//       id: crypto.randomUUID(),
//       title: newQuestionTitle,
//       type: selectedTypeOfQuestion,
//       config: questionConfigMap[selectedTypeOfQuestion] || {},
//       required: false,
//     };

//     setQuestions((prev) => [...prev, newQuestion]);
//     setNewQuestionTitle("");
//     setSelectedTypeOfQuestion("");
//     console.log("Question's Log", questions);
//   };

//   const updateQuestionTitle = (id: string, title: string) => {
//     setQuestions((prev) =>
//       prev.map((q) => (q.id === id ? { ...q, title } : q))
//     );
//   };

//   const updateQuestionRequired = (id: string, required: boolean) => {
//     setQuestions((prev) =>
//       prev.map((q) => (q.id === id ? { ...q, required } : q))
//     );
//   };

//   const deleteQuestion = (id: string) => {
//     setQuestions((prev) => prev.filter((q) => q.id !== id));
//   };

//   const duplicateQuestion = (id: string) => {
//     const questionToDuplicate = questions.find((q) => q.id === id);
//     if (questionToDuplicate) {
//       const newQuestion = {
//         ...questionToDuplicate,
//         id: crypto.randomUUID(),
//         title: `${questionToDuplicate.title} (Copy)`,
//       };
//       setQuestions((prev) => [...prev, newQuestion]);
//     }
//   };

//   const updateQuestionOptions = (id: string, options: string[]) => {
//     setQuestions((prev) =>
//       prev.map((q) =>
//         q.id === id ? { ...q, config: { ...q.config, options } } : q
//       )
//     );
//   };

//   const updateDesignConfiguration = (
//     fontValue: string | undefined,
//     sizeValue: number | undefined,
//     key: DesignKey,
//     designType: "headerDesign" | "questionDesign" | "textDesign"
//   ) => {
//     setFormDesignConfiguration((prev) => ({
//       ...prev,
//       [designType]: {
//         ...prev[designType],
//         ...(fontValue !== undefined && { fontSelected: fontValue }),
//         ...(sizeValue !== undefined && { size: sizeValue }),
//       },
//     }));
//     console.log(formDesignConfiguration);

//   };

//   console.log(selectedShade,selectedTheme)

//   const handleDesignChanges = () => {
//     console.log(selectedShade,selectedTheme)
//   } 

//   return (
//     <div className="w-full overflow-y-auto min-h-screen bg-gray-50">
//       {/* NAVBAR */}
//       <nav className="sticky top-0 z-50 w-full border-b bg-background">
//         <header className="flex items-center justify-between px-4 py-3">
//           <div className="flex items-center gap-3 min-w-0">
//             <FormInput className="h-5 w-5 shrink-0" />
//             <span className="hidden sm:inline font-medium">Form Builder</span>
//             <ChevronRight className="hidden sm:block h-4 w-4 text-muted-foreground" />
//             <Input
//               className="border-0 bg-transparent p-0 text-xl font-semibold focus-visible:ring-0 truncate"
//               value={formName}
//               onClick={() => setIsDialogOpen(true)}
//               readOnly
//             />
//           </div>
//           <div className="flex gap-2 items-center">
//             <Button
//               className="cursor-pointer bg-green-800"
//               onClickCapture={handlePublishEvent}
//             >
//               Publish
//             </Button>
//             <Settings2Icon className="cursor-pointer" size={20} />
//             <EyeIcon className="cursor-pointer" size={20} />
//             <PencilIcon
//               onClick={() => setIsSheetOpen(!isSheetOpen)}
//               className="cursor-pointer"
//               size={20}
//             />
//           </div>
//         </header>
//       </nav>

//       {/* BUILDER AREA */}
//       <div className="mt-8 flex flex-col items-center gap-6 px-4 pb-20">
//         {/* FORM HEADER */}
//         <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6 border">
//           <div className="w-full flex items-center flex-col justify-start gap-3">
//             <Input
//               value={formHeaderConfiguration.title.formTitle}
//               placeholder="Enter your Form Name"
//               onChange={(e) =>
//                 updateFormChanges(
//                   formHeaderConfiguration.formId,
//                   "formTitle",
//                   e.target.value
//                 )
//               }
//               style={{ textAlign: formHeaderConfiguration.title.TitleAlign }}
//               className={cn(
//                 "text-2xl w-full border-gray-300 focus:border-gray-400",
//                 formHeaderConfiguration.title.isTitleBold && "font-bold",
//                 formHeaderConfiguration.title.isTitleItalic && "italic",
//                 formHeaderConfiguration.title.isTitleUnderline && "underline"
//               )}
//             />
//             <div className="flex flex-row gap-2">
//               <Bold
//                 role="button"
//                 size={24}
//                 tabIndex={0}
//                 className={cn(
//                   "cursor-pointer p-1 rounded hover:bg-gray-100",
//                   formHeaderConfiguration.title.isTitleBold && "bg-amber-100"
//                 )}
//                 onClick={() =>
//                   updateFormChanges(
//                     formHeaderConfiguration.formId,
//                     "isTitleBold",
//                     !formHeaderConfiguration.title.isTitleBold
//                   )
//                 }
//               />
//               <Italic
//                 role="button"
//                 tabIndex={0}
//                 className={cn(
//                   "cursor-pointer p-1 rounded hover:bg-gray-100",
//                   formHeaderConfiguration.title.isTitleItalic && "bg-amber-100"
//                 )}
//                 onClick={() =>
//                   updateFormChanges(
//                     formHeaderConfiguration.formId,
//                     "isTitleItalic",
//                     !formHeaderConfiguration.title.isTitleItalic
//                   )
//                 }
//               />
//               <Underline
//                 role="button"
//                 tabIndex={0}
//                 className={cn(
//                   "cursor-pointer p-1 rounded hover:bg-gray-100",
//                   formHeaderConfiguration.title.isTitleUnderline &&
//                     "bg-amber-100"
//                 )}
//                 onClick={() =>
//                   updateFormChanges(
//                     formHeaderConfiguration.formId,
//                     "isTitleUnderline",
//                     !formHeaderConfiguration.title.isTitleUnderline
//                   )
//                 }
//               />
//               <div className="w-px bg-gray-300 mx-1" />
//               <AlignLeft
//                 role="button"
//                 tabIndex={0}
//                 className={cn(
//                   "cursor-pointer p-1 rounded hover:bg-gray-100",
//                   formHeaderConfiguration.title.TitleAlign === "left" &&
//                     "bg-amber-100"
//                 )}
//                 onClick={() =>
//                   updateFormChanges(
//                     formHeaderConfiguration.formId,
//                     "TitleAlign",
//                     "left"
//                   )
//                 }
//               />
//               <AlignCenter
//                 role="button"
//                 tabIndex={0}
//                 className={cn(
//                   "cursor-pointer p-1 rounded hover:bg-gray-100",
//                   formHeaderConfiguration.title.TitleAlign === "center" &&
//                     "bg-amber-100"
//                 )}
//                 onClick={() =>
//                   updateFormChanges(
//                     formHeaderConfiguration.formId,
//                     "TitleAlign",
//                     "center"
//                   )
//                 }
//               />
//               <AlignRight
//                 role="button"
//                 tabIndex={0}
//                 className={cn(
//                   "cursor-pointer p-1 rounded hover:bg-gray-100",
//                   formHeaderConfiguration.title.TitleAlign === "right" &&
//                     "bg-amber-100"
//                 )}
//                 onClick={() =>
//                   updateFormChanges(
//                     formHeaderConfiguration.formId,
//                     "TitleAlign",
//                     "right"
//                   )
//                 }
//               />
//             </div>

//             <Textarea
//               value={formHeaderConfiguration.description.formDescription}
//               placeholder="Enter your Form Description"
//               onChange={(e) =>
//                 updateDescriptionFormChanges(
//                   formHeaderConfiguration.formId,
//                   "formDescription",
//                   e.target.value
//                 )
//               }
//               style={{
//                 textAlign: formHeaderConfiguration.description.DescriptionAlign,
//               }}
//               className={cn(
//                 "text-base w-full border-gray-300 focus:border-gray-400 min-h-20",
//                 formHeaderConfiguration.description.isDescriptionBold &&
//                   "font-bold",
//                 formHeaderConfiguration.description.isDescriptionItalic &&
//                   "italic",
//                 formHeaderConfiguration.description.isDescriptionUnderline &&
//                   "underline"
//               )}
//             />
//             <div className="flex flex-row gap-2">
//               <Bold
//                 role="button"
//                 tabIndex={0}
//                 className={cn(
//                   "cursor-pointer p-1 rounded hover:bg-gray-100",
//                   formHeaderConfiguration.description.isDescriptionBold &&
//                     "bg-amber-100"
//                 )}
//                 onClick={() =>
//                   updateDescriptionFormChanges(
//                     formHeaderConfiguration.formId,
//                     "isDescriptionBold",
//                     !formHeaderConfiguration.description.isDescriptionBold
//                   )
//                 }
//               />
//               <Italic
//                 role="button"
//                 tabIndex={0}
//                 className={cn(
//                   "cursor-pointer p-1 rounded hover:bg-gray-100",
//                   formHeaderConfiguration.description.isDescriptionItalic &&
//                     "bg-amber-100"
//                 )}
//                 onClick={() =>
//                   updateDescriptionFormChanges(
//                     formHeaderConfiguration.formId,
//                     "isDescriptionItalic",
//                     !formHeaderConfiguration.description.isDescriptionItalic
//                   )
//                 }
//               />
//               <Underline
//                 role="button"
//                 tabIndex={0}
//                 className={cn(
//                   "cursor-pointer p-1 rounded hover:bg-gray-100",
//                   formHeaderConfiguration.description.isDescriptionUnderline &&
//                     "bg-amber-100"
//                 )}
//                 onClick={() =>
//                   updateDescriptionFormChanges(
//                     formHeaderConfiguration.formId,
//                     "isDescriptionUnderline",
//                     !formHeaderConfiguration.description.isDescriptionUnderline
//                   )
//                 }
//               />
//             </div>
//           </div>
//         </div>

//         {/* EXISTING QUESTIONS */}
//         {questions.map((question, index) => (
//           <div
//             key={question.id}
//             className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6 border"
//           >
//             <div className="flex items-start gap-3 mb-4">
//               <GripVertical className="text-gray-400 mt-2 cursor-move" />
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-2">
//                   <span className="text-sm font-medium text-gray-500">
//                     Q{index + 1}
//                   </span>
//                   <Input
//                     value={question.title}
//                     onChange={(e) =>
//                       updateQuestionTitle(question.id, e.target.value)
//                     }
//                     className="flex-1 font-medium"
//                     placeholder="Question title"
//                   />
//                   <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded">
//                     {question.type}
//                   </span>
//                 </div>

//                 {/* Question Preview */}
//                 <div className="mt-4">
//                   <QuestionPreview question={question} />
//                 </div>

//                 {/* Options editor for selection types */}
//                 {["Radio Buttons", "Check Boxes", "Drop Down"].includes(
//                   question.type
//                 ) && (
//                   <div className="mt-4 space-y-2">
//                     <Label className="text-sm">Edit Options:</Label>
//                     {question.config.options.map(
//                       (option: string, idx: number) => (
//                         <div key={idx} className="flex gap-2">
//                           <Input
//                             value={option}
//                             onChange={(e) => {
//                               const newOptions = [...question.config.options];
//                               newOptions[idx] = e.target.value;
//                               updateQuestionOptions(question.id, newOptions);
//                             }}
//                             placeholder={`Option ${idx + 1}`}
//                           />
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => {
//                               const newOptions = question.config.options.filter(
//                                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                                 (_: any, i: number) => i !== idx
//                               );
//                               updateQuestionOptions(question.id, newOptions);
//                             }}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       )
//                     )}
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => {
//                         const newOptions = [
//                           ...question.config.options,
//                           `Option ${question.config.options.length + 1}`,
//                         ];
//                         updateQuestionOptions(question.id, newOptions);
//                       }}
//                     >
//                       Add Option
//                     </Button>
//                   </div>
//                 )}

//                 {/* Required toggle */}
//                 <div className="flex items-center gap-2 mt-4">
//                   <Checkbox
//                     id={`required-${question.id}`}
//                     checked={question.required}
//                     onCheckedChange={(checked: boolean) =>
//                       updateQuestionRequired(question.id, checked as boolean)
//                     }
//                     className="border-2 border-black"
//                   />
//                   <Label
//                     htmlFor={`required-${question.id}`}
//                     className="text-sm"
//                   >
//                     Required
//                   </Label>
//                 </div>
//               </div>
//             </div>

//             {/* Action buttons */}
//             <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => duplicateQuestion(question.id)}
//               >
//                 <Copy className="h-4 w-4 mr-2" />
//                 Duplicate
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => deleteQuestion(question.id)}
//                 className="text-red-600 hover:text-red-700 hover:bg-red-50"
//               >
//                 <Trash2 className="h-4 w-4 mr-2" />
//                 Delete
//               </Button>
//             </div>
//           </div>
//         ))}

//         {/* ADD NEW QUESTION */}
//         <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6 border border-dashed border-gray-300">
//           <div className="flex flex-col gap-4">
//             <h3 className="font-medium text-lg">Add New Question</h3>
//             <div className="flex flex-col sm:flex-row gap-3">
//               <Input
//                 className="flex-1"
//                 placeholder="Question Title"
//                 value={newQuestionTitle}
//                 onChange={(e) => setNewQuestionTitle(e.target.value)}
//               />
//               <Select
//                 onValueChange={setSelectedTypeOfQuestion}
//                 value={selectedTypeOfQuestion}
//               >
//                 <SelectTrigger className="w-full sm:w-62.5">
//                   <SelectValue placeholder="Select a Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     {questionType.map((ques) => (
//                       <div key={ques.type}>
//                         <SelectLabel>{ques.type}</SelectLabel>
//                         {ques.useCases.map((u) => (
//                           <SelectItem key={u.label} value={u.label}>
//                             {u.label}
//                           </SelectItem>
//                         ))}
//                       </div>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <Button onClick={addQuestion} className="w-full sm:w-auto">
//               <PlusCircle className="h-4 w-4 mr-2" />
//               Add Question
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* DIALOG */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Form Name</DialogTitle>
//             <DialogDescription>
//               Update your form name and save changes.
//             </DialogDescription>
//           </DialogHeader>
//           <Label>Form Name</Label>
//           <Input
//             value={formName}
//             onChange={(e) => setFormName(e.target.value)}
//             autoFocus
//           />
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button onClick={() => setIsDialogOpen(false)}>Save</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//       {/* SHEET */}
//       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//         {/* <SheetTrigger asChild>
//           <Button variant="outline">Open</Button>
//         </SheetTrigger> */}
//         <SheetContent>
//           <SheetHeader>
//             <SheetTitle className="flex flex-row gap-2">
//               <PencilIcon />
//               Design
//             </SheetTitle>
//             <SheetDescription>
//               Make changes to your form design here. Click save when you&apos;re
//               done.
//             </SheetDescription>
//           </SheetHeader>
//           <div className="px-4 text-sm font-semibold">Text Style</div>
//           <div className="grid flex-1 auto-rows-min gap-4 px-4">
//             {/* <div className="grid gap-3">
//               <Label htmlFor="sheet-demo-name">Name</Label>
//               <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              
//             </div> */}
//             <Label className="">Header</Label>
            
//             <div className="flex flex-1 flex-col">
//               <Label className="text-sm text-gray-500">Font Name & Font Size</Label>

//               <div className="flex flex-1 gap-2">
//                 <Select
//                   value={formDesignConfiguration.headerDesign.fontSelected}
//                   onValueChange={(value) =>
//                     updateDesignConfiguration(
//                       value,
//                       undefined,
//                       "fontSelected",
//                       "headerDesign"
//                     )
//                   }
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Font" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       {FontAndSizeSetting.Fonts.map((font) => (
//                         <SelectItem key={font} value={font}>
//                           {font}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>

//                 <Select
//                   value={formDesignConfiguration.headerDesign.size.toString()}
//                   onValueChange={(value) =>
//                     updateDesignConfiguration(
//                       undefined,
//                       Number(value),
//                       "size",
//                       "headerDesign"
//                     )
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Size" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       {FontAndSizeSetting.Size.map((size) => (
//                         <SelectItem key={size} value={size.toString()}>
//                           {size}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <Label className="">Label</Label>
//             <div className="flex flex-1 flex-col">
//               <Label className="text-sm text-gray-500">Font Name & Font Size</Label>

//               <div className="flex flex-1 gap-2">
//                 <Select
//                   value={formDesignConfiguration.questionDesign.fontSelected}
//                   onValueChange={(value) =>
//                     updateDesignConfiguration(
//                       value,
//                       undefined,
//                       "fontSelected",
//                       "questionDesign"
//                     )
//                   }
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Font" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       {FontAndSizeSetting.Fonts.map((font) => (
//                         <SelectItem key={font} value={font}>
//                           {font}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>

//                 <Select
//                   value={formDesignConfiguration.questionDesign.size.toString()}
//                   onValueChange={(value) =>
//                     updateDesignConfiguration(
//                       undefined,
//                       Number(value),
//                       "size",
//                       "questionDesign"
//                     )
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Size" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       {FontAndSizeSetting.Size.map((size) => (
//                         <SelectItem key={size} value={size.toString()}>
//                           {size}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <Label className="">Text</Label>
//             <div className="flex flex-1 flex-col">
//               <Label className="text-sm text-gray-500">Font Name & Font Size</Label>

//               <div className="flex flex-1 gap-2">
//                 <Select
//                   value={formDesignConfiguration.textDesign.fontSelected}
//                   onValueChange={(value) =>
//                     updateDesignConfiguration(
//                       value,
//                       undefined,
//                       "fontSelected",
//                       "textDesign"
//                     )
//                   }
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Font" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       {FontAndSizeSetting.Fonts.map((font) => (
//                         <SelectItem key={font} value={font}>
//                           {font}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>

//                 <Select
//                   value={formDesignConfiguration.textDesign.size.toString()}
//                   onValueChange={(value) =>
//                     updateDesignConfiguration(
//                       undefined,
//                       Number(value),
//                       "size",
//                       "textDesign"
//                     )
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Size" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       {FontAndSizeSetting.Size.map((size) => (
//                         <SelectItem key={size} value={size.toString()}>
//                           {size}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="grid gap-3">
//               {/* <Label htmlFor="sheet-demo-username">Username</Label>
//               <Input id="sheet-demo-username" defaultValue="@peduarte" /> */}
//             </div>
//             <div className="px-4">
//               <Label>Header Image</Label>
//               <Input type="file" />
//             </div>
//             <div className="px-4">
//               <Label>Color</Label>
//               <div className="grid grid-cols-5 gap-4 mt-2">
//                 {themes.map((color) => (
//                   <div key={color.id} className="relative">
//                     <Button
//                     role="button"
//                     className="p-4 h-2"
//                     key={color.id}
//                     onClick={() => {
//                       setSelectedTheme(color);
//                       setSelectedShade(color.shades[0])
//                     }}
//                     style={{ backgroundColor: color.base }}
//                     color={color.base}
//                   ></Button>
//                     {selectedTheme?.id === color.id && <Check className="absolute inset-1" />}
//                     </div>
//                 ))}
                
//               </div>
//               <div>
//                 {selectedTheme && (
//                   <>
//                    <div className="mt-4">
//                      <Label>Sub Palettes</Label>
//                      <div className="grid grid-cols-5 mt-2 gap-2">
//                       {selectedTheme.shades.map((shade) => (
//                         <div className="relative" key={shade}>
//                           <Button onClick={() => setSelectedShade(shade)} className="h-4 p-4" style={{backgroundColor:shade}} key={shade}>
//                         </Button>
//                           {selectedShade === shade && (<Check className="absolute inset-1.5"  />)}
//                         </div>
//                      ))}
//                      </div>
//                    </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           <SheetFooter>
//             <Button type="submit" onClick={() => handleDesignChanges()}>Save changes</Button>
//             <SheetClose asChild>
//               <Button variant="outline">Close</Button>
//             </SheetClose>
//           </SheetFooter>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }
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

import { FormNavbar } from "./_Components/FormNavbar";
import { FormHeader } from "./_Components/FormHeader";
import { QuestionCard } from "./_Components/QuestionCard";
import { AddQuestionCard } from "./_Components/AddQuestionCard";
import { DesignSheet } from './_Components/DesignSheet';
import { useFormBuilder } from "./hooks/useBuilder";

export default function FormPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    formName,
    setFormName,
    questions,
    formDesignConfiguration,
    formHeaderConfiguration,
    newQuestionTitle,
    setNewQuestionTitle,
    selectedTypeOfQuestion,
    setSelectedTypeOfQuestion,
    selectedTheme,
    setSelectedTheme,
    selectedShade,
    setSelectedShade,
    updateFormChanges,
    updateDescriptionFormChanges,
    addQuestion,
    updateQuestionTitle,
    updateQuestionRequired,
    deleteQuestion,
    duplicateQuestion,
    updateQuestionOptions,
    updateDesignConfiguration,
    handlePublishEvent,
    handleDesignChanges,
  } = useFormBuilder();

  return (
    <div className="w-full overflow-y-auto min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <FormNavbar
        formName={formName}
        onFormNameClick={() => setIsDialogOpen(true)}
        onPublish={handlePublishEvent}
        onDesignClick={() => setIsSheetOpen(!isSheetOpen)}
      />

      {/* BUILDER AREA */}
      <div className="mt-8 flex flex-col items-center gap-6 px-4 pb-20">
        {/* FORM HEADER */}
        <FormHeader
          config={formHeaderConfiguration}
          onUpdateTitle={updateFormChanges}
          onUpdateDescription={updateDescriptionFormChanges}
        />

        {/* EXISTING QUESTIONS */}
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            onUpdateTitle={updateQuestionTitle}
            onUpdateRequired={updateQuestionRequired}
            onUpdateOptions={updateQuestionOptions}
            onDuplicate={duplicateQuestion}
            onDelete={deleteQuestion}
          />
        ))}

        {/* ADD NEW QUESTION */}
        <AddQuestionCard
          questionTitle={newQuestionTitle}
          selectedType={selectedTypeOfQuestion}
          onTitleChange={setNewQuestionTitle}
          onTypeChange={setSelectedTypeOfQuestion}
          onAdd={addQuestion}
        />
      </div>

      {/* FORM NAME EDIT DIALOG */}
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

      {/* DESIGN SHEET */}
      <DesignSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        designConfig={formDesignConfiguration}
        selectedTheme={selectedTheme}
        selectedShade={selectedShade}
        onUpdateDesign={updateDesignConfiguration}
        onThemeSelect={setSelectedTheme}
        onShadeSelect={setSelectedShade}
        onSave={handleDesignChanges}
      />
    </div>
  );
}