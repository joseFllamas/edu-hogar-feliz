import center1 from "@/assets/center-1.jpg";
import center2 from "@/assets/center-2.jpg";
import center3 from "@/assets/center-3.jpg";
import center4 from "@/assets/center-4.jpg";
import { centers as realCenters } from "./centers";

export type TipoCentro =
  | "Escuela Infantil"
  | "Guardería"
  | "Llar d'infants"
  | "Escola Bressol"
  | "Escola Infantil"
  | "Colegio";

export type Titularidad = "Privado" | "Público" | "Concertado";

export type CentroMock = {
  id: string;
  slug: string; // links to real center detail page
  nombre: string;
  tipo: TipoCentro;
  titularidad: Titularidad;
  provincia: string;
  localidad: string;
  servicios: string[];
  score: number; // 0–10
  reseñas: number;
  recomendado: boolean;
  verificado: boolean;
  image: string;
  lat: number;
  lng: number;
};

/** Spec-driven facet counts shown in the sidebar (real-feeling). */
export const FACET_COUNTS = {
  provincia: [
    { value: "Madrid", count: 707 },
    { value: "Barcelona", count: 319 },
    { value: "Valencia", count: 209 },
    { value: "Sevilla", count: 197 },
    { value: "Málaga", count: 137 },
    { value: "Córdoba", count: 114 },
    { value: "Bilbao", count: 96 },
    { value: "Zaragoza", count: 89 },
    { value: "A Coruña", count: 81 },
    { value: "Palma", count: 74 },
    { value: "Murcia", count: 71 },
    { value: "Granada", count: 64 },
  ],
  tipo: [
    { value: "Escuela Infantil", count: 5907 },
    { value: "Colegio", count: 1361 },
    { value: "Llar d'infants", count: 947 },
    { value: "Guardería", count: 832 },
    { value: "Escola Infantil", count: 570 },
    { value: "Escola Bressol", count: 502 },
  ],
  titularidad: [
    { value: "Privado", count: 5074 },
    { value: "Público", count: 4611 },
    { value: "Concertado", count: 928 },
  ],
  servicios: [
    { value: "0–3 años", count: 10514 },
    { value: "3–6 años", count: 4203 },
    { value: "Inglés", count: 6841 },
    { value: "Psicomotricidad", count: 5210 },
    { value: "Personal titulado", count: 9012 },
    { value: "Patio soleado", count: 4128 },
    { value: "Comedor", count: 7821 },
    { value: "Permanencias", count: 3964 },
    { value: "Música", count: 3247 },
    { value: "Huerto", count: 1109 },
  ],
} as const;

export const TOTAL_CENTROS = 10182;

// Province centers (lat, lng) + nearby localidades for richer data
const PROVINCIAS: Record<
  string,
  { lat: number; lng: number; localidades: string[] }
> = {
  Madrid: {
    lat: 40.4168,
    lng: -3.7038,
    localidades: ["Madrid", "Leganés", "Alcalá de Henares", "Móstoles", "Getafe", "Alcorcón", "Pozuelo", "Las Rozas"],
  },
  Barcelona: {
    lat: 41.3879,
    lng: 2.16992,
    localidades: ["Barcelona", "L'Hospitalet", "Badalona", "Sabadell", "Terrassa", "Mataró", "Granollers"],
  },
  Valencia: {
    lat: 39.4699,
    lng: -0.3763,
    localidades: ["València", "Torrent", "Gandia", "Paterna", "Sagunt", "Alzira"],
  },
  Sevilla: {
    lat: 37.3891,
    lng: -5.9845,
    localidades: ["Sevilla", "Dos Hermanas", "Alcalá de Guadaíra", "Utrera", "Mairena"],
  },
  Málaga: {
    lat: 36.7213,
    lng: -4.4214,
    localidades: ["Málaga", "Marbella", "Vélez-Málaga", "Mijas", "Fuengirola", "Torremolinos"],
  },
  Córdoba: {
    lat: 37.8882,
    lng: -4.7794,
    localidades: ["Córdoba", "Lucena", "Puente Genil", "Montilla"],
  },
  Bilbao: {
    lat: 43.2630,
    lng: -2.935,
    localidades: ["Bilbao", "Barakaldo", "Getxo", "Portugalete", "Santurtzi"],
  },
  Zaragoza: {
    lat: 41.6488,
    lng: -0.8891,
    localidades: ["Zaragoza", "Calatayud", "Utebo", "Ejea de los Caballeros"],
  },
  "A Coruña": {
    lat: 43.3623,
    lng: -8.4115,
    localidades: ["A Coruña", "Santiago", "Ferrol", "Narón", "Oleiros"],
  },
  Palma: {
    lat: 39.5696,
    lng: 2.6502,
    localidades: ["Palma", "Calvià", "Manacor", "Inca"],
  },
  Murcia: {
    lat: 37.9922,
    lng: -1.1307,
    localidades: ["Murcia", "Cartagena", "Lorca", "Molina de Segura"],
  },
  Granada: {
    lat: 37.1773,
    lng: -3.5986,
    localidades: ["Granada", "Motril", "Almuñécar", "Baza"],
  },
};

