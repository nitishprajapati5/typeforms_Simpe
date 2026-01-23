// app/actions/form-actions.ts
'use server';

import prisma from '@/app/_DatabaseConfiguration/dbConfig';
import { headers } from 'next/headers';
import { getSession } from '@/app/_ClientComponents/UtiltiyFunction';
import { redirect } from 'next/navigation';

interface SubmitFormResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  error?: string;
}

interface FormValues {
  [key: string]: string | string[];
}

export async function submitFormResponse(
  formId: string,
  responses: FormValues
): Promise<SubmitFormResponse | never> {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  if (!formId || !responses) {
    return {
      success: false,
      message: 'Missing required fields',
      error: 'formId and responses are required',
    };
  }

  try {
    const headersList = await headers();
    const ipAddress =
      headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
      headersList.get('x-real-ip') ||
      'unknown';

    const form = await prisma.formData.findUnique({
      where: { id: formId },
      include: {
        questions: true,
      },
    });

    if (!form) {
      return {
        success: false,
        message: 'Form not found',
        error: 'The specified form does not exist',
      };
    }

    const requiredQuestions = form.questions.filter((q) => q.required);
    const missingFields = requiredQuestions
      .filter((q) => !responses[q.id] || responses[q.id] === '')
      .map((q) => q.title || 'Untitled question');

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Please fill in required fields: ${missingFields.join(', ')}`,
        error: 'VALIDATION_ERROR',
      };
    }

    await prisma.responseFromUser.update({
      where: { formId: formId },
      data: {
        formId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response: responses as any,
        ipAddress,
        userId: session.id,
      },
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      message: 'Failed to submit form',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  redirect(`/response/submit/${formId}`);
}

export async function getFormResponses(
  formId: string,
  options?: { skip?: number; take?: number }
) {
  try {
    const { skip = 0, take = 100 } = options || {};

    const [responses, total] = await Promise.all([
      prisma.responseFromUser.findMany({
        where: { formId },
        orderBy: { submittedAt: 'desc' },
        skip,
        take,
      }),
      prisma.responseFromUser.count({ where: { formId } }),
    ]);

    return {
      success: true,
      responses,
      total,
      skip,
      take,
    };
  } catch (error) {
    console.error('Error fetching responses:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getFormResponseById(responseId: string) {
  try {
    const response = await prisma.responseFromUser.findUnique({
      where: { id: responseId },
      include: {
        form: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!response) {
      return {
        success: false,
        error: 'Response not found',
      };
    }

    return {
      success: true,
      response,
    };
  } catch (error) {
    console.error('Error fetching response:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteFormResponse(responseId: string) {
  try {
    await prisma.responseFromUser.delete({
      where: { id: responseId },
    });

    return {
      success: true,
      message: 'Response deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting response:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getFormStats(formId: string) {
  try {
    const [totalResponses, recentResponses] = await Promise.all([
      prisma.responseFromUser.count({ where: { formId } }),
      prisma.responseFromUser.findMany({
        where: { formId },
        orderBy: { submittedAt: 'desc' },
        take: 10,
        select: {
          id: true,
          submittedAt: true,
        },
      }),
    ]);

    return {
      success: true,
      stats: {
        totalResponses,
        recentResponses,
      },
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
