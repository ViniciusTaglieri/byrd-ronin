import { motion } from "framer-motion";
import type { ReactNode, ElementType } from "react";

type Variant = "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft";

interface Props {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
  tag?: ElementType;
}

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
};

export function AnimatedSection({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.55,
  className,
  amount = 0.2,
  tag = "div",
}: Props) {
  const MotionTag = motion.create(tag as ElementType);

  return (
    <MotionTag
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

// Container que stagger os filhos
interface StaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  amount?: number;
  tag?: ElementType;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.1,
  className,
  amount = 0.15,
  tag = "div",
}: StaggerProps) {
  const MotionTag = motion.create(tag as ElementType);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

// Item filho para usar dentro de StaggerContainer
interface StaggerItemProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  tag?: ElementType;
}

export function StaggerItem({
  children,
  variant = "fadeUp",
  className,
  tag = "div",
}: StaggerItemProps) {
  const MotionTag = motion.create(tag as ElementType);

  return (
    <MotionTag
      className={className}
      variants={variants[variant]}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
