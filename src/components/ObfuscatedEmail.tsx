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
        className={className}
        type="button"
        aria-label="Afficher l'adresse email"
      >
        [Cliquer pour afficher l'email]
      </button>
    </span>
  );
};

export default ObfuscatedEmail;
