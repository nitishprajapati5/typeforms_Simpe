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
  TitleAlign: "left" | "center" | "right";
}

export interface FormDescriptionConfig {
  formDescription: string;
  placeholder: string;
  isDescriptionBold: boolean;
  isDescriptionItalic: boolean;
  isDescriptionUnderline: boolean;
  DescriptionAlign: "left" | "center" | "right";
}

export interface FormConfigurationType {
  formId: string;
  title: FormTitleConfig;
  description: FormDescriptionConfig;
}

export interface DesignConfig {
  fontSelected: string;
  size: number;
}

export interface FormDesignConfiguration {
  headerDesign: DesignConfig;
  questionDesign: DesignConfig;
  textDesign: DesignConfig;
  headerImage: string;
  colorConfiguration: {
    color: string;
    background: string;
  };
}

export interface FormSettingsConfiguration {
  shuffleQuestionOrder:boolean,
  showProgressBar:boolean,
  responseConfirmationMessage:string | "Your Message have been recorded",
  showLinkToSubmitAnotherResponse:boolean,
  requiredSignIn:boolean,
  limitResponseToOne:boolean
}

export type DesignKey = "fontSelected" | "size";
export type DesignType = "headerDesign" | "questionDesign" | "textDesign";