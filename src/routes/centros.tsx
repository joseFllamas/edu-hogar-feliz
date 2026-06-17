import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  MapPin,
  Search,
  SlidersHorizontal,
  X,
  LayoutGrid,
  Rows3,
  Map as MapIcon,
  Star,
  Award,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Filter as FilterIcon,
  Inbox,
} from "lucide-react";
import {
  FACET_COUNTS,
  MOCK_CENTROS,
  TOTAL_CENTROS,
  type CentroMock,
} from "@/lib/centers-mock";
import educolandLogo from "@/assets/educoland-logo-v2.png.asset.json";
import { MapView } from "@/components/centros/MapView";

/* ---------------- Search params ---------------- */

const VISTAS = ["grid", "lista", "mapa"] as const;
type Vista = (typeof VISTAS)[number];
const ORDENES = ["score", "nombre", "recientes"] as const;
type Orden = (typeof ORDENES)[number];

type SearchT = {
  q: string;
  provincia: string[];
  tipo: string[];
  titularidad: string[];
  servicios: string[];
  vista: Vista;
  orden: Orden;
  page: number;
};

function strArr(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === "string" && v) return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

function enumOr<T extends string>(allowed: readonly T[], v: unknown, fallback: T): T {
  return typeof v === "string" && (allowed as readonly string[]).includes(v) ? (v as T) : fallback;
}

function validateSearch(input: Record<string, unknown>): SearchT {
  return {
    q: typeof input.q === "string" ? input.q : "",
    provincia: strArr(input.provincia),
    tipo: strArr(input.tipo),
    titularidad: strArr(input.titularidad),
    servicios: strArr(input.servicios),
    vista: enumOr(VISTAS, input.vista, "grid"),
    orden: enumOr(ORDENES, input.orden, "score"),
    page: Math.max(1, Math.floor(Number(input.page) || 1)),
  };
}

export const Route = createFileRoute("/centros")({
  validateSearch,
  head: () => ({
    meta: [
      { title: "Buscar escuelas infantiles y guarderías · Educoland" },
      {
        name: "description",
        content:
          "Filtra entre 10.182 guarderías y escuelas infantiles en España. Cuadrícula, lista o mapa con valoraciones reales.",
      },
    ],
  }),
  component: CentrosPage,
});

const PAGE_SIZE = 12;

/* ---------------- Page ---------------- */

