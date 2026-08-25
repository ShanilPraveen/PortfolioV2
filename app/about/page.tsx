'use client';
import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import {
  FaBook,
  FaCode,
  FaCloud,
  FaDatabase,
  FaBrain,
  FaCamera,
  FaMountain,
  FaMusic,
  FaImages,
} from 'react-icons/fa';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const education = [
  {
    school: 'University of Moratuwa, Sri Lanka',
    period: '2022 – Present',
    degree: 'BSc in Computer Science & Engineering',
    description:
      "Currently pursuing a Bachelor's degree in Computer Science, building a strong foundation in data structures, advanced algorithms, artificial intelligence, and software engineering principles. University life has deepened my technical skills and broadened my perspective on real-world problem solving.",
  },
  {
    school: 'Taxila Central College Horana',
    period: '2013 – 2021',
    degree: 'Secondary & Advanced Level Education',
    description:
      'My journey in technology and creativity would not have been possible without the strong foundation laid by my school — an environment that nurtured curiosity, discipline, and a deep appreciation for learning, guided by dedicated teachers and a vibrant academic community.',
  },
];

const explorations = [
  {
    icon: FaCode,
    title: 'Full-Stack Development',
    description: 'Building responsive, scalable web applications with modern frameworks — from frontend aesthetics to backend performance.',
  },
  {
    icon: FaCloud,
    title: 'Cloud Computing',
    description: 'Exploring infrastructure as code, serverless architectures, and cloud-native development for resilient applications.',
  },
  {
    icon: FaDatabase,
    title: 'Databases',
    description: 'Working with SQL and NoSQL databases, data modeling, and optimization techniques for efficient storage solutions.',
  },
  {
    icon: FaBrain,
    title: 'AI / ML',
    description: 'Diving into machine learning algorithms, neural networks, and data analysis to build intelligent, real-world applications.',
  },
];

const interests = [
  {
    icon: FaCamera,
    title: 'Photography',
    image: '/images/photography.jpg',
    description:
      'Capturing moments and perspectives through the lens — landscape and street photography, always chasing unique compositions and light.',
  },
  {
    icon: FaMountain,
    title: 'Hiking',
    image: '/images/hiking.jpg',
    description:
      "Exploring nature and pushing myself on new trails. There's something profoundly rewarding about reaching a summit and taking in the view.",
  },
  {
    icon: FaMusic,
    title: 'Music',
    image: '/images/music.jpg',
    description:
      'Finding inspiration and relaxation through various genres — I build playlists that match my mood and keep me focused while coding.',
  },
];

const galleryImages = [
  '/images/Memo/1.jpg',
  '/images/Memo/1.1.jpg',
  '/images/Memo/2.jpg',
  '/images/Memo/3.jpg',
  '/images/Memo/4.jpg',
  '/images/Memo/5.jpg',
  '/images/Memo/6.jpg',
  '/images/Memo/7.jpeg',
  '/images/Memo/8.jpg',
  '/images/Memo/9.jpg',
  '/images/Memo/10.jpg',
  '/images/Memo/11.jpg',
  '/images/Memo/12.jpg',
  '/images/Memo/13.jpg',
  '/images/Memo/14.jpg',
  '/images/Memo/15.jpg',
  '/images/Memo/16.jpg',
  '/images/Memo/17.jpg',
  '/images/Memo/18.jpg',
  '/images/Memo/19.jpg',
];

function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-center gap-3 mb-10"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
        {accent}
      </div>
      <div>
        <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest">{eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="relative py-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 60%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Page heading ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-20 space-y-4"
        >
          <motion.p variants={fadeInUp} className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
            Get To Know Me
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white">
            About <span className="gradient-text">Me</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            A passionate developer and lifelong learner with diverse interests and experiences.
          </motion.p>
        </motion.div>

        {/* ── Education ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mb-20"
        >
          <SectionHeading eyebrow="Academic Background" title="Education" accent={<FaBook size={16} className="text-white" />} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {education.map((edu) => (
              <motion.div
                key={edu.school}
                variants={fadeInUp}
                className="rounded-2xl border border-white/5 bg-[#0d1424] p-6 hover:border-indigo-500/30 transition-colors duration-300"
              >
                <h3 className="text-white font-semibold text-lg">{edu.school}</h3>
                <p className="text-indigo-400 text-sm font-medium mt-1">{edu.period}</p>
                <p className="text-slate-300 text-sm font-medium mt-2">{edu.degree}</p>
                <p className="text-slate-400 text-sm leading-relaxed mt-3">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Current Explorations ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mb-20"
        >
          <SectionHeading eyebrow="What I'm Learning" title="Current Explorations" accent={<FaCode size={16} className="text-white" />} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {explorations.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="rounded-2xl border border-white/5 bg-[#0d1424] p-6 flex flex-col items-center text-center gap-3 hover:border-cyan-500/30 transition-colors duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Icon size={18} className="text-cyan-400" />
                </div>
                <h4 className="text-white font-semibold text-base">{title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Personal Interests ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mb-20"
        >
          <SectionHeading eyebrow="Beyond Code" title="Personal Interests" accent={<FaMountain size={16} className="text-white" />} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {interests.map(({ icon: Icon, title, image, description }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className="rounded-2xl border border-white/5 bg-[#0d1424] overflow-hidden hover:border-indigo-500/30 transition-colors duration-300"
              >
                <div className="relative w-full h-48">
                  <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-indigo-400" />
                    <h4 className="text-white font-semibold text-base">{title}</h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Experiences & Memories ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mb-20"
        >
          <SectionHeading eyebrow="Snapshots" title="Experiences & Memories" accent={<FaImages size={16} className="text-white" />} />

          <motion.div variants={fadeInUp} className="rounded-2xl border border-white/5 bg-[#0d1424] p-6">
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Throughout my journey, I&apos;ve taken part in programs, projects, and memorable
              experiences that have shaped my skills and perspective. Each opportunity and
              cherished memory has contributed to my growth as a developer, problem solver,
              and individual — inspiring me to keep exploring and learning beyond the screen.
            </p>

            <div className="columns-2 sm:columns-3 md:columns-4 gap-3 [column-fill:_balance]">
              {galleryImages.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                  whileHover={{ scale: 1.03 }}
                  className="mb-3 rounded-xl overflow-hidden border border-white/5 break-inside-avoid relative"
                >
                  <Image
                    src={src}
                    alt={`Memory ${i + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ── Closing quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center pt-8 border-t border-white/5"
        >
          <h3 className="text-2xl sm:text-3xl font-bold gradient-text mb-4">
            &quot;Stay curious. Keep building. Explore beyond the screen.&quot;
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            This philosophy guides my approach to both technology and life — continuous
            learning, meaningful projects, and finding inspiration in the world around us.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
