import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Slide,
  Kicker,
  Titre,
  Corps,
  BigNum,
  Deux,
  Encadre,
  Carte,
  Lecture,
  Sparkline,
  fmtNum,
  fmtDec,
} from "./Deck.jsx";
import {
  LIVE,
  MONTHS,
  FAM,
  CHAPITRES,
  POURQUOI,
  METHODE_ETAPES,
  METHODE_LIMITES,
  AFFECTES,
  RUPTURE,
  VOLUME,
  METIERS,
  MONTENT,
  DESCENDENT,
  SALAIRES,
  AMPLITUDE,
  VILLES,
  ECART_PARIS,
  EXPERIENCE,
  RECRUTEURS,
  EMPLOYEURS_BACKEND,
  IA,
  PORTES,
  SIGNAUX,
  TAKEAWAYS,
  PLAN_RECRUTEUR,
} from "./data.js";

const tooltipStyle = {
  background: "rgba(10,10,12,0.96)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  color: "#fff",
  fontFamily: "'Bricolage Grotesque', sans-serif",
  fontSize: 13,
};

const axis = { stroke: "rgba(255,255,255,0.28)", fontSize: 12 };

/* Barre horizontale simple, utilisée partout où il faut comparer des parts. */
const Bar = ({ label, value, max, color, right, sub }) => (
  <div className="mb-3">
    <div className="flex items-baseline justify-between mb-1.5 gap-4">
      <span style={{ color: "rgba(255,255,255,0.88)", fontSize: 15 }}>
        {label}
        {sub && <span style={{ color: "rgba(255,255,255,0.34)", marginLeft: 8, fontSize: 12 }}>{sub}</span>}
      </span>
      <span className="tnum font-semibold" style={{ color: "#fff", fontSize: 15 }}>
        {right}
      </span>
    </div>
    <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.07)" }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", borderRadius: 3, background: color }} />
    </div>
  </div>
);

/* Ligne de plan d'action, numérotée. */
const Action = ({ n, action, detail, accent, tint }) => (
  <div
    className="rounded-xl mb-3"
    style={{ background: tint, border: `1px solid ${accent}55`, borderLeft: `3px solid ${accent}`, padding: "14px 18px" }}
  >
    <div className="flex gap-3.5">
      <span className="tnum font-bold" style={{ color: accent, fontSize: 15, lineHeight: 1.4, minWidth: 14 }}>
        {n}
      </span>
      <div>
        <div className="text-white font-semibold" style={{ fontSize: 16, letterSpacing: "-0.01em" }}>
          {action}
        </div>
        {detail && (
          <div className="mt-1" style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, lineHeight: 1.5 }}>
            {detail}
          </div>
        )}
      </div>
    </div>
  </div>
);

/* Variation d'un métier sur quatre mois, avec sa courbe. */
const Mouvement = ({ item, sens }) => {
  const couleur = sens === "haut" ? "#0AC26C" : "#F92441";
  return (
    <div
      className="rounded-xl"
      style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.10)", padding: "16px 18px" }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-white font-semibold" style={{ fontSize: 15.5, letterSpacing: "-0.01em" }}>
          {item.nom}
        </span>
        <span className="tnum font-extrabold" style={{ color: couleur, fontSize: 19 }}>
          {item.var > 0 ? "+" : ""}
          {fmtDec(item.var)} %
        </span>
      </div>
      <div className="mt-2.5">
        <Sparkline serie={item.serie} color={couleur} height={40} points />
      </div>
      <div className="flex justify-between mt-1.5" style={{ color: "rgba(255,255,255,0.32)", fontSize: 11 }}>
        {MONTHS.map((m) => (
          <span key={m}>{m.slice(0, 4)}</span>
        ))}
      </div>
      <div className="tnum mt-1.5" style={{ color: "rgba(255,255,255,0.42)", fontSize: 12 }}>
        {MONTHS[0]} {item.serie[0]} → {MONTHS[MONTHS.length - 1]} {item.serie[item.serie.length - 1]} annonces
      </div>
    </div>
  );
};

