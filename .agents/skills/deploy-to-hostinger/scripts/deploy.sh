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
  $SSH_CMD "cd $BASE_DIR && git fetch origin main && git reset --hard origin/main && cd frontend && npm run build && pm2 delete aluguenahora-frontend || true && pm2 start npm --name 'aluguenahora-frontend' -- run start"
  if [ $? -eq 0 ]; then
    echo "✅ Frontend deployed successfully!"
  else
    echo "❌ Frontend deployment failed!"
    exit 1
  fi
fi

if [ "$TARGET" = "backend" ] || [ "$TARGET" = "all" ]; then
  echo "⚙️ Deploying Backend..."
  $SSH_CMD "cd $BASE_DIR && git fetch origin main && git reset --hard origin/main && cd backend && rm -rf .cache dist && npm install && NODE_OPTIONS=--max-old-space-size=1536 npm run build && pm2 delete 'aluguenahora-backend' || true && pm2 start npm --name 'aluguenahora-backend' -- run start"
  if [ $? -eq 0 ]; then
    echo "✅ Backend deployed successfully!"
  else
    echo "❌ Backend deployment failed!"
    exit 1
  fi
fi

echo "🎉 Deployment Process Complete!"
