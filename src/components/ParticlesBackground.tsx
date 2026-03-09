"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      className="absolute inset-0 -z-10"
      options={{
        background: { color: { value: "transparent" } },
        particles: {
          number: { value: 40 },
          color: { value: "#6366f1" },
          links: {
            enable: true,
            distance: 150,
            color: "#6366f1",
            opacity: 0.3,
          },
          move: { enable: true, speed: 1 },
          opacity: { value: 0.4 },
          size: { value: { min: 1, max: 3 } },
        },
      }}
    />
  );
}