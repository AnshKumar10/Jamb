import {
  defineField,
  type ImageRule,
  type ImageValue,
  type ValidationBuilder,
} from "sanity";

import { PathnameFieldComponent } from "@/components/slug-field-component";
import { GROUP } from "@/utils/constant";
import {
  createSlugErrorValidator,
  createSlugWarningValidator,
  getDocumentTypeConfig,
} from "@/utils/slug-validation";

const spacingOptions = [
  { title: "None", value: "none" },
  { title: "Small", value: "sm" },
  { title: "Medium", value: "md" },
  { title: "Large", value: "lg" },
  { title: "Extra Large", value: "xl" },
  { title: "2X Large", value: "2xl" },
  { title: "3X Large", value: "3xl" },
  { title: "4X Large", value: "4xl" },
];

const spacingModeOptions = [
  { title: "Same for top and bottom", value: "same" },
  { title: "Adjust top and bottom separately", value: "separate" },
];

export const richTextField = defineField({
  name: "richText",
  type: "richText",
  description:
    "A text editor that lets you add formatting like bold text, links, and bullet points",
});

export const buttonsField = defineField({
  name: "buttons",
  type: "array",
  of: [{ type: "button" }],
  description:
    "Add one or more clickable buttons that visitors can use to navigate your website",
});

export const pageBuilderField = defineField({
  name: "pageBuilder",
  group: GROUP.MAIN_CONTENT,
  type: "pageBuilder",
  description:
    "Build your page by adding different sections like text, images, and other content blocks",
});

export const iconField = defineField({
  name: "icon",
  title: "Icon",
  type: "lucide-icon",
  description:
    "Choose a small picture symbol to represent this item, like a home icon or shopping cart",
});

export const documentSlugField = (
  documentType: string,
  options: {
    group?: string;
    description?: string;
    title?: string;
  } = {},
) => {
  const {
    group,
    description = `The web address where people can find your ${documentType} (automatically created from title)`,
    title = "URL",
  } = options;

  return defineField({
    name: "slug",
    type: "slug",
    title,
    description,
    group,
    components: {
      field: PathnameFieldComponent,
    },
    validation: (Rule) => {
      const config = getDocumentTypeConfig(documentType);
      return [
        Rule.custom(createSlugErrorValidator(config)),
        Rule.custom(createSlugWarningValidator(config)).warning(),
      ];
    },
  });
};

export const imageWithAltField = ({
  name = "image",
  title = "Image",
  description = "An image, make sure to add an alt text and use the hotspot tool to ensure if image is cropped it highlights the focus point",
  validation,
  group,
}: {
  name?: string;
  title?: string;
  description?: string;
  group?: string;
  validation?: ValidationBuilder<ImageRule, ImageValue>;
} = {}) =>
  defineField({
    name,
    type: "image",
    title,
    description,
    group,
    validation,
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: "alt",
        type: "string",
        title: "Alt Text",
        description:
          "The text that describes the image for screen readers and search engines",
      }),
    ],
  });

export const spacingFields = (description?: string) => [
  defineField({
    name: "spacingMode",
    type: "string",
    title: "Spacing Mode",
    description: "Choose how to control spacing for this section",
    initialValue: "same",
    options: {
      list: spacingModeOptions,
      direction: "horizontal",
    },
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "spacing",
    type: "string",
    title: "Spacing",
    description:
      description || "Vertical margin (top and bottom) for the section",
    initialValue: "lg",
    options: {
      list: spacingOptions,
      direction: "horizontal",
    },
    validation: (rule) =>
      rule.custom((value, context) => {
        const parent = context.parent as { spacingMode?: string };
        if (parent?.spacingMode === "same" && !value) {
          return "Spacing is required when using same spacing mode.";
        }
        return true;
      }),
    hidden: ({ parent }) => parent?.spacingMode === "separate",
  }),
  defineField({
    name: "topSpacing",
    type: "string",
    title: "Top Spacing",
    description: "Top margin for the section",
    initialValue: "lg",
    options: {
      list: spacingOptions,
      direction: "horizontal",
    },
    validation: (rule) =>
      rule.custom((value, context) => {
        const parent = context.parent as { spacingMode?: string };
        if (parent?.spacingMode === "separate" && !value) {
          return "Top spacing is required when using separate spacing mode.";
        }
        return true;
      }),
    hidden: ({ parent }) => parent?.spacingMode !== "separate",
  }),
  defineField({
    name: "bottomSpacing",
    type: "string",
    title: "Bottom Spacing",
    description: "Bottom margin for the section",
    initialValue: "lg",
    options: {
      list: spacingOptions,
      direction: "horizontal",
    },
    validation: (rule) =>
      rule.custom((value, context) => {
        const parent = context.parent as { spacingMode?: string };
        if (parent?.spacingMode === "separate" && !value) {
          return "Bottom spacing is required when using separate spacing mode.";
        }
        return true;
      }),
    hidden: ({ parent }) => parent?.spacingMode !== "separate",
  }),
];
