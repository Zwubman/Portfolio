import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSubmitContactMutation } from '../../store/services/contactApi';
import { Send, CheckCircle, User, Mail, MessageSquare, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactSection() {
  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const [formData, setFormData] = useState({ sender_name: '', sender_email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(formData).unwrap();
      setSubmitted(true);
      setFormData({ sender_name: '', sender_email: '', message: '' });
      toast.success('Message sent successfully!');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to send message.');
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[400px] bg-purple-900/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>
            Get in touch
          </p>
          <div className="flex items-end gap-6">
            <h2
              className="text-4xl sm:text-5xl font-black"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
            >
              Contact.
            </h2>
            <div
              className="flex-1 h-px mb-3 hidden sm:block"
              style={{ background: 'linear-gradient(to right, var(--border-hover), transparent)' }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--text-primary)', fontFamily: "'Poppins', sans-serif" }}
            >
              Let's work together
            </h3>
            <p className="leading-relaxed mb-10 text-[15px] text-justify" style={{ color: 'var(--text-secondary)' }}>
              I'm currently available for freelance work and full-time opportunities. I am available 24 hours a day, 7 days a week. Have a project in mind, or just want to say hi? Send me a message and I'll get back to you as soon as possible.
            </p>

            <h3
              className="text-xs font-bold tracking-[0.2em] uppercase mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Contact Info
            </h3>

            <div className="flex flex-col gap-4">
              {/* Email Card */}
              <div
                className="flex items-center gap-5 p-5 rounded-md"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid rgba(124, 58, 237, 0.15)' }}
              >
                <div
                  className="w-11 h-11 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid rgba(124, 58, 237, 0.25)' }}
                >
                  <Mail size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                    Email
                  </p>
                  <a
                    href="mailto:wubamlakgirum@gmail.com"
                    className="text-[14.5px] font-medium transition-colors hover:underline"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#3b82f6')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    wubamlakgirum@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div
                className="flex items-center gap-5 p-5 rounded-md"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid rgba(124, 58, 237, 0.15)' }}
              >
                <div
                  className="w-11 h-11 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid rgba(124, 58, 237, 0.25)' }}
                >
                  <Phone size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                    Phone
                  </p>
                  <p className="text-[14.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                    +251 92 123 4567
                  </p>
                </div>
              </div>

              {/* Location Card */}
              <div
                className="flex items-center gap-5 p-5 rounded-md"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid rgba(124, 58, 237, 0.15)' }}
              >
                <div
                  className="w-11 h-11 rounded-md flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid rgba(124, 58, 237, 0.25)' }}
                >
                  <MapPin size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                    Location
                  </p>
                  <p className="text-[14.5px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Available Worldwide
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative p-6 sm:p-8 rounded-2xl card-base"
          >
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(var(--bg-primary), 0.95)' }}
              >
                <CheckCircle size={48} className="text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Message Sent!
                </h3>
                <p className="text-sm text-center px-4" style={{ color: 'var(--text-secondary)' }}>
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            )}

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="flex items-center gap-1.5 text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <User size={13} /> Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.sender_name}
                  onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="flex items-center gap-1.5 text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Mail size={13} /> Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.sender_email}
                  onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="john@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="flex items-center gap-1.5 text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <MessageSquare size={13} /> Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none resize-none"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, #7c3aed, #a21caf)',
                  boxShadow: '0 4px 15px rgba(124,58,237,0.25)',
                }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
