"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Translation } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface SharedMenuViewProps {
  translation: Translation;
}

export default function SharedMenuView({ translation }: SharedMenuViewProps) {
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{[key: number]: boolean}>({});
  
  if (!translation) return <div className="p-4 text-center text-[#e8e8e6]">Menu introuvable</div>;
  
  // Grouper les éléments du menu par type
  const menuItems = translation.translation_data.detectedElements?.filter(
    item => item.type === 'menu_item'
  ) || [];
  
  // Extraire les notes associées à chaque élément de menu
  const getItemNotes = (itemIndex: number) => {
    // L'élément de notes suit généralement l'élément de menu
    const potentialNoteIndex = menuItems.findIndex((_, idx) => idx === itemIndex) + 1;
    
    if (potentialNoteIndex < (translation.translation_data.detectedElements?.length || 0)) {
      const potentialNote = translation.translation_data.detectedElements?.[potentialNoteIndex];
      if (potentialNote?.type === 'notes') {
        return potentialNote.translation;
      }
    }
    return null;
  };
  
  const toggleExpandItem = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const toggleFullScreenImage = () => {
    setFullScreenImage(!fullScreenImage);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto bg-[#121212] min-h-screen text-[#e8e8e6]">
      {/* En-tête */}
      <div className="relative w-full aspect-video mb-4 overflow-hidden">
        <div 
          className="w-full h-full cursor-pointer" 
          onClick={toggleFullScreenImage}
        >
          <Image 
            src={translation.image_url} 
            alt="Menu image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 right-0 bg-black/40 px-3 py-2 rounded-tl-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
            </svg>
            <span className="text-white text-xs ml-1">Agrandir</span>
          </div>
        </div>
      </div>
      
      {/* Contenu principal du menu */}
      <div className="px-4 pb-16">
        {/* Titre & Résumé */}
        <h1 className="text-2xl font-bold text-center mb-2">
          {translation.translation_data.translatedText || translation.translation_data.sourceText}
        </h1>
        
        <p className="text-center text-sm mb-6 text-[#e8e8e6]/80 italic">
          {translation.translation_data.summary}
        </p>
        
        <div className="h-[1px] w-24 bg-[#e8e8e6]/20 mx-auto mb-8"></div>
        
        {/* Liste des éléments du menu */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 mb-8 shadow-lg">
          {menuItems.map((item, index) => {
            const notes = getItemNotes(index);
            const isExpanded = expandedItems[index];
            
            return (
              <div 
                key={index} 
                className={`border-b border-[#e8e8e6]/10 ${index === menuItems.length - 1 ? 'border-b-0' : ''}`}
              >
                <div 
                  className="py-4 flex justify-between items-start cursor-pointer"
                  onClick={() => notes && toggleExpandItem(index)}
                >
                  <div className="flex-1 pr-4">
                    <h3 className="font-medium text-base">{item.translation}</h3>
                    <p className="text-xs text-[#e8e8e6]/60 mt-1">{item.text}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    {item.price?.regular && (
                      <span className="font-semibold text-base">
                        {item.price.regular}
                      </span>
                    )}
                    {item.price?.special && (
                      <span className="font-bold text-sm text-red-400">
                        {item.price.special}
                      </span>
                    )}
                    {notes && (
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
                        className={`mt-2 transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* Description du plat */}
                <AnimatePresence>
                  {notes && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-[#e8e8e6]/70 pb-4 pl-2 border-l border-[#e8e8e6]/20 ml-2">
                        {notes}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
        {/* Métadonnées */}
        <div className="text-xs text-[#e8e8e6]/50 space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{formatDate(translation.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>
              {translation.translation_data.sourceLanguage} → {translation.translation_data.targetLanguage}
            </span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center pt-4">
          <div className="flex justify-center items-center mb-2">
            <Image 
              src="/images/logo.png"
              alt="LinguaLens"
              width={30}
              height={30}
              className="opacity-50"
            />
          </div>
          <p className="text-xs text-[#e8e8e6]/40">
            Traduit avec LinguaLens
          </p>
          <p className="text-xs text-[#e8e8e6]/40 mt-1">
            <Link href="/" className="underline">Télécharger l&apos;application</Link>
          </p>
        </div>
      </div>
      
      {/* Modal pour afficher l'image en plein écran */}
      <AnimatePresence>
        {fullScreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={toggleFullScreenImage}
          >
            <div className="relative w-full h-full">
              <Image 
                src={translation.image_url} 
                alt="Menu image"
                fill
                className="object-contain"
              />
              <button 
                className="absolute top-6 right-6 bg-black/50 p-2 rounded-full"
                onClick={toggleFullScreenImage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
