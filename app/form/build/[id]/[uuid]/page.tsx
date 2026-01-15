// "use client";

import UUIDClient from "./_Components/UUIDClient";

// import { useState } from "react";
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


// import { FormHeader } from "./_Components/FormHeader";
// import { QuestionCard } from "./_Components/QuestionCard";
// import { AddQuestionCard } from "./_Components/AddQuestionCard";
// import { DesignSheet } from './_Components/DesignSheet';

// import { DesignSettingSheet } from "./_Components/DesignSettingSheet";
// import { useFormBuilder } from "./hooks/useBuilder";
// import { FormNavbar } from "./_Components/FormNavbar";

// export default function FormPage() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isSheetOpen, setIsSheetOpen] = useState(false);

//   const {
//     formName,
//     setFormName,
//     questions,
//     formDesignConfiguration,
//     formHeaderConfiguration,
//     newQuestionTitle,
//     setNewQuestionTitle,
//     selectedTypeOfQuestion,
//     setSelectedTypeOfQuestion,
//     selectedTheme,
//     setSelectedTheme,
//     selectedShade,
//     setSelectedShade,
//     updateFormChanges,
//     updateDescriptionFormChanges,
//     addQuestion,
//     updateQuestionTitle,
//     updateQuestionRequired,
//     deleteQuestion,
//     duplicateQuestion,
//     updateQuestionOptions,
//     updateDesignConfiguration,
//     handlePublishEvent,
//     handleDesignChanges,
//     isSettingSheetOpen,
//     setSettingSheetOpen,
//     updateFormSettingChanges,
//     formSettingConfiguration
//   } = useFormBuilder();

//   return (
//     <div className="w-full overflow-y-auto min-h-screen bg-gray-50">
//       <FormNavbar
//         formName={formName}
//         onFormNameClick={() => setIsDialogOpen(true)}
//         onPublish={handlePublishEvent}
//         onDesignClick={() => setIsSheetOpen(!isSheetOpen)}
//         onSettingClick={() => setSettingSheetOpen(!isSettingSheetOpen)}
//       />

//       <div className="mt-8 flex flex-col items-center gap-6 px-4 pb-20">
//         <FormHeader
//           config={formHeaderConfiguration}
//           onUpdateTitle={updateFormChanges}
//           onUpdateDescription={updateDescriptionFormChanges}
//         />

//         {questions.map((question, index) => (
//           <QuestionCard
//             key={question.id}
//             question={question}
//             index={index}
//             onUpdateTitle={updateQuestionTitle}
//             onUpdateRequired={updateQuestionRequired}
//             onUpdateOptions={updateQuestionOptions}
//             onDuplicate={duplicateQuestion}
//             onDelete={deleteQuestion}
//           />
//         ))}

//         <AddQuestionCard
//           questionTitle={newQuestionTitle}
//           selectedType={selectedTypeOfQuestion}
//           onTitleChange={setNewQuestionTitle}
//           onTypeChange={setSelectedTypeOfQuestion}
//           onAdd={addQuestion}
//         />
//       </div>

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

//       <DesignSheet
//         isOpen={isSheetOpen}
//         onOpenChange={setIsSheetOpen}
//         designConfig={formDesignConfiguration}
//         selectedTheme={selectedTheme}
//         selectedShade={selectedShade}
//         onUpdateDesign={updateDesignConfiguration}
//         onThemeSelect={setSelectedTheme}
//         onShadeSelect={setSelectedShade}
//         onSave={handleDesignChanges}
//       />

//       <DesignSettingSheet 
//         isOpen = {isSettingSheetOpen}
//         onOpenChange={setSettingSheetOpen}
//         onUpdateFormSettings={updateFormSettingChanges}
//         intialFormState={formSettingConfiguration}
//       />
//     </div>
//   );
// }

interface UUIDPageProps {
  params :Promise<{uuid:string}>;
}

export default async function UUIDPage({params}:UUIDPageProps){
  const {uuid} = await params;
  return (
    <UUIDClient uuid={uuid} />
  )
}