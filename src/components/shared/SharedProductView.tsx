"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Translation } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface SharedProductViewProps {
  translation: Translation;
}

interface DetailItem {
  type: string;
  original: string;
  translated: string;
}

export default function SharedProductView({ translation }: SharedProductViewProps) {
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [isSourceExpanded, setIsSourceExpanded] = useState(false);
  
  if (!translation) return <div className="p-4 text-center text-[#e8e8e6]">Product not found</div>;
  
  // Extract data from the translation
  const data = translation.translation_data;
  const product = data.product || {};
  const details = data.details || [];
  const specs = data.specifications || {};
  
  // Group details by type
  const groupedDetails: Record<string, DetailItem[]> = {};
  if (Array.isArray(details)) {
    details.forEach((item: DetailItem) => {
      if (!groupedDetails[item.type]) {
        groupedDetails[item.type] = [];
      }
      groupedDetails[item.type].push(item);
    });
  }
  
  // Check if specs is not empty
  const hasSpecifications = specs && Object.entries(specs).some(([ , value]) => 
    value !== undefined && value !== null && value.toString().trim() !== ""
  );
  
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
  
  // Choose icon based on product category
  const getProductIcon = () => {
    if (!product.category) return null;
    
    const category = product.category.toLowerCase();
    
    if (category.includes('electronics') || category.includes('tech')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          <rect x="9" y="9" width="6" height="6"></rect>
          <line x1="9" y1="1" x2="9" y2="4"></line>
          <line x1="15" y1="1" x2="15" y2="4"></line>
          <line x1="9" y1="20" x2="9" y2="23"></line>
          <line x1="15" y1="20" x2="15" y2="23"></line>
          <line x1="20" y1="9" x2="23" y2="9"></line>
          <line x1="20" y1="14" x2="23" y2="14"></line>
          <line x1="1" y1="9" x2="4" y2="9"></line>
          <line x1="1" y1="14" x2="4" y2="14"></line>
        </svg>
      );
    } else if (category.includes('clothing') || category.includes('fashion') || category.includes('apparel')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"></path>
        </svg>
      );
    } else if (category.includes('food') || category.includes('beverage')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 010 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      );
    }
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto bg-[#121212] min-h-screen text-[#e8e8e6]">
      {/* Header */}
      <div className="relative w-full aspect-video mb-4 overflow-hidden">
        <div 
          className="w-full h-full cursor-pointer" 
          onClick={toggleFullScreenImage}
        >
          <Image 
            src={translation.image_url} 
            alt="Product image"
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
        {/* Product Information */}
        <div className="bg-[#1a1a1a] rounded-xl p-5 mb-8 shadow-lg">
          {/* Product name & brand */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-[#2a2a2a] rounded-full mt-1 flex-shrink-0">
              {getProductIcon()}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1">
                {product.name || data.translatedText || data.sourceText}
              </h1>
              {product.brand && (
                <p className="text-sm text-[#e8e8e6]/70">
                  {product.brand}
                </p>
              )}
            </div>
          </div>
          
          {/* Product summary */}
          {product.summary && (
            <div className="mb-5 pb-5 border-b border-[#e8e8e6]/10">
              <p className="text-[#e8e8e6]/90 text-sm italic leading-relaxed">
                {product.summary}
              </p>
            </div>
          )}
          
          {/* Grouped details */}
          {Object.entries(groupedDetails).length > 0 && (
            <div className="mb-5">
              {Object.entries(groupedDetails).map(([type, items], groupIndex) => (
                <div key={groupIndex} className="mb-5">
                  <h2 className="text-lg font-semibold mb-3 text-[#e8e8e6]/90">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </h2>
                  <div className="pl-2 border-l-2 border-[#e8e8e6]/10 space-y-3">
                    {items.map((item, itemIndex) => (
                      <div key={itemIndex} className={`py-2 ${itemIndex < items.length - 1 ? 'border-b border-[#e8e8e6]/10' : ''}`}>
                        <p className="text-sm text-[#e8e8e6]/90">{item.translated}</p>
                        <p className="text-xs text-[#e8e8e6]/50 mt-1">{item.original}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Technical specifications */}
          {hasSpecifications && (
            <div className="mt-5 pt-5 border-t border-[#e8e8e6]/10">
              <h2 className="text-lg font-semibold mb-3 text-[#e8e8e6]/90">
                Technical Specifications
              </h2>
              <div className="bg-[#222222] rounded-lg p-4">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(specs).map(([key, value], specIndex) => (
                      <tr key={specIndex} className={specIndex < Object.entries(specs).length - 1 ? 'border-b border-[#e8e8e6]/10' : ''}>
                        <td className="py-2 pr-3 text-[#e8e8e6]/70 font-medium w-1/3">
                          {key}
                        </td>
                        <td className="py-2 text-[#e8e8e6]/90">
                          {String(value)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        {/* Original text section */}
        <div className="mb-8">
          <div 
            className="flex justify-between items-center mb-2 cursor-pointer"
            onClick={toggleSourceExpanded}
          >
            <h2 className="text-lg font-medium text-[#e8e8e6]/80">
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
                <div className="bg-[#1a1a1a] rounded-xl p-4 mb-4 font-mono text-sm text-[#e8e8e6]/80 whitespace-pre-wrap">
                  {data.sourceText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Metadata */}
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
              {data.sourceLanguage} → {data.targetLanguage}
            </span>
          </div>
          {data.confidence && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>
                Translation confidence: {Math.round(data.confidence * 100)}%
              </span>
            </div>
          )}
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
                alt="Product image"
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
