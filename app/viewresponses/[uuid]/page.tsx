import prisma from '@/app/_DatabaseConfiguration/dbConfig';
import ViewResponsesClient from './_ClientComponents/ViewResponsesClient';

interface ViewResponsesFormProps {
  params: Promise<{ uuid: string }>;
  searchParams: Promise<{ page?: string }>; // Fixed: removed = sign
}

interface QuestionAnswer {
  questionTitle: string | null;
  answer: string | string[] | null;
}

interface UserResponse {
  responseId: string;
  user: string;
  email: string;
  submittedAt: Date;
  isSubmitted: boolean;
  questions: QuestionAnswer[];
}

interface DateCount {
  day: string;
  responses: number;
}

export default async function ViewResponsesForm({
  params,
  searchParams,
}: ViewResponsesFormProps) {
  const { uuid } = await params;
  const { page: pageParam } = await searchParams;

  const page = parseInt(pageParam || '1');
  const pageSize = 5;

  type DatesWithCount = Record<string, number>;

  const allResponses = await prisma.responseFromUser.findMany({
    select: {
      submittedAt: true,
    },
  });

  const datesWithCount: DatesWithCount = allResponses.reduce(
    (acc, response) => {
      const dateKey = response.submittedAt.toISOString().split('T')[0];
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    },
    {} as DatesWithCount
  );

  const latestFourChronological: DateCount[] = Object.entries(datesWithCount)
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .slice(0, 4)
    .reverse()
    .map(([date, count]) => {
      const dateObj = new Date(date);
      const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
      const day = dateObj.getDate();

      return {
        day: `${month} ${day}`,
        responses: count,
      };
    });

  console.log(latestFourChronological);

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

  // Get total count for pagination
  const totalCount = await prisma.responseFromUser.count({
    where: {
      formId: uuid,
    },
  });

  const answersWithQuestions: UserResponse[] = userFormResponses.map(
    (userFormResponse) => {
      const responseData =
        (userFormResponse.response as Record<string, string | string[]>) || {};

      const questionsWithAnswers: QuestionAnswer[] =
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
