import ParticleField from "./components/ParticleField";

export default function Home() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* 3D background */}
      <ParticleField />

      {/* Foreground */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl font-bold mb-4">ABHIN M</h1>
        <p className="text-lg text-gray-300">
          Full Stack Developer • MERN • Next.js • TypeScript
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/AbhinM_Resume.pdf"
            className="px-6 py-3 bg-white text-black rounded-md font-medium"
          >
            Download Resume
          </a>
          <a
            href="#projects"
            className="px-6 py-3 border border-gray-500 rounded-md hover:bg-white/10"
          >
            View Projects
          </a>
        </div>
      </div>

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black"></div>

    </section>
  );
}
