#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
echo "Building Strapi..."
NODE_OPTIONS=--max-old-space-size=420 npm run build
