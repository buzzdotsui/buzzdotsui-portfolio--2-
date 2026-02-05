import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  wrapperClassName = "",
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Background skeleton/placeholder while loading */}
      <div 
        className={`absolute inset-0 bg-surfaceHighlight/50 backdrop-blur-sm transition-opacity duration-700 ${
          isLoading ? 'opacity-100' : 'opacity-0'
        }`} 
      />
      
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoading(false)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoading ? 'scale-110 blur-xl grayscale' : 'scale-100 blur-0 grayscale-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};