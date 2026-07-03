import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  BellRing,
  MapPin,
  MousePointerClick,
  MessageCircleHeart,
  Tag,
  ArrowRight,
  Check,
  Building2,
  UserPlus,
  Mail,
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

// TODO: cuando exista feed real de ofertas, sustituir por fetch/loader
const openOffers: Array<{
  id: string;
  title: string;
  center: string;
  city: string;
  type: string;
  urgent?: boolean;
}> = [];

function EmpleoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SimpleHeader />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        {openOffers.length > 0 ? <RecentOffers /> : null}
        <ForCenters />
        <FAQ />
        <FinalCTA />
      </main>
      <SimpleFooter />
    </div>
  );
}

function SimpleHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-xl font-semibold text-ink">
          Educoland
        </Link>
        <nav className="flex items-center gap-2" aria-label="Principal">
          <Link
            to="/centros"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted md:inline-block"
          >
            Buscar centros
          </Link>
          <a
            href="#crear-perfil"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
          >
            Crea tu perfil gratis
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-background to-background" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
            Para profesionales de la educación infantil
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
            Trabaja en escuelas infantiles{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">de tu zona</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm bg-secondary/55"
              />
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Recibe suplencias urgentes en tu email. Sin buscar, sin llamar, sin perder tiempo.
          </p>
          <div id="crear-perfil" className="mt-8 flex flex-col items-center gap-3">
            <a
              href="#registro"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary/90"
            >
              Crea tu perfil gratis
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="text-xs text-muted-foreground">
              Gratis · en 2 minutos · sin compromiso
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: <UserPlus className="h-6 w-6" />,
      title: "Crea tu perfil",
      desc: "Cuenta tu experiencia, titulación y disponibilidad. Tarda 2 minutos.",
    },
    {
      n: "02",
      icon: <MapPin className="h-6 w-6" />,
      title: "Marca tus zonas y activa las alertas",
      desc: "Elige provincias, municipios o distritos y el tipo de jornada que te interesa.",
    },
    {
      n: "03",
      icon: <Mail className="h-6 w-6" />,
      title: "Recibe ofertas y suplencias urgentes",
      desc: "Te llegan al email, sin tener que buscar. Aplicas al que te encaje.",
    },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-coral">Cómo funciona</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            En 3 pasos, sin currículums perdidos
          </h2>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative rounded-2xl bg-card p-6 shadow-soft ring-1 ring-border"
            >
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                Paso {s.n}
              </span>
              <div className="mt-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {s.icon}
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    {
      icon: <BellRing className="h-6 w-6" />,
      title: "Alertas de suplencias en tu zona",
      desc: "Cuando una escuela necesita cubrir una baja urgente cerca de ti, te avisamos primero.",
    },
    {
      icon: <MousePointerClick className="h-6 w-6" />,
      title: "Candidatura en 1 clic",
      desc: "Aplica a ofertas abiertas con tu perfil ya listo. Sin adjuntar CV cada vez.",
    },
    {
      icon: <MessageCircleHeart className="h-6 w-6" />,
      title: "Reputación de comunidad",
      desc:
        "Responde a las dudas de familias en el consultorio y gana visibilidad. Tu aportación te posiciona aunque hoy no haya oferta para ti.",
    },
    {
      icon: <Tag className="h-6 w-6" />,
      title: "Descuentos en material escolar",
      desc: "Obtén descuentos especiales en material y recursos para tu día a día en el aula.",
    },
  ];
  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-coral">Qué ganas</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Todo lo bueno de estar dentro de Educoland
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {items.map((b) => (
            <article
              key={b.title}
              className="rounded-2xl bg-card p-6 shadow-soft ring-1 ring-border"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/25 text-ink">
                {b.icon}
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecentOffers() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-coral">
              Ofertas recientes
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Últimas oportunidades publicadas
            </h2>
          </div>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {openOffers.map((o) => (
            <li
              key={o.id}
              className="rounded-2xl bg-card p-5 shadow-soft ring-1 ring-border"
            >
              <div className="flex items-center gap-2">
                {o.urgent ? (
                  <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                    Urgente
                  </span>
                ) : null}
                <span className="text-xs font-medium text-muted-foreground">{o.type}</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">{o.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {o.center} · {o.city}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ForCenters() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
          <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                ¿Eres un centro?
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Publica ofertas, cubre suplencias urgentes y encuentra profesionales de tu zona
              </h2>
            </div>
            <a
              href="/#centros-pro"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-background px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Acceso para centros
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      q: "¿Cómo desactivo las alertas?",
      a: "En un clic desde el pie de cualquier email, o desde los ajustes de tu perfil. Puedes pausarlas o filtrarlas por zona y tipo de jornada cuando quieras.",
    },
  ];
  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-coral">Preguntas</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Lo esencial, sin letra pequeña
          </h2>
        </div>
        <dl className="mt-8 space-y-4">
          {items.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl bg-card p-5 shadow-soft ring-1 ring-border"
            >
              <dt className="flex items-start gap-3 font-display text-lg font-semibold text-ink">
                <Check className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                {f.q}
              </dt>
              <dd className="mt-2 pl-8 text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="registro" className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground shadow-lift sm:p-14">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
          <div className="relative text-center">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Empieza a recibir ofertas cerca de ti
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
              Crea tu perfil una vez y deja que las oportunidades te lleguen.
            </p>
            <a
              href="#"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-base font-semibold text-primary shadow-lift hover:bg-background/90"
            >
              Crea tu perfil gratis
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SimpleFooter() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Educoland</p>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-foreground">
            Inicio
          </Link>
          <Link to="/centros" className="hover:text-foreground">
            Centros
          </Link>
        </div>
      </div>
    </footer>
  );
}
