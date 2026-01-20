import {  useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { toast } from 'sonner';
import {
  Question,
  FormConfigurationType,
  FormDesignConfiguration,
  Theme,
  DesignType,
  FormTitleConfig,
  FormDescriptionConfig,
  FormSettingsConfiguration,
  FormResponseFromDatabase,
  QuestionConfig,
} from '../types';
import {
  INITIAL_FORM_HEADER_CONFIG,
  INITIAL_DESIGN_CONFIG,
  INITIAL_FORM_SETTINGS,
} from '../constants';
import { questionConfigMap, themes } from '../_Utils/utils';
import { useUUIDClient } from '../_Context/UUIDClientProvider';
import {
  updateFormDesignConfiguration,
  updateFormSettingConfiguration,
  updateHeaderDescriptionConfiguration,
  updateHeaderTitleConfiguration,
  createQuestionInDatabase,
  deleteQuestionFromDatabase,
  ChangesRequiredState,
  updateQuestionTitleInDatabase,
  updateQuestionOptionsInDatabase,
  PublishFormToServer,
} from '../_ServerActions/actions';
import {
  mapDescriptionToPayload,
  mapDesignConfigurationtoPayload,
  mapSettingConfigurationToPayload,
  mapTitleToPayload,
} from '../Mappers/formHeader';

interface UseFormBuilderProps {
  initialData: FormResponseFromDatabase;
}

export const useFormBuilder = ({ initialData }: UseFormBuilderProps) => {
  const { currentUUID, setLoading } = useUUIDClient();
  const uuidRef = useRef<string | null>(null);

  const [formName, setFormName] = useState(
    initialData.headerConfig?.formTitle ?? "My New Form"
  );

  const [questions, setQuestions] = useState<Question[]>(() => {
    if (!initialData.questions) return [];
    return initialData.questions.map(q => ({
      id: q.id,
      title: q.title ?? '',
      uuid: q.uuid,
      type: q.type,
      config: (q.options as QuestionConfig) ?? {},
      required: q.required
    }));
  });

  const [formDesignConfiguration, setFormDesignConfiguration] =
    useState<FormDesignConfiguration>(() => {
      if (!initialData.formDesign) return INITIAL_DESIGN_CONFIG;
      return {
        headerDesign: initialData.formDesign.headerDesign as { fontSelected: string; size: number },
        questionDesign: initialData.formDesign.questionDesign as { fontSelected: string; size: number },
        textDesign: initialData.formDesign.textDesign as { fontSelected: string; size: number },
        headerImage: initialData.formDesign.headerImage ?? '',
        colorConfiguration: initialData.formDesign.colorConfiguration as { color: string; background: string },
      };
    });

  const [formHeaderConfiguration, setFormHeaderConfiguration] =
    useState<FormConfigurationType>(() => {
      if (!initialData?.headerConfig) return INITIAL_FORM_HEADER_CONFIG;
      return {
        formId: initialData.headerConfig.formId!,
        title: {
          formTitle: initialData.headerConfig.formTitle ?? "",
          placeholder: initialData.headerConfig.titlePlaceholder ?? "",
          isTitleBold: initialData.headerConfig.isTitleBold ?? false,
          isTitleItalic: initialData.headerConfig.isTitleItalic ?? false,
          isTitleUnderline: initialData.headerConfig.isTitleUnderline ?? false,
          TitleAlign: initialData.headerConfig.titleAlign ?? "",
        },
        description: {
          formDescription: initialData.headerConfig.formDescription ?? "",
          placeholder: initialData.headerConfig.descriptionPlaceholder ?? "",
          isDescriptionBold: initialData.headerConfig.isDescriptionBold ?? false,
          isDescriptionItalic: initialData.headerConfig.isDescriptionItalic ?? false,
          isDescriptionUnderline: initialData.headerConfig.isDescriptionUnderline ?? false,
          DescriptionAlign: initialData.headerConfig.descriptionAlign ?? "",
        },
      };
    });

  const [formSettingConfiguration, setFormSettingConfiguration] =
    useState<FormSettingsConfiguration>(() => {
      if (!initialData?.formSettings) return INITIAL_FORM_SETTINGS;
      return {
        shuffleQuestionOrder: initialData.formSettings.shuffleQuestionOrder,
        showProgressBar: initialData.formSettings.showProgressBar,
        responseConfirmationMessage: initialData.formSettings.responseConfirmationMessage,
        showLinkToSubmitAnotherResponse: initialData.formSettings.showLinkToSubmitAnotherResponse,
        requiredSignIn: initialData.formSettings.requiredSignIn,
        limitResponseToOne: initialData.formSettings.limitResponseToOne,
        isPublished: initialData.formSettings.isPublished,
      };
    });

  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(() => {
    if (!initialData?.formDesign?.colorConfiguration) return themes[0];
    const config = initialData.formDesign.colorConfiguration as { color: string; background: string };
    const matchingTheme = themes.find(t => t.base === config.color);
    return matchingTheme ?? themes[0];
  });

  const [selectedShade, setSelectedShade] = useState<string | null>(() => {
    if (!initialData?.formDesign?.colorConfiguration) return themes[0].shades[0];
    const config = initialData.formDesign.colorConfiguration as { color: string; background: string };
    return config.background ?? themes[0].shades[0];
  });

  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [selectedTypeOfQuestion, setSelectedTypeOfQuestion] = useState('');
  const [isSettingSheetOpen, setSettingSheetOpen] = useState(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);

  useEffect(() => {
    uuidRef.current = currentUUID;
  }, [currentUUID]);

  const debouncedUpdateTitle = useMemo(
    () => debounce(async (
      formUUID: string,
      questionId: string,
      title: string,
      previousTitle: string
    ) => {
      setLoading(true);
      const result = await updateQuestionTitleInDatabase(formUUID, questionId, title);
      setLoading(false);

      if (result.success && result.data) {
        setQuestions((prev) =>
          prev.map((q) => (q.id === questionId ? result.data! : q))
        );
        toast.success("Title updated");
      } else {
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === questionId ? { ...q, title: previousTitle } : q
          )
        );
        toast.error(result.message || "Failed to update title");
      }
    }, 2000),
    [setLoading]
  );

  const debouncedUpdateOptions = useMemo(
    () => debounce(async (
      formUUID: string,
      id: string,
      config: Question["config"],
    ) => {
      setLoading(true);
      const result = await updateQuestionOptionsInDatabase(formUUID, id, config);
      setLoading(false);

      if (result.success && result.data) {
        setQuestions((prev) =>
          prev.map((q) => (q.id === id ? result.data! : q))
        );
      } else {
        toast.error(result.message || "Failed to update options");
      }
    }, 1500), // Increased from 1000ms
    [setLoading]
  );

  const debouncedUpdateTitleConfig = useMemo(
    () => debounce(async (uuid: string, data: FormTitleConfig) => {
      setLoading(true);
      const result = await updateHeaderTitleConfiguration(uuid, data);
      setLoading(false);
      if (!result.success) {
        toast.error('Failed to update title');
      }
    }, 2000), // Increased debounce time
    [setLoading]
  );

  const debouncedUpdateDescriptionConfig = useMemo(
    () => debounce(async (uuid: string, data: FormDescriptionConfig) => {
      setLoading(true);
      const result = await updateHeaderDescriptionConfiguration(uuid, data);
      setLoading(false);
      if (!result.success) {
        toast.error('Failed to update description');
      }
    }, 2000),
    [setLoading]
  );

  const debouncedUpdateDesignConfig = useMemo(
    () => debounce(async (uuid: string, data: FormDesignConfiguration) => {
      setLoading(true);
      const result = await updateFormDesignConfiguration(uuid, data);
      setLoading(false);
      if (!result.success) {
        toast.error('Failed to update design');
      }
    }, 2000),
    [setLoading]
  );

  const debouncedUpdateSettingConfig = useMemo(
    () => debounce(async (uuid: string, data: FormSettingsConfiguration) => {
      setLoading(true);
      const result = await updateFormSettingConfiguration(uuid, data);
      setLoading(false);
      if (!result.success) {
        toast.error('Failed to update settings');
      }
    }, 2000),
    [setLoading]
  );


  useEffect(() => {
    return () => {
      debouncedUpdateTitle.cancel();
      debouncedUpdateOptions.cancel();
      debouncedUpdateTitleConfig.cancel();
      debouncedUpdateDescriptionConfig.cancel();
      debouncedUpdateDesignConfig.cancel();
      debouncedUpdateSettingConfig.cancel();
    };
  }, [
    debouncedUpdateTitle,
    debouncedUpdateOptions,
    debouncedUpdateTitleConfig,
    debouncedUpdateDescriptionConfig,
    debouncedUpdateDesignConfig,
    debouncedUpdateSettingConfig
  ]);

  const updateFormChanges = useCallback(<K extends keyof FormConfigurationType['title']>(
    key: K,
    value: FormConfigurationType['title'][K]
  ) => {
    setFormHeaderConfiguration((prev) => {
      const updated = {
        ...prev,
        title: { ...prev.title, [key]: value },
      };
      debouncedUpdateTitleConfig(uuidRef.current!, mapTitleToPayload(updated));
      return updated;
    });
  }, [debouncedUpdateTitleConfig]);

  const updateDescriptionFormChanges = useCallback(<K extends keyof FormConfigurationType['description']>(
    key: K,
    value: FormConfigurationType['description'][K]
  ) => {
    setFormHeaderConfiguration((prev) => {
      const updated = {
        ...prev,
        description: { ...prev.description, [key]: value },
      };
      debouncedUpdateDescriptionConfig(uuidRef.current!, mapDescriptionToPayload(updated));
      return updated;
    });
  }, [debouncedUpdateDescriptionConfig]);

  const addQuestion = useCallback(async () => {
    if (!selectedTypeOfQuestion || !newQuestionTitle.trim()) {
      toast.error('Please enter a question title and select a type');
      return;
    }

    const questionData: Omit<Question, 'id'> = {
      title: newQuestionTitle,
      uuid: "",
      type: selectedTypeOfQuestion,
      config: questionConfigMap[selectedTypeOfQuestion] || {},
      required: false,
    };

    setLoading(true);
    const result = await createQuestionInDatabase(uuidRef.current!, questionData);
    setLoading(false);

    if (result.success && result.data) {
      setQuestions((prev) => [...prev, result.data!]);
      setNewQuestionTitle('');
      setSelectedTypeOfQuestion('');
      toast.success('Question added');
    } else {
      toast.error(result.message || 'Failed to add question');
    }
  }, [selectedTypeOfQuestion, newQuestionTitle, setLoading]);

  const updateQuestionTitle = useCallback((id: string, title: string) => {
    const question = questions.find(q => q.id === id);
    if (!question) {
      toast.error("Question not found");
      return;
    }

    const previousTitle = question.title;
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, title } : q))
    );
    debouncedUpdateTitle(uuidRef.current!, id, title, previousTitle);
  }, [questions, debouncedUpdateTitle]);

  const updateQuestionRequired = useCallback(async (id: string, required: boolean) => {
    const previousQuestion = questions.find(q => q.id === id);
    if (!previousQuestion) {
      toast.error("Question not found");
      return;
    }

    const previousRequired = previousQuestion.required;
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, required } : q))
    );

    setLoading(true);
    const result = await ChangesRequiredState(uuidRef.current!, id, required);
    setLoading(false);

    if (result.success && result.data) {
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? result.data! : q))
      );
      toast.success("Updated");
    } else {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === id ? { ...q, required: previousRequired } : q
        )
      );
      toast.error(result.message || "Failed to update");
    }
  }, [questions, setLoading]);

  const deleteQuestion = useCallback(async (id: string) => {
    const deletedQuestion = questions.find(q => q.id === id);
    setQuestions((prev) => prev.filter((q) => q.id !== id));

    setLoading(true);
    const result = await deleteQuestionFromDatabase(uuidRef.current!, id);
    setLoading(false);

    if (!result.success) {
      toast.error("Failed to delete question");
      if (deletedQuestion) {
        setQuestions((prev) => [...prev, deletedQuestion]);
      }
    } else {
      toast.success("Question deleted");
    }
  }, [questions, setLoading]);

  const duplicateQuestion = useCallback(async (id: string) => {
    const questionToDuplicate = questions.find((q) => q.id === id);
    if (!questionToDuplicate) return;

    const newQuestion: Omit<Question, 'id'> = {
      title: `${questionToDuplicate.title} (Copy)`,
      type: questionToDuplicate.type,
      config: { ...questionToDuplicate.config },
      required: questionToDuplicate.required,
      uuid: ""
    };

    setLoading(true);
    const result = await createQuestionInDatabase(uuidRef.current!, newQuestion);
    setLoading(false);

    if (result.success && result.data) {
      setQuestions((prev) => [...prev, result.data!]);
      toast.success("Question duplicated");
    } else {
      toast.error("Failed to duplicate question");
    }
  }, [questions, setLoading]);

  const updateQuestionOptions = useCallback((id: string, options: string[]) => {
    const question = questions.find(q => q.id === id);
    if (!question) return;

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, config: { ...q.config, options } } : q
      )
    );

    debouncedUpdateOptions(
      uuidRef.current!,
      id,
      { ...question.config, options }
    );
  }, [questions, debouncedUpdateOptions]);

  const updateDesignConfiguration = useCallback((
    fontValue: string | undefined,
    sizeValue: number | undefined,
    key: 'fontSelected' | 'size',
    designType: DesignType
  ) => {
    setFormDesignConfiguration((prev) => {
      const updated = {
        ...prev,
        [designType]: {
          ...prev[designType],
          ...(fontValue !== undefined && { fontSelected: fontValue }),
          ...(sizeValue !== undefined && { size: sizeValue }),
        },
      };
      debouncedUpdateDesignConfig(uuidRef.current!, mapDesignConfigurationtoPayload(updated));
      return updated;
    });
  }, [debouncedUpdateDesignConfig]);

  const updateFormSettingChanges = useCallback((
    key:
      | 'shuffleQuestionOrder'
      | 'showProgressBar'
      | 'responseConfirmationMessage'
      | 'showLinkToSubmitAnotherResponse'
      | 'requiredSignIn'
      | 'limitResponseToOne',
    value: boolean | string
  ) => {
    setFormSettingConfiguration((prev) => {
      const updated = { ...prev, [key]: value };
      debouncedUpdateSettingConfig(uuidRef.current!, mapSettingConfigurationToPayload(updated));
      return updated;
    });
  }, [debouncedUpdateSettingConfig]);

  const handlePublishEvent = useCallback(async () => {
    setLoading(true);
    const result = await PublishFormToServer(
      uuidRef.current!,
      formHeaderConfiguration,
      formSettingConfiguration,
      formDesignConfiguration,
      questions
    );

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }, [formHeaderConfiguration, formSettingConfiguration, formDesignConfiguration, questions, setLoading]);

  const handleThemeSelection = useCallback((theme: Theme) => {
    setSelectedTheme(theme);
    setFormDesignConfiguration((prev) => {
      const updated = {
        ...prev,
        colorConfiguration: {
          ...prev.colorConfiguration,
          color: theme.base,
          background: theme.shades[0],
        },
      };
      debouncedUpdateDesignConfig(uuidRef.current!, mapDesignConfigurationtoPayload(updated));
      return updated;
    });
    setSelectedShade(theme.shades[0]);
  }, [debouncedUpdateDesignConfig]);

  const handleShadeSelection = useCallback((shade: string) => {
    setSelectedShade(shade);
    setFormDesignConfiguration((prev) => {
      const updated = {
        ...prev,
        colorConfiguration: {
          ...prev.colorConfiguration,
          background: shade,
        },
      };
      debouncedUpdateDesignConfig(uuidRef.current!, mapDesignConfigurationtoPayload(updated));
      return updated;
    });
  }, [debouncedUpdateDesignConfig]);

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
    selectedShade,
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
    isSettingSheetOpen,
    setSettingSheetOpen,
    updateFormSettingChanges,
    formSettingConfiguration,
    handleThemeSelection,
    handleShadeSelection,
    isPublished,
    setIsPublished,
    setSelectedShade,
    setSelectedTheme,


  };
};