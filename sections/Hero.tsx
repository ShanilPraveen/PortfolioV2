'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { FaGithub, FaDownload, FaArrowRight } from 'react-icons/fa';
import Particles from '@/components/Particles';

const ROLES = [
  'Full-Stack Developer',
  'CS & Engineering Undergraduate',
  'AI / ML Enthusiast',
  'Cloud Computing Explorer',
  'Open Source Contributor',
];

// Framer Motion variants
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, x: 40 },
  show:  { opacity: 1, scale: 1,    x: 0,  transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 } },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed]  = useState('');
  const [typing, setTyping]         = useState(true);

  // Typewriter effect
  useEffect(() => {
    const target = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
      } else {
        setTyping(true);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">

      {/* ── Dot-grid background ── */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* ── Canvas particles ── */}
      <Particles count={70} className="z-0" />

      {/* ── Radial gradient spotlight at centre-left ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-16
                      grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ────────── LEFT — Text ────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6 order-2 lg:order-1"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                             bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              University of Moratuwa · BSc CS & Engineering
            </span>
          </motion.div>

          {/* Greeting + Name */}
          <motion.div variants={itemVariants} className="space-y-1">
            <p className="text-slate-400 text-lg font-medium">Hi there, I&apos;m</p>
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="gradient-text">Shanil</span>
              <br />
              <span className="text-white">Praveen</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={itemVariants} className="h-8 flex items-center">
            <span className="text-xl font-semibold text-slate-300">
              {displayed}
            </span>
            <span className="cursor ml-0.5" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-base leading-relaxed max-w-lg"
          >
            Passionate about crafting elegant, performant web experiences and
            exploring the intersection of software engineering and intelligent systems.
            Currently building &amp; learning at UoM.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/projects"
              className="shimmer-btn group inline-flex items-center gap-2 px-6 py-3 rounded-xl
                         bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold
                         shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/45 transition-shadow duration-300"
            >
              View My Work
              <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <a
              href="/cv.pdf"
              download
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl
                         border border-white/15 bg-white/5 text-slate-300 font-semibold
                         hover:border-indigo-500/50 hover:text-white hover:bg-white/8
                         backdrop-blur-sm transition-all duration-300"
            >
              <FaDownload size={13} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
              Download CV
            </a>
          </motion.div>

          {/* GitHub quick-link */}
          <motion.div variants={itemVariants}>
            <a
              href="https://github.com/ShanilPraveen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-400 transition-colors"
            >
              <FaGithub size={15} />
              @ShanilPraveen
            </a>
          </motion.div>
        </motion.div>

        {/* ────────── RIGHT — Profile photo ────────── */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          className="order-1 lg:order-2 flex items-center justify-center"
        >
          <div className="relative">
            {/* Outer slow-spinning decorative ring */}
            <div
              className="absolute inset-0 rounded-full border border-indigo-500/20"
              style={{
                animation: 'spin-slow 18s linear infinite',
                transform: 'scale(1.18)',
              }}
            >
              {/* Small dot on the ring */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                              w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/80" />
            </div>

            {/* Second ring, counter-rotating */}
            <div
              className="absolute inset-0 rounded-full border border-cyan-500/15"
              style={{
                animation: 'spin-slow 26s linear infinite reverse',
                transform: 'scale(1.35)',
              }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                              w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80" />
            </div>

            {/* Glow halo behind image */}
            <div className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)' }} />

            {/* Profile photo */}
            <div className="float-image glow-ring relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72
                            rounded-full overflow-hidden border-2 border-cyan-400/40">
              <Image
                src="/images/me.png"
                alt="Shanil Praveen"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
