'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Button from '@/components/Button';

interface CardStackProps {
  items: {
    id: number;
    title: string;
    excerpt: string;
    description: string;
    date: string;
    image: string;
  }[];
  className?: string;
}

export const CardStack = ({ items, className }: CardStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(items.length - 1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(activeIndex);
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
        setIsAnimating(false);
      }, 600); // Animation duration
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [activeIndex, items.length]);

  return (
    <div className={cn('relative h-[450px]  w-[90%] lg:w-full mx-auto ', className)}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const isPrevActive = index === prevIndex && isAnimating;

        // Calculate relative position in stack (0 = active, 1 = next, etc.)
        const getRelativePosition = () => {
          if (isActive) return 0;
          if (isPrevActive) return -1; // Exiting card

          // Calculate position for stacked cards
          return index < activeIndex ? index - activeIndex + items.length : index - activeIndex;
        };

        const relativePos = getRelativePosition();

        // Calculate position based on relative position
        const getPosition = () => {
          // Exiting card (sliding left)
          if (isPrevActive) {
            return {
              x: 100, // Slide far to the left
              y: 0,
              scale: 0.9,
              opacity: 0.5,
              zIndex: 40,
            };
          }

          // Active card (top of stack)
          if (isActive) {
            return {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1, // Less opaque for active card
              zIndex: 50,
            };
          }

          // Calculate horizontal offset for stacked cards (more to the left)
          const xOffset = -30 * relativePos; // Negative for leftward stacking
          const yOffset = 20 * relativePos; // Small vertical offset

          // Deeper cards are more opaque
          const cardOpacity = Math.min(0.9, 0.7 + relativePos * 0.1);

          return {
            x: xOffset,
            y: yOffset,
            scale: 1 - relativePos * 0.03,
            opacity: cardOpacity,
            zIndex: 30 - relativePos,
          };
        };

        const position = getPosition();

        return (
          <div
            key={item.id}
            className={cn(
              'absolute top-0 left-0 w-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 border border-[#45084a]',
            )}
            style={{
              transform: `translateX(${position.x}px) translateY(${position.y}px) scale(${position.scale})`,
              opacity: position.opacity,
              zIndex: position.zIndex,
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={400}
              className="w-full h-56 lg:h-60 object-cover "
            />
            <div className="p-6 rounded-t-2xl">
              <h3 className="text-lg font-semibold text-[#45084a] mb-2">{item.title}</h3>
              <p className="text-sm mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{item.date}</span>
                <Button className="bg-[#45084a] hover:bg-[#5a0a61] text-white rounded-md px-4 py-2">
                  Continue Reading
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
