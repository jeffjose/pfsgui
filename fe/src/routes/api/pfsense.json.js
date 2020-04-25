import { get_payload } from "./_api.js";

export async function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  let data = await get_payload();

  res.end(JSON.stringify(data));
}
