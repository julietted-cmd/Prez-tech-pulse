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
  Glass,
  Sparkline,
  Delta,
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
  CTO,
  RUPTURES,
  SIGNAUX,
  TAKEAWAYS,
  PIPELINE,
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

/* Barre horizontale simple, réutilisée sur plusieurs slides */
const Bar = ({ label, value, max, color, right, sub }) => (
  <div className="mb-3.5">
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
      <div
        style={{
          width: `${(value / max) * 100}%`,
          height: "100%",
          borderRadius: 3,
          background: color,
        }}
      />
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
          <span
            style={{ width: 9, height: 9, borderRadius: 999, background: "var(--signal)", boxShadow: "0 0 14px var(--signal)" }}
          />
          <span className="font-semibold" style={{ color: "var(--signal)", fontSize: 15 }}>
            {LIVE.surtitre}
          </span>
        </div>
        <h1
          className="font-extrabold text-white"
          style={{
            fontSize: "clamp(40px, 6.6vw, 92px)",
            lineHeight: 0.94,
            letterSpacing: "-0.035em",
            maxWidth: "20ch",
          }}
        >
          Le marché tech français en 5 271 offres
        </h1>
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

  /* ---------- 02 Le Pulse ---------- */
  {
    nav: "Ce qu'est le Pulse",
    chapitre: "outil",
    render: () => (
      <Slide>
        <Kicker>L'outil</Kicker>
        <Titre>On a arrêté de piloter nos recrutements à l'instinct</Titre>
        <Corps className="mt-6">
          Chaque mois, le Pulse récupère toutes les offres CDI tech, product, data et design publiées
          en France. Il les dédoublonne, les rattache à 28 métiers, et compare au mois précédent.
          Quatre runs disponibles à ce jour, de juin à septembre 2026.
        </Corps>
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { n: "5 271", l: "offres au dernier run" },
            { n: "28", l: "métiers suivis" },
            { n: "4", l: "mois d'historique comparable" },
          ].map((k) => (
            <Glass key={k.l} className="px-5 py-5">
              <div className="font-extrabold text-white tnum" style={{ fontSize: 34, letterSpacing: "-0.02em" }}>
                {k.n}
              </div>
              <div className="mt-1" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
                {k.l}
              </div>
            </Glass>
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 03 Le pipeline ---------- */
  {
    nav: "Comment il est fabriqué",
    chapitre: "outil",
    render: () => (
      <Slide>
        <Kicker>L'outil</Kicker>
        <Titre size={2}>Comment il est fabriqué</Titre>
        <div className="mt-8 space-y-0 table-scroll">
          <div>
          {PIPELINE.map((p, i) => (
            <div
              key={p.etape}
              className="grid gap-6 py-4"
              style={{
                gridTemplateColumns: "28px 190px 1fr",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="tnum" style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, paddingTop: 3 }}>
                {i + 1}
              </span>
              <span className="text-white font-semibold" style={{ fontSize: 16.5 }}>
                {p.etape}
              </span>
              <span style={{ color: "rgba(255,255,255,0.62)", fontSize: 15, lineHeight: 1.5 }}>
                {p.detail}
              </span>
            </div>
          ))}
          </div>
        </div>
      </Slide>
    ),
  },

  /* ---------- 04 Volume ---------- */
  {
    nav: "5 271 offres",
    chapitre: "marche",
    render: ({ active }) => (
      <Slide>
        <Kicker>Le marché</Kicker>
        <Deux ratio="1.05fr 1fr">
          <div>
            <BigNum value={5271} unite="offres CDI uniques en septembre" active={active} />
            <div className="mt-8" style={{ maxWidth: 380 }}>
              <Sparkline serie={VOLUME.serie} labels={MONTHS} color="#fff" />
            </div>
          </div>
          <div>
            <Titre size={2}>Deuxième mois de baisse consécutif</Titre>
            <Corps className="mt-5">
              5 591 offres au pic de juillet, 5 271 en septembre. Soit 5,7 % de moins en deux mois.
            </Corps>
            <Glass className="mt-6 px-5 py-4">
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5, lineHeight: 1.5 }}>
                Le run du 1<sup>er</sup> septembre photographie le stock d'offres actives à cette
                date. Il capture donc l'été, pas la reprise. La vraie mesure de la rentrée sera le
                run d'octobre.
              </div>
            </Glass>
          </div>
        </Deux>
      </Slide>
    ),
  },

  /* ---------- 05 Contraction homogène ---------- */
  {
    nav: "La contraction est homogène",
    chapitre: "marche",
    render: () => (
      <Slide>
        <Kicker>Le marché</Kicker>
        <Titre size={2}>Les quatre familles baissent au même rythme</Titre>
        <Corps className="mt-5">
          Quand une seule famille décroche, c'est un cycle sectoriel. Quand les quatre reculent
          ensemble, c'est un signal de demande globale.
        </Corps>
        <div className="mt-9 grid lg:grid-cols-2 gap-x-14 gap-y-2">
          {VOLUME.familles.map((f) => {
            const sept = f.serie[3];
            const aout = f.serie[2];
            const varPct = Math.round(((sept / aout - 1) * 100) * 10) / 10;
            return (
              <div
                key={f.nom}
                className="py-4 flex items-center justify-between gap-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.09)" }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ width: 4, height: 30, borderRadius: 2, background: FAM[f.nom] }} />
                  <div>
                    <div className="text-white font-semibold" style={{ fontSize: 17 }}>
                      {f.nom}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                      {fmtNum(sept)} offres
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div style={{ width: 92 }}>
                    <Sparkline serie={f.serie} color={FAM[f.nom]} height={30} />
                  </div>
                  <span className="tnum font-semibold" style={{ fontSize: 17, color: "var(--signal)", minWidth: 62, textAlign: "right" }}>
                    {fmtDec(varPct)} %
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-7" style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>
          Variation août → septembre. Tech pèse 60 % de la baisse en volume absolu, simplement parce
          qu'il représente 66 % du marché. Sa part est stable depuis juin.
        </div>
      </Slide>
    ),
  },

  /* ---------- 06 Top métiers ---------- */
  {
    nav: "Les métiers les plus recrutés",
    chapitre: "marche",
    render: () => {
      const max = Math.max(...METIERS.map((m) => m.n));
      return (
        <Slide>
          <Kicker>Le marché</Kicker>
          <Titre size={2}>Quatre métiers font la moitié du marché</Titre>
          <Deux ratio="1.25fr 1fr" gap={56} align="start">
            <div className="mt-7">
              {METIERS.map((m) => (
                <Bar
                  key={m.nom}
                  label={m.nom}
                  value={m.n}
                  max={max}
                  color={FAM[m.fam]}
                  right={fmtNum(m.n)}
                  sub={`${m.n > m.base ? "+" : ""}${m.n - m.base} vs juin`}
                />
              ))}
            </div>
            <div className="mt-7">
              <Corps>
                Développeur Backend, Tech Lead, DevOps et Fullstack cumulent 49,8 % des offres. Cette
                concentration est stable depuis juin, et progresse même légèrement.
              </Corps>
              <Glass className="mt-6 px-5 py-4">
                <div className="text-white font-semibold" style={{ fontSize: 15.5 }}>
                  Le Tech Lead monte
                </div>
                <div className="mt-1.5" style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.5 }}>
                  638 offres en juin, 682 en septembre. C'est le deuxième métier le plus recruté de
                  France, devant le Fullstack. Retenez ce chiffre, on y revient dans deux slides.
                </div>
              </Glass>
            </div>
          </Deux>
        </Slide>
      );
    },
  },

  /* ---------- 07 Le découplage ---------- */
  {
    nav: "Le prix décroche du volume",
    chapitre: "prix",
    render: () => {
      const data = MONTHS.map((m, i) => {
        const row = { mois: m };
        SALAIRES.forEach((s) => (row[s.nom] = s.serie[i]));
        return row;
      });
      return (
        <Slide>
          <Kicker>Les prix</Kicker>
          <Titre size={2}>Le prix a décroché du volume</Titre>
          <Deux ratio="1.5fr 1fr" gap={48} align="start">
            <div className="mt-6">
              <div style={{ height: 290 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 8, right: 24, bottom: 4, left: -18 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                    <XAxis dataKey="mois" tick={axis} axisLine={false} tickLine={false} />
                    <YAxis
                      domain={[42, 66]}
                      tick={axis}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `${v}K`}
                    />
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
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pl-3">
                {SALAIRES.map((s) => (
                  <span key={s.nom} className="flex items-center gap-2" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                    <span style={{ width: 10, height: 3, borderRadius: 2, background: s.couleur }} />
                    {s.nom} <span className="tnum" style={{ color: "#fff", fontWeight: 600 }}>{s.serie[3]} K€</span>
                  </span>
                ))}
              </div>
              <div className="mt-4 pl-3" style={{ color: "rgba(255,255,255,0.32)", fontSize: 12.5, maxWidth: "62ch" }}>
                Médiane du milieu de fourchette, offres avec salaire renseigné, seuil de 15 offres par métier.
              </div>
            </div>
            <div>
              <Corps>
                Les deux courbes qui se croisent sont l'histoire de l'été. Le Fullstack est passé
                au-dessus du Backend en septembre, alors qu'ils étaient à 1 K€ d'écart en juin.
              </Corps>
              <Corps className="mt-4">
                Le Backend est le premier métier de France en volume. C'est aussi celui dont la
                médiane se dégrade le plus régulièrement : 48, 46, 46 puis 45 K€.
              </Corps>
            </div>
          </Deux>
        </Slide>
      );
    },
  },

  /* ---------- 08 Tech Lead ---------- */
  {
    nav: "Tech Lead : +7 % / -4 K€",
    chapitre: "prix",
    render: ({ active }) => (
      <Slide>
        <Kicker>Les prix</Kicker>
        <Deux ratio="1fr 1.1fr">
          <div>
            <div className="flex items-end gap-10">
              <BigNum value={7} suffix=" %" active={active} unite="de volume en plus" color="var(--data)" />
            </div>
            <div className="mt-10">
              <BigNum value={-4} suffix=" K€" active={active} unite="de médiane en moins" color="var(--signal)" />
            </div>
          </div>
          <div>
            <Titre size={2}>Plus recruté, moins payé</Titre>
            <Corps className="mt-5">
              Le Tech Lead casse le lien habituel entre demande et prix. Son volume progresse de 638
              à 682 offres sur quatre mois, sa médiane perd 4 K€, de 56 à 52 K€.
            </Corps>
            <Corps className="mt-4">
              Deux lectures possibles, et c'est le vrai sujet de débat de ce live. Soit une inflation
              du titre côté ESN, qui pèsent 53,6 % des offres Tech. Soit une tension baissière réelle
              sur le middle management technique.
            </Corps>
            <div className="mt-6 pl-4" style={{ borderLeft: "2px solid var(--indigo)" }}>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 15.5, lineHeight: 1.5 }}>
                Le volume ESN plaide pour la première. À creuser au run d'octobre.
              </div>
            </div>
          </div>
        </Deux>
      </Slide>
    ),
  },

  /* ---------- 09 La fourchette globale ---------- */
  {
    nav: "Le piège de la fourchette",
    chapitre: "prix",
    render: () => (
      <Slide>
        <Kicker>Les prix</Kicker>
        <Titre size={2}>La fourchette globale monte. Ce n'est pas une bonne nouvelle pour tout le monde.</Titre>
        <div className="mt-9 table-scroll">
          <div>
          <div
            className="grid gap-4 pb-3"
            style={{
              gridTemplateColumns: "150px 1fr 1fr 1.3fr",
              borderBottom: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.42)",
              fontSize: 13,
            }}
          >
            <span>Famille</span>
            <span>Juin</span>
            <span>Septembre</span>
            <span>Lecture</span>
          </div>
          {FOURCHETTES.map((f) => (
            <div
              key={f.nom}
              className="grid gap-4 py-4 items-baseline"
              style={{
                gridTemplateColumns: "150px 1fr 1fr 1.3fr",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-white font-semibold" style={{ fontSize: 16 }}>
                {f.nom}
              </span>
              <span className="tnum" style={{ color: "rgba(255,255,255,0.45)", fontSize: 16 }}>
                {f.juin} K€
              </span>
              <span
                className="tnum font-semibold"
                style={{ fontSize: 16, color: f.sens === "up" ? "var(--data)" : "var(--signal)" }}
              >
                {f.sept} K€
              </span>
              <span style={{ color: "rgba(255,255,255,0.58)", fontSize: 14.5 }}>{f.note}</span>
            </div>
          ))}
          </div>
        </div>
        <Corps className="mt-7">
          Le plancher global passe de 48 à 50 K€ parce que Product et Data tirent la moyenne, pas
          parce que Tech se revalorise. Sur la même période, Tech passe de 47-59 à 47-58 K€.
        </Corps>
      </Slide>
    ),
  },

  /* ---------- 10 IA ---------- */
  {
    nav: "L'IA se diffuse",
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
          <Deux ratio="1fr 1.35fr" gap={48} align="start">
            <div>
              <BigNum value={13.8} decimals={1} suffix=" %" active={active} unite="de mentions d'IA en plus depuis juin" />
              <Corps className="mt-8">
                Pendant que le marché total recule de 1,5 %. C'est la seule métrique du Pulse qui
                progresse franchement à contre-courant.
              </Corps>
              <Corps className="mt-4">
                Mais le métier dédié stagne. 145 offres AI Engineer en juin, 136 en septembre. Et sa
                médiane s'érode, de 62 à 58 K€. Soit exactement le niveau d'un SRE.
              </Corps>
            </div>
            <div className="mt-3">
              <div style={{ height: 300 }}>
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
                    stroke="var(--indigo)"
                    strokeWidth={2.6}
                    dot={{ r: 3, strokeWidth: 0, fill: "#3932ff" }}
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
              <div className="flex gap-6 mt-4 pl-3" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                <span className="flex items-center gap-2">
                  <span style={{ width: 12, height: 3, borderRadius: 2, background: "var(--indigo)" }} />
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

  /* ---------- 11 IA : la conclusion ---------- */
  {
    nav: "L'IA est un attribut",
    chapitre: "ia",
    render: () => (
      <Slide>
        <Kicker color="var(--indigo)">L'IA</Kicker>
        <h2
          className="font-bold text-white"
          style={{ fontSize: "clamp(30px, 4.6vw, 62px)", lineHeight: 1.02, letterSpacing: "-0.03em", maxWidth: "24ch" }}
        >
          L'IA devient un attribut des postes existants, pas une famille de métiers
        </h2>
        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          {[
            { n: "+24 %", l: "d'offres non-AI Engineer mentionnant l'IA depuis juin", c: "var(--indigo)" },
            { n: "58 K€", l: "de médiane AI Engineer, contre 62 K€ en juin", c: "var(--signal)" },
            { n: "2,2 %", l: "des offres Product citent LLM, loin derrière Agile à 28,8 %", c: "#fff" },
          ].map((k) => (
            <Glass key={k.l} className="px-5 py-5">
              <div className="font-extrabold tnum" style={{ fontSize: 32, color: k.c, letterSpacing: "-0.02em" }}>
                {k.n}
              </div>
              <div className="mt-2" style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.45 }}>
                {k.l}
              </div>
            </Glass>
          ))}
        </div>
        <Corps className="mt-8">
          Les entreprises ajoutent de l'IA à des fiches de poste classiques plutôt que de créer des
          rôles dédiés. Si vous recrutez, la compétence se négocie dans le poste, pas dans un
          intitulé.
        </Corps>
      </Slide>
    ),
  },

  /* ---------- 12 Data / Design ---------- */
  {
    nav: "Data résiste, Design décroche",
    chapitre: "angles",
    render: () => (
      <Slide>
        <Kicker>Les angles morts</Kicker>
        <Titre size={2}>Une famille résiste, une autre décroche</Titre>
        <Deux gap={48} align="start">
          <div className="mt-8 pl-5" style={{ borderLeft: "2px solid var(--data)" }}>
            <div className="flex items-baseline gap-3">
              <span className="font-extrabold text-white tnum" style={{ fontSize: 44, letterSpacing: "-0.03em" }}>
                +2,2 %
              </span>
              <span style={{ color: "var(--data)", fontSize: 16, fontWeight: 600 }}>Data</span>
            </div>
            <Corps className="mt-4">
              Seule famille en croissance sur quatre mois, à 955 offres. Elle se séniorise en
              parallèle : la tranche 5-8 ans passe de 29,8 % à 32,9 %.
            </Corps>
            <Corps className="mt-3">
              Plafond salarial le plus élevé du marché à 65 K€. Databricks entre dans le top 10 des
              compétences, Python atteint 47,1 %.
            </Corps>
          </div>
          <div className="mt-8 pl-5" style={{ borderLeft: "2px solid var(--design)" }}>
            <div className="flex items-baseline gap-3">
              <span className="font-extrabold text-white tnum" style={{ fontSize: 44, letterSpacing: "-0.03em" }}>
                -21,5 %
              </span>
              <span style={{ color: "var(--design)", fontSize: 16, fontWeight: 600 }}>Design</span>
            </div>
            <Corps className="mt-4">
              121 offres en juin, 95 en septembre. Product Designer perd 24 %, UX/UI Designer 23 %.
              La famille passe sous les 100 offres pour la première fois.
            </Corps>
            <Corps className="mt-3">
              Deux signaux aggravants : la concentration parisienne monte à 74,7 %, et plus aucune
              médiane salariale n'est publiable depuis juin faute d'atteindre le seuil de 15 offres.
            </Corps>
          </div>
        </Deux>
      </Slide>
    ),
  },

  /* ---------- 13 Les portes fermées ---------- */
  {
    nav: "Junior et remote",
    chapitre: "angles",
    render: ({ active }) => (
      <Slide>
        <Kicker>Les angles morts</Kicker>
        <Titre size={2}>Deux portes structurellement fermées</Titre>
        <Deux gap={56} align="start">
          <div className="mt-9">
            <BigNum value={4.2} decimals={1} suffix=" %" active={active} unite="des offres ouvertes aux 0-2 ans" />
            <div className="mt-7" style={{ maxWidth: 300 }}>
              <Sparkline serie={PORTES.junior} labels={MONTHS} color="rgba(255,255,255,0.6)" height={40} baseZero />
            </div>
            <Corps className="mt-5">
              4,6 puis 4,3, 4,4 et 4,2 %. C'est cette stabilité qui compte. Ce n'est pas une
              conjoncture, c'est un état du marché. En Product, c'est 1,6 %. Data est la seule porte
              d'entrée relative, à 5,4 %.
            </Corps>
          </div>
          <div className="mt-9">
            <BigNum value={0.3} decimals={1} suffix=" %" active={active} unite="des offres en full remote" color="var(--signal)" />
            <div className="mt-7" style={{ maxWidth: 300 }}>
              <Sparkline serie={PORTES.remote} labels={MONTHS} color="var(--signal)" height={40} baseZero />
            </div>
            <Corps className="mt-5">
              Divisé par deux depuis juin. L'hybride, lui, progresse légèrement de 14,3 à 15,2 %. Le
              remote total ne se négocie plus, il disparaît des annonces.
            </Corps>
          </div>
        </Deux>
      </Slide>
    ),
  },

  /* ---------- 14 Qui recrute ---------- */
  {
    nav: "Qui recrute vraiment",
    chapitre: "angles",
    render: () => {
      const max = Math.max(...RECRUTEURS.map((r) => r.pct));
      return (
        <Slide>
          <Kicker>Les angles morts</Kicker>
          <Titre size={2}>Une offre sur deux vient d'une ESN</Titre>
          <Deux ratio="1.2fr 1fr" gap={52} align="start">
            <div className="mt-7">
              {RECRUTEURS.map((r) => (
                <Bar
                  key={r.nom}
                  label={r.nom}
                  value={r.pct}
                  max={max}
                  color={r.nom === "ESN / Conseil" ? "var(--indigo)" : "rgba(255,255,255,0.3)"}
                  right={`${fmtDec(r.pct)} %`}
                />
              ))}
            </div>
            <div className="mt-7">
              <Corps>
                Le poids des ESN est un phénomène Tech avant tout. Il tombe à 38,4 % en Product et
                34,7 % en Design.
              </Corps>
              <div className="mt-6">
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
              <Glass className="mt-6 px-5 py-4">
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13.5, lineHeight: 1.5 }}>
                  Le niveau de 50 % est solide, stable sur juillet, août et septembre. En revanche,
                  la comparaison avec juin n'est pas valide. On explique pourquoi à la slide
                  suivante.
                </div>
              </Glass>
            </div>
          </Deux>
        </Slide>
      );
    },
  },

  /* ---------- 15 Signal ou artefact ---------- */
  {
    nav: "Signal ou artefact",
    chapitre: "retenir",
    render: () => (
      <Slide>
        <Kicker>Ce qu'on retient</Kicker>
        <Titre size={2}>Ce que le Pulse ne sait pas encore faire</Titre>
        <Corps className="mt-5">
          La réécriture du scraper en juillet a cassé la continuité de l'enrichissement entreprise.
          Ces quatre champs ne sont pas comparables entre juin et la suite.
        </Corps>
        <div className="mt-8 table-scroll">
          <div>
          <div
            className="grid gap-3 pb-3"
            style={{
              gridTemplateColumns: "1.5fr repeat(4, 74px) 1.5fr",
              borderBottom: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.42)",
              fontSize: 12.5,
            }}
          >
            <span>Champ</span>
            {MONTHS.map((m) => (
              <span key={m} style={{ textAlign: "right" }}>
                {m.slice(0, 4)}
              </span>
            ))}
            <span style={{ paddingLeft: 14 }}>Verdict</span>
          </div>
          {RUPTURES.map((r) => (
            <div
              key={r.champ}
              className="grid gap-3 py-3.5 items-baseline"
              style={{
                gridTemplateColumns: "1.5fr repeat(4, 74px) 1.5fr",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-white" style={{ fontSize: 15 }}>
                {r.champ}
              </span>
              {r.serie.map((v, i) => (
                <span
                  key={i}
                  className="tnum"
                  style={{
                    textAlign: "right",
                    fontSize: 14.5,
                    color: i === 0 ? "var(--signal)" : "rgba(255,255,255,0.72)",
                    fontWeight: i === 0 ? 600 : 400,
                  }}
                >
                  {v}
                </span>
              ))}
              <span style={{ paddingLeft: 14, color: "rgba(255,255,255,0.5)", fontSize: 13.5 }}>
                {r.verdict}
              </span>
            </div>
          ))}
          </div>
        </div>
        <div className="mt-8 pl-5" style={{ borderLeft: "2px solid var(--signal)" }}>
          <div className="text-white font-semibold" style={{ fontSize: 16 }}>
            Le cas CTO
          </div>
          <div className="mt-2 flex items-baseline gap-5">
            {CTO.map((v, i) => (
              <span key={i} className="tnum" style={{ fontSize: 20, fontWeight: i === 2 ? 700 : 400, color: i === 2 ? "var(--signal)" : "rgba(255,255,255,0.6)" }}>
                {v}
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginLeft: 5 }}>
                  {MONTHS[i].slice(0, 4).toLowerCase()}
                </span>
              </span>
            ))}
          </div>
          <div className="mt-3" style={{ color: "rgba(255,255,255,0.62)", fontSize: 15, maxWidth: "58ch", lineHeight: 1.5 }}>
            En août, on aurait pu titrer sur un doublement des recrutements de CTO. C'était un
            artefact isolé. Un mois ne fait jamais une tendance.
          </div>
        </div>
      </Slide>
    ),
  },

  /* ---------- 16 Les 3 signaux ---------- */
  {
    nav: "Les 3 signaux fin d'année",
    chapitre: "retenir",
    render: () => (
      <Slide>
        <Kicker>Ce qu'on retient</Kicker>
        <Titre size={2}>Les trois signaux à surveiller d'ici décembre</Titre>
        <div className="mt-9 space-y-0">
          {SIGNAUX.map((s, i) => (
            <div
              key={s.titre}
              className="grid gap-7 py-6"
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
                <div className="mt-2" style={{ color: "rgba(255,255,255,0.65)", fontSize: 15.5, lineHeight: 1.5, maxWidth: "72ch" }}>
                  {s.corps}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Slide>
    ),
  },

  /* ---------- 17 Takeaways ---------- */
  {
    nav: "Tu repars avec",
    chapitre: "retenir",
    render: () => (
      <Slide>
        <Kicker color="var(--indigo)">Ce qu'on retient</Kicker>
        <Titre size={2}>Tu repars avec</Titre>
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {TAKEAWAYS.map((t) => (
            <div
              key={t.titre}
              className={t.fort ? "glass rounded-2xl px-6 py-5" : "rounded-2xl px-6 py-5"}
              style={
                t.fort
                  ? { borderLeft: "2px solid var(--indigo)" }
                  : { border: "1px solid rgba(255,255,255,0.09)" }
              }
            >
              <div className="text-white font-semibold" style={{ fontSize: 17.5, letterSpacing: "-0.01em" }}>
                {t.titre}
              </div>
              <div className="mt-2" style={{ color: "rgba(255,255,255,0.62)", fontSize: 14.5, lineHeight: 1.5 }}>
                {t.corps}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14.5 }}>
          CTOs, VP Engineering, Heads of Product, fondateurs, Talent Acquisition. Et tous ceux qui en
          ont marre de négocier à l'aveugle.
        </div>
      </Slide>
    ),
  },

  /* ---------- 18 Fin ---------- */
  {
    nav: "Merci",
    chapitre: null,
    render: () => (
      <Slide center>
        <div className="serif" style={{ fontSize: "clamp(28px, 4.4vw, 56px)", lineHeight: 1.15, color: "#fff", maxWidth: "24ch", margin: "0 auto" }}>
          Le prochain run tombe le 1<sup>er</sup> octobre.
        </div>
        <div className="mt-7" style={{ color: "rgba(255,255,255,0.58)", fontSize: 17, maxWidth: "46ch", margin: "0 auto", lineHeight: 1.55 }}>
          C'est lui qui dira si la contraction de l'été était saisonnière ou structurelle. On remet
          ça le mois prochain.
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
