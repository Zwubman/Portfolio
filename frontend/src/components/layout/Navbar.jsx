import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Shield } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0E0B24]/80 backdrop-blur-xl border-b border-purple-500/10 shadow-2xl shadow-purple-900/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow">
                <Code2 size={20} className="text-white" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 opacity-0 group-hover:opacity-20 blur transition-opacity" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent hidden sm:block">
              WG
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {isHome &&
              navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm text-purple-200/70 hover:text-white rounded-lg hover:bg-purple-500/10 transition-all duration-300 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            <Link
              to="/admin"
              className="ml-2 px-4 py-2 text-sm text-purple-300/60 hover:text-purple-200 rounded-lg hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-1.5"
            >
              <Shield size={14} />
              Admin
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-purple-200/70 hover:text-white rounded-lg hover:bg-purple-500/10 transition-all cursor-pointer"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0E0B24]/95 backdrop-blur-xl border-b border-purple-500/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {isHome &&
                navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="block w-full text-left px-4 py-3 text-purple-200/70 hover:text-white rounded-lg hover:bg-purple-500/10 transition-all cursor-pointer"
                  >
                    {link.name}
                  </button>
                ))}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-purple-300/60 hover:text-purple-200 rounded-lg hover:bg-purple-500/10 transition-all"
              >
                <Shield size={16} />
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
