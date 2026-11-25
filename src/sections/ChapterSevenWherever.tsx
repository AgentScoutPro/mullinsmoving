import { motion, useReducedMotion } from "framer-motion";
import globalRelocationImage from "../assets/mm-section-7-global.webp";

const globalEase = [0.2, 0.8, 0.2, 1] as const;

const pillars = [
  {
    title: "Local Arizona Moving",
    description: "Plan your move across the Valley or elsewhere in Arizona.",
    id: "local-moving",
    href: "/service-areas",
    link: "See Arizona service areas",
  },
  {
    title: "Long-Distance Moving",
    description: "Coordinate your packing, timeline, and delivery across state lines.",
    id: "long-distance",
    href: "/long-distance-moving",
    link: "Explore interstate moving",
  },
  {
    title: "International Relocation",
    description: "Talk through your destination, household goods, and timing with Mullins.",
    id: "international",
    href: "/international-moving",
    link: "Explore international relocation",
  },
];

export function ChapterSevenWherever() {
  const prefersReducedMotion = useReducedMotion();

  const revealItem = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 1,
        ease: globalEase,
      },
    },
  };

  return (
    <motion.section
      className="chapter-seven"
      id="destinations"
      aria-labelledby="chapter-seven-title"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 1.15, ease: globalEase }}
    >
      <motion.div
        className="chapter-seven-bg"
        initial={prefersReducedMotion ? false : { opacity: 0.75, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 1.25, ease: globalEase }}
        aria-hidden="true"
      >
        <img src={globalRelocationImage} alt="" loading="lazy" decoding="async" />
      </motion.div>

      <div className="chapter-seven-overlay" aria-hidden="true" />

      <div className="chapter-seven-inner">
        <motion.div
          className="chapter-seven-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.34 }}
          transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.14 }}
        >
          <motion.p className="section-eyebrow" variants={revealItem}>
            Beyond Arizona
          </motion.p>

          <motion.h2 id="chapter-seven-title" variants={revealItem}>
            Wherever Life
            <br />
            Takes You.
          </motion.h2>

          <motion.p className="chapter-seven-body" variants={revealItem}>
            From neighboring communities to destinations across the country and around the world,
            Mullins Moving coordinates every detail with the same care, planning, and
            professionalism that built our reputation here in Arizona.
          </motion.p>

          <motion.p className="chapter-seven-line" variants={revealItem}>
            Some moves change neighborhoods. Others change lives.
          </motion.p>

          <motion.div className="relocation-pillars" variants={revealItem}>
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                id={pillar.id}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.38 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.42 + index * 0.11,
                  duration: prefersReducedMotion ? 0.01 : 0.72,
                  ease: globalEase,
                }}
              >
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <a className="pillar-link" href={pillar.href}>{pillar.link} <span aria-hidden="true">↗</span></a>
              </motion.article>
            ))}
          </motion.div>

          <motion.div className="chapter-seven-actions" variants={revealItem}>
            <a className="chapter-seven-link" href="#consultation">
              Request Your Move Consultation
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
