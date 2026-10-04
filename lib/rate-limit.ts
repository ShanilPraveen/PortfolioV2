import { NextRequest } from 'next/server';

interface RateLimitRecord {
  count: number;
  lastReset: number;
}

// In-memory store for rate limiting tracking
const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Cleans up stale entries to prevent memory growth.
 *
 * @param windowMs - Time window in milliseconds.
 */
function cleanupStaleEntries(windowMs: number) {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now - record.lastReset > windowMs * 2) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Tracks request counts per identifier within a sliding time window.
 *
 * @param identifier - Unique identifier (e.g. client IP or combined IP + route).
 * @param limit - Maximum requests allowed within windowMs.
 * @param windowMs - Time window in milliseconds.
 * @returns An object indicating whether the request is allowed (`success`) and how many requests are remaining (`remaining`).
 */
export function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): { success: boolean; remaining: number } {
  const now = Date.now();

  // Run cleanup occasionally
  if (Math.random() < 0.1) {
    cleanupStaleEntries(windowMs);
  }

  const record = rateLimitStore.get(identifier);

  if (!record || now - record.lastReset > windowMs) {
    rateLimitStore.set(identifier, {
      count: 1,
      lastReset: now,
    });
    return {
      success: true,
      remaining: limit - 1,
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
  };
}

/**
 * Extracts the client IP from `x-forwarded-for` (first entry, trimmed) or `x-real-ip` headers,
 * falling back to `'unknown'`.
 *
 * @param request - The incoming NextRequest.
 * @returns The client IP string.
 */
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}
