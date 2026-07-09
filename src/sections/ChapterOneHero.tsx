import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import heroImage from "../assets/mullins-hero-v2.jpeg";

const heroEase = [0.2, 0.8, 0.2, 1] as const;

export function ChapterOneHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
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
  const mediaScale = useTransform(scrollYProgress, [0, 0.72], prefersReducedMotion ? [1, 1] : [1.04, 1]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0.62]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.56, 0.92], [1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.92], prefersReducedMotion ? [0, 0] : [0, -38]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.42, 0.7], [1, 1, 0]);

  const syncVideoToScroll = (progress: number) => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

    const clampedProgress = Math.min(Math.max(progress / 0.86, 0), 1);
    const targetTime = clampedProgress * Math.max(video.duration - 0.08, 0);

    if (Math.abs(video.currentTime - targetTime) < 0.035) return;
    video.currentTime = targetTime;
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      syncVideoToScroll(latest);
      frameRef.current = null;
    });
  });

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

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
    <section ref={heroRef} className="hero-shell" aria-labelledby="chapter-one-title">
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

      <div className="hero-stage">
        <motion.div
          className="hero-media"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 1.15, ease: heroEase }}
          style={{ scale: mediaScale, opacity: mediaOpacity }}
          aria-hidden="true"
        >
          {prefersReducedMotion ? (
            <img className="hero-poster" src={heroImage} alt="" />
          ) : (
            <video
              ref={videoRef}
              className="hero-video"
              muted
              playsInline
              preload="auto"
              poster={heroImage}
              onLoadedMetadata={() => syncVideoToScroll(scrollYProgress.get())}
            >
              <source src="/videos/mullins-hero-scroll.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>

        <div className="hero-gradient" aria-hidden="true" />

        <motion.div className="hero-content" style={{ opacity: contentOpacity, y: contentY }}>
          <motion.p
            className="hero-eyebrow"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.18}
          >
            Arizona&apos;s White Glove Moving Experience
          </motion.p>

          <motion.h1
            id="chapter-one-title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.32}
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
            custom={0.52}
          >
            For over 20 years, we&apos;ve helped families, executives, and businesses move
            forward—carefully, professionally, and without compromise.
          </motion.p>

          <motion.div
            className="services-bar"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.68}
            aria-label="Featured moving services"
          >
            <span>White Glove Moving</span>
            <b aria-hidden="true">|</b>
            <span>Interstate Relocation</span>
            <b aria-hidden="true">|</b>
            <span>International Moving</span>
          </motion.div>

          <motion.div
            className="hero-actions"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.82}
          >
            <a className="button button-primary" href="#consultation">
              Request Your Move Consultation
            </a>
            <a className="watch-link" href="#story">
              <span className="play-icon" aria-hidden="true" />
              Watch Our Story
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          style={{ opacity: cueOpacity }}
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <span className="scroll-line">
            <span />
          </span>
          <p>Scroll to Begin</p>
        </motion.div>
      </div>
    </section>
  );
}
