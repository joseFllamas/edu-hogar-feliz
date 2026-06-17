import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Search, MapPin, ShieldCheck, Star, ArrowRight, Heart, Building2, Briefcase } from "lucide-react";
import heroNursery from "@/assets/hero-nursery.jpg";
import pronensSupplies from "@/assets/pronens-supplies.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import educolandLogo from "@/assets/educoland-logo-v2.png.asset.json";
import { centers as featuredCenters } from "@/lib/centers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Educoland · Encuentra la guardería perfecta para tu peque" },
      {
        name: "description",
        content:
          "Directorio gratuito de escuelas infantiles y guarderías en España (0–6 años). 10.182 centros, valoraciones reales y fichas verificadas.",
      },
      { property: "og:title", content: "Educoland · Guarderías en España" },
      {
        property: "og:description",
        content: "10.182 centros en 52 provincias. Valoraciones reales y fichas verificadas.",
      },
    ],
  }),
  component: Home,
});

const featuredCenters = [
  {
    name: "Escuela Infantil El Jardín",
    type: "Centro privado · 0–3 años",
    city: "Madrid, Chamberí",
    score: 9.4,
    reviews: 128,
    image: center1,
    verified: true,
  },
  {
    name: "Guardería Els Petits",
    type: "Concertada · 0–3 años",
    city: "Barcelona, Gràcia",
    score: 9.2,
    reviews: 94,
    image: center2,
    verified: true,
  },
  {
    name: "Escuela Infantil La Huerta",
    type: "Cooperativa · 1–3 años",
    city: "Valencia, Ruzafa",
    score: 9.6,
    reviews: 76,
    image: center3,
    verified: true,
  },
  {
    name: "Centro Montessori Aurora",
    type: "Privado Montessori · 0–6 años",
    city: "Sevilla, Triana",
    score: 9.3,
    reviews: 112,
    image: center4,
    verified: false,
  },
  {
    name: "Escola Bressol Bambolina",
    type: "Pública · 0–3 años",
    city: "Bilbao, Indautxu",
    score: 9.1,
    reviews: 64,
    image: center2,
    verified: true,
  },
  {
    name: "Guardería Caracola",
    type: "Privada · 0–3 años",
    city: "Málaga, Centro",
    score: 9.0,
    reviews: 58,
    image: center1,
    verified: false,
  },
];

const testimonials = [
  {
    quote:
      "Buscaba guardería cerca de casa y en una tarde tenía tres visitas concertadas. Las opiniones de otras familias me ayudaron muchísimo a decidir.",
    name: "Marta G.",
    where: "Madrid · E.I. El Jardín",
    avatar: testimonial1,
    stars: 5,
  },
  {
    quote:
      "Lo que más valoramos fue ver fotos reales y los horarios actualizados. Llegamos con dudas y salimos con una lista corta de tres centros.",
    name: "Javier R.",
    where: "Valencia · E.I. La Huerta",
    avatar: testimonial2,
    stars: 5,
  },
  {
    quote:
      "Soy madre primeriza y la información de Educoland me dio mucha tranquilidad: proyecto educativo, ratios y opiniones de familias reales.",
    name: "Lucía P.",
    where: "Sevilla · Centro Aurora",
    avatar: testimonial3,
    stars: 5,
  },
];

