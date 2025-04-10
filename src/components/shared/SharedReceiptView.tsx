"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Translation } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface SharedReceiptViewProps {
  translation: Translation;
}

export default function SharedReceiptView({ translation }: SharedReceiptViewProps) {
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [isSourceExpanded, setIsSourceExpanded] = useState(false);
  
  if (!translation) return <div className="p-4 text-center text-[#e8e8e6]">Receipt not found</div>;
  
  // Extract data from the translation
  const data = translation.translation_data;
  
  // Verify if properties exist, otherwise provide empty objects/arrays
  const receipt = data.receipt || { merchant: '', address: '', date: '', time: '' };
  const transaction = data.transaction || { subtotal: '', tax: '', total: '', paymentMethod: '' };
  const items = data.items || [];
  const additionalInfo = data.additionalInfo || [];
  
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

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto bg-[#121212] min-h-screen text-[#e8e8e6]">
      {/* Header - Receipt Image */}
      <div className="relative w-full aspect-video mb-4 overflow-hidden">
        <div 
          className="w-full h-full cursor-pointer" 
          onClick={toggleFullScreenImage}
        >
          <Image 
            src={translation.image_url} 
            alt="Receipt image"
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
        {/* Receipt Header */}
        <div className="bg-[#1a1a1a] rounded-xl p-5 mb-6 shadow-lg">
          <div className="flex flex-col items-center mb-4 pb-4 border-b border-[#e8e8e6]/10">
            {receipt.merchant && (
              <h1 className="text-xl font-bold text-center mb-1">
                {receipt.merchant}
              </h1>
            )}
            
            {receipt.address && (
              <p className="text-sm text-[#e8e8e6]/70 text-center">
                {receipt.address}
              </p>
            )}
            
            <div className="flex items-center gap-3 mt-3 text-xs text-[#e8e8e6]/60">
              {receipt.date && (
                <span className="inline-flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {receipt.date}
                </span>
              )}
              
              {receipt.time && (
                <span className="inline-flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {receipt.time}
                </span>
              )}
            </div>
          </div>
          
          {/* Transaction Summary */}
          <div className="flex justify-between items-center">
            {transaction.paymentMethod && (
              <div className="text-sm text-[#e8e8e6]/80">
                <span>Payment: </span>
                <span className="font-medium">{transaction.paymentMethod}</span>
              </div>
            )}
            
            {transaction.total && (
              <div className="text-lg font-bold">
                Total: {transaction.total}
              </div>
            )}
          </div>
        </div>
        
        {/* Items Section */}
        {items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#e8e8e6]/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              Items
            </h2>
            
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm">
              {/* Items Header */}
              <div className="grid grid-cols-12 gap-2 p-3 border-b border-[#e8e8e6]/10 text-xs uppercase font-medium text-[#e8e8e6]/60">
                <div className="col-span-6">Item</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              {/* Items Rows */}
              {items.map((item, index) => (
                <div 
                  key={index}
                  className={`grid grid-cols-12 gap-2 p-3 text-sm ${index < items.length - 1 ? 'border-b border-[#e8e8e6]/10' : ''}`}
                >
                  <div className="col-span-6 break-words">{item.name}</div>
                  <div className="col-span-2 text-center">{item.quantity}</div>
                  <div className="col-span-2 text-right">{item.unitPrice}</div>
                  <div className="col-span-2 text-right font-medium">{item.totalPrice}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Transaction Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#e8e8e6]/90">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="M7 15h0M7 11h0M7 7h0"></path>
              <path d="M11 15h6M11 11h6M11 7h6"></path>
            </svg>
            Transaction
          </h2>
          
          <div className="bg-[#1a1a1a] rounded-xl p-4 shadow-sm">
            {transaction.subtotal && (
              <div className="flex justify-between py-2 border-b border-[#e8e8e6]/10">
                <span className="text-[#e8e8e6]/80">Subtotal</span>
                <span>{transaction.subtotal}</span>
              </div>
            )}
            
            {transaction.tax && (
              <div className="flex justify-between py-2 border-b border-[#e8e8e6]/10">
                <span className="text-[#e8e8e6]/80">Tax</span>
                <span>{transaction.tax}</span>
              </div>
            )}
            
            {transaction.total && (
              <div className="flex justify-between py-3 mt-2">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-xl">{transaction.total}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional Information */}
        {additionalInfo.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#e8e8e6]/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Additional Information
            </h2>
            
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm">
              {additionalInfo.map((info, index) => (
                <div key={index} className={`p-4 ${index < additionalInfo.length - 1 ? 'border-b border-[#e8e8e6]/10' : ''}`}>
                  <h3 className="text-xs uppercase font-semibold text-[#e8e8e6]/60 mb-1">
                    {info.type}
                  </h3>
                  <p className="text-sm">{info.translated}</p>
                  <p className="text-xs text-[#e8e8e6]/50 mt-1">{info.original}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
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
                alt="Receipt image"
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
