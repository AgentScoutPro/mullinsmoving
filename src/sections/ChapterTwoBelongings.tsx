import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import sectionTwoImage from "../assets/mm-section-2-v2.webp";

const revealEase = [0.2, 0.8, 0.2, 1] as const;

const statements = ["Carefully Wrapped", "Professionally Protected", "Handled Like Our Own"];

export function ChapterTwoBelongings() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0.18, 0.62], prefersReducedMotion ? [0, 0] : [-18, 18]);

  const itemReveal = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 1,
        ease: revealEase,
      },
    },
  };

  return (
    <motion.section
      className="chapter-two"
      aria-labelledby="chapter-two-title"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 1.15, ease: revealEase }}
    >
      <div className="chapter-two-inner">
        <motion.figure
          className="chapter-two-media"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 1.25, ease: revealEase }}
          style={{ y: imageY }}
        >
          <img
            src={sectionTwoImage}
            alt="Mullins Moving team members carefully carrying a framed family portrait inside a warm Arizona home"
            loading="lazy"
            decoding="async"
          />
        </motion.figure>

        <motion.div
          className="chapter-two-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.32 }}
          transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.14 }}
        >
          <motion.p className="section-eyebrow" variants={itemReveal}>
            What We Protect
          </motion.p>

          <motion.h2 id="chapter-two-title" variants={itemReveal}>
            We Move More Than Belongings.
          </motion.h2>

          <motion.p className="chapter-two-subhead" variants={itemReveal}>
            We move lives forward.
          </motion.p>

          <motion.div className="chapter-two-body" variants={itemReveal}>
            <p>Behind every box is a memory.</p>
            <p>Behind every doorway is a new beginning.</p>
            <p>
              From family photographs and heirlooms to the furniture that turns a house into a home,
              every item tells part of your story.
            </p>
            <p>
              That&apos;s why every move begins with care, preparation, and respect—because it&apos;s
              never just a move.
            </p>
          </motion.div>

          <motion.ul className="chapter-two-statements" variants={itemReveal}>
            {statements.map((statement) => (
              <li key={statement}>{statement}</li>
            ))}
          </motion.ul>

          <motion.a className="text-cta" href="#standard" variants={itemReveal}>
            Discover The Mullins Standard
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
