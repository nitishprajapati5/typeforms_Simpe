import prisma from '@/app/_DatabaseConfiguration/dbConfig';
import ViewResponsesClient from './_ClientComponents/ViewResponsesClient';
import { QuestionAnswers, UserResponses } from './types/responsetypes';

interface ViewResponsesFormProps {
  params: Promise<{ uuid: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function ViewResponsesForm({
  params,
  searchParams,
}: ViewResponsesFormProps) {
  const { uuid } = await params;
  const { page: pageParam } = await searchParams;

  const page = parseInt(pageParam || '1');
  const pageSize = 5;

  const userFormResponses = await prisma.responseFromUser.findMany({
    where: {
      formId: uuid,
    },
    include: {
      form: {
        include: {
          questions: true,
        },
      },
      User: {
        select: {
          email: true,
          username: true,
        },
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      submittedAt: 'asc',
    },
  });

  const totalCount = await prisma.responseFromUser.count({
    where: {
      formId: uuid,
    },
  });

  const answersWithQuestions: UserResponses = userFormResponses.map(
    (userFormResponse) => {
      const responseData =
        (userFormResponse.response as Record<string, string | string[]>) || {};

      const questionsWithAnswers: QuestionAnswers =
        userFormResponse.form.questions.map((question) => ({
          questionTitle: question.title,
          answer: responseData[question.id] || null,
        }));

      return {
        responseId: userFormResponse.id,
        user: userFormResponse.User.username,
        email: userFormResponse.User.email,
        submittedAt: userFormResponse.submittedAt,
        isSubmitted: userFormResponse.isSubmitted,
        questions: questionsWithAnswers,
      };
    }
  );

  const pagination = {
    page,
    pageSize,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };

  return (
    <ViewResponsesClient
      submittedResponse={answersWithQuestions}
      pagination={pagination}
    />
  );
}
