FROM node:20-alpine

WORKDIR /app

ARG PAYLOAD_SECRET
ARG DATABASE_URL

ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URL=$DATABASE_URL

COPY package*.json ./
RUN npm install

COPY . .

# Build sem rodar migrations
RUN SKIP_ENV_VALIDATION=1 npm run build -- --no-lint || npm run build:next

EXPOSE 3000

# Rodar migrations e depois start
CMD ["sh", "-c", "npm run payload migrate && npm start"]
