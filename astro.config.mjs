// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import { readFileSync } from 'node:fs';

// Redirections des anciennes adresses WordPress (générées par l'import)
const redirectionsWp = JSON.parse(readFileSync(new URL('./src/redirections-wp.json', import.meta.url), 'utf-8'));

export default defineConfig({
  site: 'https://isa-m-ladeco.fr',
  // Les pages du site restent statiques (pré-générées) ; seule l'admin Keystatic
  // (/keystatic et /api/keystatic) tourne côté serveur, via l'adaptateur Vercel.
  output: 'static',
  adapter: vercel(),
  integrations: [react(), keystatic()],
  // Les URLs de l'ancien WordPress → nouvelles pages
  redirects: {
    ...redirectionsWp,
    '/index.php/realisations': '/realisations',
    '/index.php/creations': '/realisations?type=meuble',
    '/index.php/inspirations': '/realisations',
    '/index.php/services': '/prestations',
    '/index.php/contact': '/contact',
    '/index.php/on-parle-de-moi': '/a-propos',
    '/presentation': '/a-propos',
    '/prestations-et-tarifs': '/prestations',
    '/accompagnement': '/prestations',
    '/realisations-recentes': '/realisations',
    '/mes-creations': '/realisations',
    '/mes-inspirations': '/realisations',
  },
});
