import driverImage from "../assets/mullins-driver.webp";
import { motion, useReducedMotion } from "framer-motion";

const journeyEase = [0.2, 0.8, 0.2, 1] as const;

const journeySteps = [
  {
    title: "Personal Consultation",
    description: "Understanding your home, timeline, destination, and expectations.",
  },
  {
    title: "Planning",
    description: "Scheduling, crew coordination, logistics, and clear communication.",
  },
  {
    title: "Preparation",
    description: "Packing, wrapping, floor protection, labeling, and organization.",
  },
  {
    title: "Moving Day",
    description: "Professional crews, careful handling, secure loading, and steady communication.",
  },
  {
    title: "Arrival",
    description: "Placement, walkthrough, final details, and peace of mind.",
  },
];

export function ChapterFiveJourney() {
  const prefersReducedMotion = useReducedMotion();

  const revealItem = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 1,
        ease: journeyEase,
      },
    },
  };

  return (
    <motion.section
      className="chapter-five"
      aria-labelledby="chapter-five-title"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 1.15, ease: journeyEase }}
    >
      <img className="chapter-five-image" src={driverImage} alt="" loading="lazy" decoding="async" />
      <div className="chapter-five-inner">
        <motion.div
          className="chapter-five-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.34 }}
          transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.14 }}
        >
          <motion.p className="section-eyebrow" variants={revealItem}>
            The Journey
          </motion.p>

          <motion.h2 id="chapter-five-title" variants={revealItem}>
            Every Great Move
            <br />
            Begins Long Before
            <br />
            Moving Day.
          </motion.h2>

          <motion.div className="chapter-five-body" variants={revealItem}>
            <p>
              The smoothest moves are never rushed. They are carefully planned, thoughtfully
              organized, and professionally coordinated from the very first conversation.
            </p>
            <p>
              By the time moving day arrives, every detail has already been considered—so you can
              focus on what&apos;s ahead instead of what&apos;s left behind.
            </p>
          </motion.div>

          <motion.a className="text-cta" href="#consultation" variants={revealItem}>
            Plan Your Move
          </motion.a>
        </motion.div>

        <motion.div
          className="journey-timeline"
          aria-label="Mullins moving process"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.24 }}
        >
          <motion.span
            className="journey-route"
            aria-hidden="true"
            initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 1.25, ease: journeyEase }}
          />

          <ol>
            {journeySteps.map((step, index) => (
              <motion.li
                key={step.title}
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: prefersReducedMotion ? 0 : index * 0.1,
                      duration: prefersReducedMotion ? 0.01 : 0.82,
                      ease: journeyEase,
                    },
                  },
                }}
              >
                <span className="journey-marker" aria-hidden="true" />
                <span className="journey-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </motion.section>
  );
}
