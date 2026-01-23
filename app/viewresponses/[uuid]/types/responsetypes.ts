export interface QuestionAnswer {
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

export interface ViewResponsesClientProps {
  submittedResponse: UserResponse[];
  dates: DateCount[];
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export type UserResponses = UserResponse[];
export type QuestionAnswers = QuestionAnswer[];
