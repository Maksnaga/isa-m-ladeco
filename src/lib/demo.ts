// Contenu de démonstration, affiché tant qu'aucune réalisation n'a été créée dans Keystatic.
// Les réalisations ci-dessous sont FICTIVES et les tarifs restent à définir :
// tout se remplace depuis l’admin Keystatic (/keystatic).
import type { Prestation, Projet, Settings, Temoignage } from './types';

export const settings: Settings = {
  accroche: 'Des intérieurs qui ont du caractère',
  sousAccroche:
    'Je vous aide à rénover et aménager votre maison ou votre appartement, du premier conseil jusqu’à la fin des travaux. Et je redonne vie à vos meubles de famille.',
  heroImage: { alt: 'Séjour rénové par Isabelle Moiroux', tone: '#cfc6b8' },
  portrait: { alt: 'Isabelle Moiroux', tone: '#bfc3bd' },
  aproposHtml: `
    <p>Je m’appelle Isabelle Moiroux. Depuis mon cabinet à Lille, j’accompagne des particuliers dans leurs projets de rénovation et de décoration.</p>
    <p>Je conçois des intérieurs modernes et pratiques, qui tirent parti de chaque mètre carré. Je travaille avec des artisans que je connais bien, et je vous aide à comprendre et à négocier leurs devis.</p>
    <p>J’aime aussi les meubles qui ont une histoire : plutôt que de les remplacer, je les relooke pour qu’ils trouvent leur place dans votre intérieur.</p>`,
  email: 'contact@isa-m-ladeco.fr',
  telephone: undefined,
  zones: ['Lille et sa métropole', 'Le Touquet et la côte d’Opale', 'Le Havre et la Normandie'],
  presse: [],
};

const ph = (alt: string, tone: string) => ({ alt, tone });

export const projets: Projet[] = [
  {
    slug: 'maison-de-famille-le-touquet',
    titre: 'Rénovation d’une maison de famille',
    categorie: 'interieur',
    ville: 'Le Touquet',
    annee: 2025,
    misEnAvant: true,
    resume: 'Une maison des années 30 rendue plus lumineuse, sans perdre son caractère.',
    couverture: ph('Séjour de la maison du Touquet', '#d8cbbf'),
    avant: ph('Séjour avant travaux', '#8e897f'),
    apres: ph('Séjour après travaux', '#d8cbbf'),
    demande: 'La famille voulait une maison plus claire et plus ouverte pour s’y retrouver tous les étés.',
    contrainte: 'Un chantier suivi à distance depuis Lille, et une livraison avant juillet.',
    solutionHtml: '<p>Cuisine ouverte sur le séjour, menuiseries d’origine restaurées, enduits clairs à la chaux et un mélange de meubles chinés et de pièces sur mesure.</p>',
    galerie: [ph('Cuisine ouverte', '#bfb197'), ph('Chambre d’amis', '#ddd5c6'), ph('Escalier restauré', '#a99a80')],
  },
  {
    slug: 'appartement-vieux-lille',
    titre: 'Un coin bureau dans un appartement ancien',
    categorie: 'interieur',
    ville: 'Lille',
    annee: 2025,
    misEnAvant: true,
    resume: '70 m² réorganisés pour un couple qui télétravaille.',
    couverture: ph('Séjour de l’appartement du Vieux-Lille', '#c3cbc2'),
    demande: 'Créer un vrai espace de travail sans sacrifier le séjour.',
    contrainte: 'Une copropriété ancienne, peu de marge pour toucher aux cloisons.',
    solutionHtml: '<p>Une verrière d’atelier, des rangements sur toute la hauteur et une couleur vert de gris qui met en valeur les moulures.</p>',
    galerie: [ph('Coin bureau', '#97a194'), ph('Rangements', '#b8c0b4')],
  },
  {
    slug: 'buffet-de-famille',
    titre: 'Le buffet de la grand-mère',
    categorie: 'meuble',
    ville: 'Lille',
    annee: 2024,
    misEnAvant: true,
    resume: 'Un buffet en chêne décapé, repeint et équipé de poignées en laiton.',
    couverture: ph('Buffet relooké', '#cdb3a3'),
    avant: ph('Buffet avant relooking', '#6b5a4b'),
    apres: ph('Buffet après relooking', '#cdb3a3'),
    galerie: [ph('Détail des poignées', '#a77a63')],
  },
  {
    slug: 'maison-le-havre',
    titre: 'Une maison des années 60 face à la mer',
    categorie: 'interieur',
    ville: 'Le Havre',
    annee: 2024,
    misEnAvant: true,
    resume: 'Plans 3D et suivi de chantier pour une rénovation complète.',
    couverture: ph('Maison du Havre', '#bfc2c6'),
    galerie: [],
  },
  {
    slug: 'cuisine-marcq',
    titre: 'Une cuisine ouverte et pratique',
    categorie: 'interieur',
    ville: 'Marcq-en-Barœul',
    annee: 2024,
    misEnAvant: true,
    resume: 'Une cuisine fermée transformée en pièce de vie.',
    couverture: ph('Cuisine ouverte', '#d9cfbd'),
    galerie: [],
  },
  {
    slug: 'commode-cannage',
    titre: 'Une commode avec façades cannées',
    categorie: 'meuble',
    ville: 'Lille',
    annee: 2024,
    misEnAvant: true,
    resume: 'Une commode sans charme, transformée avec du cannage.',
    couverture: ph('Commode cannée', '#c9b8b0'),
    galerie: [],
  },
];

export const prestations: Prestation[] = [
  {
    titre: 'Conseil à domicile',
    accroche: 'Vous avez besoin d’idées et d’un regard extérieur.',
    inclus: ['Une visite de 2 heures chez vous', 'Conseils couleurs, agencement et mobilier', 'Un compte rendu écrit'],
    tarif: 'Tarif à définir',
  },
  {
    titre: 'Projet sur plans 3D',
    accroche: 'Vous voulez voir le résultat avant de lancer les travaux.',
    inclus: ['Prise de mesures', 'Plans d’aménagement et vues 3D', 'Choix des matériaux et liste d’achats'],
    tarif: 'Tarif à définir',
  },
  {
    titre: 'Projet clé en main',
    accroche: 'Vous voulez qu’on s’occupe de tout.',
    inclus: ['Conception complète', 'Choix des artisans et négociation des devis', 'Suivi du chantier jusqu’à la fin'],
    tarif: 'Sur devis',
  },
];

// Aucun faux avis : la section n'apparaît que quand de vrais avis sont saisis.
export const temoignages: Temoignage[] = [];
