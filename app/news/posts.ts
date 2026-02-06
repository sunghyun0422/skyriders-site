export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h2"; text: string }
  | { type: "img"; src: string; alt: string; caption?: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  category: "Update" | "Announcement" | "Safety" | "Community" | "Story";
  featured?: boolean;
  coverImage?: string;
  content: Block[];

  cta?: { label: string; href: string }; // ✅ 글별 CTA
};

export const posts: Post[] = [
  {
    slug: "albatross-programs-open",
    title: "ALBATROSS Programs Now Open (3N4D · 5N6D · 8N9D)",
    excerpt:
      "Applications and availability checks are now open. We coordinate sites, logistics, meals, and on-site support.",
    date: "2026-02-05",
    category: "Update",
    featured: true,
    cta: { label: "View Programs", href: "/programs" },
    content: [
      {
        type: "p",
        text: "Applications and availability checks are now open for the ALBATROSS exchange program lineup.",
      },
    ],
  },
  {
    slug: "pilot-resources-updated",
    title: "Pilot Resources Updated",
    excerpt:
      "We added downloadable documents including the program brochure, schedule, and meal plan overview.",
    date: "2026-02-05",
    category: "Update",
    cta: { label: "Pilot Resources", href: "/resources" },
    content: [
      {
        type: "p",
        text: "We added downloadable documents to help visiting pilots plan and participate smoothly.",
      },
    ],
  },
];
