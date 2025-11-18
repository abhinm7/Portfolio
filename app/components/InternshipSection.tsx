import Reveal from "./Reveal";

export default function InternshipSection() {
  return (
    <section className="py-20 bg-[#0a0a0a] text-white px-6">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Internship
        </h2>
      </Reveal>

      <Reveal>
        <div className="max-w-3xl mx-auto border border-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-semibold">
            Software Developer Intern — Tummoc
          </h3>
          <p className="text-gray-400 mt-2">
            Worked on full-stack features, backend services, and production
            debugging.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
