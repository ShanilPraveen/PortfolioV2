'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, Variants } from 'motion/react';
import { FaGithub, FaDownload, FaArrowRight } from 'react-icons/fa';
import Particles from '@/components/Particles';

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, x: 30 },
  show: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 } },
};


function MagneticButton({ children, className, href, download }: {
  children: React.ReactNode;
  className: string;
  href: string;
  download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">

      {/* ── Dot-grid background ── */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Canvas particles */}
      <Particles count={200} className="z-0" />

      {/* ── Radial gradient spotlight at centre-left ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 container-content w-full py-16
                      grid grid-cols-1 lg:grid-cols-[auto_auto] gap-8 lg:gap-40 items-center lg:justify-center">

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
            <h1
              className="font-display font-bold leading-[0.98] tracking-tight"
              style={{ fontSize: 'var(--text-display)' }}
            >
              <span className="gradient-text">Shanil</span>
              <br />
              <span className="text-white">Praveen</span>
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="text-xl font-semibold text-slate-300">
            Full-Stack Developer &amp;{' '}
            <span style={{ color: 'var(--accent-warm)' }}>AI/ML</span> Explorer
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-slate-400 leading-relaxed max-w-lg"
            style={{ fontSize: 'var(--text-body)' }}
          >
            Passionate about crafting elegant, performant web experiences and
            exploring the intersection of software engineering and intelligent systems.
          </motion.p>

          {/* CTA Buttons — magnetic pull on hover */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <MagneticButton
              href="/projects"
              className="shimmer-btn group inline-flex items-center gap-2 px-6 py-3 rounded-xl
                         bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold
                         shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/45 transition-shadow duration-300"
            >
              View My Work
              <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </MagneticButton>

            <MagneticButton
              href="/cv.pdf"
              download
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl
                         border border-white/15 bg-white/5 text-slate-300 font-semibold
                         hover:border-indigo-500/50 hover:text-white hover:bg-white/8
                         backdrop-blur-sm transition-all duration-300"
            >
              <FaDownload size={13} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
              Download CV
            </MagneticButton>
          </motion.div>

          {/* GitHub quick-link */}
          {/* <motion.div variants={itemVariants}>
            <a
              href="https://github.com/ShanilPraveen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-400 transition-colors"
            >
              <FaGithub size={15} />
              @ShanilPraveen
            </a>
          </motion.div> */}
        </motion.div>

    
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          className="order-1 lg:order-2 flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] lg:w-[440px] lg:h-[540px]">

            {/* Ambient glow behind the whole cluster */}
            <div
              className="absolute -inset-8 rounded-[2.5rem] pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)' }}
            />

            {/* Background panel — me2.jpg, larger, set back top-right */}
            <div className="absolute top-0 right-0 w-[72%] h-[70%] rounded-[1.1rem] overflow-hidden border border-white/10 shadow-xl shadow-black/40 z-10">
              <Image
                src="/images/me2.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 202px, 230px"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(160deg, rgba(34,211,238,0.30) 0%, rgba(3,7,18,0.18) 50%, rgba(99,102,241,0.22) 100%)',
                  mixBlendMode: 'color',
                }}
              />
              <div className="absolute inset-0 bg-[#030712]/10" />
            </div>

            {/* Foreground panel — me.jpg, primary portrait, front bottom-left */}
            <div className="absolute bottom-0 left-0 w-[66%] h-[62%] rounded-[1.1rem] overflow-hidden border-2 border-[#030712] shadow-2xl shadow-black/50 z-20">
              <Image
                src="/images/me.png"
                alt="Shanil Praveen"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 640px) 185px, 211px"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(160deg, rgba(99,102,241,0.28) 0%, rgba(3,7,18,0.10) 50%, rgba(34,211,238,0.18) 100%)',
                  mixBlendMode: 'color',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#030712] via-[#030712]/25 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
