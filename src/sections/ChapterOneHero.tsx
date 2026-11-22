import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import truckImage from "../assets/mullins-truck.webp";

export function ChapterOneHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "2%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const copyOpacity = useTransform(scrollYProgress, [0, .65, 1], [1, 1, .25]);

  return (
    <section ref={heroRef} className="hero-shell" aria-labelledby="chapter-one-title">
      <div className="hero-stage">
        <motion.div
          className="hero-media"
          style={reducedMotion ? undefined : { scale: mediaScale, y: mediaY }}
          aria-hidden="true"
        >
          <img className="hero-poster" src={truckImage} alt="" fetchPriority="high" />
        </motion.div>
        <div className="hero-gradient" aria-hidden="true" />

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
