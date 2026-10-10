import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const MartStarRating = ({ rating, count, onRatingChange, interactive = false }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 fill-yellow-400 text-yellow-400 ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => interactive && onRatingChange && onRatingChange(i)}
        />
      );
    } else if (i === fullStars + 1 && hasHalfStar && !interactive) {
      stars.push(<StarHalf key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    } else {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 text-gray-300 ${interactive ? 'cursor-pointer hover:text-yellow-400 hover:scale-110 transition-transform' : ''}`}
          onClick={() => interactive && onRatingChange && onRatingChange(i)}
        />
      );
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      {count !== undefined && <span className="text-sm text-gray-500 ml-1">({count})</span>}
    </div>
  );
};

export default MartStarRating;
