'use client';
import { motion, Variants } from 'motion/react';
import { FaCode, FaCloud, FaJava, FaAws } from 'react-icons/fa';
import { TbBrandReactNative } from 'react-icons/tb';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFastapi,
  SiPython,
  SiGit,
  SiGithub,
  SiDocker,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiMui,
  SiGraphql,
  SiPostgresql,
  SiPrisma,
  SiPostman,
} from 'react-icons/si';

const logos = [
  { icon: SiReact, label: 'React' },
  { icon: SiNextdotjs, label: 'Next.js' },
  { icon: SiTypescript, label: 'TypeScript' },
  { icon: SiJavascript, label: 'JavaScript' },
  { icon: SiTailwindcss, label: 'Tailwind CSS' },
  { icon: SiNodedotjs, label: 'Node.js' },
  { icon: SiExpress, label: 'Express' },
  { icon: SiFastapi, label: 'FastAPI' },
  { icon: SiMongodb, label: 'MongoDB' },
  { icon: SiPython, label: 'Python' },
  { icon: FaJava, label: 'Java' },
  { icon: SiCplusplus, label: 'C++' },
  { icon: SiGit, label: 'Git' },
  { icon: SiGithub, label: 'GitHub' },
  { icon: SiDocker, label: 'Docker' },
  { icon: SiMui, label: 'MUI' },
  { icon: SiGraphql, label: 'GraphQL' },
  { icon: TbBrandReactNative, label: 'React Native' },
  { icon: SiPostgresql, label: 'PostgreSQL' },
  { icon: SiPrisma, label: 'Prisma' },
  { icon: FaAws, label: 'AWS' },
  { icon: SiPostman, label: 'Postman' },
];

const narrativeCards = [
  {
    icon: FaCode,
    title: 'Full-Stack Development',
    description:
      'Building responsive, scalable web applications end to end — from frontend UI craftsmanship to backend architecture, database design, and deployment.',
    accent: '#6366f1',
  },
  {
    icon: FaCloud,
    title: 'Currently Exploring',
    description:
      'Diving deeper into cloud-native architecture, machine learning fundamentals, and system design — turning curiosity into practical, shippable projects.',
    accent: '#22d3ee',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Tech() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle background radial */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(99,102,241,0.05) 0%, transparent 60%)' }}
      />

      <div className="container-content relative z-10">

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
          <h2 className="font-display font-bold text-white" style={{ fontSize: 'var(--text-h1)' }}>
            Technologies I{' '}
            <span className="gradient-text">Work With</span>
          </h2>
        </motion.div>

        
        <div
          className="relative mb-16 -mx-[clamp(1.25rem,4vw,4rem)] overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="marquee-track flex items-center gap-12 py-4">
            {[...logos, ...logos].map(({ icon: Icon, label }, i) => (
              <div
                key={`${label}-${i}`}
                className="flex items-center gap-2.5 shrink-0 text-slate-500 hover:text-slate-200 transition-colors duration-300"
                title={label}
              >
                <Icon size={28} />
                <span className="text-sm font-medium whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
        </div>

        
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {narrativeCards.map(({ icon: Icon, title, description, accent }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="relative rounded-xl bg-[#0d1424] p-6 pl-8 overflow-hidden"
              style={{ borderLeft: `3px solid ${accent}` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `${accent}1a` }}
              >
                <Icon size={17} style={{ color: accent }} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
