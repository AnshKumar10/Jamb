import { Link, Mail, PanelBottom, Phone } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

const MAX_URL_LENGTH = 30;

const footerLink = defineArrayMember({
  type: "object",
  name: "footerLink",
  icon: Link,
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Link Label",
      description: "Text displayed for the link",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      type: "customUrl",
      title: "Link URL",
      description: "The URL that this link will navigate to when clicked",
    }),
  ],
  preview: {
    select: {
      title: "label",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
    },
    prepare({ title, externalUrl, urlType, internalUrl }) {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const truncatedUrl =
        url?.length > MAX_URL_LENGTH ? `${url.substring(0, MAX_URL_LENGTH)}...` : url;

      return {
        title: title || "Untitled Link",
        subtitle: `${urlType === "external" ? "External" : "Internal"} • ${truncatedUrl}`,
        media: Link,
      };
    },
  },
});

const footerSection = defineArrayMember({
  type: "object",
  name: "footerSection",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
      description: "Title for the footer section",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      description: "Links for this section (optional for standalone sections)",
      of: [footerLink],
    }),
    defineField({
      name: "isStandalone",
      type: "boolean",
      title: "Standalone Section",
      description:
        "If enabled, this section will display only the title without links",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      links: "links",
      isStandalone: "isStandalone",
    },
    prepare({ title, links = [], isStandalone }) {
      const linkCount = isStandalone ? "Standalone" : `${links.length} link${links.length === 1 ? "" : "s"}`;
      return {
        title: title || "Untitled Section",
        subtitle: linkCount,
      };
    },
  },
});

const footerColumn = defineArrayMember({
  type: "object",
  name: "footerColumn",
  fields: [
    defineField({
      name: "sections",
      type: "array",
      title: "Sections",
      description: "Footer sections within this column",
      of: [footerSection],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      sections: "sections",
    },
    prepare({ sections = [] }) {
      return {
        title: `Column with ${sections.length} section${sections.length === 1 ? "" : "s"}`,
        subtitle: sections
          .map((section: { title?: string }) => section?.title)
          .filter(Boolean)
          .slice(0, 3)
          .join(", "),
      };
    },
  },
});

const contactInfo = defineField({
  name: "contactInfo",
  type: "object",
  title: "Contact Information",
  description: "Contact details displayed in the footer",
  icon: Phone,
  fields: [
    defineField({
      name: "phone",
      type: "string",
      title: "Phone Number",
      description: "Contact phone number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "addressLine1",
      type: "string",
      title: "Address Line 1",
      description: "First line of the address",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "addressLine2",
      type: "string",
      title: "Address Line 2",
      description: "Second line of the address (city, postal code, etc.)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email Address",
      description: "Contact email address",
      validation: (rule) => rule.required().email(),
    }),
  ],
  validation: (rule) => rule.required(),
});

const newsletterConfig = defineField({
  name: "newsletter",
  type: "object",
  title: "Newsletter Configuration",
  description: "Newsletter signup form configuration",
  icon: Mail,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Title displayed above the newsletter form",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "inputPlaceholder",
      type: "string",
      title: "Input Placeholder",
      description: "Placeholder text for the email input field",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "buttonText",
      type: "string",
      title: "Button Text",
      description: "Text displayed on the subscribe button",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "privacyText",
      type: "string",
      title: "Privacy Text",
      description: "Text displayed next to the privacy checkbox",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "privacyPolicyLink",
      type: "customUrl",
      title: "Privacy Policy Link",
      description: "Optional link to privacy policy (used in privacy text)",
    }),
  ],
  validation: (rule) => rule.required(),
});

export const footer = defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  description: "Footer configuration with contact info, newsletter, and link columns",
  icon: PanelBottom,
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Footer",
      title: "Label",
      description: "Label used to identify footer in the CMS",
      validation: (rule) => rule.required(),
    }),
    contactInfo,
    newsletterConfig,
    defineField({
      name: "columns",
      type: "array",
      title: "Footer Columns",
      description: "Columns containing footer sections and links",
      of: [footerColumn],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "label",
      columns: "columns",
    },
    prepare({ title, columns = [] }) {
      return {
        title: title || "Untitled Footer",
        subtitle: `${columns.length} column${columns.length === 1 ? "" : "s"}`,
        media: PanelBottom,
      };
    },
  },
});

