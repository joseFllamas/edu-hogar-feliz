import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getNearby } from "@/lib/centers";

export default defineTool({
  name: "find_nearby_centers",
  title: "Find nearby centers",
  description:
    "Given a center slug, return the closest Educoland centers ordered by distance in kilometers.",
  inputSchema: {
    slug: z.string().min(1).describe("Reference center slug"),
    max: z.number().int().min(1).max(20).default(6),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug, max }) => {
    const nearby = getNearby(slug, max).map(({ center, km }) => ({
      slug: center.slug,
      name: center.name,
      city: center.city,
      titularidad: center.titularidad,
      score: center.score,
      distance_km: Math.round(km * 10) / 10,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(nearby, null, 2) }],
      structuredContent: { nearby, count: nearby.length },
    };
  },
});
