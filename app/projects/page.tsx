'use client';
import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaLaptopCode } from 'react-icons/fa';
import { fetchProjects } from '@/lib/api';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="relative py-20 px-6 overflow-hidden min-h-screen">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14 space-y-4"
        >
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <FaLaptopCode size={22} className="text-white" />
            </div>
          </div>
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Explore My Top <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            Things I&apos;ve built with passion and dedication — each one a unique
            challenge and learning experience.
          </p>
        </motion.div>

        {/* ── Loading skeleton ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-[#0d1424] border border-white/5 overflow-hidden animate-pulse">
                <div className="h-48 bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-24 text-slate-500">
            <FaLaptopCode size={40} className="mx-auto mb-4 text-slate-600" />
            <p className="text-lg">No projects yet — check back soon!</p>
          </div>
        )}

        {/* ── Grid ── */}
        {!loading && projects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((project) => (
              <motion.div key={project._id} variants={cardVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
