'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  // Spotlight: track mouse position relative to card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="relative group h-full flex flex-col rounded-2xl border border-white/5 bg-[#0d1424] overflow-hidden cursor-default"
      style={{ isolation: 'isolate' }}
    >
      {/* ── Spotlight glow ── */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl z-10"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(99,102,241,0.12), transparent 70%)`,
        }}
      />

      {/* ── Border glow on hover ── */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.4)',
        }}
      />

      {/* ── Project image — fixed height, same on every card ── */}
      <div className="relative w-full h-48 shrink-0 overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900/40 to-cyan-900/20 flex items-center justify-center">
            <FaGithub size={40} className="text-indigo-400/40" />
          </div>
        )}
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-transparent" />
      </div>

      {/* ── Content ──
          `flex-1 flex flex-col` lets this area grow to fill whatever space
          is left after the fixed-height image, and the footer block below
          (tech chips + GitHub link) is pinned to the bottom via `mt-auto`.
          Combined with the parent's `h-full` and the marquee track's flex
          row (which stretches every card to match the tallest one), every
          card ends up the same overall height regardless of how much
          title/description text it has — short cards no longer look
          shorter, they just get more breathing room above the footer. ── */}
      <div className="relative z-20 p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-indigo-300 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description — 3 lines max */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mt-3">
          {project.description}
        </p>

        {/* Footer — tech chips + GitHub link, always pinned to the bottom */}
        <div className="mt-auto pt-3 space-y-3">
          {project.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 5 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-slate-400 border border-white/10">
                  +{project.techStack.length - 5}
                </span>
              )}
            </div>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors duration-200 group/link"
            >
              <FaGithub size={14} className="group-hover/link:rotate-12 transition-transform duration-200" />
              View on GitHub
              <FaExternalLinkAlt size={10} className="opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all duration-200" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
