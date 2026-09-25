'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import { addMemory } from '@/lib/api';
import { Memory } from '@/types';

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemoryAdded: (newMemory?: Memory) => void;
}

export default function MemoryModal({ isOpen, onClose, onMemoryAdded }: MemoryModalProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const resetForm = () => {
    setImage(null);
    setPreview(null);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const newMemory = await addMemory({ image });
      onMemoryAdded(newMemory);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload photo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="memory-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            key="memory-modal-box"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0d1424] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10">
              <div>
                <h2 className="text-white font-semibold text-lg">Upload Memory Snapshot</h2>
                <p className="text-slate-500 text-xs mt-0.5">Add a new photo to Experiences & Memories</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-5 space-y-4">
              {/* Image upload area */}
              <div
                onClick={() => fileRef.current?.click()}
                className="relative cursor-pointer group rounded-xl border-2 border-dashed border-white/10 hover:border-indigo-500/50 transition-colors duration-200 overflow-hidden bg-white/[0.02]"
              >
                {preview ? (
                  <div className="relative w-full h-56 sm:h-64 flex items-center justify-center bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preview}
                      alt="Memory preview"
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                      <span className="text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                        Change Image
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-52 sm:h-60 flex flex-col items-center justify-center gap-2.5 text-slate-500 group-hover:text-indigo-400 transition-colors px-4 text-center">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      <FaCloudUploadAlt size={26} />
                    </div>
                    <span className="text-sm font-medium text-slate-300">Click or tap to select image</span>
                    <span className="text-xs text-slate-500">Supports JPG, PNG, WebP (auto-optimized via Cloudinary)</span>
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

              {/* Error message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs sm:text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                >
                  {error}
                </motion.p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !image}
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
                  ) : (
                    'Upload Photo'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
