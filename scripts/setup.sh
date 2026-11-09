#!/usr/bin/env bash
set -euo pipefail

HUGO_VERSION="0.152.2"
TAILWIND_VERSION="4.1.17"
TOOLS_DIR="$(pwd)/.tools/bin"
HUGO_ARCHIVE="$(mktemp)"

mkdir -p "$TOOLS_DIR"

curl --fail --location --silent --show-error \
  "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-amd64.tar.gz" \
  --output "$HUGO_ARCHIVE"
tar -xzf "$HUGO_ARCHIVE" -C "$TOOLS_DIR" hugo
rm -f "$HUGO_ARCHIVE"

curl --fail --location --silent --show-error \
  "https://github.com/tailwindlabs/tailwindcss/releases/download/v${TAILWIND_VERSION}/tailwindcss-linux-x64" \
  --output "$TOOLS_DIR/tailwindcss"
chmod +x "$TOOLS_DIR/hugo" "$TOOLS_DIR/tailwindcss"

"$TOOLS_DIR/hugo" version
"$TOOLS_DIR/tailwindcss" --help | head -n 1
