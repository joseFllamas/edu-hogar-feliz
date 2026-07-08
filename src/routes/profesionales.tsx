import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/profesionales")({
  head: () => ({
    meta: [
      { title: "Profesionales · Educoland" },
      {
        name: "description",
        content:
          "Directorio de profesionales de educación infantil disponibles para suplencias y contrataciones en España.",
      },
    ],
  }),
  component: ProfesionalesPage,
});

type Availability = "now" | "soon" | "unconfirmed";

type Professional = {
  id: string;
  initials: string;
  displayName: string;
  degree: string;
  province: string;
  years: number;
  specialties: string[];
  availability: Availability;
  availableFrom?: string;
  drives: boolean;
  photo: string;
  savedOffers?: number;
};

const MOCK: Professional[] = [
  {
    id: "1",
    initials: "L. M.",
    displayName: "Laura M.",
    degree: "Técnica Superior en Educación Infantil",
    province: "Barcelona",
    years: 6,
    specialties: ["0-1 año", "Waldorf"],
    availability: "now",
    drives: true,
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop",
    savedOffers: 3,
  },
  {
    id: "2",
    initials: "C. R.",
    displayName: "Carla R.",
    degree: "Grado en Magisterio Infantil",
    province: "Madrid",
    years: 3,
    specialties: ["Bilingüe EN", "1-2 años"],
    availability: "soon",
    availableFrom: "15 sep",
    drives: false,
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    initials: "M. G.",
    displayName: "María G.",
    degree: "Técnica Superior en Educación Infantil",
    province: "Valencia",
    years: 12,
    specialties: ["Montessori", "NEE"],
    availability: "now",
    drives: true,
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    initials: "P. S.",
    displayName: "Paula S.",
    degree: "Grado en Magisterio Infantil",
    province: "Sevilla",
    years: 1,
    specialties: ["2-3 años"],
    availability: "unconfirmed",
    drives: false,
    photo:
      "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=600&auto=format&fit=crop",
  },
  {
    id: "5",
    initials: "A. F.",
    displayName: "Aitana F.",
    degree: "Técnica Superior en Educación Infantil",
    province: "Bizkaia",
    years: 8,
    specialties: ["Bilingüe EUS", "Reggio"],
    availability: "now",
    drives: true,
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop",
  },
  {
    id: "6",
    initials: "N. T.",
    displayName: "Noa T.",
    degree: "Grado en Magisterio Infantil",
    province: "Málaga",
    years: 4,
    specialties: ["Bilingüe EN"],
    availability: "soon",
    availableFrom: "1 oct",
    drives: true,
    photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&auto=format&fit=crop",
  },
  {
    id: "7",
    initials: "I. L.",
    displayName: "Irene L.",
    degree: "Técnica Superior en Educación Infantil",
    province: "Zaragoza",
    years: 2,
    specialties: ["0-1 año", "Lactancia"],
    availability: "now",
    drives: false,
    photo:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop",
  },
  {
    id: "8",
    initials: "S. V.",
    displayName: "Sara V.",
    degree: "Grado en Magisterio Infantil",
    province: "A Coruña",
    years: 10,
    specialties: ["Bilingüe GL", "Dirección"],
    availability: "unconfirmed",
    drives: true,
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop",
  },
];

