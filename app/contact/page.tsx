'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaKaggle,
  FaMedium,
  FaUser,
  FaEnvelope,
  FaTag,
  FaComment,
  FaPaperPlane,
  FaDownload,
} from 'react-icons/fa';
import { sendEmail } from '@/lib/api';

const socialLinks = [
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/ShanilPraveen', color: 'hover:border-white/30 hover:bg-white/10' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/shanil-praveen', color: 'hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10' },
  { name: 'Kaggle', icon: FaKaggle, url: 'https://kaggle.com/shanilpraveen', color: 'hover:border-[#20BEFF]/50 hover:bg-[#20BEFF]/10' },
  { name: 'Medium', icon: FaMedium, url: 'https://medium.com/@jspraveen2002', color: 'hover:border-[#00ab6c]/50 hover:bg-[#00ab6c]/10' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await sendEmail(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200';

  return (
    <div className="relative py-20 px-6 overflow-hidden min-h-screen">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 60%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14 space-y-4"
        >
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <FaEnvelope size={20} className="text-white" />
            </div>
          </div>
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/5 bg-[#0d1424] p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
                  <FaUser size={12} className="text-indigo-400" /> Name
                </label>
                <input
                  type="text" id="name" name="name" required
                  value={formData.name} onChange={handleInputChange}
                  placeholder="Your full name" className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
                  <FaEnvelope size={12} className="text-indigo-400" /> Email
                </label>
                <input
                  type="email" id="email" name="email" required
                  value={formData.email} onChange={handleInputChange}
                  placeholder="your.email@example.com" className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="subject" className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
                  <FaTag size={12} className="text-indigo-400" /> Subject
                </label>
                <input
                  type="text" id="subject" name="subject" required
                  value={formData.subject} onChange={handleInputChange}
                  placeholder="What's this about?" className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
                  <FaComment size={12} className="text-indigo-400" /> Message
                </label>
                <textarea
                  id="message" name="message" required rows={5}
                  value={formData.message} onChange={handleInputChange}
                  placeholder="Your message here..." className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="shimmer-btn w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold
                           shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  <>
                    <FaPaperPlane size={13} /> Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 px-4 py-3 rounded-xl text-sm"
                >
                  Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/25 text-red-300 px-4 py-3 rounded-xl text-sm"
                >
                  Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* ── Right column ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/5 bg-[#0d1424] p-8">
              <h3 className="text-white font-semibold text-lg mb-6 text-center">
                Explore My Work &amp; Presence
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map(({ name, icon: Icon, url, color }, index) => (
                  <motion.a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ y: -3 }}
                    className={`border border-white/10 text-slate-300 p-4 rounded-xl flex flex-col items-center gap-2 transition-all duration-200 ${color}`}
                  >
                    <Icon size={22} />
                    <span className="text-sm font-medium">{name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0d1424] p-8">
              <h3 className="text-white font-semibold text-lg mb-3">Download My CV</h3>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                For a detailed overview of my experience, education, and technical skills,
                feel free to download my CV.
              </p>
              <a
                href="/cv.pdf"
                download
                className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl
                           bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm
                           shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300"
              >
                <FaDownload size={13} /> Download CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
