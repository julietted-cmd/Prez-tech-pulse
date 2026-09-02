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
  { id: "marche", titre: "L'état du marché" },
  { id: "salaires", titre: "Les salaires" },
  { id: "ia", titre: "L'IA" },
  { id: "postes", titre: "Où sont les postes" },
  { id: "action", titre: "Ce que tu fais" },
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
    titre: "La polyvalence se paie mieux que la spécialité",
    corps: "Fullstack à 52 K€ contre 45 pour le backend pur, alors qu'ils étaient à 1 K€ d'écart en juin. Si l'écart continue de se creuser, il faudra revoir les grilles backend à la baisse et les parcours d'évolution vers le fullstack.",
    couleur: "var(--tech)",
  },
  {
    titre: "L'IA s'installe dans les postes, pas dans les intitulés",
    corps: "Les mentions progressent de 13,8 % pendant que le marché recule, mais le poste dédié stagne et sa prime s'érode. À surveiller : le moment où la compétence IA deviendra un prérequis implicite plutôt qu'un argument.",
    couleur: "var(--indigo)",
  },
  {
    titre: "Le Design se referme sur Paris",
    corps: "95 offres seulement, et 74,7 % en Île-de-France contre 70,2 % en juin. Pour un recruteur en région, c'est une fenêtre. Pour un designer hors Paris, c'est le signal qu'il faut viser les scale-ups ouvertes à l'hybride.",
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

/* ---------- Plans d'action ---------- */
export const PLAN_RECRUTEUR = [
  {
    action: "Reprends ta grille si elle date de juin",
    detail: "Le Fullstack a gagné 3 K€ de médiane, le Backend en a perdu 3. Une grille de juin est fausse dans les deux sens.",
  },
  {
    action: "Monte ton plafond Data à 65 K€",
    detail: "C'est le plafond du marché en septembre, contre 60 K€ en juin. En dessous, tu sors des shortlists sans le savoir.",
  },
  {
    action: "Arrête de créer des postes AI Engineer",
    detail: "136 offres sur tout le pays, une médiane à 58 K€. Ajoute la compétence IA à un poste existant, c'est ce que fait le marché.",
  },
  {
    action: "Ouvre un poste aux 0-2 ans",
    detail: "95,8 % des offres exigent plus. Un poste junior te met en concurrence avec presque personne.",
  },
  {
    action: "Cadre le périmètre avant le titre",
    detail: "Un Tech Lead se négocie entre 52 et 70 K€ selon ce qu'il pilote. Le titre seul ne dit plus rien du niveau.",
  },
];

export const PLAN_CANDIDAT = [
  {
    action: "Ne négocie pas sur ton titre",
    detail: "Le Tech Lead a perdu 4 K€ de médiane en quatre mois pendant que son volume montait. Négocie sur le périmètre.",
  },
  {
    action: "Regarde du côté du fullstack",
    detail: "52 K€ de médiane contre 45 pour le backend pur. L'écart s'est créé cet été, il était de 1 K€ en juin.",
  },
  {
    action: "N'attends rien de l'étiquette IA",
    detail: "AI Engineer est payé 58 K€, exactement comme un SRE, et sa médiane baisse depuis juin. La compétence vaut mieux que l'intitulé.",
  },
  {
    action: "Renonce au full remote ou assume-le",
    detail: "0,3 % des offres. L'exiger revient à te fermer 99,7 % du marché. L'hybride, à 15,2 %, est la vraie zone de négociation.",
  },
  {
    action: "Filtre les ESN dès la lecture",
    detail: "Une offre sur deux vient d'une ESN ou d'un cabinet. Si tu veux du produit, ton marché réel est deux fois plus petit qu'il n'y paraît.",
  },
];
