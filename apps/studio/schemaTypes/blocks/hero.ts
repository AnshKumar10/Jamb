import { Sparkles } from "lucide-react";
import { defineField, defineType } from "sanity";
import { createRadioListLayout } from "@/utils/helper";
import { spacingFields } from "@/schemaTypes/common";

const imageFillOptions = ["contain", "cover"];

export const hero = defineType({
  name: "hero",
  title: "Hero",
  icon: Sparkles,
  type: "object",
  description:
    "Hero section featuring a prominent image with configurable layout and spacing controls",

  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description:
        "Primary hero image used as the main visual focal point of the section",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          description:
            "Alternative text describing the image for accessibility and SEO purposes",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "imageFill",
      type: "string",
      title: "Image Fill",
      description:
        "Controls how the image fits within its container. 'cover' fills the space and may crop, while 'contain' shows the full image with possible empty space",
      initialValue: "cover",
      options: createRadioListLayout(imageFillOptions, {
        direction: "horizontal",
      }),
      validation: (rule) => rule.required(),
    }),

    ...spacingFields(
      "Adjust vertical spacing (top and bottom margins) for the hero section"
    ),
  ],

  preview: {
    select: {
      image: "image",
    },
    prepare: ({ image }) => ({
      title: "Hero",
      subtitle: "Hero section with image and layout controls",
      media: image,
    }),
  },
});