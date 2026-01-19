import Image from 'next/image';
import Link from 'next/link';
import { Edit2, Trash2 } from 'lucide-react';
import { TworkSpaceFormDetails } from '../../types/TworkSpaceFormDetail';
import { ServerPagination } from './ServerPagination';
import { Badge } from '@/components/ui/badge';

type Props = {
  forms: TworkSpaceFormDetails;
  currentPage: number;
  totalPages: number;
  workspaceId: string;
};

export const WorkSpaceFormsTable = ({
  forms,
  currentPage,
  totalPages,
  workspaceId,
}: Props) => {
  if (!forms || forms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <Image
          src="/empty-box.svg"
          alt="Empty Box"
          height={300}
          width={300}
          className="opacity-70"
        />
        <p className="text-sm text-muted-foreground">
          No forms found in this workspace
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-muted/40">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
              Form Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {forms.map((form) => {
            const title = form.headerConfig?.formTitle ?? 'Default Name';

            return (
              <tr key={form.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">
                  {title}{' '}
                  <span>
                    {form.formSettings?.isPublished === true ? (
                      <Badge className="bg-green-500">Published</Badge>
                    ) : (
                      <Badge className="bg-gray-500">Not Published</Badge>
                    )}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/form/build/${form.workspaceId}/${form.formId}`}
                      className="text-primary hover:opacity-80"
                    >
                      <Edit2 size={16} />
                    </Link>

                    <button className="text-destructive hover:opacity-80">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ServerPagination
        currentPage={currentPage}
        totalPages={totalPages}
        workspaceId={workspaceId}
      />
    </div>
  );
};
