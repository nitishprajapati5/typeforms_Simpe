// hooks/.ts
import { startTransition, useEffect, useRef, useState } from 'react';
import {
  Question,
  FormConfigurationType,
  FormDesignConfiguration,
  Theme,
  DesignType,
  FormTitleConfig,
  FormDescriptionConfig,
  FormSettingsConfiguration,
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
  upsertQuestionInDatabase,
  ChangesRequiredState,
} from '../_ServerActions/actions';
import { toast } from 'sonner';
import { UseDebouncedHook } from './useDebounce';
import {
  mapDescriptionToPayload,
  mapDesignConfigurationtoPayload,
  mapSettingConfigurationToPayload,
  mapTitleToPayload,
} from '../Mappers/formHeader';

export const useFormBuilder = () => {
  const [formName, setFormName] = useState('My new form');
  const uuidRef = useRef<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formDesignConfiguration, setFormDesignConfiguration] =
    useState<FormDesignConfiguration>(INITIAL_DESIGN_CONFIG);
  const [formHeaderConfiguration, setFormHeaderConfiguration] =
    useState<FormConfigurationType>(INITIAL_FORM_HEADER_CONFIG);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [selectedTypeOfQuestion, setSelectedTypeOfQuestion] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(themes[0]);
  const [selectedShade, setSelectedShade] = useState<string | null>(
    themes[0].shades[0]
  );
  const [isSettingSheetOpen, setSettingSheetOpen] = useState(false);
  const [formSettingConfiguration, setFormSettingConfiguration] = useState(
    INITIAL_FORM_SETTINGS
  );

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

  // const addQuestion = () => {
  //   if (!selectedTypeOfQuestion || !newQuestionTitle.trim()) {
  //     alert('Please enter a question title and select a type');
  //     return;
  //   }

  //   const newQuestion: Question = {
  //     id: crypto.randomUUID(),
  //     title: newQuestionTitle,
  //     type: selectedTypeOfQuestion,
  //     config: questionConfigMap[selectedTypeOfQuestion] || {},
  //     required: false,
  //   };

  //   console.log(newQuestion)

  //   startTransition(async () => {
  //     debounceChangesForQuestionUpdate.current?.(mapQuestionToPayload(newQuestion))
  //   })

  //   setQuestions((prev) => [...prev, newQuestion]);
  //   setNewQuestionTitle('');
  //   setSelectedTypeOfQuestion('');
  // };

  // const addQuestion = async () => {
  //   if (!selectedTypeOfQuestion || !newQuestionTitle.trim()) {
  //     alert('Please enter a question title and select a type');
  //     return;
  //   }

  //   const questionData: Omit<Question, 'id'> = {
  //     title: newQuestionTitle,
  //     type: selectedTypeOfQuestion,
  //     config: questionConfigMap[selectedTypeOfQuestion] || {},
  //     required: false,
  //   };

  //   startTransition(async () => {
  //     debounceChangesForQuestionUpdate.current?.(mapQuestionToPayload(questionData))
  //   });

  //   setQuestions((prev) => [...prev, questionData]);

  // };

  const addQuestion = async () => {
  if (!selectedTypeOfQuestion || !newQuestionTitle.trim()) {
    alert('Please enter a question title and select a type');
    return;
  }

  const questionData: Omit<Question, 'id'> = {
    title: newQuestionTitle,
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

  // const updateQuestionTitle = (id: string, title: string) => {
  //   startTransition(() => {
  //     setQuestions((prev) =>
  //       prev.map((q) => (q.id === id ? { ...q, title } : q))
  //     );
  //   });

  //   debounceChangesForSingleQuestionUpdate.current?.({ id, title });

  // };

  const updateQuestionTitle = (id: string, title: string) => {
  const question = questions.find(q => q.id === id);
  
  if (!question) {
    toast.error("Question not found");
    return;
  }

  // Store previous state for potential revert
  const previousTitle = question.title;

  // Optimistic update (no need for startTransition here)
  setQuestions((prev) =>
    prev.map((q) => (q.id === id ? { ...q, title } : q))
  );

  // Debounce database update with revert capability
  startTransition(async () => {
    setLoading(true);
    
    const result = await upsertQuestionInDatabase(uuidRef.current!, {
      id,
      title,
    });
    
    setLoading(false);

    if (result.success && result.data) {
      // Sync with database response
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? result.data! : q))
      );
    } else {
      // Revert to previous state on failure
      setQuestions((prev) =>
        prev.map((q) => 
          q.id === id ? { ...q, title: previousTitle } : q
        )
      );
      toast.error(result.message || "Failed to update title");
    }
  });
};

  // const updateQuestionRequired = (id: string, required: boolean) => {
  //   // Update local state immediately
  //   setQuestions((prev) =>
  //     prev.map((q) => (q.id === id ? { ...q, required } : q))
  //   );

  //   // Persist to database
  //   const question = questions.find(q => q.id === id);
  //   if (question) {
  //     startTransition(async () => {
  //       debounceChangesForSingleQuestionUpdate.current?.({
  //         id,
  //         required,
  //       });
  //     });
  //   }
  // };

const updateQuestionRequired = (id: string, required: boolean) => {
  const previousQuestion = questions.find(q => q.id === id);
  
  if (!previousQuestion) {
    toast.error("Question not found");
    return;
  }

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

  // Optimistic update
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === id ? { ...q, config: { ...q.config, options } } : q
    )
  );

  startTransition(async () => {
    setLoading(true);
    
    const result = await upsertQuestionInDatabase(uuidRef.current!, {
      id,
      config: { ...question.config, options },
    });
    
    setLoading(false);

    if (result.success && result.data) {
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? result.data! : q))
      );
    } else {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === id ? { ...q, config: question.config } : q
        )
      );
      toast.error(result.message || "Failed to update options");
    }
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
    console.log(formHeaderConfiguration);
    console.log(questions);
    console.log(formSettingConfiguration);
    console.log(formDesignConfiguration);
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
    handleShadeSelection
  };
};
