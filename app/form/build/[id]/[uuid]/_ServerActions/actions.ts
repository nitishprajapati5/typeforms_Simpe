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
      // 1️⃣ Form Header Configuration

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

export async function updateSingleQuestionToDatabase(
  uuid: string,
  payload: Partial<Pick<Question,"title" | "id">>
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

    await prisma.formQuestions.update({
      where:{
        uuid:payload.id,
        formId:res.id
      },
      data:{
        title:payload.title,
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
      message: ""
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
}

export async function ChangesRequiredState(
  formUuid: string,
  questionId: string,
  required: boolean
): Promise<ActionResponse<Question>> {
  try {
    const user = await getSession();
    if (!user) redirect('/login');

    const form = await prisma.formData.findUnique({
      where: { formId: formUuid },
    });
    if (!form) redirect('/login');

    const existingQuestion = await prisma.formQuestions.findUnique({
      where: { uuid: questionId },
    });

    if (!existingQuestion || existingQuestion.formId !== form.id) {
      return {
        success: false,
        message: "Question not found or unauthorized",
      };
    }

    const updated = await prisma.formQuestions.update({
      where: {
        uuid: questionId,
      },
      data: {
        required: required,
      },
    });

    const question: Question = {
      id: updated.uuid,
      title: updated.title!,
      type: updated.type,
      required: updated.required,
      config: updated.options as Question['config'],
    };

    return {
      success: true,
      message: "Required state updated successfully",
      data: question,
    };
  } catch (error) {
    console.error("Error updating required state:", error);
    return {
      success: false,
      message: "Failed to update required state",
    };
  }
}

export async function upsertQuestionInDatabase(
  formUuid: string,
  payload: Partial<Question> & { id: string } 
): Promise<ActionResponse<Question>> {
  try {
    const user = await getSession();
    if (!user) redirect('/login');

    const form = await prisma.formData.findUnique({
      where: { formId: formUuid },
    });
    if (!form) redirect('/login');

    const updated = await prisma.formQuestions.upsert({
      where: {
        uuid: payload.id,
      },
      update: {
        ...(payload.title && { title: payload.title }),
        ...(payload.type && { type: payload.type }),
        ...(payload.required !== undefined && { required: payload.required }),
        ...(payload.config && { options: payload.config }),
      },
      create: {
        uuid: payload.id,
        title: payload.title!,
        type: payload.type!,
        required: payload.required ?? false,
        options: payload.config || {},
        formId: form.id,
      },
    });

    const question: Question = {
      id: updated.uuid,
      title: updated.title!,
      type: updated.type,
      required: updated.required,
      config: updated.options as Question['config'],
    };

    return {
      success: true,
      message: "Question saved successfully",
      data: question,
    };
  } catch (error) {
    console.error("Error upserting question:", error);
    return {
      success: false,
      message: "Failed to save question",
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