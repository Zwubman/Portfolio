import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 w-full overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Background blobs to mimic the wavy design from yonas.live */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-[100px] rotate-12 opacity-30"
          style={{ background: 'linear-gradient(45deg, var(--accent-start), transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* ── Left Column: Text & Interaction ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-3xl"
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
              INTRODUCTION
            </p>
            <h2
              className="text-5xl sm:text-6xl md:text-[5.5rem] font-black mb-8 leading-none"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
            >
              Overview.
            </h2>
            
            <p
              className="text-base sm:text-lg leading-relaxed mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              Hello! I am Wubamlak Girum, a passionate and driven Software Engineer with expertise in modern web technologies and full-stack development. I specialize in transforming ideas into scalable and efficient web applications, from UI design and backend architecture to deployment. I have a strong foundation in designing resilient web applications, integrating real-time services, and optimizing backend operations. My experience spans building high-performance APIs, engineering robust core services for microfinance and land administration platforms, and integrating third-party systems like payment, banking, and SMS APIs. Skills: React.js, Node.js, Express.js, PostgreSQL, MySQL, MongoDB, Sequelize, and Docker. Whether it is ensuring seamless frontend integrations, architecting multi-tier databases, or deploying automated CI/CD pipelines, I aim to deliver robust, user-friendly solutions that are both efficient and secure.
              <br /><br />
              Let us collaborate to bring your ideas to life!
            </p>

            {/* Email link */}
            <div className="flex items-center gap-3 mb-8">
              <Mail size={22} style={{ color: '#ea4335' }} />
              <a
                href="mailto:wubamlakgirum@gmail.com"
                className="text-lg hover:underline transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                wubamlakgirum@gmail.com
              </a>
            </div>

            {/* Social Icons row matching yonase.live style */}
            <div className="flex items-center gap-4 mb-10">
              {/* GitHub */}
              <a
                href="https://github.com/Zwubman"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded flex items-center justify-center transition-transform hover:-translate-y-1"
                style={{ backgroundColor: '#ffffff', color: '#000000' }}
              >
                <Github size={22} fill="currentColor" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/wubamlak"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded flex items-center justify-center transition-transform hover:-translate-y-1"
                style={{ backgroundColor: '#0077b5', color: '#ffffff' }}
              >
                <Linkedin size={20} fill="currentColor" />
              </a>

              {/* X / Twitter */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded flex items-center justify-center transition-transform hover:-translate-y-1"
                style={{ backgroundColor: '#000000', color: '#ffffff' }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded flex items-center justify-center transition-transform hover:-translate-y-1"
                style={{
                  background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                  color: '#ffffff'
                }}
              >
                <Instagram size={22} />
              </a>
            </div>

            {/* Resume Button */}
            <a
              href="/Wubamlak_Girum_Resume.pdf"
              download="Wubamlak_Girum_Resume.pdf"
              className="inline-block px-8 py-3.5 rounded-lg text-white font-semibold text-lg transition-all hover:opacity-90 hover:scale-105"
              style={{ background: 'var(--accent)' }}
            >
              Resume
            </a>
          </motion.div>

          {/* ── Right Column: 3D Avatar Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-shrink-0 relative hidden lg:block"
          >
            <div className="relative w-[380px] h-[550px]">
              {/* Soft glow behind the avatar */}
              <div 
                className="absolute inset-x-0 bottom-10 w-full h-1/2 rounded-[100%] blur-[80px]"
                style={{ background: 'var(--accent-start)', opacity: 0.2 }}
              />
              <img
                src="/developer_avatar.png"
                alt="3D Developer Avatar"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl relative z-10"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
