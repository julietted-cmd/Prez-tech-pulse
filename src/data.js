/* =========================================================================
   TPC Pulse In House — données du live
   Source : TPC Pulse, runs de juin à septembre 2026.
   Septembre : export Tech_Pulse_2026-09.xlsx, correction de stack appliquée.
   UN SEUL FICHIER À METTRE À JOUR CHAQUE MOIS.

   Procédure mensuelle :
   1. ajouter le libellé du mois dans MONTHS
   2. pousser la nouvelle valeur à la fin de chaque tableau `serie`
   3. mettre à jour les blocs KPI (valeur + commentaire)
   Les tableaux `serie` doivent toujours avoir la même longueur que MONTHS.

   CE QUI EST COMPARABLE ET CE QUI NE L'EST PAS
   En septembre, la classification reconnaît de nouveaux intitulés génériques
   de développement. Le volume total et les trois métiers de dev généralistes
   (Backend, Fullstack, Frontend) ne se comparent PAS aux mois précédents.
   Tout le reste est comparable. AFFECTES sert à marquer visuellement les
   séries concernées : ne pas la contourner.
   ========================================================================= */

export const LIVE = {
  titre: "Le marché de l'emploi tech",
  surtitre: "TPC Pulse In House",
  date: "Mercredi 16 septembre 2026",
  heure: "12h",
  dateCourte: "16.09",
  speakers: [
    { nom: "Mathias Frachon", role: "Cofondateur", boite: "TPC" },
    { nom: "Juliette Demain", role: "Content Engineer", boite: "TPC" },
  ],
  runLabel: "Run de septembre 2026",
};

export const MONTHS = ["Juin", "Juillet", "Août", "Septembre"];

export const FAM = {
  Tech: "var(--tech)",
  Data: "var(--data)",
  Product: "var(--product)",
  Design: "var(--design)",
};

/* Séries dont la comparaison mois à mois n'a pas de sens ce mois-ci. */
export const AFFECTES = [
  "Développeur Backend",
  "Développeur Fullstack",
  "Développeur Frontend",
];

/* ---------- Chapitres du récit ---------- */
export const CHAPITRES = [
  { id: "intro", titre: "Pourquoi ce baromètre" },
  { id: "methode", titre: "La méthode" },
  { id: "usage", titre: "Comment s'en servir" },
  { id: "insights", titre: "Ce que dit septembre" },
  { id: "action", titre: "Passer à l'action" },
];

/* ---------- Pourquoi ce baromètre ---------- */
export const POURQUOI = [
  {
    titre: "Ces données existent déjà, personne ne les publie",
    corps: "Chaque ESN, chaque scale-up, chaque cabinet tient sa grille interne et son suivi de marché. Ça reste dans un tableur partagé entre trois personnes. Résultat : le candidat négocie à l'aveugle, et l'entreprise croit que sa grille est dans le marché parce que personne ne lui a montré le contraire.",
  },
  {
    titre: "Les études existantes arrivent trop tard",
    corps: "Une étude de rémunération annuelle publiée en mars décrit le marché de l'automne précédent. Sur un marché qui bouge tous les trimestres, c'est une photo périmée présentée comme une référence.",
  },
  {
    titre: "On publie ce qu'on mesure, y compris ce qui gêne",
    corps: "Les seuils d'effectif, les changements de méthode, les chiffres qu'on ne peut pas publier : tout est écrit. Un baromètre qui ne dit jamais « on ne sait pas » n'est pas un baromètre, c'est une plaquette.",
  },
];

