import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { STEAM_URL } from "../../consts";
import { SteamIcon } from "./SteamIcon";

const buttonVariants = cva(
  "inline-flex min-h-[48px] items-center justify-center gap-[10px] px-5 py-[13px] border-2 border-transparent rounded-md font-display text-[18px] font-bold leading-none uppercase transition-[transform,box-shadow,background] duration-[160ms] relative overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-gradient-to-b from-[#ff3b2e] to-red shadow-[0_8px_0_#870707,0_18px_36px_rgba(242,19,19,0.32)]",
        secondary: "text-black bg-gold",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

interface Props extends VariantProps<typeof buttonVariants> {
  label?: string;
  event?: string;
  className?: string;
}

export function SteamButtonAnimated({
  label = "JOGAR AGORA",
  variant = "primary",
  event = "steam_cta_click",
  className,
}: Props) {
  const isPrimary = variant === "primary";

  return (
    <motion.a
      href={STEAM_URL}
      target="_blank"
      rel="noreferrer"
      data-event={event}
      className={[buttonVariants({ variant }), className]
        .filter(Boolean)
        .join(" ")}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: {
          scale: 1,
          y: 0,
          boxShadow: isPrimary
            ? "0 8px 0 #870707, 0 18px 36px rgba(242,19,19,0.28)"
            : "0 6px 0 #7a740d",
        },
        hover: {
          scale: 1.04,
          y: -2,
          boxShadow: isPrimary
            ? "0 10px 0 #870707, 0 22px 44px rgba(242,19,19,0.42)"
            : "0 8px 0 #7a740d, 0 16px 32px rgba(191,181,44,0.3)",
          transition: { duration: 0.15, ease: "easeOut" },
        },
        tap: {
          scale: 0.97,
          y: 3,
          boxShadow: isPrimary ? "0 4px 0 #870707" : "0 3px 0 #7a740d",
          transition: { duration: 0.08 },
        },
      }}
    >
      <SteamIcon size={18} />
      <span>{label}</span>

      {/* Shimmer overlay */}
      <motion.span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "200% 0",
          pointerEvents: "none",
        }}
        variants={{
          rest: { backgroundPosition: "200% 0" },
          hover: {
            backgroundPosition: "-100% 0",
            transition: { duration: 0.55, ease: "easeInOut" },
          },
        }}
      />
    </motion.a>
  );
}
