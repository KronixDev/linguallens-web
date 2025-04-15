import Image from "next/image";
import Link from "next/link";
import MultilingualSlogan from "@/components/MultilingualSlogan";
import AppStoreDownloadButton from "@/components/AppStoreDownloadButton";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen overflow-hidden bg-[#121212]">
      {/* Quadrillage géométrique */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Lignes verticales */}
        <div className="absolute h-full w-[1px] left-[20%] top-0 bg-[#848484]"></div>
        <div className="absolute h-full w-[1px] left-[80%] top-0 bg-[#848484]"></div>
        
        {/* Lignes horizontales */}
        <div className="absolute w-full h-[1px] left-0 top-[30%] bg-[#848484]"></div>
        <div className="absolute w-full h-[1px] left-0 top-[70%] bg-[#848484]"></div>
        
        {/* Carrés */}
        <div className="absolute w-[20%] h-[20%] left-[40%] top-[10%] border border-[#848484]"></div>
        <div className="absolute w-[30%] h-[30%] right-[10%] top-[40%] border border-[#848484]"></div>
        <div className="absolute w-[15%] h-[15%] left-[10%] bottom-[20%] border border-[#848484]"></div>
      </div>
      
      {/* Contenu central */}
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 sm:px-10 py-10 mt-8">
        {/* Logo */}
        <div className="relative w-72 h-72 mb-2">
          <Image
            src="/images/logo.png"
            alt="LinguaLens Logo"
            fill
            className="object-contain"
            style={{ filter: 'brightness(1.5) saturate(0.1) contrast(1.2)' }}
            priority
            unoptimized
          />
        </div>
        
        {/* Slogan multilingue */}
        <MultilingualSlogan />
        
        {/* Texte */}
        <div className="w-full max-w-sm mx-auto">
          <p className="text-xl font-extralight text-center text-[#e8e8e6] mt-8 mb-8 tracking-wide leading-relaxed">
            Instantly translate the world around you
          </p>
        </div>
        
        {/* Bouton App Store */}
        <AppStoreDownloadButton />
      </div>
      
      {/* Footer */}
      <footer className="w-full z-10 border-t border-[#333333] py-6 px-8 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-[#767676] mb-4 sm:mb-0">
            LinguaLens © {new Date().getFullYear()} Kronix
          </div>
          <div className="flex space-x-8">
            <Link href="/en/terms" className="text-[#767676] hover:text-[#a0a0a0] transition-colors text-sm">
              Conditions d'utilisation
            </Link>
            <Link href="/en/privacy" className="text-[#767676] hover:text-[#a0a0a0] transition-colors text-sm">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
