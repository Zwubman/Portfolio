import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { useGetResumeQuery } from '../../store/services/resumeApi';

/* ── Specialty role cards ── */
const specialtyCards = [
  {
    title: 'Full Stack\nDeveloper',
    borderColors: ['#00d4aa', '#7c3aed'],
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8"  y="8"  width="16" height="16" rx="3" fill="#7c3aed" opacity="0.9"/>
        <rect x="28" y="8"  width="16" height="16" rx="3" fill="#00d4aa" opacity="0.9"/>
        <rect x="8"  y="28" width="16" height="16" rx="3" fill="#00d4aa" opacity="0.9"/>
        <rect x="28" y="28" width="16" height="16" rx="3" fill="#7c3aed" opacity="0.9"/>
        <rect x="14" y="14" width="24" height="24" rx="5" fill="url(#fs_g)" opacity="0.55"/>
        <defs>
          <linearGradient id="fs_g" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#7c3aed"/><stop offset="1" stopColor="#00d4aa"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: 'Frontend\nDeveloper',
    borderColors: ['#00d4aa', '#38bdf8'],
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="10" width="44" height="32" rx="5" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.5"/>
        <rect x="4" y="10" width="44" height="9"  rx="5" fill="#38bdf8" opacity="0.25"/>
        <circle cx="12" cy="14.5" r="2" fill="#f87171"/>
        <circle cx="20" cy="14.5" r="2" fill="#fbbf24"/>
        <circle cx="28" cy="14.5" r="2" fill="#34d399"/>
        <rect x="10" y="25" width="14" height="3" rx="1.5" fill="#7c3aed" opacity="0.8"/>
        <rect x="10" y="31" width="22" height="3" rx="1.5" fill="#38bdf8" opacity="0.6"/>
        <rect x="29" y="24" width="12" height="12" rx="2" fill="#7c3aed" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: 'Backend\nDeveloper',
    borderColors: ['#38bdf8', '#7c3aed'],
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="14" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="4 2"/>
        <circle cx="26" cy="26" r="8"  fill="url(#be_g)" opacity="0.9"/>
        <path d="M26 12L26 6M26 46L26 40M12 26L6 26M46 26L40 26" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="26" cy="26" r="3" fill="#ffffff"/>
        <defs>
          <linearGradient id="be_g" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#7c3aed"/><stop offset="1" stopColor="#38bdf8"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: 'Problem\nSolving',
    borderColors: ['#a21caf', '#7c3aed'],
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="5"  fill="#a21caf" opacity="0.9"/>
        <circle cx="10" cy="18" r="4"  fill="#7c3aed" opacity="0.85"/>
        <circle cx="42" cy="18" r="4"  fill="#38bdf8" opacity="0.85"/>
        <circle cx="10" cy="36" r="4"  fill="#00d4aa" opacity="0.85"/>
        <circle cx="42" cy="36" r="4"  fill="#7c3aed" opacity="0.85"/>
        <line x1="14" y1="20" x2="22" y2="24" stroke="#a21caf" strokeWidth="1.5"/>
        <line x1="38" y1="20" x2="30" y2="24" stroke="#38bdf8" strokeWidth="1.5"/>
        <line x1="14" y1="34" x2="22" y2="28" stroke="#00d4aa" strokeWidth="1.5"/>
        <line x1="38" y1="34" x2="30" y2="28" stroke="#7c3aed" strokeWidth="1.5"/>
        <line x1="10" y1="22" x2="10" y2="32" stroke="#7c3aed" strokeWidth="1.5" opacity="0.5"/>
        <line x1="42" y1="22" x2="42" y2="32" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: 'Freelancer',
    borderColors: ['#7c3aed', '#a21caf'],
    icon: (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="10" r="5"  fill="#7c3aed" opacity="0.9"/>
        <circle cx="10" cy="32" r="5"  fill="#a21caf" opacity="0.9"/>
        <circle cx="42" cy="32" r="5"  fill="#38bdf8" opacity="0.9"/>
        <circle cx="26" cy="44" r="4"  fill="#00d4aa"  opacity="0.85"/>
        <line x1="26" y1="15" x2="13" y2="28" stroke="#7c3aed" strokeWidth="1.8"/>
        <line x1="26" y1="15" x2="39" y2="28" stroke="#38bdf8" strokeWidth="1.8"/>
        <line x1="13" y1="36" x2="26" y2="41" stroke="#a21caf" strokeWidth="1.8"/>
        <line x1="39" y1="36" x2="26" y2="41" stroke="#00d4aa" strokeWidth="1.8"/>
        <line x1="15" y1="32" x2="37" y2="32" stroke="#7c3aed" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.5"/>
      </svg>
    ),
  },
];

