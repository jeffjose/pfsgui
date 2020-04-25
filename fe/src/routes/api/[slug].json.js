import { api } from "./_fauxapibridge.js";

export async function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  let slug = req.params.slug;

  let data = await api(req.params.slug, req.query);

  res.end(JSON.stringify(data));
}
