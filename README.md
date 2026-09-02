# TPC Pulse In House — prez du live du 16 septembre 2026

Présentation web du live, navigable au clavier, déployable sur Vercel.

## Lancer en local

```bash
npm install
npm run dev
```

## Déployer sur Vercel

Vercel détecte Vite automatiquement, aucune configuration à ajouter.

**En ligne de commande**
```bash
npx vercel        # préversion
npx vercel --prod # production
```

**Depuis l'interface** : pousser le dossier sur un repo Git, puis « New Project » sur
vercel.com et sélectionner le repo. Framework preset : Vite. Build command `npm run build`,
output directory `dist`.

## Piloter la prez pendant le live

| Touche | Effet |
|---|---|
| `→` `↓` `Espace` | slide suivante |
| `←` `↑` | slide précédente |
| `G` | sommaire, pour sauter à n'importe quelle slide |
| `F` | plein écran |
| `Début` / `Fin` | première / dernière slide |
| `Échap` | fermer le sommaire |

Sur mobile et tablette, balayer vers la gauche ou la droite.

Chaque slide a son propre lien : `.../#7` ouvre directement la slide 7. Pratique pour
répéter une partie précise, ou pour envoyer un lien direct à un intervenant.

## Mettre à jour au run suivant

Tout est dans `src/data.js`. Aucune autre modification n'est nécessaire.

1. Ajouter le libellé du mois dans `MONTHS`
2. Ajouter la nouvelle valeur à la fin de chaque tableau `serie`
3. Mettre à jour les blocs de KPI (valeur et commentaire) et `LIVE.runLabel`

Les tableaux `serie` doivent toujours avoir la même longueur que `MONTHS`, sinon les
courbes et les sparklines se décalent.

## Structure

```
src/data.js     tous les chiffres et tous les textes de contenu
src/slides.jsx  les 18 slides, dans l'ordre du récit
src/Deck.jsx    navigation, rail de chapitres, composants visuels
src/index.css   tokens de couleur, grille TPC, effet glass
```

Pour réordonner le récit, déplacer les blocs dans le tableau `SLIDES` de `slides.jsx`.
Le rail de chapitres et le compteur se recalculent seuls.

## Sources et précautions

Données : TPC Pulse, runs du 2 juin au 1er septembre 2026.

Deux points à garder en tête en live :

- Le run du 1er septembre photographie le stock d'offres actives à cette date. Il capture
  l'été, pas la reprise de rentrée.
- Les champs d'enrichissement entreprise (type de structure, secteur, taille, série de
  financement) ne sont pas comparables entre juin et les mois suivants, à cause de la
  réécriture du scraper en juillet. La slide 15 le documente explicitement. Ne pas citer
  d'évolution sur ces champs depuis juin.
