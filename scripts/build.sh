#!/usr/bin/env bash
set -euo pipefail

mkdir -p assets/generated
./.tools/bin/tailwindcss \
  --input ./assets/css/main.css \
  --output ./assets/generated/main.css \
  --minify
./.tools/bin/hugo --minify "$@"
