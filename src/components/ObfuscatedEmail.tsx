"use client";

import { useState, useEffect } from 'react';

interface ObfuscatedEmailProps {
  className?: string;
}

const ObfuscatedEmail = ({ className }: ObfuscatedEmailProps) => {
  const [revealed, setRevealed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Email parts obfuscated to prevent scraping
  const emailParts = ['ke', 'vin', '@', 'kro', 'nix', '.io'];
  const email = emailParts.join('');
  
  // Détection côté client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Gérer le clic sur le bouton
  const handleReveal = (e: React.MouseEvent) => {
    e.preventDefault();
    setRevealed(true);
  };
  
  // Si nous ne sommes pas encore côté client, renderiser seulement le texte
  if (!isClient) {
    return <span className={className}>[Cliquer pour afficher l'email]</span>;
  }
  
  if (revealed) {
    return (
      <a
        href={`mailto:${email}`}
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        {email}
      </a>
    );
  }
  
  return (
    <span>
      <button
        onClick={handleReveal}
        className={`group text-blue-500 hover:text-blue-600 transition-colors duration-200 underline inline-flex items-center gap-1 font-medium ${className || ''}`}
        type="button"
        aria-label="Afficher l'adresse email"
      >
        <span>Cliquer pour afficher l'email</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="h-4 w-4 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </span>
  );
};

export default ObfuscatedEmail;
