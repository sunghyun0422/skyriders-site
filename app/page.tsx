import Link from "next/link";

const programs = [
  {
    title: "ALBATROSS 3N4D",
    subtitle: "3-night, 4-day paragliding exchange experience in Korea.",
    price: "USD 950",
    href: "/programs#3n4d",
  },
  {
    title: "ALBATROSS 5N6D",
    subtitle: "5-night, 6-day paragliding exchange experience in Korea.",
    price: "USD 1550",
    href: "/programs#5n6d",
  },
  {
    title: "ALBATROSS 8N9D",
    subtitle: "8-night, 9-day paragliding exchange experience in Korea.",
    price: "USD 2450",
    href: "/programs#8n9d",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-20">
      {/* HERO */}
      <section className="pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm tracking-widest text-neutral-500">SKYRIDERS</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-6xl">
              SKYRides
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-7 text-neutral-600">
              An International Paragliding Exchange &amp; Flying Community.
            </p>
            <p className="mt-3 text-sm text-neutral-500">
              Flying · Exchange · Community
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/programs"
                className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                View Programs
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium hover:bg-neutral-50"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
            {/* 이미지 파일을 public/hero.jpg로 넣고 교체해줘 */}
            <div
              className="aspect-[4/3] w-full bg-cover bg-center"
              style={{ backgroundImage: "url(/hero.jpg)" }}
            />
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="mt-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
            <div
              className="aspect-[4/3] w-full bg-cover bg-center"
              style={{ backgroundImage: "url(/about.jpg)" }}
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Our Story</h2>
            <p className="mt-4 leading-7 text-neutral-600">
              SKYRiders is an international paragliding exchange and flying
              community. We bring together pilots from different countries to
              fly, share experiences, and connect through the common language of
              free flight.
            </p>
            <p className="mt-3 leading-7 text-neutral-600">
              Rather than operating as a commercial tour or flight school, we
              focus on genuine pilot exchange, local site experiences, and
              long-term international relationships built on trust and respect.
            </p>

            <div className="mt-6">
              <Link
                href="/our-story"
                className="inline-flex items-center rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="mt-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              ALBATROSS PROGRAM
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Choose your exchange length and join local flights in Korea.
            </p>
          </div>
          <Link
            href="/programs"
            className="hidden rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 md:inline-flex"
          >
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {programs.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    {p.subtitle}
                  </p>
                </div>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {p.price}
                </span>
              </div>

              <div className="mt-6">
                <Link
                  href={p.href}
                  className="inline-flex rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
          <h2 className="text-xl font-semibold tracking-tight">
            Ready to fly with SKYRIDERS?
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Send your inquiry and we’ll get back to you with program details and
            next steps.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Apply / Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
