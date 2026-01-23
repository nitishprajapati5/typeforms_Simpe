'use client';

import { Users, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

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

interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface ViewResponsesClientProps {
  submittedResponse: UserResponse[];
  pagination: PaginationInfo;
}

export default function ViewResponsesClient({
  submittedResponse,
  pagination,
}: ViewResponsesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const displayResponses =
    submittedResponse.length > 0 ? submittedResponse : [];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Form Responses
          </h1>
          <p className="text-gray-600">View individual responses</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Total Responses</p>
                  <p className="text-4xl font-bold">{pagination.totalCount}</p>
                </div>
                <Users className="w-12 h-12 opacity-80" />
              </div>
            </div>

            <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">
                    Latest Response
                  </p>
                  <p className="text-xl font-bold">
                    {displayResponses.length > 0
                      ? formatDate(displayResponses[0].submittedAt).split(
                          ','
                        )[0]
                      : 'No responses yet'}
                  </p>
                </div>
                <Calendar className="w-12 h-12 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 bg-linear-to-r from-blue-50 to-purple-50 px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Individual Responses
            </h2>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              {displayResponses.map((response) => (
                <div
                  key={response.responseId}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {response.user.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {response.user}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {response.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(response.submittedAt)}
                    </span>
                  </div>
                  {response.questions.length > 0 ? (
                    <div className="space-y-4 ml-16">
                      {response.questions.map((question, qIdx) => (
                        <div
                          key={qIdx}
                          className="border-l-2 border-blue-300 pl-4"
                        >
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            {question.questionTitle || `Question ${qIdx + 1}`}
                          </p>
                          <p className="text-gray-800">
                            {Array.isArray(question.answer)
                              ? question.answer.join(', ')
                              : question.answer || 'No answer provided'}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 ml-16">
                      <p className="text-gray-600 italic">
                        No Response Yet Recorded!
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
                  {Math.min(
                    pagination.page * pagination.pageSize,
                    pagination.totalCount
                  )}{' '}
                  of {pagination.totalCount} responses
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    ).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-lg ${
                          pageNum === pagination.page
                            ? 'bg-blue-500 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
