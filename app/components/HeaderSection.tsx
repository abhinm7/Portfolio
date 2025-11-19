"use client";

import { useEffect, useState } from "react";

export default function HeaderSection() {
    const [short, setShort] = useState(false);

    useEffect(() => {
        const onResize = () => setShort(window.innerWidth < 640);
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <header className="min-h-screen flex flex-col items-center justify-center">
            <div className="section-container text-center py-20">

                <h1 className={`font-extrabold text-slate-900 ${short ? "text-4xl" : "text-6xl"} leading-tight`}>
                    ABHIN M
                </h1>

                <p className="mt-4 text-lg text-slate-700">
                    Full Stack Developer
                </p>

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

            </div>
        </header>
    );
}
