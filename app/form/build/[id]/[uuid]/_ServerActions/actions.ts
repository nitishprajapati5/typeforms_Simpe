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
  questions: Question[],
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

      if (questions.length > 0) {
        await tx.formQuestions.createMany({
          data: questions.map((q) => ({
            uuid: q.id,
            title: q.title,
            type: q.type,
            required: q.required,
            options: q.config,
            formId: res.id,
          })),
        });
      }

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
    success: false,
    message: '',
  };
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (any) {
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
