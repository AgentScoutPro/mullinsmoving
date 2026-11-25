import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export function ScrollReveal({
  children, className, stagger = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const group = useRef<HTMLDivElement>(null);
  const entered = useInView(group, { once: true, amount: 0.22 });

  if (stagger) {
    return (
      <div ref={group} className={className} data-scroll-copy={reducedMotion || entered ? "visible" : "waiting"}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: .82, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: .65, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
