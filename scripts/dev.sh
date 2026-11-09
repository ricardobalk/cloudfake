#!/usr/bin/env bash
set -euo pipefail

mkdir -p assets/generated
./.tools/bin/tailwindcss --input ./assets/css/main.css --output ./assets/generated/main.css
./.tools/bin/tailwindcss \
  --input ./assets/css/main.css \
  --output ./assets/generated/main.css \
  --watch &
TAILWIND_PID=$!
trap 'kill "$TAILWIND_PID" 2>/dev/null || true' EXIT

./.tools/bin/hugo server \
  --bind 0.0.0.0 \
  --port 1313 \
  --disableFastRender
