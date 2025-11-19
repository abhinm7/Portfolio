import Reveal from "./Reveal";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-20 border-t bg-white/80 border-slate-200/60 text-slate-900">
      <div className="section-container max-w-lg mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl font-bold mb-10 tracking-tight">Contact</h2>
        </Reveal>

        <div className="space-y-4">

          {/* Email */}
          <Reveal>
            <a
              href="mailto:abhin18m@gmail.com"
              className="
                block w-full p-4 rounded-xl
                bg-white/10 backdrop-blur-xs
                border border-white/20
                shadow-[0_0_20px_rgba(0,0,0,0.03)]
                hover:bg-white/20
                hover:shadow-[0_0_35px_rgba(0,0,0,0.05)]
                transition-all duration-300
                text-blue-700 font-medium
                items-center gap-3 justify-center
              "
            >
              <Mail size={20} /> <span>abhin18m@gmail.com</span>
            </a>
          </Reveal>

          {/* Phone */}
          <Reveal>
            <a
              href="tel:+919562620848"
              className="
                block w-full p-4 rounded-xl
                bg-white/10 backdrop-blur-xs
                border border-white/20
                shadow-[0_0_20px_rgba(0,0,0,0.03)]
                hover:bg-white/20
                hover:shadow-[0_0_35px_rgba(0,0,0,0.05)]
                transition-all duration-300
                text-blue-700 font-medium
                items-center gap-3 justify-center
              "
            >
              <Phone size={20} /> <span>+91 95626 20848</span>
            </a>
          </Reveal>

          {/* GitHub */}
          <Reveal>
            <a
              href="https://github.com/abhinm7"
              target="_blank"
              rel="noreferrer"
              className="
                block w-full p-4 rounded-xl
                bg-white/10 backdrop-blur-xs
                border border-white/20
                shadow-[0_0_20px_rgba(0,0,0,0.03)]
                hover:bg-white/20
                hover:shadow-[0_0_35px_rgba(0,0,0,0.05)]
                transition-all duration-300
                text-blue-700 font-medium
                items-center gap-3 justify-center
              "
            >
              <Github size={20} /> <span>github.com/abhinm7</span>
            </a>
          </Reveal>

          {/* LinkedIn */}
          <Reveal>
            <a
              href="https://linkedin.com/in/abhinm7"
              target="_blank"
              rel="noreferrer"
              className="
                block w-full p-4 rounded-xl
                bg-white/10 backdrop-blur-xs
                border border-white/20
                shadow-[0_0_20px_rgba(0,0,0,0.03)]
                hover:bg-white/20
                hover:shadow-[0_0_35px_rgba(0,0,0,0.05)]
                transition-all duration-300
                text-blue-700 font-medium
                items-center gap-3 justify-center
              "
            >
              <Linkedin size={20} /> <span>linkedin.com/in/abhinm7</span>
            </a>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
