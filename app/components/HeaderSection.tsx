"use client";

import { useEffect, useState } from "react";
import ParticleField from "./ParticleField";

export default function HeaderSection() {
  const [fade, setFade] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const opacity = Math.min(window.scrollY / 300, 1);
      setFade(opacity);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <ParticleField />

      <div
        className="relative z-10 text-center transition duration-300 px-4"
        style={{
          opacity: 1 - fade,
          transform: `scale(${1 - fade * 0.1})`,
          filter: `blur(${fade * 2}px)`,
        }}
      >
        <h1 className="font-bold text-5xl md:text-7xl mb-4">
          ABHIN M
        </h1>

        <p className="text-lg md:text-2xl text-gray-300">
          Full Stack Developer • MERN • Next.js • TypeScript
        </p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black" />
    </section>
  );
}
