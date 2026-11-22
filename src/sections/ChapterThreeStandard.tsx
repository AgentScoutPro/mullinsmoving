import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import sectionThreeImage from "../assets/mullins-packing.webp";

const standardEase = [0.2, 0.8, 0.2, 1] as const;

const craftsmanshipItems = [
  "Professionally Wrapped",
  "Furniture Protection",
  "Organized Loading",
  "Secure Transportation",
  "Final Placement",
];

export function ChapterThreeStandard() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0.42, 0.86], prefersReducedMotion ? [0, 0] : [16, -16]);

  const revealItem = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 1,
        ease: standardEase,
      },
    },
  };

  return (
    <motion.section
      className="chapter-three"
      id="standard"
      aria-labelledby="chapter-three-title"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 1.15, ease: standardEase }}
    >
      <div className="chapter-three-inner">
        <motion.div
          className="chapter-three-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.34 }}
          transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.14 }}
        >
          <motion.p className="section-eyebrow" variants={revealItem}>
            White Glove Craftsmanship
          </motion.p>

          <motion.h2 id="chapter-three-title" variants={revealItem}>
            Protection
            <br />
            Is Our Standard.
          </motion.h2>

          <motion.div className="chapter-three-body" variants={revealItem}>
            <p>Every move deserves more than transportation.</p>
            <p>It deserves preparation.</p>
            <p>
              Before anything is loaded, every piece is professionally wrapped, carefully protected,
              and thoughtfully organized to arrive exactly as it left.
            </p>
            <p>
              Because true craftsmanship isn&apos;t measured by how quickly something is moved.
            </p>
            <p>It&apos;s measured by how safely it arrives.</p>
          </motion.div>

          <motion.ul className="chapter-three-list" variants={revealItem}>
            {craftsmanshipItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </motion.ul>

          <motion.blockquote className="chapter-three-quote" variants={revealItem}>
            “The care you never have to ask for.”
          </motion.blockquote>

          <motion.a className="text-cta" href="https://www.mullins-moving.com/white-glove-moving-service" variants={revealItem}>
            Explore White-Glove Moving
          </motion.a>
        </motion.div>

        <motion.figure
          className="chapter-three-media"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 1.2, ease: standardEase }}
          style={{ y: imageY }}
        >
          <img
            src={sectionThreeImage}
            alt="Wrapped furniture carefully organized inside the Mullins Moving truck"
            loading="lazy"
            decoding="async"
          />
        </motion.figure>
      </div>
    </motion.section>
  );
}
