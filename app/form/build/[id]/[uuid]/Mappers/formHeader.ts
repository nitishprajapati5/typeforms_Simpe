import { FormConfigurationType } from "../types";
import { FormTitleConfig,FormDescriptionConfig } from "../types";

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