import { decodeHTML } from "entities";

const storiesUrl = "https://www.mullins-moving.com/reviews-stories";
const googleMapsUrl = "https://www.google.com/maps?cid=4899447267962547978";

function plainText(html) {
  return decodeHTML(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

export function extractPublishedReviews(html) {
  const embedded = html.match(/<script\b[^>]*\bid=["']wix-warmup-data["'][^>]*>([\s\S]*?)<\/script>/i)?.[1];
  const props = embedded ? JSON.parse(embedded).platform?.ssrPropsUpdates : [];
  const pageMarkup = (props ?? []).flatMap(update => Object.values(update))
    .map(component => component?.seoMarkup ?? "").join("\n");
  const quotes = (pageMarkup || html).matchAll(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>\s*<(?:cite|p)\b[^>]*>([^<]+)<\/(?:cite|p)>/gi);

  const reviews = new Map();
  for (const [, quote, attribution] of quotes) {
    const match = plainText(attribution).match(/^(.+?),\s*Google review,\s*([1-5])\s+stars?$/i);
    if (!match) continue;
    const [, author, rating] = match;
    const text = plainText(quote).replace(/^[“"]|[”"]$/g, "");
    if (text && !reviews.has(author)) reviews.set(author, { author, rating: Number(rating), text });
  }
  return [...reviews.values()];
}

function googleLink(value) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ["www.google.com", "maps.google.com", "maps.app.goo.gl"].includes(url.hostname)
      ? url.href : undefined;
  } catch {
    return undefined;
  }
}

async function directGoogleReviews(key, placeId) {
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
    },
    signal: AbortSignal.timeout(4500),
  });
  if (!response.ok) throw new Error("Google Reviews unavailable");
  const data = await response.json();
  const reviews = (data.reviews ?? []).flatMap(review => {
    const author = review.authorAttribution?.displayName;
    const text = review.text?.text || review.originalText?.text;
    if (!author || !text || !Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) return [];
    return [{
      author, text, rating: review.rating,
      authorUrl: googleLink(review.authorAttribution.uri),
      reviewUrl: googleLink(review.googleMapsUri),
    }];
  });
  if (!reviews.length) throw new Error("No Google reviews available");

  return {
    source: "google", reviews,
    overallRating: data.rating, total: data.userRatingCount,
    googleMapsUrl: googleLink(data.googleMapsUri) || googleMapsUrl,
  };
}

async function publishedGoogleReviews() {
  const response = await fetch(storiesUrl, { signal: AbortSignal.timeout(6500) });
  if (!response.ok) throw new Error("Mullins reviews unavailable");
  const all = extractPublishedReviews(await response.text());
  if (!all.length) throw new Error("No attributed reviews found");
  const max = Math.min(all.length, 16);
  const reviews = Array.from({ length: max }, (_, index) => all[Math.floor(index * all.length / max)]);
  return { source: "mullins", reviews, googleMapsUrl };
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).end();
  }
  response.setHeader("Cache-Control", "no-store");
  const { GOOGLE_PLACES_API_KEY: key, MULLINS_GOOGLE_PLACE_ID: placeId } = process.env;
  if (key && placeId) {
    try {
      return response.status(200).json(await directGoogleReviews(key, placeId));
    } catch {
      // The business's published Google excerpts remain available if Places is down.
    }
  }
  try {
    const data = await publishedGoogleReviews();
    response.setHeader("Vercel-CDN-Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return response.status(200).json(data);
  } catch {
    return response.status(503).json({ error: "Reviews are temporarily unavailable." });
  }
}
