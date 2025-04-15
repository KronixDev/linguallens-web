import React from 'react';
import { getDictionary } from '@/i18n/getDictionary';
import { Metadata } from 'next';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';
import { defaultLocale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang || defaultLocale;
  const dict = await getDictionary(locale);
  
  return {
    title: `${dict.terms.title} | LinguaLens`,
    description: dict.terms.intro,
  };
}

export default async function TermsPage({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const locale = lang || defaultLocale;
  const dict = await getDictionary(locale);
  
  const { terms, common } = dict;
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-[#121212] text-[#e8e8e6]">
      {/* Quadrillage géométrique */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute h-full w-[1px] left-[20%] top-0 bg-[#848484]"></div>
        <div className="absolute h-full w-[1px] left-[80%] top-0 bg-[#848484]"></div>
        <div className="absolute w-full h-[1px] left-0 top-[30%] bg-[#848484]"></div>
        <div className="absolute w-full h-[1px] left-0 top-[70%] bg-[#848484]"></div>
        <div className="absolute w-[20%] h-[20%] left-[40%] top-[10%] border border-[#848484]"></div>
        <div className="absolute w-[30%] h-[30%] right-[10%] top-[40%] border border-[#848484]"></div>
        <div className="absolute w-[15%] h-[15%] left-[10%] bottom-[20%] border border-[#848484]"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
        {/* Language selector */}
        <div className="flex justify-end mb-6">
          <LanguageSwitcher />
        </div>
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-3">{terms.title}</h1>
          <p className="text-[#a0a0a0] text-sm">{terms.lastUpdated}</p>
        </div>
        
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed">
            {terms.intro}
          </p>
        </div>
        
        {/* Sections */}
        {terms.sections.map((section: any, index: number) => (
          <section key={index} className="mb-10">
            <h2 className="text-xl sm:text-2xl font-medium mb-4 text-[#f5f5f5]">{section.title}</h2>
            <div className="text-[#c0c0c0] leading-relaxed">
              <p>{section.content}</p>
            </div>
          </section>
        ))}

        {/* Contact Section */}
        <div className="mb-10">
          <h2 className="text-xl sm:text-2xl font-medium mb-4 text-[#f5f5f5]">{terms.contactTitle || common.contactTitle || 'Contact'}</h2>
          <div className="text-[#c0c0c0] leading-relaxed flex items-center space-x-2">
            <span>{terms.contactPrompt || common.contactPrompt || 'For any questions, contact:'}</span>
            <ObfuscatedEmail />
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#333333] flex justify-between items-center text-[#767676]">
          <p>{common.footer.copyright.replace('{year}', currentYear)}</p>
          <div className="flex space-x-4">
            <Link href={`/${locale}`} className="hover:text-[#a0a0a0] transition-colors">
              {common.home}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-[#a0a0a0] transition-colors">
              {common.privacyLink}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
