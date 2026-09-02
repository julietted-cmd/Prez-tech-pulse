/* =========================================================================
   TPC Pulse In House — données du live
   Source : TPC Pulse, runs du 2026-06-02 au 2026-09-01.
   UN SEUL FICHIER À METTRE À JOUR CHAQUE MOIS.

   Procédure mensuelle :
   1. ajouter le libellé du mois dans MONTHS
   2. pousser la nouvelle valeur à la fin de chaque tableau `serie`
   3. mettre à jour les blocs KPI (valeur + commentaire)
   Les tableaux `serie` doivent toujours avoir la même longueur que MONTHS.
   ========================================================================= */

export const LIVE = {
  titre: "Le marché tech français en 5 271 offres",
  surtitre: "TPC Pulse In House",
  date: "Mercredi 16 septembre 2026",
  heure: "12h",
  dateCourte: "16.09",
  speakers: [
    { nom: "Mathias Frachon", role: "Cofondateur", boite: "TPC" },
    { nom: "Juliette Demain", role: "Content Engineer", boite: "TPC" },
  ],
  runLabel: "Run du 1er septembre 2026",
};

export const MONTHS = ["Juin", "Juillet", "Août", "Septembre"];

export const FAM = {
  Tech: "var(--tech)",
  Data: "var(--data)",
  Product: "var(--product)",
  Design: "var(--design)",
};

/* ---------- Chapitres du récit (ordre chronologique du live) ---------- */
export const CHAPITRES = [
  { id: "outil", titre: "L'outil" },
  { id: "marche", titre: "Le marché" },
  { id: "prix", titre: "Les prix" },
  { id: "ia", titre: "L'IA" },
  { id: "angles", titre: "Les angles morts" },
  { id: "retenir", titre: "Ce qu'on retient" },
];

/* ---------- Volume ---------- */
export const VOLUME = {
  serie: [5353, 5591, 5541, 5271],
  familles: [
    { nom: "Tech", serie: [3522, 3698, 3651, 3489] },
    { nom: "Data", serie: [934, 999, 1010, 955] },
    { nom: "Product", serie: [776, 790, 776, 732] },
    { nom: "Design", serie: [121, 104, 104, 95] },
  ],
};

/* ---------- Top métiers, septembre ---------- */
export const METIERS = [
  { nom: "Développeur Backend", fam: "Tech", n: 894, base: 913 },
  { nom: "Tech Lead", fam: "Tech", n: 682, base: 638 },
  { nom: "DevOps", fam: "Tech", n: 526, base: 509 },
  { nom: "Développeur Fullstack", fam: "Tech", n: 525, base: 538 },
  { nom: "Data Engineer", fam: "Data", n: 415, base: 411 },
  { nom: "Product Owner", fam: "Product", n: 369, base: 391 },
  { nom: "Product Manager", fam: "Product", n: 317, base: 324 },
  { nom: "Data Analyst", fam: "Data", n: 195, base: 189 },
  { nom: "Data Scientist", fam: "Data", n: 186, base: 170 },
  { nom: "SRE", fam: "Tech", n: 162, base: 188 },
];

/* ---------- Salaires médians (K€ brut/an) ---------- */
/* Une couleur par métier, pas par famille : trois des quatre courbes sont Tech,
   et c'est leur croisement qui porte le message. Palette TPC (indigo-150,
   indigo-250, red-250) + blanc pour le Backend, fil rouge du récit. */
export const SALAIRES = [
  { nom: "Product Manager", couleur: "#F92441", serie: [60, 60, 60, 62] },
  { nom: "Tech Lead", couleur: "#A19DFF", serie: [56, 55, 55, 52] },
  { nom: "Développeur Fullstack", couleur: "#3B82F6", serie: [49, 48, 48, 52] },
  { nom: "Développeur Backend", couleur: "#FFFFFF", serie: [48, 46, 46, 45] },
];

export const FOURCHETTES = [
  { nom: "Global", juin: "48 – 60", sept: "50 – 60", sens: "up", note: "Tiré par Product et Data" },
  { nom: "Tech", juin: "47 – 59", sept: "47 – 58", sens: "down", note: "Plafond en recul" },
  { nom: "Product", juin: "50 – 60", sept: "51 – 60", sens: "up", note: "Plancher en hausse" },
  { nom: "Data", juin: "50 – 60", sept: "50 – 65", sens: "up", note: "Plafond le plus haut du marché" },
  { nom: "Design", juin: "48 – 60", sept: "45 – 60", sens: "down", note: "Sous le seuil de fiabilité" },
];

