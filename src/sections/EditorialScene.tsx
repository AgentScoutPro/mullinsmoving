import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

type SceneMedia = { image: string; description: string; video?: string; position?: string };

export function SceneVisual({ image, description, video, position = "center" }: SceneMedia) {
  const scene = useRef<HTMLElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const nearScene = useInView(scene, { margin: "280px 0px", once: true });
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.025, 1.075]);
  const y = useTransform(scrollYProgress, [0, 1], ["-1%", "1%"]);

  function seek() {
    const video = player.current;
    if (!video || video.seeking || !Number.isFinite(video.duration)) return;
    const progress = Math.max(0, Math.min((scrollYProgress.get() - .1) / .8, 1));
    const time = progress * Math.max(0, video.duration - .05);
    if (Math.abs(video.currentTime - time) >= 1 / 30) video.currentTime = time;
  }

  useMotionValueEvent(scrollYProgress, "change", seek);

  return (
    <figure ref={scene} className="editorial-visual">
      <motion.img
        src={image}
        alt={description}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: position, scale: reducedMotion || video ? 1 : scale, y: reducedMotion || video ? 0 : y }}
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
  id, titleId, media, imageFirst = false, children,
}: {
  id?: string;
  titleId: string;
  media: SceneMedia;
  imageFirst?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="editorial-scene" id={id} aria-labelledby={titleId} data-image-first={imageFirst}>
      <div className="editorial-inner">
        <ScrollReveal className="editorial-copy">{children}</ScrollReveal>
        <SceneVisual {...media} />
      </div>
    </section>
  );
}
