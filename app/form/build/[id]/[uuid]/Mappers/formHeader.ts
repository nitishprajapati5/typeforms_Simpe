import { FormConfigurationType, FormSettingsConfiguration, Question } from "../types";
import { FormTitleConfig,FormDescriptionConfig,FormDesignConfiguration } from "../types";

export const mapTitleToPayload = (
    config:FormConfigurationType
):FormTitleConfig => ({
  formTitle: config.title.formTitle,
  placeholder: config.title.placeholder,
  isTitleBold: config.title.isTitleBold,
  isTitleItalic: config.title.isTitleItalic,
  isTitleUnderline: config.title.isTitleUnderline,
  TitleAlign: config.title.TitleAlign,
})

export const mapDescriptionToPayload = (
  config: FormConfigurationType
): FormDescriptionConfig => ({
  formDescription: config.description.formDescription,
  placeholder: config.description.placeholder,
  isDescriptionBold: config.description.isDescriptionBold,
  isDescriptionItalic: config.description.isDescriptionItalic,
  isDescriptionUnderline: config.description.isDescriptionUnderline,
  DescriptionAlign: config.description.DescriptionAlign,
});

export const mapDesignConfigurationtoPayload = (
  config:FormDesignConfiguration
):FormDesignConfiguration => ({
  headerDesign:config.headerDesign,
  questionDesign:config.questionDesign,
  textDesign:config.textDesign,
  headerImage:config.headerImage,
  colorConfiguration:config.colorConfiguration
})

export const mapSettingConfigurationToPayload = (config:FormSettingsConfiguration) : FormSettingsConfiguration => ({
  limitResponseToOne:config.limitResponseToOne,
  requiredSignIn:config.requiredSignIn,
  responseConfirmationMessage:config.responseConfirmationMessage,
  showLinkToSubmitAnotherResponse:config.showLinkToSubmitAnotherResponse,
  showProgressBar:config.showProgressBar,
  shuffleQuestionOrder:config.shuffleQuestionOrder,
  isPublished:config.isPublished
})

export const mapQuestionToPayload = (config:Omit<Question, 'id'>):Omit<Question, 'id'> => ({
  title: config.title,
  type: config.type,
  config: config.config,
  required: config.required,
})