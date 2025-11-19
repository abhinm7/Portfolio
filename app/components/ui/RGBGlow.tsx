"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function RGBGlow() {
  const { scrollY } = useScroll();

  // glow opacity increases from 0 → 1 as you scroll 0 → 200px
  const opacity = useTransform(scrollY, [0, 200], [0.1, 0.6]);

  // color cycling: red -> green -> blue smoothly
  const r = useTransform(scrollY, [0, 300], [255, 80]);
  const g = useTransform(scrollY, [0, 300], [80, 255]);
  const b = useTransform(scrollY, [0, 300], [120, 200]);

  return (
    <motion.div
      style={{
        opacity,
        background: `radial-gradient(circle at center,
          rgba(${r.get()}, ${g.get()}, ${b.get()}, 0.35),
          transparent 70%)`,
      }}
      className="absolute inset-0 -z-10 blur-3xl"
    />
  );
}
