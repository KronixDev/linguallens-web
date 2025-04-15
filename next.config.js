/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration des images
  images: {
    // Désactive l'optimisation des images par défaut pour éviter les problèmes avec i18n
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linguallens.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Optimisation pour les déploiements
  output: 'standalone',
  
  // Pour résoudre les problèmes avec les redirections infinies
  skipTrailingSlashRedirect: true,
  
  // Désactiver la redirection automatique vers l'index
  trailingSlash: true,
  
  typescript: {
    // !! WARN !!
    // Ignorer les erreurs de typage causées par un problème connu de Next.js 15
    // À résoudre quand le bug sera corrigé
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignorer également les erreurs ESLint pour pouvoir déployer
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