/* ---------- La méthode ---------- */
export const METHODE_ETAPES = [
  {
    n: "01",
    titre: "Collecte",
    corps: "Welcome to the Jungle et Hello Work, tous les CDI tech, product, data et design publiés en France métropolitaine. 21 186 annonces brutes ce mois-ci.",
  },
  {
    n: "02",
    titre: "Dédoublonnage",
    corps: "Sur le couple intitulé + employeur, appliqué à l'ensemble du pool : entre les deux jobboards et à l'intérieur de chacun. 1 514 doublons supprimés, aucun doublon exact ne subsiste.",
  },
  {
    n: "03",
    titre: "Classification",
    corps: "31 libellés métiers en 4 familles, avec des règles écrites et testées. Une annonce qui ne rentre dans aucun libellé est écartée et comptée à part, pas rangée de force.",
  },
  {
    n: "04",
    titre: "Enrichissement",
    corps: "Salaire, zone, télétravail, expérience demandée, taille et type d'employeur, compétences, mentions d'IA. Ce qui n'est pas publié dans l'annonce n'est pas inventé : il est compté comme non renseigné.",
  },
  {
    n: "05",
    titre: "Publication sous seuil",
    corps: "Une médiane à partir de 20 annonces avec salaire, une variation mois à mois à partir de 50. En dessous, on affiche le volume et on dit pourquoi on s'arrête là.",
  },
];

export const METHODE_LIMITES = [
  {
    titre: "Ce sont des offres publiées, pas le marché",
    corps: "Les postes pourvus par cooptation, chasse ou candidature spontanée n'y figurent pas. C'est flagrant sur les postes de direction : 101 annonces pour toute la France.",
  },
  {
    titre: "Les salaires affichés ne sont pas les salaires perçus",
    corps: "11,4 % des annonces publient une fourchette, et ce sont surtout les grilles standardisées des ESN. Le déclaré est systématiquement au-dessus.",
  },
];

/* ---------- Comment s'en servir ---------- */
export const USAGE_CANDIDAT = [
  {
    action: "Situez-vous sur votre métier, pas sur votre famille",
    detail: "Une médiane « Tech » mélange un QA junior et un Engineering Manager. Le seul chiffre utilisable est celui de votre libellé exact.",
  },
  {
    action: "Regardez l'écart, pas seulement la médiane",
    detail: "Serré, la grille est rigide et vous ne négocierez pas. Large, il y a du jeu. Sur le backend, la moitié des annonces tiennent en 10 K€. Sur le Product Manager, en 20 K€.",
  },
  {
    action: "Vérifiez qui publie avant de postuler",
    detail: "Si 60 % des annonces de votre métier viennent d'ESN, votre marché réel est deux fois plus petit qu'il n'y paraît.",
  },
  {
    action: "Testez le métier d'à côté",
    detail: "Le même profil sous un autre intitulé peut valoir plusieurs milliers d'euros de plus. Comparez votre fiche à celle des métiers adjacents.",
  },
];

export const USAGE_ENTREPRISE = [
  {
    action: "Calibrez sur le métier et la ville",
    detail: "Le même poste vaut 12,8 K€ de plus à Paris qu'ailleurs, à métier identique. Une grille unique pour toute la France sort mécaniquement des shortlists.",
  },
  {
    action: "Affichez votre fourchette",
    detail: "Seules 11,4 % des annonces le font. Dans un marché où presque personne n'affiche, celui qui affiche se distingue immédiatement.",
  },
  {
    action: "Mesurez votre concurrence réelle",
    detail: "Sur le backend, dix employeurs publient 20 % des annonces. Vous n'êtes pas face à 1 275 offres, mais à une poignée d'acteurs qui saturent le canal.",
  },
  {
    action: "Ouvrez aux profils de 3 à 5 ans",
    detail: "L'écart avec les 5-8 ans est de 8,7 K€. C'est le meilleur rapport coût / disponibilité du marché actuel.",
  },
];

/* ---------- Volume ---------- */
export const VOLUME = {
  serie: [5325, 5565, 5512, 6373],
  familles: [
    { nom: "Tech", serie: [3485, 3658, 3608, 4527] },
    { nom: "Data", serie: [942, 1010, 1022, 979] },
    { nom: "Product", serie: [778, 793, 778, 764] },
    { nom: "Design", serie: [120, 104, 104, 103] },
  ],
};

/* ---------- Top métiers, septembre ---------- */
export const METIERS = [
  { nom: "Développeur Backend", fam: "Tech", n: 1275, base: 915 },
  { nom: "Développeur Fullstack", fam: "Tech", n: 1100, base: 538 },
  { nom: "DevOps", fam: "Tech", n: 541, base: 509 },
  { nom: "Tech Lead", fam: "Tech", n: 473, base: 461 },
  { nom: "Data Engineer", fam: "Data", n: 445, base: 412 },
  { nom: "Product Owner", fam: "Product", n: 375, base: 391 },
  { nom: "Product Manager", fam: "Product", n: 337, base: 326 },
  { nom: "Data Analyst", fam: "Data", n: 194, base: 188 },
  { nom: "Data Scientist", fam: "Data", n: 188, base: 172 },
  { nom: "SRE", fam: "Tech", n: 177, base: 183 },
];

