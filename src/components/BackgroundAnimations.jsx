import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";

export default function BackgroundAnimations() {
  const { background, theme, mode } = useTheme();
  const [particles, setParticles] = useState([]);

  // Générer des particules pour l'animation "particles"
  useEffect(() => {
    if (background === "particles") {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      }));
      setParticles(newParticles);
    }
  }, [background]);

  // Couleurs basées sur le thème
  const primaryColor = theme.colors.primary;
  const secondaryColor = theme.colors.secondary;
  const accentColor = theme.colors.accent;

  // Fond selon le type sélectionné
  const renderBackground = () => {
    switch (background) {
      case "particles":
        return (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  background: primaryColor,
                  opacity: 0.4,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.2, 1],
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
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full"
                style={{
                  height: "400px",
                  bottom: `-${i * 50}px`,
                  background: `linear-gradient(180deg, ${primaryColor}${Math.floor((5 - i) * 4).toString(16).padStart(2, '0')}, transparent)`,
                  borderRadius: "50%",
                }}
                animate={{
                  x: [0, 100, 0],
                  scaleX: [1, 1.2, 1],
                }}
                transition={{
                  duration: 15 + i * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        );

      case "mesh":
        return (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(at 40% 20%, ${primaryColor}33 0px, transparent 50%),
                  radial-gradient(at 80% 0%, ${secondaryColor}33 0px, transparent 50%),
                  radial-gradient(at 0% 50%, ${accentColor}33 0px, transparent 50%),
                  radial-gradient(at 80% 80%, ${primaryColor}33 0px, transparent 50%),
                  radial-gradient(at 0% 100%, ${secondaryColor}33 0px, transparent 50%)
                `,
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );

      case "grid":
        return (
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Grille horizontale */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: `linear-gradient(${primaryColor}22 1px, transparent 1px)`,
              backgroundSize: "100% 50px",
            }}>
              <motion.div
                className="h-full w-full"
                animate={{ y: [0, 50, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            {/* Grille verticale */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: `linear-gradient(90deg, ${primaryColor}22 1px, transparent 1px)`,
              backgroundSize: "50px 100%",
            }}>
              <motion.div
                className="h-full w-full"
                animate={{ x: [0, 50, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Points lumineux qui se déplacent */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: primaryColor,
                  boxShadow: `0 0 20px ${primaryColor}`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 200 - 100, 0],
                  y: [0, Math.random() * 200 - 100, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        );

      case "static":
        return (
          <div 
            className="fixed inset-0 pointer-events-none"
            style={{
              background: mode === "dark" 
                ? theme.colors.bgDark 
                : theme.colors.bg
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 -z-10">
      {/* Couleur de fond de base */}
      <div 
        className="absolute inset-0"
        style={{
          background: mode === "dark" 
            ? theme.colors.bgDark 
            : theme.colors.bg
        }}
      />
      {/* Animation par-dessus */}
      {renderBackground()}
    </div>
  );
}