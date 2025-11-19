import Reveal from "../ui/Reveal";

export default function InternshipSection() {
  const internships = [
    {
      org: "Rooman Technologies",
      role: "Software Developer Intern",
      range: "Jun 2024 — Aug 2024",
      desc: "Worked on feature development, bug fixes, and API integrations.",
    },
    {
      org: "Skollar",
      role: "Frontend Intern",
      range: "Sep 2023 — Dec 2023",
      desc: "Built interactive components and optimized UI for mobile.",
    },
  ];

  return (
    <section className="py-20 border-t backdrop-blur-xs border-slate-200/60 text-slate-900">
      <div className="section-container">
        <Reveal>
          <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">
            Internships
          </h2>
        </Reveal>

        <div className="space-y-8 max-w-3xl mx-auto">
          {internships.map((it) => (
            <Reveal key={it.org}>
              <div
                className="
                  p-6 rounded-xl
                  bg-white/10
                  backdrop-blur-xs
                  border border-white/20
                  shadow-[0_0_20px_rgba(0,0,0,0.03)]
                  hover:shadow-[0_0_35px_rgba(0,0,0,0.06)]
                  hover:bg-white/15
                  transition-all duration-300
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">
                      {it.org}
                    </h3>

                    <p className="text-sm text-slate-700">{it.role}</p>

                    <p className="text-sm text-slate-500 mt-1">
                      {it.range}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-slate-700 text-sm leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