/* ---------- Ce qui monte, ce qui descend ----------
   Uniquement des séries comparables : les trois métiers de dev généralistes
   sont exclus, leur variation est un artefact de classification. */
export const MONTENT = [
  { nom: "Data Scientist", fam: "Data", serie: [172, 181, 190, 188], var: 9.3 },
  { nom: "Engineering Manager", fam: "Tech", serie: [109, 117, 121, 119], var: 9.2 },
  { nom: "Data Engineer", fam: "Data", serie: [412, 431, 419, 445], var: 8.0 },
  { nom: "DevOps", fam: "Tech", serie: [509, 551, 541, 541], var: 6.3 },
];

export const DESCENDENT = [
  { nom: "Product Designer", fam: "Design", serie: [82, 72, 62, 62], var: -24.4 },
  { nom: "Product Marketer", fam: "Product", serie: [40, 36, 40, 31], var: -22.5 },
  { nom: "Data Architect", fam: "Data", serie: [93, 105, 91, 78], var: -16.1 },
  { nom: "Développeur Mobile", fam: "Tech", serie: [95, 105, 99, 80], var: -15.8 },
];

/* ---------- Salaires médians (K€ brut/an) ----------
   Backend et Fullstack portent la correction de stack : leur niveau est juste,
   leur tendance mois à mois ne l'est pas. Les deux autres sont comparables. */
export const SALAIRES = [
  { nom: "Product Manager", couleur: "#F92441", serie: [60, 60, 60, 60] },
  { nom: "Développeur Fullstack", couleur: "#3B82F6", serie: [49, 48, 48, 52.5] },
  { nom: "Tech Lead", couleur: "#A19DFF", serie: [55, 55, 55, 52] },
  { nom: "Développeur Backend", couleur: "#FFFFFF", serie: [48, 46, 46, 46] },
];

/* ---------- Amplitude des médianes métiers ----------
   Remplace la fourchette de famille : une médiane « Tech » mélangerait des
   postes non comparables. On publie l'écart entre les métiers, pas un niveau. */
export const AMPLITUDE = [
  { nom: "Toutes familles", bas: 46, haut: 82.5, basNom: "Développeur Backend", hautNom: "Engineering Manager", n: 11 },
  { nom: "Tech", bas: 46, haut: 82.5, basNom: "Développeur Backend", hautNom: "Engineering Manager", n: 7 },
  { nom: "Product", bas: 48, haut: 60, basNom: "Product Owner", hautNom: "Product Manager", n: 2 },
  { nom: "Data", bas: 52, haut: 56, basNom: "Data Analyst", hautNom: "Data Scientist", n: 3 },
];

/* ---------- Déciles par métier, septembre ---------- */
export const DECILES = [
  { nom: "Engineering Manager", n: 22, p25: 68, med: 82.5, p75: 87, p90: 112.5 },
  { nom: "Product Manager", n: 65, p25: 52.5, med: 60, p75: 72.5, p90: 84 },
  { nom: "Data Engineer", n: 39, p25: 47.5, med: 55, p75: 67.5, p90: 79.8 },
  { nom: "Tech Lead", n: 44, p25: 47.5, med: 52, p75: 60.5, p90: 85 },
  { nom: "Développeur Fullstack", n: 132, p25: 45, med: 52.5, p75: 62.5, p90: 72.3 },
  { nom: "DevOps", n: 62, p25: 45, med: 50, p75: 59.4, p90: 70 },
  { nom: "Product Owner", n: 38, p25: 44.6, med: 48, p75: 52.4, p90: 62.2 },
  { nom: "Développeur Backend", n: 120, p25: 42.5, med: 46, p75: 52.5, p90: 65 },
];

