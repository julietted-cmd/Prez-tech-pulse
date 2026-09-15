#!/usr/bin/env python3
"""
Génère les QR codes de la slide finale, en SVG, dans public/.

Source unique : le tableau RESSOURCES de src/data.js. Renseigne les trois
URL là-bas, puis lance ce script. Les SVG sont servis en local pendant le
live, aucun appel réseau au moment de présenter.

    pip install segno
    python3 scripts/gen-qr.py

Un `url` vide est ignoré : la slide affiche alors un cadre "QR à générer",
elle ne casse pas.
"""

import pathlib
import re
import sys

try:
    import segno
except ImportError:
    sys.exit("segno manquant. Installe-le avec :  pip install segno")

RACINE = pathlib.Path(__file__).resolve().parent.parent
DATA = RACINE / "src" / "data.js"
PUBLIC = RACINE / "public"


def lire_ressources(source: str):
    """Extrait les couples (id, url) du tableau RESSOURCES de data.js."""
    bloc = re.search(
        r"export const RESSOURCES = \[(.*?)\n\];", source, re.DOTALL
    )
    if not bloc:
        sys.exit("Tableau RESSOURCES introuvable dans src/data.js.")

    ressources = []
    for ligne in bloc.group(1).splitlines():
        ident = re.search(r'id:\s*"([^"]+)"', ligne)
        url = re.search(r'url:\s*"([^"]*)"', ligne)
        if ident and url:
            ressources.append((ident.group(1), url.group(1).strip()))
    return ressources


def main():
    if not DATA.exists():
        sys.exit(f"Fichier introuvable : {DATA}")

    PUBLIC.mkdir(exist_ok=True)
    ressources = lire_ressources(DATA.read_text(encoding="utf-8"))

    if not ressources:
        sys.exit("Aucune ressource lue. Vérifie le format du tableau.")

    generes, ignores = 0, []
    for ident, url in ressources:
        if not url:
            ignores.append(ident)
            continue

        cible = PUBLIC / f"qr-{ident}.svg"
        # Correction d'erreur haute : le QR reste lisible même filmé de loin
        # ou partiellement masqué par un bandeau de stream.
        segno.make(url, error="h").save(
            str(cible), scale=12, border=2, dark="#0A0A0C", light="#FFFFFF"
        )
        print(f"  OK   {cible.relative_to(RACINE)}  →  {url}")
        generes += 1

    print(f"\n{generes} QR code(s) généré(s) dans public/.")
    if ignores:
        print(f"URL manquante pour : {', '.join(ignores)}")
        print("Renseigne-les dans RESSOURCES (src/data.js) puis relance.")


if __name__ == "__main__":
    main()
