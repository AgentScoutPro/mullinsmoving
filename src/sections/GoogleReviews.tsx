import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { clientSite, googleMapsLink } from "../content";

type Review = {
  author: string;
  rating: number;
  text: string;
  authorUrl?: string;
  reviewUrl?: string;
};

type ReviewFeed = {
  source: "google" | "mullins";
  reviews: Review[];
  overallRating?: number;
  total?: number;
  googleMapsUrl: string;
};

function ReviewCard({ review, copy = false }: { review: Review; copy?: boolean }) {
  return (
    <li className="review-card">
      <span className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
        <span aria-hidden="true">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
      </span>
      <blockquote>{review.text}</blockquote>
      <div className="review-card-footer">
        {review.authorUrl && !copy ? <a href={review.authorUrl}>{review.author}</a> : <span>{review.author}</span>}
        {review.reviewUrl && !copy ? <a href={review.reviewUrl}>Google Maps</a> : <span className="review-badge">Google review</span>}
      </div>
    </li>
  );
}

function ReviewRow({ reviews, reverse }: { reviews: Review[]; reverse?: boolean }) {
  return (
    <div className="review-row" data-reverse={reverse}>
      <div className="review-track">
        <ul className="review-group">
          {reviews.map(review => <ReviewCard key={review.author} review={review} />)}
        </ul>
        {[1, 2].map(group => (
          <ul className="review-group review-loop" key={group} aria-hidden="true">
            {reviews.map(review => <ReviewCard key={review.author} review={review} copy />)}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function GoogleReviews({ backdrop }: { backdrop?: string }) {
  const section = useRef<HTMLElement>(null);
  const nearView = useInView(section, { once: true, margin: "320px 0px" });
  const inView = useInView(section);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [feed, setFeed] = useState<ReviewFeed | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!nearView) return;
    const controller = new AbortController();
    fetch("/api/reviews", { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error("Review feed unavailable");
        const data: ReviewFeed = await response.json();
        if (!data.reviews?.length) throw new Error("Review feed empty");
        setFeed(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, [nearView]);

  const reviews = feed?.reviews ?? [];
  const midpoint = Math.ceil(reviews.length / 2);
  const rows = reviews.length >= 12
    ? [reviews.slice(0, midpoint), reviews.slice(midpoint)]
    : reviews.length > 3
      ? [reviews, [...reviews].reverse()]
      : reviews.length ? [reviews] : [];
  const canScroll = reviews.length > 3;
  const animated = canScroll && !reducedMotion && !paused;

  return (
    <section
      ref={section}
      id="reviews"
      className="reviews-scene"
      aria-labelledby="reviews-title"
      data-animated={animated}
      data-in-view={inView}
    >
      <div className="reviews-heading">
        {backdrop && <img className="reviews-backdrop" src={backdrop} alt="" loading="lazy" decoding="async" />}
        <p className="section-eyebrow">Customer Experiences</p>
        <h2 id="reviews-title">Stories Worth Moving.</h2>
        <p>Read what families and businesses shared about their move with Mullins.</p>
        {feed?.source === "google" && typeof feed.overallRating === "number" && (
          <p className="review-summary">★ {feed.overallRating.toFixed(1)} on Google Maps{feed.total ? ` · ${feed.total} ratings` : ""}</p>
        )}
        {canScroll && !reducedMotion && (
          <button className="review-toggle" type="button" onClick={() => setPaused(value => !value)}>
            {paused ? "Play reviews" : "Pause reviews"}
          </button>
        )}
      </div>

      {rows.length ? (
        <div className="review-rows">
          {rows.map((row, index) => <ReviewRow key={index} reviews={row} reverse={index === 1} />)}
        </div>
      ) : (
        <p className="review-status" role="status">
          {failed ? "Read the latest reviews on Google Maps." : "Loading customer reviews…"}
        </p>
      )}

      <div className="review-links">
        <a className="text-cta" href={feed?.googleMapsUrl || googleMapsLink}>Read More Reviews on Google →</a>
        <a className="text-cta" href={clientSite + "/reviews-stories"}>Explore Client Stories</a>
      </div>
    </section>
  );
}
