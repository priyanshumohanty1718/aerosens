
import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud } from 'lucide-react';

interface AnimatedLogoProps {
  className?: string;
  variant?: 'default' | 'large';
  asLink?: boolean;
}

export default function AnimatedLogo({ 
  className = "", 
  variant = "default",
  asLink = true
}: AnimatedLogoProps) {
  const isLarge = variant === 'large';
  
  const LogoContent = () => (
    <div className={`
      group flex items-center space-x-2 transition-all 
      hover:scale-105 duration-300 ${className}
    `}>
      <div className={`
        relative ${isLarge ? 'h-12 w-12' : 'h-8 w-8'} 
        rounded-full bg-gradient-to-br from-primary via-blue-400 to-cyan-300 
        p-0.5 shadow-lg animate-pulse-slow overflow-hidden
        after:content-[''] after:absolute after:inset-0 
        after:bg-gradient-to-br after:from-transparent after:via-white/10 after:to-transparent 
        after:rotate-45 after:animate-shine
      `}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Cloud className={`${isLarge ? 'h-6 w-6' : 'h-4 w-4'} text-white drop-shadow-md group-hover:animate-bounce transition-all`} />
        </div>
      </div>
      <span className={`
        font-bold tracking-tight bg-clip-text text-transparent 
        bg-gradient-to-r from-primary to-blue-600 transition-all
        ${isLarge ? 'text-3xl' : 'text-xl'}
      `}>
        <span className="inline-block hover:animate-bounce transition-all">A</span>
        <span className="inline-block hover:animate-bounce transition-all delay-75">e</span>
        <span className="inline-block hover:animate-bounce transition-all delay-100">r</span>
        <span className="inline-block hover:animate-bounce transition-all delay-150">o</span>
        <span className="inline-block hover:animate-bounce transition-all delay-200">S</span>
        <span className="inline-block hover:animate-bounce transition-all delay-250">e</span>
        <span className="inline-block hover:animate-bounce transition-all delay-300">n</span>
        <span className="inline-block hover:animate-bounce transition-all delay-350">s</span>
        <span className="inline-block hover:animate-bounce transition-all delay-400">e</span>
      </span>
    </div>
  );
  
  // Conditionally render as link or div based on prop
  return asLink ? (
    <Link to="/" aria-label="AeroSense Homepage">
      <LogoContent />
    </Link>
  ) : (
    <LogoContent />
  );
}
