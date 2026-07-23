import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080620] border-t border-purple-500/10">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
              Wubamlak Girum
            </h3>
            <p className="text-purple-300/50 text-sm mt-1">Full Stack Developer</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/Zwubman', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/wubamlak', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:wubamlakgirum@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/10 flex items-center justify-center text-purple-300/60 hover:text-purple-200 hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/20 flex items-center justify-center text-purple-300 hover:text-white hover:from-purple-500/30 hover:to-fuchsia-500/30 transition-all duration-300 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-purple-500/10 text-center">
          <p className="text-purple-300/40 text-sm flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Wubamlak Girum. Built with
            <Heart size={14} className="text-fuchsia-400/60" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  );
}
