import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
} from "lucide-react";

export const Route = createFileRoute("/empleo")({
  head: () => ({
    meta: [
      { title: "Trabaja en escuelas infantiles de tu zona · Educoland" },
      {
        name: "description",
        content:
          "Recibe suplencias urgentes y ofertas de empleo en escuelas infantiles cerca de ti. Crea tu perfil gratis en Educoland.",
      },
      { property: "og:title", content: "Trabaja en escuelas infantiles de tu zona" },
      {
        property: "og:description",
        content: "Recibe suplencias urgentes en tu email. Crea tu perfil gratis en Educoland.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmpleoPage,
});

/* Editorial palette */
const NAVY = "#0f1b3d";
const NAVY_2 = "#1e3a5f";
const MUSTARD = "#e8b84a";
const CREAM = "#faf6ef";

const serif = { fontFamily: "'DM Serif Display', serif" } as const;

/* -------------------------------------------------------------------------- */
/* Reveal on scroll                                                            */
/* -------------------------------------------------------------------------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform-gpu transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */
function EmpleoPage() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: CREAM, color: NAVY, fontFamily: "'Figtree', sans-serif" }}
    >
      <EditorialHeader />
      <main>
        <Hero />
        <BenefitsBand />
        <HowItWorks />
        <Consultorio />
        <ForCenters />
        <FAQ />
        <FinalCTA />
      </main>
      <EditorialFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Header                                                                      */
/* -------------------------------------------------------------------------- */
function EditorialHeader() {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur"
      style={{ backgroundColor: `${CREAM}dd`, borderBottom: `1px solid ${NAVY}1a` }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="text-2xl font-bold tracking-tight" style={{ ...serif, color: NAVY }}>
          Educoland
        </Link>
        <nav className="hidden gap-8 text-[11px] font-semibold uppercase tracking-[0.18em] md:flex">
          <Link to="/centros" className="transition-colors hover:opacity-60" style={{ color: NAVY }}>
            Buscar centros
          </Link>
          <Link to="/empleo" className="transition-colors hover:opacity-60" style={{ color: NAVY }}>
            Ofertas de empleo
          </Link>
          <Link to="/profesionales" className="transition-colors hover:opacity-60" style={{ color: NAVY }}>
            Profesionales
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#" className="hidden px-3 py-2 text-sm font-semibold sm:inline-block" style={{ color: NAVY }}>
            Acceder
          </a>
          <a
            href="#registro"
            className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: MUSTARD, color: NAVY }}
          >
            Crea tu perfil
          </a>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */
function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-16 md:grid-cols-2 md:items-center md:pt-24">
      <Reveal>
        <div className="space-y-8">
          <span
            className="inline-block px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ backgroundColor: MUSTARD, color: NAVY }}
          >
            Portal Nº1 en educación infantil
          </span>
          <h1
            className="text-5xl leading-[1.05] tracking-tight md:text-7xl"
            style={{ ...serif, color: NAVY }}
          >
            Trabaja en{" "}
            <span style={{ color: MUSTARD }}>escuelas infantiles</span> de tu zona.
          </h1>
          <p className="max-w-md text-lg leading-relaxed" style={{ color: NAVY_2 }}>
            Recibe suplencias urgentes y ofertas de empleo cerca de ti. Sin
            buscar, sin llamar, sin perder tiempo.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#registro"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors"
              style={{ backgroundColor: NAVY }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = NAVY_2)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = NAVY)}
            >
              Crea tu perfil gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#centros"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-white"
              style={{ border: `2px solid ${NAVY}`, color: NAVY }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = NAVY)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Soy un centro
            </a>
          </div>
          <p className="pt-2 text-xs" style={{ color: `${NAVY_2}99` }}>
            Gratis · en 2 minutos · sin compromiso
          </p>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="relative">
          <div
            className="relative aspect-square overflow-hidden"
            style={{ backgroundColor: NAVY }}
          >
            {/* SVG illustration in place of photo — schoolroom silhouette */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 h-full w-full opacity-90"
              aria-hidden
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" fill="none" stroke={MUSTARD} strokeOpacity="0.12" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#grid)" />
              {/* sun */}
              <circle cx="310" cy="90" r="42" fill={MUSTARD} opacity="0.85" />
              {/* window frame */}
              <rect x="50" y="50" width="180" height="200" fill="none" stroke={MUSTARD} strokeWidth="2" opacity="0.6" />
              <line x1="140" y1="50" x2="140" y2="250" stroke={MUSTARD} strokeWidth="2" opacity="0.6" />
              <line x1="50" y1="150" x2="230" y2="150" stroke={MUSTARD} strokeWidth="2" opacity="0.6" />
              {/* building blocks */}
              <rect x="80" y="290" width="40" height="60" fill={MUSTARD} />
              <rect x="130" y="270" width="40" height="80" fill={CREAM} opacity="0.9" />
              <rect x="180" y="310" width="40" height="40" fill={MUSTARD} opacity="0.7" />
              {/* paper plane */}
              <path d="M240 180 L340 140 L300 200 L280 190 Z" fill={CREAM} opacity="0.95" />
              <path d="M280 190 L300 200 L295 220 Z" fill={MUSTARD} />
              {/* dashes trail */}
              <path
                d="M245 190 Q220 210 200 240 Q180 265 190 290"
                fill="none"
                stroke={CREAM}
                strokeWidth="2"
                strokeDasharray="3 6"
                opacity="0.6"
              />
            </svg>
          </div>
          {/* Mustard stat card */}
          <div
            className="absolute -bottom-6 -left-6 hidden p-6 shadow-2xl lg:block"
            style={{ backgroundColor: MUSTARD, color: NAVY }}
          >
            <p className="text-4xl font-bold leading-none" style={serif}>
              +10.500
            </p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em]">
              Profesionales en la comunidad
            </p>
          </div>
          {/* Cream small card top-right */}
          <div
            className="absolute -right-4 -top-4 hidden max-w-[180px] p-4 shadow-xl md:block"
            style={{ backgroundColor: CREAM, border: `1px solid ${NAVY}22` }}
          >
            <div className="mb-1 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: "#10b981" }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: NAVY_2 }}>
                Suplencia urgente
              </span>
            </div>
            <p className="text-[13px] font-semibold leading-snug" style={{ color: NAVY }}>
              Aula 1–2 años · Escuela El Nido
            </p>
            <p className="text-[11px]" style={{ color: `${NAVY_2}99` }}>
              Madrid · Publicada hace 2h
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Benefits Grid (dark navy band)                                              */
/* -------------------------------------------------------------------------- */
function BenefitsBand() {
  const items = [
    {
      title: "Cercanía total",
      desc: "Alertas de suplencias en tu zona. Cuando una escuela busca cerca de ti, te avisamos antes que a nadie.",
    },
    {
      title: "Candidatura en 1 clic",
      desc: "Aplica a ofertas abiertas con tu perfil ya listo. Sin adjuntar CV, sin volver a rellenar nada.",
    },
    {
      title: "Reputación de comunidad",
      desc: "Responde en el consultorio y gana visibilidad ante los centros aunque hoy no busques activamente.",
    },
  ];
  return (
    <section className="py-24" style={{ backgroundColor: NAVY, color: CREAM }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: MUSTARD }}>
                Qué ganas
              </p>
              <h2 className="max-w-xl text-4xl leading-tight md:text-5xl" style={serif}>
                Todo lo bueno de estar dentro de Educoland
              </h2>
            </div>
            <div className="h-px flex-grow" style={{ backgroundColor: `${CREAM}33`, maxWidth: 240 }} />
          </div>
        </Reveal>
        <div
          className="grid md:grid-cols-3"
          style={{ border: `1px solid ${CREAM}22` }}
        >
          {items.map((b, i) => (
            <Reveal key={b.title} delay={i * 100}>
              <div
                className="group h-full p-12 transition-colors"
                style={{
                  borderRight: i < items.length - 1 ? `1px solid ${CREAM}22` : undefined,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = NAVY_2)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: MUSTARD }}>
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-2xl" style={serif}>
                  {b.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: `${CREAM}b3` }}>
                  {b.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* How it works — sticky title + numbered list                                 */
/* -------------------------------------------------------------------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Crea tu currículum digital",
      desc: "Cuenta tu experiencia, titulación y disponibilidad. Es gratis y solo te llevará 2 minutos.",
    },
    {
      n: "02",
      title: "Marca tus zonas y activa las alertas",
      desc: "Elige provincias, municipios o distritos, y el tipo de jornada que te interesa.",
    },
    {
      n: "03",
      title: "Recibe ofertas y suplencias urgentes",
      desc: "Te llegan al email en tiempo real cuando una escuela cerca de ti publica una vacante.",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col items-start gap-16 md:flex-row">
        <div className="md:sticky md:top-32 md:w-1/3">
          <Reveal>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: MUSTARD }}>
              Cómo funciona
            </p>
            <h2 className="text-4xl leading-tight md:text-5xl" style={{ ...serif, color: NAVY }}>
              Cómo funciona Educoland
            </h2>
            <p className="mt-6 max-w-sm" style={{ color: NAVY_2 }}>
              Tres pasos sencillos, sin currículums perdidos, sin llamadas frías, sin perder tu tiempo.
            </p>
          </Reveal>
        </div>
        <ol className="w-full space-y-16 md:w-2/3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <li className="group flex gap-8">
                <span
                  className="shrink-0 text-6xl leading-none opacity-40 transition-opacity group-hover:opacity-100"
                  style={{ ...serif, color: MUSTARD }}
                >
                  {s.n}.
                </span>
                <div className="pt-2">
                  <h4
                    className="text-lg font-bold uppercase tracking-[0.1em]"
                    style={{ color: NAVY }}
                  >
                    {s.title}
                  </h4>
                  <p className="mt-3 leading-relaxed" style={{ color: `${NAVY_2}cc` }}>
                    {s.desc}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Consultorio (chat / community)                                              */
/* -------------------------------------------------------------------------- */
function Consultorio() {
  return (
    <section
      className="py-24"
      style={{ backgroundColor: `${MUSTARD}22`, borderTop: `1px solid ${NAVY}10`, borderBottom: `1px solid ${NAVY}10` }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <Reveal>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: NAVY_2 }}>
              La comunidad
            </p>
            <h2 className="text-4xl leading-tight md:text-5xl" style={{ ...serif, color: NAVY }}>
              Tu experiencia vale desde el primer día
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed" style={{ color: NAVY_2 }}>
              En el consultorio de Educoland las familias preguntan y las profesionales
              responden. Cada respuesta útil suma a tu reputación y te hace más visible
              ante los centros de tu zona.
            </p>
            <ul className="mt-8 space-y-3 text-sm" style={{ color: NAVY_2 }}>
              <li className="flex gap-3">
                <span style={{ color: MUSTARD }}>✓</span> Ayudas a familias reales con tu criterio profesional
              </li>
              <li className="flex gap-3">
                <span style={{ color: MUSTARD }}>✓</span> Ganas un badge de reputación que es tu carta de presentación
              </li>
              <li className="flex gap-3">
                <span style={{ color: MUSTARD }}>✓</span> Estás presente aunque hoy no busques activamente
              </li>
            </ul>
            <a
              href="#"
              className="mt-10 inline-flex items-center gap-2 border-b-2 pb-1 text-sm font-bold uppercase tracking-[0.15em]"
              style={{ color: NAVY, borderColor: MUSTARD }}
            >
              Conoce el consultorio <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="space-y-4">
            {/* family question */}
            <div
              className="max-w-[85%] p-5 shadow-sm"
              style={{ backgroundColor: "white", border: `1px solid ${NAVY}15` }}
            >
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center text-[11px] font-bold"
                  style={{ backgroundColor: `${MUSTARD}66`, color: NAVY }}
                >
                  AT
                </div>
                <p className="text-xs font-semibold" style={{ color: NAVY_2 }}>
                  Ana T. · madre en Sant Just
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: NAVY }}>
                ¿Cómo ayudo a mi hija de 2 años con la adaptación a la escuela infantil?
              </p>
            </div>
            {/* pro answer */}
            <div
              className="ml-auto max-w-[85%] p-5 shadow-sm"
              style={{ backgroundColor: NAVY, color: CREAM }}
            >
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center text-[11px] font-bold"
                  style={{ backgroundColor: MUSTARD, color: NAVY }}
                >
                  LM
                </div>
                <p className="text-xs font-semibold" style={{ color: MUSTARD }}>
                  Laura M. · educadora infantil
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: `${CREAM}e6` }}>
                Rutinas cortas y un objeto de casa como cuento ayudan mucho las
                primeras semanas. La constancia importa más que la duración…
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: `${MUSTARD}33`, color: MUSTARD }}>
                ★ Profesional destacada
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* For centers (dark band)                                                     */
/* -------------------------------------------------------------------------- */
function ForCenters() {
  return (
    <section id="centros" className="py-20" style={{ backgroundColor: NAVY }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: MUSTARD }}>
                ¿Eres un centro?
              </p>
              <h2 className="text-3xl leading-tight md:text-4xl" style={{ ...serif, color: CREAM }}>
                Publica ofertas, cubre suplencias urgentes y encuentra profesionales de tu zona.
              </h2>
            </div>
            <a
              href="/#centros-pro"
              className="group inline-flex shrink-0 items-center gap-2 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: MUSTARD, color: NAVY }}
            >
              Acceso para centros
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ (accordion)                                                             */
/* -------------------------------------------------------------------------- */
function FAQ() {
  const items = [
    {
      q: "¿Es gratis?",
      a: "Sí. Crear tu perfil, recibir alertas y aplicar a ofertas es completamente gratis para profesionales.",
    },
    {
      q: "¿Quién ve mi perfil y mi email?",
      a: "Tu email no se muestra en tu perfil público. Solo las escuelas a las que te postulas ven tus datos de contacto. No compartimos tu email con terceros ni lo usamos para publicidad.",
    },
    {
      q: "¿Puedo desactivar las alertas?",
      a: "En un clic desde el pie de cualquier email, o desde los ajustes de tu perfil. Puedes pausarlas o filtrarlas por zona y tipo de jornada cuando quieras.",
    },
    {
      q: "¿Tengo que estar buscando trabajo activamente?",
      a: "No. Muchas profesionales tienen su perfil activo y solo responden si les llega algo interesante. Tú controlas cuándo y cómo.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <Reveal>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: MUSTARD }}>
          Preguntas
        </p>
        <h2 className="mt-3 text-4xl leading-tight md:text-5xl" style={{ ...serif, color: NAVY }}>
          Lo esencial, sin letra pequeña
        </h2>
      </Reveal>
      <dl className="mt-12 space-y-0" style={{ borderTop: `1px solid ${NAVY}22` }}>
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 60}>
              <div style={{ borderBottom: `1px solid ${NAVY}22` }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:opacity-70"
                >
                  <dt className="text-lg font-semibold" style={{ color: NAVY }}>
                    {f.q}
                  </dt>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isOpen ? MUSTARD : "transparent",
                      border: `1px solid ${NAVY}33`,
                      color: NAVY,
                    }}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <dd
                  className="overflow-hidden pr-14 transition-all duration-500 ease-out"
                  style={{
                    maxHeight: isOpen ? 200 : 0,
                    opacity: isOpen ? 1 : 0,
                    paddingBottom: isOpen ? 24 : 0,
                    color: NAVY_2,
                  }}
                >
                  <p className="text-[15px] leading-relaxed">{f.a}</p>
                </dd>
              </div>
            </Reveal>
          );
        })}
      </dl>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                   */
