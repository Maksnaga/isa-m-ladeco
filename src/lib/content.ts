// Couche de données unique : lit le contenu Keystatic (dossier `content/`).
// Tant qu'aucune réalisation n'a été créée, le site affiche le contenu de démonstration.
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';
import * as demo from './demo';
import type { Photo, Prestation, Projet, Settings, Temoignage } from './types';

const reader = createReader(process.cwd(), keystaticConfig);

type PhotoBrute = { image: string | null; alt: string } | null | undefined;

function photo(p: PhotoBrute, altParDefaut = ''): Photo {
  return { url: p?.image ?? undefined, alt: p?.alt || altParDefaut };
}

/** Texte saisi avec des lignes vides entre paragraphes → HTML simple */
function paragraphes(texte?: string | null): string {
  if (!texte) return '';
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return texte
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${esc(p).replace(/\n/g, '<br />')}</p>`)
    .join('\n');
}

let projetsCache: Promise<Projet[]> | null = null;

async function lireProjets(): Promise<Projet[]> {
  const entrees = await reader.collections.projets.all();
  return entrees
    .map(({ slug, entry: e }) => ({
      slug,
      titre: e.titre,
      categorie: e.categorie,
      ville: e.ville || undefined,
      annee: e.annee ?? undefined,
      resume: e.resume || undefined,
      misEnAvant: e.misEnAvant,
      ordre: e.ordre ?? undefined,
      couverture: photo(e.couverture, e.titre),
      avant: e.avant?.image ? photo(e.avant, 'Avant') : undefined,
      apres: e.apres?.image ? photo(e.apres, 'Après') : undefined,
      demande: e.demande || undefined,
      contrainte: e.contrainte || undefined,
      solutionHtml: paragraphes(e.solution),
      galerie: e.galerie.filter((g) => g.image).map((g) => photo(g, e.titre)),
    }))
    .sort((a, b) => (a.ordre ?? 999) - (b.ordre ?? 999) || (b.annee ?? 0) - (a.annee ?? 0));
}

export async function getProjets(): Promise<Projet[]> {
  projetsCache ??= lireProjets();
  const projets = await projetsCache;
  return projets.length ? projets : demo.projets;
}

/** Vrai tant qu'aucune vraie réalisation n'a été saisie */
export async function estDemo(): Promise<boolean> {
  projetsCache ??= lireProjets();
  return (await projetsCache).length === 0;
}

export async function getSettings(): Promise<Settings> {
  const r = await reader.singletons.reglages.read();
  if (!r) return demo.settings;
  return {
    accroche: r.accroche || demo.settings.accroche,
    sousAccroche: r.sousAccroche || demo.settings.sousAccroche,
    heroImage: r.heroImage?.image ? photo(r.heroImage, 'Intérieur') : demo.settings.heroImage,
    portrait: r.portrait?.image ? photo(r.portrait, 'Portrait') : demo.settings.portrait,
    aproposHtml: paragraphes(r.apropos) || demo.settings.aproposHtml,
    email: r.email || undefined,
    telephone: r.telephone || undefined,
    instagram: r.instagram || undefined,
    zones: r.zones.length ? [...r.zones] : demo.settings.zones,
    formEndpoint: r.formEndpoint || undefined,
    presse: r.presse.map((a) => ({ media: a.media || undefined, titre: a.titre || undefined, url: a.url || undefined })),
  };
}

export async function getPrestations(): Promise<Prestation[]> {
  const entrees = await reader.collections.prestations.all();
  if (!entrees.length) return demo.prestations;
  return entrees
    .map(({ entry: e }) => ({
      titre: e.titre,
      accroche: e.accroche || undefined,
      inclus: [...e.inclus],
      tarif: e.tarif || undefined,
      ordre: e.ordre ?? 999,
    }))
    .sort((a, b) => a.ordre - b.ordre);
}

export async function getTemoignages(): Promise<Temoignage[]> {
  const entrees = await reader.collections.avis.all();
  return entrees.map(({ entry: e }) => ({ citation: e.citation, auteur: e.auteur }));
}
