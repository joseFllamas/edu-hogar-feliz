import { defineMcp } from "@lovable.dev/mcp-js";
import listCentersTool from "./tools/list-centers";
import getCenterTool from "./tools/get-center";
import findNearbyCentersTool from "./tools/find-nearby-centers";

export default defineMcp({
  name: "educoland-mcp",
  title: "Educoland MCP",
  version: "0.1.0",
  instructions:
    "Educoland is a directory of early-childhood education centers (0-3 escuelas infantiles) in Spain. Use `list_centers` to search by city, province, community or titularidad; `get_center` to retrieve the full profile by slug; and `find_nearby_centers` to discover centers close to a reference one.",
  tools: [listCentersTool, getCenterTool, findNearbyCentersTool],
});
