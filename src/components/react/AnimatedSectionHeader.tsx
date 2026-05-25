import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function AnimatedSectionHeader({ eyebrow, title, align = "left" }: Props) {
  const isCenter = align === "center";
  return (
    <motion.div
      className={`max-w-2xl mb-10 ${isCenter ? "mx-auto text-center" : ""}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.p
        className="mb-3.5 text-bamboo font-display text-xl uppercase"
        variants={itemVariants}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        className="font-display text-4xl md:text-6xl xl:text-7xl text-white leading-tight"
        variants={itemVariants}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}
