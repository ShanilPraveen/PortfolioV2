'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { FaBookOpen, FaArrowRight } from 'react-icons/fa';
import { Blog } from '@/types';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () =>
    setSpotlight((s) => ({ ...s, opacity: 0 }));

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
      {/* ── Spotlight glow (cyan for blogs) ── */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl z-10"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(34,211,238,0.10), transparent 70%)`,
        }}
      />

      {/* ── Border glow ── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(34,211,238,0.35)' }}
      />

      {/* ── Blog image — fixed height, same on every card ── */}
      <div className="relative w-full h-44 shrink-0 overflow-hidden">
        {blog.imageUrl ? (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-900/30 to-indigo-900/20 flex items-center justify-center">
            <FaBookOpen size={36} className="text-cyan-400/40" />
          </div>
        )}
        {/* Gradient fade into card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-transparent" />

        {/* Blog tag badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 backdrop-blur-sm">
            Blog
          </span>
        </div>
      </div>

      {/* ── Content ──
          Same `flex-1` + `mt-auto` pattern as ProjectCard: the "Read more"
          footer is pinned to the bottom regardless of description length,
          and the marquee track's flex-row stretch equalizes overall card
          height across the whole strip. ── */}
      <div className="relative z-20 p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mt-3">
          {blog.description}
        </p>

        {/* Read more indicator */}
        <div className="mt-auto pt-3 flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-cyan-400 transition-colors duration-200">
          <FaBookOpen size={13} />
          <span>Read more</span>
          <FaArrowRight
            size={11}
            className="-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
          />
        </div>
      </div>
    </motion.div>
  );
}
