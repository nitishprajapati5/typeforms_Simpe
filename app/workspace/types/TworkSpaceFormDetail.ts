export type TworkSpaceFormDetails = TworkSpaceFormDetail[];

export type TworkSpaceFormDetail = {
  id: string;
  workspaceId: string;
  userId: string;
  formId: string;
  headerConfig: {
    formTitle: string | null;
    id: string;
  } | null;
  formSettings: {
    isPublished: boolean;
  } | null;
};