export default function AboutSection() {
  const { data: resumeData } = useGetResumeQuery();
  const resumeUrl = resumeData?.resume_url || null;
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 w-full overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Background blobs to mimic the wavy design from yonas.live */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-[100%] rotate-12 opacity-40 mix-blend-screen"
          style={{ background: 'linear-gradient(135deg, rgba(30,58,138,0.4), rgba(124,58,237,0.1))' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 lg:gap-0">
          
          {/* ── Left Column: Text & Interaction ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[55%] flex flex-col justify-center py-12 relative z-20"
          >
            <p 
              className="text-sm font-semibold tracking-widest uppercase mb-1" 
              style={{ color: 'var(--text-muted)' }}
            >
              INTRODUCTION
            </p>
            <h2
              className="text-5xl sm:text-6xl font-black mb-6 leading-none tracking-tight"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
            >
              Overview.
            </h2>
            
            <p
              className="text-[16px] sm:text-[17px] leading-[1.8] mb-8 font-[400] text-justify"
              style={{ color: 'var(--text-secondary)' }}
            >
              Hello! I am Wubamlak Girum, a passionate and driven Software Engineer with expertise in modern web technologies and full-stack development. I specialize in transforming ideas into scalable and efficient web applications, from UI design and backend architecture to deployment. I have a strong foundation in designing resilient web applications, integrating real-time services, and optimizing backend operations. My experience spans building high-performance APIs, engineering robust core services for microfinance and land administration platforms, and integrating third-party systems like payment, banking, and SMS APIs. Skills: React.js, Node.js, Express.js, PostgreSQL, MySQL, MongoDB, Sequelize, and Docker. Whether it is ensuring seamless frontend integrations, architecting multi-tier databases, or deploying automated CI/CD pipelines, I aim to deliver robust, user-friendly solutions that are both efficient and secure.
              <br /><br />
              Let us collaborate to bring your ideas to life!
            </p>

            {/* Email link */}
            <div className="flex items-center gap-2.5 mb-8">
              {/* Gmail icon */}
              <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M6 40h6V22L4 16v20c0 2.2 1.8 4 4 4z"/>
                <path fill="#34A853" d="M36 40h6c2.2 0 4-1.8 4-4V16l-8 6"/>
                <path fill="#4A90D9" d="M36 8H12L4 16v2l20 14 20-14v-2z"/>
                <path fill="#FBBC05" d="M4 18v2l20 14 20-14v-2L24 30z"/>
                <path fill="#EA4335" d="M4 16l8 6 12-8 12 8 8-6-8-6H12z"/>
              </svg>
              <a
                href="mailto:wubamlakgirum@gmail.com"
                className="text-[15.5px] hover:underline transition-colors font-medium"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                wubamlakgirum@gmail.com
              </a>
            </div>

            {/* Social Icons row matching yonase.live style */}
            <div className="flex items-center gap-3.5 mb-8 relative z-30">
              {/* GitHub */}
              <a
                href="https://github.com/Zwubman"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md flex items-center justify-center transition-transform hover:-translate-y-1"
                style={{ backgroundColor: '#ffffff', color: '#000000' }}
              >
                <Github size={20} fill="currentColor" strokeWidth={0}/>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/wubamlak"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md flex items-center justify-center transition-transform hover:-translate-y-1"
                style={{ backgroundColor: '#0077b5', color: '#ffffff' }}
              >
                <Linkedin size={18} fill="currentColor" strokeWidth={0}/>
              </a>

              {/* X / Twitter */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md flex items-center justify-center transition-transform hover:-translate-y-1"
                style={{ backgroundColor: '#000000', color: '#ffffff' }}
              >
                <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }} fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md flex items-center justify-center transition-transform hover:-translate-y-1"
                style={{
                  background: 'radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                  color: '#ffffff'
                }}
              >
                {/* Authentic Instagram camera SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="#ffffff" stroke="none"/>
                </svg>
              </a>
            </div>

            {/* Resume Button */}
            <div className="relative z-30">
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-7 py-2.5 rounded-md text-white font-medium text-[15px] transition-all hover:opacity-90 flex-shrink-0"
                  style={{ backgroundColor: '#915eff' }}
                >
                  Resume
                </a>
              )}
            </div>
          </motion.div>

          {/* ── Right Column: 3D Avatar Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative w-[45%] flex-shrink-0 z-0"
          >
            {/* Mask the left edge so the avatar seamlessly blends into the dark background and never blocks text */}
            <div 
              className="absolute -right-24 xl:-right-48 bottom-0 w-[140%] h-[90%] overflow-visible pointer-events-none translate-x-16"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 25%)',
                maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,1) 25%)'
              }}
            >
              <img
                src="/developer_avatar.png"
                alt="3D Developer Avatar"
                className="w-full h-full object-cover object-bottom drop-shadow-2xl opacity-90"
              />
            </div>
          </motion.div>

        </div>

        {/* ── Specialty Role Cards (full width, below the two columns) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-24 sm:mt-32">
          {specialtyCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.09 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="relative group cursor-default"
            >
              {/* Gradient border shell */}
              <div
                className="absolute inset-0 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${card.borderColors[0]}, ${card.borderColors[1]})`,
                }}
              />
              {/* Inner card */}
              <div
                className="relative m-[1.5px] flex flex-col items-center justify-center gap-4 py-8 px-4"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '14px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                }}
              >
                <div className="flex items-center justify-center w-16 h-16">
                  {card.icon}
                </div>
                <p
                  className="text-sm font-bold text-center leading-snug whitespace-pre-line"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {card.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