function CentrosPage() {
  const search = Route.useSearch() as SearchT;
  const navigate = useNavigate({ from: "/centros" });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const deferredQ = useDeferredValue(search.q);

  const results = useMemo(() => {
    const q = deferredQ.trim().toLowerCase();
    let arr = MOCK_CENTROS.filter((c) => {
      if (q) {
        const hay =
          c.nombre.toLowerCase().includes(q) ||
          c.provincia.toLowerCase().includes(q) ||
          c.localidad.toLowerCase().includes(q);
        if (!hay) return false;
      }
      if (search.provincia.length && !search.provincia.includes(c.provincia)) return false;
      if (search.tipo.length && !search.tipo.includes(c.tipo)) return false;
      if (search.titularidad.length && !search.titularidad.includes(c.titularidad)) return false;
      if (search.servicios.length && !search.servicios.every((s) => c.servicios.includes(s)))
        return false;
      return true;
    });
    if (search.orden === "nombre") arr = [...arr].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    else if (search.orden === "recientes") arr = [...arr].reverse();
    // score is the default order of the mock
    return arr;
  }, [deferredQ, search.provincia, search.tipo, search.titularidad, search.servicios, search.orden]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(search.page, totalPages);
  const paged = useMemo(
    () => results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [results, page],
  );

  // Reset page when filters/search/sort change
  useEffect(() => {
    if (search.page !== 1)
      navigate({
        search: (prev: SearchT) => ({ ...prev, page: 1 }),
        replace: true,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    search.q,
    search.provincia.join(","),
    search.tipo.join(","),
    search.titularidad.join(","),
    search.servicios.join(","),
    search.orden,
  ]);

  const update = (patch: Partial<typeof search>) =>
    navigate({ search: (prev: SearchT) => ({ ...prev, ...patch, page: 1 }) });

  const toggleArr = (key: "provincia" | "tipo" | "titularidad" | "servicios", value: string) => {
    const arr = search[key];
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    update({ [key]: next } as Partial<typeof search>);
  };

  const activeChips = [
    ...search.provincia.map((v) => ({ key: "provincia" as const, v })),
    ...search.tipo.map((v) => ({ key: "tipo" as const, v })),
    ...search.titularidad.map((v) => ({ key: "titularidad" as const, v })),
    ...search.servicios.map((v) => ({ key: "servicios" as const, v })),
  ];
  const hasActive =
    activeChips.length > 0 || search.q.trim().length > 0;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      {/* Page title + search */}
      <section className="border-b border-border bg-gradient-to-b from-muted/40 to-background">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-coral">
            Directorio
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Encuentra tu escuela infantil
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            <strong className="font-semibold text-foreground">
              {TOTAL_CENTROS.toLocaleString("es-ES")} centros
            </strong>{" "}
            en toda España. Filtra por provincia, tipo y servicios para encontrar la
            guardería ideal.
          </p>

          <form
            role="search"
            aria-label="Buscar centros"
            onSubmit={(e) => e.preventDefault()}
            className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl bg-card p-2 shadow-soft ring-1 ring-border sm:flex-nowrap"
          >
            <label htmlFor="q" className="sr-only">
              Provincia, localidad o nombre del centro
            </label>
            <div className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2">
              <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              <input
                id="q"
                type="search"
                value={search.q}
                onChange={(e) => update({ q: e.target.value })}
                placeholder="Provincia, localidad o nombre del centro…"
                className="min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/80 focus:outline-none"
              />
              {search.q && (
                <button
                  type="button"
                  onClick={() => update({ q: "" })}
                  aria-label="Limpiar búsqueda"
                  className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <Search className="h-4 w-4" /> Buscar
            </button>
          </form>
        </div>
      </section>

      {/* Sticky control bar */}
      <div className="sticky top-[57px] z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-muted lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {activeChips.length > 0 && (
              <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                {activeChips.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-muted lg:inline-flex"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {filtersOpen ? "Ocultar filtros" : "Mostrar filtros"}
          </button>

          <p className="text-sm">
            <strong className="font-semibold text-foreground">
              {results.length.toLocaleString("es-ES")}
            </strong>{" "}
            <span className="text-muted-foreground">
              {results.length === 1 ? "centro" : "centros"}
            </span>
            {hasActive ? (
              <span className="text-muted-foreground"> · filtrando entre {TOTAL_CENTROS.toLocaleString("es-ES")}</span>
            ) : null}
          </p>

          <div className="ml-auto flex items-center gap-2">
            <label className="hidden text-xs font-medium text-muted-foreground sm:inline">
              Orden:
            </label>
            <select
              value={search.orden}
              onChange={(e) => update({ orden: e.target.value as Orden })}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Ordenar resultados"
            >
              <option value="score">Mejor puntuación</option>
              <option value="nombre">A-Z</option>
              <option value="recientes">Recientes</option>
            </select>

            <ViewSwitcher
              value={search.vista}
              onChange={(v) => navigate({ search: (prev: SearchT) => ({ ...prev, vista: v }) })}
            />
          </div>
        </div>

        {hasActive && (
          <div className="mx-auto max-w-7xl px-4 pb-3 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              {search.q && (
                <ActiveChip label={`“${search.q}”`} onRemove={() => update({ q: "" })} />
              )}
              {activeChips.map(({ key, v }) => (
                <ActiveChip key={`${key}-${v}`} label={v} onRemove={() => toggleArr(key, v)} />
              ))}
              <button
                type="button"
                onClick={() =>
                  navigate({
                    search: () => ({
                      q: "",
                      provincia: [],
                      tipo: [],
                      titularidad: [],
                      servicios: [],
                      vista: search.vista,
                      orden: search.orden,
                      page: 1,
                    }),
                  })
                }
                className="text-xs font-semibold text-primary hover:underline"
              >
                Limpiar todo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div
          className={`grid gap-8 ${
            filtersOpen ? "lg:grid-cols-[300px_1fr]" : "lg:grid-cols-1"
          }`}
        >
          {/* Filters (desktop sidebar) */}
          {filtersOpen && (
            <aside className="hidden lg:block">
              <FilterPanel
                search={search}
                onToggle={toggleArr}
                onClear={() =>
                  navigate({
                    search: () => ({
                      q: search.q,
                      provincia: [],
                      tipo: [],
                      titularidad: [],
                      servicios: [],
                      vista: search.vista,
                      orden: search.orden,
                      page: 1,
                    }),
                  })
                }
              />
            </aside>
          )}

          {/* Results */}
          <section aria-live="polite">
            {paged.length === 0 ? (
              <EmptyState
                onReset={() =>
                  navigate({
                    search: () => ({
                      q: "",
                      provincia: [],
                      tipo: [],
                      titularidad: [],
                      servicios: [],
                      vista: search.vista,
                      orden: search.orden,
                      page: 1,
                    }),
                  })
                }
              />
            ) : search.vista === "mapa" ? (
              <MapPane centros={results} />
            ) : search.vista === "lista" ? (
              <ListView centros={paged} />
            ) : (
              <GridView centros={paged} />
            )}

            {paged.length > 0 && search.vista !== "mapa" && (
              <Pagination
                page={page}
                total={totalPages}
                onChange={(p) => navigate({ search: (prev: SearchT) => ({ ...prev, page: p }) })}
              />
            )}
          </section>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-ink/50"
            onClick={() => setFiltersOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 top-12 overflow-y-auto rounded-t-3xl bg-background p-5 shadow-lift">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-ink">Filtros</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Cerrar filtros"
                className="rounded-full p-2 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterPanel
              search={search}
              onToggle={toggleArr}
              onClear={() =>
                navigate({
                  search: () => ({
                    q: search.q,
                    provincia: [],
                    tipo: [],
                    titularidad: [],
                    servicios: [],
                    vista: search.vista,
                    orden: search.orden,
                    page: 1,
                  }),
                })
              }
            />
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="sticky bottom-0 mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lift"
            >
              Ver {results.length.toLocaleString("es-ES")} resultados
            </button>
          </div>
        </div>
      )}

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
            className="rounded-full px-3 py-2 font-semibold text-primary"
          >
            Buscar centros
          </Link>
          <a
            href="#"
            className="hidden rounded-full px-3 py-2 font-medium text-foreground/80 hover:bg-muted hover:text-foreground md:inline-flex"
          >
            Para centros
          </a>
          <a
            href="#"
            className="rounded-full border border-border bg-card px-3 py-2 font-semibold text-foreground hover:bg-muted"
          >
            Mi panel
          </a>
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
            Directorio independiente de escuelas infantiles en España.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-ink">Familias</h4>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <li><Link to="/centros" className="hover:text-primary">Buscar centros</Link></li>
            <li><a href="#" className="hover:text-primary">Cómo elegir guardería</a></li>
            <li><a href="#" className="hover:text-primary">Ayudas y bonificaciones</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-ink">Centros</h4>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Reclamar mi ficha</a></li>
            <li><a href="#" className="hover:text-primary">Plan para escuelas</a></li>
            <li><a href="#" className="hover:text-primary">Publicar ofertas de empleo</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-ink">Legal</h4>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Aviso legal</a></li>
            <li><a href="#" className="hover:text-primary">Política de privacidad</a></li>
            <li><a href="#" className="hover:text-primary">Cookies</a></li>
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

/* ---------------- View switcher ---------------- */

function ViewSwitcher({
  value,
  onChange,
}: {
  value: Vista;
  onChange: (v: Vista) => void;
}) {
  const opts: { v: Vista; label: string; Icon: typeof LayoutGrid }[] = [
    { v: "grid", label: "Cuadrícula", Icon: LayoutGrid },
    { v: "lista", label: "Lista", Icon: Rows3 },
    { v: "mapa", label: "Mapa", Icon: MapIcon },
  ];
  return (
    <div
      role="tablist"
      aria-label="Vista de resultados"
      className="inline-flex rounded-full border border-border bg-card p-0.5"
    >
      {opts.map(({ v, label, Icon }) => {
        const active = value === v;
        return (
          <button
            key={v}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(v)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:bg-muted"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- Filter panel ---------------- */



function FilterPanel({
  search,
  onToggle,
  onClear,
}: {
  search: SearchT;
  onToggle: (key: "provincia" | "tipo" | "titularidad" | "servicios", value: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="lg:sticky lg:top-[140px] lg:max-h-[calc(100dvh-160px)] lg:overflow-y-auto lg:pr-2">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <FilterIcon className="h-4 w-4 text-primary" /> Filtrar
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          Limpiar
        </button>
      </div>

      <FacetGroup
        label="Provincia / localidad"
        name="provincia"
        options={FACET_COUNTS.provincia as unknown as { value: string; count: number }[]}
        selected={search.provincia}
        onToggle={(v) => onToggle("provincia", v)}
      />
      <FacetGroup
        label="Tipo de centro"
        name="tipo"
        options={FACET_COUNTS.tipo as unknown as { value: string; count: number }[]}
        selected={search.tipo}
        onToggle={(v) => onToggle("tipo", v)}
        hint="Nombres regionales incluidos (catalán, gallego)."
      />
      <FacetGroup
        label="Titularidad"
        name="titularidad"
        options={FACET_COUNTS.titularidad as unknown as { value: string; count: number }[]}
        selected={search.titularidad}
        onToggle={(v) => onToggle("titularidad", v)}
      />
      <FacetGroup
        label="Servicios"
        name="servicios"
        options={FACET_COUNTS.servicios as unknown as { value: string; count: number }[]}
        selected={search.servicios}
        onToggle={(v) => onToggle("servicios", v)}
      />
    </div>
  );
}

function FacetGroup({
  label,
  name,
  options,
  selected,
  onToggle,
  hint,
}: {
  label: string;
  name: string;
  options: { value: string; count: number }[];
  selected: string[];
  onToggle: (v: string) => void;
  hint?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? options : options.slice(0, 6);
  return (
    <fieldset className="mb-6 border-0 p-0">
      <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </legend>
      {hint && <p className="-mt-1 mb-2 text-[11px] text-muted-foreground">{hint}</p>}
      <ul className="space-y-1">
        {visible.map((o) => {
          const checked = selected.includes(o.value);
          const id = `${name}-${o.value}`;
          return (
            <li key={o.value}>
              <label
                htmlFor={id}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                  checked ? "bg-primary/5 ring-1 ring-primary/20" : ""
                }`}
              >
                <input
                  id={id}
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-ring"
                  checked={checked}
                  onChange={() => onToggle(o.value)}
                />
                <span className="flex-1 truncate text-foreground">{o.value}</span>
                <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  {o.count.toLocaleString("es-ES")}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {options.length > 6 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-semibold text-primary hover:underline"
        >
          {expanded ? "Ver menos" : `Ver los ${options.length}`}
        </button>
      )}
    </fieldset>
  );
}

/* ---------------- Active chip ---------------- */

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Quitar filtro ${label}`}
        className="rounded-full p-0.5 hover:bg-primary/15"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

/* ---------------- Result cards ---------------- */

function ScoreBadge({ score }: { score: number }) {
  return (
    <span
      aria-label={`Puntuación ${score.toFixed(1)} sobre 10`}
      className="inline-flex items-center gap-1 rounded-lg bg-primary px-2 py-1 text-xs font-bold text-primary-foreground"
    >
      <Star className="h-3 w-3 fill-current" aria-hidden /> {score.toFixed(1)}
    </span>
  );
}

function RecommendedChip() {
  return (
    <span
      aria-label="Centro recomendado por Educoland"
      className="inline-flex items-center gap-1 rounded-full bg-secondary/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground"
    >
      <Award className="h-3 w-3" /> Recomendado
    </span>
  );
}

function VerifiedChip() {
  return (
    <span
      aria-label="Ficha verificada"
      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary"
    >
      <ShieldCheck className="h-3 w-3" /> Verificada
    </span>
  );
}

function GridView({ centros }: { centros: CentroMock[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {centros.map((c) => (
        <li key={c.id}>
          <Link
            to="/centro/$slug"
            params={{ slug: c.slug }}
            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lift focus-visible:-translate-y-1 focus-visible:shadow-lift"
          >
            <div className="relative">
              <img
                src={c.image}
                alt={`Foto del centro ${c.nombre}`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute left-3 top-3 flex flex-wrap gap-1">
                {c.recomendado && <RecommendedChip />}
                {c.verificado && <VerifiedChip />}
              </div>
              <div className="absolute right-3 top-3">
                <ScoreBadge score={c.score} />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-coral">
                {c.tipo}
              </p>
              <h3 className="line-clamp-2 font-display text-base font-semibold text-ink">
                {c.nombre}
              </h3>
              <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-coral" />
                {c.localidad} · {c.provincia}
              </p>
              <p className="text-xs text-muted-foreground">
                Titularidad:{" "}
                <span className="font-semibold text-foreground">{c.titularidad}</span>
              </p>
              <div className="mt-auto flex items-center gap-2 border-t border-border pt-3 text-[11px] text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-star text-star" />
                <span className="font-semibold text-foreground">{c.score.toFixed(1)}</span>
                <span>· {c.reseñas} valoraciones</span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ListView({ centros }: { centros: CentroMock[] }) {
  return (
    <ul className="grid gap-4">
      {centros.map((c) => (
        <li key={c.id}>
          <Link
            to="/centro/$slug"
            params={{ slug: c.slug }}
            className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-lift sm:flex-row"
          >
            <div className="relative sm:w-72 sm:shrink-0">
              <img
                src={c.image}
                alt={`Foto del centro ${c.nombre}`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:aspect-auto sm:h-full"
              />
              <div className="absolute left-3 top-3 flex flex-wrap gap-1">
                {c.recomendado && <RecommendedChip />}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-coral">
                    {c.tipo}
                  </p>
                  <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">
                    {c.nombre}
                  </h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-coral" />
                    {c.localidad} · {c.provincia}
                  </p>
                </div>
                <ScoreBadge score={c.score} />
              </div>
              <p className="text-xs text-muted-foreground">
                Titularidad:{" "}
                <span className="font-semibold text-foreground">{c.titularidad}</span>
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {c.servicios.slice(0, 6).map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-foreground/80"
                  >
                    {s}
                  </li>
                ))}
                {c.servicios.length > 6 && (
                  <li className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                    +{c.servicios.length - 6}
                  </li>
                )}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
                <div className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-star text-star" />
                  <span className="font-semibold text-foreground">{c.score.toFixed(1)}</span>
                  <span>· {c.reseñas} valoraciones</span>
                </div>
                {c.verificado && <VerifiedChip />}
                <span className="ml-auto text-xs font-semibold text-primary">
                  Ver ficha →
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MapPane({ centros }: { centros: CentroMock[] }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2 text-xs text-muted-foreground">
        <span>
          <strong className="font-semibold text-foreground">
            {centros.length.toLocaleString("es-ES")}
          </strong>{" "}
          centros en el mapa · clusters por zona
        </span>
        <span>Haz zoom para abrir los grupos</span>
      </div>
      <div className="h-[70dvh] min-h-[480px] w-full">
        <Suspense fallback={<MapSkeleton />}>
          <MapView
            centros={centros}
            onSelect={(c) => navigate({ to: "/centro/$slug", params: { slug: c.slug } })}
          />
        </Suspense>
      </div>
    </div>
  );
}

function MapSkeleton() {
  return (
    <div className="grid h-full place-items-center bg-gradient-to-br from-primary/10 via-secondary/15 to-muted">
      <div className="text-center text-sm text-muted-foreground">
        <MapIcon className="mx-auto h-8 w-8 animate-pulse text-primary/60" />
        <p className="mt-2">Cargando mapa…</p>
      </div>
    </div>
  );
}

/* ---------------- Empty + skeletons + pagination ---------------- */

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center">
      <Inbox className="mx-auto h-10 w-10 text-primary/60" />
      <h3 className="mt-4 font-display text-xl font-semibold text-ink">
        Sin resultados con esos filtros
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Prueba a quitar algún filtro o cambia la búsqueda. También puedes pedirnos
        ayuda para encontrar centro.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:-translate-y-0.5"
      >
        Quitar filtros
      </button>
    </div>
  );
}

// (kept for potential future use)
export function GridSkeleton() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i} className="overflow-hidden rounded-2xl bg-card ring-1 ring-border">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Pagination({
  page,
  total,
  onChange,
}: {
  page: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null;
  const nums = pageNumbers(page, total);
  return (
    <nav
      aria-label="Paginación de resultados"
      className="mt-10 flex flex-wrap items-center justify-center gap-1.5"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 hover:bg-muted"
      >
        <ChevronLeft className="h-4 w-4" /> Anterior
      </button>
      {nums.map((n, i) =>
        n === "…" ? (
          <span key={`g-${i}`} className="px-2 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-current={n === page ? "page" : undefined}
            className={`min-w-9 rounded-full px-3 py-1.5 text-sm font-semibold ${
              n === page
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            {n}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 hover:bg-muted"
      >
        Siguiente <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

function pageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(set)
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const n of sorted) {
    if (n - prev > 1) out.push("…");
    out.push(n);
    prev = n;
  }
  return out;
}
