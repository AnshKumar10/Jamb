import { Grid3x3 } from "lucide-react";
import { defineField, defineType } from "sanity";
import { createRadioListLayout } from "@/utils/helper";
import { imageWithAltField, spacingFields } from "@/schemaTypes/common";

const imageFillOptions = ["contain", "cover"];
const MAX_DESCRIPTION_LENGHT = 500;
const DEFAULT_DESCRIPTION_LENGTH = 55;
const MINIMUM_DESCRIPTION_LENGTH = 10;

const backgroundColorOptions = [
  { title: "Transparent", value: "transparent" },
  { title: "Muted", value: "#E3E3E3" },
  { title: "Custom Color", value: "custom" },
];

export const imageGrid = defineType({
  name: "imageGrid",
  type: "object",
  title: "Image Grid",
  description:
    "Grid layout section displaying a collection of image-based features with optional text and styling controls",
  icon: Grid3x3,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description:
        "Main heading for the image grid section, used to introduce the content",
    }),
    defineField({
      name: "backgroundColor",
      type: "string",
      title: "Background Color",
      description:
        "Select a preset background color for the section or choose 'Custom Color' to define your own value",
      initialValue: "#E3E3E3",
      options: createRadioListLayout(backgroundColorOptions, {
        direction: "horizontal",
      }),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customBackgroundColor",
      type: "string",
      title: "Custom Background Color",
      description:
        "Custom CSS color value used when 'Custom Color' is selected (e.g. hex, rgba, or color names)",
      hidden: ({ parent }) => parent?.backgroundColor !== "custom",
      validation: (rule) =>
        rule.custom((value, context) => {
          const backgroundType = (
            context.parent as { backgroundColor?: string }
          )?.backgroundColor;

          if (backgroundType === "custom" && !value) {
            return "Custom background color is required when 'Custom Color' is selected.";
          }

          return true;
        }),
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Features",
      description:
        "List of feature items displayed in the grid, each containing an image and optional text content",
      of: [
        {
          type: "object",
          name: "feature",
          title: "Feature",
          fields: [
            imageWithAltField({
              title: "Image",
              description:
                "Visual asset representing this feature item in the grid",
            }),
            defineField({
              name: "imageFill",
              type: "string",
              title: "Image Fill Option",
              description:
                "Defines how the image fits inside its container: 'cover' fills and may crop, 'contain' preserves full image",
              initialValue: "cover",
              options: createRadioListLayout(imageFillOptions, {
                direction: "horizontal",
              }),
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              description:
                "Heading text for this feature item displayed under the image",
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
              description:
                "Supporting text describing the feature in more detail",
              rows: 3,
            }),
            defineField({
              name: "truncateTitle",
              type: "boolean",
              title: "Truncate Title",
              description:
                "Controls whether long titles are truncated in the UI",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "title",
              image: "image",
            },
            prepare: ({ title, image }) => ({
              title: title || "Untitled Feature",
              media: image,
            }),
          },
        },
      ],

      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "maxDescriptionLength",
      type: "number",
      title: "Max Description Length",
      description:
        "Maximum number of characters shown before truncating description with a 'Read more' option",
      initialValue: DEFAULT_DESCRIPTION_LENGTH,
      validation: (rule) =>
        rule
          .min(MINIMUM_DESCRIPTION_LENGTH)
          .max(MAX_DESCRIPTION_LENGHT)
          .required(),
    }),

    ...spacingFields(
      "Adjust vertical spacing (top and bottom margins) of the image grid section",
    ),
    defineField({
      name: "allowNavigation",
      type: "boolean",
      title: "Allow Navigation",
      description:
        "Enables linking to this section from navigation. Requires a title when enabled",
      initialValue: false,
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { title?: string };
          if (value === true && !parent?.title?.trim()) {
            return "Title is required when navigation is enabled.";
          }
          return true;
        }),
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Image Grid",
      media: Grid3x3,
    }),
  },
});
