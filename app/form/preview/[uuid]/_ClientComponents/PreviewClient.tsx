/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Eye, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import {
  FormResponseFromDatabase,
  JsonValue,
} from '@/app/form/build/[id]/[uuid]/types';

interface ColorConfig {
  color: string;
  background: string;
}

interface HeaderDesign {
  fontSelected: string;
  size: number;
}

interface Question {
  id: string;
  uuid: string;
  formId: string;
  required: boolean;
  title: string | null;
  type: string;
  options: JsonValue;
}

interface PreviewClientProps {
  data: FormResponseFromDatabase;
}

export default function PreviewClient({ data }: PreviewClientProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  console.log(data);

  // Helper to safely extract nested JSON values
  const getColorConfig = (): ColorConfig => {
    const config = data.formDesign?.colorConfiguration as any;
    return config || { color: '#1A73E8', background: '#669DF6' };
  };

  const getHeaderDesign = (): HeaderDesign => {
    const design = data.formDesign?.headerDesign as any;
    return design || { fontSelected: 'Sans', size: 12 };
  };

  const getQuestionDesign = (): HeaderDesign => {
    const design = data.formDesign?.questionDesign as any;
    return design || { fontSelected: 'Montserrat', size: 12 };
  };

  const getTextDesign = (): HeaderDesign => {
    const design = data.formDesign?.textDesign as any;
    return design || { fontSelected: 'Montserrat', size: 12 };
  };

  const getTitleStyle = () => {
    const styles: string[] = [];
    if (data.headerConfig?.isTitleBold) styles.push('font-bold');
    if (data.headerConfig?.isTitleItalic) styles.push('italic');
    if (data.headerConfig?.isTitleUnderline) styles.push('underline');
    return styles.join(' ');
  };

  const getDescriptionStyle = () => {
    const styles: string[] = [];
    if (data.headerConfig?.isDescriptionBold) styles.push('font-bold');
    if (data.headerConfig?.isDescriptionItalic) styles.push('italic');
    if (data.headerConfig?.isDescriptionUnderline) styles.push('underline');
    return styles.join(' ');
  };

  const renderQuestion = (question: Question) => {
    //const questionDesign = getQuestionDesign();
    // const questionStyle = {
    //   fontFamily: questionDesign.fontSelected || "sans-serif",
    // };

    const questionType = question.type.toLowerCase().replace(/\s+/g, '');
    const options = question.options as any;

    switch (questionType) {
      case 'textfield':
        return (
          <input
            type={options?.type || 'text'}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder={options?.placeholder || 'Your answer'}
            value={formValues[question.id] || ''}
            onChange={(e) =>
              setFormValues({ ...formValues, [question.id]: e.target.value })
            }
          />
        );

      case 'textarea':
        return (
          <textarea
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder={options?.placeholder || 'Your answer'}
            value={formValues[question.id] || ''}
            onChange={(e) =>
              setFormValues({ ...formValues, [question.id]: e.target.value })
            }
          />
        );

      case 'dropdown':
        const dropdownOptions = options?.options || [];
        return (
          <select
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={formValues[question.id] || ''}
            onChange={(e) =>
              setFormValues({ ...formValues, [question.id]: e.target.value })
            }
          >
            <option value="">Choose an option</option>
            {dropdownOptions.map((option: string, idx: number) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'radio':
        const radioOptions = (
          Array.isArray(question.options) ? question.options : []
        ) as string[];
        return (
          <div className="space-y-2">
            {radioOptions.map((option: string, idx: number) => (
              <label
                key={idx}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={formValues[question.id] === option}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [question.id]: e.target.value,
                    })
                  }
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        const checkboxOptions = (
          Array.isArray(question.options) ? question.options : []
        ) as string[];
        return (
          <div className="space-y-2">
            {checkboxOptions.map((option: string, idx: number) => (
              <label
                key={idx}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Your answer"
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Preview Header */}
      <div className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              Preview Mode
            </span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Published
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Live & accepting responses
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-2xl bg-white shadow-md overflow-hidden">
          {/* Form Header with colored top border */}
          {data.formDesign && (
            <div
              className="h-2"
              style={{
                backgroundColor: getColorConfig().color,
              }}
            />
          )}

          <div className="p-8">
            {/* Title and Description */}
            <div className="mb-8">
              <h1
                className={`text-3xl mb-3 ${getTitleStyle()}`}
                style={{
                  textAlign: (data.headerConfig?.titleAlign as any) || 'left',
                  fontFamily: getHeaderDesign().fontSelected || 'sans-serif',
                  color: getColorConfig().color || '#1A73E8',
                }}
              >
                {data.headerConfig?.formTitle || 'Untitled Form'}
              </h1>
              <p
                className={`text-gray-600 ${getDescriptionStyle()}`}
                style={{
                  textAlign:
                    (data.headerConfig?.descriptionAlign as any) || 'left',
                  fontFamily: getTextDesign().fontSelected || 'sans-serif',
                }}
              >
                {data.headerConfig?.formDescription || ''}
              </p>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {data.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-6"
                >
                  <label className="mb-3 block">
                    <span
                      className="text-gray-800 text-base"
                      style={{
                        fontFamily:
                          getQuestionDesign().fontSelected || 'sans-serif',
                      }}
                    >
                      {question.title || `Question ${index + 1}`}
                      {question.required && (
                        <span className="ml-1 text-red-500">*</span>
                      )}
                    </span>
                  </label>
                  {renderQuestion(question)}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-start">
              <button
                className="rounded-lg px-8 py-3 font-medium text-white transition-colors hover:opacity-90"
                style={{
                  backgroundColor: getColorConfig().color || '#1A73E8',
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