/* -------------------------------------------------------------------------- */
function FinalCTA() {
  return (
    <section id="registro" className="py-24" style={{ backgroundColor: NAVY }}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: MUSTARD }}>
            Empieza hoy
          </p>
          <h2 className="text-4xl leading-tight md:text-6xl" style={{ ...serif, color: CREAM }}>
            Empieza a recibir <span style={{ color: MUSTARD }}>ofertas cerca de ti</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed" style={{ color: `${CREAM}b3` }}>
            Crea tu perfil una vez y deja que las oportunidades te lleguen.
          </p>
          <a
            href="#"
            className="group mt-10 inline-flex items-center gap-2 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: MUSTARD, color: NAVY }}
          >
            Crea tu perfil gratis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */
function EditorialFooter() {
  return (
    <footer className="py-16" style={{ backgroundColor: NAVY, color: CREAM, borderTop: `1px solid ${CREAM}15` }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="text-3xl" style={{ ...serif, color: CREAM }}>
            Educoland
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: `${CREAM}99` }}>
            Directorio independiente de centros educativos en España. Empleo para
            familias, centros y profesionales.
          </p>
        </div>
        <div>
          <h5 className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: MUSTARD }}>
            Profesionales
          </h5>
          <ul className="space-y-3 text-sm" style={{ color: `${CREAM}cc` }}>
            <li><a href="#" className="hover:opacity-60">Crear mi perfil</a></li>
            <li><a href="#" className="hover:opacity-60">Bolsa de empleo</a></li>
            <li><a href="#" className="hover:opacity-60">Consultorio</a></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: MUSTARD }}>
            Legal
          </h5>
          <ul className="space-y-3 text-sm" style={{ color: `${CREAM}cc` }}>
            <li><a href="#" className="hover:opacity-60">Aviso legal</a></li>
            <li><a href="#" className="hover:opacity-60">Privacidad (RGPD)</a></li>
            <li><a href="#" className="hover:opacity-60">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div
        className="mx-auto mt-16 flex max-w-7xl items-center justify-between px-6 pt-8 text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ color: `${CREAM}55`, borderTop: `1px solid ${CREAM}15` }}
      >
        <p>© {new Date().getFullYear()} Educoland · Hecho con cariño en España</p>
      </div>
    </footer>
  );
}
