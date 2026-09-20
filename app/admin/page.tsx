'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  FiPlusCircle,
  FiTrash2,
  FiFolder,
  FiBookOpen,
  FiLogOut,
  FiEye,
  FiEyeOff,
  FiLoader,
} from 'react-icons/fi';
import { fetchProjects, fetchBlogs, deleteProject, deleteBlog } from '@/lib/api';
import { Project, Blog } from '@/types';
import ProjectModal from '@/components/ProjectModal';
import BlogModal from '@/components/BlogModal';
import { useSettings } from '@/context/SiteSettingsContext';

type Tab = 'projects' | 'blogs';

export default function AdminPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { blogsVisible, loading: settingsLoading, updateBlogsVisible } = useSettings();
  const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ── Auth guard ──
  // Deferred via a resolved promise (rather than a direct sync setState call)
  // so state updates happen in a microtask, consistent with the async data-fetch
  // pattern used elsewhere in this app.
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }
    Promise.resolve().then(() => {
      setIsAuthenticated(true);
      setAuthChecked(true);
    });
  }, [router]);

  const refreshProjects = () => fetchProjects().then(setProjects);
  const refreshBlogs = () => fetchBlogs().then(setBlogs);

  useEffect(() => {
    if (!isAuthenticated) return;
    refreshProjects();
    refreshBlogs();
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleDeleteProject = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteProject(id);
      await refreshProjects();
    } catch (err) {
      console.error('Failed to delete project:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteBlog(id);
      await refreshBlogs();
    } catch (err) {
      console.error('Failed to delete blog:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleBlogs = async () => {
    if (settingsLoading || isUpdatingSettings) return;
    setIsUpdatingSettings(true);
    setSettingsError(null);
    try {
      await updateBlogsVisible(!blogsVisible);
    } catch (err) {
      console.error('Failed to toggle blogs visibility:', err);
      setSettingsError('Failed to update setting. Please try again.');
    } finally {
      setIsUpdatingSettings(false);
    }
  };

  // ── Loading / guard states ──
  if (!authChecked) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500 text-sm">Checking authentication…</p>
      </div>
    );
  }

  if (!isAuthenticated) return null; // redirecting

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="relative py-16 min-h-screen overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 60%)' }}
      />

      <div className="container-content relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-1">Dashboard</p>
            <h1
              className="font-extrabold text-white"
              style={{ fontSize: 'var(--text-h1)' }}
            >
              Welcome, <span className="gradient-text">Shanil</span>!
            </h1>
            <p className="text-slate-400 text-sm mt-1">Manage your projects and blogs</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors self-start"
          >
            <FiLogOut size={15} /> Logout
          </button>
        </motion.div>

        {/* ── Action buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          <button
            onClick={() => setShowProjectModal(true)}
            className="shimmer-btn flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl
                       bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm
                       shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow duration-300"
          >
            <FiPlusCircle size={16} /> Add Project
          </button>
          <button
            onClick={() => setShowBlogModal(true)}
            className="shimmer-btn flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl
                       bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold text-sm
                       shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow duration-300"
          >
            <FiPlusCircle size={16} /> Add Blog
          </button>
        </motion.div>

        {/* ── Site Settings ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="rounded-2xl border border-white/5 bg-[#0d1424] p-5 sm:p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div
                className={`p-2.5 rounded-xl border transition-colors ${
                  blogsVisible
                    ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                    : 'bg-white/5 border-white/5 text-slate-400'
                }`}
              >
                {blogsVisible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold text-sm sm:text-base">
                    Blogs Page Visibility
                  </h3>
                  {settingsLoading ? (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
                      Loading…
                    </span>
                  ) : (
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                        blogsVisible
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      }`}
                    >
                      {blogsVisible ? 'Visible to visitors' : 'Hidden from visitors'}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-xs mt-0.5">
                  {blogsVisible
                    ? 'The Blogs page and navigation links are currently public and visible to visitors.'
                    : 'The Blogs page is hidden and navigation links are omitted across the site.'}
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              {isUpdatingSettings && (
                <FiLoader className="animate-spin text-indigo-400" size={16} />
              )}
              <button
                type="button"
                role="switch"
                aria-checked={blogsVisible}
                aria-label="Toggle blogs page visibility"
                disabled={settingsLoading || isUpdatingSettings}
                onClick={handleToggleBlogs}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  blogsVisible ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    blogsVisible ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {settingsError && (
            <p className="text-xs text-rose-400 mt-3 pt-3 border-t border-white/5">
              {settingsError}
            </p>
          )}
        </motion.div>

        {/* ── Tabs ── */}
        <div className="rounded-2xl border border-white/5 bg-[#0d1424] overflow-hidden">
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 py-4 px-6 text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 ${
                activeTab === 'projects'
                  ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <FiFolder size={15} /> Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`flex-1 py-4 px-6 text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 ${
                activeTab === 'blogs'
                  ? 'text-cyan-400 border-b-2 border-cyan-500 bg-cyan-500/5'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <FiBookOpen size={15} /> Blogs ({blogs.length})
            </button>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'projects' && (
                <motion.div
                  key="projects-tab"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {projects.length === 0 ? (
                    <p className="text-slate-500 col-span-full text-center py-16">
                      No projects found. Add your first project!
                    </p>
                  ) : (
                    projects.map((project) => (
                      <motion.div
                        key={project._id}
                        variants={itemVariants}
                        className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-indigo-500/25 transition-colors duration-300"
                      >
                        {project.imageUrl && (
                          <div className="relative w-full h-36">
                            <Image src={project.imageUrl} alt={project.title} fill className="object-cover" sizes="300px" />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="text-white font-semibold text-base truncate">{project.title}</h3>
                          <p className="text-slate-400 text-sm mt-1.5 line-clamp-2">{project.description}</p>
                          <div className="flex justify-end mt-3">
                            <button
                              onClick={() => handleDeleteProject(project._id)}
                              disabled={deletingId === project._id}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200 disabled:opacity-40"
                              aria-label="Delete project"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'blogs' && (
                <motion.div
                  key="blogs-tab"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {blogs.length === 0 ? (
                    <p className="text-slate-500 col-span-full text-center py-16">
                      No blogs found. Add your first blog post!
                    </p>
                  ) : (
                    blogs.map((blog) => (
                      <motion.div
                        key={blog._id}
                        variants={itemVariants}
                        className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-cyan-500/25 transition-colors duration-300"
                      >
                        {blog.imageUrl && (
                          <div className="relative w-full h-36">
                            <Image src={blog.imageUrl} alt={blog.title} fill className="object-cover" sizes="300px" />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="text-white font-semibold text-base truncate">{blog.title}</h3>
                          <p className="text-slate-400 text-sm mt-1.5 line-clamp-2">{blog.description}</p>
                          <div className="flex justify-end mt-3">
                            <button
                              onClick={() => handleDeleteBlog(blog._id)}
                              disabled={deletingId === blog._id}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200 disabled:opacity-40"
                              aria-label="Delete blog"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onProjectAdded={refreshProjects}
      />
      <BlogModal
        isOpen={showBlogModal}
        onClose={() => setShowBlogModal(false)}
        onBlogAdded={refreshBlogs}
      />
    </div>
  );
}
