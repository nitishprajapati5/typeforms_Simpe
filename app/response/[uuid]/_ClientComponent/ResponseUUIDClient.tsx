/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useTransition } from 'react';
import {
  FormResponseFromDatabase,
  JsonValue,
  QuestionConfig,
} from '@/app/form/build/[id]/[uuid]/types';
import { submitFormResponse } from '../_ServerComponents/actions';

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
  formId: string;
}

export default function ResponsePreviewClient({
  data,
  formId,
}: ResponseClientProps) {
  const [formValues, setFormValues] = useState<
    Record<string, string | string[]>
  >({});
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Submit handler using Server Action
  const handleSubmit = async () => {
    setSubmitStatus({ type: null, message: '' });

    startTransition(async () => {
      try {
        const result = await submitFormResponse(formId, formValues);

        if (result.success) {
          setSubmitStatus({
            type: 'success',
            message: result.message,
          });
          // Optional: Clear form after successful submission
          // setFormValues({});
        } else {
          setSubmitStatus({
            type: 'error',
            message: result.message || 'Failed to submit form',
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus({
          type: 'error',
          message: 'An unexpected error occurred',
        });
      }
    });
  };

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
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
        />
      );
    }

    // Dropdown select
    if (questionType === 'Drop Down') {
      const dropdownOptions = options?.options || [];
      return (
        <select
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={formValues[question.id] || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, [question.id]: e.target.value })
          }
          disabled={isPending}
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
      if (Array.isArray(options)) {
        return options;
      }
      if (typeof options === 'object' && options !== null) {
        const opts = options as { options?: string[] };
        if (opts.options && Array.isArray(opts.options)) {
          return opts.options;
        }
        return Object.values(options);
      }
      return [];
    }

    // Radio buttons
    if (questionType === 'Radio Buttons') {
      const radioOptions = normalizeOptions(question.options);
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
                disabled={isPending}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      );
    }

    // Checkboxes
    if (questionType === 'Check Boxes') {
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
                disabled={isPending}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      );
    }

    return (
      <input
        type="text"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Your answer"
        value={formValues[question.id] || ''}
        onChange={(e) =>
          setFormValues({ ...formValues, [question.id]: e.target.value })
        }
        disabled={isPending}
      />
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
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

            {submitStatus.message && (
              <div
                className={`mt-6 rounded-lg p-4 ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="mt-8 flex justify-start gap-4">
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="rounded-lg px-8 py-3 font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: getColorConfig().color || '#1A73E8',
                }}
              >
                {isPending ? 'Submitting...' : 'Submit'}
              </button>

              {submitStatus.type === 'success' && (
                <button
                  onClick={() => {
                    setFormValues({});
                    setSubmitStatus({ type: null, message: '' });
                  }}
                  className="rounded-lg px-8 py-3 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Submit Another Response
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
