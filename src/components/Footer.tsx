import { Github, Linkedin, Mail } from "lucide-react";
import { developer } from "../shared/data";

export function Footer() {
  return (
    <footer className="bg-slate-950 py-10 px-4 sm:px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-400 mb-5">
          Let's build something amazing together
        </p>
        <div className="flex gap-6 justify-center mb-6">
          <a
            href={developer.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            aria-label="GitHub profile"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href={developer.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href={`mailto:${developer.email}`}
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            aria-label="Send email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {developer.name} • All rights reserved.
        </p>
      </div>
    </footer>
  );
}
