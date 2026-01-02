// components/AddQuestionCard.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { questionType } from "../_Utils/utils";

interface AddQuestionCardProps {
  questionTitle: string;
  selectedType: string;
  onTitleChange: (title: string) => void;
  onTypeChange: (type: string) => void;
  onAdd: () => void;
}

export const AddQuestionCard = ({
  questionTitle,
  selectedType,
  onTitleChange,
  onTypeChange,
  onAdd,
}: AddQuestionCardProps) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6 border border-dashed border-gray-300">
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-lg">Add New Question</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            className="flex-1"
            placeholder="Question Title"
            value={questionTitle}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <Select onValueChange={onTypeChange} value={selectedType}>
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
        <Button onClick={onAdd} className="w-full sm:w-auto">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>
    </div>
  );
};