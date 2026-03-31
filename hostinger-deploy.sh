#!/usr/bin/env bash
set -o errexit
echo "Pulling latest code from GitHub..."
git pull origin main

echo "Building Frontend and Backend..."
# Frontend build
cd frontend && npm install && npm run build && cd ..

# Backend (Strapi) build and restart
cd backend && npm install && npm run build
pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js --env production && cd ..

echo "Deployment complete! ✅"
