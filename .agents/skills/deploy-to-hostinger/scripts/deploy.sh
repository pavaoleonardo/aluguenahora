#!/bin/bash

TARGET=$1
if [ -z "$TARGET" ]; then
  TARGET="frontend"
fi

echo "🚀 Starting deployment to Hostinger VPS (187.77.57.10) for target: $TARGET"

# Base SSH Command
SSH_CMD="ssh root@187.77.57.10"
BASE_DIR="/var/www/aluguenahora"

if [ "$TARGET" = "frontend" ] || [ "$TARGET" = "all" ]; then
  echo "📦 Deploying Frontend..."
  $SSH_CMD "cd $BASE_DIR/frontend && git pull origin main && npm run build && pm2 restart aluguenahora-frontend"
  if [ $? -eq 0 ]; then
    echo "✅ Frontend deployed successfully!"
  else
    echo "❌ Frontend deployment failed!"
    exit 1
  fi
fi

if [ "$TARGET" = "backend" ] || [ "$TARGET" = "all" ]; then
  echo "⚙️ Deploying Backend..."
  $SSH_CMD "cd $BASE_DIR/backend && git pull origin main && npm install && npm run build && pm2 restart aluguenahora-backend"
  if [ $? -eq 0 ]; then
    echo "✅ Backend deployed successfully!"
  else
    echo "❌ Backend deployment failed!"
    exit 1
  fi
fi

echo "🎉 Deployment Process Complete!"
