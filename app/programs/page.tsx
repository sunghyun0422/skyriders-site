import Link from "next/link";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white">
      {children}
    </span>
  );
}

function LightBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

function DotItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/70" />
      <span>{children}</span>
    </li>
  );
}

type AlbatrossTier = {
  slug: "3n4d" | "5n6d" | "8n9d";
  title: string;
  subtitle: string;
  duration: string;
  emphasis: string;
  bullets: string[];
  featured?: boolean;
  image: string;

  price: string;      
  priceNote?: string;
};

const albatrossTiers: AlbatrossTier[] = [
  {
    slug: "3n4d",
    title: "ALBATROSS 3N4D",
    subtitle: "Fast, focused flying exchange",
    duration: "3 Nights · 4 Days",
    emphasis: "Best for short stays",
    bullets: [
      "2–3 flying days (weather dependent)",
      "Daily meetup coordination + briefings",
      "Local site tips (access, etiquette, hazards)",
      "Community exchange meetups",
    ],
    image: "/albatross-3.jpg",
    price: "USD 950"
  },
  {
    slug: "5n6d",
    title: "ALBATROSS 5N6D",
    subtitle: "Most balanced option",
    duration: "5 Nights · 6 Days",
    emphasis: "Best overall value",
    bullets: [
      "More weather flexibility",
      "Option to switch sites by conditions",
      "Deeper exchange with local pilots/clubs",
      "Better rhythm for flying + culture",
    ],
    featured: true,
    image: "/albatross-5.jpg",
    price: "USD 1550"
  },
  {
    slug: "8n9d",
    title: "ALBATROSS 8N9D",
    subtitle: "Deep exchange + progress",
    duration: "8 Nights · 9 Days",
    emphasis: "Best for advanced pilots & content",
    bullets: [
      "Highest chance of multiple strong days",
      "Ideal for XC exploration + media projects",
      "Broader site experience across Korea",
      "More time for collaboration & learning",
    ],
    image: "/albatross-8.jpg",
    price: "USD 2450"
  },
];

type Program = {
  title: string;
  subtitle: string;
  duration: string;
  location: string;
  forWho: string;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
  note?: string;
};

const otherPrograms: Program[] = [
  {
    title: "SKYRIDERS XC Challenge",
    subtitle: "Seasonal self-logging challenge (non-FAI)",
    duration: "Season-based",
    location: "Korea (multiple sites)",
    forWho: "Pilots who want motivation + structure + ranking",
    highlights: [
      "Simple rules + GPS track submission",
      "Weekly/Monthly highlight recap",
      "Story-driven ranking (distance + consistency)",
      "Sponsor-friendly content format",
    ],
    ctaLabel: "Join / Ask details",
    ctaHref: "/contact",
  },
];

export default function ProgramsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* HERO with photo */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-200">
        <div
          className="h-[360px] w-full bg-cover bg-center"
          style={{ backgroundImage: "url(/programs-hero.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/20" />

        <div className="absolute inset-x-0 bottom-0 p-8">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Programs
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-white/90">
            Pilot-driven flying exchange and community events in Korea.
            Coordination, content, and community — with licensed partners for
            aviation operations where required.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>Community</Badge>
            <Badge>Exchange</Badge>
            <Badge>Seasonal sites</Badge>
            <Badge>Content-friendly</Badge>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90"
            >
              Apply / Contact
            </Link>
            <Link
              href="/resources"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              Pilot Resources
            </Link>
          </div>
        </div>
      </section>

      {/* ALBATROSS selector */}
      <section className="mt-12">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-semibold">ALBATROSS Exchange Program</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Choose a tier — then we align dates, sites, and local conditions.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {albatrossTiers.map((t) => (
            <Link
              key={t.slug}
              href={`/programs/${t.slug}`}
              className={[
                "group relative overflow-hidden rounded-3xl border bg-white shadow-sm transition",
                "hover:-translate-y-0.5 hover:shadow-md",
                t.featured ? "border-black/20 ring-1 ring-black/10" : "border-neutral-200",
              ].join(" ")}
            >
              {/* image */}
              <div
                className="h-40 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${t.image})` }}
              />
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />
              {t.featured ? (
                <div className="absolute right-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                  Recommended
                </div>
              ) : null}

              <div className="p-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  <p className="text-sm text-neutral-600">{t.subtitle}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <LightBadge>{t.duration}</LightBadge>
                  <LightBadge>{t.emphasis}</LightBadge>
                  <LightBadge>
                    <span className="font-semibold">{t.price}</span>
                  </LightBadge>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-neutral-700">
                  {t.bullets.map((b) => (
                    <DotItem key={b}>{b}</DotItem>
                  ))}
                </ul>

                <div className="mt-6 inline-flex items-center text-sm font-medium">
                  View details{" "}
                  <span className="ml-1 transition group-hover:translate-x-0.5">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          Note: SKYRIDERS is not a travel agency. This is a pilot exchange format with transparent shared costs and partner providers (when applicable).
        </p>
      </section>

      {/* Other programs */}
      <section className="mt-14">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-semibold">Other formats</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Event-style programs that can be scheduled seasonally.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-1">
          {otherPrograms.map((p) => (
            <article
              key={p.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-neutral-600">{p.subtitle}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <LightBadge>{p.duration}</LightBadge>
                <LightBadge>{p.location}</LightBadge>
              </div>

              <p className="mt-4 text-sm text-neutral-700">
                <span className="font-medium">Best for:</span> {p.forWho}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {p.highlights.map((h) => (
                  <DotItem key={h}>{h}</DotItem>
                ))}
              </ul>

              {p.note ? <p className="mt-4 text-xs text-neutral-500">{p.note}</p> : null}

              <div className="mt-6">
                <Link
                  href={p.ctaHref}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-90"
                >
                  {p.ctaLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-14 rounded-3xl border border-neutral-200 bg-white p-8">
        <h2 className="text-2xl font-semibold">FAQ</h2>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="font-semibold">Do you operate tandem flights?</h3>
            <p className="mt-2 text-sm text-neutral-700">
              Aviation operations (including tandem flights) are handled by licensed partner operators. Payment and responsibility stay with the operator.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="font-semibold">Is this an FAI / official competition?</h3>
            <p className="mt-2 text-sm text-neutral-700">
              No. SKYRIDERS programs are community formats. If you want official competitions, we can guide you to the right channels and resources.
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          Disclaimer: Weather and site conditions change rapidly. Participants are responsible for their own flight decisions, equipment, licenses, insurance, and compliance with local rules.
        </p>
      </section>
    </main>
  );
}
