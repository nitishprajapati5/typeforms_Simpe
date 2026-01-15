import { FormConfigurationType,FormDesignConfiguration, FormSettingsConfiguration } from "./types";
export const FONT_AND_SIZE_SETTINGS = {
  Fonts: ["Roboto", "Sans", "Monteserrat"],
  Size: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
};

export const INITIAL_FORM_HEADER_CONFIG: FormConfigurationType = {
  formId: crypto.randomUUID(),
  title: {
    formTitle: "My New Form",
    placeholder: "Form Title",
    isTitleBold: false,
    isTitleItalic: false,
    isTitleUnderline: false,
    TitleAlign: "left",
  },
  description: {
    formDescription: "Form Description",
    placeholder: "Please enter form description",
    isDescriptionBold: false,
    isDescriptionItalic: false,
    isDescriptionUnderline: false,
    DescriptionAlign: "left",
  },
};

export const INITIAL_DESIGN_CONFIG: FormDesignConfiguration = {
  headerDesign: {
    fontSelected: "Roboto",
    size: 18,
  },
  questionDesign: {
    fontSelected: "Roboto",
    size: 18,
  },
  textDesign: {
    fontSelected: "Roboto",
    size: 18,
  },
  headerImage: "",
  colorConfiguration: {
    color: "Red",
    background: "#fffff",
  },
};

export const INITIAL_FORM_SETTINGS:FormSettingsConfiguration = {
  shuffleQuestionOrder:false,
  showProgressBar:false,
  responseConfirmationMessage:"Your Response have been recorded",
  showLinkToSubmitAnotherResponse:false,
  requiredSignIn:false,
  limitResponseToOne:false,
  isPublished:false
} 