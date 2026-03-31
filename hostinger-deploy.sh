#!/usr/bin/env bash
set -o errexit
echo "Pulling latest code from GitHub..."
git pull origin main

echo "Building Frontend..."
cd frontend && npm install && npm run build && cd ..

echo "Building Backend..."
cd backend && npm install && npm run build && cd ..

echo "Restarting Services..."
pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js --env production

echo "Deployment complete! ✅"
