
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

  const cursorClasses = `
    fixed pointer-events-none z-50 transition-transform duration-150
    flex items-center justify-center
    ${hidden ? 'opacity-0' : 'opacity-100'} 
    ${clicked ? 'scale-90' : ''}
    ${linkHovered ? 'scale-150' : ''}
  `;

  return (
    <>
      <div 
        className={`${cursorClasses} w-5 h-5 rounded-full bg-primary/30 backdrop-blur-sm duration-200 -ml-2.5 -mt-2.5`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`${cursorClasses} w-3 h-3 rounded-full bg-primary -ml-1.5 -mt-1.5`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transition: "left 0.15s ease-out, top 0.15s ease-out"
        }}
      />
    </>
  );
}
