"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function HeaderSection() {
    const [short, setShort] = useState(false);

    useEffect(() => {
        // Sets 'short' to true if the window width is less than 640px (Tailwind 'sm' breakpoint)
        const onResize = () => setShort(window.innerWidth < 640);

        onResize(); // Initial check
        window.addEventListener("resize", onResize);

        // Cleanup function to remove event listener
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <header className="min-h-screen flex flex-col items-center justify-center">
            <div className="section-container text-center py-20">

                <h1
                    className={`font-extrabold text-slate-900 ${short ? "text-4xl" : "text-6xl"} leading-tight`}
                >
                    ABHIN M
                </h1>

                <p className="mt-4 text-lg text-slate-700">Full Stack Developer</p>

                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    {[
                        "React",
                        "Next.js",
                        "TypeScript",
                        "Node.js",
                        "Express",
                        "MongoDB",
                        "Docker",
                    ].map((t) => (
                        <span
                            key={t}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100"
                        >
                            {t}

                        </span>
                    ))}
                </div>

                <div className="mt-8">
                    <a
                        href="/abhinm_2025.pdf"
                        target="_blank"
                        className="
                          inline-flex items-center gap-2
                          px-4 py-2 sm:px-5 sm:py-2.5 
                          rounded-2xl sm:rounded-3xl 
                          bg-white/20 backdrop-blur-sm 
                          border border-blue-200 text-blue-700 
                          font-medium text-sm sm:text-base 
                          shadow-[0_3px_10px_rgba(0,0,0,0.05)]
                          hover:bg-white/30 hover:shadow-[0_5px_15px_rgba(0,0,0,0.08)] 
                          transition-all
                        "
                    >
                        <Download size={18} className="sm:w-5 sm:h-5 w-4 h-4" />
                        Download Resume
                    </a>
                </div>
            </div>
        </header>
    );
}