"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AppStoreDownloadButton() {
  const iOSUrl = 'https://apps.apple.com/us/app/lingualens/id000000000'; // URL fictive, à remplacer par la vraie
  
  return (
    <motion.a
      href={iOSUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2
      }}
      className="relative w-[160px] h-[53px] cursor-pointer"
    >
      <Image 
        src="/badges/app-store-badge.svg"
        alt="Download on the App Store"
        fill
        className="object-contain"
        priority
        unoptimized // Désactive l'optimisation d'image pour éviter les problèmes avec les routes dynamiques
      />
    </motion.a>
  );
}
