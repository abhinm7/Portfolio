"use client";

import TechParticleSphere from "./TechParticleSphere";

export default function TechBackground() {
    return (
        <div className="opacity-100 fixed top-0 left-0 w-screen h-screen z-[-1]">
            <TechParticleSphere />
        </div>
    );
}
