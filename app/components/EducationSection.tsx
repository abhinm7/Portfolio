import Reveal from "./Reveal";

export default function EducationSection() {
  const education = [
    {
      school: "Shree Devi Institute of Technology",
      degree: "Bachelor of Engineering — Computer Science and Engineering",
      university: "Visvesvaraya Technological University",
      cgpa: "7.3 CGPA",
      range: "2020 — 2024",
    },
  ];

  return (
    <section className="py-20 border-t border-slate-200/60 text-slate-900">
      <div className="section-container">
        <Reveal>
          <h2 className="text-3xl font-bold mb-12 text-center tracking-tight">
            Education
          </h2>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((e) => (
            <Reveal key={e.school}>
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
                <h3 className="font-semibold text-lg text-slate-900">
                  {e.school}
                </h3>

                <p className="text-sm text-slate-700 mt-1">{e.degree}</p>

                <p className="text-sm text-slate-600 mt-1">
                  {e.university}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  {e.range}
                </p>

                <p className="text-sm text-slate-700 mt-2 font-medium">
                  CGPA: {e.cgpa}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
