'use server';

import {
  ActionResponse,
  getSession,
} from '@/app/_ClientComponents/UtiltiyFunction';
import { redirect } from 'next/navigation';
import {
  FormConfigurationType,
  FormDescriptionConfig,
  FormDesignConfiguration,
  FormSettingsConfiguration,
  FormTitleConfig,
  Question,
} from '../types';
import prisma from '@/app/_DatabaseConfiguration/dbConfig';
import { revalidatePath } from 'next/cache';

export async function initialValuePushToDatabase(
  uuid: string,
  formHeaderConfiguration: FormConfigurationType,
  formSettingConfiguration: FormSettingsConfiguration,
  formDesignConfiguration: FormDesignConfiguration
): Promise<ActionResponse> {
  const user = await getSession();

  if (!user) {
    redirect('/login');
  }

  const res = await prisma.formData.findUnique({
    where: { formId: uuid },
  });

  if (!res) {
    redirect('/login');
  }

  console.log(res);

  try {
    await prisma.$transaction(async (tx) => {
      await tx.formHeaderConfiguration.upsert({
        where: { formId: res?.id },
        update: {
          formTitle: formHeaderConfiguration.title.formTitle,
          titleAlign: formHeaderConfiguration.title.TitleAlign,
          titlePlaceholder: formHeaderConfiguration.title.placeholder,
          isTitleBold: formHeaderConfiguration.title.isTitleBold,
          isTitleItalic: formHeaderConfiguration.title.isTitleItalic,
          isTitleUnderline: formHeaderConfiguration.title.isTitleUnderline,

          formDescription: formHeaderConfiguration.description.formDescription,
          descriptionAlign:
            formHeaderConfiguration.description.DescriptionAlign,
          descriptionPlaceholder:
            formHeaderConfiguration.description.placeholder,
          isDescriptionBold:
            formHeaderConfiguration.description.isDescriptionBold,
          isDescriptionItalic:
            formHeaderConfiguration.description.isDescriptionItalic,
          isDescriptionUnderline:
            formHeaderConfiguration.description.isDescriptionUnderline,
        },
        create: {
          formId: res?.id,

          formTitle: formHeaderConfiguration.title.formTitle,
          titleAlign: formHeaderConfiguration.title.TitleAlign,
          titlePlaceholder: formHeaderConfiguration.title.placeholder,
          isTitleBold: formHeaderConfiguration.title.isTitleBold,
          isTitleItalic: formHeaderConfiguration.title.isTitleItalic,
          isTitleUnderline: formHeaderConfiguration.title.isTitleUnderline,

          formDescription: formHeaderConfiguration.description.formDescription,
          descriptionAlign:
            formHeaderConfiguration.description.DescriptionAlign,
          descriptionPlaceholder:
            formHeaderConfiguration.description.placeholder,
          isDescriptionBold:
            formHeaderConfiguration.description.isDescriptionBold,
          isDescriptionItalic:
            formHeaderConfiguration.description.isDescriptionItalic,
          isDescriptionUnderline:
            formHeaderConfiguration.description.isDescriptionUnderline,
        },
      });

      await tx.formSettingConfiguration.upsert({
        where: { formId: res.id },
        update: {
          limitResponseToOne: formSettingConfiguration.limitResponseToOne,
          requiredSignIn: formSettingConfiguration.requiredSignIn,
          showLinkToSubmitAnotherResponse:
            formSettingConfiguration.showLinkToSubmitAnotherResponse,
          showProgressBar: formSettingConfiguration.showProgressBar,
          shuffleQuestionOrder: formSettingConfiguration.shuffleQuestionOrder,
          isPublished: formSettingConfiguration.isPublished,
          responseConfirmationMessage:
            formSettingConfiguration.responseConfirmationMessage,
        },
        create: {
          formId: res.id,
          limitResponseToOne: formSettingConfiguration.limitResponseToOne,
          requiredSignIn: formSettingConfiguration.requiredSignIn,
          showLinkToSubmitAnotherResponse:
            formSettingConfiguration.showLinkToSubmitAnotherResponse,
          showProgressBar: formSettingConfiguration.showProgressBar,
          shuffleQuestionOrder: formSettingConfiguration.shuffleQuestionOrder,
          isPublished: formSettingConfiguration.isPublished,
          responseConfirmationMessage:
            formSettingConfiguration.responseConfirmationMessage,
        },
      });

      // 4️⃣ Design Configuration
      await tx.formDesignConfigurationSetting.upsert({
        where: { formId: res.id },
        update: {
          colorConfiguration: formDesignConfiguration.colorConfiguration,
          headerImage: formDesignConfiguration.headerImage,
          questionDesign: formDesignConfiguration.questionDesign,
          headerDesign: formDesignConfiguration.headerDesign,
          textDesign: formDesignConfiguration.textDesign,
        },
        create: {
          formId: res.id,
          colorConfiguration: formDesignConfiguration.colorConfiguration,
          headerImage: formDesignConfiguration.headerImage,
          questionDesign: formDesignConfiguration.questionDesign,
          headerDesign: formDesignConfiguration.headerDesign,
          textDesign: formDesignConfiguration.textDesign,
        },
      });
    });

    return {
      success: true,
      message: '',
    };
  } catch (error) {
    console.error('Transaction failed:', error);
    return {
      success: false,
      message: 'Failed to save form configuration',
    };
  }
}

