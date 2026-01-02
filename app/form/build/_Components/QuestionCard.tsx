// components/QuestionCard.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical, Copy, Trash2 } from "lucide-react";
import { QuestionPreview } from './QuestionPreview';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  index: number;
  onUpdateTitle: (id: string, title: string) => void;
  onUpdateRequired: (id: string, required: boolean) => void;
  onUpdateOptions: (id: string, options: string[]) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const QuestionCard = ({
  question,
  index,
  onUpdateTitle,
  onUpdateRequired,
  onUpdateOptions,
  onDuplicate,
  onDelete,
}: QuestionCardProps) => {
  const isSelectionType = ["Radio Buttons", "Check Boxes", "Drop Down"].includes(question.type);

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex items-start gap-3 mb-4">
        <GripVertical className="text-gray-400 mt-2 cursor-move" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-500">Q{index + 1}</span>
            <Input
              value={question.title}
              onChange={(e) => onUpdateTitle(question.id, e.target.value)}
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
          {isSelectionType && question.config.options && (
            <div className="mt-4 space-y-2">
              <Label className="text-sm">Edit Options:</Label>
              {question.config.options.map((option: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...question.config.options!];
                      newOptions[idx] = e.target.value;
                      onUpdateOptions(question.id, newOptions);
                    }}
                    placeholder={`Option ${idx + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newOptions = question.config.options!.filter((_, i) => i !== idx);
                      onUpdateOptions(question.id, newOptions);
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
                    ...question.config.options!,
                    `Option ${question.config.options!.length + 1}`,
                  ];
                  onUpdateOptions(question.id, newOptions);
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
              onCheckedChange={(checked) => onUpdateRequired(question.id, checked as boolean)}
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
        <Button variant="ghost" size="sm" onClick={() => onDuplicate(question.id)}>
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(question.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};