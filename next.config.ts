import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Renderização híbrida: páginas estáticas + rotas de API (TMDB/EPG).
  // Compatível com Vercel nativamente e com Cloudflare Pages via adapter.
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Os assets são SVG/WebP e as imagens do TMDB são carregadas diretamente
    // da CDN oficial, sem otimização no servidor.
    unoptimized: true,
  },
};

export default nextConfig;
