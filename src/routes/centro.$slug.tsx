import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapPin,
  ShieldCheck,
  Star,
  ArrowLeft,
  Globe,
  Clock,
  Users,
  Languages,
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  CheckCircle2,
  Instagram,
  Facebook,
  Briefcase,
  Megaphone,
  Award,
  Building2,
  Quote,
  Send,
  Loader2,
  Waves,
  Car,
  Sun,
  Heart,
  GraduationCap,
  Brain,
  Activity,
  Stethoscope,
  Drama,
  Wallet,
  UtensilsCrossed,
  Leaf,
  Music,
  Sprout,
  Eye,
  Smartphone,
  Video,
  Sunrise,
  Baby,
  Users2,
  Bus,
  Tent,
  HandHeart,
  MessageCircle,
} from "lucide-react";
import { z } from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { centers, getCenter, getNearby } from "@/lib/centers";
import educolandLogo from "@/assets/educoland-logo-v2.png.asset.json";

export const Route = createFileRoute("/centro/$slug")({
  head: ({ params }) => {
    const c = getCenter(params.slug);
    if (!c) {
      return { meta: [{ title: "Centro no encontrado · Educoland" }] };
    }
    const hasPhotos = (c.imageKind ?? "photos") === "photos" && c.gallery.length > 0;
    return {
      meta: [
        { title: `${c.name} · ${c.city} · Educoland` },
        { name: "description", content: c.description.slice(0, 155) },
        { property: "og:title", content: `${c.name} · ${c.city}` },
        { property: "og:description", content: c.description.slice(0, 155) },
        ...(hasPhotos
          ? [
              { property: "og:image", content: c.image },
              { name: "twitter:image", content: c.image },
            ]
          : []),
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

/* ---------------- Header / NotFound ---------------- */

function NotFoundCentro() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
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

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center" aria-label="Educoland, inicio">
          <img src={educolandLogo.url} alt="Educoland" className="h-9 w-auto sm:h-10" />
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/"
            className="hidden rounded-full px-3 py-2 font-medium text-foreground/80 hover:bg-muted hover:text-foreground sm:inline-flex"
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

/* ---------------- Services icon map ---------------- */

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Natación: Waves,
  Parking: Car,
  "Patio soleado": Sun,
  Permanencias: Clock,
  "Personal titulado": GraduationCap,
  "Psicólogo/Pedagogo": Brain,
  Psicomotricidad: Activity,
  "Médico/Pediatra": Stethoscope,
  Teatro: Drama,
  "Ticket guardería": Wallet,
  "Comedor con cocina propia": UtensilsCrossed,
  "Menú ecológico": Leaf,
  "Inglés diario": Languages,
  Música: Music,
  "Huerto educativo": Sprout,
  "Aula multisensorial": Eye,
  "App diaria para familias": Smartphone,
  "Cámaras en aulas": Video,
  "Acogida temprana": Sunrise,
  "Adaptación personalizada": HandHeart,
  "Escuela de familias": Users2,
  "Salidas culturales": Building2,
  "Yoga infantil": Activity,
  Logopeda: MessageCircle,
  "Aula de bebés": Baby,
  "Pañales y dietas incluidos": Heart,
  Transporte: Bus,
  "Campamentos de verano": Tent,
};

/* ---------------- Scroll spy ---------------- */

const SECTIONS = [
  { id: "descripcion", label: "Descripción" },
  { id: "servicios", label: "Servicios" },
  { id: "detalles", label: "Detalles" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "opiniones", label: "Opiniones" },
  { id: "cercanos", label: "Cercanos" },
] as const;

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ---------------- Gallery + lightbox ---------------- */

function Gallery({
  images,
  name,
  imageKind = "photos",
  city,
  province,
}: {
  images: string[];
  name: string;
  imageKind?: "photos" | "locality" | "none";
  city: string;
  province: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const hasRealPhotos = imageKind === "photos" && images.length > 0;
  const safe = hasRealPhotos ? images : [];

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const prev = () => setIndex((i) => (i - 1 + safe.length) % safe.length);
  const next = () => setIndex((i) => (i + 1) % safe.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!hasRealPhotos) {
    return <NoPhotosHero kind={imageKind} name={name} city={city} province={province} />;
  }


  const main = safe[0];
  const thumbs = safe.slice(1, 5);
  const extra = Math.max(0, safe.length - 5);

  return (
    <>
      <div className="relative grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl ring-1 ring-black/5 sm:gap-3">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="group relative col-span-4 row-span-2 sm:col-span-2"
          aria-label={`Abrir galería de ${name}`}
        >
          <img
            src={main}
            alt={`Imagen principal de ${name}`}
            className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] sm:aspect-auto"
          />
        </button>
        {thumbs.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openAt(i + 1)}
            className="group relative hidden sm:block"
            aria-label={`Foto ${i + 2} de ${name}`}
          >
            <img
              src={src}
              alt={`Foto ${i + 2} de ${name}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {i === thumbs.length - 1 && extra > 0 && (
              <span className="absolute inset-0 grid place-items-center bg-black/45 text-sm font-semibold text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 backdrop-blur">
                  <Camera className="h-4 w-4" /> +{extra} fotos
                </span>
              </span>
            )}
          </button>
        ))}
        <button
          type="button"
          onClick={() => openAt(0)}
          className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/80 sm:hidden"
        >
          <Camera className="h-3.5 w-3.5" /> Ver {safe.length} fotos
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
          <div className="relative">
            <img
              src={safe[index]}
              alt={`Foto ${index + 1} de ${name}`}
              className="max-h-[80vh] w-full rounded-2xl object-contain"
            />
            <button
              type="button"
              onClick={prev}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white hover:bg-black/75"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white hover:bg-black/75"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar galería"
              className="absolute right-2 top-2 rounded-full bg-black/55 p-2 text-white hover:bg-black/75"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
              {index + 1} / {safe.length}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------------- Contact form ---------------- */

const contactSchema = z.object({
  name: z.string().trim().min(2, "Indícanos tu nombre").max(80),
  email: z.string().trim().email("Correo no válido").max(160),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  childAge: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Cuéntanos un poco más (mín. 10 caracteres)").max(800),
  consent: z
    .boolean()
    .refine((v) => v === true, "Debes aceptar la política de privacidad"),
});

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; errors: Partial<Record<keyof z.infer<typeof contactSchema>, string>> };

function ContactCard({ centerName, compact = false }: { centerName: string; compact?: boolean }) {
  const [state, setState] = useState<FormState>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      childAge: String(fd.get("childAge") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errors[String(issue.path[0])] = issue.message;
      }
      setState({ kind: "error", errors });
      return;
    }
    setState({ kind: "submitting" });
    await new Promise((r) => setTimeout(r, 700));
    setState({ kind: "success" });
  }

  if (state.kind === "success") {
    return (
      <div
        className={`rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border ${
          compact ? "" : "lg:p-7"
        }`}
        role="status"
      >
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              ¡Mensaje enviado!
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Hemos hecho llegar tu solicitud a <strong>{centerName}</strong>. Te
              responderán a tu correo en las próximas 48 h.
            </p>
            <button
              type="button"
              onClick={() => setState({ kind: "idle" })}
              className="mt-4 text-sm font-semibold text-primary hover:underline"
            >
              Enviar otro mensaje
            </button>
          </div>
        </div>
      </div>
    );
  }

  const errors = state.kind === "error" ? state.errors : {};
  const submitting = state.kind === "submitting";

  return (
    <div
      className={`rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border ${
        compact ? "" : "lg:p-7"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary/30 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
          Acción principal
        </span>
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold text-ink">
        ¿Te interesa este centro?
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Solicita plaza o información. Te ponemos en contacto directo con{" "}
        <strong>{centerName}</strong>.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-3" noValidate>
        <Field label="Tu nombre" name="name" error={errors.name} required />
        <Field
          label="Correo electrónico"
          name="email"
          type="email"
          error={errors.email}
          required
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Teléfono (opcional)" name="phone" type="tel" error={errors.phone} />
          <Field
            label="Edad del peque"
            name="childAge"
            placeholder="p. ej. 18 meses"
            error={errors.childAge}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-1 block text-xs font-semibold text-foreground"
          >
            Mensaje <span className="text-coral">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Querría información sobre plazas para curso 2026/27…"
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {errors.message && <FieldError msg={errors.message} />}
        </div>
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 h-4 w-4 rounded border-border text-primary focus-visible:ring-ring"
          />
          <span>
            He leído y acepto la{" "}
            <a href="#" className="font-semibold text-primary hover:underline">
              política de privacidad
            </a>
            .
          </span>
        </label>
        {errors.consent && <FieldError msg={errors.consent} />}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Solicitar plaza o información
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-muted-foreground">
          Mediamos sin coste para las familias · Nunca compartimos tus datos.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-xs font-semibold text-foreground">
        {label} {required && <span className="text-coral">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={
          type === "email" ? "email" : name === "phone" ? "tel" : name === "name" ? "name" : "off"
        }
        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      {error && <FieldError msg={error} />}
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return <p className="mt-1 text-xs font-medium text-destructive">{msg}</p>;
}

/* ---------------- Page ---------------- */

function CentroPage() {
  const { center: c } = Route.useLoaderData() as { center: (typeof centers)[number] };
  const active = useScrollSpy(SECTIONS.map((s) => s.id));
  const nearby = useMemo(() => getNearby(c.slug, 6), [c.slug]);
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const ratingStars = Math.round(c.score >= 5.01 ? c.score / 2 : c.score);

  const details: { label: string; value: string }[] = [];
  if (c.titularidad) details.push({ label: "Titularidad", value: c.titularidad });
  if (c.grado) details.push({ label: "Grado", value: c.grado });
  if (c.horarioText) details.push({ label: "Horario", value: c.horarioText });
  if (c.anioApertura)
    details.push({ label: "Año de apertura", value: String(c.anioApertura) });
  if (typeof c.convenio === "boolean")
    details.push({ label: "Convenio", value: c.convenio ? "Sí" : "No" });

  return (
    <div className="min-h-dvh bg-background pb-24 text-foreground sm:pb-0">
      <SiteHeader />

      {/* Breadcrumb */}
      <nav
        aria-label="Migas de pan"
        className="mx-auto max-w-7xl px-4 pt-5 text-sm text-muted-foreground sm:px-6 lg:px-8"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link to="/" className="hover:text-primary">Inicio</Link>
          </li>
          <li aria-hidden>›</li>
          <li>
            <Link to="/" className="hover:text-primary">Escuelas infantiles</Link>
          </li>
          <li aria-hidden>›</li>
          <li>
            <Link to="/" className="hover:text-primary">{c.province}</Link>
          </li>
          <li aria-hidden>›</li>
          <li className="text-foreground">{c.name}</li>
        </ol>
      </nav>

      {/* Banner reclamación (si no la gestiona) */}
      {!c.claimed && (
        <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-secondary/40 bg-secondary/20 px-4 py-3 text-sm">
            <Megaphone className="h-5 w-5 shrink-0 text-secondary-foreground" />
            <p className="flex-1 text-secondary-foreground">
              ¿Eres responsable de este centro? Reclama la ficha gratis y mantén la
              información al día.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:opacity-90"
            >
              Reclamar ficha
            </a>
          </div>
        </div>
      )}

      <main>
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-4 pb-6 pt-5 sm:px-6 lg:px-8">
          <Gallery images={c.gallery} name={c.name} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-10">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Chip>{c.type.split("·")[0].trim()}</Chip>
                <Chip>{c.grado}</Chip>
                {c.recommended && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/40 px-2.5 py-1 text-xs font-bold text-secondary-foreground">
                    <Award className="h-3.5 w-3.5" /> Recomendado
                  </span>
                )}
                {c.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
                    <ShieldCheck className="h-3.5 w-3.5" /> Ficha verificada
                  </span>
                )}
              </div>

              <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.6rem]">
                {c.name}
              </h1>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-coral" />
                {c.city}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 rounded-2xl bg-card p-3 pr-5 shadow-soft ring-1 ring-border">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <span className="font-display text-lg font-bold leading-none">
                      {c.score.toFixed(1)}
                    </span>
                  </span>
                  <div>
                    <div className="flex items-center gap-1" aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < ratingStars ? "fill-star text-star" : "text-muted-foreground/40"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {c.reviews} {c.reviews === 1 ? "valoración" : "valoraciones"}
                      </span>{" "}
                      de familias
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 items-center gap-3 rounded-2xl bg-card p-3 pr-5 shadow-soft ring-1 ring-border">
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Ficha completa al {c.completeness}%
                      </span>
                      <span>{c.completeness}/100</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${c.completeness}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {c.website && (
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    <Globe className="h-3.5 w-3.5 text-primary" /> Web del centro
                  </a>
                )}
                {c.social?.instagram && (
                  <a
                    href={c.social.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    <Instagram className="h-3.5 w-3.5 text-primary" /> Instagram
                  </a>
                )}
                {c.social?.facebook && (
                  <a
                    href={c.social.facebook}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    <Facebook className="h-3.5 w-3.5 text-primary" /> Facebook
                  </a>
                )}
                {c.claimed && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Gestionada por el centro
                  </span>
                )}
                <a
                  href="#"
                  className="ml-auto hidden text-xs font-semibold text-primary hover:underline sm:inline"
                >
                  ¿Eres el dueño? Gestionar
                </a>
              </div>
            </div>

            {/* Aside hero CTA (visible desde el principio en desktop) */}
            <div className="hidden lg:block">
              <button
                type="button"
                onClick={scrollToForm}
                className="group inline-flex w-full items-center justify-between gap-3 rounded-3xl bg-primary p-5 text-left text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
              >
                <span>
                  <span className="block font-display text-lg font-semibold">
                    Solicita plaza o información
                  </span>
                  <span className="mt-1 block text-xs opacity-85">
                    Mediación gratuita · respuesta &lt; 48 h
                  </span>
                </span>
                <Calendar className="h-6 w-6 transition-transform group-hover:scale-110" />
              </button>
            </div>
          </div>
        </section>

        {/* Sticky in-page nav */}
        <div className="sticky top-[57px] z-30 border-y border-border bg-background/95 backdrop-blur">
          <nav
            aria-label="Secciones del centro"
            className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8"
          >
            <ul className="flex min-w-max items-center gap-1 py-2 text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "true" : undefined}
                    className={`inline-flex rounded-full px-3 py-1.5 font-semibold transition-colors ${
                      active === s.id
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Body */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            {/* Main column */}
            <div className="space-y-14">
              {/* Descripción */}
              <SectionBlock id="descripcion" eyebrow="Conoce el centro" title="Descripción">
                <p className="text-lg leading-relaxed text-foreground/85">
                  {c.description}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Proyecto educativo:</span>{" "}
                  {c.project}
                </p>
              </SectionBlock>

              {/* Servicios */}
              <SectionBlock
                id="servicios"
                eyebrow="Qué ofrece"
                title="Servicios"
                aside={
                  <span className="text-sm text-muted-foreground">
                    {c.services.length} servicios
                  </span>
                }
              >
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {c.services.map((s) => {
                    const Icon = SERVICE_ICONS[s] ?? Sparkles;
                    return (
                      <li
                        key={s}
                        className="flex items-center gap-2.5 rounded-xl bg-card px-3 py-2.5 text-sm ring-1 ring-border"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="truncate">{s}</span>
                      </li>
                    );
                  })}
                </ul>
              </SectionBlock>

              {/* Detalles */}
              {details.length > 0 && (
                <SectionBlock id="detalles" eyebrow="Datos clave" title="Detalles">
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {details.map((d) => (
                      <div
                        key={d.label}
                        className="rounded-2xl bg-card p-4 ring-1 ring-border"
                      >
                        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {d.label}
                        </dt>
                        <dd className="mt-1.5 text-sm font-semibold text-foreground">
                          {d.value}
                        </dd>
                      </div>
                    ))}
                    <InfoRow
                      icon={<Users className="h-4 w-4" />}
                      label="Edades"
                      value={c.ages}
                    />
                    <InfoRow
                      icon={<Languages className="h-4 w-4" />}
                      label="Idiomas"
                      value={c.languages.join(" · ")}
                    />
                    <InfoRow
                      icon={<Users className="h-4 w-4" />}
                      label="Ratio"
                      value={c.ratio}
                    />
                    <InfoRow
                      icon={<Wallet className="h-4 w-4" />}
                      label="Cuotas"
                      value={c.pricing}
                    />
                  </dl>
                </SectionBlock>
              )}

              {/* Ubicación */}
              <SectionBlock id="ubicacion" eyebrow="Cómo llegar" title="Ubicación">
                <p className="inline-flex items-start gap-2 text-sm text-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 text-coral" />
                  {c.address}
                </p>
                <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-border">
                  {c.lat != null && c.lng != null ? (
                    <iframe
                      title={`Mapa de ${c.name}`}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${c.lng - 0.006},${c.lat - 0.004},${c.lng + 0.006},${c.lat + 0.004}&layer=mapnik&marker=${c.lat},${c.lng}`}
                      className="aspect-[16/9] w-full"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid aspect-[16/9] place-items-center bg-gradient-to-br from-primary/15 via-secondary/20 to-muted text-center">
                      <div>
                        <MapPin className="mx-auto h-8 w-8 text-primary/60" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Sin coordenadas verificadas todavía
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <Link
                    to="/"
                    className="rounded-full border border-border bg-card px-3 py-1.5 font-semibold text-foreground hover:bg-muted"
                  >
                    Centros en {c.province}
                  </Link>
                  {c.lat != null && c.lng != null && (
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${c.lat}&mlon=${c.lng}#map=17/${c.lat}/${c.lng}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full border border-border bg-card px-3 py-1.5 font-semibold text-foreground hover:bg-muted"
                    >
                      Abrir en el mapa
                    </a>
                  )}
                </div>
              </SectionBlock>

              {/* Opiniones */}
              <SectionBlock
                id="opiniones"
                eyebrow="La voz de las familias"
                title="Opiniones"
                aside={
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-0.5" aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < ratingStars ? "fill-star text-star" : "text-muted-foreground/40"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-foreground">
                      {c.score.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground">· {c.reviews} valoraciones</span>
                  </div>
                }
              >
                {c.reviewsList.length === 0 ? (
                  <p className="rounded-2xl bg-card p-5 text-sm text-muted-foreground ring-1 ring-border">
                    Aún no hay reseñas publicadas. ¡Sé la primera familia en compartir!
                  </p>
                ) : (
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {c.reviewsList.map((r, i) => (
                      <li
                        key={i}
                        className="relative rounded-2xl bg-card p-5 shadow-soft ring-1 ring-border"
                      >
                        <Quote className="absolute right-4 top-4 h-6 w-6 text-primary/15" />
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
                            {r.author
                              .split(" ")
                              .map((p) => p[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {r.author}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(r.date).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1" aria-label={`${r.rating} de 5 estrellas`}>
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${
                                j < r.rating ? "fill-star text-star" : "text-muted-foreground/40"
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-xs font-semibold text-foreground">
                            {r.rating}/5
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                          “{r.comment}”
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </SectionBlock>

              {/* Cercanos */}
              <SectionBlock
                id="cercanos"
                eyebrow="También en la zona"
                title="Centros cercanos"
              >
                {nearby.length === 0 ? (
                  <p className="rounded-2xl bg-card p-5 text-sm text-muted-foreground ring-1 ring-border">
                    No hemos encontrado otros centros próximos en nuestra base.
                  </p>
                ) : (
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {nearby.map(({ center: r, km }) => (
                      <li key={r.slug}>
                        <Link
                          to="/centro/$slug"
                          params={{ slug: r.slug }}
                          className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lift"
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
                            <span className="absolute left-3 bottom-3 rounded-full bg-black/65 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
                              a {km.toFixed(1)} km
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col gap-1 p-4">
                            <h3 className="truncate font-display text-base font-semibold text-ink">
                              {r.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">{r.type}</p>
                            <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs text-foreground/80">
                              <MapPin className="h-3.5 w-3.5 text-coral" /> {r.city}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </SectionBlock>
            </div>

            {/* Sticky aside */}
            <aside className="space-y-4 lg:sticky lg:top-[120px] lg:self-start">
              <div ref={formRef}>
                <ContactCard centerName={c.name} />
              </div>

              <div className="rounded-3xl bg-card p-5 shadow-soft ring-1 ring-border">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary/30 text-secondary-foreground">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-ink">
                    ¿Buscas trabajo en escuelas infantiles?
                  </h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Registra tu CV y deja que los centros como {c.name} te encuentren.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  Registrar CV gratis
                </a>
              </div>

              <div className="overflow-hidden rounded-3xl bg-ink text-background shadow-soft">
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-secondary">
                    Partner Pronens
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
                    Equipa tu centro con material y textil escolar
                  </h3>
                  <p className="mt-2 text-sm text-background/75">
                    Babis, mochilas, material didáctico y mobiliario para escuelas
                    infantiles, con condiciones especiales.
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-secondary-foreground hover:opacity-90"
                  >
                    Descubrir Pronens →
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* Footer */}
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
              <li><a href="#" className="hover:text-primary">Buscar centros</a></li>
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

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur sm:hidden">
        <button
          type="button"
          onClick={scrollToForm}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lift"
        >
          <Send className="h-4 w-4" /> Solicitar plaza o información
        </button>
      </div>
    </div>
  );
}

/* ---------------- Small building blocks ---------------- */

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-foreground/80">
      {children}
    </span>
  );
}

function SectionBlock({
  id,
  eyebrow,
  title,
  aside,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-coral">
            {eyebrow}
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {title}
          </h2>
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
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
    <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
