#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
# Skip build if dist exists and we are on Render
# Actually, it's safer to just rely on the local build we push.
# If the user wants to build on Render, they need more memory.
echo "Build stage: dist directory found, skipping heavy build to save memory."
