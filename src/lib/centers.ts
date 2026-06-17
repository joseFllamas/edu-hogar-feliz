import center1 from "@/assets/center-1.jpg";
import center2 from "@/assets/center-2.jpg";
import center3 from "@/assets/center-3.jpg";
import center4 from "@/assets/center-4.jpg";

export type Center = {
  slug: string;
  name: string;
  type: string;
  city: string;
  score: number;
  reviews: number;
  image: string;
  verified: boolean;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  ages: string;
  schedule: string;
  pricing: string;
  ratio: string;
  languages: string[];
  features: string[];
  project: string;
};

export const centers: Center[] = [
  {
    slug: "ei-el-jardin-madrid",
    name: "Escuela Infantil El Jardín",
    type: "Centro privado · 0–3 años",
    city: "Madrid, Chamberí",
    score: 9.4,
    reviews: 128,
    image: center1,
    verified: true,
    address: "C/ Almagro 24, 28010 Madrid",
    phone: "+34 911 23 45 67",
    email: "hola@eieljardin.es",
    website: "https://eieljardin.es",
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
    project: "Pedagogía respetuosa inspirada en Pikler y Reggio Emilia.",
  },
  {
    slug: "guarderia-els-petits-barcelona",
    name: "Guardería Els Petits",
    type: "Concertada · 0–3 años",
    city: "Barcelona, Gràcia",
    score: 9.2,
    reviews: 94,
    image: center2,
    verified: true,
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
    project: "Aprendizaje vivencial con ambientes preparados y juego libre.",
  },
  {
    slug: "ei-la-huerta-valencia",
    name: "Escuela Infantil La Huerta",
    type: "Cooperativa · 1–3 años",
    city: "Valencia, Ruzafa",
    score: 9.6,
    reviews: 76,
    image: center3,
    verified: true,
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
    project: "Pedagogía activa, contacto con la naturaleza y comunidad.",
  },
  {
    slug: "centro-montessori-aurora-sevilla",
    name: "Centro Montessori Aurora",
    type: "Privado Montessori · 0–6 años",
    city: "Sevilla, Triana",
    score: 9.3,
    reviews: 112,
    image: center4,
    verified: false,
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
    project: "Método Montessori en su forma original (0-6 años).",
  },
  {
    slug: "escola-bressol-bambolina-bilbao",
    name: "Escola Bressol Bambolina",
    type: "Pública · 0–3 años",
    city: "Bilbao, Indautxu",
    score: 9.1,
    reviews: 64,
    image: center2,
    verified: true,
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
    project: "Educación pública en euskera, basada en cuidado y vínculo.",
  },
  {
    slug: "guarderia-caracola-malaga",
    name: "Guardería Caracola",
    type: "Privada · 0–3 años",
    city: "Málaga, Centro",
    score: 9.0,
    reviews: 58,
    image: center1,
    verified: false,
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
    project: "Estimulación temprana con rutinas claras y juego dirigido.",
  },
];

export function getCenter(slug: string) {
  return centers.find((c) => c.slug === slug);
}
