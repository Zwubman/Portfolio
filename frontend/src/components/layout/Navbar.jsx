import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { name: 'About',    href: '#about' },
  { name: 'Work',     href: '#experience' },
  { name: 'Skills',   href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location  = useLocation();
  const isHome    = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    if (isHome && href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        backgroundColor: scrolled ? 'var(--bg-nav)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.15)' : 'none',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Left: Profile photo + EXACT Name | Title text ── */}
          <Link
            to="/"
            className="flex items-center h-full group"
            onClick={() => setIsOpen(false)}
          >
            {/* Circular profile thumbnail */}
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#7c3aed]/50 group-hover:ring-[#7c3aed] transition-all duration-300 flex-shrink-0 mr-3">
              <img
                src="/profile.jpg"
                alt="Wubamlak Girum"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Exactly matching "Wubamlak Girum | Software Engineer" */}
            <div
              className="hidden sm:flex items-center text-sm lg:text-base font-bold whitespace-nowrap"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
            >
              Wubamlak Girum
              <span className="mx-2 font-normal" style={{ color: 'var(--text-muted)' }}>
                |
              </span>
              <span className="font-normal" style={{ color: 'var(--text-secondary)' }}>
                Software Engineer
              </span>
            </div>
          </Link>

          {/* ── Right: Nav links + Theme Toggle + Admin ── */}
          <div className="flex items-center gap-1">
            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-0.5 mr-2">
              {isHome &&
                navLinks.map((link, idx) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer relative group flex items-center gap-1"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>
                      0{idx + 1}.
                    </span>
                    {link.name}
                    <span
                      className="absolute bottom-0 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      style={{ background: 'var(--accent)' }}
                    />
                  </button>
                ))}

              {/* Admin */}
              <Link
                to="/admin"
                className="ml-1 flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded border transition-all duration-300"
                style={{
                  color: 'var(--accent)',
                  borderColor: 'var(--border)',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(124,58,237,0.1)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <Shield size={12} />
                Admin
              </Link>
            </div>

            {/* ── Theme Toggle (Sun / Moon) ── */}
            <button
              onClick={toggleTheme}
              className="theme-toggle ml-1"
              aria-label="Toggle theme"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </motion.div>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden ml-1 p-2 rounded-lg transition-colors cursor-pointer"
              style={{ color: 'var(--text-secondary)' }}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-nav)',
              borderBottom: '1px solid var(--border)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="px-4 py-5 space-y-1">
              {isHome &&
                navLinks.map((link, idx) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="block w-full text-left px-4 py-3 rounded-lg text-sm transition-all cursor-pointer"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span className="text-xs font-semibold mr-2" style={{ color: 'var(--accent)' }}>
                      0{idx + 1}.
                    </span>
                    {link.name}
                  </button>
                ))}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all"
                style={{ color: 'var(--accent)' }}
              >
                <Shield size={14} />
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
