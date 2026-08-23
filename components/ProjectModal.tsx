'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import { addProject } from '@/lib/api';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: () => void;
}

export default function ProjectModal({ isOpen, onClose, onProjectAdded }: ProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [techStack, setTechStack] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Preview selected image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const resetForm = () => {
    setTitle(''); setDescription(''); setGithubUrl('');
    setTechStack(''); setImage(null); setPreview(null); setError('');
  };

  const handleClose = () => { resetForm(); onClose(); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) { setError('Title and description are required.'); return; }
    if (!image) { setError('Please select a project image.'); return; }

    setLoading(true);
    setError('');
    try {
      await addProject({ title, description, githubUrl, techStack, image });
      onProjectAdded();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add project.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            key="project-modal-box"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0d1424] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h2 className="text-white font-semibold text-lg">Add New Project</h2>
                <p className="text-slate-500 text-xs mt-0.5">Fill in the details below</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">

              {/* Image upload */}
              <div
                onClick={() => fileRef.current?.click()}
                className="relative cursor-pointer group rounded-xl border-2 border-dashed border-white/10 hover:border-indigo-500/50 transition-colors duration-200 overflow-hidden"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-36 object-cover" />
                ) : (
                  <div className="h-36 flex flex-col items-center justify-center gap-2 text-slate-500 group-hover:text-indigo-400 transition-colors">
                    <FaCloudUploadAlt size={28} />
                    <span className="text-sm">Click to upload project image</span>
                    <span className="text-xs text-slate-600">JPG, PNG — recommended 16:9</span>
                  </div>
                )}
                {preview && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                    <span className="text-white text-sm font-medium">Change Image</span>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Title */}
              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Portfolio Website"
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe what this project does..."
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">GitHub URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/ShanilPraveen/..."
                  className={inputClass}
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">Tech Stack</label>
                <input
                  type="text"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="React, Node.js, MongoDB  (comma-separated)"
                  className={inputClass}
                />
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                >
                  {error}
                </motion.p>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-1 pb-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="shimmer-btn flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Uploading…
                    </span>
                  ) : 'Add Project'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
