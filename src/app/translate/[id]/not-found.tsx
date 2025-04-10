import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] p-6 text-[#e8e8e6]">
      <div className="w-24 h-24 mb-6 opacity-30">
        <Image
          src="/images/logo.png"
          alt="LinguaLens Logo"
          width={96}
          height={96}
        />
      </div>
      
      <h1 className="text-2xl font-light mb-4 text-center">
        Menu introuvable
      </h1>
      
      <p className="text-center mb-8 text-[#e8e8e6]/70">
        Ce menu n&apos;existe pas ou a été supprimé.
      </p>
      
      <Link 
        href="/"
        className="px-6 py-3 bg-[#2a2a2a] rounded-lg transition-all hover:bg-[#333333] text-[#e8e8e6]"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
