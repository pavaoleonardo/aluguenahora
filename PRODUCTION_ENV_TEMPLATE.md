# Production Environment Variables - Alugue na Hora

Copy these to a `.env` file on your VPS (we will create one for backend and one for frontend).

## BACKEND (.env)
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Generation: You can keep the same as local or generate new ones for extra security
APP_KEYS=R79+YmKNYTPLW27mvdqK4g==,/u1b9ORNOk4Z67Rc9zq0gg==,dYxDDmVxROWLTsa1f1RtMA==,dhouAniORUxWH4wxRZ4MBQ==
API_TOKEN_SALT=0rAxJs42J/T6lzYYuBTCQQ==
ADMIN_JWT_SECRET=n68vMdRTjkuBhvaGLZyddA==
TRANSFER_TOKEN_SALT=OztyUQs5LIu0wztQ/yg7wg==
ENCRYPTION_KEY=Qau4XPQitp6HPBuPQEOSyg==
JWT_SECRET=wLwxDa7pzHEPDiLtimecaQ==

# Database (Postgres on VPS)
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=aluguenahora
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=TU_PASSWORD_AQUI
DATABASE_SSL=false

# Cloudinary (Keep these as they are working)
CLOUDINARY_NAME=pavaoleonardo
CLOUDINARY_KEY=433423961226632
CLOUDINARY_SECRET=oBT5lhCriToiLe3akR_CtZ24MfE

## FRONTEND (.env.local)
NEXT_PUBLIC_API_URL=https://api.aluguenahora.com.br
