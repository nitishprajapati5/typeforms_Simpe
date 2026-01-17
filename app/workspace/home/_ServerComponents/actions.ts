import prisma from '@/app/_DatabaseConfiguration/dbConfig';

const PAGE_SIZE = 9;

export const getWorkSpaceForms = async ({
  workspaceId,
  userId,
  page = 1,
}: {
  workspaceId: string;
  userId: string;
  page: number;
}) => {
  const skip = (page - 1) * PAGE_SIZE;

  const [forms, total] = await prisma.$transaction([
    prisma.formData.findMany({
      where: {
        workspaceId,
        userId,
      },
      skip,
      take: PAGE_SIZE,
      select: {
        id: true,
        formId: true,
        workspaceId: true,
        userId: true,
        headerConfig: {
          select: {
            id: true,
            formTitle: true,
          },
        },
      },
    }),
    prisma.formData.count({
      where: {
        workspaceId,
        userId,
      },
    }),
  ]);

  return {
    forms,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
    currentPage: page,
  };
};
