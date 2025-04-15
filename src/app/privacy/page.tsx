import { Metadata } from 'next';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';

type PrivacySection = {
  title: string;
  content: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Politique de confidentialité | LinguaLens',
  description: 'Comment nous protégeons vos données personnelles',
};

export default function PrivacyPage() {
  const lastUpdated = '15 avril 2025';
  
  const sections: PrivacySection[] = [
    {
      title: 'Collecte des données',
      content: (
        <>
          <p className="mb-4">
            LinguaLens collecte uniquement les données nécessaires au fonctionnement de l'application :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Images/textes traduits (non stockés après traitement, sauf si explicitement enregistrés par vous)</li>
            <li>Adresse email pour le compte utilisateur</li>
            <li>Préférences linguistiques et paramètres de l'application</li>
            <li>Informations sur les transactions et abonnements (via Apple/Google)</li>
          </ul>
        </>
      )
    },
    {
      title: 'Utilisation des données',
      content: (
        <>
          <p className="mb-4">
            Vos données servent exclusivement à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Fournir et améliorer les services de traduction</li>
            <li>Gérer votre compte et vos préférences</li>
            <li>Traiter les transactions et abonnements</li>
            <li>Vous contacter si nécessaire pour le support</li>
            <li>Assurer la sécurité de l'application</li>
          </ul>
        </>
      )
    },
    {
      title: 'Partage avec des tiers',
      content: (
        <>
          <p className="mb-4">LinguaLens utilise des services tiers pour fonctionner :</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Supabase pour l'authentification et le stockage</li>
            <li>AWS pour le traitement sécurisé des images</li>
            <li>Apple App Store / Google Play pour les paiements</li>
          </ul>
          <p className="mt-4">
            Ces services n'ont accès qu'aux données strictement nécessaires à leur fonction. 
            Aucune donnée personnelle n'est vendue ou partagée à des fins commerciales ou publicitaires.
          </p>
        </>
      )
    },
    {
      title: 'Vos droits (RGPD)',
      content: (
        <>
          <p className="mb-4">Conformément au Règlement Général sur la Protection des Données (RGPD), vous pouvez :</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Accéder à vos données personnelles</li>
            <li>Rectifier vos informations</li>
            <li>Demander la suppression de vos données</li>
            <li>Limiter ou vous opposer au traitement</li>
            <li>Demander la portabilité de vos données</li>
            <li>Retirer votre consentement à tout moment</li>
          </ul>
          <p className="mt-4">
            Pour exercer ces droits ou pour toute question concernant vos données, 
            contactez notre délégué à la protection des données : <ObfuscatedEmail className="text-blue-500 hover:underline" />
          </p>
        </>
      )
    },
    {
      title: 'Sécurité',
      content: (
        <p>
          LinguaLens met en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
          vos données contre tout accès, utilisation, divulgation, altération ou destruction non autorisés. 
          Nous utilisons des protocoles de chiffrement standard de l'industrie pour toutes les communications avec nos serveurs.
        </p>
      )
    },
    {
      title: 'Modifications de la politique',
      content: (
        <p>
          Nous nous réservons le droit de modifier cette politique à tout moment. Les modifications 
          substantielles seront notifiées via l'application. En continuant à utiliser LinguaLens après de telles 
          modifications, vous acceptez la politique révisée.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-[#e8e8e6]">
      {/* Quadrillage géométrique (comme sur la page d'accueil) */}
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
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-3">Politique de confidentialité</h1>
          <p className="text-[#a0a0a0] text-sm">Dernière mise à jour : {lastUpdated}</p>
        </div>
        
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed">
            Chez LinguaLens, nous accordons une importance capitale à la protection de vos données personnelles. 
            Cette politique de confidentialité explique quelles informations nous collectons, comment nous les utilisons 
            et les choix dont vous disposez concernant vos données.
          </p>
        </div>
        
        {/* Sections */}
        {sections.map((section, index) => (
          <section key={index} className="mb-10">
            <h2 className="text-xl sm:text-2xl font-medium mb-4 text-[#f5f5f5]">{section.title}</h2>
            <div className="text-[#c0c0c0] leading-relaxed">{section.content}</div>
          </section>
        ))}
        
        {/* Informations légales */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-medium mb-4 text-[#f5f5f5]">Informations légales</h2>
          <div className="text-[#c0c0c0] leading-relaxed">
            <p className="mb-2">LinguaLens est édité par :</p>
            <ul className="list-none space-y-1 mb-4">
              <li><strong>KRONIX</strong> SAS, société par actions simplifiée</li>
              <li>SIREN : 984 049 478</li>
              <li>SIRET : 984 049 478 00014</li>
              <li>TVA intracommunautaire : FR06984049478</li>
              <li>Adresse : 60 RUE FRANCOIS IER, 75008 PARIS</li>
              <li>RCS : PARIS (01/02/2024)</li>
            </ul>
          </div>
        </section>
        
        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#333333] flex justify-between items-center text-[#767676]">
          <p>LinguaLens © {new Date().getFullYear()} KRONIX SAS</p>
          <div className="flex space-x-4">
            <a href="/" className="hover:text-[#a0a0a0] transition-colors">Accueil</a>
            <a href="/terms" className="hover:text-[#a0a0a0] transition-colors">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </div>
  );
}
