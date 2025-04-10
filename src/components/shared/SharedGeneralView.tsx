"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Translation } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface SharedGeneralViewProps {
  translation: Translation;
}

export default function SharedGeneralView({ translation }: SharedGeneralViewProps) {
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [isSourceExpanded, setIsSourceExpanded] = useState(false);
  
  if (!translation) return <div className="p-4 text-center text-[#e8e8e6]">Translation not found</div>;
  
  // Extract data from the translation
  const data = translation.translation_data;
  
  const toggleFullScreenImage = () => {
    setFullScreenImage(!fullScreenImage);
  };
  
  const toggleSourceExpanded = () => {
    setIsSourceExpanded(!isSourceExpanded);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Function to capitalize first letter
  const capitalizeFirstLetter = (text: string): string => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto bg-[#121212] min-h-screen text-[#e8e8e6]">
      {/* Header - Translation Image */}
      <div className="relative w-full aspect-video mb-4 overflow-hidden">
        <div 
          className="w-full h-full cursor-pointer" 
          onClick={toggleFullScreenImage}
        >
          <Image 
            src={translation.image_url} 
            alt="Translation image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 right-0 bg-black/40 px-3 py-2 rounded-tl-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
            </svg>
            <span className="text-white text-xs ml-1">Expand</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="px-4 pb-16">
        {/* Translation Content */}
        <div className="bg-[#1a1a1a] rounded-xl p-5 mb-8 shadow-lg">
          {/* Context */}
          {data.context && (
            <div className="mb-5 pb-4 border-b border-[#e8e8e6]/10">
              <h3 className="text-xs uppercase font-semibold text-[#e8e8e6]/60 mb-1">Context</h3>
              <p className="text-base font-medium text-[#e8e8e6]">{data.context}</p>
            </div>
          )}
          
          {/* Summary */}
          {data.summary && (
            <div className="mb-5 pb-4 border-b border-[#e8e8e6]/10">
              <h3 className="text-xs uppercase font-semibold text-[#e8e8e6]/60 mb-1">Summary</h3>
              <p className="text-sm italic text-[#e8e8e6]/90">{data.summary}</p>
            </div>
          )}
          
          {/* Translated Text */}
          <div className="mb-5">
            <h3 className="text-xs uppercase font-semibold text-[#e8e8e6]/60 mb-2">Translation</h3>
            <p className="text-base leading-relaxed text-[#e8e8e6]">
              {data.translatedText}
            </p>
          </div>
          
          {/* Language Information */}
          <div className="flex justify-between items-center pt-4 border-t border-[#e8e8e6]/10">
            <div className="flex items-center gap-1 text-[#e8e8e6]/60">
              <span className="text-sm">{capitalizeFirstLetter(data.sourceLanguage)}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e8e8e6]/40">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <span className="text-sm">{capitalizeFirstLetter(data.targetLanguage)}</span>
            </div>
            
            {data.confidence && (
              <div className="text-[#e8e8e6]/60 text-sm">
                {Math.round(data.confidence * 100)}% confidence
              </div>
            )}
          </div>
        </div>
        
        {/* Original Text */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center mb-2 cursor-pointer bg-[#1a1a1a] rounded-xl p-3"
            onClick={toggleSourceExpanded}
          >
            <h2 className="text-base font-medium text-[#e8e8e6]/80 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                <line x1="12" y1="22" x2="12" y2="15.5"></line>
                <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                <line x1="2" y1="15.5" x2="12" y2="8.5"></line>
                <line x1="12" y1="8.5" x2="22" y2="15.5"></line>
              </svg>
              Original Text
            </h2>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={`transition-transform ${isSourceExpanded ? 'rotate-180' : 'rotate-0'}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          
          <AnimatePresence>
            {isSourceExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-[#1a1a1a] rounded-xl p-4 font-mono text-sm text-[#e8e8e6]/80 whitespace-pre-wrap">
                  {data.sourceText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Metadata & Translation Info */}
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
          
          {translation.location && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{translation.location}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Processed in {Math.round(data.processingTimeMs / 100) / 10}s</span>
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
            Translated with LinguaLens
          </p>
          <p className="text-xs text-[#e8e8e6]/40 mt-1">
            <Link href="/" className="underline">Download the app</Link>
          </p>
        </div>
      </div>
      
      {/* Modal for fullscreen image */}
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
                alt="Translation image"
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
