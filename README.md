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

## Conventions

On parle de **salaire**, jamais de prix. Le chapitre 3 s'appelle « Les salaires ».

Trois tons d'encadré, choisis selon la fonction et non selon l'esthétique :

| Ton | Couleur | Usage |
|---|---|---|
| `info` | indigo | commentaire de lecture, hypothèse, point à retenir |
| `alerte` | rouge | précaution méthodologique, chiffre à ne pas surinterpréter |
| `positif` | vert | point favorable |

```jsx
<Encadre ton="alerte" titre="Ne pas comparer à juin">Texte</Encadre>
<Carte chiffre="+24 %" legende="…" ton="positif" couleur="#89FAC6" />
```

## Transitions

Un seul moment orchestré par changement de slide. Le bloc entier glisse dans le sens
de la lecture (vers la gauche en avançant, vers la droite en revenant), puis les
sections montent en cascade sur environ 500 ms.

- `.entre-avant` / `.entre-arriere` : glissement directionnel du bloc
- `.cascade` : montée échelonnée des blocs de premier niveau, appliquée par le composant `Slide`
- `.cascade-fin` : montée échelonnée des lignes de tableau et des cartes, à ajouter au conteneur

Les compteurs des grands chiffres s'animent une fois à l'entrée de la slide.

Tout est neutralisé si le système est réglé sur « réduire les animations ».

## Le fil du live

Cinq chapitres, tous orientés décision et non fonctionnement de l'outil.

1. **L'état du marché** — volume, ralentissement, concentration sur quatre métiers
2. **Les salaires** — le découplage volume / salaire, le cas Tech Lead, les fourchettes par famille
3. **L'IA** — diffusion réelle et absence de métier dédié
4. **Où sont les postes** — Data contre Design, junior, remote, poids des ESN
5. **Ce que tu fais** — les trois signaux, puis un plan d'action recruteur et un plan candidat

Chaque slide de données se termine par un bloc de double lecture : « Si tu recrutes » en
indigo saturé, « Si tu cherches un poste » en lavande. C'est le mécanisme central de la
prez : aucun chiffre n'est présenté sans ce qu'il implique de part et d'autre du marché.

```jsx
<Lecture
  recruteur="Ce que le chiffre change côté employeur."
  candidat="Ce qu'il change côté candidat."
/>
```

## Structure## Sources et précautions

Données : TPC Pulse, runs du 2 juin au 1er septembre 2026. 5 271 offres CDI au dernier run, 28 métiers suivis.

Deux points à garder en tête en live :

- Le run du 1er septembre photographie le stock d'offres actives à cette date. Il capture
  l'été, pas la reprise de rentrée.
- Les champs d'enrichissement entreprise (type de structure, secteur, taille, série de
  financement) ne sont pas comparables entre juin et les mois suivants, à cause de la
  réécriture du scraper en juillet. La slide 15 le documente explicitement. Ne pas citer
  d'évolution sur ces champs depuis juin.
