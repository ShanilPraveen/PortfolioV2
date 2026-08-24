'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { fetchProjects } from '@/lib/api';
import { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';

const ITEMS_PER_PAGE_DESKTOP = 2;
const ITEMS_PER_PAGE_MOBILE  = 1;

export default function Projects() {
  const [projects, setProjects]   = useState<Project[]>([]);
  const [loading, setLoading]     = useState(true);
  const [page, setPage]           = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isMobile, setIsMobile]   = useState(false);

  useEffect(() => {
    fetchProjects().then((data) => { setProjects(data); setLoading(false); });
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const perPage  = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;
  const total    = Math.ceil(projects.length / perPage);
  const slice    = projects.slice(page * perPage, page * perPage + perPage);

  const prev = () => {
    if (page === 0) return;
    setDirection(-1);
    setPage((p) => p - 1);
  };

  const next = () => {
    if (page >= total - 1) return;
    setDirection(1);
    setPage((p) => p + 1);
  };

  const slideVariants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: 0.3 } }),
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Subtle top radial */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

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
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[0, 1].map((i) => (
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
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">No projects yet — check back soon!</p>
          </div>
        )}

        {/* ── Carousel ── */}
        {!loading && projects.length > 0 && (
          <div className="space-y-6">
            {/* Cards with AnimatePresence */}
            <div className="relative overflow-hidden min-h-[360px] flex items-start">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
                >
                  {slice.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            {total > 1 && (
              <div className="flex items-center justify-between">
                {/* Dot indicators */}
                <div className="flex gap-2">
                  {Array.from({ length: total }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
                      className={`rounded-full transition-all duration-300 ${
                        i === page
                          ? 'w-6 h-2 bg-indigo-500'
                          : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Prev / Next */}
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    disabled={page === 0}
                    className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center
                               text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10
                               disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                    aria-label="Previous"
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  <button
                    onClick={next}
                    disabled={page >= total - 1}
                    className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center
                               text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10
                               disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                    aria-label="Next"
                  >
                    <FaChevronRight size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
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
