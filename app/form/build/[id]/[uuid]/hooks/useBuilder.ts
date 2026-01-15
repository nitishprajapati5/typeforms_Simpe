// hooks/.ts
import { useState } from "react";
import {
  Question,
  FormConfigurationType,
  FormDesignConfiguration,
  Theme,
  DesignType,
} from "../types";
import {
  INITIAL_FORM_HEADER_CONFIG,
  INITIAL_DESIGN_CONFIG,
  INITIAL_FORM_SETTINGS,
} from "../constants";
import { questionConfigMap } from "../_Utils/utils";
import { themes } from "../_Utils/utils";

export const useFormBuilder = () => {
  const [formName, setFormName] = useState("My new form");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formDesignConfiguration, setFormDesignConfiguration] =
    useState<FormDesignConfiguration>(INITIAL_DESIGN_CONFIG);
  const [formHeaderConfiguration, setFormHeaderConfiguration] =
    useState<FormConfigurationType>(INITIAL_FORM_HEADER_CONFIG);
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [selectedTypeOfQuestion, setSelectedTypeOfQuestion] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(themes[0]);
  const [selectedShade, setSelectedShade] = useState<string | null>(
    themes[0].shades[0]
  );
  const [isSettingSheetOpen, setSettingSheetOpen] = useState(false);
  const [formSettingConfiguration, setFormSettingConfiguration] = useState(
    INITIAL_FORM_SETTINGS
  );

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
        q.id === id ? { ...q, config: { ...q.config, options } } : q
      )
    );
  };

  const updateDesignConfiguration = (
    fontValue: string | undefined,
    sizeValue: number | undefined,
    key: "fontSelected" | "size",
    designType: DesignType
  ) => {
    setFormDesignConfiguration((prev) => ({
      ...prev,
      [designType]: {
        ...prev[designType],
        ...(fontValue !== undefined && { fontSelected: fontValue }),
        ...(sizeValue !== undefined && { size: sizeValue }),
      },
    }));
  };

  const updateFormSettingChanges = 
    (key: "shuffleQuestionOrder" | "showProgressBar" | "responseConfirmationMessage" | "showLinkToSubmitAnotherResponse" | "requiredSignIn" | "limitResponseToOne", 
    value: boolean | string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormSettingConfiguration((prev: any) => ({
      ...prev,
      [key]: value, 
    }));

    console.log(formSettingConfiguration)
  };

  const handlePublishEvent = () => {
    console.log(formHeaderConfiguration)
    console.log(questions);
    console.log(formSettingConfiguration)
    console.log(formDesignConfiguration)
  };

  const handleDesignChanges = () => {
    console.log(selectedShade, selectedTheme);
  };

  return {
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
    isSettingSheetOpen,
    setSettingSheetOpen,
    updateFormSettingChanges,
    setFormSettingConfiguration,
    formSettingConfiguration,
  };
};
