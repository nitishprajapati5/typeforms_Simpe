/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import {
  FormResponseFromDatabase,
  JsonValue,
  QuestionConfig,
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

interface ResponseClientProps {
  data: FormResponseFromDatabase;
}

export default function ResponsePreviewClient({ data }: ResponseClientProps) {
  const [formValues, setFormValues] = useState<
    Record<string, string | string[]>
  >({});

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
    const questionType = question.type;
    const options = question.options as QuestionConfig;

    console.log(typeof options);

    // Text-based input fields
    if (
      ['Text Field', 'Email Field', 'Number Field', 'URL Field'].includes(
        questionType
      )
    ) {
      return (
        <input
          type={options?.type || questionType.toLowerCase().split(' ')[0]}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder={options?.placeholder || 'Your answer'}
          value={formValues[question.id] || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, [question.id]: e.target.value })
          }
        />
      );
    }

    // Multi-line text area
    if (questionType === 'Multi Line/Text Area') {
      return (
        <textarea
          rows={options?.rows || 4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder={options?.placeholder || 'Your answer'}
          value={formValues[question.id] || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, [question.id]: e.target.value })
          }
        />
      );
    }

    // Date and datetime inputs
    if (
      questionType === 'Date Picker' ||
      questionType === 'Date and Time Picker'
    ) {
      return (
        <input
          type={options?.type || questionType}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={formValues[question.id] || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, [question.id]: e.target.value })
          }
        />
      );
    }

    // File upload
    if (questionType === 'File Upload' || questionType === 'Image Upload') {
      return (
        <input
          type="file"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          accept={options?.accept}
          onChange={(e) =>
            setFormValues({ ...formValues, [question.id]: e.target.value })
          }
        />
      );
    }

    // Dropdown select
    if (questionType === 'Drop Down') {
      const dropdownOptions = options?.options || [];
      console.log(dropdownOptions);
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
    }

    function normalizeOptions(options: unknown): string[] {
      // If it's already an array, return it
      if (Array.isArray(options)) {
        return options;
      }

      // If it's an object with nested 'options' property
      if (typeof options === 'object' && options !== null) {
        const opts = options as { options?: string[] };
        if (opts.options && Array.isArray(opts.options)) {
          return opts.options;
        }
        // Fallback to Object.values if structure is different
        return Object.values(options);
      }

      return [];
    }

    // Radio buttons
    if (questionType === 'Radio Buttons') {
      if (question.options) {
        console.log(typeof question.options);
      }
      const radioOptions = normalizeOptions(question.options);
      console.log(radioOptions.length);
      console.log(formValues);

      return (
        <div className="flex flex-col space-y-2">
          {radioOptions.map((option: string, idx: number) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
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
    }

    // Checkboxes
    if (questionType === 'Check Boxes') {
      // const checkboxOptions = (
      //   Array.isArray(question.options) ? question.options : []
      // ) as string[];
      const currentValues = (
        Array.isArray(formValues[question.id]) ? formValues[question.id] : []
      ) as string[];

      const checkboxOptions = normalizeOptions(question.options);

      return (
        <div className="space-y-2 flex flex-col">
          {checkboxOptions.map((option: string, idx: number) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={currentValues.includes(option)}
                onChange={(e) => {
                  const newValues = e.target.checked
                    ? [...currentValues, option]
                    : currentValues.filter((v: string) => v !== option);
                  setFormValues({
                    ...formValues,
                    [question.id]: newValues,
                  });
                }}
                className="h-4 w-4 rounded text-blue-600"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      );
    }

    // Default fallback
    return (
      <input
        type="text"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Your answer"
        value={formValues[question.id] || ''}
        onChange={(e) =>
          setFormValues({ ...formValues, [question.id]: e.target.value })
        }
      />
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Preview Header */}

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-2xl bg-white shadow-md overflow-hidden">
          {data.formDesign && (
            <div
              className="h-2"
              style={{
                backgroundColor: getColorConfig().color,
              }}
            />
          )}

          <div className="p-8">
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
