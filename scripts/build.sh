#!/usr/bin/env bash
set -euo pipefail

./.tools/bin/tailwindcss \
  --input ./assets/css/main.css \
  --output ./static/css/main.css \
  --minify
./.tools/bin/hugo --minify
