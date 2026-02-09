export type FieldType = "text" | "textarea" | "image" | "url";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
};

export type ContentSchema = {
  title: string;
  fields: FieldDef[];
};

export const contentSchemas: Record<string, ContentSchema> = {
  home: {
    title: "Home",
    fields: [
      { key: "brand", label: "Brand", type: "text" },
      { key: "title", label: "Hero Title", type: "text" },
      { key: "subtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "heroImage", label: "Hero Image", type: "image" },
      { key: "ctaPrimary", label: "CTA Primary Text", type: "text" },
      { key: "ctaSecondary", label: "CTA Secondary Text", type: "text" },
    ],
  },

  "our-story": {
    title: "Our Story",
    fields: [
      { key: "title", label: "Page Title", type: "text" },
      { key: "date", label: "Date (YYYY-MM-DD)", type: "text" },
      { key: "heroImage", label: "Top Image", type: "image" },
      { key: "body", label: "Main Text", type: "textarea" },
      { key: "pioneerImage", label: "Pioneer Image", type: "image" },
      { key: "archiveImage", label: "Archive Image", type: "image" },
    ],
  },

  programs: {
    title: "Programs",
    fields: [
      { key: "title", label: "Page Title", type: "text" },
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "heroImage", label: "Top Image (optional)", type: "image" },
    ],
  },

  news: {
    title: "News",
    fields: [
      { key: "title", label: "Page Title", type: "text" },
      { key: "intro", label: "Intro", type: "textarea" },
    ],
  },

  resources: {
    title: "Pilot Resources",
    fields: [
      { key: "title", label: "Page Title", type: "text" },
      { key: "intro", label: "Intro", type: "textarea" },
    ],
  },

  contact: {
    title: "Contact",
    fields: [
      { key: "title", label: "Page Title", type: "text" },
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "heroImage", label: "Top Image (optional)", type: "image" },
    ],
  },
};
