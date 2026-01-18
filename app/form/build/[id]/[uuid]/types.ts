// types.ts
export interface Theme {
  id: string;
  label: string;
  base: string;
  shades: string[];
}

export interface Question {
  id: string;
  title: string;
  type: string;
  config: {
    type?: string;
    placeholder?: string;
    rows?: number;
    options?: string[];
    accept?: string;
  };
  required: boolean;
}

export interface FormTitleConfig {
  formTitle: string;
  placeholder: string;
  isTitleBold: boolean;
  isTitleItalic: boolean;
  isTitleUnderline: boolean;
  TitleAlign:string | null
}

export interface FormDescriptionConfig {
  formDescription: string;
  placeholder: string;
  isDescriptionBold: boolean;
  isDescriptionItalic: boolean;
  isDescriptionUnderline: boolean;
  DescriptionAlign:string | null
}

export interface FormConfigurationType {
  formId: string | null;
  title: FormTitleConfig;
  description: FormDescriptionConfig;
}

export interface DesignConfig {
  fontSelected: string;
  size: number;
}

export interface FormDesignConfiguration {
  headerDesign: { fontSelected: string; size: number };
  questionDesign: { fontSelected: string; size: number };
  textDesign: { fontSelected: string; size: number };
  headerImage: string;
  colorConfiguration: {
    color: string;
    background: string;
  };
}

export interface FormSettingsConfiguration {
  shuffleQuestionOrder: boolean;
  showProgressBar: boolean;
  responseConfirmationMessage: string;
  showLinkToSubmitAnotherResponse: boolean;
  requiredSignIn: boolean;
  limitResponseToOne: boolean;
  isPublished: boolean;
}

export type FormResponseFromDatabaseForFormDesign = {
  id: string;
  formId: string;
  headerDesign: JsonValue;
  questionDesign: JsonValue;
  textDesign: JsonValue;
  colorConfiguration: JsonValue;
  headerImage: string | null; // Changed to allow null
};

export type FormResponseFromDatabaseForFormSetting = {
  id: string;
  formId: string;
  limitResponseToOne: boolean;
  requiredSignIn: boolean;
  responseConfirmationMessage: string;
  showLinkToSubmitAnotherResponse: boolean;
  showProgressBar: boolean;
  shuffleQuestionOrder: boolean;
  isPublished: boolean;
};

export type FormResponseFromDatabaseHeaderConfig = {
  id: string ;
  formId: string | null;
  formTitle: string | null;
  titlePlaceholder: string | null;
  isTitleBold: boolean | null;
  isTitleItalic: boolean | null;
  isTitleUnderline: boolean | null;
  titleAlign: string | null ;
  formDescription: string |  null;
  descriptionPlaceholder: string | null;
  isDescriptionBold: boolean | null;
  isDescriptionItalic: boolean | null;
  isDescriptionUnderline: boolean | null;
  descriptionAlign: string | null;
};

export interface QuestionConfig {
  type?: string;
  placeholder?: string;
  rows?: number;
  options?: string[];
  accept?: string;
}

export interface Question {
  id: string;
  title: string;
  type: string;
  config: QuestionConfig;
  required: boolean;
}

export type FormResponseFromDatabaseQuestion = {
  id: string;
  uuid: string;
  formId: string;
  required: boolean;
  title: string | null; // Also allow null since your error shows this can be null
  type: string;
  options: JsonValue;
};

export type FormResponseFromDatabase = {
  id: string;
  formId: string;
  workspaceId: string;
  userId: string;
  formDesign: FormResponseFromDatabaseForFormDesign | null;
  formSettings: FormResponseFromDatabaseForFormSetting | null;
  headerConfig: FormResponseFromDatabaseHeaderConfig | null;
  questions: FormResponseFromDatabaseQuestion[];
};

export type JsonArray = {
    [n: number]: JsonValue;
    length: number;
};
export type JsonObject = {
    [x: string]: JsonValue | undefined;
}

export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

export interface ColorConfig {
  color: string;
  background: string;
}

export interface HeaderDesign {
  fontSelected: string;
  size: number;
}


export type DesignKey = "fontSelected" | "size";
export type DesignType = "headerDesign" | "questionDesign" | "textDesign";