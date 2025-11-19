import Reveal from "./Reveal";

export default function SkillsSection() {
  const skillGroups = [
    {
      title: "Frontend",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind",
        "HTML/CSS",
        "Redux", 
        "Vercel",
        "ShadCN"
      ]
    },
    {
      title: "Backend",
      skills: [
        "Node.js",
        "Express",
        "MongoDB",
        "Redis",
        "PostgreSQL/ORM",
        "JWT",
        "RESTful APIs", 
        "RabbitMQ","OAuth"
      ]
    },
    {
      title: "Other",
      skills: [
        "DSA","Docker",
        "Git/GitHub",
        "GitHub Actions", 
        "GCP","Kubernetes"
      ]
    },
  ];

  return (
    <section className="py-20 text-slate-900 border-t border-slate-200/60">
      <div className="section-container">
        <Reveal>
          <h2 className="text-3xl font-bold text-center mb-10 tracking-tight">
            Skills
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((g) => (
            <Reveal key={g.title}>
              <div
                className="
                  p-6 rounded-xl 
                  bg-white/30
                  backdrop-blur-xs
                  border border-white/30
                  shadow-[0_0_25px_rgba(0,0,0,0.05)] 
                  hover:shadow-[0_0_40px_rgba(0,0,0,0.08)]
                  transition-all duration-300
                "
              >
                <h3 className="font-semibold text-lg text-slate-800 mb-4">
                  {g.title}
                </h3>

                <ul className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li
                      key={s}
                      className="
                        px-3 py-1 rounded-full 
                        text-sm font-medium 
                        bg-blue-50/60 
                        text-blue-700 
                        border border-blue-100 
                        backdrop-blur-sm
                      "
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