const NOMBRES_BASE = [
  "Fantasía",
  "Pipolandia",
  "El Jardín",
  "Sol Solet",
  "La Cigüeña",
  "Caracola",
  "El Petit Príncep",
  "La Casita",
  "Arco Iris",
  "Globo Rojo",
  "Burbujas",
  "Pequeñín",
  "El Tren",
  "Margarita",
  "El Bosque",
  "Mi Mundo",
  "Pétalo",
  "La Huerta",
  "Brincadeira",
  "Los Cerezos",
  "Estrellitas",
  "Don Pirulo",
  "La Granja",
  "El Patio",
  "Galassia",
  "Aromas",
  "Mariposas",
  "Lúa",
  "Camomilla",
  "Bambolina",
  "Aurora",
  "Lluvia",
  "Erizo",
  "Trencadís",
  "Mediterráneo",
  "Albariza",
  "Pingüinos",
  "Trovador",
  "Bonsái",
  "Caleidoscopio",
];

const PREFIJOS: Record<TipoCentro, string[]> = {
  "Escuela Infantil": ["Escuela Infantil", "E.I."],
  Guardería: ["Guardería"],
  "Llar d'infants": ["Llar d'infants"],
  "Escola Bressol": ["Escola Bressol"],
  "Escola Infantil": ["Escola Infantil"],
  Colegio: ["Colegio", "CEIP"],
};

const TIPO_POR_PROVINCIA: Partial<Record<string, TipoCentro[]>> = {
  Barcelona: ["Llar d'infants", "Escola Bressol", "Escuela Infantil", "Colegio"],
  "A Coruña": ["Escola Infantil", "Escuela Infantil", "Colegio"],
  Palma: ["Escola Infantil", "Escuela Infantil", "Guardería"],
};

const TIPOS_DEFAULT: TipoCentro[] = ["Escuela Infantil", "Guardería", "Colegio"];

const SERVICIOS_POOL = [
  "0–3 años",
  "3–6 años",
  "Inglés",
  "Psicomotricidad",
  "Personal titulado",
  "Patio soleado",
  "Comedor",
  "Permanencias",
  "Música",
  "Huerto",
];

// Distribution proportional to spec but capped to keep mock list snappy.
const PROVINCIA_QUOTA: Record<string, number> = {
  Madrid: 38,
  Barcelona: 22,
  Valencia: 16,
  Sevilla: 15,
  Málaga: 12,
  Córdoba: 10,
  Bilbao: 9,
  Zaragoza: 9,
  "A Coruña": 8,
  Palma: 7,
  Murcia: 7,
  Granada: 6,
};

// Deterministic PRNG so SSR and client agree.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pickN<T>(rng: () => number, arr: readonly T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) {
    const idx = Math.floor(rng() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

const IMAGES = [center1, center2, center3, center4];

function buildMock(): CentroMock[] {
  const rng = mulberry32(20260617);
  const out: CentroMock[] = [];
  let i = 0;
  for (const [provincia, quota] of Object.entries(PROVINCIA_QUOTA)) {
    const provInfo = PROVINCIAS[provincia];
    if (!provInfo) continue;
    const tipos = TIPO_POR_PROVINCIA[provincia] ?? TIPOS_DEFAULT;
    for (let k = 0; k < quota; k++) {
      const tipo = pick(rng, tipos);
      const prefijo = pick(rng, PREFIJOS[tipo]);
      const base = pick(rng, NOMBRES_BASE);
      const nombre = `${prefijo} ${base}`;
      const localidad = pick(rng, provInfo.localidades);
      const titularidad: Titularidad =
        tipo === "Colegio"
          ? pick(rng, ["Público", "Concertado", "Privado"] as const)
          : pick(rng, ["Privado", "Privado", "Público", "Concertado"] as const);
      const servicios = pickN(rng, SERVICIOS_POOL, 3 + Math.floor(rng() * 5));
      // 0-3 años obligatorio para guarderías/Escuelas Infantiles
      if (
        ["Escuela Infantil", "Guardería", "Llar d'infants", "Escola Bressol", "Escola Infantil"].includes(tipo) &&
        !servicios.includes("0–3 años")
      ) {
        servicios.unshift("0–3 años");
      }
      const score = +(7.2 + rng() * 2.8).toFixed(1); // 7.2 – 10.0
      const recomendado = score >= 9.2 && rng() > 0.3;
      const verificado = rng() > 0.45;
      const lat = provInfo.lat + (rng() - 0.5) * 0.18;
      const lng = provInfo.lng + (rng() - 0.5) * 0.18;
      const slug = realCenters[i % realCenters.length].slug;
      out.push({
        id: `m-${i + 1}`,
        slug,
        nombre,
        tipo,
        titularidad,
        provincia,
        localidad,
        servicios,
        score,
        reseñas: 4 + Math.floor(rng() * 180),
        recomendado,
        verificado,
        image: IMAGES[i % IMAGES.length],
        lat,
        lng,
      });
      i++;
    }
  }
  // Sort by score desc by default
  return out.sort((a, b) => b.score - a.score);
}

export const MOCK_CENTROS: CentroMock[] = buildMock();
