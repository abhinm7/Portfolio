export default function ProjectSection() {
  const projects = [
    {
      title: "Microservices Social App",
      desc: "Node + Docker + GKE event-driven social platform.",
    },
    {
      title: "AI PDF Summarizer",
      desc: "Next.js + Gemini AI summarization tool.",
    },
    {
      title: "Fest Registration System",
      desc: "2000+ registrations, QR verification, secure JWT system.",
    },
    {
      title: "MEV Bot Detector",
      desc: "Rust + WASM + Node to detect mempool sandwich attacks.",
    },
  ];

  return (
    <section className="py-20 bg-black text-white px-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projects.map((p) => (
          <div
            key={p.title}
            className="border border-white/10 p-6 rounded-xl hover:bg-white/5 transition"
          >
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="text-gray-400 mt-2">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