export async function updateHeaderTitleConfiguration(
  uuid: string,
  payload: FormTitleConfig
): Promise<ActionResponse> {
  const user = await getSession();

  console.log(payload);

  if (!user) {
    redirect('/login');
  }

  const res = await prisma.formData.findUnique({
    where: { formId: uuid },
  });

  if (!res) {
    redirect('/login');
  }

  try {
    await prisma.formHeaderConfiguration.upsert({
      where: { formId: res?.id },
      update: {
        formTitle: payload.formTitle,
        titleAlign: payload.TitleAlign,
        titlePlaceholder: payload.placeholder,
        isTitleBold: payload.isTitleBold,
        isTitleItalic: payload.isTitleItalic,
        isTitleUnderline: payload.isTitleUnderline,
      },
      create: {
        formId: res?.id,

        formTitle: payload.formTitle,
        titleAlign: payload.TitleAlign,
        titlePlaceholder: payload.placeholder,
        isTitleBold: payload.isTitleBold,
        isTitleItalic: payload.isTitleItalic,
        isTitleUnderline: payload.isTitleUnderline,
      },
    });

    return {
      success: true,
      message: '',
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return {
      success: false,
      message: "Something went wrong"
    }
  }
}

export async function updateHeaderDescriptionConfiguration(
  uuid: string,
  payload: FormDescriptionConfig
): Promise<ActionResponse> {
  try {
    const user = await getSession();

    console.log(payload);

    if (!user) {
      redirect('/login');
    }

    const res = await prisma.formData.findUnique({
      where: { formId: uuid },
    });

    if (!res) {
      redirect('/login');
    }

    await prisma.formHeaderConfiguration.upsert({
      where: { formId: res.id },
      update: {
        formDescription: payload.formDescription,
        descriptionPlaceholder: payload.placeholder,
        isDescriptionBold: payload.isDescriptionBold,
        isDescriptionItalic: payload.isDescriptionItalic,
        isDescriptionUnderline: payload.isDescriptionUnderline,
        descriptionAlign: payload.DescriptionAlign,
      },
      create: {
        formId: res.id,
        formDescription: payload.formDescription,
        descriptionPlaceholder: payload.placeholder,
        isDescriptionBold: payload.isDescriptionBold,
        isDescriptionItalic: payload.isDescriptionItalic,
        isDescriptionUnderline: payload.isDescriptionUnderline,
        descriptionAlign: payload.DescriptionAlign,
      },
    });

    return {
      success: true,
      message: '',
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}

export async function updateFormDesignConfiguration(
  uuid: string,
  payload: FormDesignConfiguration
): Promise<ActionResponse> {
  try {
    const user = await getSession();

    console.log(payload);

    if (!user) {
      redirect('/login');
    }

    const res = await prisma.formData.findUnique({
      where: { formId: uuid },
    });

    if (!res) {
      redirect('/login');
    }

    await prisma.formDesignConfigurationSetting.upsert({
      where: { formId: res.id },
      update: {
        colorConfiguration: payload.colorConfiguration,
        headerDesign: payload.headerDesign,
        headerImage: payload.headerImage,
        questionDesign: payload.questionDesign,
        textDesign: payload.textDesign,
      },
      create: {
        formId: res.id,
        colorConfiguration: payload.colorConfiguration,
        headerDesign: payload.headerDesign,
        headerImage: payload.headerImage,
        questionDesign: payload.questionDesign,
        textDesign: payload.textDesign,
      },
    });

    return {
      success: true,
      message: '',
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}

export async function updateFormSettingConfiguration(
  uuid: string,
  payload: FormSettingsConfiguration
): Promise<ActionResponse> {
  try {
    const user = await getSession();

    console.log(payload);

    if (!user) {
      redirect('/login');
    }

    const res = await prisma.formData.findUnique({
      where: { formId: uuid },
    });

    if (!res) {
      redirect('/login');
    }

    await prisma.formSettingConfiguration.upsert({
      where: { formId: res.id },
      update: {
        limitResponseToOne: payload.limitResponseToOne,
        requiredSignIn: payload.limitResponseToOne,
        responseConfirmationMessage: payload.responseConfirmationMessage,
        showLinkToSubmitAnotherResponse: payload.showLinkToSubmitAnotherResponse,
        showProgressBar: payload.showProgressBar,
        shuffleQuestionOrder: payload.showProgressBar,
        isPublished: payload.isPublished
      },
      create: {
        formId: res.id,
        limitResponseToOne: payload.limitResponseToOne,
        requiredSignIn: payload.limitResponseToOne,
        responseConfirmationMessage: payload.responseConfirmationMessage,
        showLinkToSubmitAnotherResponse: payload.showLinkToSubmitAnotherResponse,
        showProgressBar: payload.showProgressBar,
        shuffleQuestionOrder: payload.showProgressBar,
        isPublished: payload.isPublished
      }
    })



    return {
      success: true,
      message: '',
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}

export async function updateByAddingQuestionToDatabase(
  uuid: string,
  payload: Question
): Promise<ActionResponse> {
  try {

    const user = await getSession();

    console.log("Payload Coming to Database", payload);

    if (!user) {
      redirect('/login');
    }

    const res = await prisma.formData.findUnique({
      where: { formId: uuid },
    });

    if (!res) {
      redirect('/login');
    }

    await prisma.formQuestions.create({
      data: {
        title: payload.title,
        uuid: payload.id,
        type: payload.type,
        options: payload.config,
        required: payload.required,
        formId: res.id
      }
    })

    return {
      success: true,
      message: ""
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Something went wrong"
    }
  }
}

export async function createQuestionInDatabase(
  formUuid: string,
  questionData: Omit<Question, 'id'>
): Promise<ActionResponse<Question>> {
  try {
    const user = await getSession();
    if (!user) redirect('/login');

    const form = await prisma.formData.findUnique({
      where: { formId: formUuid },
    });
    if (!form) redirect('/login');

    const created = await prisma.formQuestions.create({
      data: {
        uuid: crypto.randomUUID(),
        title: questionData.title,
        type: questionData.type,
        required: questionData.required,
        options: questionData.config,
        formId: form.id,
      },
    });

    const question: Question = {
      id: created.uuid,
      title: created.title!,
      type: created.type,
      required: created.required,
      config: created.options as Question['config'],
    };

    return {
      success: true,
      message: "Question created successfully",
      data: question,
    };
  } catch (error) {
    console.error("Error creating question:", error);
    return {
      success: false,
      message: "Failed to create question"
    };
  }
};

export async function ChangesRequiredState(
  uuid: string,
  questionId: string,
  required: boolean
): Promise<ActionResponse<Question>> {
  try {
    const user = await getSession();
    if (!user) redirect('/login');

    console.log("UUID", uuid)
    console.log("QuestionID", questionId)
    console.log("Required Value", required)

    const existingQuestion = await prisma.formQuestions.findUnique({
      where: {
        id: questionId,
        //uuid:uuid
      }
    })

    if (!existingQuestion) {
      return {
        success: false,
        message: "Question Not Found",
      };
    }

    const updated = await prisma.formQuestions.update({
      where: {
        id: questionId,
        //uuid:uuid
      },
      data: {
        required: required,
      },
    });

    const question: Question = {
      id: updated.id,
      title: updated.title!,
      type: updated.type,
      required: updated.required,
      config: updated.options as Question['config'],
    };

    {
      //   "_id": {
      //     "$oid": "696bb5a19c526cdcf55804a0"
      //   },
      //   "uuid": "57500457-026e-4309-81b0-79054dd30ad7",
      //   "required": true,
      //   "title": "Adding New Question #3",
      //   "type": "Drop Down",
      //   "options": {
      //     "options": [
      //       "Option 1",
      //       "Option 2",
      //       "Option 3"
      //     ]
      //   },
      //   "formId": {
      //     "$oid": "696b6d99352e9ffb281eae9b"
      //   }
      // }


      return {
        success: true,
        message: "Required state updated successfully",
        data: question,
      }
    }
  } catch (error) {
    console.error("Error updating required state:", error);
    return {
      success: false,
      message: "Failed to update required state",
    };
  }
}

export async function updateQuestionOptionsInDatabase(
  uuid: string,
  questionId: string,
  config: Question["config"]
) {
  try {
    const user = await getSession();
    if (!user) redirect('/login');

    console.log("UUID", uuid)
    console.log("QuestionID", questionId)

    const existingQuestion = await prisma.formQuestions.findUnique({
      where: {
        id: questionId,
      }
    })

    if (!existingQuestion) {
      return {
        success: false,
        message: "Question Not Found",
      };
    }

    const updated = await prisma.formQuestions.update({
      where: {
        id: questionId,
      },
      data: {
        options: config,
      },
    });

    console.log(updated)

    const question: Question = {
      id: updated.id,
      title: updated.title!,
      type: updated.type,
      required: updated.required,
      config: updated.options as Question['config'],
    };


    return {
      success: true,
      message: "Required state updated successfully",
      data: question,
    }
  } catch (error) {
    console.error("Error updating required state:", error);
    return {
      success: false,
      message: "Failed to update required state",
    };

  }
}


export async function updateQuestionTitleInDatabase(
  uuid: string,
  questionId: string,
  title: string
): Promise<ActionResponse<Question>> {
  try {
    const user = await getSession();
    if (!user) redirect('/login');

    console.log("UUID", uuid)
    console.log("QuestionID", questionId)

    const existingQuestion = await prisma.formQuestions.findUnique({
      where: {
        id: questionId,
      }
    })

    if (!existingQuestion) {
      return {
        success: false,
        message: "Question Not Found",
      };
    }

    const updated = await prisma.formQuestions.update({
      where: {
        id: questionId,
      },
      data: {
        title: title,
      },
    });

    console.log(updated)

    const question: Question = {
      id: updated.id,
      title: updated.title!,
      type: updated.type,
      required: updated.required,
      config: updated.options as Question['config'],
    };


    return {
      success: true,
      message: "Required state updated successfully",
      data: question,
    }
  } catch (error) {
    console.error("Error updating required state:", error);
    return {
      success: false,
      message: "Failed to update required state",
    };

  }
}

export async function deleteQuestionFromDatabase(
  formUuid: string,
  questionId: string
): Promise<ActionResponse> {
  try {
    const user = await getSession();
    if (!user) redirect('/login');

    const form = await prisma.formData.findUnique({
      where: { formId: formUuid },
    });
    if (!form) redirect('/login');

    await prisma.formQuestions.delete({
      where: {
        uuid: questionId,
        formId: form.id,
      },
    });

    return {
      success: true,
      message: "Question deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting question:", error);
    return {
      success: false,
      message: "Failed to delete question",
    };
  }
}

export async function PublishFormToServer(
  uuid: string,
  formHeaderConfiguration: FormConfigurationType,
  formSettingConfiguration: FormSettingsConfiguration,
  formDesignConfiguration: FormDesignConfiguration,
  questions: Question[]
): Promise<ActionResponse> {
  const user = await getSession();

  if (!user) {
    redirect('/login');
  }

  const res = await prisma.formData.findUnique({
    where: { formId: uuid },
  });

  if (!res) {
    redirect('/login');
  }


  try {
    await prisma.$transaction(async (tx) => {
      await tx.formHeaderConfiguration.upsert({
        where: { formId: res?.id },
        update: {
          formTitle: formHeaderConfiguration.title.formTitle,
          titleAlign: formHeaderConfiguration.title.TitleAlign,
          titlePlaceholder: formHeaderConfiguration.title.placeholder,
          isTitleBold: formHeaderConfiguration.title.isTitleBold,
          isTitleItalic: formHeaderConfiguration.title.isTitleItalic,
          isTitleUnderline: formHeaderConfiguration.title.isTitleUnderline,

          formDescription: formHeaderConfiguration.description.formDescription,
          descriptionAlign: formHeaderConfiguration.description.DescriptionAlign,
          descriptionPlaceholder: formHeaderConfiguration.description.placeholder,
          isDescriptionBold: formHeaderConfiguration.description.isDescriptionBold,
          isDescriptionItalic: formHeaderConfiguration.description.isDescriptionItalic,
          isDescriptionUnderline: formHeaderConfiguration.description.isDescriptionUnderline,
        },
        create: {
          formId: res?.id,
          formTitle: formHeaderConfiguration.title.formTitle,
          titleAlign: formHeaderConfiguration.title.TitleAlign,
          titlePlaceholder: formHeaderConfiguration.title.placeholder,
          isTitleBold: formHeaderConfiguration.title.isTitleBold,
          isTitleItalic: formHeaderConfiguration.title.isTitleItalic,
          isTitleUnderline: formHeaderConfiguration.title.isTitleUnderline,

          formDescription: formHeaderConfiguration.description.formDescription,
          descriptionAlign: formHeaderConfiguration.description.DescriptionAlign,
          descriptionPlaceholder: formHeaderConfiguration.description.placeholder,
          isDescriptionBold: formHeaderConfiguration.description.isDescriptionBold,
          isDescriptionItalic: formHeaderConfiguration.description.isDescriptionItalic,
          isDescriptionUnderline: formHeaderConfiguration.description.isDescriptionUnderline,
        },
      });
      await tx.formSettingConfiguration.upsert({
        where: { formId: res.id },
        update: {
          limitResponseToOne: formSettingConfiguration.limitResponseToOne,
          requiredSignIn: formSettingConfiguration.requiredSignIn,
          showLinkToSubmitAnotherResponse: formSettingConfiguration.showLinkToSubmitAnotherResponse,
          showProgressBar: formSettingConfiguration.showProgressBar,
          shuffleQuestionOrder: formSettingConfiguration.shuffleQuestionOrder,
          isPublished: true,
          responseConfirmationMessage: formSettingConfiguration.responseConfirmationMessage,
        },
        create: {
          formId: res.id,
          limitResponseToOne: formSettingConfiguration.limitResponseToOne,
          requiredSignIn: formSettingConfiguration.requiredSignIn,
          showLinkToSubmitAnotherResponse: formSettingConfiguration.showLinkToSubmitAnotherResponse,
          showProgressBar: formSettingConfiguration.showProgressBar,
          shuffleQuestionOrder: formSettingConfiguration.shuffleQuestionOrder,
          isPublished: formSettingConfiguration.isPublished,
          responseConfirmationMessage: formSettingConfiguration.responseConfirmationMessage,
        },
      });

      await tx.formDesignConfigurationSetting.upsert({
        where: { formId: res.id },
        update: {
          colorConfiguration: formDesignConfiguration.colorConfiguration,
          headerImage: formDesignConfiguration.headerImage,
          questionDesign: formDesignConfiguration.questionDesign,
          headerDesign: formDesignConfiguration.headerDesign,
          textDesign: formDesignConfiguration.textDesign,
        },
        create: {
          formId: res.id,
          colorConfiguration: formDesignConfiguration.colorConfiguration,
          headerImage: formDesignConfiguration.headerImage,
          questionDesign: formDesignConfiguration.questionDesign,
          headerDesign: formDesignConfiguration.headerDesign,
          textDesign: formDesignConfiguration.textDesign,
        },
      });

      if (questions.length > 0) {
        await Promise.all(
          questions.map(question =>
            tx.formQuestions.upsert({
              where: {
                id: question.id,
              },
              update: {
                title: question.title,
                type: question.type,
                required: question.required,
                options: question.config,
              },
              create: {
                uuid: crypto.randomUUID(),
                formId: res.id,
                title: question.title,
                type: question.type,
                required: question.required,
                options: question.config,
              },
            })
          )
        );
      }
    });

    revalidatePath(`/form/build/${res.workspaceId}/${uuid}`)

    return {
      success: true,
      message: 'Form published successfully',
    };
  } catch (error) {
    console.error('Transaction failed:', error);
    return {
      success: false,
      message: 'Failed to save form configuration',
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function RevertFormPublishActionToServer(prevState:any,formData:FormData):Promise<ActionResponse>{

  try {
    const uuid = formData.get("uuid") as string

   const user = await getSession();

  if (!user) {
    redirect('/login');
  }

  const res = await prisma.formData.findUnique({
    where: { formId: uuid },
  });

  if (!res) {
    redirect('/login');
  }

  console.log("res",res)

  await prisma.formSettingConfiguration.update({
    where:{formId:res.id},
    data:{
      isPublished:false
    }
  })
  revalidatePath(`/form/build/${res.workspaceId}/${uuid}`)

  return {success:true,message:"Unpublished the Link Successfully."}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error:unknown) {
    return {
      success:false,
      message:"Something went wrong",
    }
  }

}