/* ---------- IA ---------- */
export const IA = {
  mentions: [429, 438, 476, 488],
  aiEngineer: [145, 119, 132, 136],
  partSerie: [8.0, 7.8, 8.6, 9.3],
};

/* ---------- Portes fermées ---------- */
export const PORTES = {
  junior: [4.6, 4.3, 4.4, 4.2],
  juniorProduct: [2.3, 2.2, 2.3, 1.6],
  remote: [0.6, 0.5, 0.4, 0.3],
  hybride: [14.3, 14.3, 15.0, 15.2],
};

/* ---------- Qui recrute (attention : rupture de méthode en juillet) ---------- */
export const RECRUTEURS = [
  { nom: "ESN / Conseil", pct: 50.0 },
  { nom: "Grand groupe", pct: 16.4 },
  { nom: "Scale-up", pct: 10.5 },
  { nom: "Cabinet de recrutement", pct: 5.3 },
  { nom: "Startup", pct: 4.1 },
  { nom: "Non précisé", pct: 13.8 },
];

export const RECRUTEURS_PAR_FAM = [
  { nom: "Tech", pct: 53.6 },
  { nom: "Data", pct: 46.9 },
  { nom: "Product", pct: 38.4 },
  { nom: "Design", pct: 34.7 },
];

/* ---------- Signal ou artefact ---------- */
export const CTO = [35, 33, 62, 36];

export const RUPTURES = [
  { champ: "ESN / Conseil", serie: ["38,3 %", "49,2 %", "51,8 %", "50 %"], verdict: "niveau fiable, tendance non" },
  { champ: "Secteur IT / Digital", serie: ["28,5 %", "7,5 %", "7,5 %", "7,7 %"], verdict: "rupture de méthode" },
  { champ: "Taille non précisée", serie: ["24 %", "62,8 %", "32,3 %", "30,9 %"], verdict: "réparé en septembre" },
  { champ: "Base série de financement", serie: ["1 114", "653", "609", "768"], verdict: "inexploitable en tendance" },
];

/* ---------- Les 3 signaux ---------- */
export const SIGNAUX = [
  {
    titre: "Le Fullstack passe devant le Backend",
    corps: "52 K€ contre 45 K€ de médiane. Ils étaient à 1 K€ d'écart en juin. Le marché paie la polyvalence, plus le volume.",
    couleur: "var(--tech)",
  },
  {
    titre: "L'IA devient un attribut, pas un métier",
    corps: "Les mentions d'IA progressent de 13,8 % pendant que le marché recule. Le poste AI Engineer, lui, stagne et sa prime s'érode.",
    couleur: "var(--indigo)",
  },
  {
    titre: "Le Design sort du radar",
    corps: "95 offres, et plus assez de salaires renseignés pour publier une médiane depuis juin. Concentration parisienne à 74,7 %.",
    couleur: "var(--design)",
  },
];

/* ---------- Takeaways ---------- */
export const TAKEAWAYS = [
  {
    titre: "L'accès au TPC Pulse",
    corps: "Tes chiffres, métier par métier, mois par mois. Le lien est envoyé à tous les inscrits après le live.",
    fort: true,
  },
  {
    titre: "L'outil de positionnement candidat",
    corps: "En exclusivité pour cette session. Tu entres ton métier et ton niveau, tu vois où tu te situes réellement sur le marché.",
    fort: true,
  },
  {
    titre: "Les fourchettes médianes par métier",
    corps: "De quoi calibrer une offre ou préparer une négociation sur des chiffres de septembre, pas d'une étude de l'an dernier.",
  },
  {
    titre: "La méthode complète",
    corps: "Le pipeline, les sources, les arbitrages et les biais. De quoi construire ta propre veille en interne.",
  },
];

/* ---------- Pipeline ---------- */
export const PIPELINE = [
  { etape: "Collecte", detail: "Toutes les offres CDI Tech, Product, Data et Design publiées en France, récupérées chaque début de mois." },
  { etape: "Dédoublonnage", detail: "Une même offre republiée sur trois plateformes ne compte qu'une fois. C'est là que se joue la fiabilité du volume." },
  { etape: "Catégorisation", detail: "Chaque intitulé est rattaché à l'un des 28 métiers suivis. Aucune offre ne reste hors périmètre." },
  { etape: "Arbitrage", detail: "Les cas limites sont tranchés à la main. Ce mois-ci : 33 offres réinjectées, 6 retirées du périmètre." },
  { etape: "Comparaison", detail: "Chaque métrique est confrontée au mois précédent. C'est la comparaison qui produit l'insight, pas la photo." },
];
