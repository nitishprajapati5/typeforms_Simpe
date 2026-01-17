import Link from 'next/link';

type Props = {
  currentPage: number;
  totalPages: number;
  workspaceId: string;
};

export const ServerPagination = ({
  currentPage,
  totalPages,
  workspaceId,
}: Props) => {
  if (totalPages <= 1) return null;

  console.log('Current Page', currentPage);

  return (
    <div className="flex items-center justify-end gap-2 p-4">
      <Link
        href={
          currentPage === 2
            ? `/workspace/home/${workspaceId}`
            : `/workspace/home/${workspaceId}?page=${currentPage - 1}`
        }
        className={`rounded-md border px-3 py-1 text-sm ${
          currentPage === 1 && 'pointer-events-none opacity-50'
        }`}
      >
        Previous
      </Link>

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`/workspace/home/${workspaceId}?page=${currentPage + 1}`}
        className={`rounded-md border px-3 py-1 text-sm ${
          currentPage === totalPages && 'pointer-events-none opacity-50'
        }`}
      >
        Next
      </Link>
    </div>
  );
};
