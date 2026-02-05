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
  featured?: boolean; // ✅ 뉴스 홈 맨 위 고정용
  coverImage?: string; // ✅ 뉴스 홈 카드 이미지 (선택)
  content: Block[];
};

export const posts: Post[] = [
  {
    slug: "origin-of-skyriders",
    title: "The Origin of SKYRiders",
    excerpt:
      "A legacy revived — from Korea’s early paragliding pioneers to today’s non-commercial pilot exchange philosophy.",
    date: "2026-02-05",
    category: "Story",
    featured: true,
    coverImage: "/news/origin/coverage-1993.jpg",
    content: [
      { type: "p", text: "SKYRiders was born during the very early days of paragliding in Korea." },
      {
        type: "p",
        text: "In the early 1980s, when paragliding was still unfamiliar and largely unexplored, a small group of pioneers began flying with a shared belief:",
      },
      { type: "p", text: "Flying was not about records or profit, but about freedom, learning, and trust." },
      {
        type: "p",
        text: "Formally established in the early 1990s, SKYRiders quickly grew into one of Korea’s most influential paragliding clubs—known for its strong community culture, emphasis on safety, and deep respect for the fundamentals of flight.",
      },

      { type: "h2", text: "Club Leader & Pioneer" },
      {
        type: "img",
        src: "/news/origin/pioneer.jpg",
        alt: "Dr. Sung Yoon-mo",
        caption:
          "Dr. Sung Yoon-mo — widely recognized as a first-generation pioneer of paragliding in Korea.",
      },
      {
        type: "p",
        text: "Dr. Sung Yoon-mo is widely recognized in Korea as a first-generation pioneer of paragliding. In the early 1980s, he introduced paragliding techniques and operational know-how from Japan to Korea—at a time when no domestic infrastructure or formal training system existed.",
      },
      {
        type: "p",
        text: "According to numerous interviews, articles, and public records, Dr. Sung played a foundational role in shaping Korea’s early paragliding environment. Beyond flying itself, he consistently emphasized:",
      },
      { type: "ul", items: ["Safety before performance", "Discipline before expansion", "Education before commercialization"] },
      {
        type: "p",
        text: "These principles became the philosophical backbone of SKYRiders and influenced many first-generation pilots who later went on to establish their own clubs and organizations.",
      },

      { type: "h2", text: "The Golden Era & Natural Pause" },
      {
        type: "p",
        text: "At its peak, SKYRiders had over 100 active members and was regarded as one of the largest paragliding clubs in Korea. It functioned not merely as a sports club, but as a family-oriented community where knowledge, responsibility, and experience were shared across generations.",
      },
      {
        type: "p",
        text: "In the early 2000s, many first-generation members naturally branched out—founding new clubs, schools, and professional paths. As a result, SKYRiders entered a quiet period of pause, not due to failure, but due to completion of its first chapter.",
      },

      { type: "h2", text: "Why SKYRiders Returns Today" },
      {
        type: "img",
        src: "/news/origin/coverage-1993.jpg",
        alt: "Newspaper coverage (1993-09-26)",
        caption: "Archived newspaper coverage (September 26, 1993).",
      },
      {
        type: "p",
        text: "SKYRiders returns today not as a brand, but as a legacy revived. While modern paragliding has become faster, more global, and more commercial, genuine pilot-to-pilot exchange has become increasingly rare.",
      },
      {
        type: "p",
        text: "The revival of SKYRiders begins with a simple question: Can flying together still come before selling experiences?",
      },

      { type: "h2", text: "Our Current Stance" },
      {
        type: "p",
        text: "SKYRiders is a non-commercial international paragliding exchange initiative. We do not operate as a travel agency, tour operator, or profit-driven organization.",
      },
      { type: "p", text: "Our focus is on:" },
      { type: "ul", items: ["Shared flying experiences", "Mutual learning between pilots", "Cultural and regional exchange", "Safety, responsibility, and respect"] },
      {
        type: "p",
        text: "Any participation-based cost sharing exists solely to sustain operations—not to generate profit.",
      },
      {
        type: "img",
        src: "/news/origin/three-generation-flight-1993.jpg",
        alt: "Three-generation flight (1993)",
        caption:
          "Three-generation flight (1993) — Pilot: Sung Yoon-mo / Passenger: Sung Nak-yoon / Child: Sung Ki-joon.",
      },

      { type: "h2", text: "Looking Forward" },
      {
        type: "p",
        text: "SKYRiders looks ahead as a bridge—between generations, between countries, and between pilots who believe flying is more than a destination.",
      },
      { type: "p", text: "This is not a revival of the past, but the continuation of a philosophy." },

      { type: "h2", text: "Archived Photographs" },
      { type: "img", src: "/news/origin/archive-1.jpg", alt: "Archived photograph 1", caption: "Winner of the 1st Presidential Cup (2000) – Victory Photograph" },
      { type: "img", src: "/news/origin/archive-2.jpg", alt: "Archived photograph 2", caption: "Seoul Air Show – Pre-Flight Preparation Photograph" },
      { type: "img", src: "/news/origin/archive-3.jpg", alt: "Archived photograph 3", caption: "Paragliding Magazine Cover Model (1997)" },
    ],
  },

  // 아래는 예시 (원래 쓰던 글들)
  {
    slug: "albatross-programs-open",
    title: "ALBATROSS Programs Now Open (3N4D · 5N6D · 8N9D)",
    excerpt:
      "Applications and availability checks are now open. We coordinate sites, logistics, meals, and on-site support.",
    date: "2026-02-05",
    category: "Update",
    content: [
      { type: "p", text: "Applications and availability checks are now open for the ALBATROSS exchange program lineup." },
    ],
  },
  {
    slug: "pilot-resources-updated",
    title: "Pilot Resources Updated",
    excerpt:
      "We added downloadable documents including the program brochure, schedule, and meal plan overview.",
    date: "2026-02-05",
    category: "Update",
    content: [{ type: "p", text: "We added downloadable documents to help visiting pilots plan and participate smoothly." }],
  },
];
