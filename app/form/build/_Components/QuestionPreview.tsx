// components/QuestionPreview.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question } from '../types';

interface QuestionPreviewProps {
  question: Question;
}

export const QuestionPreview = ({ question }: QuestionPreviewProps) => {
  const { type, config } = question;

  if (
    ["Text Field", "Email Field", "Number Field", "URL Field"].includes(type)
  ) {
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
        {config.options?.map((option: string, idx: number) => (
          <div key={idx} className="flex items-center space-x-2">
            <RadioGroupItem className="border-2 border-black" value={option} id={`${question.id}-${idx}`} />
            <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    );
  }

  if (type === "Check Boxes") {
    return (
      <div className="space-y-2">
        {config.options?.map((option: string, idx: number) => (
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
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {config.options?.map((option: string, idx: number) => (
            <SelectItem
              key={idx}
              value={option && option.trim() !== "" ? option : `option-${idx}`}
            >
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
    return (
      <Input type="file" accept={config.accept} disabled className="w-full" />
    );
  }

  return <div>Preview not available</div>;
};