function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />
      <main id="main">
        <Hero />
        <TrustBand />
        <FeaturedCenters />
        <Testimonials />
        <ThreeDoors />
        <PronensBand />
        <ProvinceDirectory />
      </main>
      <Footer />
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`inline-flex items-center ${className}`} aria-label="Educoland, inicio">
      <img
        src={educolandLogo.url}
        alt="Educoland"
        className="h-9 w-auto sm:h-10"
        loading="eager"
        decoding="async"
      />
    </a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Principal">
          <a href="#centros" className="hidden rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground md:inline-block">
            Buscar centros
          </a>
          <a href="#familias" className="hidden rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground md:inline-block">
            Familias
          </a>
          <a href="#centros-pro" className="hidden rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground md:inline-block">
            Centros
          </a>
          <a href="#empleo" className="hidden rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground md:inline-block">
            Empleo
          </a>
          <a href="#panel" className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm font-semibold text-primary shadow-soft transition-colors hover:bg-primary hover:text-primary-foreground">
            Mi panel
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
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-coral/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Directorio gratuito · datos verificados
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              Encuentra la escuela infantil{"\u00a0"}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">perfecta</span>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm bg-secondary/55" />
              </span>
              <br /> para tu peque
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              <strong className="font-semibold text-foreground">10.182 centros</strong> de 0 a 6 años en toda España.
              Compara proyecto educativo, horarios y valoraciones reales de otras familias.
            </p>

            <SearchBar />

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">Búsquedas populares:</span>
              {["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao"].map((c) => (
                <a key={c} href="#centros" className="rounded-full underline-offset-4 hover:text-primary hover:underline">
                  {c}
                </a>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/5">
                <img
                  src={heroNursery}
                  alt="Educadora sonriendo con un grupo de niñas y niños jugando en una escuela infantil con paredes turquesa"
                  width={1600}
                  height={1280}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="absolute -left-3 bottom-6 hidden max-w-[15rem] rounded-2xl bg-card p-3 shadow-lift ring-1 ring-border sm:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">Ficha verificada</p>
                    <p className="truncate text-xs text-muted-foreground">E.I. El Jardín, Madrid</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 top-6 hidden rounded-2xl bg-card p-3 shadow-lift ring-1 ring-border sm:block">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-star text-star" aria-hidden="true" />
                  <span className="text-sm font-semibold text-foreground">4,9 / 5</span>
                  <span className="text-xs text-muted-foreground">· 994 valoraciones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchBar() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      role="search"
      aria-label="Buscar guarderías"
      className="mt-8 rounded-2xl bg-card p-2 shadow-lift ring-1 ring-border sm:p-2.5"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="q" className="sr-only">
          Provincia, localidad o nombre del centro
        </label>
        <div className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5 sm:py-3">
          <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <input
            id="q"
            type="search"
            placeholder="Provincia, localidad o nombre del centro…"
            className="min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/80 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-soft transition-transform hover:bg-primary/95 hover:-translate-y-0.5 focus-visible:outline-none"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
          Buscar
        </button>
      </div>
    </form>
  );
}

function TrustBand() {
  const items = [
    { value: "10.182", label: "centros en 52 provincias" },
    { value: "4,9 ★", label: "media (994 valoraciones)" },
    { value: "671", label: "fichas verificadas" },
    { value: "13.568", label: "profesionales" },
  ];
  return (
    <section aria-label="Datos de Educoland" className="border-y border-border/70 bg-card/60">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
        <ul className="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-x-6">
          {items.map((it, i) => (
            <li
              key={it.label}
              className={`flex flex-col items-center text-center sm:flex-row sm:items-baseline sm:gap-3 sm:text-left ${
                i > 0 ? "sm:border-l sm:border-border sm:pl-6" : ""
              }`}
            >
              <span className="font-display text-2xl font-semibold text-primary sm:text-3xl">
                {it.value}
              </span>
              <span className="mt-1 text-xs text-muted-foreground sm:mt-0 sm:text-sm">
                {it.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const provinceTop = [
  { name: "Madrid", count: 1842, score: 9.1 },
  { name: "Barcelona", count: 1456, score: 9.0 },
  { name: "Valencia", count: 612, score: 9.2 },
  { name: "Sevilla", count: 488, score: 9.0 },
  { name: "Bilbao", count: 274, score: 9.3 },
  { name: "Málaga", count: 351, score: 8.9 },
  { name: "Zaragoza", count: 296, score: 9.0 },
  { name: "Murcia", count: 215, score: 8.8 },
];

const provinceAlphabet = [
  "A Coruña", "Álava", "Albacete", "Alicante", "Almería", "Asturias",
  "Ávila", "Badajoz", "Baleares", "Barcelona", "Burgos", "Cáceres",
  "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca",
  "Girona", "Granada", "Guadalajara", "Gipuzkoa", "Huelva", "Huesca",
  "Jaén", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo",
  "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Palencia",
  "Pontevedra", "Salamanca", "Segovia", "Sevilla", "Soria", "Tarragona",
  "Tenerife", "Teruel", "Toledo", "Valencia", "Valladolid", "Bizkaia",
  "Zamora", "Zaragoza", "Ceuta", "Melilla",
];

function ProvinceDirectory() {
  return (
    <section id="provincias" aria-labelledby="provincias-title" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-foreground/80">
              Explora por zona
            </p>
            <h2 id="provincias-title" className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Ranking de provincias
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Las provincias con más centros y mejor valoración media de las familias en los últimos 12 meses.
            </p>

            <ol className="mt-7 divide-y divide-border rounded-2xl bg-card ring-1 ring-border">
              {provinceTop.map((p, i) => (
                <li key={p.name}>
                  <a
                    href="#"
                    className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted"
                  >
                    <span className="w-6 shrink-0 text-right font-display text-sm font-semibold tabular-nums text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="flex-1 truncate text-sm font-semibold text-foreground group-hover:text-primary">
                      {p.name}
                    </span>
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                      {p.count.toLocaleString("es-ES")} centros
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/8 px-2 py-1 text-xs font-bold text-primary ring-1 ring-primary/15">
                      {p.score.toFixed(1)}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-foreground/80">
              Directorio A–Z
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Las 52 provincias de España
            </h3>
            <p className="mt-3 max-w-md text-muted-foreground">
              Encuentra escuelas infantiles y guarderías en tu provincia. Datos actualizados de fuentes oficiales.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3">
              {provinceAlphabet.map((p) => (
                <li key={p}>
                  <a
                    href="#"
                    className="block rounded-md py-1 text-sm text-foreground/85 underline-offset-4 hover:text-primary hover:underline"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

type DoorProps = {
  id: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  cta: string;
  featured?: boolean;
};

function Door({ id, icon, eyebrow, title, desc, bullets, cta, featured }: DoorProps) {
  return (
    <article
      id={id}
      className={[
        "relative flex flex-col rounded-3xl p-6 sm:p-7 transition-transform hover:-translate-y-1",
        featured
          ? "bg-primary text-primary-foreground shadow-lift ring-1 ring-primary/30"
          : "bg-card text-card-foreground shadow-soft ring-1 ring-border",
      ].join(" ")}
    >
      {featured && (
        <span className="absolute -top-3 right-6 rounded-full bg-coral px-3 py-1 text-xs font-semibold text-coral-foreground shadow-soft">
          Más usado por familias
        </span>
      )}
      <div
        className={`grid h-12 w-12 place-items-center rounded-2xl ${
          featured ? "bg-primary-foreground/15 text-primary-foreground" : "bg-primary/10 text-primary"
        }`}
        aria-hidden="true"
      >
        {icon}
      </div>
      <p className={`mt-5 text-xs font-semibold uppercase tracking-wider ${featured ? "text-primary-foreground/70" : "text-coral"}`}>
        {eyebrow}
      </p>
      <h3 className={`mt-1 font-display text-2xl font-semibold ${featured ? "text-primary-foreground" : "text-ink"}`}>
        {title}
      </h3>
      <p className={`mt-2 text-sm ${featured ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
        {desc}
      </p>
      <ul className="mt-5 space-y-2 text-sm">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span aria-hidden="true" className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${featured ? "bg-primary-foreground/70" : "bg-primary"}`} />
            <span className={featured ? "text-primary-foreground/90" : "text-foreground/85"}>{b}</span>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
          featured
            ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            : "bg-foreground text-background hover:bg-foreground/90"
        }`}
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
}

function ThreeDoors() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-coral">¿Quién eres?</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Tres puertas, una misma comunidad
        </h2>
        <p className="mt-3 text-muted-foreground">
          Educoland es gratis para familias, centros y profesionales. Cada perfil con su espacio.
        </p>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:gap-6">
        <Door
          id="familias"
          featured
          icon={<Heart className="h-6 w-6" />}
          eyebrow="Soy familia"
          title="Encuentra tu centro"
          desc="Busca por zona, compara y lee opiniones reales antes de visitar."
          bullets={["Filtros por edad, horario y proyecto", "Opiniones verificadas de familias", "Pide visita en un clic"]}
          cta="Buscar guardería"
        />
        <Door
          id="centros-pro"
          icon={<Building2 className="h-6 w-6" />}
          eyebrow="Soy un centro"
          title="Gestiona tu ficha"
          desc="Mantén tus datos al día, responde a familias y suma reseñas."
          bullets={["Ficha verificada y SEO local", "Mensajes con familias interesadas", "Panel de estadísticas mensuales"]}
          cta="Reclamar mi ficha"
        />
        <Door
          id="empleo"
          icon={<Briefcase className="h-6 w-6" />}
          eyebrow="Soy profesional"
          title="Encuentra empleo"
          desc="Ofertas en escuelas infantiles cerca de ti. Sin intermediarios."
          bullets={["Alertas por provincia y jornada", "Perfil profesional y CV", "Contacto directo con centros"]}
          cta="Ver ofertas"
        />
      </div>
    </section>
  );
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
      {score.toFixed(1)}
    </div>
  );
}

function FeaturedCenters() {
  return (
    <section id="centros" className="bg-muted/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-coral">Centros destacados</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Espacios donde crecer con calma
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Una selección con ficha verificada y mejores valoraciones de las familias.
            </p>
          </div>
          <a href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Ver todos los centros
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featuredCenters.map((c) => (
            <a
              key={c.name + c.city}
              href="#"
              className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative">
                <img
                  src={c.image}
                  alt={`Imagen de ${c.name} en ${c.city}`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  {c.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold text-primary shadow-soft">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      Verificada
                    </span>
                  )}
                </div>
                <div className="absolute right-3 top-3">
                  <ScoreBadge score={c.score} />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="min-w-0">
                  <h3 className="truncate font-display text-lg font-semibold text-ink">{c.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{c.type}</p>
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
                  <span className="inline-flex min-w-0 items-center gap-1.5 text-sm text-foreground/80">
                    <MapPin className="h-4 w-4 shrink-0 text-coral" aria-hidden="true" />
                    <span className="truncate">{c.city}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-star text-star" aria-hidden="true" />
                    <span className="font-semibold text-foreground">{(c.score / 2).toFixed(1)}</span>
                    <span className="text-muted-foreground">({c.reviews})</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} aria-hidden="true" className={`h-4 w-4 ${i < n ? "fill-star text-star" : "text-muted-foreground/40"}`} />
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-coral">Comunidad</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Lo que dicen las familias
        </h2>
        <p className="mt-3 text-muted-foreground">
          994 valoraciones reales en toda España. Sin filtros ni anuncios disfrazados.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
        {testimonials.map((t) => (
          <figure key={t.name} className="flex flex-col rounded-2xl bg-card p-6 shadow-soft ring-1 ring-border">
            <Stars n={t.stars} />
            <blockquote className="mt-4 flex-1 font-display text-lg leading-snug text-ink">
              <span className="text-coral">“</span>
              {t.quote}
              <span className="text-coral">”</span>
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <img src={t.avatar} alt="" loading="lazy" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-card" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
                <p className="truncate text-xs text-muted-foreground">{t.where}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function PronensBand() {
  return (
    <section aria-labelledby="pronens-title" className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-teal-deep text-cream shadow-lift">
        <div className="grid items-center gap-0 md:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-coral">Recomendado · Pronens</p>
            <h2 id="pronens-title" className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Equípalo con material y textil escolar en Pronens
            </h2>
            <p className="mt-3 max-w-md text-cream/85">
              Babis, mochilas, sábanas de cuna y todo el material para que el inicio en la
              guardería sea más fácil. Hecho en España, con cariño.
            </p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-coral px-5 py-3 text-sm font-semibold text-coral-foreground shadow-soft transition-transform hover:-translate-y-0.5">
              Ir a Pronens
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="relative h-64 md:h-full md:min-h-[22rem]">
            <img
              src={pronensSupplies}
              alt="Material escolar en colores coral y turquesa: babis, mochila, libreta y lápices"
              loading="lazy"
              width={1280}
              height={800}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Directorio independiente de escuelas infantiles y guarderías en España. Gratis para
              familias, centros y profesionales.
            </p>
          </div>
          <FooterCol title="Familias" links={["Buscar centros", "Cómo elegir guardería", "Ayudas y becas", "Opiniones"]} />
          <FooterCol title="Centros y profesionales" links={["Reclamar ficha", "Panel del centro", "Bolsa de empleo", "Recursos"]} />
          <FooterCol title="Educoland" links={["Sobre nosotros", "Blog", "Contacto", "Pronens · material escolar"]} />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Educoland · Hecho con cariño en España</p>
          <ul className="flex flex-wrap gap-4">
            <li><a href="#" className="hover:text-foreground">Aviso legal</a></li>
            <li><a href="#" className="hover:text-foreground">Privacidad (RGPD)</a></li>
            <li><a href="#" className="hover:text-foreground">Cookies</a></li>
            <li><a href="#" className="hover:text-foreground">Pronens</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
