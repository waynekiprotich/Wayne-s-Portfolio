// src/components/3d/HeroAvatar.jsx
import { useTilt } from '../../hooks/useTilt';

export default function HeroAvatar() {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = useTilt(20);

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
      className="w-64 h-64 mx-auto relative group"
    >
      <div 
        className="w-full h-full rounded-full border border-glass-border overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)] transition-transform duration-200 ease-out"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(30px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyber-cyan/20 to-transparent mix-blend-overlay z-10" />
        <img 
          src="/your-avatar.png" 
          alt="Wayne" 
          className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
        />
      </div>
    </div>
  );
}