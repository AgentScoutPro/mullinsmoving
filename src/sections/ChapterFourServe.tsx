import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import sectionFourImage from "../assets/mullins-crew.webp";

const serveEase = [0.2, 0.8, 0.2, 1] as const;

export function ChapterFourServe() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0.58, 0.98], prefersReducedMotion ? [0, 0] : [14, -14]);

  const revealItem = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 1,
        ease: serveEase,
      },
    },
  };

  return (
    <motion.section
      className="chapter-four"
      id="story"
      aria-labelledby="chapter-four-title"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 1.15, ease: serveEase }}
    >
      <div className="chapter-four-inner">
        <motion.figure
          className="chapter-four-media"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 1.2, ease: serveEase }}
          style={{ y: imageY }}
        >
          <img
            src={sectionFourImage}
            alt="Mullins Moving crew with a customer"
            loading="lazy"
            decoding="async"
          />
        </motion.figure>

        <motion.div
          className="chapter-four-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.36 }}
          transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.14 }}
        >
          <motion.p className="section-eyebrow" variants={revealItem}>
            Our Why
          </motion.p>

          <motion.h2 id="chapter-four-title" variants={revealItem}>
            A Heart
            <br />
            To Serve.
          </motion.h2>

          <motion.div className="chapter-four-body" variants={revealItem}>
            <p>
              Moving day is personal. We show up with care, clear communication, and respect
              for the people and homes we serve.
            </p>
          </motion.div>

          <motion.a className="text-cta" href="https://www.mullins-moving.com/about" variants={revealItem}>
            Meet the Team Behind Mullins
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
