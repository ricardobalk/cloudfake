#!/usr/bin/env bash
set -euo pipefail

HUGO_VERSION="0.152.2"
TOOLS_DIR="$(pwd)/.tools/bin"
ARCHIVE="$(mktemp)"

mkdir -p "$TOOLS_DIR"
curl --fail --location --silent --show-error \
  "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-amd64.tar.gz" \
  --output "$ARCHIVE"
tar -xzf "$ARCHIVE" -C "$TOOLS_DIR" hugo
rm -f "$ARCHIVE"
"$TOOLS_DIR/hugo" version
