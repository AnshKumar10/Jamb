import { PanelBottom } from "lucide-react";
import { defineField, defineType } from "sanity";
import { createRadioListLayout } from "@/utils/helper";
import { buttonsField, spacingFields } from "@/schemaTypes/common";

const desktopLayoutOptions = ["row", "row-reverse"];
const mobileLayoutOptions = ["column", "column-reverse"];
const imageFillOptions = ["contain", "cover"];
const ctaLayoutOptions = ["column", "row"];

const navigationSlugFieldOptions = [
  { title: "Title", value: "title" },
  { title: "Headline", value: "headline" },
];
const backgroundColorOptions = [
  { title: "Transparent", value: "transparent" },
  { title: "Muted", value: "#DFDAD7" },
  { title: "Custom Color", value: "custom" },
];

const paddingOptions = [
  { title: "Default", value: "default" },
  { title: "Large", value: "large" },
];

export const splitFeatureSection = defineType({
  name: "splitFeatureSection",
  type: "object",
  title: "Split Feature Section",
  description:
    "Split feature section configuration with layout - headline, title, description, image, and CTAs",
  icon: PanelBottom,
  fields: [
    defineField({
      name: "headline",
      type: "string",
      title: "Headline",
      description:
        "Optional smaller text displayed above the title to provide context",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description:
        "The main heading text for the split feature section section that captures attention",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description:
        "The descriptive text that provides more details about the split feature section content",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "backgroundColor",
      type: "string",
      title: "Background Color",
      description:
        "Choose a predefined background color or select 'Custom Color' to use your own. This affects the overall background of the split feature section section.",
      initialValue: "#DFDAD7",
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
        "Enter a custom background color value (e.g., #FF0000, rgba(255,0,0,0.5), or color name). This field only appears when 'Custom Color' is selected above.",
      hidden: ({ parent }) => parent?.backgroundColor !== "custom",
      validation: (rule) =>
        rule.custom((value, context) => {
          const backgroundType = (
            context.parent as { backgroundColor?: string }
          )?.backgroundColor;

          if (backgroundType === "custom" && !value) {
            return 'Custom background color is required when "Custom Color" is selected.';
          }

          return true;
        }),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description:
        "The main image displayed in the split feature section section - should be high quality and visually impactful",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          description:
            "Alternative text for the image - important for accessibility and SEO",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageFill",
      type: "string",
      title: "Image Fill Option",
      description:
        "How the image should fill its container - 'cover' fills the entire area (may crop), 'contain' shows the entire image (may leave empty space)",
      initialValue: "cover",
      options: createRadioListLayout(imageFillOptions, {
        direction: "horizontal",
      }),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "desktopLayoutDirection",
      type: "string",
      title: "Desktop Layout Direction",
      description:
        "Layout direction on desktop (md breakpoint and above) - 'row' places image on right, 'row-reverse' places image on left",
      initialValue: "row",
      options: createRadioListLayout(desktopLayoutOptions, {
        direction: "horizontal",
      }),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mobileLayoutDirection",
      type: "string",
      title: "Mobile Layout Direction",
      description:
        "Layout direction on mobile (below md breakpoint) - 'column' places image on bottom, 'column-reverse' places image on top",
      initialValue: "column",
      options: createRadioListLayout(mobileLayoutOptions, {
        direction: "horizontal",
      }),
      validation: (rule) => rule.required(),
    }),
    buttonsField,
    defineField({
      name: "ctaLayout",
      type: "string",
      title: "CTA Layout",
      description:
        "How the buttons should be arranged - 'row' places them horizontally, 'column' stacks them vertically",
      initialValue: "row",
      options: createRadioListLayout(ctaLayoutOptions, {
        direction: "horizontal",
      }),
    }),
    defineField({
      name: "padding",
      type: "string",
      title: "Padding",
      description: "Padding for the split feature section section",
      initialValue: "default",
      options: createRadioListLayout(paddingOptions, {
        direction: "horizontal",
      }),
      validation: (rule) => rule.required(),
    }),
    ...spacingFields(
      "Vertical margin (top and bottom) for the split feature section",
    ),
    defineField({
      name: "allowNavigation",
      type: "boolean",
      title: "Allow Navigation",
      description:
        "Enable this to allow this section to be linked from the hero navigation. Title is required when enabled.",
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
    defineField({
      name: "navigationSlugField",
      type: "string",
      title: "Navigation Slug Field",
      description:
        "Choose which field to use for generating the navigation link slug and section ID",
      initialValue: "title",
      options: createRadioListLayout(navigationSlugFieldOptions, {
        direction: "horizontal",
      }),
      hidden: ({ parent }) => parent?.allowNavigation !== true,
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {
            allowNavigation?: boolean;
            title?: string;
            headline?: string;
          };

          if (parent?.allowNavigation === true) {
            if (value === "headline" && !parent?.headline?.trim()) {
              return "Headline is required when using headline for navigation slug.";
            }

            if (value === "title" && !parent?.title?.trim()) {
              return "Title is required when using title for navigation slug.";
            }
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      headline: "headline",
    },
    prepare: ({ title, headline }) => ({
      title: title || "Untitled Split Feature Section",
      subtitle: headline || "Split Feature Section Block",
      media: PanelBottom,
    }),
  },
});
