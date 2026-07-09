import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../assets/mullins-hero-v2.jpeg";

const heroEase = [0.2, 0.8, 0.2, 1] as const;

gsap.registerPlugin(ScrollTrigger);

export function ChapterOneHero() {
  const heroRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
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
  const mediaScale = useTransform(scrollYProgress, [0, 0.92], prefersReducedMotion ? [1, 1] : [1, 1.03]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0.62]);
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

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const hero = heroRef.current;
    const header = headerRef.current;
    const content = contentRef.current;
    const eyebrow = eyebrowRef.current;
    const headline = headlineRef.current;
    const copy = copyRef.current;
    const services = servicesRef.current;
    const actions = actionsRef.current;

    if (!hero || !header || !content || !eyebrow || !headline || !copy || !services || !actions) {
      return;
    }

    const ctx = gsap.context(() => {
      const headlineLines = gsap.utils.toArray<HTMLElement>(".hero-headline-line", headline);
      const serviceItems = gsap.utils.toArray<HTMLElement>(".services-bar span, .services-bar b", services);
      const actionItems = gsap.utils.toArray<HTMLElement>("a", actions);

      gsap.set(header, { autoAlpha: 0 });
      gsap.set(eyebrow, { autoAlpha: 0, y: 20 });
      gsap.set(headlineLines, { autoAlpha: 0, y: 40 });
      gsap.set(copy, { autoAlpha: 0, y: 30 });
      gsap.set(serviceItems, { autoAlpha: 0 });
      gsap.set(actionItems, { autoAlpha: 0, y: 16 });

      const intro = gsap.timeline({ defaults: { ease: "power2.out" } });
      intro
        .to(header, { autoAlpha: 1, duration: 0.8 }, 0.25)
        .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.45)
        .to(headlineLines, { autoAlpha: 1, y: 0, duration: 0.95, stagger: 0.15, ease: "power3.out" }, 0.7)
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.35)
        .to(serviceItems, { autoAlpha: 1, duration: 0.6, stagger: 0.06 }, 1.55)
        .to(actionItems, { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.1, ease: "power2.out" }, 1.75);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        })
        .to(content, { y: -80, ease: "none" }, 0)
        .to(content, { autoAlpha: 0, ease: "none" }, 0.68);
    }, hero);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={heroRef} className="hero-shell" aria-labelledby="chapter-one-title">
      <motion.header
        ref={headerRef}
        className="hero-header"
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

        <motion.div ref={contentRef} className="hero-content">
          <motion.p
            ref={eyebrowRef}
            className="hero-eyebrow"
          >
            Arizona&apos;s White Glove Moving Experience
          </motion.p>

          <motion.h1
            ref={headlineRef}
            id="chapter-one-title"
          >
            <span className="hero-headline-line">Every Move</span>
            <span className="hero-headline-line">Begins With</span>
            <span className="hero-headline-line hero-headline-accent">Trust.</span>
          </motion.h1>

          <motion.p
            ref={copyRef}
            className="hero-copy"
          >
            For over 20 years, we&apos;ve helped families, executives, and businesses move
            forward—carefully, professionally, and without compromise.
          </motion.p>

          <motion.div
            ref={servicesRef}
            className="services-bar"
            aria-label="Featured moving services"
          >
            <span>White Glove Moving</span>
            <b aria-hidden="true">|</b>
            <span>Interstate Relocation</span>
            <b aria-hidden="true">|</b>
            <span>International Moving</span>
          </motion.div>

          <motion.div
            ref={actionsRef}
            className="hero-actions"
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
