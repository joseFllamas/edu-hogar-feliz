import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/profesional/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Perfil de ${params.slug} · Educoland` },
      {
        name: "description",
        content:
          "Ficha profesional de una educadora infantil verificada en Educoland: formación, experiencia y disponibilidad.",
      },
    ],
  }),
  component: ProfesionalDetailPage,
});

type Experience = {
  role: string;
  cycle: string;
  duration: string;
  center: string;
  note?: string;
  current?: boolean;
};

const PROFILE = {
  name: "María del Mar Martín Andújar",
  age: 30,
  city: "Almería",
  drives: true,
  photo:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop",
  presentation: [
    "Mi nombre es María del Mar Martín, una chica con vocación por la enseñanza. Esto me llevó a querer formarme para desarrollar mi pasión en este ámbito, donde puedo explotar al máximo mi potencial creativo.",
    "Tras formarme en un grado Superior como Técnico en Educación Infantil y tomar contacto por primera vez con el alumnado en sus primeras etapas educativas descubrí que eso era en lo que quería seguir formándome. Por ese motivo decidí especializarme como Graduada en Magisterio Infantil.",
    "En estos años me he desarrollado como docente, uniendo el conocimiento teórico a las habilidades prácticas que he ido experimentando en los diferentes centros y etapas. Soy una profesional polivalente, empática, creativa y con gran capacidad en la resolución de conflictos.",
  ],
  experience: [
    {
      role: "Profesora",
      cycle: "Primer ciclo Infantil (0-3)",
      duration: "Menos de 1 año",
      center: "Colegio Jesús María",
      note: "Suplencia",
      current: true,
    },
    {
      role: "Asistente",
      cycle: "Segundo ciclo Infantil (3-6)",
      duration: "1 a 3 años",
      center: "Colegio Jesús María",
      note: "Suplencia por embarazo",
    },
    {
      role: "Suplente",
      cycle: "Bachillerato",
      duration: "Menos de 1 año",
      center: "Colegio Miralba",
      note: "Coordinación de profesores y tutoría general",
    },
  ] as Experience[],
  education: [
    "Grado en Magisterio Infantil",
    "Técnico Superior en Educación Infantil",
    "Técnico Auxiliar en Atención Socio-Sanitaria",
    "Educación Secundaria Obligatoria",
  ],
  preferredArea: "Almería (ciudad)",
  preferredNote:
    "Abierta a desplazamientos dentro de la provincia según condiciones del puesto.",
};

function ProfesionalDetailPage() {
  const p = PROFILE;

  return (
    <div className="min-h-screen bg-[#faf6ef] font-['Inter',sans-serif] text-[#0f1b3d]">
      {/* Header */}
      <header className="border-b border-[#0f1b3d]/10 bg-[#faf6ef]/90 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            to="/"
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Educoland
          </Link>
          <nav className="hidden gap-6 text-sm font-medium text-[#0f1b3d]/70 md:flex">
            <Link to="/centros" className="hover:text-[#0f1b3d]">Buscar centros</Link>
            <Link to="/empleo" className="hover:text-[#0f1b3d]">Empleo</Link>
            <Link to="/profesionales" className="text-[#0f1b3d]">Profesionales</Link>
            <Link to="/mi-cuenta" className="hover:text-[#0f1b3d]">Mi cuenta</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Back link */}
        <Link
          to="/profesionales"
          className="inline-flex items-center text-sm font-medium text-[#0f1b3d] transition-opacity hover:opacity-70 print:hidden"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver a profesionales
        </Link>

        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Main column 2/3 */}
          <div className="space-y-6 lg:col-span-8">
            {/* Header card */}
            <section className="flex flex-col items-center gap-8 rounded-2xl border border-[#0f1b3d]/10 bg-white p-8 shadow-sm md:flex-row md:items-start">
              <div className="relative shrink-0">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="h-32 w-32 rounded-full border-4 border-[#faf6ef] object-cover"
                />
                <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-500" />
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <h1
                    className="mb-2 text-3xl leading-tight text-[#0f1b3d] md:text-4xl"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {p.name}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[#0f1b3d]/60 md:justify-start">
                    <span>{p.age} años</span>
                    <span className="h-1 w-1 rounded-full bg-[#0f1b3d]/20" />
                    <span className="inline-flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {p.city}
                    </span>
                    {p.drives && (
                      <span className="rounded-full border border-[#e8b84a]/40 bg-[#e8b84a]/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#0f1b3d]">
                        Dispuesto a desplazarse
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2 print:hidden md:justify-start">
                  <button
                    type="button"
                    className="rounded-lg bg-[#0f1b3d] px-6 py-2.5 font-semibold text-white shadow-lg shadow-[#0f1b3d]/10 transition-colors hover:bg-[#1a2d5a]"
                  >
                    Contactar ahora
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-[#0f1b3d]/15 px-6 py-2.5 font-semibold text-[#0f1b3d] transition-colors hover:bg-[#faf6ef]"
                  >
                    Guardar candidata
                  </button>
                </div>
              </div>
            </section>

            {/* Presentation */}
            <section className="rounded-2xl border border-[#0f1b3d]/10 bg-white p-8 shadow-sm">
              <h2
                className="mb-6 flex items-center text-xl text-[#0f1b3d]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                <span className="mr-4 h-px w-8 bg-[#e8b84a]" />
                Presentación
              </h2>
              <div className="space-y-4 leading-relaxed text-[#0f1b3d]/75">
                {p.presentation.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="rounded-2xl border border-[#0f1b3d]/10 bg-white p-8 shadow-sm">
              <h2
                className="mb-8 flex items-center text-xl text-[#0f1b3d]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                <span className="mr-4 h-px w-8 bg-[#e8b84a]" />
                Experiencia profesional
              </h2>
              <div className="relative space-y-10">
                <div className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-[#0f1b3d]/10" />
                {p.experience.map((e, i) => (
                  <div key={i} className="relative pl-10">
                    <div
                      className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 border-white ${
                        e.current ? "bg-[#e8b84a]" : "bg-[#0f1b3d]"
                      }`}
                    />
                    <div className="mb-2 flex flex-col md:flex-row md:items-baseline md:justify-between">
                      <h3 className="text-lg font-bold text-[#0f1b3d]">
                        {e.role} · {e.cycle}
                      </h3>
                      <span className="shrink-0 text-sm font-medium text-[#0f1b3d]/40">
                        {e.duration}
                      </span>
                    </div>
                    <p className="font-medium text-[#0f1b3d]">{e.center}</p>
                    {e.note && (
                      <p className="mt-1 text-sm text-[#0f1b3d]/60">{e.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar 1/3 */}
          <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24">
            {/* CTA */}
            <div className="rounded-2xl bg-[#0f1b3d] p-6 text-white shadow-xl print:hidden">
              <h3
                className="mb-4 text-xl text-[#e8b84a]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                ¿Te interesa este perfil?
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-white/70">
                Contacta directamente con María para concertar una entrevista o
                solicitar más información.
              </p>
              <button
                type="button"
                className="mb-3 w-full rounded-xl bg-[#e8b84a] py-3.5 font-bold text-[#0f1b3d] transition-colors hover:bg-white"
              >
                Solicitar contacto
              </button>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") window.print();
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3.5 font-semibold text-white transition-colors hover:bg-white/20"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Imprimir ficha
              </button>
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-[#0f1b3d]/10 bg-white p-6 shadow-sm">
              <h2
                className="mb-4 text-lg text-[#0f1b3d]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Formación
              </h2>
              <ul className="space-y-4">
                {p.education.map((e) => (
                  <li key={e} className="flex items-start">
                    <div className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8b84a]" />
                    <span className="text-sm text-[#0f1b3d]/75">{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="rounded-2xl border border-[#0f1b3d]/10 bg-white p-6 shadow-sm">
              <h2
                className="mb-4 text-lg text-[#0f1b3d]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Preferencia geográfica
              </h2>
              <div className="rounded-lg bg-[#faf6ef] p-4">
                <p className="text-sm font-semibold text-[#0f1b3d]">
                  {p.preferredArea}
                </p>
                <p className="mt-1 text-xs leading-normal text-[#0f1b3d]/55">
                  {p.preferredNote}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
