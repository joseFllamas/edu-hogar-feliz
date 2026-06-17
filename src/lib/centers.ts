import center1 from "@/assets/center-1.jpg";
import center2 from "@/assets/center-2.jpg";
import center3 from "@/assets/center-3.jpg";
import center4 from "@/assets/center-4.jpg";

export type Review = {
  author: string;
  rating: number; // 1-5
  date: string; // ISO yyyy-mm-dd
  comment: string;
};

export type Center = {
  slug: string;
  name: string;
  type: string;
  city: string;
  province: string;
  community: string;
  score: number;
  reviews: number;
  image: string;
  gallery: string[];
  verified: boolean;
  recommended: boolean;
  claimed: boolean; // true = ficha gestionada por el centro
  completeness: number; // 0–100
  address: string;
  phone: string;
  email: string;
  website: string;
  social?: { instagram?: string; facebook?: string };
  description: string;
  ages: string;
  schedule: string;
  pricing: string;
  ratio: string;
  languages: string[];
  features: string[];
  services: string[];
  project: string;
  titularidad: "Pública" | "Concertada" | "Privada" | "Cooperativa";
  grado: string;
  horarioText: string;
  anioApertura?: number;
  convenio?: boolean;
  lat?: number;
  lng?: number;
  reviewsList: Review[];
};

const sampleReviews: Review[] = [
  {
    author: "María L.",
    rating: 5,
    date: "2025-09-12",
    comment:
      "Mi hija ha hecho una adaptación preciosa. El equipo es cercano y nos cuentan cada día cómo ha ido. Volvería a elegirlos sin dudar.",
  },
  {
    author: "Javier R.",
    rating: 5,
    date: "2025-07-03",
    comment:
      "Instalaciones cuidadísimas, patio increíble y cocina propia con menú equilibrado. Se nota el cariño con el que trabajan.",
  },
  {
    author: "Ana P.",
    rating: 5,
    date: "2025-05-21",
    comment:
      "Comunicación diaria por app, fotos y notas de la educadora. Muy tranquilos sabiendo que está en buenas manos.",
  },
  {
    author: "Sergio M.",
    rating: 5,
    date: "2025-02-14",
    comment:
      "Nos enamoró desde la primera visita. Espacios luminosos, ratios pequeños y proyecto pedagógico claro.",
  },
];

const fullServices = [
  "Natación",
  "Parking",
  "Patio soleado",
  "Permanencias",
  "Personal titulado",
  "Psicólogo/Pedagogo",
  "Psicomotricidad",
  "Médico/Pediatra",
  "Teatro",
  "Ticket guardería",
  "Comedor con cocina propia",
  "Menú ecológico",
  "Inglés diario",
  "Música",
  "Huerto educativo",
  "Aula multisensorial",
  "App diaria para familias",
  "Cámaras en aulas",
  "Acogida temprana",
  "Adaptación personalizada",
  "Escuela de familias",
  "Salidas culturales",
  "Yoga infantil",
  "Logopeda",
  "Aula de bebés",
  "Pañales y dietas incluidos",
  "Transporte",
  "Campamentos de verano",
];

