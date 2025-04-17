"use client";

import React, { useState, useEffect } from 'react';

interface ObfuscatedEmailProps {
  className?: string;
}

const ObfuscatedEmail: React.FC<ObfuscatedEmailProps> = ({ className }) => {
  const [revealed, setRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Ensure we're running on client side
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Email parts obfuscated to prevent scraping
  const parts = ['ke', 'vin', '@', 'kro', 'nix', '.io'];
  
  // Only build the actual email when user clicks to reveal
  const handleReveal = (e: React.MouseEvent) => {
    e.preventDefault();
    setRevealed(true);
  };
  
  // If not mounted yet (server-side), show a static button
  if (!mounted) {
    return (
      <button 
        className={className}
        aria-label="Afficher l'adresse email"
        disabled
      >
        [Cliquer pour afficher l'email]
      </button>
    );
  }
  
  if (revealed) {
    return (
      <a 
        href={`mailto:${parts.join('')}`} 
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        {parts.join('')}
      </a>
    );
  }
  
  return (
    <button 
      onClick={handleReveal}
      className={className}
      aria-label="Afficher l'adresse email"
    >
      [Cliquer pour afficher l'email]
    </button>
  );
};

export default ObfuscatedEmail;
