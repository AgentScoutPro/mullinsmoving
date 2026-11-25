import { useRef } from "react";
import { ScrollReveal } from "./ScrollReveal";
import driverImage from "../assets/mullins-driver.webp";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

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
  const reducedMotion = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const timeline = useRef<HTMLDivElement>(null);
  const { scrollYProgress: photoProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: routeProgress } = useScroll({
    target: timeline,
    offset: ["start 0.76", "end 0.76"],
  });
  const photoY = useTransform(photoProgress, [0, 1], ["-1.5%", "1.5%"]);

  return (
    <section ref={section} className="chapter-five" aria-labelledby="chapter-five-title">
      <motion.img
        className="chapter-five-image"
        src={driverImage}
        alt=""
        loading="lazy"
        decoding="async"
        style={reducedMotion ? undefined : { y: photoY, scale: 1.04 }}
      />
      <div className="chapter-five-inner">
        <ScrollReveal className="chapter-five-copy" stagger>
          <p className="section-eyebrow">
            The Journey
          </p>

          <h2 id="chapter-five-title">
            Every Great Move
            <br />
            Begins Long Before
            <br />
            Moving Day.
          </h2>

          <div className="chapter-five-body">
            <p>
              The smoothest moves are never rushed. They are carefully planned, thoughtfully
              organized, and professionally coordinated from the very first conversation.
            </p>
            <p>
              By the time moving day arrives, every detail has already been considered—so you can
              focus on what&apos;s ahead instead of what&apos;s left behind.
            </p>
          </div>

          <a className="text-cta" href="#consultation">
            Plan Your Move
          </a>
        </ScrollReveal>

        <div ref={timeline} className="journey-timeline" aria-label="Mullins moving process">
          <span className="journey-route" aria-hidden="true">
            <motion.span className="journey-route-progress" style={{ scaleY: reducedMotion ? 1 : routeProgress }} />
          </span>
          <ol>
            {journeySteps.map((step, index) => (
              <motion.li
                key={step.title}
                initial={reducedMotion ? false : { opacity: .76, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .25 }}
                transition={{ duration: reducedMotion ? 0 : .48, ease: journeyEase }}
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
        </div>
      </div>
    </section>
  );
}