export const centers: Center[] = [
  {
    slug: "ei-el-jardin-madrid",
    name: "Escuela Infantil El Jardín",
    type: "Centro privado · 0–3 años",
    city: "Madrid, Chamberí",
    province: "Madrid",
    community: "Comunidad de Madrid",
    score: 9.4,
    reviews: 128,
    image: center1,
    gallery: [center1, center2, center3, center4, center2, center1],
    verified: true,
    recommended: true,
    claimed: true,
    completeness: 92,
    address: "C/ Almagro 24, 28010 Madrid",
    phone: "+34 911 23 45 67",
    email: "hola@eieljardin.es",
    website: "https://eieljardin.es",
    social: { instagram: "https://instagram.com/eieljardin" },
    description:
      "Escuela infantil familiar en pleno Chamberí con patio exterior, cocina propia y proyecto basado en el respeto al ritmo de cada peque. Espacios luminosos diseñados por pedagogos.",
    ages: "0 a 3 años",
    schedule: "Lunes a viernes · 7:30 – 17:30",
    pricing: "Desde 380 €/mes (matrícula bonificable Comunidad de Madrid)",
    ratio: "1 educadora cada 6 niños (aula 1-2 años)",
    languages: ["Español", "Inglés diario", "Iniciación musical"],
    features: [
      "Patio exterior 120 m²",
      "Cocina propia con menú ecológico",
      "Cámaras y app diaria para familias",
      "Psicomotricidad semanal",
      "Adaptación personalizada",
    ],
    services: fullServices,
    project: "Pedagogía respetuosa inspirada en Pikler y Reggio Emilia.",
    titularidad: "Privada",
    grado: "0 - 3 Infantil",
    horarioText: "Abierto todo el año · 7:30 a 17:30",
    anioApertura: 2006,
    convenio: true,
    lat: 40.4319,
    lng: -3.6962,
    reviewsList: sampleReviews,
  },
  {
    slug: "guarderia-els-petits-barcelona",
    name: "Guardería Els Petits",
    type: "Concertada · 0–3 años",
    city: "Barcelona, Gràcia",
    province: "Barcelona",
    community: "Cataluña",
    score: 9.2,
    reviews: 94,
    image: center2,
    gallery: [center2, center3, center1, center4],
    verified: true,
    recommended: true,
    claimed: true,
    completeness: 85,
    address: "C/ Verdi 102, 08012 Barcelona",
    phone: "+34 932 11 22 33",
    email: "info@elspetits.cat",
    website: "https://elspetits.cat",
    description:
      "Llar d'infants concertada amb la Generalitat, amb pati interior i forta vinculació al barri de Gràcia. Projecte en català amb introducció gradual de l'anglès.",
    ages: "0 a 3 años",
    schedule: "Lunes a viernes · 8:00 – 17:00",
    pricing: "Cuota concertada · servicios opcionales aparte",
    ratio: "1 educadora cada 8 niños (aula 2-3 años)",
    languages: ["Catalán", "Castellano", "Inglés (P2)"],
    features: ["Patio interior", "Comedor con cocina propia", "Acogida 8:00", "Escuela de familias"],
    services: fullServices.slice(2, 22),
    project: "Aprendizaje vivencial con ambientes preparados y juego libre.",
    titularidad: "Concertada",
    grado: "0 - 3 Infantil",
    horarioText: "Curso escolar · 8:00 a 17:00",
    anioApertura: 1998,
    convenio: true,
    lat: 41.4046,
    lng: 2.1571,
    reviewsList: sampleReviews.slice(0, 3),
  },
  {
    slug: "ei-la-huerta-valencia",
    name: "Escuela Infantil La Huerta",
    type: "Cooperativa · 1–3 años",
    city: "Valencia, Ruzafa",
    province: "Valencia",
    community: "Comunitat Valenciana",
    score: 9.6,
    reviews: 76,
    image: center3,
    gallery: [center3, center1, center4, center2, center3],
    verified: true,
    recommended: true,
    claimed: true,
    completeness: 88,
    address: "C/ Cuba 45, 46006 València",
    phone: "+34 963 33 44 55",
    email: "hola@lahuerta.coop",
    website: "https://lahuerta.coop",
    description:
      "Cooperativa de familias y educadoras con huerto propio y filosofía de pedagogía activa. Grupos reducidos y participación real de las familias en el proyecto.",
    ages: "1 a 3 años",
    schedule: "Lunes a viernes · 8:30 – 16:30",
    pricing: "Desde 320 €/mes · cuota cooperativista incluida",
    ratio: "1 educadora cada 5 niños",
    languages: ["Valenciano", "Castellano"],
    features: ["Huerto educativo", "Cocina ecológica km 0", "Asambleas semanales", "Salidas al barrio"],
    services: fullServices.slice(4, 24),
    project: "Pedagogía activa, contacto con la naturaleza y comunidad.",
    titularidad: "Cooperativa",
    grado: "1 - 3 Infantil",
    horarioText: "Curso escolar · 8:30 a 16:30",
    anioApertura: 2014,
    convenio: false,
    lat: 39.4595,
    lng: -0.3735,
    reviewsList: sampleReviews,
  },
  {
    slug: "centro-montessori-aurora-sevilla",
    name: "Centro Montessori Aurora",
    type: "Privado Montessori · 0–6 años",
    city: "Sevilla, Triana",
    province: "Sevilla",
    community: "Andalucía",
    score: 9.3,
    reviews: 112,
    image: center4,
    gallery: [center4, center1, center2, center3],
    verified: false,
    recommended: false,
    claimed: false,
    completeness: 64,
    address: "C/ Pagés del Corro 80, 41010 Sevilla",
    phone: "+34 954 22 11 00",
    email: "info@auroramontessori.es",
    website: "https://auroramontessori.es",
    description:
      "Centro Montessori con ambientes Comunidad Infantil (0-3) y Casa de Niños (3-6). Guías AMI y materiales originales en aulas amplias y luminosas.",
    ages: "0 a 6 años",
    schedule: "Lunes a viernes · 8:00 – 17:00",
    pricing: "Desde 540 €/mes",
    ratio: "1 guía + 1 asistente por ambiente (máx. 20 niños)",
    languages: ["Español", "Inglés con nativo"],
    features: ["Guías AMI certificadas", "Materiales Montessori originales", "Jardín sensorial", "Comedor saludable"],
    services: fullServices.slice(0, 18),
    project: "Método Montessori en su forma original (0-6 años).",
    titularidad: "Privada",
    grado: "0 - 6 Infantil",
    horarioText: "Curso escolar · 8:00 a 17:00",
    anioApertura: 2011,
    convenio: false,
    lat: 37.3833,
    lng: -6.0,
    reviewsList: sampleReviews.slice(1, 4),
  },
  {
    slug: "escola-bressol-bambolina-bilbao",
    name: "Escola Bressol Bambolina",
    type: "Pública · 0–3 años",
    city: "Bilbao, Indautxu",
    province: "Bizkaia",
    community: "País Vasco",
    score: 9.1,
    reviews: 64,
    image: center2,
    gallery: [center2, center4, center1],
    verified: true,
    recommended: false,
    claimed: true,
    completeness: 72,
    address: "C/ Ercilla 18, 48011 Bilbao",
    phone: "+34 944 55 66 77",
    email: "bambolina@bilbao.eus",
    website: "https://bilbao.eus/bambolina",
    description:
      "Haurreskola pública del Consorcio Haurreskolak. Modelo lingüístico en euskera y entorno seguro para los primeros años de vida.",
    ages: "0 a 2 años",
    schedule: "Lunes a viernes · 7:45 – 17:00",
    pricing: "Tarifa pública según renta familiar",
    ratio: "Ratios oficiales del Consorcio Haurreskolak",
    languages: ["Euskera", "Castellano"],
    features: ["Modelo público", "Comedor", "Acogida temprana", "Personal funcionario"],
    services: fullServices.slice(2, 16),
    project: "Educación pública en euskera, basada en cuidado y vínculo.",
    titularidad: "Pública",
    grado: "0 - 2 Infantil",
    horarioText: "Curso escolar · 7:45 a 17:00",
    anioApertura: 2003,
    convenio: true,
    lat: 43.2614,
    lng: -2.9376,
    reviewsList: sampleReviews.slice(0, 2),
  },
  {
    slug: "guarderia-caracola-malaga",
    name: "Guardería Caracola",
    type: "Privada · 0–3 años",
    city: "Málaga, Centro",
    province: "Málaga",
    community: "Andalucía",
    score: 9.0,
    reviews: 58,
    image: center1,
    gallery: [center1, center3, center2],
    verified: false,
    recommended: false,
    claimed: false,
    completeness: 51,
    address: "C/ Larios 12, 29005 Málaga",
    phone: "+34 952 00 11 22",
    email: "hola@guarderiacaracola.es",
    website: "https://guarderiacaracola.es",
    description:
      "Guardería céntrica con horario ampliado pensado para familias trabajadoras. Aulas por edades y patio cubierto para los días de lluvia.",
    ages: "0 a 3 años",
    schedule: "Lunes a viernes · 7:00 – 19:00",
    pricing: "Desde 360 €/mes",
    ratio: "1 educadora cada 7 niños",
    languages: ["Español", "Inglés 2 sesiones/semana"],
    features: ["Horario ampliado", "Patio cubierto", "Cámaras en aulas", "App para familias"],
    services: fullServices.slice(3, 20),
    project: "Estimulación temprana con rutinas claras y juego dirigido.",
    titularidad: "Privada",
    grado: "0 - 3 Infantil",
    horarioText: "Todo el año · 7:00 a 19:00",
    anioApertura: 2009,
    convenio: false,
    lat: 36.7213,
    lng: -4.4214,
    reviewsList: sampleReviews.slice(2, 4),
  },
  {
    slug: "ei-fantasia-leganes",
    name: "Escuela Infantil Fantasía",
    type: "Privada · 0–3 años",
    city: "Leganés",
    province: "Madrid",
    community: "Comunidad de Madrid",
    score: 5.0, // sobre 5
    reviews: 4,
    image: center3,
    gallery: [center3, center1, center4, center2, center3, center1, center2],
    verified: true,
    recommended: true,
    claimed: true,
    completeness: 96,
    address: "Av. del Mar Mediterráneo 7, 28914 Leganés, Madrid",
    phone: "+34 916 88 12 34",
    email: "hola@eifantasia.es",
    website: "https://eifantasia.es",
    social: {
      instagram: "https://instagram.com/eifantasia",
      facebook: "https://facebook.com/eifantasia",
    },
    description:
      "La Escuela Infantil Fantasía es un centro creado en 1998 en Leganés, donde cada niño y niña encuentra un espacio seguro, cálido y estimulante para crecer. Apostamos por una pedagogía respetuosa, el juego como motor del aprendizaje y la colaboración estrecha con cada familia.",
    ages: "0 a 3 años",
    schedule: "Abierto todo el año · 6:30 a 21:00",
    pricing: "Consulta cuotas en el centro · Ticket guardería bonificable",
    ratio: "Ratios oficiales Comunidad de Madrid",
    languages: ["Español", "Inglés"],
    features: [
      "Patio soleado propio",
      "Cocina con menú equilibrado",
      "Permanencias amplias 6:30-21:00",
      "Personal titulado y estable",
    ],
    services: fullServices,
    project: "Pedagogía activa, juego libre y vínculo con la familia.",
    titularidad: "Privada",
    grado: "0 - 3 Infantil",
    horarioText: "Abierto todo el año · 6:30 a 21:00",
    anioApertura: 1998,
    convenio: true,
    lat: 40.3289,
    lng: -3.7635,
    reviewsList: sampleReviews,
  },
];

export function getCenter(slug: string) {
  return centers.find((c) => c.slug === slug);
}

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const toRad = (n: number) => (n * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export function getNearby(slug: string, max = 6) {
  const c = getCenter(slug);
  if (!c || c.lat == null || c.lng == null) return [];
  const origin = { lat: c.lat, lng: c.lng };
  return centers
    .filter((x) => x.slug !== slug && x.lat != null && x.lng != null)
    .map((x) => ({ center: x, km: distanceKm(origin, { lat: x.lat!, lng: x.lng! }) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, max);
}
