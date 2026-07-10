import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, School, Users } from "lucide-react";
import educolandLogo from "@/assets/educoland-logo-v2.png.asset.json";
import quienesHero from "@/assets/quienes-hero.jpg";
import quienesHands from "@/assets/quienes-hands.jpg";

export const Route = createFileRoute("/quienes-somos")({
  head: () => ({
    meta: [
      { title: "Quiénes somos · Educoland, directorio hecho para las familias" },
      {
        name: "description",
        content:
          "Educoland es un directorio independiente y gratuito de más de 41.000 centros educativos en España. Sin publicidad, sin cuotas para familias ni centros.",
      },
      { property: "og:title", content: "Quiénes somos · Educoland" },
      {
        property: "og:description",
        content:
          "Un directorio independiente y gratuito de centros educativos en España. Sin publicidad, sin cuotas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuienesSomosPage,
});

function QuienesSomosPage() {
  return (
    <div className="min-h-screen bg-cream text-ink font-body selection:bg-coral/30">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-20 md:py-24 space-y-28 md:space-y-36">
        {/* Hero */}
        <section className="text-center space-y-10">
          <div className="space-y-6">
            <span className="block uppercase tracking-[0.25em] text-[11px] font-bold text-coral">
              Quiénes somos
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.95] tracking-tight text-balance">
              Un directorio hecho
              <br className="hidden md:block" /> para las familias
            </h1>
          </div>
          <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-ink/75">
            Educoland nació como un directorio de escuelas infantiles y guarderías, y hoy cubre
            toda la enseñanza no universitaria: más de 41.000 centros educativos en toda España,
            desde el primer ciclo de infantil hasta bachillerato y FP.
          </p>
          <div className="pt-4">
            <div className="w-full aspect-[21/9] overflow-hidden rounded-sm border border-ink/10 shadow-2xl shadow-ink/10">
              <img
                src={quienesHero}
                alt="Familia leyendo junta en casa"
                width={1600}
                height={686}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-b border-ink/15 py-10">
          {[
            { n: "41.753", label: "Centros educativos" },
            { n: "52", label: "Provincias cubiertas" },
            { n: "0 €", label: "Coste para familias" },
          ].map((s) => (
            <div key={s.label} className="text-center group">
              <div className="font-display text-6xl md:text-7xl text-coral leading-none transition-transform duration-500 group-hover:scale-105">
                {s.n}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.2em] font-bold text-ink/70">
                {s.label}
              </div>
            </div>
          ))}
        </section>

        {/* Independence */}
        <section className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="block uppercase tracking-[0.25em] text-[11px] font-bold text-coral">
                Independientes y gratuitos
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-balance">
                Somos un proyecto independiente
              </h2>
            </div>
            <ul className="space-y-6">
              {[
                "cobramos a las familias por usar el servicio.",
                "cobramos a los centros por aparecer.",
                "mostramos publicidad intrusiva.",
              ].map((text) => (
                <li key={text} className="flex items-center gap-6">
                  <span className="font-display text-3xl text-coral w-12 shrink-0">No</span>
                  <p className="text-lg md:text-xl flex-1 border-b border-ink/10 pb-2">{text}</p>
                </li>
              ))}
            </ul>
            <div className="bg-ink/5 p-8 border-l-4 border-coral rounded-r-sm">
              <p className="text-sm italic leading-relaxed text-ink/85">
                Nos sostenemos gracias a la colaboración de{" "}
                <span className="font-bold not-italic text-ink">Pronens</span>, partner que
                comparte nuestros valores y ofrece beneficios exclusivos en material escolar a
                nuestra comunidad.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-xl shadow-ink/10 bg-ink/5">
              <img
                src={quienesHands}
                alt="Dos manos intercambiando un corazón, símbolo de confianza"
                width={900}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-coral" />
          </div>
        </section>

        {/* Beliefs */}
        <section className="space-y-16">
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <span className="block uppercase tracking-[0.25em] text-[11px] font-bold text-coral">
              En qué creemos
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
              Elegir centro es una de las decisiones más importantes de una familia
            </h2>
            <p className="text-ink/70 leading-relaxed">
              Y merece información clara y sin ruido. Por eso Educoland es tres cosas a la vez:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                Icon: HeartHandshake,
                title: "Para las familias",
                body: "Fichas elaboradas a partir de datos oficiales y completadas por los propios centros, con opiniones verificadas de otras familias y un consultorio donde preguntar sin compromiso.",
              },
              {
                Icon: School,
                title: "Para los centros",
                body: "Un escaparate honesto: cada centro puede reclamar su ficha gratis, mantenerla al día y recibir solicitudes de contacto verificadas.",
              },
              {
                Icon: Users,
                title: "Para los profesionales",
                body: "Una bolsa de empleo que respeta sus datos: el perfil solo llega a un centro cuando la persona decide inscribirse.",
              },
            ].map(({ Icon, title, body }) => (
              <article
                key={title}
                className="group bg-white p-10 flex flex-col gap-6 border border-ink/5 hover:border-coral/40 transition-colors shadow-[0_10px_40px_-15px_rgba(15,30,61,0.08)]"
              >
                <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center text-coral group-hover:bg-coral group-hover:text-ink transition-colors">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <div className="space-y-3">
                  <h3 className="font-display text-2xl">{title}</h3>
                  <p className="text-sm leading-relaxed text-ink/70">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Who's behind */}
        <section className="relative overflow-hidden bg-ink text-cream p-12 md:p-20 lg:p-24 rounded-sm">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 relative z-10">
            <div className="space-y-6">
              <span className="block uppercase tracking-[0.25em] text-[11px] font-bold text-coral">
                Quién está detrás
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-balance">
                Un equipo pequeño, un proyecto de largo recorrido
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-lg md:text-xl leading-relaxed text-cream/75 font-light">
                Detrás de Educoland hay personas reales trabajando desde España para que el
                directorio esté siempre al día: datos oficiales contrastados, fichas revisadas y
                una comunidad cuidada a mano. Cuidamos cada dato con el cariño de quien sabe que
                allí irán sus propios hijos.
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-coral/20 rounded-full blur-[120px]" />
          <div className="pointer-events-none absolute -top-12 -left-12 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
        </section>

        {/* CTA */}
        <section className="bg-coral py-20 px-8 md:px-16 text-center space-y-10 rounded-sm shadow-2xl shadow-coral/20">
          <div className="space-y-4">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-ink leading-none">
              ¿Hablamos?
            </h2>
            <p className="text-lg md:text-xl italic text-ink/85 max-w-xl mx-auto">
              Si eres una familia, un centro o un profesional y tienes cualquier duda,
              cuéntanosla.
            </p>
          </div>
          <div className="pt-2">
            <a
              href="mailto:hola@educoland.es"
              className="inline-flex items-center gap-3 bg-ink text-white px-12 py-5 text-xs uppercase tracking-[0.3em] font-bold hover:-translate-y-1 transition-transform shadow-2xl"
            >
              Escríbenos <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ---------------- Header / Footer ---------------- */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center" aria-label="Educoland, inicio">
          <img src={educolandLogo.url} alt="Educoland" className="h-9 w-auto sm:h-10" />
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/centros"
            search={{}}
            className="rounded-full px-3 py-2 font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
          >
            Buscar centros
          </Link>
          <Link
            to="/quienes-somos"
            className="rounded-full px-3 py-2 font-semibold text-primary"
          >
            Quiénes somos
          </Link>
          <Link
            to="/mi-cuenta"
            className="rounded-full border border-border bg-card px-3 py-2 font-semibold text-foreground hover:bg-muted"
          >
            Mi panel
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <img src={educolandLogo.url} alt="Educoland" className="h-8 w-auto" />
          <p className="mt-3 text-xs text-muted-foreground">
            Directorio independiente de centros educativos en España.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-ink">Familias</h4>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <li><Link to="/centros" search={{}} className="hover:text-primary">Buscar centros</Link></li>
            <li><a href="#" className="hover:text-primary">Ayudas y becas</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-ink">Centros y profesionales</h4>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Reclamar ficha</a></li>
            <li><Link to="/empleo" className="hover:text-primary">Bolsa de empleo</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-ink">Educoland</h4>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <li><Link to="/quienes-somos" className="hover:text-primary">Quiénes somos</Link></li>
            <li><a href="mailto:hola@educoland.es" className="hover:text-primary">Contacto</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Educoland · Hecho con cariño en España
        </p>
      </div>
    </footer>
  );
}
