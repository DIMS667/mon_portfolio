import { useMemo } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../context/theme";

function createItems(count, seedOffset = 0) {
  return Array.from({ length: count }, (_, index) => {
    const seed = index + 1 + seedOffset;
    return {
      id: `${seedOffset}-${index}`,
      x: (seed * 37) % 100,
      y: (seed * 61) % 100,
      size: 3 + (seed % 4),
      duration: 8 + (seed % 7),
      delay: (seed % 5) * 0.35,
      offsetX: ((seed * 29) % 80) - 40,
      offsetY: ((seed * 43) % 120) - 60,
    };
  });
}

export default function BackgroundAnimations() {
  const { background, theme, mode } = useTheme();
  const reduceMotion = useReducedMotion();
  const particles = useMemo(() => createItems(24), []);
  const gridLights = useMemo(() => createItems(6, 40), []);
  const primary = theme.colors.primary;
  const secondary = theme.colors.secondary;
  const accent = theme.colors.accent;
  const pageBackground = mode === "dark" ? theme.colors.bgDark : theme.colors.bg;

  const renderBackground = () => {
    switch (background) {
      case "particles":
        return (
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <Motion.span
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  background: primary,
                  opacity: 0.35,
                }}
                animate={reduceMotion ? undefined : {
                  x: [0, particle.offsetX, 0],
                  y: [0, -70, 0],
                  opacity: [0.18, 0.48, 0.18],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );

      case "waves":
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[0, 1, 2].map((index) => (
              <Motion.div
                key={index}
                className="absolute -left-[10%] w-[120%] rounded-[50%]"
                style={{
                  height: 360,
                  bottom: -230 - index * 45,
                  background: `linear-gradient(180deg, ${primary}${18 - index * 4}, transparent)`,
                }}
                animate={reduceMotion ? undefined : { x: [0, 55, 0], scaleX: [1, 1.08, 1] }}
                transition={{ duration: 15 + index * 3, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        );

      case "grid":
        return (
          <div className="absolute inset-0 overflow-hidden">
            <Motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${primary}18 1px, transparent 1px), linear-gradient(90deg, ${primary}18 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
              animate={reduceMotion ? undefined : { backgroundPosition: ["0px 0px", "50px 50px"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            {gridLights.map((light) => (
              <Motion.span
                key={light.id}
                className="absolute rounded-full"
                style={{
                  left: `${light.x}%`,
                  top: `${light.y}%`,
                  width: light.size,
                  height: light.size,
                  background: primary,
                  boxShadow: `0 0 18px ${primary}`,
                }}
                animate={reduceMotion ? undefined : {
                  x: [0, light.offsetX, 0],
                  y: [0, light.offsetY, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{ duration: light.duration, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        );

      case "static":
        return null;

      case "mesh":
      default:
        return (
          <Motion.div
            className="absolute -inset-[8%]"
            style={{
              background: `
                radial-gradient(at 35% 18%, ${primary}2b 0, transparent 48%),
                radial-gradient(at 82% 8%, ${secondary}22 0, transparent 44%),
                radial-gradient(at 8% 66%, ${accent}20 0, transparent 46%),
                radial-gradient(at 78% 82%, ${primary}22 0, transparent 48%)
              `,
            }}
            animate={reduceMotion ? undefined : { scale: [1, 1.04, 1], rotate: [0, 1.5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        );
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: pageBackground }} />
      {renderBackground()}
    </div>
  );
}