function AvailabilityBadge({ p }: { p: Professional }) {
  const map = {
    now: {
      label: "Disponible ahora",
      cls: "bg-emerald-500/95 text-white",
      dot: "bg-white",
    },
    soon: {
      label: `Desde ${p.availableFrom ?? "pronto"}`,
      cls: "bg-amber-400/95 text-amber-950",
      dot: "bg-amber-900",
    },
    unconfirmed: {
      label: "Sin confirmar",
      cls: "bg-white/90 text-neutral-700",
      dot: "bg-neutral-500",
    },
  } as const;
  const v = map[p.availability];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur ${v.cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${v.dot}`} />
      {v.label}
    </span>
  );
}

function ProfessionalCard({ p }: { p: Professional }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={p.photo}
          alt={p.displayName}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        {/* Top badges */}
        <div className="absolute inset-x-2.5 top-2.5 flex items-start justify-between gap-2">
          <AvailabilityBadge p={p} />
          {p.drives && (
            <span
              title="Se desplaza"
              className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[11px] font-semibold text-neutral-700 shadow-sm backdrop-blur"
            >
              🚗
            </span>
          )}
        </div>

        {/* Name overlay */}
        <div className="absolute inset-x-3 bottom-2.5 text-white">
          <h3 className="text-base font-semibold leading-tight drop-shadow">
            {p.initials}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-[12px] text-white/85">
            {p.degree}
          </p>
        </div>
      </div>

      {/* Curved separator */}
      <svg
        className="-mt-3 block h-3 w-full text-white"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0,12 C25,0 75,0 100,12 L100,12 L0,12 Z" fill="currentColor" />
      </svg>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2.5 px-3.5 pb-3.5 pt-1">
        <div className="flex items-center gap-2 text-[12px] text-neutral-600">
          <span className="inline-flex items-center gap-1">
            📍 {p.province}
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            {p.years === 0
              ? "Sin experiencia"
              : `${p.years} ${p.years === 1 ? "año" : "años"} exp.`}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {p.specialties.slice(0, 2).map((s) => (
            <span
              key={s}
              className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-700"
            >
              {s}
            </span>
          ))}
          {p.specialties.length > 2 && (
            <span className="rounded-full bg-neutral-50 px-2 py-0.5 text-[11px] text-neutral-500">
              +{p.specialties.length - 2}
            </span>
          )}
        </div>

        <button
          type="button"
          className="mt-1 inline-flex w-full items-center justify-center gap-1 rounded-lg border border-neutral-200 py-1.5 text-[13px] font-semibold text-neutral-800 transition-colors hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
        >
          Ver perfil <span aria-hidden>→</span>
        </button>
      </div>
    </article>
  );
}

function ProfesionalesPage() {
  const [filter, setFilter] = useState<"all" | Availability>("all");
  const [drivesOnly, setDrivesOnly] = useState(false);

  const items = useMemo(
    () =>
      MOCK.filter((p) => (filter === "all" ? true : p.availability === filter))
        .filter((p) => (drivesOnly ? p.drives : true)),
    [filter, drivesOnly],
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-bold tracking-tight text-emerald-700">
            Educoland
          </Link>
          <nav className="hidden gap-6 text-sm font-medium text-neutral-600 md:flex">
            <Link to="/centros" className="hover:text-neutral-900">Centros</Link>
            <Link to="/empleo" className="hover:text-neutral-900">Empleo</Link>
            <Link to="/profesionales" className="text-neutral-900">Profesionales</Link>
            <Link to="/mi-cuenta" className="hover:text-neutral-900">Mi cuenta</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Profesionales de educación infantil
          </h1>
          <p className="mt-2 max-w-2xl text-neutral-600">
            Educadoras y maestras verificadas, disponibles para suplencias urgentes o
            contratos estables. Datos personales protegidos hasta contactar.
          </p>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {[
              { k: "all", label: "Todas" },
              { k: "now", label: "🟢 Disponibles ya" },
              { k: "soon", label: "🟡 Próximamente" },
              { k: "unconfirmed", label: "⚪ Sin confirmar" },
            ].map((o) => (
              <button
                key={o.k}
                onClick={() => setFilter(o.k as typeof filter)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === o.k
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                }`}
              >
                {o.label}
              </button>
            ))}
            <label className="ml-auto inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700">
              <input
                type="checkbox"
                className="accent-emerald-600"
                checked={drivesOnly}
                onChange={(e) => setDrivesOnly(e.target.checked)}
              />
              🚗 Se desplaza
            </label>
          </div>
        </div>
        {/* curved divider */}
        <svg
          className="block h-6 w-full text-neutral-50"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,0 C25,12 75,12 100,0 L100,12 L0,12 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6">
        <div className="mb-4 text-sm text-neutral-500">
          {items.length} {items.length === 1 ? "profesional" : "profesionales"}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProfessionalCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
