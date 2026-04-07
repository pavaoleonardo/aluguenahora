#!/bin/bash

# Configuration
TARGET_IP="187.77.57.10"
BASE_DIR="/var/www/aluguenahora"
SSH_CMD="ssh -o ConnectTimeout=10 root@$TARGET_IP"
TARGET=$1

if [ -z "$TARGET" ]; then
  echo "Usage: ./deploy.sh [backend|frontend|all]"
  exit 1
fi

echo "🚀 Starting deployment to Hostinger VPS ($TARGET_IP) for target: $TARGET"

if [ "$TARGET" = "backend" ] || [ "$TARGET" = "all" ]; then
  echo "⚙️ Deploying Backend..."
  $SSH_CMD "cd $BASE_DIR && git pull origin main && cd backend && rm -rf .cache dist && npm install && npm run build && cd .. && pm2 startOrRestart ecosystem.config.js --only aluguenahora-backend --update-env"
  if [ $? -eq 0 ]; then
    echo "✅ Backend deployed successfully!"
  else
    echo "❌ Backend deployment failed!"
    exit 1
  fi
fi

if [ "$TARGET" = "frontend" ] || [ "$TARGET" = "all" ]; then
  echo "📦 Deploying Frontend..."
  $SSH_CMD "cd $BASE_DIR && git pull origin main && cd frontend && npm install && npm run build && cd .. && pm2 startOrRestart ecosystem.config.js --only aluguenahora-frontend --update-env"
  if [ $? -eq 0 ]; then
    echo "✅ Frontend deployed successfully!"
  else
    echo "❌ Frontend deployment failed!"
    exit 1
  fi
fi

echo "🎉 Deployment Process Complete!"