/* Une ligne de déciles : la moitié des annonces dans la bande claire. */
const LigneDecile = ({ d, max }) => {
  const pc = (v) => `${(v / max) * 100}%`;
  return (
    <div className="mb-3.5">
      <div className="flex items-baseline justify-between mb-1.5 gap-4">
        <span style={{ color: "rgba(255,255,255,0.88)", fontSize: 14.5 }}>
          {d.nom}
          <span style={{ color: "rgba(255,255,255,0.32)", marginLeft: 8, fontSize: 12 }}>n={d.n}</span>
        </span>
        <span className="tnum font-semibold" style={{ color: "#fff", fontSize: 15 }}>
          {fmtDec(d.med)} K€
        </span>
      </div>
      <div style={{ position: "relative", height: 14, borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>
        <div
          style={{
            position: "absolute",
            left: pc(d.p25),
            width: pc(d.p75 - d.p25),
            top: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.22)",
            borderRadius: 4,
          }}
        />
        <div style={{ position: "absolute", left: pc(d.med), top: -2, bottom: -2, width: 2.5, background: "#fff", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: pc(d.p90), top: 2, bottom: 2, width: 1.5, background: "rgba(255,255,255,0.45)" }} />
      </div>
      <div className="tnum mt-1" style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
        la moitié entre {fmtDec(d.p25)} et {fmtDec(d.p75)} K€ · 10 % au-dessus de {fmtDec(d.p90)} K€
      </div>
    </div>
  );
};

/* ======================= LES SLIDES ======================= */

export const SLIDES = [
  /* ---------- 01 Couverture ---------- */
  {
    nav: "Couverture",
    chapitre: null,
    render: () => (
      <Slide>
        <div className="flex items-center gap-2.5 mb-8">
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "var(--signal)", boxShadow: "0 0 14px var(--signal)" }} />
          <span className="font-semibold" style={{ color: "var(--signal)", fontSize: 15 }}>
            {LIVE.surtitre}
          </span>
        </div>
        <h1
          className="font-extrabold text-white"
          style={{ fontSize: "clamp(38px, 6.2vw, 86px)", lineHeight: 0.95, letterSpacing: "-0.035em", maxWidth: "21ch" }}
        >
          {LIVE.titre}
        </h1>
        <div className="mt-6" style={{ color: "rgba(255,255,255,0.62)", fontSize: "clamp(16px, 1.5vw, 21px)", maxWidth: "54ch", lineHeight: 1.45 }}>
          Ce que les chiffres de septembre changent pour vos recrutements et pour vos négociations.
        </div>
        <div className="mt-10 flex flex-wrap items-end gap-x-14 gap-y-6">
          {LIVE.speakers.map((s) => (
            <div key={s.nom}>
              <div className="text-white font-semibold" style={{ fontSize: 18 }}>
                {s.nom}
              </div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 14.5 }}>
                {s.role} @ {s.boite}
              </div>
            </div>
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 02 Sommaire ---------- */
  {
    nav: "Sommaire",
    chapitre: null,
    render: () => (
      <Slide>
        <Kicker>Le déroulé</Kicker>
        <Titre>Au programme</Titre>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {CHAPITRES.map((ch, i) => (
            <div
              key={ch.id}
              className="rounded-xl flex items-baseline gap-4"
              style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.10)", padding: "18px 22px" }}
            >
              <span className="tnum font-extrabold" style={{ color: "var(--signal)", fontSize: 26, letterSpacing: "-0.03em", minWidth: 40 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="text-white font-semibold" style={{ fontSize: 18, letterSpacing: "-0.01em" }}>
                  {ch.titre}
                </div>
                <div className="mt-1" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.45 }}>
                  {
                    [
                      "Pourquoi on publie des chiffres que tout le monde garde pour soi",
                      "Comment on les fabrique, et ce qu'ils ne disent pas",
                      "Les chiffres de septembre, un par un",
                      "Le Career Score et vos situations, en direct",
                    ][i]
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
        <Corps className="mt-7">
          Les questions dans le chat au fil de l'eau. On garde les quinze dernières minutes pour les traiter avec les
          chiffres sous les yeux.
        </Corps>
      </Slide>
    ),
  },

  /* ---------- 03 Pourquoi ce baromètre ---------- */
  {
    nav: "Pourquoi",
    chapitre: "intro",
    render: () => (
      <Slide>
        <Kicker>Le point de départ</Kicker>
        <Titre>Tout le monde a ces données. Personne ne les publie.</Titre>
        <div className="mt-10 space-y-4">
          {POURQUOI.map((p, i) => (
            <div
              key={p.titre}
              className="rounded-xl"
              style={{
                background: i === 0 ? "linear-gradient(150deg, rgba(249,36,65,0.15), rgba(249,36,65,0.04))" : "rgba(255,255,255,0.035)",
                border: `1px solid ${i === 0 ? "rgba(250,137,153,0.34)" : "rgba(255,255,255,0.10)"}`,
                padding: "26px 28px",
              }}
            >
              <div className="text-white font-semibold" style={{ fontSize: "clamp(19px, 2vw, 25px)", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                {p.titre}
              </div>
            </div>
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 04 La méthode ---------- */
  {
    nav: "Méthode",
    chapitre: "methode",
    render: () => (
      <Slide>
        <Kicker>Comment c'est fabriqué</Kicker>
        <Titre>De 21 186 annonces brutes à 6 373 publiées</Titre>
        <div className="mt-10 grid sm:grid-cols-5 gap-3">
          {METHODE_ETAPES.map((e) => (
            <div
              key={e.n}
              className="rounded-xl"
              style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.10)", padding: "26px 20px" }}
            >
              <div className="tnum font-extrabold" style={{ color: "var(--signal)", fontSize: 26, letterSpacing: "-0.03em" }}>
                {e.n}
              </div>
              <div className="text-white font-semibold mt-3" style={{ fontSize: 18, letterSpacing: "-0.015em" }}>
                {e.titre}
              </div>
            </div>
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 05 Ce que la méthode ne dit pas ---------- */
  {
    nav: "Limites",
    chapitre: "methode",
    render: () => (
      <Slide>
        <Kicker color="var(--danger)">Les limites, dites d'entrée</Kicker>
        <Titre>Ce que ces chiffres ne mesurent pas</Titre>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {METHODE_LIMITES.map((l) => (
            <Encadre key={l.titre} titre={l.titre} ton="alerte">
              {l.corps}
            </Encadre>
          ))}
        </div>
      </Slide>
    ),
  },

  /* ================= LES INSIGHTS — un chiffre par slide =================
     Ordre du récit : l'état général d'abord, puis ce qui bouge, puis les
     chiffres clés, puis ce qu'on en retient. Une slide = une idée. */

  /* ---------- 06 Le volume ---------- */
  {
    nav: "6 373 annonces",
    chapitre: "insights",
    render: ({ active }) => (
      <Slide>
        <Kicker>L'état du marché</Kicker>
        <Deux ratio="0.9fr 1.1fr" gap={48}>
          <div>
            <BigNum value={6373} active={active} unite="annonces publiées en septembre" />
          </div>
          <div>
            <Corps>
              Tous les CDI tech, product, data et design publiés en France métropolitaine, après dédoublonnage.
            </Corps>
            <Encadre titre="Le chiffre monte, le marché non" ton="alerte" className="mt-5">
              {RUPTURE.captees} de ces annonces sont captées par un classifieur élargi ce mois-ci : elles existaient
              avant, on ne les comptait pas. Ramené au périmètre d'août, septembre est à{" "}
              {fmtNum(RUPTURE.perimetreConstant)} annonces contre {fmtNum(RUPTURE.totalAout)}, soit{" "}
              {fmtDec(RUPTURE.varConstant)} %.
            </Encadre>
          </div>
        </Deux>
      </Slide>
    ),
  },

  /* ---------- 07 Ce qui monte ---------- */
  {
    nav: "Ce qui monte",
    chapitre: "insights",
    render: () => (
      <Slide>
        <Kicker color="#0AC26C">La tendance</Kicker>
        <Titre>Ce qui monte</Titre>
        <Corps className="mt-3">
          Quatre métiers en hausse depuis juin, sur des séries que le changement de méthode n'a pas touchées.
        </Corps>
        <div className="mt-8 grid sm:grid-cols-4 gap-3">
          {MONTENT.map((m) => (
            <Mouvement key={m.nom} item={m} sens="haut" />
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 08 Ce qui descend ---------- */
  {
    nav: "Ce qui descend",
    chapitre: "insights",
    render: () => (
      <Slide>
        <Kicker color="var(--danger)">La tendance</Kicker>
        <Titre>Ce qui se referme</Titre>
        <Corps className="mt-3">
          Mêmes règles : aucune de ces quatre séries n'est affectée par le changement de méthode. Les reculs sont
          réels.
        </Corps>
        <div className="mt-8 grid sm:grid-cols-4 gap-3">
          {DESCENDENT.map((m) => (
            <Mouvement key={m.nom} item={m} sens="bas" />
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 09 Où sont les annonces ---------- */
  {
    nav: "Top métiers",
    chapitre: "insights",
    render: () => (
      <Slide>
        <Kicker>Où sont les annonces</Kicker>
        <Titre>Deux métiers concentrent 37 % du marché</Titre>
        <div className="mt-8">
          {METIERS.map((m) => (
            <Bar
              key={m.nom}
              label={m.nom}
              value={m.n}
              max={METIERS[0].n}
              color={FAM[m.fam]}
              right={fmtNum(m.n)}
            />
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 10 L'amplitude des salaires ---------- */
  {
    nav: "46 – 82,5 K€",
    chapitre: "insights",
    render: () => (
      <Slide>
        <Kicker>Les salaires</Kicker>
        <Deux ratio="0.95fr 1.05fr" gap={48}>
          <div>
            <div className="font-extrabold tnum text-white" style={{ fontSize: "clamp(46px, 8.4vw, 110px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}>
              {fmtDec(AMPLITUDE[0].bas)}&#8202;–&#8202;{fmtDec(AMPLITUDE[0].haut)}
              <span style={{ fontSize: "0.3em", marginLeft: 4 }}> K€</span>
            </div>
            <div className="mt-4" style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(14px, 1.3vw, 19px)" }}>
              du métier le moins payé au mieux payé
            </div>
          </div>
          <div>
            <Corps>
              {AMPLITUDE[0].basNom} à {fmtDec(AMPLITUDE[0].bas)} K€, {AMPLITUDE[0].hautNom} à{" "}
              {fmtDec(AMPLITUDE[0].haut)} K€. Ce sont des médianes de métiers, toutes séniorités confondues.
            </Corps>
            <Encadre titre="Deux réserves avant d'en tirer une conclusion" ton="alerte" className="mt-5">
              Le bas de la fourchette mélange toutes les séniorités, sorties d'école comprises. Et l'Engineering
              Manager est quasiment le seul poste d'encadrement à afficher un salaire : les CTO et les Head of n'en
              publient pas.
            </Encadre>
          </div>
        </Deux>
      </Slide>
    ),
  },

  /* ---------- 12 Le taux d'affichage ---------- */
  {
    nav: "11,4 % affichent",
    chapitre: "insights",
    render: ({ active }) => (
      <Slide>
        <Kicker>Les salaires</Kicker>
        <Deux ratio="0.9fr 1.1fr" gap={48}>
          <div>
            <BigNum value={11.4} decimals={1} suffix="%" active={active} unite="des annonces affichent un salaire" color="#F92441" />
          </div>
          <div>
            <Corps>726 annonces sur 6 373. Les autres ne publient rien.</Corps>
          </div>
        </Deux>
      </Slide>
    ),
  },

  /* ---------- 13 Le prix de la ville ---------- */
  {
    nav: "+12,8 K€ à Paris",
    chapitre: "insights",
    render: () => (
      <Slide>
        <Kicker>Ce qui fait bouger le salaire</Kicker>
        <Titre>Le même poste vaut 12,8 K€ de plus à Paris</Titre>
        <div className="mt-7">
          {VILLES.map((v) => (
            <Bar
              key={v.nom}
              label={v.nom}
              value={v.med}
              max={VILLES[0].med}
              color={v.ecart === 0 ? "#F92441" : "rgba(249,36,65,0.55)"}
              right={v.ecart ? `${fmtDec(v.med)} K€    ${fmtDec(v.ecart)}` : `${fmtDec(v.med)} K€    référence`}
            />
          ))}
        </div>
        <Encadre titre="Ce n'est pas un effet de composition" ton="positif" className="mt-5">
          Comparer la médiane parisienne à celle du reste de la France donne 15,0 K€ d'écart, mais ce chiffre mélange
          des métiers différents : Paris concentre davantage de postes seniors. En neutralisant cet effet, métier par
          métier, il reste {fmtDec(ECART_PARIS.constant)} K€. C'est bien le même poste qui est payé plus cher.
        </Encadre>
      </Slide>
    ),
  },

  /* ---------- 14 Le prix de l'expérience ---------- */
  {
    nav: "+8,7 K€ d'expérience",
    chapitre: "insights",
    render: () => (
      <Slide>
        <Kicker>Ce qui fait bouger le salaire</Kicker>
        <Titre>Une marche, pas une courbe</Titre>
        <div className="mt-10 flex flex-wrap items-center gap-7">
          {EXPERIENCE.map((e, i) => (
            <React.Fragment key={e.tranche}>
              <div
                className="rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", padding: "26px 34px" }}
              >
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>{e.tranche} d'expérience</div>
                <div className="font-extrabold tnum text-white" style={{ fontSize: 62, lineHeight: 1.05, letterSpacing: "-0.035em" }}>
                  {fmtDec(e.med)}
                  <span style={{ fontSize: 24, color: "rgba(255,255,255,0.5)" }}> K€</span>
                </div>
              </div>
              {i === 0 && (
                <div className="font-extrabold tnum" style={{ color: "#0AC26C", fontSize: 34, whiteSpace: "nowrap" }}>
                  → +8,7 K€
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <Encadre titre="Pourquoi on s'arrête à 8 ans" ton="alerte" className="mt-8">
          Au-delà, 18 annonces seulement affichent un salaire.
        </Encadre>
      </Slide>
    ),
  },

  /* ---------- 15 Qui publie ---------- */
  {
    nav: "52,9 % d'intermédiaires",
    chapitre: "insights",
    render: ({ active }) => (
      <Slide>
        <Kicker>Qui publie</Kicker>
        <Deux ratio="0.9fr 1.1fr" gap={48}>
          <div>
            <BigNum value={52.9} decimals={1} suffix="%" active={active} unite="des annonces viennent d'une ESN ou d'un cabinet" />
          </div>
          <div>
            <Corps className="mb-5">Une annonce sur deux ne vient pas de l'entreprise où vous travaillerez.</Corps>
            {RECRUTEURS.map((r) => (
              <Bar
                key={r.nom}
                label={r.nom}
                value={r.pct}
                max={RECRUTEURS[0].pct}
                color={r.nom.includes("ESN") || r.nom.includes("Cabinet") ? "#F92441" : "rgba(255,255,255,0.35)"}
                right={`${fmtDec(r.pct)} %`}
              />
            ))}
          </div>
        </Deux>
      </Slide>
    ),
  },

  /* ---------- 16 La concentration ---------- */
  {
    nav: "Huit employeurs",
    chapitre: "insights",
    render: ({ active }) => (
      <Slide>
        <Kicker>Qui publie</Kicker>
        <Deux ratio="0.9fr 1.1fr" gap={48}>
          <div>
            <BigNum value={222} active={active} unite="des 1 275 annonces backend viennent de huit employeurs" />
            <Corps className="mt-6">
              Près d'une annonce backend sur six. Vous n'êtes pas face à 1 275 entreprises, mais à une poignée
              d'acteurs qui publient en volume.
            </Corps>
          </div>
          <div>
            <div className="font-semibold mb-4" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
              Les huit premiers employeurs sur le backend
            </div>
            {EMPLOYEURS_BACKEND.map((e, i) => (
              <div key={e.nom} className="flex items-center gap-3 mb-2.5">
                <span className="tnum" style={{ width: 18, color: "rgba(255,255,255,0.3)", fontSize: 13, textAlign: "right" }}>
                  {i + 1}
                </span>
                <span style={{ width: 130, color: "rgba(255,255,255,0.9)", fontSize: 14.5 }}>{e.nom}</span>
                <span style={{ flex: 1, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.07)" }}>
                  <span
                    style={{
                      display: "block",
                      height: "100%",
                      borderRadius: 4,
                      width: `${(e.n / EMPLOYEURS_BACKEND[0].n) * 100}%`,
                      background: "#F92441",
                    }}
                  />
                </span>
                <span className="tnum font-semibold" style={{ width: 68, textAlign: "right", color: "#fff", fontSize: 14 }}>
                  {e.n}
                </span>
              </div>
            ))}
            <div className="mt-4" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13.5, lineHeight: 1.5 }}>
              Les huit sont des ESN. Aucun employeur final n'apparaît dans le haut du classement.
            </div>
          </div>
        </Deux>
      </Slide>
    ),
  },

  /* ---------- 17 L'IA ---------- */
  {
    nav: "L'IA",
    chapitre: "insights",
    render: ({ active }) => (
      <Slide>
        <Kicker>L'IA</Kicker>
        <Deux ratio="0.9fr 1.1fr" gap={48}>
          <div>
            <BigNum value={220} active={active} unite="annonces exigent la compétence IA" color="#A19DFF" />
            <Corps className="mt-6">
              Et 371 de plus la mentionnent sans l'exiger. L'IA apparaît dans 512 annonces au total, soit une sur huit.
            </Corps>
          </div>
          <div>
            <div className="font-semibold mb-3" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
              Part des annonces mentionnant l'IA
            </div>
            <Sparkline serie={IA.part} labels={MONTHS} color="#A19DFF" height={70} baseZero />
            <div className="tnum mt-3" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13.5 }}>
              8,0 % en juin · 7,8 % en juillet · 8,6 % en août · 8,0 % en septembre
            </div>
            <Encadre titre="L'étiquette ne prend pas, la compétence si" className="mt-5">
              Le poste d'AI Engineer passe de 145 annonces en juin à 131 en septembre, soit −9,7 %. Pendant ce temps,
              la compétence continue d'apparaître dans les fiches de postes existantes. On n'embauche pas un
              spécialiste IA, on demande l'IA à tout le monde.
              <div className="mt-2.5" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
                Notre lecture du marché, pas une causalité démontrée.
              </div>
            </Encadre>
          </div>
        </Deux>
      </Slide>
    ),
  },

  /* ---------- 18 Le télétravail ---------- */
  {
    nav: "2,8 % de full remote",
    chapitre: "insights",
    render: ({ active }) => (
      <Slide>
        <Kicker>Le télétravail</Kicker>
        <Deux ratio="0.9fr 1.1fr" gap={48}>
          <div>
            <BigNum value={2.8} decimals={1} suffix="%" active={active} unite="de full remote, parmi les annonces qui le précisent" color="#F92441" />
          </div>
          <div>
            <Corps>
              1 068 annonces indiquent un mode de travail. Parmi elles, 87,4 % sont en hybride. Exiger le full remote
              revient à se fermer la quasi-totalité du marché visible.
            </Corps>
            <Encadre titre="Ce qu'on ne peut pas vous dire" ton="alerte" className="mt-5">
              Savoir si le full remote se paie plus ou moins demanderait des annonces affichant à la fois un salaire et
              un mode de travail. Il y en a six ce mois-ci.
            </Encadre>
          </div>
        </Deux>
      </Slide>
    ),
  },

  /* ---------- 20 Les trois signaux ---------- */
  {
    nav: "Les 3 signaux",
    chapitre: "insights",
    render: () => (
      <Slide>
        <Kicker>Ce qu'il faut retenir</Kicker>
        <Titre>Trois signaux à surveiller d'ici octobre</Titre>
        <Corps className="mt-3">
          Les chiffres sont mesurés, les explications sont les nôtres. Aucune causalité n'est démontrée ici : c'est
          une lecture, faites-vous la vôtre.
        </Corps>
        <div className="mt-7 space-y-4">
          {SIGNAUX.map((s, i) => (
            <div
              key={s.titre}
              className="rounded-xl"
              style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.10)", borderLeft: `3px solid ${s.couleur}`, padding: "20px 24px" }}
            >
              <div className="flex gap-4">
                <span className="tnum font-extrabold" style={{ color: s.couleur, fontSize: 22, minWidth: 30 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-white font-semibold" style={{ fontSize: 19, letterSpacing: "-0.015em" }}>
                    {s.titre}
                  </div>
                  <div className="mt-2" style={{ color: "rgba(255,255,255,0.78)", fontSize: 15, lineHeight: 1.55 }}>
                    {s.corps}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 23 Plan recruteur ---------- */
  {
    nav: "Plan recruteur",
    chapitre: "action",
    render: () => (
      <Slide>
        <Kicker>Si vous recrutez</Kicker>
        <Titre>Cinq décisions à prendre cette semaine</Titre>
        <div className="mt-7">
          {PLAN_RECRUTEUR.map((a, i) => (
            <Action key={a.action} n={i + 1} action={a.action} detail={a.detail} accent="#3932FF" tint="rgba(57,50,255,0.09)" />
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 24 Career Score et coaching ---------- */
  {
    nav: "Career Score",
    chapitre: "action",
    render: () => (
      <Slide>
        <Kicker>La suite, maintenant</Kicker>
        <Titre>Le Career Score et le coaching en direct</Titre>
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {TAKEAWAYS.map((t) => (
            <div
              key={t.titre}
              className="rounded-xl"
              style={{
                background: t.fort ? "linear-gradient(150deg, rgba(249,36,65,0.16), rgba(57,50,255,0.08))" : "rgba(255,255,255,0.035)",
                border: `1px solid ${t.fort ? "rgba(250,137,153,0.34)" : "rgba(255,255,255,0.10)"}`,
                padding: "22px 24px",
              }}
            >
              <div className="text-white font-semibold" style={{ fontSize: 18, letterSpacing: "-0.015em" }}>
                {t.titre}
              </div>
              <div className="mt-2" style={{ color: "rgba(255,255,255,0.78)", fontSize: 14.5, lineHeight: 1.55 }}>
                {t.corps}
              </div>
              {t.qr && (
                <div className="mt-4 flex justify-center">
                  <div className="rounded-lg" style={{ background: "#fff", padding: 7 }}>
                    <img src={t.qr} alt={`QR ${t.titre}`} style={{ width: 104, height: 104, display: "block" }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 25 Fin ---------- */
  {
    nav: "Merci",
    chapitre: null,
    render: () => (
      <Slide center>
        <div className="text-center">
          <Kicker>{LIVE.runLabel}</Kicker>
          <h2
            className="font-extrabold text-white mt-4"
            style={{ fontSize: "clamp(34px, 5.4vw, 74px)", lineHeight: 1, letterSpacing: "-0.035em" }}
          >
            À vos questions.
          </h2>
          <div className="mt-6 mx-auto" style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, maxWidth: "46ch", lineHeight: 1.5 }}>
            Tous les liens sont dans le chat.
          </div>
          <div className="mt-8 mx-auto text-left" style={{ maxWidth: "58ch" }}>
            <Encadre titre="Ce dont on a besoin de vous" ton="positif">
              Votre métier, votre nombre d'années d'expérience et votre ville. Trois informations, et on vous dit où
              vous vous situez sur les 6 373 annonces de septembre.
            </Encadre>
          </div>
        </div>
      </Slide>
    ),
  },
];
