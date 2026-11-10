export type Photo = {
  /** Chemin de l'image (dans public/images). Absent en mode démo → aplat de couleur. */
  url?: string;
  alt: string;
  /** Teinte du placeholder en mode démo */
  tone?: string;
  /** Cadrage CSS (object-position), optionnel */
  focus?: string;
};

export type Projet = {
  slug: string;
  titre: string;
  categorie: 'interieur' | 'meuble';
  ville?: string;
  annee?: number;
  resume?: string;
  misEnAvant?: boolean;
  ordre?: number;
  couverture: Photo;
  avant?: Photo;
  apres?: Photo;
  demande?: string;
  contrainte?: string;
  solutionHtml?: string;
  galerie: Photo[];
};

export type Prestation = {
  titre: string;
  accroche?: string;
  inclus: string[];
  tarif?: string;
};

export type Temoignage = { citation: string; auteur?: string };

export type Settings = {
  accroche: string;
  sousAccroche: string;
  heroImage: Photo;
  portrait: Photo;
  aproposHtml: string;
  email?: string;
  telephone?: string;
  instagram?: string;
  zones: string[];
  formEndpoint?: string;
  presse: { media?: string; titre?: string; url?: string }[];
};
