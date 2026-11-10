// Configuration du CMS Keystatic.
// L'interface d'administration est disponible en local sur http://127.0.0.1:4321/keystatic
// quand on lance `npm run dev`. Tout le contenu est enregistré dans le dossier `content/`
// et les photos dans `public/images/` : aucune plateforme en ligne.
import { config, collection, singleton, fields } from '@keystatic/core';

const photo = (label: string, dossier: string, description?: string) =>
  fields.object(
    {
      image: fields.image({
        label,
        description,
        directory: `public/images/${dossier}`,
        publicPath: `/images/${dossier}/`,
      }),
      alt: fields.text({
        label: 'Que montre la photo ?',
        description: 'Une courte description, utile pour Google et les personnes malvoyantes.',
      }),
    },
    { label }
  );

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Isa M la Déco' },
    navigation: {
      'Site': ['reglages'],
      'Contenu': ['projets', 'prestations', 'avis'],
    },
  },

  collections: {
    projets: collection({
      label: 'Réalisations',
      slugField: 'titre',
      path: 'content/projets/*',
      format: { data: 'yaml' },
      columns: ['titre', 'ville', 'annee'],
      schema: {
        titre: fields.slug({
          name: { label: 'Titre', validation: { isRequired: true } },
          slug: { label: 'Adresse de la page', description: 'Générée automatiquement à partir du titre.' },
        }),
        categorie: fields.select({
          label: 'Type de projet',
          options: [
            { label: 'Rénovation ou aménagement', value: 'interieur' },
            { label: 'Meuble relooké', value: 'meuble' },
          ],
          defaultValue: 'interieur',
        }),
        ville: fields.text({ label: 'Ville' }),
        annee: fields.integer({ label: 'Année' }),
        resume: fields.text({ label: 'En une phrase', multiline: true }),
        misEnAvant: fields.checkbox({ label: 'Montrer sur la page d’accueil', defaultValue: false }),
        ordre: fields.integer({ label: 'Ordre d’affichage', description: '1 = en premier. Laisser vide pour trier par année.' }),
        couverture: photo('Photo principale', 'projets'),
        demande: fields.text({ label: 'La demande du client', multiline: true }),
        contrainte: fields.text({ label: 'Les contraintes', multiline: true }),
        solution: fields.text({
          label: 'Ce que j’ai proposé',
          description: 'Laissez une ligne vide entre deux paragraphes.',
          multiline: true,
        }),
        avant: photo('Photo avant', 'projets', 'Idéalement prise sous le même angle que la photo après.'),
        apres: photo('Photo après', 'projets'),
        galerie: fields.array(photo('Photo', 'projets'), {
          label: 'Autres photos',
          itemLabel: (p) => p.fields.alt.value || 'Photo',
        }),
      },
    }),

    prestations: collection({
      label: 'Prestations et tarifs',
      slugField: 'titre',
      path: 'content/prestations/*',
      format: { data: 'yaml' },
      schema: {
        titre: fields.slug({ name: { label: 'Nom de la prestation', validation: { isRequired: true } } }),
        accroche: fields.text({ label: 'Pour qui, en une phrase' }),
        inclus: fields.array(fields.text({ label: 'Élément compris' }), {
          label: 'Ce qui est compris',
          itemLabel: (p) => p.value,
        }),
        tarif: fields.text({ label: 'Tarif affiché', description: 'Par exemple : « 180 € » ou « à partir de 900 € ».' }),
        ordre: fields.integer({ label: 'Ordre d’affichage' }),
      },
    }),

    avis: collection({
      label: 'Avis clients',
      slugField: 'auteur',
      path: 'content/avis/*',
      format: { data: 'yaml' },
      schema: {
        auteur: fields.slug({ name: { label: 'Prénom et ville', description: 'Par exemple : « Claire, Lille »', validation: { isRequired: true } } }),
        citation: fields.text({ label: 'Ce que le client a dit', multiline: true, validation: { isRequired: true } }),
      },
    }),
  },

  singletons: {
    reglages: singleton({
      label: 'Réglages du site',
      path: 'content/reglages',
      format: { data: 'yaml' },
      schema: {
        accroche: fields.text({ label: 'Titre de la page d’accueil' }),
        sousAccroche: fields.text({ label: 'Phrase sous le titre', multiline: true }),
        heroImage: photo('Photo de la page d’accueil', 'site'),
        portrait: photo('Votre portrait', 'site'),
        apropos: fields.text({
          label: 'Texte « Qui suis-je »',
          description: 'Laissez une ligne vide entre deux paragraphes.',
          multiline: true,
        }),
        telephone: fields.text({ label: 'Téléphone' }),
        email: fields.text({ label: 'E-mail' }),
        instagram: fields.url({ label: 'Lien Instagram' }),
        zones: fields.array(fields.text({ label: 'Zone' }), {
          label: 'Zones d’intervention',
          itemLabel: (p) => p.value,
        }),
        formEndpoint: fields.url({
          label: 'Adresse du formulaire de contact',
          description: 'Fournie par Formspree, Web3Forms… (le site étant statique, il a besoin de ce service pour envoyer les messages).',
        }),
        presse: fields.array(
          fields.object({
            media: fields.text({ label: 'Journal ou magazine' }),
            titre: fields.text({ label: 'Titre de l’article' }),
            url: fields.url({ label: 'Lien' }),
          }),
          { label: 'Articles de presse', itemLabel: (p) => p.fields.titre.value || 'Article' }
        ),
      },
    }),
  },
});
