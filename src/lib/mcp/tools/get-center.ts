import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getCenter } from "@/lib/centers";

export default defineTool({
  name: "get_center",
  title: "Get center details",
  description:
    "Retrieve the full detail of an Educoland center by its slug (e.g. 'ei-el-jardin-madrid').",
  inputSchema: {
    slug: z.string().min(1).describe("Center slug"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const c = getCenter(slug);
    if (!c) {
      return {
        content: [{ type: "text", text: `No center found for slug: ${slug}` }],
        isError: true,
      };
    }
    const detail = {
      slug: c.slug,
      name: c.name,
      type: c.type,
      city: c.city,
      province: c.province,
      community: c.community,
      titularidad: c.titularidad,
      score: c.score,
      reviews: c.reviews,
      address: c.address,
      phone: c.phone,
      email: c.email,
      website: c.website,
      description: c.description,
      ages: c.ages,
      schedule: c.schedule,
      pricing: c.pricing,
      ratio: c.ratio,
      languages: c.languages,
      features: c.features,
      services: c.services,
      project: c.project,
      anioApertura: c.anioApertura,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(detail, null, 2) }],
      structuredContent: { center: detail },
    };
  },
});
