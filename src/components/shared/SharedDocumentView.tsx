"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Translation } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface SharedDocumentViewProps {
  translation: Translation;
}

export default function SharedDocumentView({ translation }: SharedDocumentViewProps) {
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [isSourceExpanded, setIsSourceExpanded] = useState(false);
  
  if (!translation) return <div className="p-4 text-center text-[#e8e8e6]">Document not found</div>;
  
  // Extract data from the translation
  const data = translation.translation_data;
  
  // Verify if properties exist, otherwise provide empty objects/arrays
  const document = data.document || { 
    type: '', 
    title: '', 
    issuer: '', 
    date: '', 
    reference: '' 
  };
  const sections = data.sections || [];
  const metadata = data.metadata || { 
    recipients: '', 
    signatures: '', 
    attachments: '', 
    classification: '' 
  };
  const terminology = data.terminology || [];
  
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
  
  // Format document date if exists
  const formattedDocumentDate = document.date ? new Date(document.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  // Get document type icon
  const getDocumentIcon = () => {
    const type = document.type?.toLowerCase() || '';
    
    if (type.includes('letter') || type.includes('mail')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      );
    } else if (type.includes('certificate') || type.includes('diploma')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      );
    } else if (type.includes('contract') || type.includes('agreement')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      );
    } else if (type.includes('invoice') || type.includes('receipt')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="M7 15h0M7 11h0M7 7h0"></path>
          <path d="M11 15h6M11 11h6M11 7h6"></path>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      );
    }
  };
  
  // Check if a metadata field has content
  const hasMetadataContent = (field: string) => {
    if (!field) return false;
    return field.trim() !== '';
  };
  
  // Check if we have any metadata to display
  const hasAnyMetadata = () => {
    return hasMetadataContent(metadata.recipients) || 
           hasMetadataContent(metadata.signatures) || 
           hasMetadataContent(metadata.attachments) || 
           hasMetadataContent(metadata.classification);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto bg-[#121212] min-h-screen text-[#e8e8e6]">
      {/* Header - Document Image */}
      <div className="relative w-full aspect-video mb-4 overflow-hidden">
        <div 
          className="w-full h-full cursor-pointer" 
          onClick={toggleFullScreenImage}
        >
          <Image 
            src={translation.image_url} 
            alt="Document image"
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
        {/* Document Header */}
        <div className="bg-[#1a1a1a] rounded-xl mb-6 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-[#e8e8e6]/10 flex items-center justify-center gap-3">
            <span className="text-[#e8e8e6]/70">
              {getDocumentIcon()}
            </span>
            <h1 className="text-xl font-bold text-center">
              {document.title || data.translatedText || 'Untitled Document'}
            </h1>
          </div>
          
          {/* Document info grid */}
          <div className="grid grid-cols-2 gap-2 p-4">
            {document.issuer && (
              <div className="col-span-1 p-2">
                <p className="text-xs text-[#e8e8e6]/60 mb-1">Issuer</p>
                <p className="text-sm text-[#e8e8e6]/90 font-medium">{document.issuer}</p>
              </div>
            )}
            
            {document.date && (
              <div className="col-span-1 p-2">
                <p className="text-xs text-[#e8e8e6]/60 mb-1">Date</p>
                <p className="text-sm text-[#e8e8e6]/90 font-medium">{formattedDocumentDate}</p>
              </div>
            )}
            
            {document.type && (
              <div className="col-span-1 p-2">
                <p className="text-xs text-[#e8e8e6]/60 mb-1">Type</p>
                <p className="text-sm text-[#e8e8e6]/90 font-medium capitalize">{document.type}</p>
              </div>
            )}
            
            {document.reference && (
              <div className="col-span-1 p-2">
                <p className="text-xs text-[#e8e8e6]/60 mb-1">Reference</p>
                <p className="text-sm text-[#e8e8e6]/90 font-medium font-mono">{document.reference}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Document Sections */}
        {sections.length > 0 && (
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
              Document Content
            </h2>
            
            <div className="space-y-3">
              {sections.map((section, index) => (
                <div key={index} className="bg-[#1a1a1a] rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    {section.reference && (
                      <span className="inline-block px-2 py-1 bg-[#2a2a2a] rounded text-xs font-mono">
                        {section.reference}
                      </span>
                    )}
                    {section.heading && (
                      <h3 className="text-base font-medium text-[#e8e8e6]/90">
                        {section.heading}
                      </h3>
                    )}
                  </div>
                  <p className="text-sm text-[#e8e8e6]/80 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Metadata Section */}
        {hasAnyMetadata() && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#e8e8e6]/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Document Metadata
            </h2>
            
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm">
              {hasMetadataContent(metadata.recipients) && (
                <div className="p-3 border-b border-[#e8e8e6]/10">
                  <p className="text-xs text-[#e8e8e6]/60 mb-1">Recipients</p>
                  <p className="text-sm text-[#e8e8e6]/90">{metadata.recipients}</p>
                </div>
              )}
              
              {hasMetadataContent(metadata.signatures) && (
                <div className="p-3 border-b border-[#e8e8e6]/10">
                  <p className="text-xs text-[#e8e8e6]/60 mb-1">Signatures</p>
                  <p className="text-sm text-[#e8e8e6]/90">{metadata.signatures}</p>
                </div>
              )}
              
              {hasMetadataContent(metadata.attachments) && (
                <div className="p-3 border-b border-[#e8e8e6]/10">
                  <p className="text-xs text-[#e8e8e6]/60 mb-1">Attachments</p>
                  <p className="text-sm text-[#e8e8e6]/90">{metadata.attachments}</p>
                </div>
              )}
              
              {hasMetadataContent(metadata.classification) && (
                <div className="p-3">
                  <p className="text-xs text-[#e8e8e6]/60 mb-1">Classification</p>
                  <div className="inline-block px-2 py-1 bg-[#2a2a2a] rounded text-xs">
                    {metadata.classification}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Terminology */}
        {terminology.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#e8e8e6]/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3v12"></path>
                <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M15 6a9 9 0 0 1 0 12"></path>
                <path d="M8.7 10.7a6 6 0 0 1 0 2.6"></path>
              </svg>
              Key Terminology
            </h2>
            
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm">
              {terminology.map((item, index) => (
                <div key={index} className={`p-3 ${index < terminology.length - 1 ? 'border-b border-[#e8e8e6]/10' : ''}`}>
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-[#e8e8e6]/90">{item.term}</span>
                    <span className="mx-2 text-[#e8e8e6]/40">→</span>
                    <span className="text-sm font-medium text-[#e8e8e6]/90">{item.translation}</span>
                  </div>
                  {item.context && (
                    <p className="text-xs text-[#e8e8e6]/60 italic">{item.context}</p>
                  )}
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
                alt="Document image"
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
