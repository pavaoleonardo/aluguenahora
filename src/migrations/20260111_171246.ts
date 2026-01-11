import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_bairros_regiao" AS ENUM('centro', 'norte', 'sul', 'leste', 'oeste', 'anhanduizinho', 'bandeira');
  CREATE TYPE "public"."enum_imoveis_caracteristicas" AS ENUM('mobiliado', 'semi-mobiliado', 'ar-condicionado', 'piscina', 'churrasqueira', 'quintal', 'varanda', 'sacada', 'elevador', 'portaria', 'academia', 'salao-festas', 'playground', 'pet-friendly', 'financiamento');
  CREATE TYPE "public"."enum_imoveis_tipo" AS ENUM('casa', 'apartamento', 'kitnet', 'sobrado', 'cobertura', 'terreno', 'comercial', 'galpao', 'chacara');
  CREATE TYPE "public"."enum_imoveis_finalidade" AS ENUM('aluguel', 'venda', 'ambos');
  CREATE TYPE "public"."enum_imoveis_status" AS ENUM('disponivel', 'alugado', 'vendido', 'indisponivel', 'rascunho');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"cloudinary_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "bairros" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"regiao" "enum_bairros_regiao" NOT NULL,
  	"descricao" varchar,
  	"destaque" boolean DEFAULT false,
  	"imagem_id" integer,
  	"latitude" numeric,
  	"longitude" numeric,
  	"ordem" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "imoveis_caracteristicas" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_imoveis_caracteristicas",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "imoveis_fotos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"imagem_id" integer NOT NULL,
  	"legenda" varchar,
  	"destaque" boolean DEFAULT false
  );
  
  CREATE TABLE "imoveis" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"tipo" "enum_imoveis_tipo" NOT NULL,
  	"finalidade" "enum_imoveis_finalidade" NOT NULL,
  	"status" "enum_imoveis_status" DEFAULT 'disponivel' NOT NULL,
  	"descricao" varchar NOT NULL,
  	"preco" numeric NOT NULL,
  	"condominio" numeric,
  	"iptu" numeric,
  	"quartos" numeric DEFAULT 0,
  	"suites" numeric DEFAULT 0,
  	"banheiros" numeric DEFAULT 0,
  	"vagas" numeric DEFAULT 0,
  	"area" numeric,
  	"area_construida" numeric,
  	"endereco" varchar,
  	"bairro_id" integer NOT NULL,
  	"cep" varchar,
  	"latitude" numeric,
  	"longitude" numeric,
  	"corretor" varchar,
  	"telefone" varchar,
  	"email" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"destaque" boolean DEFAULT false,
  	"visualizacoes" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"bairros_id" integer,
  	"imoveis_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bairros" ADD CONSTRAINT "bairros_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "imoveis_caracteristicas" ADD CONSTRAINT "imoveis_caracteristicas_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."imoveis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "imoveis_fotos" ADD CONSTRAINT "imoveis_fotos_imagem_id_media_id_fk" FOREIGN KEY ("imagem_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "imoveis_fotos" ADD CONSTRAINT "imoveis_fotos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."imoveis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "imoveis" ADD CONSTRAINT "imoveis_bairro_id_bairros_id_fk" FOREIGN KEY ("bairro_id") REFERENCES "public"."bairros"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bairros_fk" FOREIGN KEY ("bairros_id") REFERENCES "public"."bairros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_imoveis_fk" FOREIGN KEY ("imoveis_id") REFERENCES "public"."imoveis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "bairros_nome_idx" ON "bairros" USING btree ("nome");
  CREATE UNIQUE INDEX "bairros_slug_idx" ON "bairros" USING btree ("slug");
  CREATE INDEX "bairros_imagem_idx" ON "bairros" USING btree ("imagem_id");
  CREATE INDEX "bairros_updated_at_idx" ON "bairros" USING btree ("updated_at");
  CREATE INDEX "bairros_created_at_idx" ON "bairros" USING btree ("created_at");
  CREATE INDEX "imoveis_caracteristicas_order_idx" ON "imoveis_caracteristicas" USING btree ("order");
  CREATE INDEX "imoveis_caracteristicas_parent_idx" ON "imoveis_caracteristicas" USING btree ("parent_id");
  CREATE INDEX "imoveis_fotos_order_idx" ON "imoveis_fotos" USING btree ("_order");
  CREATE INDEX "imoveis_fotos_parent_id_idx" ON "imoveis_fotos" USING btree ("_parent_id");
  CREATE INDEX "imoveis_fotos_imagem_idx" ON "imoveis_fotos" USING btree ("imagem_id");
  CREATE UNIQUE INDEX "imoveis_slug_idx" ON "imoveis" USING btree ("slug");
  CREATE INDEX "imoveis_bairro_idx" ON "imoveis" USING btree ("bairro_id");
  CREATE INDEX "imoveis_updated_at_idx" ON "imoveis" USING btree ("updated_at");
  CREATE INDEX "imoveis_created_at_idx" ON "imoveis" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_bairros_id_idx" ON "payload_locked_documents_rels" USING btree ("bairros_id");
  CREATE INDEX "payload_locked_documents_rels_imoveis_id_idx" ON "payload_locked_documents_rels" USING btree ("imoveis_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "bairros" CASCADE;
  DROP TABLE "imoveis_caracteristicas" CASCADE;
  DROP TABLE "imoveis_fotos" CASCADE;
  DROP TABLE "imoveis" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_bairros_regiao";
  DROP TYPE "public"."enum_imoveis_caracteristicas";
  DROP TYPE "public"."enum_imoveis_tipo";
  DROP TYPE "public"."enum_imoveis_finalidade";
  DROP TYPE "public"."enum_imoveis_status";`)
}
