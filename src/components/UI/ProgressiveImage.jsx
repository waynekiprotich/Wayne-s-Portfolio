import { useState } from 'react'

export default function ProgressiveImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  skeletonClassName = '',
  priority = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton / Blur Placeholder */}
      <div
        className={`absolute inset-0 bg-stone/20 dark:bg-white/10 animate-pulse transition-opacity duration-500 ease-out z-0 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        } ${skeletonClassName}`}
      />
      
      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out z-10 relative ${
          isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'
        } ${imageClassName}`}
        {...props}
      />
    </div>
  )
}
