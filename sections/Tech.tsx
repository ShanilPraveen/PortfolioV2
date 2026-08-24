'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaCubes, FaTools } from 'react-icons/fa';

const techCards = [
  {
    icon: FaCode,
    title: 'Programming Languages',
    description: 'Fluent in multiple paradigms — from scripting to systems design.',
    color: 'indigo',
    spotlight: 'rgba(99,102,241,0.12)',
    border: 'rgba(99,102,241,0.4)',
    iconBg: 'from-indigo-500 to-violet-500',
    badges: ['JavaScript', 'Python', 'Java', 'C++'],
    badgeStyle: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
  },
  {
    icon: FaCubes,
    title: 'Frameworks & Libraries',
    description: 'Full-stack toolkit for building modern, scalable applications.',
    color: 'cyan',
    spotlight: 'rgba(34,211,238,0.10)',
    border: 'rgba(34,211,238,0.4)',
    iconBg: 'from-cyan-500 to-indigo-500',
    badges: ['React', 'Next.js', 'TailwindCSS', 'Node.js', 'Express.js', 'FastAPI', 'MongoDB'],
    badgeStyle: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  },
  {
    icon: FaTools,
    title: 'Tools & Technologies',
    description: 'Professional workflow tools for collaboration and delivery.',
    color: 'violet',
    spotlight: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.4)',
    iconBg: 'from-violet-500 to-indigo-500',
    badges: ['Git', 'GitHub', 'Docker', 'Figma'],
    badgeStyle: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
  },
];

// Framer Motion variants
const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

interface SpotlightCardProps {
  card: typeof techCards[0];
}

function SpotlightCard({ card }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  };

  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, opacity: 0 }))}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative group rounded-2xl border border-white/5 bg-[#0d1424] p-6 overflow-hidden flex flex-col gap-5"
      style={{ isolation: 'isolate' }}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-10"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(320px circle at ${glow.x}px ${glow.y}px, ${card.spotlight}, transparent 70%)`,
        }}
      />

      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${card.border}` }}
      />

      {/* Icon */}
      <div className={`relative z-20 w-12 h-12 rounded-xl bg-gradient-to-br ${card.iconBg}
                       flex items-center justify-center shadow-lg`}>
        <Icon size={20} className="text-white" />
      </div>

      {/* Title & description */}
      <div className="relative z-20 space-y-1.5">
        <h3 className="text-white font-semibold text-lg">{card.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
      </div>

      {/* Tech badges */}
      <div className="relative z-20 flex flex-wrap gap-2 mt-auto">
        {card.badges.map((badge) => (
          <span
            key={badge}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${card.badgeStyle}`}
          >
            {badge}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Tech() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Subtle background radial */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(99,102,241,0.05) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14 space-y-3"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
            Skills & Expertise
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Technologies I{' '}
            <span className="gradient-text">Work With</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            A curated set of tools and languages I use to bring ideas to life —
            from concept to deployment.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {techCards.map((card) => (
            <SpotlightCard key={card.title} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
