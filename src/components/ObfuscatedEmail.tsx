"use client";

import React, { useState } from 'react';

interface ObfuscatedEmailProps {
  className?: string;
}

const ObfuscatedEmail: React.FC<ObfuscatedEmailProps> = ({ className }) => {
  const [revealed, setRevealed] = useState(false);
  
  // Email parts obfuscated to prevent scraping
  const parts = ['ke', 'vin', '@', 'kro', 'nix', '.io'];
  
  // Only build the actual email when user clicks to reveal
  const handleReveal = () => {
    setRevealed(true);
  };
  
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
