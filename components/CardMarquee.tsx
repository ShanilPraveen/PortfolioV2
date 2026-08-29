'use client';
import { ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';

interface CardMarqueeProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderCard: (item: T) => ReactNode;
  cardWidthClass?: string;
  durationSeconds?: number;
}

export default function CardMarquee<T>({
  items,
  getKey,
  renderCard,
  cardWidthClass = 'w-[360px] sm:w-[400px]',
  durationSeconds = 60,
}: CardMarqueeProps<T>) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {items.map((item) => (
          <div key={getKey(item)}>{renderCard(item)}</div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative -mx-[clamp(1.25rem,4vw,4rem)] overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
      }}
    >
      <div
        className="marquee-track flex items-stretch gap-5 px-[clamp(1.25rem,4vw,4rem)]"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={`${getKey(item)}-${i}`} className={`${cardWidthClass} shrink-0`}>
            {renderCard(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
