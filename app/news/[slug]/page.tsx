import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../posts";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-neutral-700">
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

export default async function NewsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const primaryCta = post.cta ?? { label: "Contact", href: "/contact" };
  const secondaryCta =
    primaryCta.href === "/contact"
      ? { label: "Pilot Resources", href: "/resources" }
      : { label: "Contact", href: "/contact" };

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 space-y-10">
      <Link href="/news" className="text-sm text-neutral-600 hover:underline">
        ← Back to News
      </Link>

      <article className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{post.category}</Badge>
          <p className="text-xs text-neutral-500">{post.date}</p>
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          {post.title}
        </h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-neutral-800">
          {post.content.map((b, idx) => {
            if (b.type === "h2")
              return (
                <h2 key={idx} className="pt-3 text-xl font-semibold">
                  {b.text}
                </h2>
              );

            if (b.type === "ul")
              return (
                <ul key={idx} className="space-y-2">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-black/70" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );

            if (b.type === "img")
              return (
                <figure key={idx} className="space-y-2">
                  <div className="overflow-hidden rounded-3xl border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.src}
                      alt={b.alt}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  {b.caption ? (
                    <figcaption className="text-xs text-neutral-500">
                      {b.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );

            return <p key={idx}>{b.text}</p>;
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={primaryCta.href}
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            {primaryCta.label}
          </Link>

          <Link
            href={secondaryCta.href}
            className="rounded-xl border px-5 py-3 text-sm font-medium hover:bg-neutral-50"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </article>

      {more.length ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">More posts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} href={`/news/${p.slug}`}>
                <Card>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{p.category}</Badge>
                    <p className="text-xs text-neutral-500">{p.date}</p>
                  </div>
                  <h3 className="mt-3 font-semibold">{p.title}</h3>
                  <p className="mt-4 text-sm font-medium text-neutral-900">
                    Read →
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
