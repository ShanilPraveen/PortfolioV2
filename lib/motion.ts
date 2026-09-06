import type { Variants } from 'motion/react';

/**
 * Shared Motion (formerly Framer Motion) tokens.
 *
 * Before this file, nearly every page/section redefined its own version of
 * the same fade-up entrance variant (e.g. `fadeInUp`, `itemVariants`,
 * `cardVariants` in about/page.tsx, Hero.tsx, Tech.tsx, Contact.tsx, etc.),
 * all using slightly different but functionally identical values. That
 * duplication is also what made the site's motion feel copy-pasted rather
 * than authored — the same effect, redefined N times, is still just one
 * effect.
 *
 * This file is the single source of truth going forward. As each page is
 * migrated in later phases, its local variant objects get replaced with
 * imports from here. Existing per-file duplicates are left alone until that
 * page's phase is reached (per DESIGN_UPGRADE_TASKS.md 0.5) — this task only
 * establishes the shared tokens.
 */

/** Standard "ease-out-ish" curve used across all entrance animations. */
export const EASE_STANDARD = [0.22, 1, 0.36, 1] as const;

/** Shared duration scale, in seconds. */
export const DURATION = {
  fast: 0.3,
  base: 0.5,
  slow: 0.8,
} as const;

/**
 * Single-element fade + rise entrance. The most common animation in the
 * codebase today (previously duplicated as `fadeInUp` / similar in most
 * page and section files) — this is the canonical version.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_STANDARD },
  },
};

/**
 * Parent wrapper for staggering a group of `fadeUp` (or similar) children
 * as they enter. Replaces the various `staggerContainer` / `containerVariants`
 * duplicates.
 */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

/** Slightly larger rise, for hero-scale headline entrances. */
export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_STANDARD },
  },
};

/** Fade + scale, used for modal/card entrances that shouldn't travel far. */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE_STANDARD },
  },
};

/** Standard viewport options for `whileInView` scroll-triggered reveals. */
export const VIEWPORT_ONCE = { once: true, margin: '-80px' } as const;