/* ---------- Ce qui fait bouger le salaire ---------- */
export const VILLES = [
  { nom: "Paris / IDF", med: 62.5, n: 340, offres: 2717, ecart: 0 },
  { nom: "Lyon", med: 50, n: 63, offres: 509, ecart: -12.5 },
  { nom: "Toulouse", med: 50, n: 35, offres: 278, ecart: -12.5 },
  { nom: "Bordeaux", med: 49.5, n: 22, offres: 220, ecart: -13 },
  { nom: "Nantes", med: 47.5, n: 38, offres: 269, ecart: -15 },
  { nom: "Marseille / Aix", med: 47, n: 24, offres: 182, ecart: -15.5 },
  { nom: "Lille", med: 46, n: 32, offres: 300, ecart: -16.5 },
  { nom: "Autres villes", med: 45, n: 148, offres: 1641, ecart: -17.5 },
];

export const ECART_PARIS = { constant: 12.8, brut: 15.0, min: 7.5, minNom: "Product Owner", max: 20.5, maxNom: "Tech Lead", metiers: 7 };

export const EXPERIENCE = [
  { tranche: "3-5 ans", med: 47.5, n: 102 },
  { tranche: "5-8 ans", med: 56.2, n: 208 },
];

/* ---------- Qui recrute ---------- */
export const RECRUTEURS = [
  { nom: "ESN / Conseil", pct: 47.9 },
  { nom: "Grand groupe", pct: 15.9 },
  { nom: "Non précisé", pct: 14.9 },
  { nom: "Scale-up", pct: 12.0 },
  { nom: "Cabinet de recrutement", pct: 5.0 },
  { nom: "Startup", pct: 4.3 },
];

/* Top employeurs du métier le plus volumineux, pour illustrer la concentration. */
export const EMPLOYEURS_BACKEND = [
  { nom: "Sopra Steria", n: 50, type: "ESN" },
  { nom: "CGI", n: 30, type: "ESN" },
  { nom: "Groupe SII", n: 27, type: "ESN" },
  { nom: "Astek", n: 26, type: "ESN" },
  { nom: "Scalian", n: 25, type: "ESN" },
  { nom: "Celad", n: 22, type: "ESN" },
  { nom: "Extia", n: 21, type: "ESN" },
  { nom: "Viveris", n: 21, type: "ESN" },
];

export const CONCENTRATION = [
  { nom: "DevOps", pct: 22.7 },
  { nom: "Data Engineer", pct: 22.3 },
  { nom: "Product Owner", pct: 21.3 },
  { nom: "Product Manager", pct: 21.1 },
  { nom: "Développeur Backend", pct: 20.2 },
  { nom: "Développeur Fullstack", pct: 15.9 },
];

/* ---------- IA ---------- */
export const IA = {
  intitules: [429, 438, 476, 512],
  part: [8.0, 7.8, 8.6, 8.0],
  requise: 220,
  mentionnee: 371,
  aiEngineer: [145, 119, 132, 131],
};

/* ---------- Télétravail et expérience demandée ---------- */
export const PORTES = {
  remote: [3.7, 3.1, 2.4, 2.8],
  hybride: [87.7, 87.7, 89.0, 87.4],
  baseRemote: [868, 907, 934, 1068],
  junior: [9.0, 8.6, 8.7, 8.7],
};

/* ---------- Ce qu'on ne peut pas publier ---------- */
export const NON_PUBLIABLE = [
  { sujet: "Le prix du full remote", raison: "6 annonces croisent un salaire et du 100 % remote, sur les 726 qui affichent un salaire." },
  { sujet: "Les salaires au-delà de 8 ans", raison: "18 annonces. Le chiffre obtenu ressort même sous celui des 5-8 ans : c'est la donnée qui décroche, pas le marché." },
  { sujet: "Les postes de direction", raison: "101 annonces pour CTO, Head of Engineering, Head of Product et Head of Data réunis. Aucun employeur ne dépasse 4 annonces." },
  { sujet: "La médiane de la famille Design", raison: "Aucun métier Design n'atteint 20 annonces avec un salaire affiché." },
];

