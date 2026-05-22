interface Props {
  position: "top" | "bottom";
  color: string;
  className?: string;
}

export function SectionWave({ position, color, className }: Props) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        [position]: -1,
        lineHeight: 0,
        zIndex: 2,
        transform: position === "top" ? "rotate(180deg)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "52px" }}
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,26 C180,52 360,0 540,26 C720,52 900,0 1080,26 C1260,52 1380,10 1440,26 L1440,52 L0,52 Z" />
      </svg>
    </div>
  );
}
