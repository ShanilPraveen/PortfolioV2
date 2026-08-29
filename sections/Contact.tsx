'use client';
import Link from 'next/link';
import { motion, useReducedMotion, Variants } from 'motion/react';
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaArrowRight,
  FaPaperPlane,
} from 'react-icons/fa';

const socials = [
  {
    label: 'GitHub',
    handle: '@ShanilPraveen',
    href: 'https://github.com/ShanilPraveen',
    icon: FaGithub,
    color: '#e2e8f0',
    glow: 'rgba(255,255,255,0.10)',
    border: 'hover:border-white/30',
  },
  {
    label: 'LinkedIn',
    handle: 'shanil-praveen',
    href: 'https://www.linkedin.com/in/shanil-praveen',
    icon: FaLinkedin,
    color: '#0A66C2',
    glow: 'rgba(10,102,194,0.18)',
    border: 'hover:border-[#0A66C2]/50',
  },
  {
    label: 'Facebook',
    handle: 'Shanil Praveen',
    href: 'https://www.facebook.com/profile.php?id=61552762254541',
    icon: FaFacebook,
    color: '#1877F2',
    glow: 'rgba(24,119,242,0.18)',
    border: 'hover:border-[#1877F2]/50',
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function MailBadge() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0">
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border border-indigo-500/25"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan-400/25"
            animate={{ scale: [1, 1.55, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
          />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl
                   bg-gradient-to-br from-indigo-500 to-cyan-400
                   flex items-center justify-center shadow-2xl shadow-indigo-500/30"
        style={{ top: '50%', left: '50%', translate: '-50% -50%' }}
      >
        <FaEnvelope size={32} className="text-white" />
      </motion.div>
    </div>
  );
}

export default function Contact() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 65%)' }}
      />

      <div className="container-content relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* ── Centered heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center space-y-3 mb-14"
          >
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
              Let&apos;s Connect
            </p>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'var(--text-h1)' }}>
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed">
              Have a project in mind or want to say hello? I&apos;m always open to
              interesting conversations and new opportunities.
            </p>
          </motion.div>

          {/* ── Below: mail visual + CTA on the left, social links on
              the right ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center">

            {/* Left — animated mail badge + Send Me a Message CTA */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center md:items-start gap-6"
            >
              
              <div className="md:ml-5 lg:ml-12">
                <MailBadge />
              </div>

              <Link
                href="/contact"
                className="shimmer-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                           bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold
                           shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/45 transition-shadow duration-300"
              >
                <FaPaperPlane size={13} />
                Send Me a Message
                <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-3 w-full"
            >
              {socials.map(({ label, handle, href, icon: Icon, color, glow, border }) => (
                <motion.a
                  key={label}
                  variants={itemVariants}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className={`group relative flex items-center gap-4 rounded-xl border border-white/10 bg-[#0d1424] px-4 py-3.5 overflow-hidden transition-colors duration-300 ${border}`}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(160px circle at 0% 50%, ${glow}, transparent 70%)` }}
                  />
                  <span
                    className="relative z-10 w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${color}1a` }}
                  >
                    <Icon size={19} style={{ color }} />
                  </span>
                  <span className="relative z-10 flex-1">
                    <p className="text-white text-sm font-semibold">{label}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{handle}</p>
                  </span>
                  <FaArrowRight
                    size={12}
                    className="relative z-10 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
