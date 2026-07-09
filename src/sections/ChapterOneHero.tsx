import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import heroImage from "../assets/mullins-hero-v2.jpeg";

const heroEase = [0.2, 0.8, 0.2, 1] as const;

export function ChapterOneHero() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 160],
    ["rgba(9, 6, 13, 0)", "rgba(9, 6, 13, 0.78)"],
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 160],
    ["rgba(255, 241, 212, 0)", "rgba(255, 241, 212, 0.12)"],
  );

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : delay,
        duration: prefersReducedMotion ? 0.01 : 1.2,
        ease: heroEase,
      },
    }),
  };

  return (
    <section className="hero-shell" aria-labelledby="chapter-one-title">
      <motion.header
        className="hero-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, ease: heroEase }}
        style={{ backgroundColor: headerBackground, borderColor: headerBorder }}
      >
        <a className="brand-lockup" href="/" aria-label="Mullins Moving home">
          <span className="brand-mark">M</span>
          <span className="brand-copy">
            <span className="brand-name">Mullins Moving</span>
            <span className="brand-line">White Glove Relocation</span>
          </span>
        </a>

        <nav className="hero-nav" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#standard">Standard</a>
          <a href="#story">Story</a>
        </nav>

        <a className="header-cta" href="#consultation">
          Request Consultation
        </a>
      </motion.header>

      <motion.div
        className="hero-image"
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.015 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 1.35, ease: heroEase }}
        aria-hidden="true"
      >
        <img src={heroImage} alt="" />
      </motion.div>

      <div className="hero-gradient" aria-hidden="true" />

      <div className="hero-content">
        <motion.p
          className="hero-eyebrow"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Arizona&apos;s White Glove Moving Experience
        </motion.p>

        <motion.h1
          id="chapter-one-title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Every Move
          <br />
          Begins With <span>Trust.</span>
        </motion.h1>

        <motion.p
          className="hero-copy"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
        >
          From Arizona homes to destinations across the country and around the world, Mullins Moving
          protects every detail of the journey.
        </motion.p>

        <motion.div
          className="services-bar"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.38}
          aria-label="Featured moving services"
        >
          <span>White Glove Moving</span>
          <b aria-hidden="true">•</b>
          <span>Interstate Relocation</span>
          <b aria-hidden="true">•</b>
          <span>International Moving</span>
        </motion.div>

        <motion.div
          className="hero-actions"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          <a className="button button-primary" href="#consultation">
            Request Your Move Consultation
          </a>
          <a className="watch-link" href="#story">
            <span className="play-icon" aria-hidden="true" />
            Watch Our Story
          </a>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <span className="scroll-line">
          <span />
        </span>
        <p>Scroll to Begin</p>
      </motion.div>
    </section>
  );
}
