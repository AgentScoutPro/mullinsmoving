import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

export type SceneMedia = {
  image: string;
  description: string;
  video?: string;
  position?: string;
  photoMotion?: "story" | "portrait";
};

export function SceneVisual({
  image, description, video, position = "center", photoMotion, className = "editorial-visual", priority = false,
}: SceneMedia & { className?: string; priority?: boolean }) {
  const scene = useRef<HTMLElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const nearScene = useInView(scene, { margin: "280px 0px", once: true });
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.025, 1.075]);
  const y = useTransform(scrollYProgress, [0, 1], ["-1.2%", "2%"]);
  const parallaxProgress = useTransform(scrollYProgress, [.14, .86], [-1, 1]);
  const animatedPhoto = video ? undefined : photoMotion;
  const imageMotion = reducedMotion || video ? undefined : animatedPhoto
    ? { "--photo-parallax-progress": parallaxProgress }
    : { scale, y };

  function seek() {
    const video = player.current;
    if (!video || video.seeking || !Number.isFinite(video.duration)) return;
    const progress = Math.max(0, Math.min((scrollYProgress.get() - .1) / .8, 1));
    const time = progress * Math.max(0, video.duration - .05);
    if (Math.abs(video.currentTime - time) >= 1 / 30) video.currentTime = time;
  }

  useMotionValueEvent(scrollYProgress, "change", seek);

  return (
    <figure ref={scene} className={className}>
      <motion.img
        data-photo-motion={animatedPhoto}
        src={image}
        alt={description}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={{ objectPosition: position, ...imageMotion }}
      />
      {video && nearScene && !reducedMotion && (
        <video
          ref={player}
          src={video}
          poster={image}
          preload="auto"
          muted
          playsInline
          aria-hidden="true"
          style={{ objectPosition: position }}
          onLoadedMetadata={seek}
          onSeeked={seek}
          onError={event => { event.currentTarget.hidden = true; }}
        />
      )}
    </figure>
  );
}

export function EditorialScene({
  id, titleId, media, imageFirst = false, staggerCopy = false, children,
}: {
  id?: string;
  titleId: string;
  media: SceneMedia;
  imageFirst?: boolean;
  staggerCopy?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="editorial-scene" id={id} aria-labelledby={titleId} data-image-first={imageFirst}>
      <div className="editorial-inner">
        <ScrollReveal className="editorial-copy" stagger={staggerCopy}>{children}</ScrollReveal>
        <SceneVisual {...media} />
      </div>
    </section>
  );
}
