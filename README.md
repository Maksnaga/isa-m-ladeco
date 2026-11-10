# Isa M la Déco — site Astro + Keystatic

Refonte de isa-m-ladeco.fr. Site statique Astro, contenu géré en local avec Keystatic.

## Démarrer

```bash
npm install
npm run dev        # http://127.0.0.1:4321
```

Tant qu'aucune réalisation n'a été créée, le site affiche un **contenu de démonstration** (projets fictifs, bandeau en haut de page).

## Gérer le contenu : Keystatic (100 % local)

Avec `npm run dev` lancé, ouvrir **http://127.0.0.1:4321/keystatic** :

- **Réglages du site** : titre d'accueil, photos, texte « Qui suis-je », téléphone, e-mail, zones, adresse du formulaire.
- **Réalisations** : titre, type (rénovation / meuble), ville, année, photos (principale, avant/après, galerie), textes.
- **Prestations et tarifs** et **Avis clients**.

Tout est enregistré dans des fichiers du projet, sans aucune plateforme en ligne :

```
content/projets/*.yaml        une réalisation par fichier
content/prestations/*.yaml
content/avis/*.yaml
content/reglages.yaml
public/images/...             les photos envoyées depuis l'admin
```

Après des modifications en local : commit + push sur GitHub, Vercel republie automatiquement.

En ligne, l'admin est aussi disponible sur https://isa-m-ladeco.vercel.app/keystatic via **Keystatic Cloud** (équipe/projet `isa-m-ladeco/isa-m-ladeco` sur keystatic.cloud) : les personnes invitées dans l'équipe se connectent sans compte GitHub. Chaque enregistrement crée un commit et Vercel republie le site.

## Structure

```
keystatic.config.ts       Modèles de contenu (champs de l'admin)
src/lib/content.ts        Lecture du contenu + bascule sur la démo si vide
src/lib/demo.ts           Contenu de démonstration
src/styles/global.css     Couleurs, typo, espacements
src/pages/                Accueil, réalisations (+ détail), prestations, qui suis-je, contact
```

## Principes (UX)

Le site est pensé pour qu'un visiteur trouve vite ce qu'il cherche :

1. **Qui, quoi, où** dès le haut de l'accueil, avec le bouton « Prendre rendez-vous » toujours visible.
2. **« Que souhaitez-vous faire ? »** : deux entrées claires, rénover un intérieur ou relooker un meuble.
3. **Réalisations** (la preuve), **Comment ça se passe** (4 étapes), **Prestations et tarifs** (3 formules, prix visibles).
4. Sur mobile, une **barre fixe en bas** (Appeler / Prendre rendez-vous).
5. Menu en 4 entrées aux noms simples : Réalisations, Prestations et tarifs, Qui suis-je, Contact.

Style sobre et animé : neutres chauds, encre indigo foncé et une seule couleur d'accent (terre cuite), angles droits, typo Bricolage Grotesque. Animations : titre qui apparaît mot par mot, photo d'accueil qui arrive avec deux aplats qui suivent légèrement la souris, bandeau de services qui défile, sections et cartes qui apparaissent au défilement et se soulèvent au survol, menu mobile qui s'ouvre en cercle. Tout s'arrête si l'utilisateur a demandé à réduire les animations sur son appareil. Couleurs et réglages dans `src/styles/global.css`.

Dans l'admin, les champs sont rédigés simplement pour qu'on puisse ajouter un projet sans connaître le code.

## Formulaire de contact

Le site étant statique, le formulaire poste vers un service externe : créer un formulaire sur Formspree ou Web3Forms et coller son URL dans *Réglages du site → Adresse du formulaire de contact*.

## Redirections

Les anciennes URLs WordPress sont redirigées dans `astro.config.mjs` (`redirects`) : à vérifier avec les vraies URLs de l'ancien site pour ne pas perdre le référencement.
