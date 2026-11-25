import { useRef } from "react";
import { ScrollReveal } from "./ScrollReveal";
import driverImage from "../assets/mullins-driver.webp";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const routeReadingLine = 0.76;
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

function JourneyStep({ step, index }: { step: (typeof journeySteps)[number]; index: number }) {
  const marker = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress: markerProgress } = useScroll({
    target: marker,
    offset: [`center ${routeReadingLine}`, `end ${routeReadingLine - .015}`],
  });
  const copyReveal = {
    initial: reducedMotion ? false : { opacity: .78, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .25 } as const,
    transition: { duration: reducedMotion ? 0 : .48, ease: journeyEase },
  };

  return (
    <li>
      <span ref={marker} className="journey-marker" aria-hidden="true">
        <motion.span className="journey-marker-fill" style={{ opacity: reducedMotion ? 1 : markerProgress }} />
      </span>
      <motion.span className="journey-number journey-step-copy" {...copyReveal}>
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <motion.div className="journey-step-copy" {...copyReveal}>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </motion.div>
    </li>
  );
}

export function ChapterFiveJourney() {
  const reducedMotion = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const route = useRef<HTMLSpanElement>(null);
  const { scrollYProgress: photoProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: routeProgress } = useScroll({
    target: route,
    offset: [`start ${routeReadingLine}`, `end ${routeReadingLine}`],
  });
  const photoY = useTransform(photoProgress, [0, 1], ["-1.5%", "1.5%"]);

  return (
    <section ref={section} className="chapter-five" aria-labelledby="chapter-five-title">
      <motion.img
        className="chapter-five-image story-photo"
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

        <div className="journey-timeline" aria-label="Mullins moving process">
          <span ref={route} className="journey-route" aria-hidden="true">
            <motion.span className="journey-route-progress" style={{ scaleY: reducedMotion ? 1 : routeProgress }} />
          </span>
          <ol>
            {journeySteps.map((step, index) => (
              <JourneyStep key={step.title} step={step} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
