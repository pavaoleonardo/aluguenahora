# Script de Preparación para VPS Ubuntu 22.04 LTS (Alugue na Hora)

Este documento contiene los comandos que ejecutaremos en tu VPS. Guárdalo como referencia.

## 1. Actualización inicial y Node.js
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

## 2. Instalación de PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib -y
sudo -i -u postgres psql -c "CREATE DATABASE aluguenahora;"
sudo -i -u postgres psql -c "CREATE USER strapi WITH PASSWORD 'tu_password_seguro';"
sudo -i -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE aluguenahora TO strapi;"
```

## 3. Instalación de Nginx (Para HTTPS y Certificados)
```bash
sudo apt install nginx -y
sudo apt install certbot python3-certbot-nginx -y
```

## 4. Configuración del Firewall
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```
