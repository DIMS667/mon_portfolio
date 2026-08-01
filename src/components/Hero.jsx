import { lazy, Suspense, useEffect, useRef, useState } from "react";
import profile from "../data/profile.json";
import { useReducedMotion } from "../hooks/useReducedMotion";

const StackIconsScene = lazy(() => import("./StackIconsScene"));

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || profile.roles.length < 2) return undefined;

    const interval = window.setInterval(() => {
      setRoleVisible(false);
      timeoutRef.current = window.setTimeout(() => {
        setRoleIndex((current) => (current + 1) % profile.roles.length);
        setRoleVisible(true);
      }, 240);
    }, 2600);

    return () => {
      window.clearInterval(interval);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [reducedMotion]);

  return (
    <header id="accueil" className="reference-hero">
      <div className="reference-hero-canvas">
        <Suspense fallback={null}>
          <StackIconsScene />
        </Suspense>
      </div>

      <div className="reference-wrap reference-hero-content">
        <div>
          <p className="reference-eyebrow">{profile.ui.heroEyebrow}</p>
          <h1 className="reference-title">
            {profile.ui.heroTitlePrefix}{" "}
            <span>{profile.ui.heroTitleAccent}</span>{" "}
            {profile.ui.heroTitleSuffix}
          </h1>

          <p className="reference-role">
            <span className="reference-prompt">$</span> {profile.ui.heroPrompt} :{" "}
            <span className={roleVisible ? "role-visible" : "role-hidden"}>
              {profile.roles[roleIndex]}
            </span>
          </p>

          <div className="reference-hero-ctas">
            <a href="#projets" className="reference-button reference-button-coral">{profile.ui.viewProjects}</a>
            <a href="#contact" className="reference-button reference-button-paper">{profile.ui.contactMe}</a>
          </div>

          <p className="reference-scroll-cue">{profile.ui.scrollCue}</p>
        </div>
      </div>
    </header>
  );
}
