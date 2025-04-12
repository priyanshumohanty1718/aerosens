
import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const mMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };

    // Link hover detection
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    const addLinkEvents = () => {
      const links = document.querySelectorAll('a, button, [role="button"]');
      links.forEach(link => {
        link.addEventListener('mouseenter', handleLinkHoverStart);
        link.addEventListener('mouseleave', handleLinkHoverEnd);
      });
    };

    window.addEventListener("mousemove", mMove);
    window.addEventListener("mouseout", mLeave);
    window.addEventListener("mousedown", mDown);
    
    // Add link events after a short delay to ensure DOM is ready
    const timeout = setTimeout(addLinkEvents, 1000);

    return () => {
      window.removeEventListener("mousemove", mMove);
      window.removeEventListener("mouseout", mLeave);
      window.removeEventListener("mousedown", mDown);
      clearTimeout(timeout);

      const links = document.querySelectorAll('a, button, [role="button"]');
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  // Simplified cursor with premium effects
  return (
    <div 
      className={`
        fixed pointer-events-none z-50 transition-all duration-150
        mix-blend-difference
        ${hidden ? 'opacity-0' : 'opacity-100'} 
        ${clicked ? 'scale-90' : ''}
        ${linkHovered ? 'scale-150' : ''}
      `}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `translate(-50%, -50%)`,
        width: '24px',
        height: '24px',
        border: '2px solid white',
        borderRadius: '50%',
        transition: linkHovered ? 'transform 0.3s ease-out, opacity 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out' : 
                   'transform 0.1s ease-out, opacity 0.1s ease-out, left 0.05s linear, top 0.05s linear'
      }}
    />
  );
}
