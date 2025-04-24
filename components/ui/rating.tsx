'use client';
import { Star } from 'lucide-react';
import React, { useState } from 'react';

/**
 * RatingStar Component
 *
 * Props:
 * - totalStars: number of stars to display (default: 5)
 * - initialRating: initial rating value (default: 0)
 * - onChange: callback when rating changes
 */
export default function RatingStar({
  totalStars = 5,
  initialRating = 0,
  onChange,
}: {
  totalStars?: number;
  initialRating?: number;
  onChange?: (value: number) => void;
}) {
  const [rating, setRating] = useState(initialRating);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (value: number) => {
    setRating(value);
    if (onChange) onChange(value);
  };

  return (
    <div className='flex items-center space-x-1'>
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        const filled = hovered !== null ? starValue <= hovered : starValue <= rating;
        return (
          <button
            className='focus:outline-none'
            disabled={!onChange}
            key={starValue}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(null)}
            type='button'>
            <Star fill={filled ? '#FFC42C' : '#999'} size={24} strokeWidth={0} />
          </button>
        );
      })}
    </div>
  );
}
