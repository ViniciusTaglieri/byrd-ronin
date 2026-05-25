import { motion } from "framer-motion";

interface Props {
  className?: string;
}

export function SlashDivider({ className = "" }: Props) {
  return (
    <div className={`relative flex items-center justify-center py-2 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="relative flex items-center gap-3 w-full max-w-[min(1160px,calc(100%-40px))] mx-auto px-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="flex-1 h-px bg-bamboo/20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />

        <motion.span
          className="font-display text-bamboo/40 text-sm tracking-widest select-none"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, delay: 0.3 }}
        >
          ／
        </motion.span>

        <motion.div
          className="flex-1 h-px bg-bamboo/20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 1 }}
        />
      </motion.div>
    </div>
  );
}
