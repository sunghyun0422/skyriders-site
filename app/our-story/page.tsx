import Link from "next/link";

type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h2"; text: string }
  | { type: "img"; src: string; alt: string; caption?: string };

const story: {
  title: string;
  date: string;
  category: string;
  coverImage?: string;
  content: Block[];
} = {
  title: "The Origin of SKYRiders",
  date: "2026-02-05",
  category: "Story",
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
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

export default function OurStoryPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      {/* Back */}
      <Link href="/" className="text-sm text-neutral-600 hover:underline">
        ← Back to Home
      </Link>

      {/* Header */}
      <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-8">
        <div className="flex items-center gap-2">
          <Badge>{story.category}</Badge>
          <p className="text-xs text-neutral-500">{story.date}</p>
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          {story.title}
        </h1>

        {story.coverImage ? (
          <div className="mt-6 overflow-hidden rounded-3xl border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={story.coverImage}
              alt={story.title}
              className="h-72 w-full object-cover"
            />
          </div>
        ) : null}
      </div>

      {/* Content */}
      <article className="mt-10 space-y-6">
        {story.content.map((b, idx) => {
          if (b.type === "p") {
            return (
              <p key={idx} className="leading-8 text-neutral-800">
                {b.text}
              </p>
            );
          }

          if (b.type === "h2") {
            return (
              <h2 key={idx} className="pt-6 text-2xl font-semibold">
                {b.text}
              </h2>
            );
          }

          if (b.type === "ul") {
            return (
              <ul key={idx} className="list-disc space-y-2 pl-6 text-neutral-800">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          }

          if (b.type === "img") {
            return (
              <figure key={idx} className="rounded-3xl border bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.src}
                  alt={b.alt}
                  className="w-full rounded-2xl object-cover"
                />
                {b.caption ? (
                  <figcaption className="mt-3 text-sm text-neutral-600">
                    {b.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          return null;
        })}
      </article>
    </main>
  );
}
