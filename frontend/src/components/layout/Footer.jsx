import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative border-t"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
    >
      <div
        className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Socials + back to top */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github,   href: 'https://github.com/Zwubman',        label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/wubamlak', label: 'LinkedIn' },
              { icon: Mail,     href: 'mailto:wubamlakgirum@gmail.com',   label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(124,58,237,0.08)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
            <button
              onClick={scrollToTop}
              className="ml-1 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer"
              style={{
                background: 'linear-gradient(to bottom right, rgba(124,58,237,0.2), rgba(162,28,175,0.2))',
                border: '1px solid var(--border)',
                color: 'var(--accent)',
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 text-center border-t" style={{ borderColor: 'var(--border)' }}>
          <p
            className="text-sm flex items-center justify-center gap-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            © {new Date().getFullYear()} Wubamlak Girum. Built using React & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
}
