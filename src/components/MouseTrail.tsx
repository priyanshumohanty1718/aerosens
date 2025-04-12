
import React, { useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  id: number;
}

export function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const maxParticles = 15;
  const particleLifespan = 20;

  useEffect(() => {
    let nextId = 0;
    let isMoving = false;
    let lastX = 0;
    let lastY = 0;
    let lastTimestamp = 0;
    
    const throttle = (callback: Function, delay: number) => {
      let lastCall = 0;
      return function(...args: any[]) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return callback(...args);
      };
    };

    const handleMouseMove = throttle((e: MouseEvent) => {
      const { clientX, clientY } = e;
      const timestamp = Date.now();
      
      // Only add particles if cursor is moving at a certain speed
      const dx = Math.abs(clientX - lastX);
      const dy = Math.abs(clientY - lastY);
      const dt = timestamp - lastTimestamp;
      const speed = Math.sqrt(dx * dx + dy * dy) / Math.max(1, dt);
      
      if (speed > 0.1) {
        isMoving = true;
        
        // Add new particle
        setParticles(prev => {
          // Remove oldest particles if we exceed max
          let newParticles = [...prev];
          if (newParticles.length >= maxParticles) {
            newParticles = newParticles.slice(1);
          }
          
          // Add new particle
          return [
            ...newParticles, 
            {
              x: clientX,
              y: clientY,
              size: Math.min(10, Math.max(5, speed * 5)),
              alpha: 0.6,
              id: nextId++
            }
          ];
        });
      } else {
        isMoving = false;
      }
      
      lastX = clientX;
      lastY = clientY;
      lastTimestamp = timestamp;
    }, 30);

    // Fade out and remove particles
    const updateParticles = () => {
      setParticles(prev => 
        prev.map(p => ({ ...p, alpha: p.alpha - (1/particleLifespan) }))
          .filter(p => p.alpha > 0)
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    const interval = setInterval(updateParticles, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="mouse-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.alpha
          }}
        />
      ))}
    </>
  );
}
