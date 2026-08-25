'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { FaGithub, FaLinkedin, FaKaggle, FaMedium, FaArrowRight, FaPaperPlane } from 'react-icons/fa';

const socials = [
  {
    label: 'GitHub',
    handle: '@ShanilPraveen',
    href: 'https://github.com/ShanilPraveen',
    icon: FaGithub,
    glow: 'rgba(255,255,255,0.10)',
    border: 'hover:border-white/30',
    iconColor: 'text-slate-300',
  },
  {
    label: 'LinkedIn',
    handle: 'shanil-praveen',
    href: 'https://www.linkedin.com/in/shanil-praveen',
    icon: FaLinkedin,
    glow: 'rgba(10,102,194,0.18)',
    border: 'hover:border-[#0A66C2]/50',
    iconColor: 'text-[#0A66C2]',
  },
  {
    label: 'Kaggle',
    handle: 'shanilpraveen',
    href: 'https://kaggle.com/shanilpraveen',
    icon: FaKaggle,
    glow: 'rgba(32,190,255,0.18)',
    border: 'hover:border-[#20BEFF]/50',
    iconColor: 'text-[#20BEFF]',
  },
  {
    label: 'Medium',
    handle: '@jspraveen2002',
    href: 'https://medium.com/@jspraveen2002',
    icon: FaMedium,
    glow: 'rgba(0,171,108,0.18)',
    border: 'hover:border-[#00ab6c]/50',
    iconColor: 'text-[#00ab6c]',
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Contact() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 65%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-3 mb-14"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
            Let&apos;s Connect
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed">
            Have a project in mind or want to say hello? I&apos;m always open to
            interesting conversations and new opportunities.
          </p>
        </motion.div>

        {/* Social cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {socials.map(({ label, handle, href, icon: Icon, glow, border, iconColor }) => (
            <motion.a
              key={label}
              variants={cardVariants}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className={`group relative rounded-2xl border border-white/10 bg-[#0d1424] p-6 flex flex-col items-center gap-3 transition-colors duration-300 ${border}`}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(120px circle at 50% 0%, ${glow}, transparent 70%)` }}
              />
              <Icon size={28} className={`relative z-10 ${iconColor}`} />
              <div className="relative z-10 text-center">
                <p className="text-white text-sm font-semibold">{label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{handle}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
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
      </div>
    </section>
  );
}
