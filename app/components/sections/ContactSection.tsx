"use client";

import Reveal from "../ui/Reveal";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

export default function ContactSection() {
  // 1. Define your data array 
  const contactLinks = [
    {
      icon: Mail,
      href: "mailto:abhin18m@gmail.com",
      label: "abhin18m@gmail.com",
    },
    {
      icon: Phone,
      href: "tel:+919562620848",
      label: "+91 95626 20848",
    },
    {
      icon: Github,
      href: "https://github.com/abhinm7",
      label: "github.com/abhinm7",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/abhinm7",
      label: "linkedin.com/in/abhinm7",
    },
  ];

  return (
    <section className="py-20 border-t border-blue-200 bg-white/80 text-slate-900">
      <div className="section-container max-w-lg mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl font-bold mb-10 tracking-tight">Contact</h2>
        </Reveal>

        <div className="space-y-4">
          {/* 2. Map over the array */}
          {contactLinks.map((link, index) => (
            <Reveal key={index}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="
                  flex items-center gap-3 justify-center
                  w-full p-4 rounded-xl
                  bg-white/50 backdrop-blur-sm
                  
                  border border-blue-100
                  text-blue-900 font-medium
                  
                  
                  transition-all duration-300
                  
                 
                  hover:border-blue-500
                  hover:shadow-sm
                  hover:-translate-y-0.5
                "
              >
                {/* Render the icon component dynamically */}
                <link.icon size={20} /> 
                <span>{link.label}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}