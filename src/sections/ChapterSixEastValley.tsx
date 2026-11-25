import { motion, useReducedMotion } from "framer-motion";
import mapImage from "../assets/mm-image-map.webp";

const eastValleyEase = [0.2, 0.8, 0.2, 1] as const;

const cities = [
  "Gilbert",
  "Mesa",
  "Chandler",
  "Queen Creek",
  "Tempe",
  "Scottsdale",
  "Paradise Valley",
  "Phoenix",
];

export function ChapterSixEastValley() {
  const prefersReducedMotion = useReducedMotion();

  const revealItem = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 1,
        ease: eastValleyEase,
      },
    },
  };

  return (
    <motion.section
      className="chapter-six"
      id="service-areas"
      aria-labelledby="chapter-six-title"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 1.15, ease: eastValleyEase }}
    >
      <motion.div
        className="chapter-six-map"
        initial={prefersReducedMotion ? false : { opacity: 0.7, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 1.25, ease: eastValleyEase }}
        aria-hidden="true"
      >
        <img src={mapImage} alt="" loading="lazy" decoding="async" />
      </motion.div>

      <div className="chapter-six-overlay" aria-hidden="true" />

      <svg className="chapter-six-route" viewBox="0 0 640 420" aria-hidden="true">
        <motion.path
          d="M38 334 C 132 292, 184 304, 264 230 S 414 116, 602 78"
          pathLength="1"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: prefersReducedMotion ? 0.42 : 0 }}
          whileInView={{ pathLength: 1, opacity: 0.42 }}
          viewport={{ once: true, amount: 0.32 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 1.4, ease: eastValleyEase }}
        />
      </svg>

      <div className="chapter-six-inner">
        <motion.div
          className="chapter-six-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.34 }}
          transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.14 }}
        >
          <motion.p className="section-eyebrow" variants={revealItem}>
            Local Roots
          </motion.p>

          <motion.h2 id="chapter-six-title" variants={revealItem}>
            Arizona Is Home.
          </motion.h2>

          <motion.p className="chapter-six-body" variants={revealItem}>
            From Gilbert and Mesa to Chandler, Queen Creek, Tempe, Scottsdale, Paradise Valley, and
            Phoenix, Mullins Moving has built its reputation one family, one neighborhood, and one
            move at a time.
          </motion.p>

          <motion.ul className="chapter-six-cities" variants={revealItem} aria-label="Service cities">
            {cities.map((city, index) => (
              <motion.li
                key={city}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.45 + index * 0.06,
                  duration: prefersReducedMotion ? 0.01 : 0.55,
                  ease: eastValleyEase,
                }}
              >
                {city}
              </motion.li>
            ))}
          </motion.ul>

          <motion.a className="text-cta" href="/service-areas" variants={revealItem}>
            Explore Our Service Areas
          </motion.a>
        </motion.div>
      </div>

    </motion.section>
  );
}
