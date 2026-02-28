# Proyecto: Alugue na Hora (Inmobiliaria)

## Identidad y Propósito
- **Descripción**: Plataforma de alquiler y venta de inmuebles.
- **Backend**: Strapi v5 (Headless CMS).
- **Frontend**: Next.js (App Router), Tailwind CSS 4.
- **Base de Datos**: PostgreSQL (en producción).
- **Almacenamiento**: Cloudinary (para fotos de inmuebles).

## Reglas de Desarrollo
- **Backend**: Los inmuebles se crean como `draft` por defecto. Deben ser aprobados por el admin.
- **Relaciones**: Los inmuebles deben estar asociados al `usuario` que los creó.
- **Frontend**: Usar componentes de Radix/HeadlessUI y Tailwind 4 para la UI. No usar placeholders genéricos.

## Estado Actual (Febrero 2026)
- **Migración a Hostinger VPS completada (fase 1)**: Nginx configurado y enrutando a Strapi (`/api`, `/admin`) y Next.js mediante proxy interno. IP principal actual en uso: `187.77.57.10`.
- Aplicaciones manejadas por **PM2** en el servidor local de VPS.
- **Frontend `.env.local`**: Configurado correctamente con `NEXT_PUBLIC_API_URL=http://187.77.57.10` (sin el puerto `:1337` porque Nginx se encarga del proxy reverso interno, evitando errores de CORS en login/fetch).
- Base de datos reconstruida de forma manual tras confirmación de SQLite local en entorno *dev*.
- **Próximos pasos (Pendientes)**:
  1. Configuración de **Dominio** (apuntar DNS de `aluguenahora.com.br` a la IP `187.77.57.10`).
  2. Activar HTTPS (SSL) mediante **Certbot** una vez el dominio propague.

## Historial de Confusiones a Evitar
- **NO hay PDFs** de generación dinámica en este proyecto.
- **NO es un SaaS de reformas** ni de hostelería. Es exclusivamente inmobiliario.
