// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import { readFileSync } from 'node:fs';

// Redirections des anciennes adresses WordPress (générées par l'import)
const redirectionsWp = JSON.parse(readFileSync(new URL('./src/redirections-wp.json', import.meta.url), 'utf-8'));

// L'administration Keystatic (/keystatic) n'est chargée qu'en local (`npm run dev`).
// Le site publié (`npm run build`) est 100 % statique : rien à héberger côté serveur.
const enDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://isa-m-ladeco.fr',
  output: 'static',
  integrations: enDev ? [react(), keystatic()] : [],
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
