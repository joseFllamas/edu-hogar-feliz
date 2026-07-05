import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { centers } from "@/lib/centers";

export default defineTool({
  name: "list_centers",
  title: "List centers",
  description:
    "List early-childhood education centers on Educoland. Optional filters by city, province, community (autonomous community), or titularidad.",
  inputSchema: {
    city: z.string().optional().describe("Filter by city (case-insensitive substring)"),
    province: z.string().optional().describe("Filter by province (case-insensitive substring)"),
    community: z
      .string()
      .optional()
      .describe("Filter by autonomous community (case-insensitive substring)"),
    titularidad: z
      .enum(["Pública", "Concertada", "Privada", "Cooperativa"])
      .optional()
      .describe("Filter by ownership type"),
    limit: z.number().int().min(1).max(50).default(20),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ city, province, community, titularidad, limit }) => {
    const norm = (s: string) => s.toLowerCase();
    const matches = centers
      .filter((c) => !city || norm(c.city).includes(norm(city)))
      .filter((c) => !province || norm(c.province).includes(norm(province)))
      .filter((c) => !community || norm(c.community).includes(norm(community)))
      .filter((c) => !titularidad || c.titularidad === titularidad)
      .slice(0, limit)
      .map((c) => ({
        slug: c.slug,
        name: c.name,
        city: c.city,
        province: c.province,
        community: c.community,
        titularidad: c.titularidad,
        score: c.score,
        reviews: c.reviews,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
      structuredContent: { centers: matches, count: matches.length },
    };
  },
});
