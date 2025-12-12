import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const RatingStars = ({ rating = 0, size = 'md', showNumber = true, interactive = false, onRatingChange }) => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <FaStar 
            key={i}
            className={`${sizeClasses[size]} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''} text-[#00ff88]`}
            onClick={() => interactive && onRatingChange && onRatingChange(i)}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <FaStarHalfAlt 
            key={i}
            className={`${sizeClasses[size]} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''} text-[#00ff88]`}
            onClick={() => interactive && onRatingChange && onRatingChange(i)}
          />
        );
      } else {
        stars.push(
          <FaRegStar 
            key={i}
            className={`${sizeClasses[size]} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''} text-gray-500`}
            onClick={() => interactive && onRatingChange && onRatingChange(i)}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {renderStars()}
      </div>
      {showNumber && (
        <span className={`${textSizes[size]} font-semibold text-[#00ff88]`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;