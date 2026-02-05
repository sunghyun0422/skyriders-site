import Link from "next/link";

type FileItem = {
  title: string;
  desc: string;
  filename: string; // public/downloads 안 파일명
  meta?: string; // 예: PDF · 1.2MB
};

const files: FileItem[] = [
  {
    title: "Program Schedule & Daily Flow",
    desc: "Essential guide for visiting pilots: operations, communication, and expectations.",
    filename: "Program_Schedule.pdf",
    meta: "PDF",
  },
  {
    title: "Meal Plan & Menu Overview",
    desc: "Safety notes, operational rules, and decision-making standards for all pilots.",
    filename: "Meal_Plan&Menu_Overview.pdf",
    meta: "PDF",
  },
  {
    title: "SKYRIDERS Program Brochure",
    desc: "Required agreement for program participation (review before arrival).",
    filename: "Program_Brochure.pdf",
    meta: "PDF",
  },
];

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 space-y-10">
      {/* Header */}
      <section className="rounded-3xl border border-neutral-200 bg-white p-8">
        <h1 className="text-4xl font-bold tracking-tight">Pilot Resources</h1>
        <p className="mt-4 max-w-3xl text-neutral-700 leading-7">
          This section provides essential resources for pilots participating in
          or considering the SKYRiders exchange program. All materials shared
          here are intended to support safe flying, smooth communication, and
          informed participation.
        </p>

        <p className="mt-4 max-w-3xl text-neutral-700 leading-7">
          The resources may include: site information and local flying
          conditions, safety guidelines and operational notes, program-related
          documents and briefings, and cultural/practical information for
          visiting pilots.
        </p>

        <p className="mt-4 max-w-3xl text-xs text-neutral-500">
          These materials are shared for educational and informational purposes
          only and are continuously updated as conditions change.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            Ask a question
          </Link>
          <Link
            href="/programs"
            className="rounded-xl border px-5 py-3 text-sm font-medium hover:bg-neutral-50"
          >
            View Programs
          </Link>
        </div>
      </section>

      {/* Download list */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Downloads</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {files.map((f) => (
            <Card key={f.filename}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  {f.meta ? (
                    <p className="mt-1 text-xs text-neutral-500">{f.meta}</p>
                  ) : null}
                  <p className="mt-3 text-sm text-neutral-700 leading-7">
                    {f.desc}
                  </p>
                </div>

                <a
                  href={`/downloads/${f.filename}`}
                  download
                  className="shrink-0 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-90"
                >
                  Download
                </a>
              </div>
            </Card>
          ))}
        </div>

        
      </section>
    </main>
  );
}
