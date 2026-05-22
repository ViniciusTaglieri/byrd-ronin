// Ícones pixel art SVG inline para as 3 features
// width/height removidos — preenchidos pelo container (w-16 h-16) via style="width:100%;height:100%"
// fill="currentColor" herda a cor do wrapper (text-gold, text-blue-light, text-red)

export function UpgradeIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges" style={{ width: "100%", height: "100%" }}>
      <rect x="14" y="2" width="4" height="14" fill="currentColor" />
      <rect x="12" y="4" width="8" height="2" fill="currentColor" />
      <rect x="10" y="12" width="12" height="3" fill="currentColor" opacity="0.6" />
      <rect x="14" y="15" width="4" height="10" fill="currentColor" opacity="0.8" />
      <rect x="13" y="24" width="6" height="3" fill="currentColor" opacity="0.5" />
      <rect x="15" y="0" width="2" height="3" fill="currentColor" opacity="0.7" />
      <rect x="13" y="1" width="2" height="2" fill="currentColor" opacity="0.7" />
      <rect x="17" y="1" width="2" height="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function EnemyIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges" style={{ width: "100%", height: "100%" }}>
      <rect x="8" y="6" width="16" height="14" fill="currentColor" opacity="0.15" />
      <rect x="6" y="8" width="20" height="10" fill="currentColor" opacity="0.15" />
      <rect x="10" y="10" width="4" height="4" fill="currentColor" />
      <rect x="18" y="10" width="4" height="4" fill="currentColor" />
      <rect x="11" y="11" width="2" height="2" fill="currentColor" opacity="0.6" />
      <rect x="19" y="11" width="2" height="2" fill="currentColor" opacity="0.6" />
      <rect x="6" y="6" width="20" height="4" fill="currentColor" opacity="0.7" />
      <rect x="4" y="8" width="2" height="4" fill="currentColor" opacity="0.7" />
      <rect x="26" y="8" width="2" height="4" fill="currentColor" opacity="0.7" />
      <rect x="12" y="16" width="8" height="2" fill="currentColor" opacity="0.4" />
      <rect x="14" y="18" width="4" height="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function ChaosIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges" style={{ width: "100%", height: "100%" }}>
      <rect x="14" y="2" width="4" height="4" fill="currentColor" />
      <rect x="10" y="4" width="4" height="4" fill="currentColor" opacity="0.7" />
      <rect x="18" y="4" width="4" height="4" fill="currentColor" opacity="0.7" />
      <rect x="6" y="8" width="4" height="4" fill="currentColor" opacity="0.5" />
      <rect x="22" y="8" width="4" height="4" fill="currentColor" opacity="0.5" />
      <rect x="8" y="12" width="16" height="10" fill="currentColor" opacity="0.8" />
      <rect x="6" y="14" width="20" height="6" fill="currentColor" opacity="0.6" />
      <rect x="10" y="10" width="12" height="14" fill="currentColor" opacity="0.9" />
      <rect x="12" y="13" width="8" height="6" fill="currentColor" opacity="0.3" />
      <rect x="2" y="12" width="6" height="2" fill="currentColor" />
      <rect x="24" y="12" width="6" height="2" fill="currentColor" />
      <rect x="14" y="24" width="4" height="6" fill="currentColor" />
      <rect x="4" y="22" width="4" height="4" fill="currentColor" opacity="0.6" />
      <rect x="24" y="22" width="4" height="4" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
