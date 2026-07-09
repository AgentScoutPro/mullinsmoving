import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import sectionFourImage from "../assets/mm-section-07-1.png";

const serveEase = [0.2, 0.8, 0.2, 1] as const;

export function ChapterFourServe() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0.58, 0.98], prefersReducedMotion ? [0, 0] : [14, -14]);

  const revealItem = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
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
      aria-labelledby="chapter-four-title"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 48 }}
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
            alt="A Mullins Moving team member helping a customer unload an item from the truck"
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
              For more than twenty years, we&apos;ve believed that moving is about more than
              transportation.
            </p>
            <p>It&apos;s about showing up for people during one of life&apos;s biggest transitions.</p>
            <p>Every conversation.</p>
            <p>Every box.</p>
            <p>Every handshake.</p>
            <p>
              Every move is an opportunity to serve with integrity, professionalism, and genuine
              care.
            </p>
            <p>That&apos;s the standard we hold ourselves to—every single day.</p>
          </motion.div>

          <motion.blockquote className="chapter-four-quote" variants={revealItem}>
            “We never set out to be the biggest.
            <br />
            We set out to be the most trusted.”
          </motion.blockquote>

          <motion.a className="text-cta" href="#team" variants={revealItem}>
            Meet The Team Behind Mullins
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
