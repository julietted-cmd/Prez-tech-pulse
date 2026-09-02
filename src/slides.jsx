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
  VOLUME,
  METIERS,
  SALAIRES,
  FOURCHETTES,
  IA,
  PORTES,
  RECRUTEURS,
  RECRUTEURS_PAR_FAM,
  SIGNAUX,
  TAKEAWAYS,
  PLAN_RECRUTEUR,
  PLAN_CANDIDAT,
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

const Bar = ({ label, value, max, color, right, sub }) => (
  <div className="mb-3">
    <div className="flex items-baseline justify-between mb-1.5 gap-4">
      <span style={{ color: "rgba(255,255,255,0.88)", fontSize: 15 }}>
        {label}
        {sub && (
          <span style={{ color: "rgba(255,255,255,0.34)", marginLeft: 8, fontSize: 12 }}>{sub}</span>
        )}
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

/* Ligne de plan d'action */
const Action = ({ n, action, detail, accent, tint }) => (
  <div
    className="rounded-xl mb-3"
    style={{
      background: tint,
      border: `1px solid ${accent}55`,
      borderLeft: `3px solid ${accent}`,
      padding: "14px 18px",
    }}
  >
    <div className="flex gap-3.5">
      <span className="tnum font-bold" style={{ color: accent, fontSize: 15, lineHeight: 1.4, minWidth: 14 }}>
        {n}
      </span>
      <div>
        <div className="text-white font-semibold" style={{ fontSize: 16, letterSpacing: "-0.01em" }}>
          {action}
        </div>
        <div className="mt-1" style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, lineHeight: 1.5 }}>
          {detail}
        </div>
      </div>
    </div>
  </div>
);

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
          Le marché tech français en 5 271 offres
        </h1>
        <div
          className="mt-6"
          style={{ color: "rgba(255,255,255,0.62)", fontSize: "clamp(16px, 1.5vw, 21px)", maxWidth: "54ch", lineHeight: 1.45 }}
        >
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
          <div style={{ marginLeft: "auto" }}>
            <div className="text-white font-semibold" style={{ fontSize: 18 }}>
              {LIVE.date}
            </div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 14.5 }}>{LIVE.heure}</div>
          </div>
        </div>
      </Slide>
    ),
  },

  /* ---------- 02 Le volume ---------- */
  {
    nav: "Le marché ralentit",
    chapitre: "marche",
    render: ({ active }) => (
      <Slide>
        <Kicker>L'état du marché</Kicker>
        <Deux ratio="1.05fr 1fr">
          <div>
            <BigNum value={5271} unite="offres CDI ouvertes en septembre" active={active} />
            <div className="mt-8" style={{ maxWidth: 380 }}>
              <Sparkline serie={VOLUME.serie} labels={MONTHS} color="#fff" />
            </div>
          </div>
          <div>
            <Titre size={2}>Le marché ne se ferme pas, il ralentit</Titre>
            <Corps className="mt-5">
              5 591 offres au pic de juillet, 5 271 en septembre. Les quatre familles reculent au
              même rythme, entre 4 et 9 %. Ce n'est pas un secteur qui décroche, c'est la demande
              globale qui se tasse.
            </Corps>
          </div>
        </Deux>
        <Lecture
          className="mt-9"
          recruteur="Moins d'annonces concurrentes qu'en juillet, mais aussi moins de candidats en mouvement. Le volume d'offres ne mesure pas ta difficulté à recruter, il mesure ta visibilité."
          candidat="5 271 postes ouverts, ça reste beaucoup. Attends-toi en revanche à des process plus longs et à davantage de candidats par poste qu'au printemps."
        />
      </Slide>
    ),
  },

  /* ---------- 03 Concentration ---------- */
  {
    nav: "Quatre métiers, la moitié du marché",
    chapitre: "marche",
    render: () => {
      const max = Math.max(...METIERS.map((m) => m.n));
      return (
        <Slide>
          <Kicker>L'état du marché</Kicker>
          <Titre size={2}>Quatre métiers font la moitié du marché</Titre>
          <Deux ratio="1.2fr 1fr" gap={52} align="start">
            <div className="mt-6">
              {METIERS.slice(0, 8).map((m) => (
                <Bar key={m.nom} label={m.nom} value={m.n} max={max} color={FAM[m.fam]} right={fmtNum(m.n)} />
              ))}
            </div>
            <div className="mt-6">
              <Corps>
                Backend, Tech Lead, DevOps et Fullstack cumulent 49,8 % des offres du pays. Sur ces
                quatre intitulés, tout le monde se dispute les mêmes profils avec les mêmes mots.
              </Corps>
              <Encadre ton="info" className="mt-6">
                À l'autre bout, le Design pèse 95 offres, soit 1,8 % du marché. Deux réalités qui
                n'ont rien à voir.
              </Encadre>
            </div>
          </Deux>
          <Lecture
            className="mt-8"
            recruteur="Sur ces quatre métiers, ton annonce est indifférenciable. Ce qui te fera gagner, c'est ton délai de réponse et ton package, pas ta rédaction."
            candidat="Si ton intitulé est dans le top 4, tu es interchangeable sur le papier. Mets en avant le domaine et la profondeur technique, pas le titre."
          />
        </Slide>
      );
    },
  },

  /* ---------- 04 Le salaire décroche ---------- */
  {
    nav: "Le salaire décroche du volume",
    chapitre: "salaires",
    render: () => {
      const data = MONTHS.map((m, i) => {
        const row = { mois: m };
        SALAIRES.forEach((s) => (row[s.nom] = s.serie[i]));
        return row;
      });
      return (
        <Slide>
          <Kicker>Les salaires</Kicker>
          <Titre size={2}>Le salaire a décroché du volume</Titre>
          <Deux ratio="1.5fr 1fr" gap={44} align="start">
            <div className="mt-5">
              <div style={{ height: 262 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 8, right: 24, bottom: 4, left: -18 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                    <XAxis dataKey="mois" tick={axis} axisLine={false} tickLine={false} />
                    <YAxis domain={[42, 66]} tick={axis} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}K`} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      itemStyle={{ color: "#fff" }}
                      labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                      formatter={(v) => [`${v} K€`, ""]}
                    />
                    {SALAIRES.map((s) => (
                      <Line
                        key={s.nom}
                        type="monotone"
                        dataKey={s.nom}
                        stroke={s.couleur}
                        strokeWidth={2.4}
                        dot={{ r: 3, strokeWidth: 0, fill: s.couleur }}
                        activeDot={{ r: 5 }}
                        isAnimationActive={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 pl-3">
                {SALAIRES.map((s) => (
                  <span key={s.nom} className="flex items-center gap-2" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                    <span style={{ width: 10, height: 3, borderRadius: 2, background: s.couleur }} />
                    {s.nom} <span className="tnum" style={{ color: "#fff", fontWeight: 600 }}>{s.serie[3]} K€</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <Corps>
                Le Fullstack est passé au-dessus du Backend cet été. Ils étaient à 1 K€ d'écart en
                juin, ils en sont à 7.
              </Corps>
              <Corps className="mt-4">
                Le Backend est le premier métier de France en volume. C'est aussi le seul dont la
                médiane baisse chaque mois depuis juin.
              </Corps>
            </div>
          </Deux>
          <Lecture
            className="mt-7"
            recruteur="Une grille datée de juin est fausse dans les deux sens : trop haute sur le backend, sous le marché de 4 K€ sur le fullstack."
            candidat="Le poste le plus demandé du pays est le moins bien valorisé. Élargir ton scope vers le fullstack vaut 7 K€ de médiane."
          />
        </Slide>
      );
    },
  },

  /* ---------- 05 Tech Lead ---------- */
  {
    nav: "Le titre ne dit plus le niveau",
    chapitre: "salaires",
    render: ({ active }) => (
      <Slide>
        <Kicker>Les salaires</Kicker>
        <Deux ratio="0.85fr 1.15fr">
          <div>
            <BigNum value={7} suffix=" %" active={active} unite="de volume en plus sur le Tech Lead" />
            <div className="mt-9">
              <BigNum value={-4} suffix=" K€" active={active} unite="de médiane en moins" color="var(--signal)" />
            </div>
          </div>
          <div>
            <Titre size={2}>Plus recruté, moins payé</Titre>
            <Corps className="mt-5">
              638 offres de Tech Lead en juin, 682 en septembre. Et une médiane qui passe de 56 à
              52 K€. C'est le seul métier du marché où la demande monte et le salaire descend.
            </Corps>
            <Encadre ton="info" titre="Ce que ça révèle" className="mt-5">
              Le titre de Tech Lead couvre désormais des périmètres très différents, du lead
              technique de trois personnes au manager d'équipe. Il ne dit plus rien du niveau.
            </Encadre>
          </div>
        </Deux>
        <Lecture
          className="mt-8"
          recruteur="Cadre le périmètre avant de cadrer le salaire. Un Tech Lead se négocie entre 52 et 70 K€ selon la taille d'équipe et le pouvoir de décision technique."
          candidat="Un passage Tech Lead n'est plus automatiquement une augmentation. Négocie sur ce que tu pilotes, pas sur la ligne de ton CV."
        />
      </Slide>
    ),
  },

  /* ---------- 06 Les fourchettes ---------- */
  {
    nav: "Qui gagne, qui perd",
    chapitre: "salaires",
    render: () => (
      <Slide>
        <Kicker>Les salaires</Kicker>
        <Titre size={2}>La fourchette monte. Pas pour tout le monde.</Titre>
        <div className="mt-7 table-scroll">
          <div className="cascade-fin">
            <div
              className="grid gap-4 pb-3"
              style={{
                gridTemplateColumns: "140px 1fr 1fr 1.4fr",
                borderBottom: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.42)",
                fontSize: 13,
              }}
            >
              <span>Famille</span>
              <span>Juin</span>
              <span>Septembre</span>
              <span>Ce que ça veut dire</span>
            </div>
            {FOURCHETTES.map((f) => (
              <div
                key={f.nom}
                className="grid gap-4 py-3.5 items-baseline"
                style={{ gridTemplateColumns: "140px 1fr 1fr 1.4fr", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-white font-semibold" style={{ fontSize: 16 }}>
                  {f.nom}
                </span>
                <span className="tnum" style={{ color: "rgba(255,255,255,0.45)", fontSize: 16 }}>
                  {f.juin} K€
                </span>
                <span className="tnum font-semibold" style={{ fontSize: 16, color: f.sens === "up" ? "#89FAC6" : "#FA8999" }}>
                  {f.sept} K€
                </span>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14.5 }}>{f.note}</span>
              </div>
            ))}
          </div>
        </div>
        <Lecture
          className="mt-7"
          recruteur="Si tu recrutes en Data, ton plafond doit monter à 65 K€, sinon tu sors des shortlists sans le savoir. Si tu recrutes en Tech, la pression a baissé."
          candidat="Data et Product sont les deux familles où la demande te porte. En Tech, il faut argumenter : le plafond du marché a reculé."
        />
      </Slide>
    ),
  },

  /* ---------- 07 L'IA en chiffres ---------- */
  {
    nav: "L'IA dans les offres",
    chapitre: "ia",
    render: ({ active }) => {
      const data = MONTHS.map((m, i) => ({
        mois: m,
        "Offres citant l'IA": IA.mentions[i],
        "Offres AI Engineer": IA.aiEngineer[i],
      }));
      return (
        <Slide>
          <Kicker>L'IA</Kicker>
          <Deux ratio="1fr 1.3fr" gap={44} align="start">
            <div>
              <BigNum value={9.3} decimals={1} suffix=" %" active={active} unite="des offres citent l'IA dans l'intitulé" />
              <Corps className="mt-7">
                En volume, 429 offres en juin, 488 en septembre. L'IA progresse de 13,8 % pendant que
                le marché total recule.
              </Corps>
              <Corps className="mt-4">
                Mais le métier dédié stagne. 145 offres d'AI Engineer en juin, 136 en septembre. Et
                sa médiane s'érode, de 62 à 58 K€.
              </Corps>
            </div>
            <div className="mt-2">
              <div style={{ height: 288 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 8, right: 20, bottom: 4, left: -14 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                    <XAxis dataKey="mois" tick={axis} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 560]} tick={axis} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      itemStyle={{ color: "#fff" }}
                      labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                      formatter={(v) => [`${v} offres`, ""]}
                    />
                    <Line
                      type="monotone"
                      dataKey="Offres citant l'IA"
                      stroke="#726CFD"
                      strokeWidth={2.6}
                      dot={{ r: 3, strokeWidth: 0, fill: "#726CFD" }}
                      isAnimationActive={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="Offres AI Engineer"
                      stroke="rgba(255,255,255,0.45)"
                      strokeWidth={2.2}
                      strokeDasharray="5 4"
                      dot={{ r: 3, strokeWidth: 0, fill: "rgba(255,255,255,0.55)" }}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 mt-3 pl-3" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                <span className="flex items-center gap-2">
                  <span style={{ width: 12, height: 3, borderRadius: 2, background: "#726CFD" }} />
                  Offres citant l'IA
                </span>
                <span className="flex items-center gap-2">
                  <span style={{ width: 12, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.45)" }} />
                  Offres AI Engineer
                </span>
              </div>
            </div>
          </Deux>
        </Slide>
      );
    },
  },

  /* ---------- 08 L'IA est un attribut ---------- */
  {
    nav: "L'IA est un attribut",
    chapitre: "ia",
    render: () => (
      <Slide>
        <Kicker>L'IA</Kicker>
        <h2
          className="font-bold text-white"
          style={{ fontSize: "clamp(28px, 4.2vw, 56px)", lineHeight: 1.03, letterSpacing: "-0.03em", maxWidth: "25ch" }}
        >
          L'IA est devenue un attribut des postes existants, pas une famille de métiers
        </h2>
        <div className="mt-8 grid sm:grid-cols-3 gap-4 cascade-fin">
          <Carte chiffre="+24 %" legende="d'offres hors AI Engineer mentionnant l'IA depuis juin" ton="positif" couleur="#89FAC6" />
          <Carte chiffre="58 K€" legende="de médiane AI Engineer, contre 62 K€ en juin" ton="alerte" couleur="#FA8999" />
          <Carte chiffre="2,2 %" legende="des offres Product citent LLM, loin derrière Agile à 28,8 %" ton="info" couleur="#fff" />
        </div>
        <Lecture
          className="mt-8"
          recruteur="Créer un poste AI Engineer pour attirer ne marche pas : le vivier est étroit et la prime a disparu. Ajoute la compétence à un poste existant, c'est ce que fait le marché."
          candidat="L'étiquette AI Engineer ne rapporte rien de plus qu'un SRE. Valorise l'IA comme une compétence dans un poste classique, pas comme un changement de métier."
        />
      </Slide>
    ),
  },

  /* ---------- 09 Data et Design ---------- */
  {
    nav: "Data résiste, Design décroche",
    chapitre: "postes",
    render: () => (
      <Slide>
        <Kicker>Où sont les postes</Kicker>
        <Titre size={2}>Une famille résiste, une autre décroche</Titre>
        <Deux gap={44} align="start">
          <div
            className="mt-7 rounded-xl"
            style={{
              background: "linear-gradient(150deg, rgba(10,194,108,0.16), rgba(10,194,108,0.04))",
              border: "1px solid rgba(137,250,198,0.30)",
              borderLeft: "3px solid var(--data)",
              padding: "20px 22px",
            }}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-extrabold text-white tnum" style={{ fontSize: 42, letterSpacing: "-0.03em" }}>
                +2,2 %
              </span>
              <span style={{ color: "#89FAC6", fontSize: 16, fontWeight: 600 }}>Data</span>
            </div>
            <div className="mt-3" style={{ color: "rgba(255,255,255,0.84)", fontSize: 15, lineHeight: 1.5 }}>
              Seule famille en croissance depuis juin, à 955 offres. Elle se séniorise : la tranche
              5-8 ans passe de 29,8 à 32,9 %. Et son plafond salarial atteint 65 K€, le plus haut du
              marché.
            </div>
          </div>
          <div
            className="mt-7 rounded-xl"
            style={{
              background: "linear-gradient(150deg, rgba(234,179,8,0.16), rgba(234,179,8,0.04))",
              border: "1px solid rgba(234,179,8,0.32)",
              borderLeft: "3px solid var(--design)",
              padding: "20px 22px",
            }}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-extrabold text-white tnum" style={{ fontSize: 42, letterSpacing: "-0.03em" }}>
                -21,5 %
              </span>
              <span style={{ color: "#EAB308", fontSize: 16, fontWeight: 600 }}>Design</span>
            </div>
            <div className="mt-3" style={{ color: "rgba(255,255,255,0.84)", fontSize: 15, lineHeight: 1.5 }}>
              121 offres en juin, 95 en septembre. Product Designer perd 24 %, UX/UI 23 %. Et la
              concentration parisienne monte à 74,7 %, contre 70,2 % en juin.
            </div>
          </div>
        </Deux>
        <Lecture
          className="mt-7"
          recruteur="En Design, peu de concurrence mais un vivier verrouillé sur Paris. Recruter un designer hors Île-de-France est aujourd'hui un vrai différenciateur. En Data, tu es en concurrence directe et il faut suivre sur le salaire."
          candidat="En Data, la demande te porte, y compris en région. En Design, élargir la géographie ne sert à rien : c'est vers le product design en scale-up qu'il faut regarder."
        />
      </Slide>
    ),
  },

  /* ---------- 10 Junior et remote ---------- */
  {
    nav: "Junior et remote",
    chapitre: "postes",
    render: ({ active }) => (
      <Slide>
        <Kicker>Où sont les postes</Kicker>
        <Titre size={2}>Deux portes que presque personne n'ouvre</Titre>
        <Deux gap={52} align="start">
          <div className="mt-8">
            <BigNum value={4.2} decimals={1} suffix=" %" active={active} unite="des offres ouvertes aux 0-2 ans" />
            <div className="mt-6" style={{ maxWidth: 290 }}>
              <Sparkline serie={PORTES.junior} labels={MONTHS} color="rgba(255,255,255,0.6)" height={36} baseZero />
            </div>
            <Corps className="mt-4">
              4,6 puis 4,3, 4,4 et 4,2 %. C'est cette stabilité qui compte : ce n'est pas une
              conjoncture. En Product, 1,6 %. En Data, 5,4 %.
            </Corps>
          </div>
          <div className="mt-8">
            <BigNum value={0.3} decimals={1} suffix=" %" active={active} unite="des offres en full remote" color="var(--signal)" />
            <div className="mt-6" style={{ maxWidth: 290 }}>
              <Sparkline serie={PORTES.remote} labels={MONTHS} color="var(--signal)" height={36} baseZero />
            </div>
            <Corps className="mt-4">
              Divisé par deux depuis juin. L'hybride, lui, progresse de 14,3 à 15,2 %. Le full remote
              a quitté les annonces.
            </Corps>
          </div>
        </Deux>
        <Lecture
          className="mt-7"
          recruteur="Ouvrir un poste aux 0-2 ans te place devant 95,8 % du marché. Le full remote est le levier d'attractivité le moins utilisé du pays, à toi de voir si tu peux le tenir."
          candidat="Si tu débutes, Data est ta meilleure porte d'entrée et Product la pire. Et exiger du full remote revient à te fermer 99,7 % des offres : l'hybride est la vraie zone de négociation."
        />
      </Slide>
    ),
  },

  /* ---------- 11 Qui recrute ---------- */
  {
    nav: "Qui recrute vraiment",
    chapitre: "postes",
    render: () => {
      const max = Math.max(...RECRUTEURS.map((r) => r.pct));
      return (
        <Slide>
          <Kicker>Où sont les postes</Kicker>
          <Titre size={2}>Une offre sur deux vient d'une ESN</Titre>
          <Deux ratio="1.15fr 1fr" gap={48} align="start">
            <div className="mt-6">
              {RECRUTEURS.map((r) => (
                <Bar
                  key={r.nom}
                  label={r.nom}
                  value={r.pct}
                  max={max}
                  color={r.nom === "ESN / Conseil" ? "#3932FF" : "rgba(255,255,255,0.3)"}
                  right={`${fmtDec(r.pct)} %`}
                />
              ))}
            </div>
            <div className="mt-6">
              <Corps>
                Startups et scale-ups réunies pèsent 14,6 % des offres. Le poids des ESN est surtout
                un phénomène Tech : il tombe à 38,4 % en Product et 34,7 % en Design.
              </Corps>
              <div className="mt-5">
                {RECRUTEURS_PAR_FAM.map((f) => (
                  <div
                    key={f.nom}
                    className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="flex items-center gap-2.5" style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>
                      <span style={{ width: 4, height: 15, borderRadius: 2, background: FAM[f.nom] }} />
                      {f.nom}
                    </span>
                    <span className="tnum font-semibold text-white" style={{ fontSize: 15 }}>
                      {fmtDec(f.pct)} %
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Deux>
          <Lecture
            className="mt-7"
            recruteur="Ton annonce n'est pas comparée à celle d'un concurrent produit, elle est comparée à une mission de conseil. Nomme le produit, l'équipe et la stack : c'est ce qu'une ESN ne peut pas faire."
            candidat="La moitié du marché visible n'est pas du produit. Si c'est ce que tu cherches, ton marché réel est deux fois plus petit qu'il n'y paraît. Filtre dès la lecture de l'annonce."
          />
        </Slide>
      );
    },
  },

  /* ---------- 12 Les 3 signaux ---------- */
  {
    nav: "Les 3 signaux fin d'année",
    chapitre: "action",
    render: () => (
      <Slide>
        <Kicker>Ce que tu fais</Kicker>
        <Titre size={2}>Les trois signaux à surveiller d'ici décembre</Titre>
        <div className="mt-8 space-y-0 cascade-fin">
          {SIGNAUX.map((s, i) => (
            <div
              key={s.titre}
              className="grid gap-7 py-5"
              style={{
                gridTemplateColumns: "34px 1fr",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="tnum font-bold" style={{ color: s.couleur, fontSize: 22, lineHeight: 1.1 }}>
                {i + 1}
              </span>
              <div>
                <div className="text-white font-semibold" style={{ fontSize: "clamp(18px, 1.9vw, 25px)", letterSpacing: "-0.015em" }}>
                  {s.titre}
                </div>
                <div className="mt-2" style={{ color: "rgba(255,255,255,0.68)", fontSize: 15.5, lineHeight: 1.5, maxWidth: "74ch" }}>
                  {s.corps}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 13 Plan recruteur ---------- */
  {
    nav: "Plan d'action recruteur",
    chapitre: "action",
    render: () => (
      <Slide>
        <Kicker>Ce que tu fais</Kicker>
        <Titre size={2}>Cinq décisions si tu recrutes</Titre>
        <div className="mt-7 cascade-fin">
          {PLAN_RECRUTEUR.map((a, i) => (
            <Action
              key={a.action}
              n={i + 1}
              action={a.action}
              detail={a.detail}
              accent="#3932FF"
              tint="linear-gradient(150deg, rgba(57,50,255,0.20), rgba(57,50,255,0.06))"
            />
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 14 Plan candidat ---------- */
  {
    nav: "Plan d'action candidat",
    chapitre: "action",
    render: () => (
      <Slide>
        <Kicker>Ce que tu fais</Kicker>
        <Titre size={2}>Cinq décisions si tu cherches un poste</Titre>
        <div className="mt-7 cascade-fin">
          {PLAN_CANDIDAT.map((a, i) => (
            <Action
              key={a.action}
              n={i + 1}
              action={a.action}
              detail={a.detail}
              accent="#C2C0FF"
              tint="linear-gradient(150deg, rgba(237,236,255,0.12), rgba(237,236,255,0.03))"
            />
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 15 Takeaways ---------- */
  {
    nav: "Tu repars avec",
    chapitre: "action",
    render: () => (
      <Slide>
        <Kicker>Ce que tu fais</Kicker>
        <Titre size={2}>Tu repars avec</Titre>
        <div className="mt-8 grid sm:grid-cols-2 gap-4 cascade-fin">
          {TAKEAWAYS.map((t) => (
            <div
              key={t.titre}
              className="rounded-xl px-6 py-5"
              style={
                t.fort
                  ? {
                      background: "linear-gradient(150deg, rgba(57,50,255,0.24), rgba(57,50,255,0.08))",
                      border: "1px solid rgba(114,108,253,0.45)",
                      borderLeft: "3px solid #3932FF",
                    }
                  : {
                      background: "rgba(255,255,255,0.045)",
                      border: "1px solid rgba(255,255,255,0.11)",
                      borderLeft: "3px solid rgba(255,255,255,0.22)",
                    }
              }
            >
              <div className="font-semibold" style={{ fontSize: 17.5, letterSpacing: "-0.01em", color: t.fort ? "#C2C0FF" : "#fff" }}>
                {t.titre}
              </div>
              <div className="mt-2" style={{ color: "rgba(255,255,255,0.82)", fontSize: 14.5, lineHeight: 1.5 }}>
                {t.corps}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-7" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14.5 }}>
          CTOs, VP Engineering, Heads of Product, fondateurs, Talent Acquisition. Et tous ceux qui en
          ont marre de négocier à l'aveugle.
        </div>
      </Slide>
    ),
  },

  /* ---------- 16 Clôture ---------- */
  {
    nav: "Rendez-vous en octobre",
    chapitre: null,
    render: () => (
      <Slide center>
        <div className="serif" style={{ fontSize: "clamp(28px, 4.4vw, 56px)", lineHeight: 1.15, color: "#fff", maxWidth: "24ch", margin: "0 auto" }}>
          Les chiffres d'octobre tombent dans un mois.
        </div>
        <div className="mt-7" style={{ color: "rgba(255,255,255,0.58)", fontSize: 17, maxWidth: "46ch", margin: "0 auto", lineHeight: 1.55 }}>
          Ils diront si le ralentissement de l'été était saisonnier ou structurel. On remet ça.
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {LIVE.speakers.map((s) => (
            <div key={s.nom}>
              <div className="text-white font-semibold" style={{ fontSize: 16.5 }}>
                {s.nom}
              </div>
              <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 13.5 }}>
                {s.role} @ {s.boite}
              </div>
            </div>
          ))}
        </div>
      </Slide>
    ),
  },
];