/* ---------- Les 3 signaux ---------- */
export const SIGNAUX = [
  {
    titre: "La Data technique monte, le Design s'effondre",
    corps: "Data Scientist +9,3 % et Data Engineer +8,0 % sur quatre mois, contre −24,4 % pour le Product Designer et −22,5 % pour le Product Marketer. Ces séries ne sont pas touchées par le changement de méthode : c'est du marché, pas du comptage.",
    couleur: "var(--data)",
  },
  {
    titre: "Devenir manager rapporte plus que changer de métier",
    corps: "Un Engineering Manager gagne 82,5 K€, un développeur backend 46 K€. Entre les deux, tous les autres métiers tech tiennent dans une fourchette de 46 à 60 K€. Autrement dit : passer de backend à DevOps ou à Data Engineer change peu de chose, passer au management change tout.",
    couleur: "var(--tech)",
  },
  {
    titre: "L'IA s'installe dans les postes, pas dans les intitulés",
    corps: "512 annonces mentionnent l'IA, mais sa part reste à 8 % depuis juin. Le poste dédié, lui, recule de 9,7 %. La compétence se diffuse, l'étiquette ne prend pas.",
    couleur: "var(--indigo)",
  },
];

/* ---------- Plans d'action ---------- */
export const PLAN_RECRUTEUR = [
  {
    action: "Sortez votre grille de la moyenne nationale",
    detail: "12,8 K€ d'écart entre Paris et le reste de la France, à métier identique. Une grille unique vous fait perdre les profils parisiens et surpayer ailleurs.",
  },
  {
    action: "Affichez votre fourchette",
    detail: "88,6 % des annonces ne le font pas. C'est le levier de différenciation le moins cher du marché.",
  },
  {
    action: "Visez les 3-5 ans",
    detail: "47,5 K€ contre 56,2 pour les 5-8 ans. Pour 8,7 K€ d'écart, le vivier est nettement plus large.",
  },
  {
    action: "N'ouvrez pas de poste AI Engineer",
    detail: "131 annonces sur tout le pays, en recul de 9,7 % depuis juin. Ajoutez la compétence à un poste existant, c'est ce que fait le marché.",
  },
  {
    action: "Regardez qui sature votre canal",
    detail: "Sur le DevOps, dix employeurs publient 23,7 % des annonces. Votre concurrence n'est pas le volume affiché, c'est une poignée d'acteurs.",
  },
];

export const PLAN_CANDIDAT = [
  {
    action: "Ne négociez jamais sur le chiffre lu dans l'annonce",
    detail: "Sur le backend, les annonces affichent 46 K€ et les gens en poste déclarent 52. L'écart vient des grilles d'ESN, surreprésentées dans les annonces.",
  },
  {
    action: "Regardez l'écart, pas la médiane",
    detail: "Product Owner : la moitié des annonces tiennent en 7,8 K€, la grille est rigide. Product Manager : 20 K€, il y a de la marge.",
  },
  {
    action: "Testez le métier d'à côté",
    detail: "Un Engineering Manager gagne 36,5 K€ de plus qu'un développeur backend. Le titre sur le CV vaut parfois plus qu'une année d'expérience.",
  },
  {
    action: "Décidez sur la ville avant de décider sur l'entreprise",
    detail: "12,8 K€ à métier constant, et jusqu'à 20,5 K€ sur un poste de Tech Lead. C'est le facteur le plus discriminant que l'on mesure.",
  },
  {
    action: "Oubliez le full remote comme critère",
    detail: "2,8 % des annonces qui renseignent le mode de travail. L'hybride, à 87,4 %, est la vraie zone de négociation.",
  },
];

/* ---------- Takeaways ---------- */
export const TAKEAWAYS = [
  {
    titre: "Le TPC Pulse en accès libre",
    corps: "26 fiches métiers, quatre mois d'historique, la méthode complète. Lien dans le chat.",
    fort: true,
  },
  {
    titre: "Le Career Score",
    corps: "Uploadez votre profil LinkedIn et récupérez la vision qu'un recruteur a de votre profil, par rapport au marché actuel.",
    fort: true,
  },
  {
    titre: "Le coaching en direct",
    corps: "On prend des situations réelles dans le chat et on les traite avec les chiffres sous les yeux.",
  },
];
