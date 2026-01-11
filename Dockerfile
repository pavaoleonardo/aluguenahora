FROM node:20-alpine

WORKDIR /app

# Argumentos de build
ARG PAYLOAD_SECRET
ARG DATABASE_URL

# Transformar em variáveis de ambiente
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URL=$DATABASE_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
