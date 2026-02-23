#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
if [ ! -d "dist" ] || [ "$FORCE_BUILD" = "true" ]; then
  echo "Building Strapi..."
  NODE_OPTIONS=--max-old-space-size=420 npm run build
else
  echo "Dist directory found, skipping heavy build to save memory."
fi

