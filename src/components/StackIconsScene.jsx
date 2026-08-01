import { useEffect, useRef } from "react";
import * as THREE from "three";
import profile from "../data/profile.json";
import { useReducedMotion } from "../hooks/useReducedMotion";

function drawReactIcon(context, center, icon) {
  context.save();
  context.translate(center, center);
  context.strokeStyle = icon.foreground;
  context.lineWidth = 7;

  for (let index = 0; index < 3; index += 1) {
    context.save();
    context.rotate((Math.PI / 3) * index);
    context.beginPath();
    context.ellipse(0, 0, 60, 23, 0, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }

  context.fillStyle = icon.foreground;
  context.beginPath();
  context.arc(0, 0, 11, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function drawGitIcon(context, center, icon) {
  context.save();
  context.translate(center, center);
  context.strokeStyle = icon.foreground;
  context.fillStyle = icon.foreground;
  context.lineWidth = 7;
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(-38, 38);
  context.lineTo(38, -38);
  context.stroke();
  context.beginPath();
  context.moveTo(8, -8);
  context.quadraticCurveTo(36, -4, 38, -38);
  context.stroke();

  [[-38, 38], [8, -8], [38, -38]].forEach(([x, y]) => {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fill();
  });
  context.restore();
}

function drawMonogram(context, center, radius, icon) {
  context.fillStyle = icon.foreground;
  context.textAlign = "center";
  context.textBaseline = "middle";
  let fontSize = icon.fontSize || 60;
  const maxWidth = radius * 1.55;
  context.font = `800 ${fontSize}px "Space Grotesk", sans-serif`;

  while (context.measureText(icon.label).width > maxWidth && fontSize > 22) {
    fontSize -= 2;
    context.font = `800 ${fontSize}px "Space Grotesk", sans-serif`;
  }

  context.fillText(icon.label, center, center + 2);
}

function makeIconTexture(icon) {
  const size = 200;
  const center = size / 2;
  const radius = 84;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  context.beginPath();
  context.arc(center, center, radius, 0, Math.PI * 2);
  context.fillStyle = icon.background;
  context.fill();
  context.lineWidth = 8;
  context.strokeStyle = "#1D1B2E";
  context.stroke();

  if (icon.type === "react") drawReactIcon(context, center, icon);
  else if (icon.type === "git") drawGitIcon(context, center, icon);
  else drawMonogram(context, center, radius, icon);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export default function StackIconsScene() {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest(".reference-hero");
    if (!canvas || !hero) return undefined;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 9;
    const group = new THREE.Group();
    const sprites = profile.sceneIcons.map((icon, index) => {
      const texture = makeIconTexture(icon);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(1.5, 1.5, 1);
      sprite.position.set(...icon.position);
      sprite.userData = {
        baseY: icon.position[1],
        speed: 0.52 + index * 0.055,
        amplitude: 0.16 + (index % 3) * 0.045,
        wobbleSpeed: 0.42 + index * 0.04,
        wobbleAmplitude: 0.1 + (index % 2) * 0.035,
        phase: index * 0.92,
      };
      group.add(sprite);
      return sprite;
    });
    scene.add(group);

    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId;
    const clock = new THREE.Clock();

    const resize = () => {
      const width = Math.max(1, hero.clientWidth);
      const height = Math.max(1, hero.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (reducedMotion) renderer.render(scene, camera);
    };

    const handlePointerMove = (event) => {
      const bounds = hero.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();
      sprites.forEach((sprite) => {
        const motion = sprite.userData;
        sprite.position.y =
          motion.baseY + Math.sin(elapsed * motion.speed + motion.phase) * motion.amplitude;
        sprite.material.rotation =
          Math.sin(elapsed * motion.wobbleSpeed + motion.phase) * motion.wobbleAmplitude;
      });
      currentX += (pointerX - currentX) * 0.04;
      currentY += (pointerY - currentY) * 0.04;
      group.rotation.y = currentX * 0.2;
      group.rotation.x = -currentY * 0.12;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (hasFinePointer && !reducedMotion) {
      hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    }
    window.addEventListener("resize", resize, { passive: true });

    if (reducedMotion) renderer.render(scene, camera);
    else render();

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      hero.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      sprites.forEach((sprite) => {
        sprite.material.map?.dispose();
        sprite.material.dispose();
      });
      renderer.dispose();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
