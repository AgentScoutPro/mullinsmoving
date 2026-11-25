import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function ScrollReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

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
