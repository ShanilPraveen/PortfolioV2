'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FaArrowRight } from 'react-icons/fa';
import { fetchProjects } from '@/lib/api';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import CardMarquee from '@/components/CardMarquee';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then((data) => { setProjects(data); setLoading(false); });
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle top radial */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 60%)' }}
      />

      <div className="container-content relative z-10">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div className="space-y-2">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">Portfolio</p>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'var(--text-h1)' }}>
              Featured{' '}
              <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-md">
              A selection of things I&apos;ve built — from full-stack apps to explorations in ML.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors shrink-0"
          >
            View all projects
            <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* ── Loading skeleton ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-2xl bg-[#0d1424] border border-white/5 overflow-hidden animate-pulse">
                <div className="h-48 bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">No projects yet — check back soon!</p>
          </div>
        )}

        {/* ── Continuous card marquee — every project as an equal-height
            card, scrolling left forever and pausing on hover, the same
            treatment as the Tech section's logo strip. ── */}
        {!loading && projects.length > 0 && (
          <CardMarquee
            items={projects}
            getKey={(p) => p._id}
            renderCard={(p) => <ProjectCard project={p} />}
          />
        )}

        {/* ── View all CTA ── */}
        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 text-center"
          >
            <Link
              href="/projects"
              className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl
                         bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold
                         shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300"
            >
              View All Projects
              <FaArrowRight size={13} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
