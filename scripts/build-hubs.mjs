import { readFile, writeFile } from "node:fs/promises";

const routes = JSON.parse(await readFile(new URL("../src/hub-routes.json", import.meta.url), "utf8"));
const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
}

await Promise.all(Object.entries(routes).map(([path, { title, description }]) => {
  const pageTitle = escapeHtml(title + " | Mullins Moving");
  const summary = escapeHtml(description);
  const page = html
    .replace(/<title>[^<]*<\/title>/, `<title>${pageTitle}</title>`)
    .replace(/(name="description"\s+content=")[^"]*/, (_, start) => start + summary)
    .replace(/(property="og:title"\s+content=")[^"]*/, (_, start) => start + pageTitle)
    .replace(/(property="og:description"\s+content=")[^"]*/, (_, start) => start + summary);
  return writeFile(new URL(`../dist${path}.html`, import.meta.url), page);
}));
