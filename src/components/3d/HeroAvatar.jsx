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
        className="w-full h-full rounded-full border border-fog dark:border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(255,255,255,0.08)] transition-transform duration-200 ease-out"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(30px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 dark:from-white/10 to-transparent mix-blend-overlay z-10" />
        <img 
          src="/your-avatar.png" 
          alt="Wayne" 
          className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
        />
      </div>
    </div>
  );
}