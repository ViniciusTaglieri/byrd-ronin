import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ease } from "../../lib/motion";

interface Props {
  children: ReactNode;
}

export function StatusAnimations({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease }}
    >
      {children}
    </motion.div>
  );
}
