'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { Project } from '@/types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const isOpen = project !== null;

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          key="project-detail-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            key="project-detail-panel"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#0d1424] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Hero image */}
            <div className="relative w-full h-52 sm:h-64 shrink-0 overflow-hidden">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-900/50 to-cyan-900/30 flex items-center justify-center">
                  <FaCode size={48} className="text-indigo-400/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-[#0d1424]/20 to-transparent" />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,102,241,0.18) 0%, transparent 70%)' }}
              />
              <button
                onClick={onClose}
                aria-label="Close project details"
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 hover:text-white hover:bg-black/60 backdrop-blur-sm transition-all duration-200"
              >
                <FaTimes size={15} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div>
                <h2
                  className="font-display text-white font-bold leading-tight"
                  style={{ fontSize: 'var(--text-h2)' }}
                >
                  {project.title}
                </h2>
              </div>

              <div>
                <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-2">
                  About this project
                </p>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {project.techStack?.length > 0 && (
                <div>
                  <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-3">
                    Tech stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/25"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="shrink-0 px-6 py-4 border-t border-white/5 flex items-center justify-between gap-4 bg-[#0a1120]">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-all duration-200"
              >
                Close
              </button>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300"
                >
                  <FaGithub size={14} />
                  View on GitHub
                  <FaExternalLinkAlt size={10} className="opacity-70" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
