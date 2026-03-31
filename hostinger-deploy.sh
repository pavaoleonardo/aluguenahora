#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing dependencies..."
npm install --production
echo "Build complete! (Using pre-compiled dist/ from repository)"

