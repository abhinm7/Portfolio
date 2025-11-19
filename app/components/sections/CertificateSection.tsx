import Reveal from "../ui/Reveal";

export default function CertificateSection() {
  const certificates = [
    "Google Cloud Fundamentals",
    "Next.js Advanced Course",
    "Docker & Kubernetes Basics",
  ];

  return (
    <section className="py-20 bg-black text-white px-6">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Certificates
        </h2>
      </Reveal>

      <div className="max-w-3xl mx-auto space-y-4">
        {certificates.map((c) => (
          <Reveal key={c}>
            <div className="border border-white/10 p-4 rounded-xl">
              <p className="text-gray-300">{c}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
