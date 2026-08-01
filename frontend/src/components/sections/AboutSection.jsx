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
              <Mail size={20} style={{ color: '#ea4335' }} fill="#ea4335" className="text-white" />
              <a
                href="mailto:wubamlakgirum@gmail.com"
                className="text-[15.5px] hover:underline transition-colors font-medium"
                style={{ color: 'var(--text-secondary)' }}
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
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  color: '#ffffff'
                }}
              >
                <Instagram size={20} />
              </a>
            </div>

            {/* Resume Button */}
            <div className="relative z-30">
              <a
                href="/Wubamlak_Girum_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-2.5 rounded-md text-white font-medium text-[15px] transition-all hover:opacity-90 flex-shrink-0"
                style={{ backgroundColor: '#915eff' }}
              >
                Resume
              </a>
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
      </div>
    </section>
  );
}
