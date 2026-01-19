import { startTransition, useEffect, useMemo, useRef, useState } from 'react';
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
import { questionConfigMap } from '../_Utils/utils';
import { themes } from '../_Utils/utils';
import { useUUIDClient } from '../_Context/UUIDClientProvider';
import {
  initialValuePushToDatabase,
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
import { toast } from 'sonner';
import { UseDebouncedHook } from './useDebounce';
import {
  mapDescriptionToPayload,
  mapDesignConfigurationtoPayload,
  mapSettingConfigurationToPayload,
  mapTitleToPayload,
} from '../Mappers/formHeader';
import { debounce } from 'lodash';

interface UseFormBuilderProps {
  initialData: FormResponseFromDatabase
}

export const useFormBuilder = ({ initialData }: UseFormBuilderProps) => {
  const [formName, setFormName] = useState(initialData.headerConfig?.formTitle ?? "My New Form");
  const uuidRef = useRef<string | null>(null);

  const [questions, setQuestions] = useState<Question[]>(() => {
    if (!initialData.questions) return []

    return initialData.questions.map(q => ({
      id: q.id,
      title: q.title ?? '',
      uuid:q.uuid,
      type: q.type,
      config: q.options as QuestionConfig ?? {},
      required: q.required
    }))
  });



  const [formDesignConfiguration, setFormDesignConfiguration] =
    useState<FormDesignConfiguration>(() => {
      if (!initialData.formDesign) return INITIAL_DESIGN_CONFIG

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

  const [formSettingConfiguration, setFormSettingConfiguration] = useState<FormSettingsConfiguration>(() => {
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
  const [isPublished,setIsPublished] = useState<boolean>(false)


  const { currentUUID, setLoading } = useUUIDClient();

  useEffect(() => {
    uuidRef.current = currentUUID;
  }, [currentUUID]);

  const debounceChangesForFormTitleUpdated = UseDebouncedHook<FormTitleConfig>(
    async (data) => {
      setLoading(true);
      const result = await updateHeaderTitleConfiguration(
        uuidRef.current!,
        data
      );
      setLoading(false);
      if (result.success === false) {
        toast.error('Something went wrong');
      }
    },
    1000
  );

  const debounceChangesForFormDescriptionUpdated =
    UseDebouncedHook<FormDescriptionConfig>(async (data) => {
      setLoading(true);
      const result = await updateHeaderDescriptionConfiguration(
        uuidRef.current!,
        data
      );
      setLoading(false);
      if (result.success === false) {
        toast.error('Something went wrong');
      }
    });

  const debounceChangesForFormDesignConfigurationUpdated =
    UseDebouncedHook<FormDesignConfiguration>(async (data) => {
      setLoading(true);
      const result = await updateFormDesignConfiguration(
        uuidRef.current!,
        data
      );
      setLoading(false);
      if (result.success === false) {
        toast.error('Something went wrong');
      }
    });


  const debounceChangesForFormSettingConfigurationUpdated =
    UseDebouncedHook<FormSettingsConfiguration>(async (data) => {
      setLoading(true)


      const result = await updateFormSettingConfiguration(uuidRef.current!, data)
      setLoading(false)
      if (result.success === false) {
        toast.error("Something went wrong.")
      }
    })


  const debouncedUpdateTitle = useMemo(
    () => debounce(async (
      formUUID: string,
      questionId: string,
      title: string,
      previousTitle: string
    ) => {
      setLoading(true);
      const result = await updateQuestionTitleInDatabase(
        formUUID,
        questionId,
        title
      );
      setLoading(false);

      if (result.success && result.data) {
        setQuestions((prev) =>
          prev.map((q) => (q.id === questionId ? result.data! : q))
        );
        toast.success("Title updated successfully");
      } else {
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === questionId ? { ...q, title: previousTitle } : q
          )
        );
        toast.error(result.message || "Failed to update title");
      }
    }, 1000),
    [setLoading]
  );

  const debounceUpdateForOptions = useMemo(
    () => debounce(async (
      formUUID:string,
      id:string,
      t:Question["config"],      
    ) => {
       setLoading(true);

      const result = await updateQuestionOptionsInDatabase(uuidRef.current!,
        id,
        t
      );

      setLoading(false);

      if (result.success && result.data) {
        setQuestions((prev) =>
          prev.map((q) => (q.id === id ? result.data! : q))
        );
      } else {
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === id ? { ...q, config: t } : q
          )
        );
        toast.error(result.message || "Failed to update options");
      }
    },1000),
    [setLoading]
  )

  useEffect(() => {
    return () => {
      debouncedUpdateTitle.cancel();
      debounceUpdateForOptions.cancel()
    };
  }, [debouncedUpdateTitle,debounceUpdateForOptions]);




  useEffect(() => {
    if (!currentUUID) return;

    startTransition(async () => {
      setLoading(true);

      const result = await initialValuePushToDatabase(
        currentUUID,
        formHeaderConfiguration,
        formSettingConfiguration,
        formDesignConfiguration
      );

      setLoading(false);

      if (!result.success) {
        toast.error(result.message);
      }
    });
  }, [
    currentUUID,
    formDesignConfiguration,
    formHeaderConfiguration,
    formSettingConfiguration,
    questions,
    setLoading,
  ]);

  const updateFormChanges = <K extends keyof FormConfigurationType['title']>(
    key: K,
    value: FormConfigurationType['title'][K]
  ) => {
    setFormHeaderConfiguration((prev) => {
      const updated = {
        ...prev,
        title: {
          ...prev.title,
          [key]: value,
        },
      };

      startTransition(async () => {
        debounceChangesForFormTitleUpdated.current?.(
          mapTitleToPayload(updated)
        );
        setLoading(false);
      });
      return updated;
    });
  };

const updateDescriptionFormChanges = <
    K extends keyof FormConfigurationType['description'],
  >(
    key: K,
    value: FormConfigurationType['description'][K]
  ) => {
    setFormHeaderConfiguration((prev) => {
      const updated = {
        ...prev,
        description: {
          ...prev.description,
          [key]: value,
        },
      };

      startTransition(async () => {
        debounceChangesForFormDescriptionUpdated.current?.(
          mapDescriptionToPayload(updated)
        );
      });
      return updated;
    });
  };


const addQuestion = async () => {
    if (!selectedTypeOfQuestion || !newQuestionTitle.trim()) {
      alert('Please enter a question title and select a type');
      return;
    }

    const questionData: Omit<Question, 'id'> = {
      title: newQuestionTitle,
      uuid:"",
      type: selectedTypeOfQuestion,
      config: questionConfigMap[selectedTypeOfQuestion] || {},
      required: false,
    };

    startTransition(async () => {
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
    });
  };

const updateQuestionTitle = (id: string, title: string) => {
    const question = questions.find(q => q.id === id);

    if (!question) {
      toast.error("Question not found");
      return;
    }

    const previousTitle = question.title;


    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, title } : q))
    );

    debouncedUpdateTitle(
      uuidRef.current!,
      id,
      title,
      previousTitle
    );
};

  const updateQuestionRequired = (id: string, required: boolean) => {
    const previousQuestion = questions.find(q => q.id === id);

    if (!previousQuestion) {
      toast.error("Question not found");
      return;
    }

    console.log("Id", id)

    const previousRequired = previousQuestion.required;

    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, required } : q))
    );

    startTransition(async () => {
      setLoading(true);

      const result = await ChangesRequiredState(uuidRef.current!,
        id,
        required, // Your upsert already handles this
      );

      setLoading(false);

      if (result.success && result.data) {
        setQuestions((prev) =>
          prev.map((q) => (q.id === id ? result.data! : q))
        );
        toast.success(result.message)
      } else {
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === id ? { ...q, required: previousRequired } : q
          )
        );
        toast.error(result.message || "Failed to update question");
      }
    });
  };

  const deleteQuestion = async (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    startTransition(async () => {
      setLoading(true);
      const result = await deleteQuestionFromDatabase(uuidRef.current!, id);
      setLoading(false);

      if (result.success === false) {
        toast.error("Failed to delete question");
        const deletedQuestion = questions.find(q => q.id === id);
        if (deletedQuestion) {
          setQuestions((prev) => [...prev, deletedQuestion]);
        }
      } else {
        toast.success("Question deleted");
      }
    });
  };

  const duplicateQuestion = async (id: string) => {
    const questionToDuplicate = questions.find((q) => q.id === id);
    if (!questionToDuplicate) return;

    const newQuestion: Omit<Question, 'id'> = {
      title: `${questionToDuplicate.title} (Copy)`,
      type: questionToDuplicate.type,
      config: { ...questionToDuplicate.config },
      required: questionToDuplicate.required,
      uuid:""
    };

    startTransition(async () => {
      setLoading(true);
      const result = await createQuestionInDatabase(uuidRef.current!, newQuestion);
      setLoading(false);

      if (result.success && result.data) {
        setQuestions((prev) => [...prev, result.data!]);
        toast.success("Question duplicated");
      } else {
        toast.error("Failed to duplicate question");
      }
    });
  };


  const updateQuestionOptions = (id: string, options: string[]) => {
    const question = questions.find(q => q.id === id);
    if (!question) return;

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, config: { ...q.config, options } } : q
      )
    );

    startTransition(async () => {
     debounceUpdateForOptions(
      uuidRef.current!,
      id,
      {...question.config,options}
     )
    });
  };

  const updateDesignConfiguration = (
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

      startTransition(async () =>
        debounceChangesForFormDesignConfigurationUpdated.current?.(
          mapDesignConfigurationtoPayload(updated)
        )
      );

      return updated;
    });
  };

  const updateFormSettingChanges = (
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
      const updated = {
        ...prev,
        [key]: value
      }

      startTransition(() => (
        debounceChangesForFormSettingConfigurationUpdated.current?.(mapSettingConfigurationToPayload(updated))
      ))


      return updated;
    })



    console.log(formSettingConfiguration);
  };

  const handlePublishEvent = () => {
    
    startTransition(async () => {
      setLoading(true)
      
      const result = await PublishFormToServer(
        uuidRef.current!,
        formHeaderConfiguration,
        formSettingConfiguration,
        formDesignConfiguration,
        questions
      )

      if(result.success === false){
        toast.error(result.message)
      }

      if(result.success){
        toast.success(result.message)
      }
      setLoading(false)
    })

  };

  const handleDesignChanges = () => {
    console.log(selectedShade, selectedTheme);
    console.log(formDesignConfiguration);
  };

  const handleThemeSelection = (theme: Theme) => {
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
      startTransition(() => {
        debounceChangesForFormDesignConfigurationUpdated.current?.(
          mapDesignConfigurationtoPayload(updated)
        );
      });
      return updated;
    });

    setSelectedShade(theme.shades[0]);
  };

  const handleShadeSelection = (shade: string) => {
    setSelectedShade(shade);

    setFormDesignConfiguration((prev) => {
      const updated = {
        ...prev,
        colorConfiguration: {
          ...prev.colorConfiguration,
          background: shade,
        },
      };
      startTransition(() => {
        debounceChangesForFormDesignConfigurationUpdated.current?.(
          mapDesignConfigurationtoPayload(updated)
        );
      });
      return updated;
    });
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
    handleThemeSelection,
    handleShadeSelection,
    isPublished,
    setIsPublished
  };
};
