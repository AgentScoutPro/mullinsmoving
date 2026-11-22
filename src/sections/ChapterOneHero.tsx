import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import heroPoster from "../assets/mullins-desert-poster.webp";

const finalFrameHold = .08;
const seekThreshold = 1 / 30;

export function ChapterOneHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start 100px", "end end"],
  });
  const copyY = useTransform(scrollYProgress, [0, .55, .9], [0, 0, -24]);
  const copyOpacity = useTransform(scrollYProgress, [0, .58, .9], [1, 1, .15]);
  const gradientOpacity = useTransform(scrollYProgress, [0, .58, .9], [1, 1, .35]);

  function seekToScroll() {
    const video = videoRef.current;
    if (!video || video.seeking || !Number.isFinite(video.duration)) return;

    const progress = Math.min(Math.max(scrollYProgress.get(), 0) / (1 - finalFrameHold), 1);
    const lastFrame = Math.max(0, video.duration - 1 / 24);
    const time = progress * lastFrame;

    // Keep one seek in flight and pick up the latest scroll position when it finishes.
    if (Math.abs(video.currentTime - time) >= seekThreshold) video.currentTime = time;
  }

  useMotionValueEvent(scrollYProgress, "change", seekToScroll);

  return (
    <section ref={heroRef} className="hero-shell" aria-labelledby="chapter-one-title">
      <div className="hero-stage">
        <div className="hero-media" aria-hidden="true">
          <img className="hero-poster" src={heroPoster} alt="" fetchPriority="high" />
          {!reducedMotion && (
            <video
              ref={videoRef}
              className="hero-reel"
              data-ready={videoReady}
              src="/videos/mullins-desert-hero.mp4"
              preload="auto"
              muted
              playsInline
              onLoadedMetadata={seekToScroll}
              onLoadedData={() => setVideoReady(true)}
              onSeeked={seekToScroll}
              onError={() => setVideoReady(false)}
            />
          )}
        </div>
        <motion.div
          className="hero-gradient"
          style={reducedMotion ? undefined : { opacity: gradientOpacity }}
          aria-hidden="true"
        />

        <motion.div
          className="hero-content"
          style={reducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
        >
          <p className="hero-eyebrow">Top Tier Moving. Driven with Heart.™</p>
          <h1 id="chapter-one-title">
            Every Move
            <br />
            Begins With <em className="hero-headline-accent">Trust.</em>
          </h1>
          <p className="hero-copy">
            White-glove care for your move across Arizona, across the country, or overseas.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#consultation">
              Request Your Move Consultation
            </a>
            <a className="text-cta hero-story-link" href="#story">Read Our Story</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
