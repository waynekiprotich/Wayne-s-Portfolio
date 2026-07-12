import { useEffect, useRef } from 'react';

export default function useScrollLock(active) {
  const originalStyle = useRef(null);

  useEffect(() => {
    if (!active) return;

    originalStyle.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle.current;
    };
  }, [active]); 
}