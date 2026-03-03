/**
 * MusajilLogo — Official Musajil brand logo component
 *
 * Uses the actual Musajil logo PNG (/musajil-logo.png) which contains the full
 * horizontal lockup (M icon + "Musajil" wordmark) on a white background.
 *
 * Variants:
 *  - "default"   : Full-color navy logo  (white/light backgrounds — Home nav, Login card, Register card)
 *  - "white"     : White-recolored logo  (dark/blue backgrounds — Login panel, Register panel, Footer)
 *  - "sidebar"   : Full-color navy logo  (white sidebar — same as default but explicit)
 *  - "icon-only" : Just the M icon portion, navy (uses SVG mark)
 *  - "icon-white": Just the M icon portion, white (uses SVG mark)
 *
 * Sizes (logo image height):
 *  - "sm"  : 36px   — compact areas
 *  - "md"  : 48px   — sidebars, standard navbars (default)
 *  - "lg"  : 64px   — hero navbars, auth panels
 *  - "xl"  : 88px   — large hero / splash screens
 */

import React from "react";

type LogoVariant = "default" | "white" | "sidebar" | "icon-only" | "icon-white";
type LogoSize = "sm" | "md" | "lg" | "xl";

interface MusajilLogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
}

const heightMap: Record<LogoSize, number> = {
  sm: 18,
  md: 24,
  lg: 32,
  xl: 44,
};

/**
 * Inline SVG of the Musajil M mark — used for icon-only variants.
 */
function MIconSVG({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer M body */}
      <path
        d="M8 80 L8 20 Q8 8 20 8 Q32 8 32 20 L32 48 L50 28 L68 48 L68 20 Q68 8 80 8 Q92 8 92 20 L92 80 Q92 92 80 92 Q68 92 68 80 L68 62 L56 50 L56 74 Q56 84 50 84 Q44 84 44 74 L44 50 L32 62 L32 80 Q32 92 20 92 Q8 92 8 80 Z"
        fill={color}
      />
      {/* Inner M notch highlight */}
      <path
        d="M32 40 L32 30 L50 14 L68 30 L68 40 L50 24 Z"
        fill={color === "#ffffff" ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.30)"}
      />
    </svg>
  );
}

export function MusajilLogo({
  variant = "default",
  size = "md",
  className = "",
}: MusajilLogoProps) {
  const h = heightMap[size];

  // Icon-only variants — render SVG mark only
  if (variant === "icon-only") {
    return (
      <span className={`inline-flex items-center shrink-0 ${className}`}>
        <MIconSVG size={h} color="#1e2fa3" />
      </span>
    );
  }

  if (variant === "icon-white") {
    return (
      <span className={`inline-flex items-center shrink-0 ${className}`}>
        <MIconSVG size={h} color="#ffffff" />
      </span>
    );
  }

  // Full lockup variants — use the actual PNG logo
  const isWhite = variant === "white";

  return (
    <span
      className={`inline-flex items-center shrink-0 ${className}`}
      aria-label="Musajil"
    >
      <img
        src="/musajil-logo.png"
        alt="Musajil"
        style={{
          height: h,
          width: "auto",
          maxWidth: "none",
          objectFit: "contain",
          display: "block",
          filter: isWhite ? "brightness(0) invert(1)" : "none",
        }}
      />
    </span>
  );
}

export default MusajilLogo;
