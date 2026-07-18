#!/usr/bin/env bash
# Regenerate the Wells Gallery QR poster PDF.
#
# Fetches the brand fonts (Cinzel, Cormorant Garamond, Spectral) and a QR
# encoder, then renders .build/poster.html to a print-ready US Letter PDF with
# headless Chromium. Re-run after editing poster.html (e.g. to change the QR
# destination URL, headline, or colors).
#
# Usage:  bash .build/regenerate.sh
set -euo pipefail
cd "$(dirname "$0")/.."

FONTS=".build/fonts"; mkdir -p "$FONTS"
GF="https://raw.githubusercontent.com/google/fonts/main"
dl () { [ -s "$2" ] || curl -fsSL "$1" -o "$2"; }

dl "$GF/ofl/cinzel/Cinzel%5Bwght%5D.ttf"                              "$FONTS/Cinzel.ttf"
dl "$GF/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf"       "$FONTS/CormorantGaramond.ttf"
dl "$GF/ofl/cormorantgaramond/CormorantGaramond-Italic%5Bwght%5D.ttf" "$FONTS/CormorantGaramond-Italic.ttf"
dl "$GF/ofl/spectral/Spectral-Regular.ttf"                           "$FONTS/Spectral-Regular.ttf"
dl "$GF/ofl/spectral/Spectral-Medium.ttf"                            "$FONTS/Spectral-Medium.ttf"
dl "https://raw.githubusercontent.com/davidshimjs/qrcodejs/master/qrcode.js" ".build/qrcode.js"

CHROME="$(find /opt/pw-browsers/chromium-* -maxdepth 2 -type f -name chrome 2>/dev/null | head -1)"
[ -n "$CHROME" ] || { echo "Chromium not found"; exit 1; }

"$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
  --force-color-profile=srgb --virtual-time-budget=4000 \
  --no-pdf-header-footer \
  --print-to-pdf="Wells-Gallery-QR-Poster.pdf" \
  "file://$PWD/.build/poster.html"

echo "Wrote Wells-Gallery-QR-Poster.pdf"
