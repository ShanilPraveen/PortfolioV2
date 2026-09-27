'use client';

/**
 * Hero — Cinematic Editorial Layout
 *
 * Composition (desktop):
 *   LEFT col  | CENTER col (portrait) | RIGHT col
 *   SHANIL -> |      [PORTRAIT]       | <- PRAVEEN
 *
 * Portrait: true centre (left:50% + translateX(-50%)).
 * Names: absolute 3-col grid, vertically centred in the upper 55% of hero.
 * Supporting info: lower-left. Right side = intentional negative space.
 *
 * CSS custom property tuning (globals.css):
 *   --hero-name-size       font-size of SHANIL / PRAVEEN
 *   --hero-portrait-width  portrait image width
 *   --hero-center-width    width of the centre grid column
 *   --hero-content-width   max-width of the supporting-info block
 */

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from 'motion/react';
import { FaDownload, FaArrowRight } from 'react-icons/fa';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                  */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const portraitVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 },
  },
};

const leftNameVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 },
  },
};

const rightNameVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 },
  },
};

/* ------------------------------------------------------------------ */
/*  Magnetic button                                                     */
/* ------------------------------------------------------------------ */

function MagneticButton({
  children, className, href, download, style,
}: {
  children: React.ReactNode;
  className: string;
  href: string;
  download?: boolean;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, ...style }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Supporting info block (shared between desktop and mobile)           */
/* ------------------------------------------------------------------ */

function SupportingInfo({ mobile = false }: { mobile?: boolean }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={mobile ? 'space-y-4 w-full text-center' : 'space-y-5'}
    >
      {/* Professional title */}
      <motion.p
        variants={itemVariants}
        className={`font-semibold text-slate-200 leading-snug ${mobile ? 'text-lg' : 'text-xl'}`}
      >
        Full-Stack Developer &amp;{' '}
        <span style={{ color: 'var(--accent)' }}>AI/ML</span> Explorer
      </motion.p>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-slate-400 leading-relaxed"
        style={{
          fontSize: mobile ? '0.9rem' : 'var(--text-body)',
          maxWidth: mobile ? '38ch' : '44ch',
          marginInline: mobile ? 'auto' : undefined,
        }}
      >
        Passionate about building elegant, performant software and exploring
        the intersection of software engineering and artificial intelligence to
        solve meaningful problems
      </motion.p>

      {/* Education badge */}
      {/* <motion.div
        variants={itemVariants}
        className={mobile ? 'flex justify-center' : ''}
      >
        <span
          className={`inline-flex items-center gap-2 rounded-full font-medium ${mobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-1.5 text-sm'}`}
          style={{
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.22)',
            color: '#a5b4fc',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: '#818cf8' }}
          />
          University of Moratuwa · BSc CS &amp; Engineering
        </span>
      </motion.div> */}

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className={`flex flex-wrap gap-3 pt-1 ${mobile ? 'justify-center' : ''}`}
      >
        <MagneticButton
          href="/projects"
          className="shimmer-btn group inline-flex items-center gap-2 rounded-xl font-semibold text-white transition-shadow duration-300"
          style={{
            padding: mobile ? '0.6rem 1.2rem' : '0.7rem 1.5rem',
            fontSize: mobile ? '0.875rem' : '1rem',
            background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
            boxShadow: '0 4px 20px rgba(99,102,241,0.25)',
          }}
        >
          View My Work
          <FaArrowRight
            size={mobile ? 12 : 13}
            className="group-hover:translate-x-1 transition-transform duration-200"
          />
        </MagneticButton>

        <MagneticButton
          href="/cv.pdf"
          download
          className="group inline-flex items-center gap-2 rounded-xl font-semibold text-slate-300 transition-all duration-300 hover:text-white"
          style={{
            padding: mobile ? '0.6rem 1.2rem' : '0.7rem 1.5rem',
            fontSize: mobile ? '0.875rem' : '1rem',
            border: '1px solid rgba(255,255,255,0.13)',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <FaDownload
            size={mobile ? 12 : 13}
            className="group-hover:-translate-y-0.5 transition-transform duration-200"
          />
          Download CV
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Shanil Praveen — Hero"
      className="relative w-full"
      style={{
        height: '100svh',
        maxHeight: '100svh',
        overflow: 'hidden',
      }}
    >

      {/* ── LAYER 1 ── Static dot-grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.28,
        }}
      />

      {/* ── LAYER 1b ── Corner vignettes ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 55% 45% at 0% 0%, rgba(3,7,18,0.7) 0%, transparent 70%)',
            'radial-gradient(ellipse 55% 45% at 100% 100%, rgba(3,7,18,0.7) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      {/* ── LAYER 1c ── Soft indigo glow behind the portrait ── */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          left: '50%',
          top: '46%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(360px, 46vw, 750px)',
          height: 'clamp(360px, 46vw, 750px)',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(34,211,238,0.06) 42%, transparent 70%)',
        }}
      />

      {/* ── LAYER 2 ── DESKTOP: Names absolutely positioned from viewport centre ──
           SHANIL: right edge sits at calc(50% + var(--hero-center-width) / 2)
           PRAVEEN: left edge sits at calc(50% + var(--hero-center-width) / 2)
           Tuning --hero-center-width brings both names closer to the portrait.
      ──────────────────────────────────────────────────────────────────── */}

      {/* SHANIL — right-anchored to portrait center gap */}
      <motion.div
        variants={leftNameVariants}
        initial="hidden"
        animate="show"
        className="hidden lg:block absolute pointer-events-none select-none"
        aria-hidden="true"
        style={{
          right: 'calc(50% + var(--hero-center-width) / 2)',
          top: 'var(--hero-name-top)',
          textAlign: 'right',
          zIndex: 5,
          lineHeight: 1,
        }}
      >
        <span
          className="font-editorial leading-none select-none"
          style={{
            fontSize: 'var(--hero-name-size)',
            transform: 'scaleY(var(--hero-name-scale-y, 1.2))',
            transformOrigin: 'top',
            color: 'rgba(241,245,249,0.90)',
            textShadow: '0 0 80px rgba(99,102,241,0.22)',
            display: 'block',
          }}
        >
          SHANIL
        </span>
      </motion.div>

      {/* PRAVEEN — left-anchored to portrait center gap */}
      <motion.div
        variants={rightNameVariants}
        initial="hidden"
        animate="show"
        className="hidden lg:block absolute pointer-events-none select-none"
        aria-hidden="true"
        style={{
          left: 'calc(50% + var(--hero-center-width) / 2)',
          top: 'var(--hero-name-top)',
          textAlign: 'left',
          zIndex: 5,
          lineHeight: 1,
        }}
      >
        <span
          className="font-editorial leading-none select-none"
          style={{
            fontSize: 'var(--hero-name-size)',
            transform: 'scaleY(var(--hero-name-scale-y, 1.2))',
            transformOrigin: 'top',
            color: 'rgba(241,245,249,0.86)',
            textShadow: '0 0 80px rgba(34,211,238,0.16)',
            display: 'block',
            letterSpacing: '-0.005em',
          }}
        >
          PRAVEEN
        </span>
      </motion.div>

      {/* ── LAYER 3 ── Portrait ──────────────────────────────────────────
           Elevated portrait with translateY and scale to position head
           cleanly between SHANIL and PRAVEEN.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          top: 0,
          bottom: 0,
          width: 'var(--hero-portrait-width)',
          maxWidth: 'var(--hero-portrait-max-width)',
          zIndex: 10,
        }}
        aria-hidden="true"
      >
        <motion.div
          variants={portraitVariants}
          initial="hidden"
          animate="show"
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Atmospheric glow at base */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '130%',
              height: '30%',
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.28) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <Image
            src="/images/me-no-bg.png"
            alt="Shanil Praveen"
            fill
            priority
            draggable={false}
            className="object-contain object-bottom"
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 400px, 640px"
            style={{
              transform:
                'translateY(var(--hero-portrait-y, -60px)) scale(var(--hero-portrait-scale, 1.34))',
              transformOrigin: '50% var(--hero-portrait-origin-y, 85%)',
            }}
          />
        </motion.div>
      </div>

      {/* ── LAYER 3b ── Soft bottom gradient to blend portrait cleanly ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-[12]"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to top, #030712 0%, rgba(3,7,18,0.7) 35%, transparent 100%)',
        }}
      />

      {/* ── LAYER 4 ── DESKTOP: Supporting Info positioned under SHANIL ─
           Interactive content on the left side, appearing right below SHANIL.
           Leaves the bottom clear so hero fits exactly in 1 screen with zero overflow.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        className="hidden lg:block absolute z-20 pointer-events-auto"
        style={{
          top: 'var(--hero-content-top)',
          left: 'var(--hero-content-left)',
          maxWidth: 'var(--hero-content-width)',
        }}
      >
        <SupportingInfo />
      </div>

      {/* ── LAYER 5 ── MOBILE (< lg) Stacked Layout ───────────────────── */}
      <div
        className="lg:hidden relative z-20 flex flex-col items-center justify-between h-full pt-16 pb-6 px-4 overflow-y-auto"
        style={{ maxHeight: '100svh' }}
      >
        {/* SHANIL above portrait space */}
        <motion.div variants={leftNameVariants} initial="hidden" animate="show" className="shrink-0">
          <span
            className="font-editorial leading-none select-none block"
            style={{
              fontSize: 'clamp(2.75rem, 13vw, 4.5rem)',
              color: 'rgba(241,245,249,0.90)',
            }}
          >
            SHANIL
          </span>
        </motion.div>

        {/* Space for portrait on mobile */}
        <div style={{ height: 'clamp(140px, 28vh, 220px)' }} className="shrink-0" aria-hidden="true" />

        {/* PRAVEEN below portrait */}
        <motion.div variants={rightNameVariants} initial="hidden" animate="show" className="shrink-0">
          <span
            className="font-editorial leading-none select-none block"
            style={{
              fontSize: 'clamp(2.75rem, 13vw, 4.5rem)',
              color: 'rgba(241,245,249,0.86)',
            }}
          >
            PRAVEEN
          </span>
        </motion.div>

        {/* Supporting info */}
        <div className="w-full shrink-0 pt-2">
          <SupportingInfo mobile />
        </div>
      </div>

    </section>
  );
}
