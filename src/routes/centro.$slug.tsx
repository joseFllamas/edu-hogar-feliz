import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  MapPin,
  ShieldCheck,
  Star,
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  Clock,
  Users,
  Languages,
  Sparkles,
  Heart,
  Calendar,
} from "lucide-react";
import { centers, getCenter } from "@/lib/centers";
import educolandLogo from "@/assets/educoland-logo-v2.png.asset.json";

export const Route = createFileRoute("/centro/$slug")({
  head: ({ params }) => {
    const c = getCenter(params.slug);
    if (!c) {
      return {
        meta: [{ title: "Centro no encontrado · Educoland" }],
      };
    }
    return {
      meta: [
        { title: `${c.name} · ${c.city} · Educoland` },
        { name: "description", content: c.description },
        { property: "og:title", content: `${c.name} · ${c.city}` },
        { property: "og:description", content: c.description },
        { property: "og:image", content: c.image },
        { name: "twitter:image", content: c.image },
      ],
    };
  },
  loader: ({ params }) => {
    const center = getCenter(params.slug);
    if (!center) throw notFound();
    return { center };
  },
  notFoundComponent: NotFoundCentro,
  component: CentroPage,
});

function NotFoundCentro() {
  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-ink">No encontramos ese centro</h1>
        <p className="mt-3 text-muted-foreground">
          Puede que la ficha se haya retirado o que el enlace esté mal escrito.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al directorio
        </Link>
      </main>
    </div>
  );
}

function Logo() {
  return (
    <Link to="/" className="inline-flex items-center" aria-label="Educoland, inicio">
      <img src={educolandLogo.url} alt="Educoland" className="h-9 w-auto sm:h-10" />
    </Link>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al directorio
        </Link>
      </div>
    </header>
  );
}

function CentroPage() {
  const { center: c } = Route.useLoaderData();
  const related = centers.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav aria-label="Migas" className="mx-auto max-w-7xl px-4 pt-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-primary">Educoland</Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link to="/" className="hover:text-primary">Centros</Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-foreground">{c.name}</li>
          </ol>
        </nav>

        {/* Hero ficha */}
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
            <div>
              <div className="overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/5">
                <img
                  src={c.image}
                  alt={`Imagen de ${c.name}`}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                {c.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Ficha verificada
                  </span>
                )}
                <span className="rounded-full bg-secondary/40 px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                  {c.type}
                </span>
              </div>

              <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {c.name}
              </h1>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-coral" />
                {c.address}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 rounded-2xl bg-card p-4 shadow-soft ring-1 ring-border">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-sm font-bold text-primary-foreground">
                    {c.score.toFixed(1)}
                  </span>
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">Valoración global</p>
                    <p className="text-muted-foreground">{c.reviews} opiniones de familias</p>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(c.score / 2) ? "fill-star text-star" : "text-muted-foreground/40"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <Calendar className="h-4 w-4" />
                  Pedir visita
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                  >
                    <Phone className="h-4 w-4 text-primary" /> Llamar
                  </a>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                  >
                    <Heart className="h-4 w-4 text-coral" /> Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detalle */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">Sobre el centro</h2>
                <p className="mt-3 text-foreground/85">{c.description}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Proyecto educativo:</span> {c.project}
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">Qué ofrece</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {c.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 rounded-xl bg-card p-3 text-sm ring-1 ring-border"
                    >
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-ink">Datos clave</h2>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoRow icon={<Users className="h-4 w-4" />} label="Edades" value={c.ages} />
                  <InfoRow icon={<Clock className="h-4 w-4" />} label="Horario" value={c.schedule} />
                  <InfoRow icon={<Users className="h-4 w-4" />} label="Ratio" value={c.ratio} />
                  <InfoRow
                    icon={<Languages className="h-4 w-4" />}
                    label="Idiomas"
                    value={c.languages.join(" · ")}
                  />
                  <InfoRow
                    icon={<Sparkles className="h-4 w-4" />}
                    label="Precio orientativo"
                    value={c.pricing}
                  />
                </dl>
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl bg-card p-5 shadow-soft ring-1 ring-border">
                <h3 className="font-display text-lg font-semibold text-ink">Contacto</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    <span>{c.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                      {c.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <a href={`mailto:${c.email}`} className="break-all hover:text-primary">
                      {c.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <a
                      href={c.website}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="break-all hover:text-primary"
                    >
                      {c.website.replace(/^https?:\/\//, "")}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-cream p-5 ring-1 ring-border">
                <p className="text-xs font-semibold uppercase tracking-wider text-coral">
                  Consejo Educoland
                </p>
                <p className="mt-2 text-sm text-foreground/85">
                  Visita siempre el centro antes de matricular. Pregunta por ratios reales, periodo
                  de adaptación y comunicación diaria con familias.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* Relacionados */}
        <section className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Otros centros que te pueden interesar
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/centro/$slug"
                  params={{ slug: r.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative">
                    <img
                      src={r.image}
                      alt={`Imagen de ${r.name}`}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
                      {r.score.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="truncate font-display text-lg font-semibold text-ink">
                      {r.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{r.type}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 border-t border-border pt-3 text-sm text-foreground/80">
                      <MapPin className="h-4 w-4 text-coral" />
                      {r.city}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Educoland · Hecho con cariño en España
        </div>
      </footer>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-card p-4 ring-1 ring-border">
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
