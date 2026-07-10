import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Mail,
  Calendar,
  Pencil,
  LogOut,
  Building2,
  GraduationCap,
  Users,
  ArrowRight,
  BellRing,
  Heart,
  Star,
  MapPin,
  Sparkles,
  Check,
} from "lucide-react";
import educolandLogo from "@/assets/educoland-logo-v2.png.asset.json";

export const Route = createFileRoute("/mi-cuenta")({
  head: () => ({
    meta: [
      { title: "Mi cuenta · Educoland" },
      {
        name: "description",
        content:
          "Gestiona tu perfil en Educoland: elige si eres escuela, profesional o familia y personaliza tu experiencia.",
      },
    ],
  }),
  component: MiCuentaPage,
});

/* -------------------------------------------------------------------------- */
/* Mock user                                                                   */
/* -------------------------------------------------------------------------- */
const mockUser = {
  name: "Rayani",
  email: "rayani.estrada@gmail.com",
  memberSince: "3 jun 2026",
  active: true,
};

type Role = "escuela" | "profesional" | "familia";

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */
function MiCuentaPage() {
  const [role, setRole] = useState<Role | null>(null);

  return (
    <div className="min-h-screen bg-background text-ink">
      <Header />

      <main>
        {role === "familia" ? (
          <FamilyPanel name={mockUser.name} onReset={() => setRole(null)} />
        ) : role === "profesional" ? (
          <ProPanel name={mockUser.name} onReset={() => setRole(null)} />
        ) : (
          <>
            <HeroWelcome name={mockUser.name} role={role} />
            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10">
                <AccountCard user={mockUser} role={role} onReset={() => setRole(null)} />
                <div className="min-w-0">
                  {role ? (
                    <RoleDashboard role={role} />
                  ) : (
                    <RoleChooser onPick={setRole} />
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}


/* -------------------------------------------------------------------------- */
/* Header (mismo lenguaje que index/empleo)                                    */
/* -------------------------------------------------------------------------- */
function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="inline-flex items-center" aria-label="Educoland, inicio">
          <img src={educolandLogo.url} alt="Educoland" className="h-9 w-auto sm:h-10" />
        </a>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Principal">
          <a
            href="/#centros"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground md:inline-block"
          >
            Buscar centros
          </a>
          <Link
            to="/empleo"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground md:inline-block"
          >
            Empleo
          </Link>
          <span className="ml-1 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-soft">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-foreground/20 text-xs font-bold">
              R
            </span>
            <span className="hidden sm:inline">Rayani</span>
          </span>
        </nav>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero de bienvenida                                                          */
/* -------------------------------------------------------------------------- */
function HeroWelcome({ name, role }: { name: string; role: Role | null }) {
  const subtitle = role
    ? roleCopy[role].dashSubtitle
    : "Cuéntanos quién eres para personalizar Educoland.";

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-background to-background" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-coral/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Mi cuenta
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Hola, {name} <span className="inline-block">👋</span>
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Tarjeta lateral de cuenta                                                   */
/* -------------------------------------------------------------------------- */
function AccountCard({
  user,
  role,
  onReset,
}: {
  user: typeof mockUser;
  role: Role | null;
  onReset: () => void;
}) {
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        {/* Cabecera con avatar de inicial */}
        <div className="relative bg-gradient-to-br from-primary/90 to-primary px-6 pb-14 pt-6 text-primary-foreground">
          <p className="text-xs font-medium uppercase tracking-wider opacity-80">Mi cuenta</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">{user.name}</h2>
          <div className="absolute -bottom-8 left-6 grid h-16 w-16 place-items-center rounded-2xl border-4 border-card bg-coral text-2xl font-bold text-white shadow-lift">
            {initial}
          </div>
        </div>

        <div className="space-y-4 px-6 pb-6 pt-12 text-sm">
          <Field icon={<Mail className="h-4 w-4" />} label="Correo" value={user.email} />
          <Field icon={<Calendar className="h-4 w-4" />} label="Miembro desde" value={user.memberSince} />
          <Field
            icon={<ShieldCheck className="h-4 w-4" />}
            label="Estado"
            value={
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Activa
              </span>
            }
          />
          <Field
            icon={<Users className="h-4 w-4" />}
            label="Tipo de usuario"
            value={
              role ? (
                <span className="font-medium text-ink">{roleCopy[role].shortLabel}</span>
              ) : (
                <span className="italic text-muted-foreground">sin definir</span>
              )
            }
          />

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button className="inline-flex items-center justify-center gap-1.5 rounded-full bg-coral px-3 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
              <Pencil className="h-3.5 w-3.5" />
              Editar
            </button>
            <button className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted">
              <LogOut className="h-3.5 w-3.5" />
              Salir
            </button>
          </div>

          {role && (
            <button
              onClick={onReset}
              className="mt-1 w-full rounded-full border border-dashed border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted"
            >
              Cambiar tipo de usuario
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

function Field({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-primary">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <div className="mt-0.5 truncate text-sm text-ink">{value}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Selector de rol                                                             */
/* -------------------------------------------------------------------------- */
const roleCopy: Record<
  Role,
  {
    icon: React.ReactNode;
    tint: string;
    ring: string;
    accent: string;
    title: string;
    shortLabel: string;
    tag: string;
    pitch: string;
    bullets: string[];
    cta: string;
    dashSubtitle: string;
  }
> = {
  escuela: {
    icon: <Building2 className="h-6 w-6" />,
    tint: "bg-primary/10",
    ring: "ring-primary/30",
    accent: "text-primary",
    title: "Soy una escuela infantil",
    shortLabel: "Escuela infantil",
    tag: "Gestión de centro",
    pitch: "Publica ofertas, cubre suplencias urgentes y aparece ante familias de tu zona.",
    bullets: [
      "Ficha verificada y editable",
      "Bolsa de empleo integrada",
      "Reseñas moderadas de familias",
    ],
    cta: "Registrar mi centro",
    dashSubtitle: "Este es el panel de tu centro: ofertas, candidatas y reseñas en un vistazo.",
  },
  profesional: {
    icon: <GraduationCap className="h-6 w-6" />,
    tint: "bg-coral/10",
    ring: "ring-coral/30",
    accent: "text-coral",
    title: "Busco trabajo en escuelas",
    shortLabel: "Perfil laboral",
    tag: "Empleo",
    pitch: "Recibe suplencias urgentes y ofertas cerca de ti, sin buscar cada día.",
    bullets: [
      "Alertas por email al instante",
      "Solo escuelas verificadas",
      "Desactiva las alertas en un clic",
    ],
    cta: "Crear perfil laboral",
    dashSubtitle: "Estas son tus alertas activas y las ofertas nuevas de tu zona.",
  },
  familia: {
    icon: <Heart className="h-6 w-6" />,
    tint: "bg-emerald-500/10",
    ring: "ring-emerald-500/30",
    accent: "text-emerald-700",
    title: "Soy familia",
    shortLabel: "Familia",
    tag: "Comunidad",
    pitch: "Guarda tus centros favoritos, compara y deja reseñas honestas para otras familias.",
    bullets: [
      "Guarda hasta 20 centros",
      "Compara horarios y precios",
      "Deja reseñas verificadas",
    ],
    cta: "Unirme como familia",
    dashSubtitle: "Aquí tienes los centros que sigues y tus reseñas publicadas.",
  },
};

function RoleChooser({ onPick }: { onPick: (r: Role) => void }) {
  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            ¿Cómo vas a usar Educoland?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Elige un rol para personalizar tu experiencia. Podrás cambiarlo cuando quieras.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
        {(Object.keys(roleCopy) as Role[]).map((r) => {
          const c = roleCopy[r];
          return (
            <button
              key={r}
              onClick={() => onPick(r)}
              className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 text-left shadow-soft ring-1 ring-transparent transition-all hover:-translate-y-1 hover:shadow-lift hover:${c.ring}`}
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${c.tint} ${c.accent}`}>
                {c.icon}
              </div>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {c.tag}
              </span>
              <h3 className="mt-1 font-display text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.pitch}</p>

              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${c.accent}`} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <span
                className={`mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform group-hover:translate-x-0.5`}
              >
                {c.cta}
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Educoland es gratis. Tus datos no se comparten sin tu permiso.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Dashboard según rol (mock)                                                  */
/* -------------------------------------------------------------------------- */
function RoleDashboard({ role }: { role: Role }) {
  const c = roleCopy[role];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.tint} ${c.accent}`}>
          {c.icon}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {c.tag}
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">{c.title}</h2>
        </div>
      </div>

      {role === "escuela" && <SchoolDashboard />}
      {role === "profesional" && <ProDashboard />}
      {role === "familia" && <FamilyDashboard />}
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-muted text-primary">
          {icon}
        </span>
      </div>
      <p className="mt-2 font-display text-3xl font-semibold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function SchoolDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Ofertas activas" value="2" hint="1 urgente" icon={<BellRing className="h-4 w-4" />} />
        <StatCard label="Candidatas nuevas" value="7" hint="esta semana" icon={<Users className="h-4 w-4" />} />
        <StatCard label="Valoración" value="9,4" hint="128 reseñas" icon={<Star className="h-4 w-4" />} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-display text-lg font-semibold text-ink">Tus ofertas</h3>
        <ul className="mt-4 divide-y divide-border">
          {[
            { title: "Educadora aula 1-2 · suplencia 2 semanas", urgent: true },
            { title: "Auxiliar de cocina · media jornada", urgent: false },
          ].map((o) => (
            <li key={o.title} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{o.title}</p>
                <p className="text-xs text-muted-foreground">Publicada hace 2 días</p>
              </div>
              {o.urgent && (
                <span className="rounded-full bg-coral/15 px-2 py-0.5 text-xs font-semibold text-coral">
                  Urgente
                </span>
              )}
            </li>
          ))}
        </ul>
        <button className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Publicar nueva oferta <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

function ProDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Alertas activas" value="3" hint="Madrid centro + 2" icon={<BellRing className="h-4 w-4" />} />
        <StatCard label="Ofertas nuevas" value="12" hint="últimos 7 días" icon={<Sparkles className="h-4 w-4" />} />
        <StatCard label="Perfil completo" value="85%" hint="añade tu CV" icon={<GraduationCap className="h-4 w-4" />} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-display text-lg font-semibold text-ink">Ofertas para ti</h3>
        <ul className="mt-4 space-y-3">
          {[
            { title: "Educadora aula 2-3 · jornada completa", where: "Chamberí, Madrid" },
            { title: "Suplencia urgente · 1 semana", where: "Gràcia, Barcelona" },
          ].map((o) => (
            <li key={o.title} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{o.title}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {o.where}
                </p>
              </div>
              <button className="shrink-0 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white">
                Ver
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function FamilyDashboard() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Centros guardados" value="5" icon={<Heart className="h-4 w-4" />} />
        <StatCard label="Reseñas publicadas" value="2" icon={<Star className="h-4 w-4" />} />
        <StatCard label="Visitas concertadas" value="1" hint="jueves 10:00" icon={<Calendar className="h-4 w-4" />} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-display text-lg font-semibold text-ink">Tus favoritos</h3>
        <ul className="mt-4 space-y-3">
          {[
            { name: "E.I. El Jardín", city: "Madrid, Chamberí", score: 9.4 },
            { name: "Guardería Els Petits", city: "Barcelona, Gràcia", score: 9.2 },
          ].map((c) => (
            <li key={c.name} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{c.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {c.city}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                <Star className="h-3 w-3 fill-primary" /> {c.score}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Panel de Familia (editorial grid — hero navy + tarjetas)                    */
/* -------------------------------------------------------------------------- */
function FamilyPanel({ name, onReset }: { name: string; onReset: () => void }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
            Panel de familia
          </p>
          <h1 className="mt-2 font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl">
            Hola, {name}
          </h1>
          <p className="mt-2 italic text-muted-foreground">
            Tu rincón personal en Educoland
          </p>
        </div>
        <button
          onClick={onReset}
          className="rounded-full border border-dashed border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          Cambiar tipo de usuario
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* PRIMARY: Buscar centros */}
        <article className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-ink p-8 text-white md:col-span-2 md:p-12">
          <div className="relative z-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-coral">
              Acción principal
            </p>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Busca tu centro educativo
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
              Explora miles de centros, compara y contacta con los que mejor encajen con tu familia.
            </p>
          </div>
          <div className="relative z-10 mt-10">
            <a
              href="/centros"
              className="inline-flex items-center gap-3 rounded-full bg-coral px-7 py-3.5 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              Explorar centros ahora
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-coral/10 blur-3xl transition-colors group-hover:bg-coral/20"
          />
        </article>

        {/* Mis solicitudes */}
        <article className="flex flex-col justify-between rounded-[2rem] border border-border bg-card p-8 shadow-soft transition-shadow hover:shadow-lift">
          <div>
            <h3 className="font-display text-2xl text-ink">Mis solicitudes</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Aún no has enviado solicitudes. Busca un centro y pulsa{" "}
              <span className="font-semibold text-ink">
                «Solicitar plaza o información»
              </span>{" "}
              en su ficha.
            </p>
          </div>
          <a
            href="#"
            className="mt-8 self-start text-sm font-bold text-ink underline decoration-coral decoration-2 underline-offset-4 transition-colors hover:text-coral"
          >
            Ver mi actividad
          </a>
        </article>

        {/* Cuenta y acceso */}
        <UtilityCard
          title="Cuenta y acceso"
          desc="Gestiona tu email, contraseña y los datos de acceso a tu perfil de familia."
          cta="Gestionar cuenta"
          variant="outline"
        />

        {/* Mis preguntas */}
        <article className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift">
          <div>
            <div className="mb-3 flex items-start justify-between gap-2">
              <h3 className="font-display text-xl text-ink transition-colors group-hover:text-coral">
                Mis preguntas
              </h3>
              <span className="rounded-full bg-coral/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
                Consultorio
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              ¿Dudas sobre adaptación o precios? Envía tu pregunta a la comunidad.
            </p>
          </div>
          <button className="mt-6 w-full rounded-xl border border-transparent bg-muted py-3 text-sm font-bold text-ink transition-colors hover:border-border hover:bg-muted/70">
            Nueva pregunta
          </button>
        </article>

        {/* Guardados */}
        <UtilityCard
          title="Guardados"
          desc="Accede a tus centros guardados, comparador y avisos de plazas disponibles."
          cta="Ver favoritos"
          variant="muted"
        />

        {/* Pronens highlight */}
        <article className="mt-2 flex flex-col items-start justify-between gap-8 rounded-[2rem] border-2 border-dashed border-coral/40 bg-coral/5 p-8 md:col-span-3 md:flex-row md:items-center">
          <div className="max-w-md">
            <div className="mb-3 inline-flex items-center gap-3">
              <span className="rounded bg-coral px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-ink">
                Oferta
              </span>
              <h3 className="font-display text-2xl text-ink">Tu descuento en Pronens</h3>
            </div>
            <p className="leading-relaxed text-foreground/80">
              Ahorra un <span className="font-bold text-coral">10% extra</span> en material
              escolar y uniformes por ser miembro de la familia Educoland.
            </p>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center md:w-auto">
            <div className="rounded-2xl border border-coral/30 bg-card px-8 py-4 text-center font-mono text-2xl tracking-[0.2em] text-ink shadow-inner">
              EDUCOSUM07
            </div>
            <button className="whitespace-nowrap rounded-2xl bg-ink px-8 py-4 font-bold text-white transition-colors hover:bg-ink/90">
              Ir a la tienda
            </button>
          </div>
        </article>

        {/* Promo banner */}
        <article className="relative mt-2 h-72 overflow-hidden rounded-[2.5rem] md:col-span-3 md:h-80">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-primary/60"
          />
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-96 w-96 rounded-full bg-coral/20 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 hidden w-1/2 opacity-40 md:block"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)",
            }}
          />
          <div className="relative flex h-full flex-col justify-center p-8 md:p-14">
            <span className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-coral">
              Campaña escolar 2026
            </span>
            <h2 className="max-w-xl font-display text-3xl leading-[1.1] text-white sm:text-4xl md:text-5xl">
              Todo listo para la vuelta al cole con Pronens
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 font-mono text-lg text-white backdrop-blur-md">
                EDUCOFAM10
              </div>
              <button className="rounded-full bg-coral px-8 py-3 font-bold text-ink shadow-xl transition-transform hover:-translate-y-0.5">
                Ver catálogo completo
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function UtilityCard({
  title,
  desc,
  cta,
  variant,
}: {
  title: string;
  desc: string;
  cta: string;
  variant: "outline" | "muted";
}) {
  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift">
      <div>
        <h3 className="mb-3 font-display text-xl text-ink transition-colors group-hover:text-coral">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
      <button
        className={
          variant === "outline"
            ? "mt-6 w-full rounded-xl border border-ink py-3 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-white"
            : "mt-6 w-full rounded-xl border border-transparent bg-muted py-3 text-sm font-bold text-ink transition-colors hover:border-border hover:bg-muted/70"
        }
      >
        {cta}
      </button>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer simple                                                               */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Educoland</p>
          <nav className="flex flex-wrap gap-4">
            <a href="/" className="hover:text-ink">Inicio</a>
            <Link to="/empleo" className="hover:text-ink">Empleo</Link>
            <a href="#" className="hover:text-ink">Condiciones</a>
            <a href="#" className="hover:text-ink">Contacto</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Panel del Profesional (job board editorial)                                 */
/* -------------------------------------------------------------------------- */
function ProPanel({ name, onReset }: { name: string; onReset: () => void }) {
  const completedSteps = [
    "Escribe tu carta de presentación",
    "Indica tu provincia",
    "¿Dónde quieres trabajar?",
    "Añade tu titulación",
  ];
  const pendingSteps: { label: string; points: number }[] = [
    { label: "Añade tu experiencia", points: 25 },
    { label: "Indica tus especialidades", points: 15 },
    { label: "Sube tu fotografía", points: 15 },
    { label: "Añade tu formación", points: 10 },
    { label: "Añade tu teléfono", points: 5 },
  ];

  const progress = 30;
  const circumference = 2 * Math.PI * 58;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Header */}
      <header className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
            Hola, {name}
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink md:text-5xl">
            Mi perfil profesional
          </h1>
          <p className="mt-2 text-lg text-ink/70">
            Gestiona tu carrera y presencia en la comunidad educativa.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer rounded-full border border-ink/80 px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:bg-ink hover:text-white"
          >
            Cambiar de rol
          </button>
          <Link
            to="/centros"
            className="rounded-full border border-ink/80 px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:bg-ink hover:text-white"
          >
            Buscar centros
          </Link>
          <button
            type="button"
            className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Editar mi perfil
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Sidebar izquierdo */}
        <aside className="space-y-6 lg:col-span-4">
          {/* Completitud */}
          <div className="flex flex-col items-center rounded-3xl border border-ink/5 bg-card p-8 text-center shadow-sm">
            <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="58" stroke="hsl(var(--muted))" strokeWidth="8" fill="transparent" />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="var(--coral)"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{ stroke: "oklch(0.78 0.13 80)" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-ink">{progress}%</span>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-medium text-ink">Perfil empezando</h3>
            <p className="mb-6 text-sm text-ink/60">
              Con 5 pasos más, destacarás mucho más ante los centros reclutadores.
            </p>
            <button
              type="button"
              className="font-bold text-ink underline decoration-coral decoration-2 underline-offset-4 transition-colors hover:text-coral"
            >
              Ver mi perfil como público
            </button>
          </div>

          {/* Reputación */}
          <div className="rounded-3xl bg-ink p-8 text-white shadow-lg">
            <div className="mb-6 flex items-start justify-between gap-3">
              <h3 className="font-display text-2xl leading-none">Tu reputación</h3>
              <span className="rounded bg-coral px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
                Comunidad
              </span>
            </div>
            <div className="mb-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-coral">0</div>
                <div className="text-[10px] uppercase tracking-wider opacity-60">Puntos</div>
              </div>
              <div className="border-x border-white/10 text-center">
                <div className="text-2xl font-bold text-coral">0</div>
                <div className="text-[10px] uppercase tracking-wider opacity-60">Útil</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-coral">0</div>
                <div className="text-[10px] uppercase tracking-wider opacity-60">Mejores</div>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-xl border border-white/20 bg-white/10 py-3 text-sm font-medium transition-all hover:bg-white/20"
            >
              Ir al consultorio
            </button>
          </div>

          {/* Próximamente */}
          <div className="rounded-3xl border-2 border-dashed border-ink/10 bg-white/50 p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-ink">
                Próximamente
              </span>
            </div>
            <p className="text-sm text-ink/70">
              Alertas de empleo geolocalizadas cerca de tu zona actual.
            </p>
          </div>

          {/* Cuenta y acceso */}
          <div className="rounded-3xl border border-ink/5 bg-card p-6 shadow-sm">
            <h3 className="mb-3 font-display text-lg text-ink">Cuenta y acceso</h3>
            <ul className="space-y-2 text-sm text-ink/70">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> {mockUser.email}
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" /> Miembro desde {mockUser.memberSince}
              </li>
            </ul>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-opacity hover:opacity-70"
            >
              <Pencil className="h-3.5 w-3.5" /> Editar datos
            </button>
          </div>
        </aside>

        {/* Columna principal */}
        <div className="space-y-8 lg:col-span-8">
          {/* Aviso */}
          <div className="flex items-start gap-4 rounded-r-2xl border-l-4 border-coral bg-coral/10 p-6">
            <div className="rounded-lg bg-coral p-2 text-ink">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-ink">Hemos renovado los perfiles</h4>
              <p className="mt-1 text-sm text-ink/80">
                Tu experiencia ahora se muestra de forma estructurada, no como un PDF.
                Añadir tus datos solo te tomará 2 minutos.
              </p>
              <button
                type="button"
                className="mt-3 text-sm font-bold text-ink underline decoration-coral decoration-2 underline-offset-4"
              >
                Añadir mi experiencia ahora
              </button>
            </div>
          </div>

          {/* Pasos */}
          <div className="rounded-3xl border border-ink/5 bg-card p-8 shadow-sm">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl text-ink">Pasos para completar</h3>
              <span className="text-xs font-bold uppercase tracking-widest text-ink/40">
                Progreso {progress}/100
              </span>
            </div>

            <div className="grid gap-x-12 gap-y-4 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">
                  Completado
                </p>
                {completedSteps.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-3 text-ink/40 line-through"
                  >
                    <Check className="h-5 w-5 shrink-0 text-coral" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">
                  Pendiente
                </p>
                {pendingSteps.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="group flex w-full items-center justify-between gap-3 text-left"
                  >
                    <div className="flex min-w-0 items-center gap-3 text-ink">
                      <div className="h-5 w-5 shrink-0 rounded-full border-2 border-coral" />
                      <span className="truncate font-medium transition-colors group-hover:text-coral">
                        {s.label}
                      </span>
                    </div>
                    <span className="shrink-0 rounded-full bg-coral/10 px-2 py-0.5 text-[10px] font-bold text-ink">
                      +{s.points} pts
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Candidaturas */}
          <div className="relative overflow-hidden rounded-3xl border border-ink/5 bg-card p-8 shadow-sm">
            <div className="mb-8 flex items-center justify-between gap-3">
              <h3 className="font-display text-2xl text-ink">Mis candidaturas</h3>
              <Link
                to="/empleo"
                className="group inline-flex items-center gap-1 text-sm font-bold text-ink"
              >
                Bolsa de empleo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center py-8 text-center opacity-60">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background">
                <Building2 className="h-8 w-8 text-ink" />
              </div>
              <p className="text-lg font-medium text-ink">
                Aún no te has inscrito en ninguna oferta.
              </p>
              <p className="text-sm text-ink/70">
                Empieza a buscar centros educativos hoy mismo.
              </p>
            </div>
          </div>

          {/* Mis respuestas */}
          <div className="rounded-3xl border border-ink/5 bg-card p-8 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-display text-2xl text-ink">Mis respuestas</h3>
              <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                Preguntas sin responder
              </span>
            </div>
            <p className="text-sm text-ink/70">
              Aún no has respondido ninguna pregunta. Comparte tu experiencia con las
              familias del consultorio y suma reputación ante los centros.
            </p>
          </div>

          {/* Pronens */}
          <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl bg-ink p-10 text-white md:flex-row">
            <div className="relative z-10 flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-coral">
                Beneficio Exclusivo
              </span>
              <h3 className="mb-4 mt-2 font-display text-3xl">Convenio Pronens</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/70">
                Material escolar y uniformes a mejor precio para los miembros de la
                comunidad Educoland.
              </p>
              <div className="inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-white/50">
                    Código de descuento
                  </p>
                  <p className="font-mono text-xl text-coral">EDUCOPROF07</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== "undefined") {
                      navigator.clipboard?.writeText("EDUCOPROF07");
                    }
                  }}
                  className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-coral"
                >
                  Copiar
                </button>
              </div>
            </div>
            <div className="relative z-10 shrink-0">
              <button
                type="button"
                className="rounded-full bg-coral px-8 py-4 text-lg font-bold text-ink shadow-xl transition-transform hover:scale-105"
              >
                Ir a la tienda
              </button>
            </div>
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-coral/5" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white/5" />
          </div>

          {/* Logout */}
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
            >
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
