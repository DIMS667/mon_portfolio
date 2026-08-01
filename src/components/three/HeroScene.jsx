import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import { MathUtils } from "three";

const codeLines = [
  { x: -0.78, y: 0.45, width: 1.05, color: "#22d3ee" },
  { x: -0.55, y: 0.2, width: 1.48, color: "#818cf8" },
  { x: -0.68, y: -0.05, width: 1.2, color: "#38bdf8" },
  { x: -0.42, y: -0.3, width: 1.7, color: "#a78bfa" },
  { x: -0.74, y: -0.55, width: 1.08, color: "#60a5fa" },
];

function Laptop() {
  return (
    <group rotation={[0.02, -0.2, 0]}>
      <RoundedBox args={[3.25, 0.18, 2.05]} radius={0.09} smoothness={4} position={[0, -0.08, 0.18]}>
        <meshStandardMaterial color="#1e293b" metalness={0.88} roughness={0.24} />
      </RoundedBox>
      <RoundedBox args={[2.6, 0.025, 1.25]} radius={0.05} smoothness={3} position={[0, 0.025, 0.22]}>
        <meshStandardMaterial color="#020617" metalness={0.55} roughness={0.44} />
      </RoundedBox>
      {Array.from({ length: 7 }).map((_, column) =>
        Array.from({ length: 4 }).map((__, row) => (
          <mesh key={`${column}-${row}`} position={[-0.88 + column * 0.29, 0.045, -0.14 + row * 0.24]}>
            <boxGeometry args={[0.22, 0.018, 0.14]} />
            <meshStandardMaterial color={row === 0 ? "#1d4ed8" : "#334155"} metalness={0.4} roughness={0.5} />
          </mesh>
        )),
      )}
      <RoundedBox args={[0.88, 0.018, 0.5]} radius={0.04} smoothness={3} position={[0, 0.05, 0.76]}>
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.4} />
      </RoundedBox>

      <group position={[0, 1.15, -0.78]} rotation={[-0.07, 0, 0]}>
        <RoundedBox args={[3.2, 2, 0.13]} radius={0.12} smoothness={5}>
          <meshStandardMaterial color="#182235" metalness={0.9} roughness={0.22} />
        </RoundedBox>
        <mesh position={[0, 0, 0.072]}>
          <planeGeometry args={[2.96, 1.75]} />
          <meshStandardMaterial color="#030712" emissive="#061b3a" emissiveIntensity={0.72} />
        </mesh>
        <mesh position={[-1.25, 0, 0.082]}>
          <planeGeometry args={[0.28, 1.55]} />
          <meshBasicMaterial color="#071426" />
        </mesh>
        {codeLines.map((line) => (
          <mesh key={line.y} position={[line.x + line.width / 2, line.y, 0.088]}>
            <planeGeometry args={[line.width, 0.055]} />
            <meshBasicMaterial color={line.color} toneMapped={false} />
          </mesh>
        ))}
        <mesh position={[0, 0.8, 0.084]}>
          <planeGeometry args={[2.9, 0.06]} />
          <meshBasicMaterial color="#0f2b55" />
        </mesh>
      </group>
    </group>
  );
}

function Platform() {
  return (
    <group position={[0, -1.22, 0]}>
      <mesh>
        <cylinderGeometry args={[2.25, 2.45, 0.32, 64]} />
        <meshStandardMaterial color="#0f172a" metalness={0.92} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <torusGeometry args={[1.95, 0.035, 12, 96]} />
        <meshBasicMaterial color="#22d3ee" toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.17, 0]}>
        <cylinderGeometry args={[2.48, 2.48, 0.04, 64]} />
        <meshBasicMaterial color="#2563eb" toneMapped={false} />
      </mesh>
    </group>
  );
}

function FloatingShapes({ reducedMotion }) {
  const shapes = [
    { position: [-2.5, 1.65, -0.5], color: "#2563eb", geometry: "octa" },
    { position: [2.65, 1.25, -0.2], color: "#7c3aed", geometry: "box" },
    { position: [-2.25, -0.45, 0.4], color: "#38bdf8", geometry: "box" },
    { position: [2.35, -0.55, 0.6], color: "#4f46e5", geometry: "sphere" },
  ];

  return shapes.map((shape, index) => (
    <Float
      key={shape.position.join("-")}
      speed={reducedMotion ? 0 : 1 + index * 0.12}
      rotationIntensity={reducedMotion ? 0 : 0.8}
      floatIntensity={reducedMotion ? 0 : 0.65}
    >
      <mesh position={shape.position} rotation={[index * 0.3, index * 0.5, 0.4]}>
        {shape.geometry === "octa" ? <octahedronGeometry args={[0.34, 0]} /> : null}
        {shape.geometry === "box" ? <boxGeometry args={[0.48, 0.48, 0.48]} /> : null}
        {shape.geometry === "sphere" ? <sphereGeometry args={[0.28, 24, 24]} /> : null}
        <meshStandardMaterial color={shape.color} emissive={shape.color} emissiveIntensity={0.25} metalness={0.7} roughness={0.22} />
      </mesh>
    </Float>
  ));
}

function Scene({ reducedMotion }) {
  const rig = useRef(null);

  useFrame(({ pointer, clock }) => {
    if (!rig.current) return;
    const targetX = reducedMotion ? 0 : pointer.y * 0.08;
    const targetY = reducedMotion ? -0.08 : pointer.x * 0.18 - 0.08;
    rig.current.rotation.x = MathUtils.lerp(rig.current.rotation.x, targetX, 0.035);
    rig.current.rotation.y = MathUtils.lerp(rig.current.rotation.y, targetY, 0.035);
    rig.current.position.y = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.7) * 0.035;
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={2.3} color="#dbeafe" />
      <pointLight position={[-4, 1.5, 2]} intensity={26} color="#2563eb" distance={8} />
      <pointLight position={[3, 0.5, 3]} intensity={20} color="#8b5cf6" distance={7} />
      <group ref={rig} scale={0.94} position={[0, 0, 0]}>
        <Laptop />
        <Platform />
        <FloatingShapes reducedMotion={reducedMotion} />
      </group>
      <Sparkles count={34} scale={[7, 5, 3]} size={2.3} speed={reducedMotion ? 0 : 0.25} color="#60a5fa" opacity={0.65} />
    </>
  );
}

export default function HeroScene({ reducedMotion = false }) {
  return (
    <div className="h-full min-h-[430px] w-full" role="img" aria-label="Ordinateur portable 3D présentant une interface de développement">
      <Canvas
        aria-hidden="true"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.65, 7.4], fov: 39 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
