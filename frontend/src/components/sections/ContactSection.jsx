import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSubmitContactMutation } from '../../store/services/contactApi';
import { Send, CheckCircle, AlertCircle, User, Mail, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactSection() {
  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    message: '',
  });
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
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[400px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-100 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Get In Touch
          </h2>
          <p className="text-purple-200/50 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-fuchsia-500/5 border border-purple-500/10 backdrop-blur-sm"
        >
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-[#0E0B24]/95 backdrop-blur-sm"
            >
              <CheckCircle size={48} className="text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-purple-100 mb-2">Message Sent!</h3>
              <p className="text-purple-200/50 text-sm">Thank you for reaching out. I'll get back to you soon.</p>
            </motion.div>
          )}

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-purple-200/70 mb-2">
                <User size={14} className="inline mr-1.5" />
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.sender_name}
                onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0E0B24]/60 border border-purple-500/15 text-purple-100 placeholder-purple-300/30 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-purple-200/70 mb-2">
                <Mail size={14} className="inline mr-1.5" />
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.sender_email}
                onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0E0B24]/60 border border-purple-500/15 text-purple-100 placeholder-purple-300/30 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all"
                placeholder="john@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-purple-200/70 mb-2">
                <MessageSquare size={14} className="inline mr-1.5" />
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0E0B24]/60 border border-purple-500/15 text-purple-100 placeholder-purple-300/30 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
