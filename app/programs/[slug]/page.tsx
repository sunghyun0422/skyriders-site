import Link from "next/link";
import { notFound } from "next/navigation";

type Section = {
  title: string;
  eyebrow?: string;
  body?: string[];
  bullets?: string[];
};

type Course = {
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  tagline: string;
  overview: Section;
  meals: Section;
  requirements: Section;
  keyFacts: { label: string; value: string }[];
  included: string[];
  notIncluded: string[];
  flow: { day: string; title: string; items: string[] }[];
  cancellation: Section;
  notes: string[];
};

const COURSE: Record<string, Course> = {
  "3n4d": {
    slug: "3n4d",
    heroTitle: "Albatross 3N4D",
    heroSubtitle: "Exchange paragliding program",
    tagline: "Paragliding Adventure",
    overview: {
      eyebrow: "Program Overview",
      title: "The SKYRiders Program",
      body: [
        "The SKYRiders Program is an international paragliding exchange initiative designed to invite overseas pilots and clubs to Korea.",
        "Participants tour multiple flying sites, fly together with local pilots, and experience Korean culture, cuisine, and community exchange in a safe and well-organized environment.",
        "",
        "International flights and personal flying equipment are not included.",
        "However, accommodation, local transportation, meals, and on-site operational support are fully managed by the SKYRiders operating team, allowing participants to focus entirely on flying and cultural exchange while we take care of the most demanding and inconvenient aspects of local travel.",
        "",
        "This program is operated on a non-profit, cost-based basis during a pilot operation period.",
        "Detailed information regarding the operating period and pilot operation status will be finalized and provided after internal review.",
      ],
    },
    meals: {
      eyebrow: "Meals & Local Experience",
      title: "Shared meals, real exchange",
      body: [
        "Meals during the SKYRiders Program are provided as part of on-site operational support, allowing participants to focus on flying, rest, and pilot exchange without the burden of planning or logistics.",
        "",
        "Most meals are shared as group meals, creating natural opportunities for communication and cultural exchange between overseas pilots, local pilots, and the SKYRiders operating team.",
        "Depending on the program flow and local conditions, meals may include welcome dinners, group banquets, and casual local dining experiences.",
        "",
        "In addition to flying, participants may experience selected local activities such as cultural visits, short sightseeing stops, or informal community interactions.",
        "These activities are designed to support rest, recovery, and meaningful exchange, rather than structured tourism.",
        "",
        "All meal and local experience arrangements are flexible and may be adjusted based on weather conditions, daily flight schedules, and safety considerations.",
      ],
    },
    requirements: {
      eyebrow: "Participation Requirements",
      title: "Safety-first participation criteria",
      body: [
        "To ensure safe and smooth operation of the SKYRiders Program, all participants are required to meet the following conditions:",
      ],
      bullets: [
        "Hold a valid paragliding license recognized in their home country",
        "Carry appropriate personal travel and/or flight insurance",
        "Use their own certified paragliding equipment suitable for the planned flying conditions",
        "Be physically fit to participate in paragliding activities",
        "Accept that all flying activities are weather- and site-dependent",
        "Respect safety decisions made by the SKYRiders operating team and local site coordinators",
      ],
    },
    keyFacts: [
      { label: "Duration", value: "3 Nights / 4 Days (3N4D)" },
      {
        label: "Program Structure",
        value: "Flying site tour · pilot exchange · local cultural experience",
      },
      {
        label: "Recommended For",
        value:
          "Overseas paragliding clubs, individual licensed pilots, and pilots visiting Korea for the first time",
      },
      {
        label: "Level & Requirements",
        value:
          "Valid license, personal insurance, own equipment, and flexibility for weather- and site-dependent operations (details finalized after internal review).",
      },
    ],
    included: [
      "Local airport pickup and group transfers during the program",
      "All ground transportation related to the program schedule",
      "Accommodation during the program period",
      "Meals provided according to the program flow",
      "Snacks and refreshments during flying days",
      "On-site operational support by the SKYRiders team",
      "Safety briefings and daily flight coordination",
      "Local pilot support and exchange activities",
      "Group activities such as welcome dinners or farewell gatherings (if applicable)",
    ],
    notIncluded: [
      "Airfare (international and/or domestic flights to and from Korea)",
      "Personal paragliding equipment (glider, harness, helmet, reserve parachute, etc.)",
      "Personal travel or flight insurance",
      "Any additional accommodation outside the official program period",
      "Personal expenses not related to the official program schedule",
      "Optional activities or services not listed in the official program flow",
    ],
    flow: [
      {
        day: "Day 1",
        title: "Arrival · Orientation · Welcome banquet",
        items: [
          "Airport assembly and group coordination (Incheon International Airport)",
          "Transfer to base camp with rest stop",
          "Change of clothes and short break",
          "Program orientation (safety briefing, staff introduction, program overview)",
          "Evening: Welcome banquet and networking",
          "Transfer to accommodation",
        ],
      },
      {
        day: "Day 2",
        title: "Flying day · Briefing · Free flying",
        items: [
          "Wake-up and preparation",
          "Transfer to paragliding site",
          "Flight briefing & safety training",
          "Meal and snack distribution",
          "Free flying session",
          "Equipment pack-up & daily wrap-up",
          "Transfer to accommodation",
          "Evening: Group dinner / banquet",
        ],
      },
      {
        day: "Day 3",
        title: "Flying day · Site tour · Local exchange",
        items: [
          "Wake-up and preparation",
          "Transfer to flying site",
          "Flight briefing & safety check",
          "Free flying session",
          "Equipment pack-up",
          "Evening: Group dinner or local exchange",
          "Rest",
        ],
      },
      {
        day: "Day 4",
        title: "Farewell · Culture · Airport drop-off",
        items: [
          "Farewell breakfast & closing remarks",
          "Check-out",
          "Cultural visit (local village or sightseeing)",
          "Lunch",
          "Transfer to airport and group drop-off",
        ],
      },
    ],
    cancellation: {
      eyebrow: "Cancellation & Refund Policy",
      title: "Cost-based pilot operation policy",
      body: [
        "The SKYRiders Program is operated as a non-profit, cost-based pilot exchange program. As such, cancellation and refund conditions are structured to reflect actual operational costs already incurred.",
        "",
        "Cancellations must be submitted in writing prior to the program start date.",
        "Refund eligibility and amounts depend on the timing of the cancellation and expenses already committed (accommodation, transportation, venue reservations, and operational arrangements).",
        "Once the program has commenced, refunds may not be possible for unused services or missed activities.",
        "No refunds will be issued for schedule changes or activity adjustments made due to weather conditions, site availability, or safety decisions.",
        "",
        "Detailed cancellation and refund guidelines will be provided upon confirmation of participation or made available in the Pilot Resources section.",
      ],
    },
    notes: [
      "All flight operations, site selections, and daily schedules are determined based on real-time weather assessments and safety considerations.",
      "Participants must comply with safety briefings, operational guidelines, and instructions provided by the operating team throughout the program.",
      "Failure to meet participation requirements or follow safety instructions may result in restricted flying activities or removal from certain program components.",
    ],
  },
  "5n6d": {
  slug: "5n6d",
  heroTitle: "Albatross 5N6D",
  heroSubtitle: "Exchange paragliding program",
  tagline: "Paragliding Adventure",

  overview: {
    eyebrow: "Program Overview",
    title: "The SKYRiders Program",
    body: [
      "(5 Nights / 6 Days) is an international exchange program that invites overseas pilots and clubs to Korea to tour multiple flying sites, fly together, and safely experience Korean culture, cuisine, and community exchange.",
      "",
      "This program excludes airfare and personal flying equipment, while accommodation, transportation, meals, and on-site operational support are fully handled by the operating team — taking care of the most inconvenient and demanding parts of traveling locally.",
      "",
      "Information regarding the operating period, pilot operation status, and the non-profit, cost-based operation statement will be finalized and provided after internal review.",
    ],
  },

  meals: {
    eyebrow: "Meals & Local Experience",
    title: "Shared meals, real exchange",
    body: [
      "Meals during the SKYRiders Program are provided as part of on-site operational support, allowing participants to focus on flying, rest, and pilot exchange without the burden of planning or logistics.",
      "",
      "Most meals are shared as group meals, creating natural opportunities for communication and cultural exchange between overseas pilots, local pilots, and the SKYRiders operating team.",
      "Depending on the program flow and local conditions, meals may include welcome dinners, group banquets, and casual local dining experiences.",
      "",
      "In addition to flying, participants may experience selected local activities such as cultural visits, short sightseeing stops, or informal community interactions.",
      "These activities are designed to support rest, recovery, and meaningful exchange, rather than structured tourism.",
      "",
      "All meal and local experience arrangements are flexible and may be adjusted based on weather conditions, daily flight schedules, and safety considerations.",
    ],
  },

  requirements: {
    eyebrow: "Participation Requirements",
    title: "Safety-first participation criteria",
    body: [
      "To ensure safe and smooth operation of the SKYRiders Program, all participants are required to meet the following conditions:",
    ],
    bullets: [
      "Hold a valid paragliding license recognized in their home country",
      "Carry appropriate personal travel and/or flight insurance",
      "Use their own certified paragliding equipment suitable for the planned flying conditions",
      "Be physically fit to participate in paragliding activities",
      "Accept that all flying activities are weather- and site-dependent",
      "Respect safety decisions made by the SKYRiders operating team and local site coordinators",
    ],
  },

  keyFacts: [
    { label: "Duration", value: "5 Nights / 6 Days (5N6D)" },
    { label: "Program Structure", value: "Flying tour + exchange + local experience" },
    {
      label: "Recommended For",
      value:
        "Overseas paragliding club teams, individual pilots, and pilots flying in Korea for the first time",
    },
    {
      label: "Level / Requirements",
      value:
        "Valid paragliding license, personal insurance, personal flying equipment, and flexibility for weather- and site-dependent operations (details finalized after internal review).",
    },
  ],

  included: [
    "Local airport pickup and group transfers during the program",
    "All ground transportation related to the program schedule",
    "Accommodation during the program period",
    "Meals provided according to the program flow",
    "Snacks and refreshments during flying days",
    "On-site operational support by the SKYRiders team",
    "Safety briefings and daily flight coordination",
    "Local pilot support and exchange activities",
    "Group activities such as welcome dinners or farewell gatherings (if applicable)",
  ],

  notIncluded: [
    "Airfare (international and/or domestic flights to and from Korea)",
    "Personal paragliding equipment (glider, harness, helmet, reserve parachute, etc.)",
    "Personal travel or flight insurance",
    "Any additional accommodation outside the official program period",
    "Personal expenses not related to the official program schedule",
    "Optional activities or services not listed in the official program flow",
  ],

  flow: [
    {
      day: "Day 1",
      title: "Arrival & Orientation",
      items: [
        "Airport assembly and group coordination",
        "Transfer to base camp",
        "Change of clothes and short break",
        "Program orientation (safety briefing, staff introduction, program overview)",
        "Evening: Welcome dinner",
        "Transfer to accommodation",
      ],
    },
    {
      day: "Day 2",
      title: "Flying Day",
      items: [
        "Transfer to flying site",
        "Flight briefing & safety check",
        "Free flying session",
        "Equipment pack-up",
        "Evening: Group dinner or exchange session",
      ],
    },
    {
      day: "Day 3",
      title: "Flying Day (or Alternative Plan)",
      items: [
        "Transfer to flying site",
        "Flight briefing & safety check",
        "Free flying session (or alternative site / non-flying plan depending on conditions)",
        "Equipment pack-up",
        "Evening: Local exchange or rest",
      ],
    },
    {
      day: "Day 4",
      title: "Flexible Flying / Recovery Day",
      items: [
        "Flexible schedule depending on weather and site conditions",
        "Optional flying session, site change, or rest period",
        "Informal pilot exchange or free time",
        "Evening: Group meal",
      ],
    },
    {
      day: "Day 5",
      title: "Final Flying & Wrap-up",
      items: [
        "Transfer to flying site",
        "Final flying session (weather permitting)",
        "Equipment pack-up",
        "Evening: Farewell dinner or closing gathering",
      ],
    },
    {
      day: "Day 6",
      title: "Closing & Departure",
      items: [
        "Farewell breakfast & closing remarks",
        "Check-out",
        "Transfer and group drop-off",
      ],
    },
  ],

  cancellation: {
    eyebrow: "Cancellation & Refund Policy",
    title: "Cost-based pilot operation policy",
    body: [
      "The SKYRiders Program is operated as a non-profit, cost-based pilot exchange program. As such, cancellation and refund conditions are structured to reflect actual operational costs already incurred.",
      "",
      "Cancellations must be submitted in writing prior to the program start date.",
      "Refund eligibility and amounts depend on the timing of the cancellation and expenses already committed (accommodation, transportation, venue reservations, and operational arrangements).",
      "Once the program has commenced, refunds may not be possible for unused services or missed activities.",
      "No refunds will be issued for schedule changes or activity adjustments made due to weather conditions, site availability, or safety decisions.",
      "",
      "Detailed cancellation and refund guidelines will be provided upon confirmation of participation or made available in the Pilot Resources section.",
    ],
  },

  notes: [
    "All flight operations, site selections, and daily schedules are determined based on real-time weather assessments and safety considerations.",
    "Participants must comply with safety briefings, operational guidelines, and instructions provided by the operating team throughout the program.",
    "Failure to meet participation requirements or follow safety instructions may result in restricted flying activities or removal from certain program components.",
  ],
},
"8n9d": {
  slug: "8n9d",
  heroTitle: "Albatross 8N9D",
  heroSubtitle: "Exchange paragliding program",
  tagline: "Paragliding Adventure",

  overview: {
    eyebrow: "Program Overview",
    title: "The SKYRiders Program",
    body: [
      "(8 Nights / 9 Days) is an international exchange program that invites overseas pilots and clubs to Korea to tour multiple flying sites, fly together, and safely experience Korean culture, cuisine, and community exchange.",
      "",
      "This program excludes airfare and personal flying equipment, while accommodation, transportation, meals, and on-site operational support are fully handled by the operating team — taking care of the most inconvenient and demanding parts of traveling locally.",
      "",
      "Information regarding the operating period, pilot operation status, and the non-profit, cost-based operation statement will be finalized and provided after internal review.",
    ],
  },

  meals: {
    eyebrow: "Meals & Local Experience",
    title: "Shared meals, real exchange",
    body: [
      "Meals during the SKYRiders Program are provided as part of on-site operational support, allowing participants to focus on flying, rest, and pilot exchange without the burden of planning or logistics.",
      "",
      "Most meals are shared as group meals, creating natural opportunities for communication and cultural exchange between overseas pilots, local pilots, and the SKYRiders operating team.",
      "Depending on the program flow and local conditions, meals may include welcome dinners, group banquets, and casual local dining experiences.",
      "",
      "In addition to flying, participants may experience selected local activities such as cultural visits, short sightseeing stops, or informal community interactions.",
      "These activities are designed to support rest, recovery, and meaningful exchange, rather than structured tourism.",
      "",
      "All meal and local experience arrangements are flexible and may be adjusted based on weather conditions, daily flight schedules, and safety considerations.",
    ],
  },

  requirements: {
    eyebrow: "Participation Requirements",
    title: "Safety-first participation criteria",
    body: [
      "To ensure safe and smooth operation of the SKYRiders Program, all participants are required to meet the following conditions:",
    ],
    bullets: [
      "Hold a valid paragliding license recognized in their home country",
      "Carry appropriate personal travel and/or flight insurance",
      "Use their own certified paragliding equipment suitable for the planned flying conditions",
      "Be physically fit to participate in paragliding activities",
      "Accept that all flying activities are weather- and site-dependent",
      "Respect safety decisions made by the SKYRiders operating team and local site coordinators",
    ],
  },

  keyFacts: [
    { label: "Duration", value: "8 Nights / 9 Days (8N9D)" },
    { label: "Program Structure", value: "Flying tour + exchange + local experience" },
    {
      label: "Recommended For",
      value:
        "Overseas paragliding club teams, individual pilots, and pilots flying in Korea for the first time",
    },
    {
      label: "Level / Requirements",
      value:
        "Valid paragliding license, personal insurance, personal flying equipment, and flexibility for weather- and site-dependent operations (details finalized after internal review).",
    },
  ],

  included: [
    "Local airport pickup and group transfers during the program",
    "All ground transportation related to the program schedule",
    "Accommodation during the program period",
    "Meals provided according to the program flow",
    "Snacks and refreshments during flying days",
    "On-site operational support by the SKYRiders team",
    "Safety briefings and daily flight coordination",
    "Local pilot support and exchange activities",
    "Group activities such as welcome dinners or farewell gatherings (if applicable)",
  ],

  notIncluded: [
    "Airfare (international and/or domestic flights to and from Korea)",
    "Personal paragliding equipment (glider, harness, helmet, reserve parachute, etc.)",
    "Personal travel or flight insurance",
    "Any additional accommodation outside the official program period",
    "Personal expenses not related to the official program schedule",
    "Optional activities or services not listed in the official program flow",
  ],

  flow: [
    {
      day: "Day 1",
      title: "Arrival & Orientation",
      items: [
        "Airport assembly and group coordination",
        "Transfer to base camp",
        "Change of clothes and short break",
        "Program orientation (safety briefing, staff introduction, program overview)",
        "Evening: Welcome dinner",
        "Transfer to accommodation",
      ],
    },
    {
      day: "Day 2",
      title: "Flying Day",
      items: [
        "Transfer to flying site",
        "Flight briefing & safety check",
        "Free flying session",
        "Equipment pack-up",
        "Evening: Group dinner or exchange session",
      ],
    },
    {
      day: "Day 3",
      title: "Flying Day (or Alternative Plan)",
      items: [
        "Transfer to flying site",
        "Flight briefing & safety check",
        "Free flying session (or alternative site / non-flying plan depending on conditions)",
        "Equipment pack-up",
        "Evening: Local exchange or rest",
      ],
    },
    {
      day: "Day 4",
      title: "Flexible Flying / Recovery Day",
      items: [
        "Flexible schedule depending on weather and site conditions",
        "Optional flying session, site change, or rest period",
        "Informal pilot exchange or free time",
        "Evening: Group meal",
      ],
    },
    {
      day: "Day 5",
      title: "Flying Day",
      items: [
        "Transfer to flying site",
        "Flight briefing & safety check",
        "Free flying session",
        "Equipment pack-up",
        "Evening: Group dinner or exchange session",
      ],
    },
    {
      day: "Day 6",
      title: "Flexible Flying / Local Experience Day",
      items: [
        "Flexible program flow depending on conditions",
        "Additional flying opportunity, local experience, or rest",
        "Informal pilot exchange or free time",
        "Evening: Group meal",
      ],
    },
    {
      day: "Day 7",
      title: "Final Flying Day",
      items: [
        "Transfer to flying site",
        "Final flying session (weather permitting)",
        "Equipment pack-up",
        "Evening: Farewell dinner or closing gathering",
      ],
    },
    {
      day: "Day 8",
      title: "Wrap-up & Cultural Time",
      items: [
        "Light schedule depending on overall program flow",
        "Optional short flying session or local/cultural time",
        "Program wrap-up and rest",
        "Evening: Informal group gathering",
      ],
    },
    {
      day: "Day 9",
      title: "Closing & Departure",
      items: [
        "Farewell breakfast & closing remarks",
        "Check-out",
        "Transfer and group drop-off",
      ],
    },
  ],

  cancellation: {
    eyebrow: "Cancellation & Refund Policy",
    title: "Cost-based pilot operation policy",
    body: [
      "The SKYRiders Program is operated as a non-profit, cost-based pilot exchange program. As such, cancellation and refund conditions are structured to reflect actual operational costs already incurred.",
      "",
      "Cancellations must be submitted in writing prior to the program start date.",
      "Refund eligibility and amounts depend on the timing of the cancellation and expenses already committed (accommodation, transportation, venue reservations, and operational arrangements).",
      "Once the program has commenced, refunds may not be possible for unused services or missed activities.",
      "No refunds will be issued for schedule changes or activity adjustments made due to weather conditions, site availability, or safety decisions.",
      "",
      "Detailed cancellation and refund guidelines will be provided upon confirmation of participation or made available in the Pilot Resources section.",
    ],
  },

  notes: [
    "All flight operations, site selections, and daily schedules are determined based on real-time weather assessments and safety considerations.",
    "Participants must comply with safety briefings, operational guidelines, and instructions provided by the operating team throughout the program.",
    "Failure to meet participation requirements or follow safety instructions may result in restricted flying activities or removal from certain program components.",
  ],
},

};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white">
      {children}
    </span>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
}

