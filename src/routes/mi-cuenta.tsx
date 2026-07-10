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
