"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Slogans en différentes langues
const slogans = [
  { language: 'Français', text: 'Là où les barrières linguistiques disparaissent' },
  { language: 'English', text: 'Where language barriers disappear' },
  { language: 'Español', text: 'Donde desaparecen las barreras lingüísticas' },
  { language: '中文', text: '语言障碍消失的地方' },
  { language: '日本語', text: '言語の壁が消える場所' },
  { language: 'Deutsch', text: 'Wo Sprachbarrieren verschwinden' },
  { language: 'Italiano', text: 'Dove le barriere linguistiche scompaiono' },
  { language: 'Русский', text: 'Где исчезают языковые барьеры' },
  { language: 'العربية', text: 'حيث تختفي الحواجز اللغوية' },
  { language: 'हिन्दी', text: 'जहां भाषा बाधाएं गायब हो जाती हैं' },
];

export default function MultilingualSlogan() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Changer le slogan toutes les 5 secondes
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="h-24 flex items-center justify-center overflow-hidden py-8 w-full px-6 md:px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ 
            opacity: 1, 
            filter: "blur(0px)",
            transition: {
              opacity: { duration: 1.5, ease: [0.19, 1, 0.22, 1] },
              filter: { duration: 2, ease: [0.19, 1, 0.22, 1] }
            }
          }}
          exit={{ 
            opacity: 0, 
            filter: "blur(8px)",
            transition: {
              opacity: { duration: 1.5, ease: [0.55, 0, 0.1, 1] },
              filter: { duration: 1, ease: [0.55, 0, 0.1, 1] }
            }
          }}
          className="flex flex-col items-center w-full max-w-[90%] mx-auto"
        >
          <p className="text-xl md:text-2xl font-extralight text-center text-[#e8e8e6] tracking-wider w-full break-words">
            {slogans[currentIndex].text}
          </p>
          <div className="h-[1px] w-16 bg-[#e8e8e6]/20 mt-3"></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
