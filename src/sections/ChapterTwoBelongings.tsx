import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import sectionTwoImage from "../assets/mm-section-2-v2.webp";

const statements = ["Carefully wrapped", "Professionally protected", "Handled like our own"];

export function ChapterTwoBelongings() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.035, 1.09]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["-1%", "1%"]);

  return (
    <section ref={section} className="chapter-two" aria-labelledby="chapter-two-title">
      <div className="chapter-two-inner">
        <motion.div
          className="chapter-two-copy"
          initial={reducedMotion ? false : { y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: .18 }}
          transition={{ duration: .65, ease: "easeOut" }}
        >
          <p className="section-eyebrow">What We Protect</p>
          <h2 id="chapter-two-title">We Move More Than Belongings.</h2>
          <p className="chapter-two-subhead">We move lives forward.</p>
          <div className="chapter-two-body">
            <p>Family photographs, heirlooms, and the furniture that makes a house feel like home all carry a story. We wrap, protect, and move them with care.</p>
          </div>
          <ul className="chapter-two-statements">
            {statements.map((statement) => <li key={statement}>{statement}</li>)}
          </ul>
          <a className="text-cta" href="#standard">Discover The Mullins Standard</a>
        </motion.div>

        <figure className="chapter-two-media">
          <motion.img
            src={sectionTwoImage}
            alt="Movers carrying a framed family portrait in a home"
            style={reducedMotion ? undefined : { scale: photoScale, y: photoY }}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
