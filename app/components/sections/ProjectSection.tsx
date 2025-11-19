import Reveal from "../ui/Reveal";

const projects = [
  {
    title: "Microservices Social Media App",
    lines: [
      "Engineered 5 decoupled microservices (Identity, Posts, Media) for horizontal scaling.",
      "Deployed via Google Kubernetes Engine (GKE) using Node.js and Docker.",
      "Implemented RabbitMQ event-driven architecture for reliable, asynchronous communication.",
      "Leveraged Google Cloud Build CI/CD, achieving a 90% reduction in deployment time.",
    ],
    url: "https://bloomsocial.vercel.app/",
  },
  {
    title: "Sambhram Fest — High-Performance Event Registration System",
    lines: [
      "Successfully supported 1,000+ participants and 200+ concurrent users without downtime.",
      "Frontend built with React/Vite for exceptional speed and responsiveness.",
      "Implemented secure JWT authentication and a QR code ticketing system.",
      "Designed a real-time admin dashboard for analytics and event monitoring.",
    ],
    url: "https://frontend-r35m.onrender.com/",
  },
  {
    title: "Intelligent Email Aggregator & Alert System",
    lines: [
      "Fetched emails asynchronously from multiple IMAP servers simultaneously.",
      "Integrated Gemini API for categorization and sentiment analysis of messages.",
      "Built a real-time alert pipeline with Slack and a configurable webhook.",
      "Automated workflows reducing manual processing time significantly.",
    ],
    url: "https://github.com/abhinm7/Onebox-Email-Aggregator.git",
  },
  {
    title: "Sommaire — AI PDF Summarizer",
    lines: [
      "Developed a full-stack Next.js application with optimized client-server flow.",
      "Integrated Gemini API for intelligent PDF summarization.",
      "Implemented code-splitting resulting in a 15% faster initial load.",
      "Secured API communication and managed session state efficiently.",
    ],
    url: "https://sommaire-ai-pdf-summary.vercel.app/",
  },
];

function ProjectCard({ p }: { p: (typeof projects)[0] }) {
  return (
    <div
      className="
        p-6 rounded-xl
        bg-white/10
        backdrop-blur-xs
        border border-white/20
        hover:border-blue-300/40
        shadow-[0_0_20px_rgba(0,0,0,0.03)]
        hover:shadow-[0_0_35px_rgba(0,0,0,0.06)]
        hover:bg-white/15
        transition-all duration-300
        flex flex-col justify-between
      "
    >
      <div>
        <h3 className="text-lg font-semibold mb-3 text-slate-900">
          {p.title}
        </h3>

        <div className="text-sm text-slate-700 space-y-2 mb-4">
          {p.lines.map((l, i) => (
            <div key={i}>
              <p>{l}</p>
              <div className="h-px bg-slate-300/30 mt-1"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          className="
            inline-block px-4 py-2 rounded-md text-sm font-medium
            bg-blue-600/90 text-white
            hover:bg-blue-700
            shadow-[0_4px_10px_rgba(0,0,0,0.1)]
            transition-all
          "
        >
          Visit
        </a>
      </div>
    </div>
  );
}


export default function ProjectSection() {
  return (
    <section className="py-20 border-t border-slate-200/60 text-slate-900">
      <div className="section-container">
        <Reveal>
          <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">
            Projects
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <Reveal key={p.title}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
