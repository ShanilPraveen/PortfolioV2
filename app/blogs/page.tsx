'use client';
import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { IoNewspaperSharp } from 'react-icons/io5';
import { fetchBlogs } from '@/lib/api';
import { Blog } from '@/types';
import BlogCard from '@/components/BlogCard';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs().then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="relative py-20 px-6 overflow-hidden min-h-screen">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(34,211,238,0.06) 0%, transparent 60%)' }}
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <IoNewspaperSharp size={22} className="text-white" />
            </div>
          </div>
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Writing</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Explore My <span className="gradient-text">Blogs</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            Thoughts, tutorials and deep-dives on tech, development and everything in between.
          </p>
        </motion.div>

        {/* ── Loading skeleton ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-[#0d1424] border border-white/5 overflow-hidden animate-pulse">
                <div className="h-44 bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-24 text-slate-500">
            <IoNewspaperSharp size={40} className="mx-auto mb-4 text-slate-600" />
            <p className="text-lg">No blogs yet — coming soon!</p>
          </div>
        )}

        {/* ── Grid ── */}
        {!loading && blogs.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {blogs.map((blog) => (
              <motion.div key={blog._id} variants={cardVariants}>
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