export default async function ProgramSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = COURSE[slug];
  if (!course) return notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* Back */}
      <Link href="/programs" className="text-sm text-neutral-600 hover:underline">
        ← Back to Programs
      </Link>

     {/* HERO (image version) */}
<section className="mt-6 overflow-hidden rounded-3xl border border-neutral-200">
  <div className="relative h-[340px]">
    {/* background image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(/programs/${course.slug}.jpg)` }}
    />

    {/* overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/15" />

    {/* content */}
    <div className="absolute inset-x-0 bottom-0 p-8">
      <p className="text-sm font-medium text-white/80">{course.tagline}</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
        {course.heroTitle}
      </h1>
      <p className="mt-2 max-w-2xl text-white/90">{course.heroSubtitle}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge>{course.slug.toUpperCase()}</Badge>
        <Badge>Exchange</Badge>
        <Badge>Community</Badge>
        <Badge>Korea · Seasonal sites</Badge>
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
  </div>
</section>


      {/* Overview + Key facts */}
      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <SectionTitle
              eyebrow={course.overview.eyebrow}
              title={course.overview.title}
            />
            <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700">
              {course.overview.body?.map((p, idx) =>
                p === "" ? (
                  <div key={idx} className="h-2" />
                ) : (
                  <p key={idx}>{p}</p>
                )
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <SectionTitle eyebrow="At a Glance" title="Key Facts" />
            <div className="mt-5 space-y-4">
              {course.keyFacts.map((k) => (
                <div key={k.label} className="rounded-2xl border p-4">
                  <p className="text-xs font-semibold text-neutral-500">
                    {k.label}
                  </p>
                  <p className="mt-1 text-sm text-neutral-800">{k.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Meals & local experience */}
      <section className="mt-12">
        <Card>
          <SectionTitle eyebrow={course.meals.eyebrow} title={course.meals.title} />
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700">
            {course.meals.body?.map((p, idx) =>
              p === "" ? <div key={idx} className="h-2" /> : <p key={idx}>{p}</p>
            )}
          </div>
        </Card>
      </section>

      {/* Included / Not included */}
      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <Card>
          <SectionTitle eyebrow="Services" title="What’s Included" />
          <ul className="mt-5 space-y-2 text-sm text-neutral-700">
            {course.included.map((it) => (
              <li key={it} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black/70" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-neutral-500">
            Included services may be adjusted depending on weather, site
            conditions, and safety considerations.
          </p>
        </Card>

        <Card>
          <SectionTitle eyebrow="Services" title="What’s Not Included" />
          <ul className="mt-5 space-y-2 text-sm text-neutral-700">
            {course.notIncluded.map((it) => (
              <li key={it} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black/70" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Requirements */}
      <section className="mt-12">
        <Card>
          <SectionTitle
            eyebrow={course.requirements.eyebrow}
            title={course.requirements.title}
          />
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700">
            {course.requirements.body?.map((p, idx) =>
              p === "" ? <div key={idx} className="h-2" /> : <p key={idx}>{p}</p>
            )}
          </div>

          {course.requirements.bullets ? (
            <ul className="mt-5 grid gap-2 md:grid-cols-2 text-sm text-neutral-700">
              {course.requirements.bullets.map((b) => (
                <li key={b} className="flex gap-2 rounded-2xl border p-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black/70" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6 rounded-2xl border bg-neutral-50 p-5">
            <p className="text-sm font-semibold text-neutral-900">
              Operational & Safety Notes
            </p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {course.notes.map((n) => (
                <li key={n} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black/70" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      {/* Example flow */}
      <section className="mt-12">
        <Card>
          <SectionTitle eyebrow="Example Program Flow" title="Day-by-day outline" />
          <div className="mt-6 grid gap-4">
            {course.flow.map((d) => (
              <div key={d.day} className="rounded-3xl border p-6">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm font-semibold">{d.day}</p>
                  <p className="text-sm text-neutral-600">{d.title}</p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {d.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black/70" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Cancellation */}
      <section className="mt-12">
        <Card>
          <SectionTitle
            eyebrow={course.cancellation.eyebrow}
            title={course.cancellation.title}
          />
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700">
            {course.cancellation.body?.map((p, idx) =>
              p === "" ? <div key={idx} className="h-2" /> : <p key={idx}>{p}</p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Apply / Contact
            </Link>
            <Link
              href="/resources"
              className="rounded-xl border px-5 py-3 text-sm font-medium hover:bg-neutral-50"
            >
              Pilot Resources
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer disclaimer */}
      <p className="mt-10 text-xs text-neutral-500">
        Disclaimer: Weather and site conditions change rapidly. Participants are
        responsible for their own flight decisions, equipment, licenses,
        insurance, and compliance with local rules.
      </p>
    </main>
  );
}
