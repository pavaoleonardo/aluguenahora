--
-- PostgreSQL database dump
--

\restrict 8Dq146vVzxVNcj3IH4CykyNOVekQdZrxh4XTKiFjZr2eg2KzuEKJ0vU0NVbkPMy

-- Dumped from database version 14.20 (Homebrew)
-- Dumped by pg_dump version 14.20 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_permissions; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.admin_permissions (
    id integer NOT NULL,
    document_id character varying(255),
    action character varying(255),
    action_parameters jsonb,
    subject character varying(255),
    properties jsonb,
    conditions jsonb,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.admin_permissions OWNER TO strapi;

--
-- Name: admin_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.admin_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_permissions_id_seq OWNER TO strapi;

--
-- Name: admin_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.admin_permissions_id_seq OWNED BY public.admin_permissions.id;


--
-- Name: admin_permissions_role_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.admin_permissions_role_lnk (
    id integer NOT NULL,
    permission_id integer,
    role_id integer,
    permission_ord double precision
);


ALTER TABLE public.admin_permissions_role_lnk OWNER TO strapi;

--
-- Name: admin_permissions_role_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.admin_permissions_role_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_permissions_role_lnk_id_seq OWNER TO strapi;

--
-- Name: admin_permissions_role_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.admin_permissions_role_lnk_id_seq OWNED BY public.admin_permissions_role_lnk.id;


--
-- Name: admin_roles; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.admin_roles (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    code character varying(255),
    description character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.admin_roles OWNER TO strapi;

--
-- Name: admin_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.admin_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_roles_id_seq OWNER TO strapi;

--
-- Name: admin_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.admin_roles_id_seq OWNED BY public.admin_roles.id;


--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    document_id character varying(255),
    firstname character varying(255),
    lastname character varying(255),
    username character varying(255),
    email character varying(255),
    password character varying(255),
    reset_password_token character varying(255),
    registration_token character varying(255),
    is_active boolean,
    blocked boolean,
    prefered_language character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.admin_users OWNER TO strapi;

--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_users_id_seq OWNER TO strapi;

--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: admin_users_roles_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.admin_users_roles_lnk (
    id integer NOT NULL,
    user_id integer,
    role_id integer,
    role_ord double precision,
    user_ord double precision
);


ALTER TABLE public.admin_users_roles_lnk OWNER TO strapi;

--
-- Name: admin_users_roles_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.admin_users_roles_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_users_roles_lnk_id_seq OWNER TO strapi;

--
-- Name: admin_users_roles_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.admin_users_roles_lnk_id_seq OWNED BY public.admin_users_roles_lnk.id;


--
-- Name: files; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.files (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    alternative_text text,
    caption text,
    width integer,
    height integer,
    formats jsonb,
    hash character varying(255),
    ext character varying(255),
    mime character varying(255),
    size numeric(10,2),
    url text,
    preview_url text,
    provider character varying(255),
    provider_metadata jsonb,
    folder_path character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.files OWNER TO strapi;

--
-- Name: files_folder_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.files_folder_lnk (
    id integer NOT NULL,
    file_id integer,
    folder_id integer,
    file_ord double precision
);


ALTER TABLE public.files_folder_lnk OWNER TO strapi;

--
-- Name: files_folder_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.files_folder_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_folder_lnk_id_seq OWNER TO strapi;

--
-- Name: files_folder_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.files_folder_lnk_id_seq OWNED BY public.files_folder_lnk.id;


--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_id_seq OWNER TO strapi;

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- Name: files_related_mph; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.files_related_mph (
    id integer NOT NULL,
    file_id integer,
    related_id integer,
    related_type character varying(255),
    field character varying(255),
    "order" double precision
);


ALTER TABLE public.files_related_mph OWNER TO strapi;

--
-- Name: files_related_mph_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.files_related_mph_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_related_mph_id_seq OWNER TO strapi;

--
-- Name: files_related_mph_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.files_related_mph_id_seq OWNED BY public.files_related_mph.id;


--
-- Name: i18n_locale; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.i18n_locale (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    code character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.i18n_locale OWNER TO strapi;

--
-- Name: i18n_locale_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.i18n_locale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.i18n_locale_id_seq OWNER TO strapi;

--
-- Name: i18n_locale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.i18n_locale_id_seq OWNED BY public.i18n_locale.id;


--
-- Name: imoveis; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.imoveis (
    id integer NOT NULL,
    document_id character varying(255),
    titulo character varying(255),
    descricao jsonb,
    tamanho numeric(10,2),
    quartos integer,
    banheiros integer,
    bairro jsonb,
    preco numeric(10,2),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255),
    cidade character varying(255),
    finalidade character varying(255),
    tipo character varying(255),
    endereco character varying(255),
    latitude numeric(10,2),
    longitude numeric(10,2),
    condominio numeric(10,2),
    iptu numeric(10,2),
    area_total numeric(10,2),
    caracteristicas jsonb
);


ALTER TABLE public.imoveis OWNER TO strapi;

--
-- Name: imoveis_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.imoveis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.imoveis_id_seq OWNER TO strapi;

--
-- Name: imoveis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.imoveis_id_seq OWNED BY public.imoveis.id;


--
-- Name: imoveis_usuario_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.imoveis_usuario_lnk (
    id integer NOT NULL,
    imovel_id integer,
    user_id integer
);


ALTER TABLE public.imoveis_usuario_lnk OWNER TO strapi;

--
-- Name: imoveis_usuario_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.imoveis_usuario_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.imoveis_usuario_lnk_id_seq OWNER TO strapi;

--
-- Name: imoveis_usuario_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.imoveis_usuario_lnk_id_seq OWNED BY public.imoveis_usuario_lnk.id;


--
-- Name: noticias; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.noticias (
    id integer NOT NULL,
    document_id character varying(255),
    titulo character varying(255),
    resumo text,
    link character varying(255),
    conteudo text,
    categoria character varying(255),
    data date,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.noticias OWNER TO strapi;

--
-- Name: noticias_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.noticias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.noticias_id_seq OWNER TO strapi;

--
-- Name: noticias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.noticias_id_seq OWNED BY public.noticias.id;


--
-- Name: strapi_ai_localization_jobs; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_ai_localization_jobs (
    id integer NOT NULL,
    content_type character varying(255) NOT NULL,
    related_document_id character varying(255) NOT NULL,
    source_locale character varying(255) NOT NULL,
    target_locales jsonb NOT NULL,
    status character varying(255) NOT NULL,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone
);


ALTER TABLE public.strapi_ai_localization_jobs OWNER TO strapi;

--
-- Name: strapi_ai_localization_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_ai_localization_jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_ai_localization_jobs_id_seq OWNER TO strapi;

--
-- Name: strapi_ai_localization_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_ai_localization_jobs_id_seq OWNED BY public.strapi_ai_localization_jobs.id;


--
-- Name: strapi_api_token_permissions; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_api_token_permissions (
    id integer NOT NULL,
    document_id character varying(255),
    action character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_api_token_permissions OWNER TO strapi;

--
-- Name: strapi_api_token_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_api_token_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_api_token_permissions_id_seq OWNER TO strapi;

--
-- Name: strapi_api_token_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_api_token_permissions_id_seq OWNED BY public.strapi_api_token_permissions.id;


--
-- Name: strapi_api_token_permissions_token_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_api_token_permissions_token_lnk (
    id integer NOT NULL,
    api_token_permission_id integer,
    api_token_id integer,
    api_token_permission_ord double precision
);


ALTER TABLE public.strapi_api_token_permissions_token_lnk OWNER TO strapi;

--
-- Name: strapi_api_token_permissions_token_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_api_token_permissions_token_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_api_token_permissions_token_lnk_id_seq OWNER TO strapi;

--
-- Name: strapi_api_token_permissions_token_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_api_token_permissions_token_lnk_id_seq OWNED BY public.strapi_api_token_permissions_token_lnk.id;


--
-- Name: strapi_api_tokens; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_api_tokens (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    description character varying(255),
    type character varying(255),
    access_key character varying(255),
    encrypted_key text,
    last_used_at timestamp(6) without time zone,
    expires_at timestamp(6) without time zone,
    lifespan bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_api_tokens OWNER TO strapi;

--
-- Name: strapi_api_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_api_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_api_tokens_id_seq OWNER TO strapi;

--
-- Name: strapi_api_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_api_tokens_id_seq OWNED BY public.strapi_api_tokens.id;


--
-- Name: strapi_audit_logs; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_audit_logs (
    id integer NOT NULL,
    document_id character varying(255),
    action character varying(255),
    date timestamp(6) without time zone,
    payload jsonb,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_audit_logs OWNER TO strapi;

--
-- Name: strapi_audit_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_audit_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_audit_logs_id_seq OWNER TO strapi;

--
-- Name: strapi_audit_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_audit_logs_id_seq OWNED BY public.strapi_audit_logs.id;


--
-- Name: strapi_audit_logs_user_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_audit_logs_user_lnk (
    id integer NOT NULL,
    audit_log_id integer,
    user_id integer
);


ALTER TABLE public.strapi_audit_logs_user_lnk OWNER TO strapi;

--
-- Name: strapi_audit_logs_user_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_audit_logs_user_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_audit_logs_user_lnk_id_seq OWNER TO strapi;

--
-- Name: strapi_audit_logs_user_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_audit_logs_user_lnk_id_seq OWNED BY public.strapi_audit_logs_user_lnk.id;


--
-- Name: strapi_core_store_settings; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_core_store_settings (
    id integer NOT NULL,
    key character varying(255),
    value text,
    type character varying(255),
    environment character varying(255),
    tag character varying(255)
);


ALTER TABLE public.strapi_core_store_settings OWNER TO strapi;

--
-- Name: strapi_core_store_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_core_store_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_core_store_settings_id_seq OWNER TO strapi;

--
-- Name: strapi_core_store_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_core_store_settings_id_seq OWNED BY public.strapi_core_store_settings.id;


--
-- Name: strapi_database_schema; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_database_schema (
    id integer NOT NULL,
    schema json,
    "time" timestamp without time zone,
    hash character varying(255)
);


ALTER TABLE public.strapi_database_schema OWNER TO strapi;

--
-- Name: strapi_database_schema_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_database_schema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_database_schema_id_seq OWNER TO strapi;

--
-- Name: strapi_database_schema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_database_schema_id_seq OWNED BY public.strapi_database_schema.id;


--
-- Name: strapi_history_versions; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_history_versions (
    id integer NOT NULL,
    content_type character varying(255) NOT NULL,
    related_document_id character varying(255),
    locale character varying(255),
    status character varying(255),
    data jsonb,
    schema jsonb,
    created_at timestamp(6) without time zone,
    created_by_id integer
);


ALTER TABLE public.strapi_history_versions OWNER TO strapi;

--
-- Name: strapi_history_versions_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_history_versions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_history_versions_id_seq OWNER TO strapi;

--
-- Name: strapi_history_versions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_history_versions_id_seq OWNED BY public.strapi_history_versions.id;


--
-- Name: strapi_migrations; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_migrations (
    id integer NOT NULL,
    name character varying(255),
    "time" timestamp without time zone
);


ALTER TABLE public.strapi_migrations OWNER TO strapi;

--
-- Name: strapi_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_migrations_id_seq OWNER TO strapi;

--
-- Name: strapi_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_migrations_id_seq OWNED BY public.strapi_migrations.id;


--
-- Name: strapi_migrations_internal; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_migrations_internal (
    id integer NOT NULL,
    name character varying(255),
    "time" timestamp without time zone
);


ALTER TABLE public.strapi_migrations_internal OWNER TO strapi;

--
-- Name: strapi_migrations_internal_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_migrations_internal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_migrations_internal_id_seq OWNER TO strapi;

--
-- Name: strapi_migrations_internal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_migrations_internal_id_seq OWNED BY public.strapi_migrations_internal.id;


--
-- Name: strapi_release_actions; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_release_actions (
    id integer NOT NULL,
    document_id character varying(255),
    type character varying(255),
    content_type character varying(255),
    entry_document_id character varying(255),
    locale character varying(255),
    is_entry_valid boolean,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer
);


ALTER TABLE public.strapi_release_actions OWNER TO strapi;

--
-- Name: strapi_release_actions_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_release_actions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_release_actions_id_seq OWNER TO strapi;

--
-- Name: strapi_release_actions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_release_actions_id_seq OWNED BY public.strapi_release_actions.id;


--
-- Name: strapi_release_actions_release_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_release_actions_release_lnk (
    id integer NOT NULL,
    release_action_id integer,
    release_id integer,
    release_action_ord double precision
);


ALTER TABLE public.strapi_release_actions_release_lnk OWNER TO strapi;

--
-- Name: strapi_release_actions_release_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_release_actions_release_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_release_actions_release_lnk_id_seq OWNER TO strapi;

--
-- Name: strapi_release_actions_release_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_release_actions_release_lnk_id_seq OWNED BY public.strapi_release_actions_release_lnk.id;


--
-- Name: strapi_releases; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_releases (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    released_at timestamp(6) without time zone,
    scheduled_at timestamp(6) without time zone,
    timezone character varying(255),
    status character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_releases OWNER TO strapi;

--
-- Name: strapi_releases_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_releases_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_releases_id_seq OWNER TO strapi;

--
-- Name: strapi_releases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_releases_id_seq OWNED BY public.strapi_releases.id;


--
-- Name: strapi_sessions; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_sessions (
    id integer NOT NULL,
    document_id character varying(255),
    user_id character varying(255),
    session_id character varying(255),
    child_id character varying(255),
    device_id character varying(255),
    origin character varying(255),
    expires_at timestamp(6) without time zone,
    absolute_expires_at timestamp(6) without time zone,
    status character varying(255),
    type character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_sessions OWNER TO strapi;

--
-- Name: strapi_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_sessions_id_seq OWNER TO strapi;

--
-- Name: strapi_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_sessions_id_seq OWNED BY public.strapi_sessions.id;


--
-- Name: strapi_transfer_token_permissions; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_transfer_token_permissions (
    id integer NOT NULL,
    document_id character varying(255),
    action character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_transfer_token_permissions OWNER TO strapi;

--
-- Name: strapi_transfer_token_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_transfer_token_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_transfer_token_permissions_id_seq OWNER TO strapi;

--
-- Name: strapi_transfer_token_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_transfer_token_permissions_id_seq OWNED BY public.strapi_transfer_token_permissions.id;


--
-- Name: strapi_transfer_token_permissions_token_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_transfer_token_permissions_token_lnk (
    id integer NOT NULL,
    transfer_token_permission_id integer,
    transfer_token_id integer,
    transfer_token_permission_ord double precision
);


ALTER TABLE public.strapi_transfer_token_permissions_token_lnk OWNER TO strapi;

--
-- Name: strapi_transfer_token_permissions_token_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_transfer_token_permissions_token_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_transfer_token_permissions_token_lnk_id_seq OWNER TO strapi;

--
-- Name: strapi_transfer_token_permissions_token_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_transfer_token_permissions_token_lnk_id_seq OWNED BY public.strapi_transfer_token_permissions_token_lnk.id;


--
-- Name: strapi_transfer_tokens; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_transfer_tokens (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    description character varying(255),
    access_key character varying(255),
    last_used_at timestamp(6) without time zone,
    expires_at timestamp(6) without time zone,
    lifespan bigint,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_transfer_tokens OWNER TO strapi;

--
-- Name: strapi_transfer_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_transfer_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_transfer_tokens_id_seq OWNER TO strapi;

--
-- Name: strapi_transfer_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_transfer_tokens_id_seq OWNED BY public.strapi_transfer_tokens.id;


--
-- Name: strapi_webhooks; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_webhooks (
    id integer NOT NULL,
    name character varying(255),
    url text,
    headers jsonb,
    events jsonb,
    enabled boolean
);


ALTER TABLE public.strapi_webhooks OWNER TO strapi;

--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_webhooks_id_seq OWNER TO strapi;

--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_webhooks_id_seq OWNED BY public.strapi_webhooks.id;


--
-- Name: strapi_workflows; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_workflows (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    content_types jsonb,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_workflows OWNER TO strapi;

--
-- Name: strapi_workflows_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_workflows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_workflows_id_seq OWNER TO strapi;

--
-- Name: strapi_workflows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_workflows_id_seq OWNED BY public.strapi_workflows.id;


--
-- Name: strapi_workflows_stage_required_to_publish_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_workflows_stage_required_to_publish_lnk (
    id integer NOT NULL,
    workflow_id integer,
    workflow_stage_id integer
);


ALTER TABLE public.strapi_workflows_stage_required_to_publish_lnk OWNER TO strapi;

--
-- Name: strapi_workflows_stage_required_to_publish_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_workflows_stage_required_to_publish_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_workflows_stage_required_to_publish_lnk_id_seq OWNER TO strapi;

--
-- Name: strapi_workflows_stage_required_to_publish_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_workflows_stage_required_to_publish_lnk_id_seq OWNED BY public.strapi_workflows_stage_required_to_publish_lnk.id;


--
-- Name: strapi_workflows_stages; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_workflows_stages (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    color character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.strapi_workflows_stages OWNER TO strapi;

--
-- Name: strapi_workflows_stages_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_workflows_stages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_workflows_stages_id_seq OWNER TO strapi;

--
-- Name: strapi_workflows_stages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_workflows_stages_id_seq OWNED BY public.strapi_workflows_stages.id;


--
-- Name: strapi_workflows_stages_permissions_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_workflows_stages_permissions_lnk (
    id integer NOT NULL,
    workflow_stage_id integer,
    permission_id integer,
    permission_ord double precision
);


ALTER TABLE public.strapi_workflows_stages_permissions_lnk OWNER TO strapi;

--
-- Name: strapi_workflows_stages_permissions_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_workflows_stages_permissions_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_workflows_stages_permissions_lnk_id_seq OWNER TO strapi;

--
-- Name: strapi_workflows_stages_permissions_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_workflows_stages_permissions_lnk_id_seq OWNED BY public.strapi_workflows_stages_permissions_lnk.id;


--
-- Name: strapi_workflows_stages_workflow_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.strapi_workflows_stages_workflow_lnk (
    id integer NOT NULL,
    workflow_stage_id integer,
    workflow_id integer,
    workflow_stage_ord double precision
);


ALTER TABLE public.strapi_workflows_stages_workflow_lnk OWNER TO strapi;

--
-- Name: strapi_workflows_stages_workflow_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.strapi_workflows_stages_workflow_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_workflows_stages_workflow_lnk_id_seq OWNER TO strapi;

--
-- Name: strapi_workflows_stages_workflow_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.strapi_workflows_stages_workflow_lnk_id_seq OWNED BY public.strapi_workflows_stages_workflow_lnk.id;


--
-- Name: up_permissions; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.up_permissions (
    id integer NOT NULL,
    document_id character varying(255),
    action character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.up_permissions OWNER TO strapi;

--
-- Name: up_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.up_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.up_permissions_id_seq OWNER TO strapi;

--
-- Name: up_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.up_permissions_id_seq OWNED BY public.up_permissions.id;


--
-- Name: up_permissions_role_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.up_permissions_role_lnk (
    id integer NOT NULL,
    permission_id integer,
    role_id integer,
    permission_ord double precision
);


ALTER TABLE public.up_permissions_role_lnk OWNER TO strapi;

--
-- Name: up_permissions_role_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.up_permissions_role_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.up_permissions_role_lnk_id_seq OWNER TO strapi;

--
-- Name: up_permissions_role_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.up_permissions_role_lnk_id_seq OWNED BY public.up_permissions_role_lnk.id;


--
-- Name: up_roles; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.up_roles (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    description character varying(255),
    type character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.up_roles OWNER TO strapi;

--
-- Name: up_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.up_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.up_roles_id_seq OWNER TO strapi;

--
-- Name: up_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.up_roles_id_seq OWNED BY public.up_roles.id;


--
-- Name: up_users; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.up_users (
    id integer NOT NULL,
    document_id character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255),
    username character varying(255),
    email character varying(255),
    provider character varying(255),
    password character varying(255),
    reset_password_token character varying(255),
    confirmation_token character varying(255),
    confirmed boolean,
    blocked boolean
);


ALTER TABLE public.up_users OWNER TO strapi;

--
-- Name: up_users_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.up_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.up_users_id_seq OWNER TO strapi;

--
-- Name: up_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.up_users_id_seq OWNED BY public.up_users.id;


--
-- Name: up_users_role_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.up_users_role_lnk (
    id integer NOT NULL,
    user_id integer,
    role_id integer,
    user_ord double precision
);


ALTER TABLE public.up_users_role_lnk OWNER TO strapi;

--
-- Name: up_users_role_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.up_users_role_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.up_users_role_lnk_id_seq OWNER TO strapi;

--
-- Name: up_users_role_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.up_users_role_lnk_id_seq OWNED BY public.up_users_role_lnk.id;


--
-- Name: upload_folders; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.upload_folders (
    id integer NOT NULL,
    document_id character varying(255),
    name character varying(255),
    path_id integer,
    path character varying(255),
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    published_at timestamp(6) without time zone,
    created_by_id integer,
    updated_by_id integer,
    locale character varying(255)
);


ALTER TABLE public.upload_folders OWNER TO strapi;

--
-- Name: upload_folders_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.upload_folders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.upload_folders_id_seq OWNER TO strapi;

--
-- Name: upload_folders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.upload_folders_id_seq OWNED BY public.upload_folders.id;


--
-- Name: upload_folders_parent_lnk; Type: TABLE; Schema: public; Owner: strapi
--

CREATE TABLE public.upload_folders_parent_lnk (
    id integer NOT NULL,
    folder_id integer,
    inv_folder_id integer,
    folder_ord double precision
);


ALTER TABLE public.upload_folders_parent_lnk OWNER TO strapi;

--
-- Name: upload_folders_parent_lnk_id_seq; Type: SEQUENCE; Schema: public; Owner: strapi
--

CREATE SEQUENCE public.upload_folders_parent_lnk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.upload_folders_parent_lnk_id_seq OWNER TO strapi;

--
-- Name: upload_folders_parent_lnk_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: strapi
--

ALTER SEQUENCE public.upload_folders_parent_lnk_id_seq OWNED BY public.upload_folders_parent_lnk.id;


--
-- Name: admin_permissions id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_permissions ALTER COLUMN id SET DEFAULT nextval('public.admin_permissions_id_seq'::regclass);


--
-- Name: admin_permissions_role_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_permissions_role_lnk ALTER COLUMN id SET DEFAULT nextval('public.admin_permissions_role_lnk_id_seq'::regclass);


--
-- Name: admin_roles id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_roles ALTER COLUMN id SET DEFAULT nextval('public.admin_roles_id_seq'::regclass);


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: admin_users_roles_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_users_roles_lnk ALTER COLUMN id SET DEFAULT nextval('public.admin_users_roles_lnk_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: files_folder_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files_folder_lnk ALTER COLUMN id SET DEFAULT nextval('public.files_folder_lnk_id_seq'::regclass);


--
-- Name: files_related_mph id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files_related_mph ALTER COLUMN id SET DEFAULT nextval('public.files_related_mph_id_seq'::regclass);


--
-- Name: i18n_locale id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.i18n_locale ALTER COLUMN id SET DEFAULT nextval('public.i18n_locale_id_seq'::regclass);


--
-- Name: imoveis id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.imoveis ALTER COLUMN id SET DEFAULT nextval('public.imoveis_id_seq'::regclass);


--
-- Name: imoveis_usuario_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.imoveis_usuario_lnk ALTER COLUMN id SET DEFAULT nextval('public.imoveis_usuario_lnk_id_seq'::regclass);


--
-- Name: noticias id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.noticias ALTER COLUMN id SET DEFAULT nextval('public.noticias_id_seq'::regclass);


--
-- Name: strapi_ai_localization_jobs id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_ai_localization_jobs ALTER COLUMN id SET DEFAULT nextval('public.strapi_ai_localization_jobs_id_seq'::regclass);


--
-- Name: strapi_api_token_permissions id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_token_permissions ALTER COLUMN id SET DEFAULT nextval('public.strapi_api_token_permissions_id_seq'::regclass);


--
-- Name: strapi_api_token_permissions_token_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_token_permissions_token_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_api_token_permissions_token_lnk_id_seq'::regclass);


--
-- Name: strapi_api_tokens id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_tokens ALTER COLUMN id SET DEFAULT nextval('public.strapi_api_tokens_id_seq'::regclass);


--
-- Name: strapi_audit_logs id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_audit_logs ALTER COLUMN id SET DEFAULT nextval('public.strapi_audit_logs_id_seq'::regclass);


--
-- Name: strapi_audit_logs_user_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_audit_logs_user_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_audit_logs_user_lnk_id_seq'::regclass);


--
-- Name: strapi_core_store_settings id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_core_store_settings ALTER COLUMN id SET DEFAULT nextval('public.strapi_core_store_settings_id_seq'::regclass);


--
-- Name: strapi_database_schema id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_database_schema ALTER COLUMN id SET DEFAULT nextval('public.strapi_database_schema_id_seq'::regclass);


--
-- Name: strapi_history_versions id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_history_versions ALTER COLUMN id SET DEFAULT nextval('public.strapi_history_versions_id_seq'::regclass);


--
-- Name: strapi_migrations id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_migrations ALTER COLUMN id SET DEFAULT nextval('public.strapi_migrations_id_seq'::regclass);


--
-- Name: strapi_migrations_internal id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_migrations_internal ALTER COLUMN id SET DEFAULT nextval('public.strapi_migrations_internal_id_seq'::regclass);


--
-- Name: strapi_release_actions id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_release_actions ALTER COLUMN id SET DEFAULT nextval('public.strapi_release_actions_id_seq'::regclass);


--
-- Name: strapi_release_actions_release_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_release_actions_release_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_release_actions_release_lnk_id_seq'::regclass);


--
-- Name: strapi_releases id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_releases ALTER COLUMN id SET DEFAULT nextval('public.strapi_releases_id_seq'::regclass);


--
-- Name: strapi_sessions id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_sessions ALTER COLUMN id SET DEFAULT nextval('public.strapi_sessions_id_seq'::regclass);


--
-- Name: strapi_transfer_token_permissions id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions ALTER COLUMN id SET DEFAULT nextval('public.strapi_transfer_token_permissions_id_seq'::regclass);


--
-- Name: strapi_transfer_token_permissions_token_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_transfer_token_permissions_token_lnk_id_seq'::regclass);


--
-- Name: strapi_transfer_tokens id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_tokens ALTER COLUMN id SET DEFAULT nextval('public.strapi_transfer_tokens_id_seq'::regclass);


--
-- Name: strapi_webhooks id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_webhooks ALTER COLUMN id SET DEFAULT nextval('public.strapi_webhooks_id_seq'::regclass);


--
-- Name: strapi_workflows id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows ALTER COLUMN id SET DEFAULT nextval('public.strapi_workflows_id_seq'::regclass);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stage_required_to_publish_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_workflows_stage_required_to_publish_lnk_id_seq'::regclass);


--
-- Name: strapi_workflows_stages id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages ALTER COLUMN id SET DEFAULT nextval('public.strapi_workflows_stages_id_seq'::regclass);


--
-- Name: strapi_workflows_stages_permissions_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages_permissions_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_workflows_stages_permissions_lnk_id_seq'::regclass);


--
-- Name: strapi_workflows_stages_workflow_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages_workflow_lnk ALTER COLUMN id SET DEFAULT nextval('public.strapi_workflows_stages_workflow_lnk_id_seq'::regclass);


--
-- Name: up_permissions id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_permissions ALTER COLUMN id SET DEFAULT nextval('public.up_permissions_id_seq'::regclass);


--
-- Name: up_permissions_role_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_permissions_role_lnk ALTER COLUMN id SET DEFAULT nextval('public.up_permissions_role_lnk_id_seq'::regclass);


--
-- Name: up_roles id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_roles ALTER COLUMN id SET DEFAULT nextval('public.up_roles_id_seq'::regclass);


--
-- Name: up_users id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_users ALTER COLUMN id SET DEFAULT nextval('public.up_users_id_seq'::regclass);


--
-- Name: up_users_role_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_users_role_lnk ALTER COLUMN id SET DEFAULT nextval('public.up_users_role_lnk_id_seq'::regclass);


--
-- Name: upload_folders id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.upload_folders ALTER COLUMN id SET DEFAULT nextval('public.upload_folders_id_seq'::regclass);


--
-- Name: upload_folders_parent_lnk id; Type: DEFAULT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.upload_folders_parent_lnk ALTER COLUMN id SET DEFAULT nextval('public.upload_folders_parent_lnk_id_seq'::regclass);


--
-- Data for Name: admin_permissions; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.admin_permissions (id, document_id, action, action_parameters, subject, properties, conditions, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
4	t34nj9kd7i9abk8bn4tk7uvv	plugin::content-manager.explorer.delete	{}	api::imovel.imovel	{}	[]	2026-01-25 17:24:07.792	2026-01-25 17:24:07.792	2026-01-25 17:24:07.792	\N	\N	\N
5	uuhr3sskiwagui0x1iu71tu3	plugin::content-manager.explorer.publish	{}	api::imovel.imovel	{}	[]	2026-01-25 17:24:07.793	2026-01-25 17:24:07.793	2026-01-25 17:24:07.793	\N	\N	\N
6	w9ogyejrgbo4zvds70txawwv	plugin::upload.read	{}	\N	{}	[]	2026-01-25 17:24:07.794	2026-01-25 17:24:07.794	2026-01-25 17:24:07.794	\N	\N	\N
7	i051069m46u552a4kpg4igjy	plugin::upload.configure-view	{}	\N	{}	[]	2026-01-25 17:24:07.795	2026-01-25 17:24:07.795	2026-01-25 17:24:07.795	\N	\N	\N
8	c2ldlh4hjzgag1ii3us8lkaq	plugin::upload.assets.create	{}	\N	{}	[]	2026-01-25 17:24:07.796	2026-01-25 17:24:07.796	2026-01-25 17:24:07.796	\N	\N	\N
9	zeddkqhz7cdye671gb334gm7	plugin::upload.assets.update	{}	\N	{}	[]	2026-01-25 17:24:07.797	2026-01-25 17:24:07.797	2026-01-25 17:24:07.797	\N	\N	\N
10	b1yts0b16ogk2yr1zfqxl98p	plugin::upload.assets.download	{}	\N	{}	[]	2026-01-25 17:24:07.798	2026-01-25 17:24:07.798	2026-01-25 17:24:07.798	\N	\N	\N
11	sseu4n9wrqmnj2eq8bgh1yno	plugin::upload.assets.copy-link	{}	\N	{}	[]	2026-01-25 17:24:07.799	2026-01-25 17:24:07.799	2026-01-25 17:24:07.799	\N	\N	\N
15	cvai4l83ssh37qx6v9nlg96c	plugin::content-manager.explorer.delete	{}	api::imovel.imovel	{}	["admin::is-creator"]	2026-01-25 17:24:07.803	2026-01-25 17:24:07.803	2026-01-25 17:24:07.803	\N	\N	\N
16	r1cs1vbg431ptsohp0mbk287	plugin::upload.read	{}	\N	{}	["admin::is-creator"]	2026-01-25 17:24:07.804	2026-01-25 17:24:07.804	2026-01-25 17:24:07.804	\N	\N	\N
17	zp78q47hh2qfoyb29819akku	plugin::upload.configure-view	{}	\N	{}	[]	2026-01-25 17:24:07.805	2026-01-25 17:24:07.805	2026-01-25 17:24:07.805	\N	\N	\N
18	anvjn9lj6qsidfaowvnm8tgp	plugin::upload.assets.create	{}	\N	{}	[]	2026-01-25 17:24:07.806	2026-01-25 17:24:07.806	2026-01-25 17:24:07.806	\N	\N	\N
19	gjb4tbcqqkwkpv93553k1x3u	plugin::upload.assets.update	{}	\N	{}	["admin::is-creator"]	2026-01-25 17:24:07.807	2026-01-25 17:24:07.807	2026-01-25 17:24:07.807	\N	\N	\N
20	by92lkka7isgq6pmkwak0au0	plugin::upload.assets.download	{}	\N	{}	[]	2026-01-25 17:24:07.807	2026-01-25 17:24:07.807	2026-01-25 17:24:07.807	\N	\N	\N
21	sm8o3wuxcvraj31lq2qr6f7h	plugin::upload.assets.copy-link	{}	\N	{}	[]	2026-01-25 17:24:07.808	2026-01-25 17:24:07.808	2026-01-25 17:24:07.808	\N	\N	\N
28	oeqjrxudfeikkv1i8hw60nvl	plugin::content-manager.explorer.delete	{}	api::imovel.imovel	{}	[]	2026-01-25 17:24:07.823	2026-01-25 17:24:07.823	2026-01-25 17:24:07.823	\N	\N	\N
29	xbhcvvr3c9blcc0uv42pzpfp	plugin::content-manager.explorer.delete	{}	plugin::users-permissions.user	{}	[]	2026-01-25 17:24:07.824	2026-01-25 17:24:07.824	2026-01-25 17:24:07.824	\N	\N	\N
30	ztxlhc2x4qyhix0e7zp7vy2x	plugin::content-manager.explorer.publish	{}	api::imovel.imovel	{}	[]	2026-01-25 17:24:07.824	2026-01-25 17:24:07.824	2026-01-25 17:24:07.824	\N	\N	\N
31	w2bbda476nkg28u3c1wqupew	plugin::content-manager.explorer.publish	{}	plugin::users-permissions.user	{}	[]	2026-01-25 17:24:07.825	2026-01-25 17:24:07.825	2026-01-25 17:24:07.825	\N	\N	\N
32	dy3avfaw2olxvv58kib9bmw9	plugin::content-releases.read	{}	\N	{}	[]	2026-01-25 17:24:07.826	2026-01-25 17:24:07.826	2026-01-25 17:24:07.826	\N	\N	\N
33	q56jkeomovab0corndd8lyrn	plugin::content-releases.create	{}	\N	{}	[]	2026-01-25 17:24:07.827	2026-01-25 17:24:07.827	2026-01-25 17:24:07.827	\N	\N	\N
34	q9ivv9veutuiy4vt92r7hirh	plugin::content-releases.update	{}	\N	{}	[]	2026-01-25 17:24:07.828	2026-01-25 17:24:07.828	2026-01-25 17:24:07.828	\N	\N	\N
35	i2ou8fyvfkqba0nq3gz5u2kb	plugin::content-releases.delete	{}	\N	{}	[]	2026-01-25 17:24:07.829	2026-01-25 17:24:07.829	2026-01-25 17:24:07.829	\N	\N	\N
36	i1wgljgimwv604y7u91p8h2k	plugin::content-releases.publish	{}	\N	{}	[]	2026-01-25 17:24:07.83	2026-01-25 17:24:07.83	2026-01-25 17:24:07.83	\N	\N	\N
37	wcilakfbdnshdcmnufqhuw6y	plugin::content-releases.delete-action	{}	\N	{}	[]	2026-01-25 17:24:07.83	2026-01-25 17:24:07.83	2026-01-25 17:24:07.831	\N	\N	\N
38	h17ty3zhdfcxvx4iakvxhd3g	plugin::content-releases.create-action	{}	\N	{}	[]	2026-01-25 17:24:07.831	2026-01-25 17:24:07.831	2026-01-25 17:24:07.831	\N	\N	\N
39	mpvercicoymzyr5faz48dr7z	plugin::content-releases.settings.read	{}	\N	{}	[]	2026-01-25 17:24:07.832	2026-01-25 17:24:07.832	2026-01-25 17:24:07.832	\N	\N	\N
40	la102fb4sk3ddo1zc9j9od51	plugin::content-releases.settings.update	{}	\N	{}	[]	2026-01-25 17:24:07.833	2026-01-25 17:24:07.833	2026-01-25 17:24:07.833	\N	\N	\N
41	mifydqw89jur94hxpbartzhi	plugin::content-manager.single-types.configure-view	{}	\N	{}	[]	2026-01-25 17:24:07.834	2026-01-25 17:24:07.834	2026-01-25 17:24:07.834	\N	\N	\N
42	yqsjz0lrdvxbp236hcureqwd	plugin::content-manager.collection-types.configure-view	{}	\N	{}	[]	2026-01-25 17:24:07.835	2026-01-25 17:24:07.835	2026-01-25 17:24:07.835	\N	\N	\N
43	qgk47fykkml64j2ceq1cy3go	plugin::content-manager.components.configure-layout	{}	\N	{}	[]	2026-01-25 17:24:07.836	2026-01-25 17:24:07.836	2026-01-25 17:24:07.836	\N	\N	\N
44	hr0gg1mazrohka3j5guu0fq6	plugin::content-type-builder.read	{}	\N	{}	[]	2026-01-25 17:24:07.836	2026-01-25 17:24:07.836	2026-01-25 17:24:07.836	\N	\N	\N
1	hhh4w98voqhy6oh6lmxvbipc	plugin::content-manager.explorer.create	{}	api::imovel.imovel	{"fields": ["titulo", "descricao", "tamanho", "quartos", "banheiros", "bairro", "preco", "fotos"]}	[]	2026-01-25 17:24:07.787	2026-02-23 18:30:43.367	2026-01-25 17:24:07.787	\N	\N	\N
3	p4t4lfv6c17x6n4vpxu3rxjq	plugin::content-manager.explorer.update	{}	api::imovel.imovel	{"fields": ["titulo", "descricao", "tamanho", "quartos", "banheiros", "bairro", "preco", "fotos"]}	[]	2026-01-25 17:24:07.791	2026-02-23 18:30:43.367	2026-01-25 17:24:07.791	\N	\N	\N
13	kqkxf6b9vi64pt0uvbh1jt5k	plugin::content-manager.explorer.read	{}	api::imovel.imovel	{"fields": ["titulo", "descricao", "tamanho", "quartos", "banheiros", "bairro", "preco", "fotos"]}	["admin::is-creator"]	2026-01-25 17:24:07.801	2026-02-23 18:30:43.367	2026-01-25 17:24:07.801	\N	\N	\N
2	l9r9fbquxr65ogdt0d662zsc	plugin::content-manager.explorer.read	{}	api::imovel.imovel	{"fields": ["titulo", "descricao", "tamanho", "quartos", "banheiros", "bairro", "preco", "fotos"]}	[]	2026-01-25 17:24:07.789	2026-02-23 18:30:43.367	2026-01-25 17:24:07.789	\N	\N	\N
12	bi3rh0bixnjq8whwb89unz7n	plugin::content-manager.explorer.create	{}	api::imovel.imovel	{"fields": ["titulo", "descricao", "tamanho", "quartos", "banheiros", "bairro", "preco", "fotos"]}	["admin::is-creator"]	2026-01-25 17:24:07.8	2026-02-23 18:30:43.367	2026-01-25 17:24:07.8	\N	\N	\N
45	eijtomzmga88qvbn4g1imsaw	plugin::email.settings.read	{}	\N	{}	[]	2026-01-25 17:24:07.837	2026-01-25 17:24:07.837	2026-01-25 17:24:07.837	\N	\N	\N
46	dtyy3ergs876ivg1xtrj0eon	plugin::upload.read	{}	\N	{}	[]	2026-01-25 17:24:07.838	2026-01-25 17:24:07.838	2026-01-25 17:24:07.838	\N	\N	\N
47	gih17t9ac4cxznbnxfvfnull	plugin::upload.assets.create	{}	\N	{}	[]	2026-01-25 17:24:07.839	2026-01-25 17:24:07.839	2026-01-25 17:24:07.839	\N	\N	\N
48	u1s7uggdzs6u7ve9wy504m6a	plugin::upload.assets.update	{}	\N	{}	[]	2026-01-25 17:24:07.84	2026-01-25 17:24:07.84	2026-01-25 17:24:07.84	\N	\N	\N
49	jvd0vd0a0iytpb8y3uandjxx	plugin::upload.assets.download	{}	\N	{}	[]	2026-01-25 17:24:07.841	2026-01-25 17:24:07.841	2026-01-25 17:24:07.841	\N	\N	\N
50	nwett823fqqp1hqqf0xub825	plugin::upload.assets.copy-link	{}	\N	{}	[]	2026-01-25 17:24:07.842	2026-01-25 17:24:07.842	2026-01-25 17:24:07.842	\N	\N	\N
51	kcafp0jmk2rkhfiky1k5nsov	plugin::upload.configure-view	{}	\N	{}	[]	2026-01-25 17:24:07.843	2026-01-25 17:24:07.843	2026-01-25 17:24:07.843	\N	\N	\N
52	iheegwa1cnc7q2yvm3xhg286	plugin::upload.settings.read	{}	\N	{}	[]	2026-01-25 17:24:07.844	2026-01-25 17:24:07.844	2026-01-25 17:24:07.844	\N	\N	\N
53	pzb1w7bimgqtl7hwxgultpmp	plugin::i18n.locale.create	{}	\N	{}	[]	2026-01-25 17:24:07.844	2026-01-25 17:24:07.844	2026-01-25 17:24:07.844	\N	\N	\N
54	ehr0kc49phpjki1ktmmbn8dc	plugin::i18n.locale.read	{}	\N	{}	[]	2026-01-25 17:24:07.845	2026-01-25 17:24:07.845	2026-01-25 17:24:07.845	\N	\N	\N
55	r0ae6ty1ca2ou5ytumem6tz4	plugin::i18n.locale.update	{}	\N	{}	[]	2026-01-25 17:24:07.846	2026-01-25 17:24:07.846	2026-01-25 17:24:07.846	\N	\N	\N
56	cwfgl75tat7ed9iq4tcyjnzx	plugin::i18n.locale.delete	{}	\N	{}	[]	2026-01-25 17:24:07.847	2026-01-25 17:24:07.847	2026-01-25 17:24:07.847	\N	\N	\N
57	pcnkvzh5sjnifnz1hbscoows	plugin::users-permissions.roles.create	{}	\N	{}	[]	2026-01-25 17:24:07.848	2026-01-25 17:24:07.848	2026-01-25 17:24:07.848	\N	\N	\N
58	zd9qj9ysvku8yaeb557e6puq	plugin::users-permissions.roles.read	{}	\N	{}	[]	2026-01-25 17:24:07.849	2026-01-25 17:24:07.849	2026-01-25 17:24:07.849	\N	\N	\N
59	z557tygy1bjgxzc6l566yds9	plugin::users-permissions.roles.update	{}	\N	{}	[]	2026-01-25 17:24:07.849	2026-01-25 17:24:07.849	2026-01-25 17:24:07.849	\N	\N	\N
60	scdufc7pxkixru3be0dpnn2o	plugin::users-permissions.roles.delete	{}	\N	{}	[]	2026-01-25 17:24:07.85	2026-01-25 17:24:07.85	2026-01-25 17:24:07.85	\N	\N	\N
61	t02r74eqqus0sv737p5mif6f	plugin::users-permissions.providers.read	{}	\N	{}	[]	2026-01-25 17:24:07.851	2026-01-25 17:24:07.851	2026-01-25 17:24:07.851	\N	\N	\N
62	sroj7i8sm3fjtguy70wp49tz	plugin::users-permissions.providers.update	{}	\N	{}	[]	2026-01-25 17:24:07.852	2026-01-25 17:24:07.852	2026-01-25 17:24:07.852	\N	\N	\N
63	bwloblnawxcb0ann5mevrrol	plugin::users-permissions.email-templates.read	{}	\N	{}	[]	2026-01-25 17:24:07.853	2026-01-25 17:24:07.853	2026-01-25 17:24:07.853	\N	\N	\N
64	akubcnage4yg30a4d75jngjn	plugin::users-permissions.email-templates.update	{}	\N	{}	[]	2026-01-25 17:24:07.854	2026-01-25 17:24:07.854	2026-01-25 17:24:07.854	\N	\N	\N
65	rfastyzjvpxy0itbfodqvlns	plugin::users-permissions.advanced-settings.read	{}	\N	{}	[]	2026-01-25 17:24:07.855	2026-01-25 17:24:07.855	2026-01-25 17:24:07.855	\N	\N	\N
66	jilzzeyqco4e3i85vpeyrtzq	plugin::users-permissions.advanced-settings.update	{}	\N	{}	[]	2026-01-25 17:24:07.856	2026-01-25 17:24:07.856	2026-01-25 17:24:07.856	\N	\N	\N
67	bw2vs0sc47y7fy689b20dmoi	admin::marketplace.read	{}	\N	{}	[]	2026-01-25 17:24:07.857	2026-01-25 17:24:07.857	2026-01-25 17:24:07.857	\N	\N	\N
68	xmsbuts9b27fcbbkwvfk4eta	admin::webhooks.create	{}	\N	{}	[]	2026-01-25 17:24:07.858	2026-01-25 17:24:07.858	2026-01-25 17:24:07.858	\N	\N	\N
69	wel1iklerb2c80cx4bowa6vk	admin::webhooks.read	{}	\N	{}	[]	2026-01-25 17:24:07.859	2026-01-25 17:24:07.859	2026-01-25 17:24:07.859	\N	\N	\N
70	aeo8sywed3c4wcc3ubgs3n85	admin::webhooks.update	{}	\N	{}	[]	2026-01-25 17:24:07.86	2026-01-25 17:24:07.86	2026-01-25 17:24:07.86	\N	\N	\N
71	kk39ngwmht9uvj63o4xyvcfj	admin::webhooks.delete	{}	\N	{}	[]	2026-01-25 17:24:07.86	2026-01-25 17:24:07.86	2026-01-25 17:24:07.86	\N	\N	\N
72	yud086uw8aq1asyspdw2a8d4	admin::users.create	{}	\N	{}	[]	2026-01-25 17:24:07.861	2026-01-25 17:24:07.861	2026-01-25 17:24:07.861	\N	\N	\N
73	gakoh85lm9fqncs1palkoghw	admin::users.read	{}	\N	{}	[]	2026-01-25 17:24:07.862	2026-01-25 17:24:07.862	2026-01-25 17:24:07.862	\N	\N	\N
74	lnp6l36x3nsflcfcj9pm6yo1	admin::users.update	{}	\N	{}	[]	2026-01-25 17:24:07.863	2026-01-25 17:24:07.863	2026-01-25 17:24:07.863	\N	\N	\N
75	iscav9oiqaozk6yvkrpusu89	admin::users.delete	{}	\N	{}	[]	2026-01-25 17:24:07.863	2026-01-25 17:24:07.863	2026-01-25 17:24:07.863	\N	\N	\N
76	s5hho2exr1k8trufmcg7ecum	admin::roles.create	{}	\N	{}	[]	2026-01-25 17:24:07.864	2026-01-25 17:24:07.864	2026-01-25 17:24:07.864	\N	\N	\N
77	rz3cpd0zeq18ldrnskdzgksm	admin::roles.read	{}	\N	{}	[]	2026-01-25 17:24:07.865	2026-01-25 17:24:07.865	2026-01-25 17:24:07.865	\N	\N	\N
78	yo9g1so7wdwmf6uy1bo7m54u	admin::roles.update	{}	\N	{}	[]	2026-01-25 17:24:07.866	2026-01-25 17:24:07.866	2026-01-25 17:24:07.866	\N	\N	\N
79	yjkigo6sgn8pr9211ybdydut	admin::roles.delete	{}	\N	{}	[]	2026-01-25 17:24:07.867	2026-01-25 17:24:07.867	2026-01-25 17:24:07.867	\N	\N	\N
80	tale2srz3577b9paoemwsng9	admin::api-tokens.access	{}	\N	{}	[]	2026-01-25 17:24:07.867	2026-01-25 17:24:07.867	2026-01-25 17:24:07.868	\N	\N	\N
81	ihxz0bpddyt9npw2vvl3gzc1	admin::api-tokens.create	{}	\N	{}	[]	2026-01-25 17:24:07.868	2026-01-25 17:24:07.868	2026-01-25 17:24:07.868	\N	\N	\N
82	bj59jw154pspkz8wjkbbplj7	admin::api-tokens.read	{}	\N	{}	[]	2026-01-25 17:24:07.869	2026-01-25 17:24:07.869	2026-01-25 17:24:07.869	\N	\N	\N
83	cacgqb4fl9jib0nq1yb4qtlb	admin::api-tokens.update	{}	\N	{}	[]	2026-01-25 17:24:07.87	2026-01-25 17:24:07.87	2026-01-25 17:24:07.87	\N	\N	\N
84	cb4w664u4asdcsv57p0e64jm	admin::api-tokens.regenerate	{}	\N	{}	[]	2026-01-25 17:24:07.871	2026-01-25 17:24:07.871	2026-01-25 17:24:07.871	\N	\N	\N
85	dk7yucp9uz7r51aywmqskh4q	admin::api-tokens.delete	{}	\N	{}	[]	2026-01-25 17:24:07.871	2026-01-25 17:24:07.871	2026-01-25 17:24:07.871	\N	\N	\N
86	kpi9fz9sl273etsqqnbpas01	admin::project-settings.update	{}	\N	{}	[]	2026-01-25 17:24:07.872	2026-01-25 17:24:07.872	2026-01-25 17:24:07.872	\N	\N	\N
87	aq7ysaj9n45jqjvvhofy29r6	admin::project-settings.read	{}	\N	{}	[]	2026-01-25 17:24:07.873	2026-01-25 17:24:07.873	2026-01-25 17:24:07.873	\N	\N	\N
88	ea6a4jd0uxjwjujtnsgtc0i6	admin::transfer.tokens.access	{}	\N	{}	[]	2026-01-25 17:24:07.874	2026-01-25 17:24:07.874	2026-01-25 17:24:07.874	\N	\N	\N
89	yfkok3w1s2ktdmvq4zc1587h	admin::transfer.tokens.create	{}	\N	{}	[]	2026-01-25 17:24:07.874	2026-01-25 17:24:07.874	2026-01-25 17:24:07.874	\N	\N	\N
90	miavrs7o8r7y7tazks6kjam7	admin::transfer.tokens.read	{}	\N	{}	[]	2026-01-25 17:24:07.875	2026-01-25 17:24:07.875	2026-01-25 17:24:07.875	\N	\N	\N
91	ip1ar0o3rckuq0mm4vj61xj5	admin::transfer.tokens.update	{}	\N	{}	[]	2026-01-25 17:24:07.876	2026-01-25 17:24:07.876	2026-01-25 17:24:07.876	\N	\N	\N
92	ea063wtedeokabzalaqbb8xz	admin::transfer.tokens.regenerate	{}	\N	{}	[]	2026-01-25 17:24:07.877	2026-01-25 17:24:07.877	2026-01-25 17:24:07.877	\N	\N	\N
93	eif9l74ypqx00yp4x16qvbzi	admin::transfer.tokens.delete	{}	\N	{}	[]	2026-01-25 17:24:07.878	2026-01-25 17:24:07.878	2026-01-25 17:24:07.878	\N	\N	\N
99	hbc9rhef5pxofpi29f94r94l	plugin::content-manager.explorer.create	{}	plugin::users-permissions.user	{"fields": ["username", "email", "provider", "password", "resetPasswordToken", "confirmationToken", "confirmed", "blocked", "role"]}	[]	2026-01-26 13:49:31.785	2026-01-26 13:49:31.785	2026-01-26 13:49:31.786	\N	\N	\N
100	aiolbe12mkwubbitsqp6t70r	plugin::content-manager.explorer.read	{}	plugin::users-permissions.user	{"fields": ["username", "email", "provider", "password", "resetPasswordToken", "confirmationToken", "confirmed", "blocked", "role"]}	[]	2026-01-26 13:49:31.798	2026-01-26 13:49:31.798	2026-01-26 13:49:31.798	\N	\N	\N
101	e6g3q7xi2d1w1xo2kyr9c99y	plugin::content-manager.explorer.update	{}	plugin::users-permissions.user	{"fields": ["username", "email", "provider", "password", "resetPasswordToken", "confirmationToken", "confirmed", "blocked", "role"]}	[]	2026-01-26 13:49:31.802	2026-01-26 13:49:31.802	2026-01-26 13:49:31.802	\N	\N	\N
118	riben0rmjsfn7nu46acwkla3	plugin::content-manager.explorer.create	{}	api::noticia.noticia	{"fields": ["titulo", "resumo", "link", "conteudo", "categoria", "data", "imagem"]}	[]	2026-02-10 12:56:37.593	2026-02-10 12:56:37.593	2026-02-10 12:56:37.594	\N	\N	\N
120	i3b1yhi4fmoczj22hpb6hc7w	plugin::content-manager.explorer.read	{}	api::noticia.noticia	{"fields": ["titulo", "resumo", "link", "conteudo", "categoria", "data", "imagem"]}	[]	2026-02-10 12:56:37.604	2026-02-10 12:56:37.604	2026-02-10 12:56:37.606	\N	\N	\N
122	q5f1hr14e7hnd41bdxoyofed	plugin::content-manager.explorer.update	{}	api::noticia.noticia	{"fields": ["titulo", "resumo", "link", "conteudo", "categoria", "data", "imagem"]}	[]	2026-02-10 12:56:37.616	2026-02-10 12:56:37.616	2026-02-10 12:56:37.617	\N	\N	\N
123	lpk0hdjejvwtjbyrl5og708r	plugin::content-manager.explorer.delete	{}	api::noticia.noticia	{}	[]	2026-02-10 12:56:37.623	2026-02-10 12:56:37.623	2026-02-10 12:56:37.623	\N	\N	\N
124	c3i05kssbd0o0tabl4vnel9y	plugin::content-manager.explorer.publish	{}	api::noticia.noticia	{}	[]	2026-02-10 12:56:37.628	2026-02-10 12:56:37.628	2026-02-10 12:56:37.629	\N	\N	\N
137	ieq950qchzsmkxu1d0p8i6kr	plugin::content-manager.explorer.create	{}	api::imovel.imovel	{"fields": ["titulo", "descricao", "tamanho", "area_total", "condominio", "iptu", "quartos", "banheiros", "bairro", "cidade", "preco", "finalidade", "endereco", "latitude", "longitude", "tipo", "fotos", "usuario", "caracteristicas"]}	[]	2026-02-23 18:30:43.311	2026-02-23 18:30:43.311	2026-02-23 18:30:43.312	\N	\N	\N
138	l7zoqiak8m5bb66btnvrql10	plugin::content-manager.explorer.read	{}	api::imovel.imovel	{"fields": ["titulo", "descricao", "tamanho", "area_total", "condominio", "iptu", "quartos", "banheiros", "bairro", "cidade", "preco", "finalidade", "endereco", "latitude", "longitude", "tipo", "fotos", "usuario", "caracteristicas"]}	[]	2026-02-23 18:30:43.322	2026-02-23 18:30:43.322	2026-02-23 18:30:43.322	\N	\N	\N
139	bi20uqokfp9x2f7xld4fl3tr	plugin::content-manager.explorer.update	{}	api::imovel.imovel	{"fields": ["titulo", "descricao", "tamanho", "area_total", "condominio", "iptu", "quartos", "banheiros", "bairro", "cidade", "preco", "finalidade", "endereco", "latitude", "longitude", "tipo", "fotos", "usuario", "caracteristicas"]}	[]	2026-02-23 18:30:43.327	2026-02-23 18:30:43.327	2026-02-23 18:30:43.327	\N	\N	\N
14	gptt71okczfianj2kzxb8czs	plugin::content-manager.explorer.update	{}	api::imovel.imovel	{"fields": ["titulo", "descricao", "tamanho", "quartos", "banheiros", "bairro", "preco", "fotos"]}	["admin::is-creator"]	2026-01-25 17:24:07.802	2026-02-23 18:30:43.367	2026-01-25 17:24:07.802	\N	\N	\N
\.


--
-- Data for Name: admin_permissions_role_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.admin_permissions_role_lnk (id, permission_id, role_id, permission_ord) FROM stdin;
1	1	2	1
2	2	2	2
3	3	2	3
4	4	2	4
5	5	2	5
6	6	2	6
7	7	2	7
8	8	2	8
9	9	2	9
10	10	2	10
11	11	2	11
12	12	3	1
13	13	3	2
14	14	3	3
15	15	3	4
16	16	3	5
17	17	3	6
18	18	3	7
19	19	3	8
20	20	3	9
21	21	3	10
28	28	1	7
29	29	1	8
30	30	1	9
31	31	1	10
32	32	1	11
33	33	1	12
34	34	1	13
35	35	1	14
36	36	1	15
37	37	1	16
38	38	1	17
39	39	1	18
40	40	1	19
41	41	1	20
42	42	1	21
43	43	1	22
44	44	1	23
45	45	1	24
46	46	1	25
47	47	1	26
48	48	1	27
49	49	1	28
50	50	1	29
51	51	1	30
52	52	1	31
53	53	1	32
54	54	1	33
55	55	1	34
56	56	1	35
57	57	1	36
58	58	1	37
59	59	1	38
60	60	1	39
61	61	1	40
62	62	1	41
63	63	1	42
64	64	1	43
65	65	1	44
66	66	1	45
67	67	1	46
68	68	1	47
69	69	1	48
70	70	1	49
71	71	1	50
72	72	1	51
73	73	1	52
74	74	1	53
75	75	1	54
76	76	1	55
77	77	1	56
78	78	1	57
79	79	1	58
80	80	1	59
81	81	1	60
82	82	1	61
83	83	1	62
84	84	1	63
85	85	1	64
86	86	1	65
87	87	1	66
88	88	1	67
89	89	1	68
90	90	1	69
91	91	1	70
92	92	1	71
93	93	1	72
99	99	1	75
100	100	1	76
101	101	1	77
118	118	1	79
120	120	1	81
122	122	1	83
123	123	1	84
124	124	1	85
137	137	1	86
138	138	1	87
139	139	1	88
\.


--
-- Data for Name: admin_roles; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.admin_roles (id, document_id, name, code, description, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	b8g7yokbn8vubs1h3p4bfi17	Super Admin	strapi-super-admin	Super Admins can access and manage all features and settings.	2026-01-25 17:24:07.781	2026-01-25 17:24:07.781	2026-01-25 17:24:07.781	\N	\N	\N
2	pmf2bddnne5taud146jo3sab	Editor	strapi-editor	Editors can manage and publish contents including those of other users.	2026-01-25 17:24:07.785	2026-01-25 17:24:07.785	2026-01-25 17:24:07.785	\N	\N	\N
3	muwdf2hx4iy0af17f2rio205	Author	strapi-author	Authors can manage the content they have created.	2026-01-25 17:24:07.786	2026-01-25 17:24:07.786	2026-01-25 17:24:07.786	\N	\N	\N
\.


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.admin_users (id, document_id, firstname, lastname, username, email, password, reset_password_token, registration_token, is_active, blocked, prefered_language, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
2	sinzpnl8u5zo5s0tsm5v7aq2	Admin	User	\N	admin@aluguenahora.com	$2a$10$e7Fo3ykZm2KQ64GOXQZc8eu0WKsYZmQIgDToXe2Ifj.VJwWXXNjQu	\N	\N	t	f	\N	2026-01-30 13:39:55.598	2026-01-30 13:39:55.598	2026-01-30 13:39:55.598	\N	\N	\N
1	wfpvob7j9e8h5cqj38nsei5r	Leonardo	Silva Pavao	\N	pavaoleonardo@hotmail.com	$2a$10$YU9.Y.YGV4Gqp2ApbxQcz.IGdomI5aeTbNpILKGtRxWGXOcKHG2lK	b6f15f4dadb8fb8624b5fb6c8f7bcd5b60a69d1d	\N	t	f	pt-BR	2026-01-25 17:32:57.248	2026-01-30 13:48:07.63	2026-01-25 17:32:57.248	\N	\N	\N
3	ecaj66zzhjldutcm3f255zaf	Admin	User	\N	admin2@aluguenahora.com	$2a$10$bm8nFJXR9.uzwt75KeOtd.8eQ8ISL44kdl2171UpPKFzi.piIRXe2	\N	\N	t	f	pt-BR	2026-01-31 11:01:07.406	2026-01-31 11:49:41.78	2026-01-31 11:01:07.406	\N	\N	\N
\.


--
-- Data for Name: admin_users_roles_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.admin_users_roles_lnk (id, user_id, role_id, role_ord, user_ord) FROM stdin;
1	1	1	1	1
2	2	1	1	2
3	3	1	1	3
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.files (id, document_id, name, alternative_text, caption, width, height, formats, hash, ext, mime, size, url, preview_url, provider, provider_metadata, folder_path, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	xl2mu7hnz4enm7qqheyomzbz	apto.jpg	\N	\N	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769625306/large_apto_3db5d6bab9.jpg", "hash": "large_apto_3db5d6bab9", "mime": "image/jpeg", "name": "large_apto.jpg", "path": null, "size": 167.74, "width": 1000, "height": 750, "sizeInBytes": 167735, "provider_metadata": {"public_id": "large_apto_3db5d6bab9", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769625306/small_apto_3db5d6bab9.jpg", "hash": "small_apto_3db5d6bab9", "mime": "image/jpeg", "name": "small_apto.jpg", "path": null, "size": 51.66, "width": 500, "height": 375, "sizeInBytes": 51664, "provider_metadata": {"public_id": "small_apto_3db5d6bab9", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769625306/medium_apto_3db5d6bab9.jpg", "hash": "medium_apto_3db5d6bab9", "mime": "image/jpeg", "name": "medium_apto.jpg", "path": null, "size": 104.26, "width": 750, "height": 563, "sizeInBytes": 104258, "provider_metadata": {"public_id": "medium_apto_3db5d6bab9", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769625305/thumbnail_apto_3db5d6bab9.jpg", "hash": "thumbnail_apto_3db5d6bab9", "mime": "image/jpeg", "name": "thumbnail_apto.jpg", "path": null, "size": 11.15, "width": 208, "height": 156, "sizeInBytes": 11152, "provider_metadata": {"public_id": "thumbnail_apto_3db5d6bab9", "resource_type": "image"}}}	apto_3db5d6bab9	.jpg	image/jpeg	175.36	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769625306/apto_3db5d6bab9.jpg	\N	cloudinary	{"public_id": "apto_3db5d6bab9", "resource_type": "image"}	/1	2026-01-28 19:35:06.801	2026-01-28 19:35:06.801	2026-01-28 19:35:06.802	\N	\N	\N
2	g8q7269kxkwd1npn3nkhaidn	apto.jpg	\N	\N	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769856672/large_apto_c8891005dd.jpg", "hash": "large_apto_c8891005dd", "mime": "image/jpeg", "name": "large_apto.jpg", "path": null, "size": 167.74, "width": 1000, "height": 750, "sizeInBytes": 167735, "provider_metadata": {"public_id": "large_apto_c8891005dd", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769856672/small_apto_c8891005dd.jpg", "hash": "small_apto_c8891005dd", "mime": "image/jpeg", "name": "small_apto.jpg", "path": null, "size": 51.66, "width": 500, "height": 375, "sizeInBytes": 51664, "provider_metadata": {"public_id": "small_apto_c8891005dd", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769856672/medium_apto_c8891005dd.jpg", "hash": "medium_apto_c8891005dd", "mime": "image/jpeg", "name": "medium_apto.jpg", "path": null, "size": 104.26, "width": 750, "height": 563, "sizeInBytes": 104258, "provider_metadata": {"public_id": "medium_apto_c8891005dd", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769856671/thumbnail_apto_c8891005dd.jpg", "hash": "thumbnail_apto_c8891005dd", "mime": "image/jpeg", "name": "thumbnail_apto.jpg", "path": null, "size": 11.15, "width": 208, "height": 156, "sizeInBytes": 11152, "provider_metadata": {"public_id": "thumbnail_apto_c8891005dd", "resource_type": "image"}}}	apto_c8891005dd	.jpg	image/jpeg	175.36	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769856672/apto_c8891005dd.jpg	\N	cloudinary	{"public_id": "apto_c8891005dd", "resource_type": "image"}	/1	2026-01-31 11:51:12.539	2026-01-31 11:51:12.539	2026-01-31 11:51:12.54	\N	\N	\N
3	qkdhawbqyelfgp3logse3rb3	apto6.jpg	\N	\N	78	58	\N	apto6_1f99c82613	.jpg	image/jpeg	1.77	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861540/apto6_1f99c82613.jpg	\N	cloudinary	{"public_id": "apto6_1f99c82613", "resource_type": "image"}	/	2026-01-31 13:12:21.292	2026-01-31 13:12:21.292	2026-01-31 13:12:21.293	3	3	\N
4	ge2tuga5kr5599ocnlj7axwm	apt1.jpg	\N	\N	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/large_apt1_b42f58f83b.jpg", "hash": "large_apt1_b42f58f83b", "mime": "image/jpeg", "name": "large_apt1.jpg", "path": null, "size": 85.53, "width": 1000, "height": 750, "sizeInBytes": 85530, "provider_metadata": {"public_id": "large_apt1_b42f58f83b", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/small_apt1_b42f58f83b.jpg", "hash": "small_apt1_b42f58f83b", "mime": "image/jpeg", "name": "small_apt1.jpg", "path": null, "size": 28.03, "width": 500, "height": 375, "sizeInBytes": 28031, "provider_metadata": {"public_id": "small_apt1_b42f58f83b", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/medium_apt1_b42f58f83b.jpg", "hash": "medium_apt1_b42f58f83b", "mime": "image/jpeg", "name": "medium_apt1.jpg", "path": null, "size": 54.52, "width": 750, "height": 563, "sizeInBytes": 54522, "provider_metadata": {"public_id": "medium_apt1_b42f58f83b", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861540/thumbnail_apt1_b42f58f83b.jpg", "hash": "thumbnail_apt1_b42f58f83b", "mime": "image/jpeg", "name": "thumbnail_apt1.jpg", "path": null, "size": 6.92, "width": 208, "height": 156, "sizeInBytes": 6916, "provider_metadata": {"public_id": "thumbnail_apt1_b42f58f83b", "resource_type": "image"}}}	apt1_b42f58f83b	.jpg	image/jpeg	88.83	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/apt1_b42f58f83b.jpg	\N	cloudinary	{"public_id": "apt1_b42f58f83b", "resource_type": "image"}	/	2026-01-31 13:12:21.506	2026-01-31 13:12:21.506	2026-01-31 13:12:21.506	3	3	\N
5	ntgnfebxqrh9lyixpyreonb3	apto3.jpg	\N	\N	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/large_apto3_d0ef8c8764.jpg", "hash": "large_apto3_d0ef8c8764", "mime": "image/jpeg", "name": "large_apto3.jpg", "path": null, "size": 66.85, "width": 1000, "height": 750, "sizeInBytes": 66853, "provider_metadata": {"public_id": "large_apto3_d0ef8c8764", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/small_apto3_d0ef8c8764.jpg", "hash": "small_apto3_d0ef8c8764", "mime": "image/jpeg", "name": "small_apto3.jpg", "path": null, "size": 22.63, "width": 500, "height": 375, "sizeInBytes": 22626, "provider_metadata": {"public_id": "small_apto3_d0ef8c8764", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/medium_apto3_d0ef8c8764.jpg", "hash": "medium_apto3_d0ef8c8764", "mime": "image/jpeg", "name": "medium_apto3.jpg", "path": null, "size": 42.7, "width": 750, "height": 563, "sizeInBytes": 42699, "provider_metadata": {"public_id": "medium_apto3_d0ef8c8764", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861540/thumbnail_apto3_d0ef8c8764.jpg", "hash": "thumbnail_apto3_d0ef8c8764", "mime": "image/jpeg", "name": "thumbnail_apto3.jpg", "path": null, "size": 5.81, "width": 208, "height": 156, "sizeInBytes": 5814, "provider_metadata": {"public_id": "thumbnail_apto3_d0ef8c8764", "resource_type": "image"}}}	apto3_d0ef8c8764	.jpg	image/jpeg	68.74	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/apto3_d0ef8c8764.jpg	\N	cloudinary	{"public_id": "apto3_d0ef8c8764", "resource_type": "image"}	/	2026-01-31 13:12:21.61	2026-01-31 13:12:21.61	2026-01-31 13:12:21.61	3	3	\N
6	dq41vfycm7x4pef05i836phm	apto4.jpg	\N	\N	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/large_apto4_004039659f.jpg", "hash": "large_apto4_004039659f", "mime": "image/jpeg", "name": "large_apto4.jpg", "path": null, "size": 73.01, "width": 1000, "height": 750, "sizeInBytes": 73006, "provider_metadata": {"public_id": "large_apto4_004039659f", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/small_apto4_004039659f.jpg", "hash": "small_apto4_004039659f", "mime": "image/jpeg", "name": "small_apto4.jpg", "path": null, "size": 24.54, "width": 500, "height": 375, "sizeInBytes": 24538, "provider_metadata": {"public_id": "small_apto4_004039659f", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/medium_apto4_004039659f.jpg", "hash": "medium_apto4_004039659f", "mime": "image/jpeg", "name": "medium_apto4.jpg", "path": null, "size": 46.32, "width": 750, "height": 563, "sizeInBytes": 46324, "provider_metadata": {"public_id": "medium_apto4_004039659f", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861540/thumbnail_apto4_004039659f.jpg", "hash": "thumbnail_apto4_004039659f", "mime": "image/jpeg", "name": "thumbnail_apto4.jpg", "path": null, "size": 6.3, "width": 208, "height": 156, "sizeInBytes": 6304, "provider_metadata": {"public_id": "thumbnail_apto4_004039659f", "resource_type": "image"}}}	apto4_004039659f	.jpg	image/jpeg	75.35	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/apto4_004039659f.jpg	\N	cloudinary	{"public_id": "apto4_004039659f", "resource_type": "image"}	/	2026-01-31 13:12:21.621	2026-01-31 13:12:21.621	2026-01-31 13:12:21.621	3	3	\N
7	wk5lxv962ti6zbv8sljy3ypn	apto5.jpg	\N	\N	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/large_apto5_55a756c029.jpg", "hash": "large_apto5_55a756c029", "mime": "image/jpeg", "name": "large_apto5.jpg", "path": null, "size": 69.94, "width": 1000, "height": 750, "sizeInBytes": 69939, "provider_metadata": {"public_id": "large_apto5_55a756c029", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/small_apto5_55a756c029.jpg", "hash": "small_apto5_55a756c029", "mime": "image/jpeg", "name": "small_apto5.jpg", "path": null, "size": 22.83, "width": 500, "height": 375, "sizeInBytes": 22833, "provider_metadata": {"public_id": "small_apto5_55a756c029", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/medium_apto5_55a756c029.jpg", "hash": "medium_apto5_55a756c029", "mime": "image/jpeg", "name": "medium_apto5.jpg", "path": null, "size": 43.88, "width": 750, "height": 563, "sizeInBytes": 43880, "provider_metadata": {"public_id": "medium_apto5_55a756c029", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861540/thumbnail_apto5_55a756c029.jpg", "hash": "thumbnail_apto5_55a756c029", "mime": "image/jpeg", "name": "thumbnail_apto5.jpg", "path": null, "size": 5.69, "width": 208, "height": 156, "sizeInBytes": 5692, "provider_metadata": {"public_id": "thumbnail_apto5_55a756c029", "resource_type": "image"}}}	apto5_55a756c029	.jpg	image/jpeg	72.28	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/apto5_55a756c029.jpg	\N	cloudinary	{"public_id": "apto5_55a756c029", "resource_type": "image"}	/	2026-01-31 13:12:21.624	2026-01-31 13:12:21.624	2026-01-31 13:12:21.625	3	3	\N
8	tpyl6za3z171op1r33nsfdc4	apto9.jpg	\N	\N	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/large_apto9_5a597e276c.jpg", "hash": "large_apto9_5a597e276c", "mime": "image/jpeg", "name": "large_apto9.jpg", "path": null, "size": 66.48, "width": 1000, "height": 750, "sizeInBytes": 66479, "provider_metadata": {"public_id": "large_apto9_5a597e276c", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/small_apto9_5a597e276c.jpg", "hash": "small_apto9_5a597e276c", "mime": "image/jpeg", "name": "small_apto9.jpg", "path": null, "size": 20.69, "width": 500, "height": 375, "sizeInBytes": 20685, "provider_metadata": {"public_id": "small_apto9_5a597e276c", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/medium_apto9_5a597e276c.jpg", "hash": "medium_apto9_5a597e276c", "mime": "image/jpeg", "name": "medium_apto9.jpg", "path": null, "size": 41.19, "width": 750, "height": 563, "sizeInBytes": 41192, "provider_metadata": {"public_id": "medium_apto9_5a597e276c", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/thumbnail_apto9_5a597e276c.jpg", "hash": "thumbnail_apto9_5a597e276c", "mime": "image/jpeg", "name": "thumbnail_apto9.jpg", "path": null, "size": 5, "width": 208, "height": 156, "sizeInBytes": 5004, "provider_metadata": {"public_id": "thumbnail_apto9_5a597e276c", "resource_type": "image"}}}	apto9_5a597e276c	.jpg	image/jpeg	68.84	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/apto9_5a597e276c.jpg	\N	cloudinary	{"public_id": "apto9_5a597e276c", "resource_type": "image"}	/	2026-01-31 13:12:21.63	2026-01-31 13:12:21.63	2026-01-31 13:12:21.63	3	3	\N
9	zfwr9mayu0dvvbnz0ojxx5ky	apto10.jpg	\N	\N	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/large_apto10_6423a62b0f.jpg", "hash": "large_apto10_6423a62b0f", "mime": "image/jpeg", "name": "large_apto10.jpg", "path": null, "size": 85.52, "width": 1000, "height": 750, "sizeInBytes": 85517, "provider_metadata": {"public_id": "large_apto10_6423a62b0f", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/small_apto10_6423a62b0f.jpg", "hash": "small_apto10_6423a62b0f", "mime": "image/jpeg", "name": "small_apto10.jpg", "path": null, "size": 27.15, "width": 500, "height": 375, "sizeInBytes": 27150, "provider_metadata": {"public_id": "small_apto10_6423a62b0f", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/medium_apto10_6423a62b0f.jpg", "hash": "medium_apto10_6423a62b0f", "mime": "image/jpeg", "name": "medium_apto10.jpg", "path": null, "size": 53.6, "width": 750, "height": 563, "sizeInBytes": 53597, "provider_metadata": {"public_id": "medium_apto10_6423a62b0f", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861540/thumbnail_apto10_6423a62b0f.jpg", "hash": "thumbnail_apto10_6423a62b0f", "mime": "image/jpeg", "name": "thumbnail_apto10.jpg", "path": null, "size": 6.23, "width": 208, "height": 156, "sizeInBytes": 6229, "provider_metadata": {"public_id": "thumbnail_apto10_6423a62b0f", "resource_type": "image"}}}	apto10_6423a62b0f	.jpg	image/jpeg	88.28	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/apto10_6423a62b0f.jpg	\N	cloudinary	{"public_id": "apto10_6423a62b0f", "resource_type": "image"}	/	2026-01-31 13:12:21.684	2026-01-31 13:12:21.684	2026-01-31 13:12:21.684	3	3	\N
12	gg7lbkclcrgga6jrr62ts3gm	apto8.jpg	\N	\N	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/large_apto8_ca873c140f.jpg", "hash": "large_apto8_ca873c140f", "mime": "image/jpeg", "name": "large_apto8.jpg", "path": null, "size": 126.01, "width": 1000, "height": 750, "sizeInBytes": 126005, "provider_metadata": {"public_id": "large_apto8_ca873c140f", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/small_apto8_ca873c140f.jpg", "hash": "small_apto8_ca873c140f", "mime": "image/jpeg", "name": "small_apto8.jpg", "path": null, "size": 34.51, "width": 500, "height": 375, "sizeInBytes": 34505, "provider_metadata": {"public_id": "small_apto8_ca873c140f", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/medium_apto8_ca873c140f.jpg", "hash": "medium_apto8_ca873c140f", "mime": "image/jpeg", "name": "medium_apto8.jpg", "path": null, "size": 74.57, "width": 750, "height": 563, "sizeInBytes": 74566, "provider_metadata": {"public_id": "medium_apto8_ca873c140f", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/thumbnail_apto8_ca873c140f.jpg", "hash": "thumbnail_apto8_ca873c140f", "mime": "image/jpeg", "name": "thumbnail_apto8.jpg", "path": null, "size": 6.84, "width": 208, "height": 156, "sizeInBytes": 6839, "provider_metadata": {"public_id": "thumbnail_apto8_ca873c140f", "resource_type": "image"}}}	apto8_ca873c140f	.jpg	image/jpeg	132.97	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/apto8_ca873c140f.jpg	\N	cloudinary	{"public_id": "apto8_ca873c140f", "resource_type": "image"}	/	2026-01-31 13:12:21.847	2026-01-31 13:12:21.847	2026-01-31 13:12:21.847	3	3	\N
13	lyz09dsk62a1fu0jmqys7ky2	apto7.jpg	\N	\N	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/large_apto7_b08361c94f.jpg", "hash": "large_apto7_b08361c94f", "mime": "image/jpeg", "name": "large_apto7.jpg", "path": null, "size": 121.59, "width": 1000, "height": 750, "sizeInBytes": 121592, "provider_metadata": {"public_id": "large_apto7_b08361c94f", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/small_apto7_b08361c94f.jpg", "hash": "small_apto7_b08361c94f", "mime": "image/jpeg", "name": "small_apto7.jpg", "path": null, "size": 35.72, "width": 500, "height": 375, "sizeInBytes": 35720, "provider_metadata": {"public_id": "small_apto7_b08361c94f", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/medium_apto7_b08361c94f.jpg", "hash": "medium_apto7_b08361c94f", "mime": "image/jpeg", "name": "medium_apto7.jpg", "path": null, "size": 74.19, "width": 750, "height": 563, "sizeInBytes": 74194, "provider_metadata": {"public_id": "medium_apto7_b08361c94f", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/thumbnail_apto7_b08361c94f.jpg", "hash": "thumbnail_apto7_b08361c94f", "mime": "image/jpeg", "name": "thumbnail_apto7.jpg", "path": null, "size": 7.78, "width": 208, "height": 156, "sizeInBytes": 7778, "provider_metadata": {"public_id": "thumbnail_apto7_b08361c94f", "resource_type": "image"}}}	apto7_b08361c94f	.jpg	image/jpeg	127.18	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/apto7_b08361c94f.jpg	\N	cloudinary	{"public_id": "apto7_b08361c94f", "resource_type": "image"}	/	2026-01-31 13:12:21.892	2026-01-31 13:12:21.892	2026-01-31 13:12:21.892	3	3	\N
11	uuaiuetljce6nsjwz0s2tsuy	apto11.jpg	Panoramic city view from a balcony, featuring tall buildings, green areas, and a cloudy sky.	This elevated perspective captures the sprawling urban environment, highlighting modern skyscrapers and natural green pockets beneath an overcast sky.	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/large_apto11_7893af0ad7.jpg", "hash": "large_apto11_7893af0ad7", "mime": "image/jpeg", "name": "large_apto11.jpg", "path": null, "size": 147.13, "width": 1000, "height": 750, "sizeInBytes": 147132, "provider_metadata": {"public_id": "large_apto11_7893af0ad7", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/small_apto11_7893af0ad7.jpg", "hash": "small_apto11_7893af0ad7", "mime": "image/jpeg", "name": "small_apto11.jpg", "path": null, "size": 45.98, "width": 500, "height": 375, "sizeInBytes": 45975, "provider_metadata": {"public_id": "small_apto11_7893af0ad7", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/medium_apto11_7893af0ad7.jpg", "hash": "medium_apto11_7893af0ad7", "mime": "image/jpeg", "name": "medium_apto11.jpg", "path": null, "size": 91.57, "width": 750, "height": 563, "sizeInBytes": 91572, "provider_metadata": {"public_id": "medium_apto11_7893af0ad7", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/thumbnail_apto11_7893af0ad7.jpg", "hash": "thumbnail_apto11_7893af0ad7", "mime": "image/jpeg", "name": "thumbnail_apto11.jpg", "path": null, "size": 9.63, "width": 208, "height": 156, "sizeInBytes": 9632, "provider_metadata": {"public_id": "thumbnail_apto11_7893af0ad7", "resource_type": "image"}}}	apto11_7893af0ad7	.jpg	image/jpeg	153.79	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/apto11_7893af0ad7.jpg	\N	cloudinary	{"public_id": "apto11_7893af0ad7", "resource_type": "image"}	/	2026-01-31 13:12:21.829	2026-01-31 13:12:27.294	2026-01-31 13:12:21.829	3	3	\N
10	btg1777j1q5jgwhgqf9doxa7	apto2.jpg	Modern dining room featuring a large rectangular table, upholstered chairs, and warm recessed lighting.	This spacious modern dining room is set with a large rectangular table and comfortable upholstered chairs, ideal for gatherings.	1024	768	{"large": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/large_apto2_d44b941009.jpg", "hash": "large_apto2_d44b941009", "mime": "image/jpeg", "name": "large_apto2.jpg", "path": null, "size": 67.19, "width": 1000, "height": 750, "sizeInBytes": 67194, "provider_metadata": {"public_id": "large_apto2_d44b941009", "resource_type": "image"}}, "small": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/small_apto2_d44b941009.jpg", "hash": "small_apto2_d44b941009", "mime": "image/jpeg", "name": "small_apto2.jpg", "path": null, "size": 22.09, "width": 500, "height": 375, "sizeInBytes": 22094, "provider_metadata": {"public_id": "small_apto2_d44b941009", "resource_type": "image"}}, "medium": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/medium_apto2_d44b941009.jpg", "hash": "medium_apto2_d44b941009", "mime": "image/jpeg", "name": "medium_apto2.jpg", "path": null, "size": 42.34, "width": 750, "height": 563, "sizeInBytes": 42339, "provider_metadata": {"public_id": "medium_apto2_d44b941009", "resource_type": "image"}}, "thumbnail": {"ext": ".jpg", "url": "https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/thumbnail_apto2_d44b941009.jpg", "hash": "thumbnail_apto2_d44b941009", "mime": "image/jpeg", "name": "thumbnail_apto2.jpg", "path": null, "size": 5.82, "width": 208, "height": 156, "sizeInBytes": 5816, "provider_metadata": {"public_id": "thumbnail_apto2_d44b941009", "resource_type": "image"}}}	apto2_d44b941009	.jpg	image/jpeg	69.46	https://res.cloudinary.com/pavaoleonardo/image/upload/v1769861541/apto2_d44b941009.jpg	\N	cloudinary	{"public_id": "apto2_d44b941009", "resource_type": "image"}	/	2026-01-31 13:12:21.698	2026-01-31 13:12:25.994	2026-01-31 13:12:21.698	3	3	\N
\.


--
-- Data for Name: files_folder_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.files_folder_lnk (id, file_id, folder_id, file_ord) FROM stdin;
1	1	1	1
2	2	1	2
\.


--
-- Data for Name: files_related_mph; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.files_related_mph (id, file_id, related_id, related_type, field, "order") FROM stdin;
24	5	17	api::imovel.imovel	fotos	1
25	7	17	api::imovel.imovel	fotos	2
26	3	17	api::imovel.imovel	fotos	3
27	4	17	api::imovel.imovel	fotos	4
28	9	17	api::imovel.imovel	fotos	5
29	12	17	api::imovel.imovel	fotos	6
30	8	17	api::imovel.imovel	fotos	7
31	6	17	api::imovel.imovel	fotos	8
32	13	17	api::imovel.imovel	fotos	9
33	10	17	api::imovel.imovel	fotos	10
34	11	17	api::imovel.imovel	fotos	11
35	2	17	api::imovel.imovel	fotos	12
36	5	19	api::imovel.imovel	fotos	1
37	7	19	api::imovel.imovel	fotos	2
38	3	19	api::imovel.imovel	fotos	3
39	4	19	api::imovel.imovel	fotos	4
40	9	19	api::imovel.imovel	fotos	5
41	12	19	api::imovel.imovel	fotos	6
42	8	19	api::imovel.imovel	fotos	7
43	6	19	api::imovel.imovel	fotos	8
44	13	19	api::imovel.imovel	fotos	9
45	10	19	api::imovel.imovel	fotos	10
46	11	19	api::imovel.imovel	fotos	11
47	2	19	api::imovel.imovel	fotos	12
\.


--
-- Data for Name: i18n_locale; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.i18n_locale (id, document_id, name, code, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	m8etcm581ca3wxupcyouicz4	English (en)	en	2026-01-25 17:24:07.746	2026-01-25 17:24:07.746	2026-01-25 17:24:07.746	\N	\N	\N
\.


--
-- Data for Name: imoveis; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.imoveis (id, document_id, titulo, descricao, tamanho, quartos, banheiros, bairro, preco, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, cidade, finalidade, tipo, endereco, latitude, longitude, condominio, iptu, area_total, caracteristicas) FROM stdin;
17	tex6xpvhhvdz74vyb3dy1e3j	Apartamento Centro	[{"type": "paragraph", "children": [{"text": "Apartamento Centro", "type": "text"}]}]	150.00	4	3	{"bairro": "Centro", "regiao": "Centro"}	2500.00	2026-01-31 11:51:11.148	2026-01-31 13:12:43.585	\N	\N	3	\N	Campo Grande	aluguel	Apartamento	\N	\N	\N	\N	\N	\N	\N
19	tex6xpvhhvdz74vyb3dy1e3j	Apartamento Centro	[{"type": "paragraph", "children": [{"text": "Apartamento Centro", "type": "text"}]}]	150.00	4	3	{"bairro": "Centro", "regiao": "Centro"}	2500.00	2026-01-31 11:51:11.148	2026-01-31 13:12:43.585	2026-01-31 13:12:43.63	\N	3	\N	Campo Grande	aluguel	Apartamento	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: imoveis_usuario_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.imoveis_usuario_lnk (id, imovel_id, user_id) FROM stdin;
\.


--
-- Data for Name: noticias; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.noticias (id, document_id, titulo, resumo, link, conteudo, categoria, data, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	tw3ifjgw0m9zl4ylsyhlc5ak	Bairro São Francisco lidera valorização imobiliária em Campo Grande com alta de 35%	Com infraestrutura consolidada e localização privilegiada, o bairro se destaca como o principal polo de valorização na capital sul-mato-grossense em 2025.	\N	O mercado imobiliário de Campo Grande vive um momento de forte valorização, e o bairro São Francisco é o grande destaque deste ciclo. Segundo pesquisas recentes, o bairro registrou um aumento médio de 35% no valor do metro quadrado apenas no último ano.\n\nA proximidade com o centro, a presença de serviços de alta qualidade e o perfil residencial de alto padrão têm atraído investidores e famílias que buscam solidez e qualidade de vida. Outros bairros como Planalto e Jardim dos Estados também seguem em ritmo acelerado de crescimento, consolidando a Capital como um dos melhores destinos para investimento imobiliário no Centro-Oeste.	Valorização	2026-02-10	2026-02-10 12:56:37.769	2026-02-10 12:56:37.769	\N	\N	\N	\N
2	tw3ifjgw0m9zl4ylsyhlc5ak	Bairro São Francisco lidera valorização imobiliária em Campo Grande com alta de 35%	Com infraestrutura consolidada e localização privilegiada, o bairro se destaca como o principal polo de valorização na capital sul-mato-grossense em 2025.	\N	O mercado imobiliário de Campo Grande vive um momento de forte valorização, e o bairro São Francisco é o grande destaque deste ciclo. Segundo pesquisas recentes, o bairro registrou um aumento médio de 35% no valor do metro quadrado apenas no último ano.\n\nA proximidade com o centro, a presença de serviços de alta qualidade e o perfil residencial de alto padrão têm atraído investidores e famílias que buscam solidez e qualidade de vida. Outros bairros como Planalto e Jardim dos Estados também seguem em ritmo acelerado de crescimento, consolidando a Capital como um dos melhores destinos para investimento imobiliário no Centro-Oeste.	Valorização	2026-02-10	2026-02-10 12:56:37.769	2026-02-10 12:56:37.769	2026-02-10 12:56:37.791	\N	\N	\N
3	ia5i9gd5p2qpg1r1ue191r88	Alta demanda: Estoque de imóveis em Campo Grande pode se esgotar em apenas 4 meses	O aquecimento do mercado imobiliário na Capital atinge níveis recordes, impulsionado pela facilidade de crédito e novos lançamentos.	\N	A velocidade de vendas em Campo Grande atingiu patamares nunca antes vistos. Se o ritmo atual de comercialização for mantido e não houver novos lançamentos expressivos, o estoque atual de imóveis prontos e na planta pode se esgotar em menos de 120 dias.\n\nEste cenário é reflexo de uma combination de fatores: a redução das taxas de juros em linhas de crédito específicas, o aumento do poder de compra regional impulsionado pelo agronegócio e a busca por ativos reais como forma de proteção patrimonial. Especialistas recomendam que compradores fiquem atentos às oportunidades, pois a tendência é de continuidade na alta dos preços devido à escassez de oferta.	Investimento	2026-02-08	2026-02-10 12:56:37.949	2026-02-10 12:56:37.949	\N	\N	\N	\N
4	ia5i9gd5p2qpg1r1ue191r88	Alta demanda: Estoque de imóveis em Campo Grande pode se esgotar em apenas 4 meses	O aquecimento do mercado imobiliário na Capital atinge níveis recordes, impulsionado pela facilidade de crédito e novos lançamentos.	\N	A velocidade de vendas em Campo Grande atingiu patamares nunca antes vistos. Se o ritmo atual de comercialização for mantido e não houver novos lançamentos expressivos, o estoque atual de imóveis prontos e na planta pode se esgotar em menos de 120 dias.\n\nEste cenário é reflexo de uma combination de fatores: a redução das taxas de juros em linhas de crédito específicas, o aumento do poder de compra regional impulsionado pelo agronegócio e a busca por ativos reais como forma de proteção patrimonial. Especialistas recomendam que compradores fiquem atentos às oportunidades, pois a tendência é de continuidade na alta dos preços devido à escassez de oferta.	Investimento	2026-02-08	2026-02-10 12:56:37.949	2026-02-10 12:56:37.949	2026-02-10 12:56:38.018	\N	\N	\N
5	mgozsn3hwcvlvvsno8573wjh	Agronegócio e infraestrutura impulsionam recorde de investimentos imobiliários em MS	O setor imobiliário do estado vive um momento de forte expansão, atraindo investidores de todo o Brasil interessados na solidez econômica regional.	\N	Mato Grosso do Sul consolidou sua posição como um dos estados mais dinâmicos do Brasil para o setor imobiliário. O sucesso recorde das safras e a expansão das fronteiras agrícolas têm gerado um excedente de capital que está sendo reinvestido massivamente em imóveis urbanos e rurais.\n\nAlém disso, os grandes projetos de infraestrutura, como a Rota Bioceânica, estão criando novos polos de desenvolvimento no interior do estado, como em Porto Murtinho e Ribas do Rio Pardo. Em Campo Grande, o reflexo é visto em lançamentos de luxo e na modernização da rede hoteleira e de serviços, atraindo olhares de grandes incorporadoras nacionais que antes focavam apenas no eixo Rio-São Paulo.	Alta Demanda	2026-02-05	2026-02-10 12:56:38.106	2026-02-10 12:56:38.106	\N	\N	\N	\N
6	mgozsn3hwcvlvvsno8573wjh	Agronegócio e infraestrutura impulsionam recorde de investimentos imobiliários em MS	O setor imobiliário do estado vive um momento de forte expansão, atraindo investidores de todo o Brasil interessados na solidez econômica regional.	\N	Mato Grosso do Sul consolidou sua posição como um dos estados mais dinâmicos do Brasil para o setor imobiliário. O sucesso recorde das safras e a expansão das fronteiras agrícolas têm gerado um excedente de capital que está sendo reinvestido massivamente em imóveis urbanos e rurais.\n\nAlém disso, os grandes projetos de infraestrutura, como a Rota Bioceânica, estão criando novos polos de desenvolvimento no interior do estado, como em Porto Murtinho e Ribas do Rio Pardo. Em Campo Grande, o reflexo é visto em lançamentos de luxo e na modernização da rede hoteleira e de serviços, atraindo olhares de grandes incorporadoras nacionais que antes focavam apenas no eixo Rio-São Paulo.	Alta Demanda	2026-02-05	2026-02-10 12:56:38.106	2026-02-10 12:56:38.106	2026-02-10 12:56:38.15	\N	\N	\N
\.


--
-- Data for Name: strapi_ai_localization_jobs; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_ai_localization_jobs (id, content_type, related_document_id, source_locale, target_locales, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: strapi_api_token_permissions; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_api_token_permissions (id, document_id, action, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_api_token_permissions_token_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_api_token_permissions_token_lnk (id, api_token_permission_id, api_token_id, api_token_permission_ord) FROM stdin;
\.


--
-- Data for Name: strapi_api_tokens; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_api_tokens (id, document_id, name, description, type, access_key, encrypted_key, last_used_at, expires_at, lifespan, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	hmahzqz35uzs3pr0wzui73s7	Read Only	A default API token with read-only permissions, only used for accessing resources	read-only	a53867761dc1e574e0890ba69c25172ad2b830c0c1b2bc02a5db5716b815631097d7c3ee7d5486c6095baa816e1b0dbbfe1a4a51d69ccb1be54e6e131d0b7acc	v1:35f7bd2aa8051b426c29758be7da211b:f0cfa1626d6e81bdcd3b9e80c4aa84022325b4758722dbfd0d7d8495816259f0c5551610227e156806f95124e23aac59c1e2084178c78a59552a64ea5cb94f58548e1fe42f6d98ea4d6514142c1be7cf25636b531af8d44ada3b13ed4c6f92e4ba2e036541fa62452455de559df4e9c3b0819d2a8fce2c83539c72729621ea85c2c90c13d74e30d56ad16bcff25ee6acda036833cc953813727ff8d995b8fd30495558e2e678353442caf2254d285dadeb028ddeb8f936528f264a692f2cae8907a63f09c951e2292826ed61d29377bf98794a73821e81ab6318816c9a61b535a955fda8be1133d3ec5c6ca23852159e8632db09d1b0e53d69f564b2268eaa37:1e363ef0e88bb3cacb3e202d76b77baa	\N	\N	\N	2026-01-25 17:24:07.889	2026-01-25 17:24:07.889	2026-01-25 17:24:07.89	\N	\N	\N
2	zem2lzb4wjdt9vunrvajbcpi	Full Access	A default API token with full access permissions, used for accessing or modifying resources	full-access	24214d0c2c7468cc593a3879222a01c7127796e4af24b578d61583c7faa171001023da78409f10f0abcbe7e9b52f1011ead8d66efb8f77676c511eadab3e665d	v1:2285f8da7f9bc4d7bc8eee9733a48cff:f86ee71b4b201d944f931e03e7620be1f323402e1fb918b2771bf08e55dba1884d24d052f21ae82dc3b0859fe2fe2762249e19473b8824d19c884032280e904cca994da7d6f97a8757da71bc721ef0ec621851f522d70f64cf11af488d873c3f30b3724da4b9ab302aa80000b9e117826b42575f9644b5a6cec87103bc178bec3aeec6efa66d1b01720ffff0a094fd11a293e1a95687dee4eb1ed8d4494323f9173311f900d96baa61a6d51aad0bf2781aa196398fce7d159f649df3378ede46e808c1b70d32b17e3c15d86e9f40bae7348e4a51d8cadaa2830a9e7c827bcafb13562494daefb8415e75601f93df50068597027418f4518c5c293fc74bd4daa6:06bd0f3ea9cc0b57f14f73e1120e29f5	\N	\N	\N	2026-01-25 17:24:07.891	2026-01-25 17:24:07.891	2026-01-25 17:24:07.891	\N	\N	\N
\.


--
-- Data for Name: strapi_audit_logs; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_audit_logs (id, document_id, action, date, payload, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_audit_logs_user_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_audit_logs_user_lnk (id, audit_log_id, user_id) FROM stdin;
\.


--
-- Data for Name: strapi_core_store_settings; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_core_store_settings (id, key, value, type, environment, tag) FROM stdin;
1	strapi_unidirectional-join-table-repair-ran	true	boolean	\N	\N
3	strapi_content_types_schema	{"api::imovel.imovel":{"kind":"collectionType","collectionName":"imoveis","info":{"singularName":"imovel","pluralName":"imoveis","displayName":"Imóvel"},"options":{"draftAndPublish":true},"pluginOptions":{},"attributes":{"titulo":{"type":"string","required":true},"descricao":{"type":"blocks"},"tamanho":{"type":"decimal"},"area_total":{"type":"decimal"},"condominio":{"type":"decimal"},"iptu":{"type":"decimal"},"quartos":{"type":"integer"},"banheiros":{"type":"integer"},"bairro":{"type":"json","customField":"global::bairro-regiao"},"cidade":{"type":"string"},"preco":{"type":"decimal"},"finalidade":{"type":"enumeration","enum":["aluguel","venda"],"required":true},"endereco":{"type":"string"},"latitude":{"type":"decimal"},"longitude":{"type":"decimal"},"tipo":{"type":"enumeration","enum":["Apart Hotel / Flat / Loft","Apartamento","Apto. Cobertura / Duplex","Casa de Vila","Casa-Térrea","Casa-Térrea-Condomínio","Kitnet","Sobrado","Sobrado-Condomínio","Studio","Terreno","Terreno-Condomínio","Área","Casa Comercial","Galpão / Depósito","Imóvel Comercial","Indústria / Fábrica","Ponto Comercial / Box","Pousada / Hotel / Motel","Sala / Salão / Loja","Chácara","Fazenda","Haras","Pesqueiro","Sitio"],"required":true},"fotos":{"type":"media","multiple":true,"allowedTypes":["images"]},"usuario":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.user"},"caracteristicas":{"type":"json"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"api::imovel.imovel","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"imoveis"}}},"apiName":"imovel","globalId":"Imovel","uid":"api::imovel.imovel","modelType":"contentType","__schema__":{"collectionName":"imoveis","info":{"singularName":"imovel","pluralName":"imoveis","displayName":"Imóvel"},"options":{"draftAndPublish":true},"pluginOptions":{},"attributes":{"titulo":{"type":"string","required":true},"descricao":{"type":"blocks"},"tamanho":{"type":"decimal"},"area_total":{"type":"decimal"},"condominio":{"type":"decimal"},"iptu":{"type":"decimal"},"quartos":{"type":"integer"},"banheiros":{"type":"integer"},"bairro":{"type":"customField","customField":"global::bairro-regiao"},"cidade":{"type":"string"},"preco":{"type":"decimal"},"finalidade":{"type":"enumeration","enum":["aluguel","venda"],"required":true},"endereco":{"type":"string"},"latitude":{"type":"decimal"},"longitude":{"type":"decimal"},"tipo":{"type":"enumeration","enum":["Apart Hotel / Flat / Loft","Apartamento","Apto. Cobertura / Duplex","Casa de Vila","Casa-Térrea","Casa-Térrea-Condomínio","Kitnet","Sobrado","Sobrado-Condomínio","Studio","Terreno","Terreno-Condomínio","Área","Casa Comercial","Galpão / Depósito","Imóvel Comercial","Indústria / Fábrica","Ponto Comercial / Box","Pousada / Hotel / Motel","Sala / Salão / Loja","Chácara","Fazenda","Haras","Pesqueiro","Sitio"],"required":true},"fotos":{"type":"media","multiple":true,"allowedTypes":["images"]},"usuario":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.user"},"caracteristicas":{"type":"json"}},"kind":"collectionType"},"modelName":"imovel","actions":{},"lifecycles":{}},"api::noticia.noticia":{"kind":"collectionType","collectionName":"noticias","info":{"singularName":"noticia","pluralName":"noticias","displayName":"Notícia","description":"Notícias do mercado imobiliário"},"options":{"draftAndPublish":true},"pluginOptions":{},"attributes":{"titulo":{"type":"string","required":true},"resumo":{"type":"text"},"link":{"type":"string"},"conteudo":{"type":"text"},"categoria":{"type":"enumeration","enum":["Valorização","Investimento","Alta Demanda","Dicas","Mercado"]},"data":{"type":"date"},"imagem":{"type":"media","multiple":false,"allowedTypes":["images"]},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"api::noticia.noticia","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"noticias"}}},"apiName":"noticia","globalId":"Noticia","uid":"api::noticia.noticia","modelType":"contentType","__schema__":{"collectionName":"noticias","info":{"singularName":"noticia","pluralName":"noticias","displayName":"Notícia","description":"Notícias do mercado imobiliário"},"options":{"draftAndPublish":true},"pluginOptions":{},"attributes":{"titulo":{"type":"string","required":true},"resumo":{"type":"text"},"link":{"type":"string"},"conteudo":{"type":"text"},"categoria":{"type":"enumeration","enum":["Valorização","Investimento","Alta Demanda","Dicas","Mercado"]},"data":{"type":"date"},"imagem":{"type":"media","multiple":false,"allowedTypes":["images"]}},"kind":"collectionType"},"modelName":"noticia","actions":{},"lifecycles":{}},"plugin::upload.file":{"collectionName":"files","info":{"singularName":"file","pluralName":"files","displayName":"File","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","configurable":false,"required":true},"alternativeText":{"type":"text","configurable":false},"caption":{"type":"text","configurable":false},"width":{"type":"integer","configurable":false},"height":{"type":"integer","configurable":false},"formats":{"type":"json","configurable":false},"hash":{"type":"string","configurable":false,"required":true},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"decimal","configurable":false,"required":true},"url":{"type":"text","configurable":false,"required":true},"previewUrl":{"type":"text","configurable":false},"provider":{"type":"string","configurable":false,"required":true},"provider_metadata":{"type":"json","configurable":false},"related":{"type":"relation","relation":"morphToMany","configurable":false},"folder":{"type":"relation","relation":"manyToOne","target":"plugin::upload.folder","inversedBy":"files","private":true},"folderPath":{"type":"string","minLength":1,"required":true,"private":true,"searchable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::upload.file","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"files"}}},"indexes":[{"name":"upload_files_folder_path_index","columns":["folder_path"],"type":null},{"name":"upload_files_created_at_index","columns":["created_at"],"type":null},{"name":"upload_files_updated_at_index","columns":["updated_at"],"type":null},{"name":"upload_files_name_index","columns":["name"],"type":null},{"name":"upload_files_size_index","columns":["size"],"type":null},{"name":"upload_files_ext_index","columns":["ext"],"type":null}],"plugin":"upload","globalId":"UploadFile","uid":"plugin::upload.file","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"files","info":{"singularName":"file","pluralName":"files","displayName":"File","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","configurable":false,"required":true},"alternativeText":{"type":"text","configurable":false},"caption":{"type":"text","configurable":false},"width":{"type":"integer","configurable":false},"height":{"type":"integer","configurable":false},"formats":{"type":"json","configurable":false},"hash":{"type":"string","configurable":false,"required":true},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"decimal","configurable":false,"required":true},"url":{"type":"text","configurable":false,"required":true},"previewUrl":{"type":"text","configurable":false},"provider":{"type":"string","configurable":false,"required":true},"provider_metadata":{"type":"json","configurable":false},"related":{"type":"relation","relation":"morphToMany","configurable":false},"folder":{"type":"relation","relation":"manyToOne","target":"plugin::upload.folder","inversedBy":"files","private":true},"folderPath":{"type":"string","minLength":1,"required":true,"private":true,"searchable":false}},"kind":"collectionType"},"modelName":"file"},"plugin::upload.folder":{"collectionName":"upload_folders","info":{"singularName":"folder","pluralName":"folders","displayName":"Folder"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"required":true},"pathId":{"type":"integer","unique":true,"required":true},"parent":{"type":"relation","relation":"manyToOne","target":"plugin::upload.folder","inversedBy":"children"},"children":{"type":"relation","relation":"oneToMany","target":"plugin::upload.folder","mappedBy":"parent"},"files":{"type":"relation","relation":"oneToMany","target":"plugin::upload.file","mappedBy":"folder"},"path":{"type":"string","minLength":1,"required":true},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::upload.folder","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"upload_folders"}}},"indexes":[{"name":"upload_folders_path_id_index","columns":["path_id"],"type":"unique"},{"name":"upload_folders_path_index","columns":["path"],"type":"unique"}],"plugin":"upload","globalId":"UploadFolder","uid":"plugin::upload.folder","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"upload_folders","info":{"singularName":"folder","pluralName":"folders","displayName":"Folder"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"required":true},"pathId":{"type":"integer","unique":true,"required":true},"parent":{"type":"relation","relation":"manyToOne","target":"plugin::upload.folder","inversedBy":"children"},"children":{"type":"relation","relation":"oneToMany","target":"plugin::upload.folder","mappedBy":"parent"},"files":{"type":"relation","relation":"oneToMany","target":"plugin::upload.file","mappedBy":"folder"},"path":{"type":"string","minLength":1,"required":true}},"kind":"collectionType"},"modelName":"folder"},"plugin::i18n.locale":{"info":{"singularName":"locale","pluralName":"locales","collectionName":"locales","displayName":"Locale","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","min":1,"max":50,"configurable":false},"code":{"type":"string","unique":true,"configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::i18n.locale","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"i18n_locale"}}},"plugin":"i18n","collectionName":"i18n_locale","globalId":"I18NLocale","uid":"plugin::i18n.locale","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"i18n_locale","info":{"singularName":"locale","pluralName":"locales","collectionName":"locales","displayName":"Locale","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","min":1,"max":50,"configurable":false},"code":{"type":"string","unique":true,"configurable":false}},"kind":"collectionType"},"modelName":"locale"},"plugin::content-releases.release":{"collectionName":"strapi_releases","info":{"singularName":"release","pluralName":"releases","displayName":"Release"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","required":true},"releasedAt":{"type":"datetime"},"scheduledAt":{"type":"datetime"},"timezone":{"type":"string"},"status":{"type":"enumeration","enum":["ready","blocked","failed","done","empty"],"required":true},"actions":{"type":"relation","relation":"oneToMany","target":"plugin::content-releases.release-action","mappedBy":"release"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::content-releases.release","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_releases"}}},"plugin":"content-releases","globalId":"ContentReleasesRelease","uid":"plugin::content-releases.release","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_releases","info":{"singularName":"release","pluralName":"releases","displayName":"Release"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","required":true},"releasedAt":{"type":"datetime"},"scheduledAt":{"type":"datetime"},"timezone":{"type":"string"},"status":{"type":"enumeration","enum":["ready","blocked","failed","done","empty"],"required":true},"actions":{"type":"relation","relation":"oneToMany","target":"plugin::content-releases.release-action","mappedBy":"release"}},"kind":"collectionType"},"modelName":"release"},"plugin::content-releases.release-action":{"collectionName":"strapi_release_actions","info":{"singularName":"release-action","pluralName":"release-actions","displayName":"Release Action"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"type":{"type":"enumeration","enum":["publish","unpublish"],"required":true},"contentType":{"type":"string","required":true},"entryDocumentId":{"type":"string"},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"release":{"type":"relation","relation":"manyToOne","target":"plugin::content-releases.release","inversedBy":"actions"},"isEntryValid":{"type":"boolean"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::content-releases.release-action","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_release_actions"}}},"plugin":"content-releases","globalId":"ContentReleasesReleaseAction","uid":"plugin::content-releases.release-action","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_release_actions","info":{"singularName":"release-action","pluralName":"release-actions","displayName":"Release Action"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"type":{"type":"enumeration","enum":["publish","unpublish"],"required":true},"contentType":{"type":"string","required":true},"entryDocumentId":{"type":"string"},"locale":{"type":"string"},"release":{"type":"relation","relation":"manyToOne","target":"plugin::content-releases.release","inversedBy":"actions"},"isEntryValid":{"type":"boolean"}},"kind":"collectionType"},"modelName":"release-action"},"plugin::review-workflows.workflow":{"collectionName":"strapi_workflows","info":{"name":"Workflow","description":"","singularName":"workflow","pluralName":"workflows","displayName":"Workflow"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","required":true,"unique":true},"stages":{"type":"relation","target":"plugin::review-workflows.workflow-stage","relation":"oneToMany","mappedBy":"workflow"},"stageRequiredToPublish":{"type":"relation","target":"plugin::review-workflows.workflow-stage","relation":"oneToOne","required":false},"contentTypes":{"type":"json","required":true,"default":"[]"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::review-workflows.workflow","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_workflows"}}},"plugin":"review-workflows","globalId":"ReviewWorkflowsWorkflow","uid":"plugin::review-workflows.workflow","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_workflows","info":{"name":"Workflow","description":"","singularName":"workflow","pluralName":"workflows","displayName":"Workflow"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","required":true,"unique":true},"stages":{"type":"relation","target":"plugin::review-workflows.workflow-stage","relation":"oneToMany","mappedBy":"workflow"},"stageRequiredToPublish":{"type":"relation","target":"plugin::review-workflows.workflow-stage","relation":"oneToOne","required":false},"contentTypes":{"type":"json","required":true,"default":"[]"}},"kind":"collectionType"},"modelName":"workflow"},"plugin::review-workflows.workflow-stage":{"collectionName":"strapi_workflows_stages","info":{"name":"Workflow Stage","description":"","singularName":"workflow-stage","pluralName":"workflow-stages","displayName":"Stages"},"options":{"version":"1.1.0","draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","configurable":false},"color":{"type":"string","configurable":false,"default":"#4945FF"},"workflow":{"type":"relation","target":"plugin::review-workflows.workflow","relation":"manyToOne","inversedBy":"stages","configurable":false},"permissions":{"type":"relation","target":"admin::permission","relation":"manyToMany","configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::review-workflows.workflow-stage","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_workflows_stages"}}},"plugin":"review-workflows","globalId":"ReviewWorkflowsWorkflowStage","uid":"plugin::review-workflows.workflow-stage","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_workflows_stages","info":{"name":"Workflow Stage","description":"","singularName":"workflow-stage","pluralName":"workflow-stages","displayName":"Stages"},"options":{"version":"1.1.0"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","configurable":false},"color":{"type":"string","configurable":false,"default":"#4945FF"},"workflow":{"type":"relation","target":"plugin::review-workflows.workflow","relation":"manyToOne","inversedBy":"stages","configurable":false},"permissions":{"type":"relation","target":"admin::permission","relation":"manyToMany","configurable":false}},"kind":"collectionType"},"modelName":"workflow-stage"},"plugin::users-permissions.permission":{"collectionName":"up_permissions","info":{"name":"permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","required":true,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"permissions","configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.permission","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"up_permissions"}}},"plugin":"users-permissions","globalId":"UsersPermissionsPermission","uid":"plugin::users-permissions.permission","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"up_permissions","info":{"name":"permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","required":true,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"permissions","configurable":false}},"kind":"collectionType"},"modelName":"permission","options":{"draftAndPublish":false}},"plugin::users-permissions.role":{"collectionName":"up_roles","info":{"name":"role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.permission","mappedBy":"role","configurable":false},"users":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.user","mappedBy":"role","configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.role","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"up_roles"}}},"plugin":"users-permissions","globalId":"UsersPermissionsRole","uid":"plugin::users-permissions.role","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"up_roles","info":{"name":"role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.permission","mappedBy":"role","configurable":false},"users":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.user","mappedBy":"role","configurable":false}},"kind":"collectionType"},"modelName":"role","options":{"draftAndPublish":false}},"plugin::users-permissions.user":{"collectionName":"up_users","info":{"name":"user","description":"","singularName":"user","pluralName":"users","displayName":"User"},"options":{"timestamps":true,"draftAndPublish":false},"attributes":{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true,"searchable":false},"resetPasswordToken":{"type":"string","configurable":false,"private":true,"searchable":false},"confirmationToken":{"type":"string","configurable":false,"private":true,"searchable":false},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"users","configurable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"plugin::users-permissions.user","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"up_users"}}},"config":{"attributes":{"resetPasswordToken":{"hidden":true},"confirmationToken":{"hidden":true},"provider":{"hidden":true}}},"plugin":"users-permissions","globalId":"UsersPermissionsUser","uid":"plugin::users-permissions.user","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"up_users","info":{"name":"user","description":"","singularName":"user","pluralName":"users","displayName":"User"},"options":{"timestamps":true},"attributes":{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true,"searchable":false},"resetPasswordToken":{"type":"string","configurable":false,"private":true,"searchable":false},"confirmationToken":{"type":"string","configurable":false,"private":true,"searchable":false},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"type":"relation","relation":"manyToOne","target":"plugin::users-permissions.role","inversedBy":"users","configurable":false}},"kind":"collectionType"},"modelName":"user"},"admin::permission":{"collectionName":"admin_permissions","info":{"name":"Permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"actionParameters":{"type":"json","configurable":false,"required":false,"default":{}},"subject":{"type":"string","minLength":1,"configurable":false,"required":false},"properties":{"type":"json","configurable":false,"required":false,"default":{}},"conditions":{"type":"json","configurable":false,"required":false,"default":[]},"role":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::role"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::permission","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"admin_permissions"}}},"plugin":"admin","globalId":"AdminPermission","uid":"admin::permission","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"admin_permissions","info":{"name":"Permission","description":"","singularName":"permission","pluralName":"permissions","displayName":"Permission"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"actionParameters":{"type":"json","configurable":false,"required":false,"default":{}},"subject":{"type":"string","minLength":1,"configurable":false,"required":false},"properties":{"type":"json","configurable":false,"required":false,"default":{}},"conditions":{"type":"json","configurable":false,"required":false,"default":[]},"role":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::role"}},"kind":"collectionType"},"modelName":"permission"},"admin::user":{"collectionName":"admin_users","info":{"name":"User","description":"","singularName":"user","pluralName":"users","displayName":"User"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"firstname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"lastname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"username":{"type":"string","unique":false,"configurable":false,"required":false},"email":{"type":"email","minLength":6,"configurable":false,"required":true,"unique":true,"private":true},"password":{"type":"password","minLength":6,"configurable":false,"required":false,"private":true,"searchable":false},"resetPasswordToken":{"type":"string","configurable":false,"private":true,"searchable":false},"registrationToken":{"type":"string","configurable":false,"private":true,"searchable":false},"isActive":{"type":"boolean","default":false,"configurable":false,"private":true},"roles":{"configurable":false,"private":true,"type":"relation","relation":"manyToMany","inversedBy":"users","target":"admin::role","collectionName":"strapi_users_roles"},"blocked":{"type":"boolean","default":false,"configurable":false,"private":true},"preferedLanguage":{"type":"string","configurable":false,"required":false,"searchable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::user","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"admin_users"}}},"config":{"attributes":{"resetPasswordToken":{"hidden":true},"registrationToken":{"hidden":true}}},"plugin":"admin","globalId":"AdminUser","uid":"admin::user","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"admin_users","info":{"name":"User","description":"","singularName":"user","pluralName":"users","displayName":"User"},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"firstname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"lastname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"username":{"type":"string","unique":false,"configurable":false,"required":false},"email":{"type":"email","minLength":6,"configurable":false,"required":true,"unique":true,"private":true},"password":{"type":"password","minLength":6,"configurable":false,"required":false,"private":true,"searchable":false},"resetPasswordToken":{"type":"string","configurable":false,"private":true,"searchable":false},"registrationToken":{"type":"string","configurable":false,"private":true,"searchable":false},"isActive":{"type":"boolean","default":false,"configurable":false,"private":true},"roles":{"configurable":false,"private":true,"type":"relation","relation":"manyToMany","inversedBy":"users","target":"admin::role","collectionName":"strapi_users_roles"},"blocked":{"type":"boolean","default":false,"configurable":false,"private":true},"preferedLanguage":{"type":"string","configurable":false,"required":false,"searchable":false}},"kind":"collectionType"},"modelName":"user","options":{"draftAndPublish":false}},"admin::role":{"collectionName":"admin_roles","info":{"name":"Role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"code":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"description":{"type":"string","configurable":false},"users":{"configurable":false,"type":"relation","relation":"manyToMany","mappedBy":"roles","target":"admin::user"},"permissions":{"configurable":false,"type":"relation","relation":"oneToMany","mappedBy":"role","target":"admin::permission"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::role","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"admin_roles"}}},"plugin":"admin","globalId":"AdminRole","uid":"admin::role","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"admin_roles","info":{"name":"Role","description":"","singularName":"role","pluralName":"roles","displayName":"Role"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"code":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"description":{"type":"string","configurable":false},"users":{"configurable":false,"type":"relation","relation":"manyToMany","mappedBy":"roles","target":"admin::user"},"permissions":{"configurable":false,"type":"relation","relation":"oneToMany","mappedBy":"role","target":"admin::permission"}},"kind":"collectionType"},"modelName":"role"},"admin::api-token":{"collectionName":"strapi_api_tokens","info":{"name":"Api Token","singularName":"api-token","pluralName":"api-tokens","displayName":"Api Token","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"configurable":false,"required":true,"unique":true},"description":{"type":"string","minLength":1,"configurable":false,"required":false,"default":""},"type":{"type":"enumeration","enum":["read-only","full-access","custom"],"configurable":false,"required":true,"default":"read-only"},"accessKey":{"type":"string","minLength":1,"configurable":false,"required":true,"searchable":false},"encryptedKey":{"type":"text","minLength":1,"configurable":false,"required":false,"searchable":false},"lastUsedAt":{"type":"datetime","configurable":false,"required":false},"permissions":{"type":"relation","target":"admin::api-token-permission","relation":"oneToMany","mappedBy":"token","configurable":false,"required":false},"expiresAt":{"type":"datetime","configurable":false,"required":false},"lifespan":{"type":"biginteger","configurable":false,"required":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::api-token","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_api_tokens"}}},"plugin":"admin","globalId":"AdminApiToken","uid":"admin::api-token","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_api_tokens","info":{"name":"Api Token","singularName":"api-token","pluralName":"api-tokens","displayName":"Api Token","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"configurable":false,"required":true,"unique":true},"description":{"type":"string","minLength":1,"configurable":false,"required":false,"default":""},"type":{"type":"enumeration","enum":["read-only","full-access","custom"],"configurable":false,"required":true,"default":"read-only"},"accessKey":{"type":"string","minLength":1,"configurable":false,"required":true,"searchable":false},"encryptedKey":{"type":"text","minLength":1,"configurable":false,"required":false,"searchable":false},"lastUsedAt":{"type":"datetime","configurable":false,"required":false},"permissions":{"type":"relation","target":"admin::api-token-permission","relation":"oneToMany","mappedBy":"token","configurable":false,"required":false},"expiresAt":{"type":"datetime","configurable":false,"required":false},"lifespan":{"type":"biginteger","configurable":false,"required":false}},"kind":"collectionType"},"modelName":"api-token"},"admin::api-token-permission":{"collectionName":"strapi_api_token_permissions","info":{"name":"API Token Permission","description":"","singularName":"api-token-permission","pluralName":"api-token-permissions","displayName":"API Token Permission"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"token":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::api-token"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::api-token-permission","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_api_token_permissions"}}},"plugin":"admin","globalId":"AdminApiTokenPermission","uid":"admin::api-token-permission","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_api_token_permissions","info":{"name":"API Token Permission","description":"","singularName":"api-token-permission","pluralName":"api-token-permissions","displayName":"API Token Permission"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"token":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::api-token"}},"kind":"collectionType"},"modelName":"api-token-permission"},"admin::transfer-token":{"collectionName":"strapi_transfer_tokens","info":{"name":"Transfer Token","singularName":"transfer-token","pluralName":"transfer-tokens","displayName":"Transfer Token","description":""},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"configurable":false,"required":true,"unique":true},"description":{"type":"string","minLength":1,"configurable":false,"required":false,"default":""},"accessKey":{"type":"string","minLength":1,"configurable":false,"required":true},"lastUsedAt":{"type":"datetime","configurable":false,"required":false},"permissions":{"type":"relation","target":"admin::transfer-token-permission","relation":"oneToMany","mappedBy":"token","configurable":false,"required":false},"expiresAt":{"type":"datetime","configurable":false,"required":false},"lifespan":{"type":"biginteger","configurable":false,"required":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::transfer-token","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_transfer_tokens"}}},"plugin":"admin","globalId":"AdminTransferToken","uid":"admin::transfer-token","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_transfer_tokens","info":{"name":"Transfer Token","singularName":"transfer-token","pluralName":"transfer-tokens","displayName":"Transfer Token","description":""},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"name":{"type":"string","minLength":1,"configurable":false,"required":true,"unique":true},"description":{"type":"string","minLength":1,"configurable":false,"required":false,"default":""},"accessKey":{"type":"string","minLength":1,"configurable":false,"required":true},"lastUsedAt":{"type":"datetime","configurable":false,"required":false},"permissions":{"type":"relation","target":"admin::transfer-token-permission","relation":"oneToMany","mappedBy":"token","configurable":false,"required":false},"expiresAt":{"type":"datetime","configurable":false,"required":false},"lifespan":{"type":"biginteger","configurable":false,"required":false}},"kind":"collectionType"},"modelName":"transfer-token"},"admin::transfer-token-permission":{"collectionName":"strapi_transfer_token_permissions","info":{"name":"Transfer Token Permission","description":"","singularName":"transfer-token-permission","pluralName":"transfer-token-permissions","displayName":"Transfer Token Permission"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"token":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::transfer-token"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::transfer-token-permission","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_transfer_token_permissions"}}},"plugin":"admin","globalId":"AdminTransferTokenPermission","uid":"admin::transfer-token-permission","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_transfer_token_permissions","info":{"name":"Transfer Token Permission","description":"","singularName":"transfer-token-permission","pluralName":"transfer-token-permissions","displayName":"Transfer Token Permission"},"options":{},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"token":{"configurable":false,"type":"relation","relation":"manyToOne","inversedBy":"permissions","target":"admin::transfer-token"}},"kind":"collectionType"},"modelName":"transfer-token-permission"},"admin::session":{"collectionName":"strapi_sessions","info":{"name":"Session","description":"Session Manager storage","singularName":"session","pluralName":"sessions","displayName":"Session"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false},"i18n":{"localized":false}},"attributes":{"userId":{"type":"string","required":true,"configurable":false,"private":true,"searchable":false},"sessionId":{"type":"string","unique":true,"required":true,"configurable":false,"private":true,"searchable":false},"childId":{"type":"string","configurable":false,"private":true,"searchable":false},"deviceId":{"type":"string","required":true,"configurable":false,"private":true,"searchable":false},"origin":{"type":"string","required":true,"configurable":false,"private":true,"searchable":false},"expiresAt":{"type":"datetime","required":true,"configurable":false,"private":true,"searchable":false},"absoluteExpiresAt":{"type":"datetime","configurable":false,"private":true,"searchable":false},"status":{"type":"string","configurable":false,"private":true,"searchable":false},"type":{"type":"string","configurable":false,"private":true,"searchable":false},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::session","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_sessions"}}},"plugin":"admin","globalId":"AdminSession","uid":"admin::session","modelType":"contentType","kind":"collectionType","__schema__":{"collectionName":"strapi_sessions","info":{"name":"Session","description":"Session Manager storage","singularName":"session","pluralName":"sessions","displayName":"Session"},"options":{"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false},"i18n":{"localized":false}},"attributes":{"userId":{"type":"string","required":true,"configurable":false,"private":true,"searchable":false},"sessionId":{"type":"string","unique":true,"required":true,"configurable":false,"private":true,"searchable":false},"childId":{"type":"string","configurable":false,"private":true,"searchable":false},"deviceId":{"type":"string","required":true,"configurable":false,"private":true,"searchable":false},"origin":{"type":"string","required":true,"configurable":false,"private":true,"searchable":false},"expiresAt":{"type":"datetime","required":true,"configurable":false,"private":true,"searchable":false},"absoluteExpiresAt":{"type":"datetime","configurable":false,"private":true,"searchable":false},"status":{"type":"string","configurable":false,"private":true,"searchable":false},"type":{"type":"string","configurable":false,"private":true,"searchable":false}},"kind":"collectionType"},"modelName":"session"},"admin::audit-log":{"kind":"collectionType","collectionName":"strapi_audit_logs","info":{"singularName":"audit-log","pluralName":"audit-logs","displayName":"Audit Log"},"options":{"timestamps":false,"draftAndPublish":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","required":true},"date":{"type":"datetime","required":true},"user":{"type":"relation","relation":"oneToOne","target":"admin::user"},"payload":{"type":"json"},"createdAt":{"type":"datetime"},"updatedAt":{"type":"datetime"},"publishedAt":{"type":"datetime","configurable":false,"writable":true,"visible":true},"createdBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"updatedBy":{"type":"relation","relation":"oneToOne","target":"admin::user","configurable":false,"writable":false,"visible":false,"useJoinTable":false,"private":true},"locale":{"writable":true,"private":true,"configurable":false,"visible":false,"type":"string"},"localizations":{"type":"relation","relation":"oneToMany","target":"admin::audit-log","writable":false,"private":true,"configurable":false,"visible":false,"unstable_virtual":true,"joinColumn":{"name":"document_id","referencedColumn":"document_id","referencedTable":"strapi_audit_logs"}}},"plugin":"admin","globalId":"AdminAuditLog","uid":"admin::audit-log","modelType":"contentType","__schema__":{"collectionName":"strapi_audit_logs","info":{"singularName":"audit-log","pluralName":"audit-logs","displayName":"Audit Log"},"options":{"timestamps":false},"pluginOptions":{"content-manager":{"visible":false},"content-type-builder":{"visible":false}},"attributes":{"action":{"type":"string","required":true},"date":{"type":"datetime","required":true},"user":{"type":"relation","relation":"oneToOne","target":"admin::user"},"payload":{"type":"json"}},"kind":"collectionType"},"modelName":"audit-log"}}	object	\N	\N
4	plugin_content_manager_configuration_content_types::plugin::i18n.locale	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"code":{"edit":{"label":"code","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"code","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","code","createdAt"],"edit":[[{"name":"name","size":6},{"name":"code","size":6}]]},"uid":"plugin::i18n.locale"}	object	\N	\N
6	plugin_content_manager_configuration_content_types::plugin::upload.folder	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"pathId":{"edit":{"label":"pathId","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"pathId","searchable":true,"sortable":true}},"parent":{"edit":{"label":"parent","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"parent","searchable":true,"sortable":true}},"children":{"edit":{"label":"children","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"children","searchable":false,"sortable":false}},"files":{"edit":{"label":"files","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"files","searchable":false,"sortable":false}},"path":{"edit":{"label":"path","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"path","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","pathId","parent"],"edit":[[{"name":"name","size":6},{"name":"pathId","size":4}],[{"name":"parent","size":6},{"name":"children","size":6}],[{"name":"files","size":6},{"name":"path","size":6}]]},"uid":"plugin::upload.folder"}	object	\N	\N
7	plugin_content_manager_configuration_content_types::plugin::content-releases.release	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"releasedAt":{"edit":{"label":"releasedAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"releasedAt","searchable":true,"sortable":true}},"scheduledAt":{"edit":{"label":"scheduledAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"scheduledAt","searchable":true,"sortable":true}},"timezone":{"edit":{"label":"timezone","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"timezone","searchable":true,"sortable":true}},"status":{"edit":{"label":"status","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"status","searchable":true,"sortable":true}},"actions":{"edit":{"label":"actions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"contentType"},"list":{"label":"actions","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","releasedAt","scheduledAt"],"edit":[[{"name":"name","size":6},{"name":"releasedAt","size":6}],[{"name":"scheduledAt","size":6},{"name":"timezone","size":6}],[{"name":"status","size":6},{"name":"actions","size":6}]]},"uid":"plugin::content-releases.release"}	object	\N	\N
8	plugin_content_manager_configuration_content_types::plugin::content-releases.release-action	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"contentType","defaultSortBy":"contentType","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"type":{"edit":{"label":"type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"type","searchable":true,"sortable":true}},"contentType":{"edit":{"label":"contentType","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"contentType","searchable":true,"sortable":true}},"entryDocumentId":{"edit":{"label":"entryDocumentId","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"entryDocumentId","searchable":true,"sortable":true}},"release":{"edit":{"label":"release","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"release","searchable":true,"sortable":true}},"isEntryValid":{"edit":{"label":"isEntryValid","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"isEntryValid","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","type","contentType","entryDocumentId"],"edit":[[{"name":"type","size":6},{"name":"contentType","size":6}],[{"name":"entryDocumentId","size":6},{"name":"release","size":6}],[{"name":"isEntryValid","size":4}]]},"uid":"plugin::content-releases.release-action"}	object	\N	\N
9	plugin_content_manager_configuration_content_types::plugin::review-workflows.workflow	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"stages":{"edit":{"label":"stages","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"stages","searchable":false,"sortable":false}},"stageRequiredToPublish":{"edit":{"label":"stageRequiredToPublish","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"stageRequiredToPublish","searchable":true,"sortable":true}},"contentTypes":{"edit":{"label":"contentTypes","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"contentTypes","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","stages","stageRequiredToPublish"],"edit":[[{"name":"name","size":6},{"name":"stages","size":6}],[{"name":"stageRequiredToPublish","size":6}],[{"name":"contentTypes","size":12}]]},"uid":"plugin::review-workflows.workflow"}	object	\N	\N
10	plugin_content_manager_configuration_content_types::plugin::review-workflows.workflow-stage	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"color":{"edit":{"label":"color","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"color","searchable":true,"sortable":true}},"workflow":{"edit":{"label":"workflow","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"workflow","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","color","workflow"],"edit":[[{"name":"name","size":6},{"name":"color","size":6}],[{"name":"workflow","size":6},{"name":"permissions","size":6}]]},"uid":"plugin::review-workflows.workflow-stage"}	object	\N	\N
11	plugin_content_manager_configuration_content_types::plugin::users-permissions.permission	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"action":{"edit":{"label":"action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"action","searchable":true,"sortable":true}},"role":{"edit":{"label":"role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"role","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","role","createdAt"],"edit":[[{"name":"action","size":6},{"name":"role","size":6}]]},"uid":"plugin::users-permissions.permission"}	object	\N	\N
24	core_persisted_tables	[{"name":"strapi_history_versions"}]	object	\N	\N
12	plugin_content_manager_configuration_content_types::plugin::users-permissions.role	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"type":{"edit":{"label":"type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"type","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"users":{"edit":{"label":"users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"documentId"},"list":{"label":"users","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","description","type"],"edit":[[{"name":"name","size":6},{"name":"description","size":6}],[{"name":"type","size":6},{"name":"permissions","size":6}],[{"name":"users","size":6}]]},"uid":"plugin::users-permissions.role"}	object	\N	\N
15	plugin_content_manager_configuration_content_types::admin::permission	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"action":{"edit":{"label":"action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"action","searchable":true,"sortable":true}},"actionParameters":{"edit":{"label":"actionParameters","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"actionParameters","searchable":false,"sortable":false}},"subject":{"edit":{"label":"subject","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"subject","searchable":true,"sortable":true}},"properties":{"edit":{"label":"properties","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"properties","searchable":false,"sortable":false}},"conditions":{"edit":{"label":"conditions","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"conditions","searchable":false,"sortable":false}},"role":{"edit":{"label":"role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"role","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","subject","role"],"edit":[[{"name":"action","size":6}],[{"name":"actionParameters","size":12}],[{"name":"subject","size":6}],[{"name":"properties","size":12}],[{"name":"conditions","size":12}],[{"name":"role","size":6}]]},"uid":"admin::permission"}	object	\N	\N
17	plugin_content_manager_configuration_content_types::admin::role	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"code":{"edit":{"label":"code","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"code","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"users":{"edit":{"label":"users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"firstname"},"list":{"label":"users","searchable":false,"sortable":false}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","code","description"],"edit":[[{"name":"name","size":6},{"name":"code","size":6}],[{"name":"description","size":6},{"name":"users","size":6}],[{"name":"permissions","size":6}]]},"uid":"admin::role"}	object	\N	\N
19	plugin_content_manager_configuration_content_types::admin::api-token-permission	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"action":{"edit":{"label":"action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"action","searchable":true,"sortable":true}},"token":{"edit":{"label":"token","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"token","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","token","createdAt"],"edit":[[{"name":"action","size":6},{"name":"token","size":6}]]},"uid":"admin::api-token-permission"}	object	\N	\N
21	plugin_content_manager_configuration_content_types::admin::transfer-token-permission	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"action":{"edit":{"label":"action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"action","searchable":true,"sortable":true}},"token":{"edit":{"label":"token","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"token","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","token","createdAt"],"edit":[[{"name":"action","size":6},{"name":"token","size":6}]]},"uid":"admin::transfer-token-permission"}	object	\N	\N
23	plugin_content_manager_configuration_content_types::admin::audit-log	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"action":{"edit":{"label":"action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"action","searchable":true,"sortable":true}},"date":{"edit":{"label":"date","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"date","searchable":true,"sortable":true}},"user":{"edit":{"label":"user","description":"","placeholder":"","visible":true,"editable":true,"mainField":"firstname"},"list":{"label":"user","searchable":true,"sortable":true}},"payload":{"edit":{"label":"payload","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"payload","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","date","user"],"edit":[[{"name":"action","size":6},{"name":"date","size":6}],[{"name":"user","size":6}],[{"name":"payload","size":12}]]},"uid":"admin::audit-log"}	object	\N	\N
25	plugin_upload_settings	{"sizeOptimization":true,"responsiveDimensions":true,"autoOrientation":false,"aiMetadata":true}	object	\N	\N
26	plugin_upload_view_configuration	{"pageSize":10,"sort":"createdAt:DESC"}	object	\N	\N
28	plugin_i18n_default_locale	"en"	string	\N	\N
29	plugin_users-permissions_grant	{"email":{"icon":"envelope","enabled":true},"discord":{"icon":"discord","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/discord/callback","scope":["identify","email"]},"facebook":{"icon":"facebook-square","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/facebook/callback","scope":["email"]},"google":{"icon":"google","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/google/callback","scope":["email"]},"github":{"icon":"github","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/github/callback","scope":["user","user:email"]},"microsoft":{"icon":"windows","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/microsoft/callback","scope":["user.read"]},"twitter":{"icon":"twitter","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/twitter/callback"},"instagram":{"icon":"instagram","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/instagram/callback","scope":["user_profile"]},"vk":{"icon":"vk","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/vk/callback","scope":["email"]},"twitch":{"icon":"twitch","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/twitch/callback","scope":["user:read:email"]},"linkedin":{"icon":"linkedin","enabled":false,"key":"","secret":"","callbackUrl":"api/auth/linkedin/callback","scope":["r_liteprofile","r_emailaddress"]},"cognito":{"icon":"aws","enabled":false,"key":"","secret":"","subdomain":"my.subdomain.com","callback":"api/auth/cognito/callback","scope":["email","openid","profile"]},"reddit":{"icon":"reddit","enabled":false,"key":"","secret":"","callback":"api/auth/reddit/callback","scope":["identity"]},"auth0":{"icon":"","enabled":false,"key":"","secret":"","subdomain":"my-tenant.eu","callback":"api/auth/auth0/callback","scope":["openid","email","profile"]},"cas":{"icon":"book","enabled":false,"key":"","secret":"","callback":"api/auth/cas/callback","scope":["openid email"],"subdomain":"my.subdomain.com/cas"},"patreon":{"icon":"","enabled":false,"key":"","secret":"","callback":"api/auth/patreon/callback","scope":["identity","identity[email]"]},"keycloak":{"icon":"","enabled":false,"key":"","secret":"","subdomain":"myKeycloakProvider.com/realms/myrealm","callback":"api/auth/keycloak/callback","scope":["openid","email","profile"]}}	object	\N	\N
30	plugin_users-permissions_email	{"reset_password":{"display":"Email.template.reset_password","icon":"sync","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Reset password","message":"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>"}},"email_confirmation":{"display":"Email.template.email_confirmation","icon":"check-square","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Account confirmation","message":"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>"}}}	object	\N	\N
31	plugin_users-permissions_advanced	{"unique_email":true,"allow_register":true,"email_confirmation":false,"email_reset_password":null,"email_confirmation_redirection":null,"default_role":"authenticated"}	object	\N	\N
14	plugin_content_manager_configuration_content_types::plugin::users-permissions.user	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"documentId","defaultSortBy":"documentId","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"username":{"edit":{"label":"username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"username","searchable":true,"sortable":true}},"email":{"edit":{"label":"email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"email","searchable":true,"sortable":true}},"provider":{"edit":{"label":"provider","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"provider","searchable":true,"sortable":true}},"password":{"edit":{"label":"password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"resetPasswordToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"resetPasswordToken","searchable":true,"sortable":true}},"confirmationToken":{"edit":{"label":"confirmationToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"confirmationToken","searchable":true,"sortable":true}},"confirmed":{"edit":{"label":"confirmed","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"confirmed","searchable":true,"sortable":true}},"blocked":{"edit":{"label":"blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"blocked","searchable":true,"sortable":true}},"role":{"edit":{"label":"role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"role","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","createdAt","updatedAt"],"edit":[[{"name":"username","size":6}],[{"name":"email","size":6},{"name":"password","size":6}],[{"name":"confirmed","size":4},{"name":"blocked","size":4}],[{"name":"role","size":6}]]},"uid":"plugin::users-permissions.user"}	object	\N	\N
27	plugin_upload_metrics	{"weeklySchedule":"50 57 15 * * 1","lastWeeklyUpdate":1771858671649}	object	\N	\N
2	ee_information	{"lastCheckAt":1771868469186,"error":"The associated subscription is cancelled.","license":null}	\N	\N	\N
35	plugin_content_manager_configuration_content_types::api::noticia.noticia	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"titulo","defaultSortBy":"titulo","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"titulo":{"edit":{"label":"titulo","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"titulo","searchable":true,"sortable":true}},"resumo":{"edit":{"label":"resumo","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"resumo","searchable":true,"sortable":true}},"link":{"edit":{"label":"link","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"link","searchable":true,"sortable":true}},"conteudo":{"edit":{"label":"conteudo","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"conteudo","searchable":true,"sortable":true}},"categoria":{"edit":{"label":"categoria","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"categoria","searchable":true,"sortable":true}},"data":{"edit":{"label":"data","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"data","searchable":true,"sortable":true}},"imagem":{"edit":{"label":"imagem","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"imagem","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","titulo","resumo","link"],"edit":[[{"name":"titulo","size":6},{"name":"resumo","size":6}],[{"name":"link","size":6},{"name":"conteudo","size":6}],[{"name":"categoria","size":6},{"name":"data","size":4}],[{"name":"imagem","size":6}]]},"uid":"api::noticia.noticia"}	object	\N	\N
32	core_admin_auth	{"providers":{"autoRegister":false,"defaultRole":null,"ssoLockedRoles":null}}	object	\N	\N
5	plugin_content_manager_configuration_content_types::api::imovel.imovel	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"titulo","defaultSortBy":"titulo","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"titulo":{"edit":{"label":"titulo","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"titulo","searchable":true,"sortable":true}},"descricao":{"edit":{"label":"descricao","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"descricao","searchable":false,"sortable":false}},"tamanho":{"edit":{"label":"tamanho","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"tamanho","searchable":true,"sortable":true}},"area_total":{"edit":{"label":"area_total","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"area_total","searchable":true,"sortable":true}},"condominio":{"edit":{"label":"condominio","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"condominio","searchable":true,"sortable":true}},"iptu":{"edit":{"label":"iptu","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"iptu","searchable":true,"sortable":true}},"quartos":{"edit":{"label":"quartos","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"quartos","searchable":true,"sortable":true}},"banheiros":{"edit":{"label":"banheiros","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"banheiros","searchable":true,"sortable":true}},"bairro":{"edit":{"label":"bairro","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"bairro","searchable":false,"sortable":false}},"cidade":{"edit":{"label":"cidade","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"cidade","searchable":true,"sortable":true}},"preco":{"edit":{"label":"preco","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"preco","searchable":true,"sortable":true}},"finalidade":{"edit":{"label":"finalidade","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"finalidade","searchable":true,"sortable":true}},"endereco":{"edit":{"label":"endereco","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"endereco","searchable":true,"sortable":true}},"latitude":{"edit":{"label":"latitude","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"latitude","searchable":true,"sortable":true}},"longitude":{"edit":{"label":"longitude","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"longitude","searchable":true,"sortable":true}},"tipo":{"edit":{"label":"tipo","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"tipo","searchable":true,"sortable":true}},"fotos":{"edit":{"label":"fotos","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"fotos","searchable":false,"sortable":false}},"usuario":{"edit":{"label":"usuario","description":"","placeholder":"","visible":true,"editable":true,"mainField":"username"},"list":{"label":"usuario","searchable":true,"sortable":true}},"caracteristicas":{"edit":{"label":"caracteristicas","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"caracteristicas","searchable":false,"sortable":false}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","titulo","tamanho","quartos"],"edit":[[{"name":"titulo","size":6}],[{"name":"descricao","size":12}],[{"name":"tamanho","size":4},{"name":"quartos","size":4},{"name":"banheiros","size":4}],[{"name":"preco","size":4}],[{"name":"fotos","size":6}],[{"name":"usuario","size":6},{"name":"cidade","size":6}],[{"name":"bairro","size":12}],[{"name":"finalidade","size":6},{"name":"tipo","size":6}],[{"name":"endereco","size":6},{"name":"latitude","size":4}],[{"name":"longitude","size":4}],[{"name":"condominio","size":4},{"name":"iptu","size":4},{"name":"area_total","size":4}],[{"name":"caracteristicas","size":12}]]},"uid":"api::imovel.imovel"}	object	\N	\N
33	ee_disabled_users	[]	object	\N	\N
34	plugin_upload_api-folder	{"id":1}	object	\N	\N
13	plugin_content_manager_configuration_content_types::plugin::upload.file	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"alternativeText":{"edit":{"label":"alternativeText","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"alternativeText","searchable":true,"sortable":true}},"caption":{"edit":{"label":"caption","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"caption","searchable":true,"sortable":true}},"width":{"edit":{"label":"width","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"width","searchable":true,"sortable":true}},"height":{"edit":{"label":"height","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"height","searchable":true,"sortable":true}},"formats":{"edit":{"label":"formats","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"formats","searchable":false,"sortable":false}},"hash":{"edit":{"label":"hash","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"hash","searchable":true,"sortable":true}},"ext":{"edit":{"label":"ext","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"ext","searchable":true,"sortable":true}},"mime":{"edit":{"label":"mime","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"mime","searchable":true,"sortable":true}},"size":{"edit":{"label":"size","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"size","searchable":true,"sortable":true}},"url":{"edit":{"label":"url","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"url","searchable":true,"sortable":true}},"previewUrl":{"edit":{"label":"previewUrl","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"previewUrl","searchable":true,"sortable":true}},"provider":{"edit":{"label":"provider","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"provider","searchable":true,"sortable":true}},"provider_metadata":{"edit":{"label":"provider_metadata","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"provider_metadata","searchable":false,"sortable":false}},"folder":{"edit":{"label":"folder","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"folder","searchable":true,"sortable":true}},"folderPath":{"edit":{"label":"folderPath","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"folderPath","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","alternativeText","caption"],"edit":[[{"name":"name","size":6},{"name":"alternativeText","size":6}],[{"name":"caption","size":6},{"name":"width","size":4}],[{"name":"height","size":4}],[{"name":"formats","size":12}],[{"name":"hash","size":6},{"name":"ext","size":6}],[{"name":"mime","size":6},{"name":"size","size":4}],[{"name":"url","size":6},{"name":"previewUrl","size":6}],[{"name":"provider","size":6}],[{"name":"provider_metadata","size":12}],[{"name":"folder","size":6},{"name":"folderPath","size":6}]]},"uid":"plugin::upload.file"}	object	\N	\N
16	plugin_content_manager_configuration_content_types::admin::user	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"firstname","defaultSortBy":"firstname","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"firstname":{"edit":{"label":"firstname","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"firstname","searchable":true,"sortable":true}},"lastname":{"edit":{"label":"lastname","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"lastname","searchable":true,"sortable":true}},"username":{"edit":{"label":"username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"username","searchable":true,"sortable":true}},"email":{"edit":{"label":"email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"email","searchable":true,"sortable":true}},"password":{"edit":{"label":"password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"resetPasswordToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"resetPasswordToken","searchable":true,"sortable":true}},"registrationToken":{"edit":{"label":"registrationToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"registrationToken","searchable":true,"sortable":true}},"isActive":{"edit":{"label":"isActive","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"isActive","searchable":true,"sortable":true}},"roles":{"edit":{"label":"roles","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"roles","searchable":false,"sortable":false}},"blocked":{"edit":{"label":"blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"blocked","searchable":true,"sortable":true}},"preferedLanguage":{"edit":{"label":"preferedLanguage","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"preferedLanguage","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","firstname","lastname","username"],"edit":[[{"name":"firstname","size":6},{"name":"lastname","size":6}],[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6},{"name":"isActive","size":4}],[{"name":"roles","size":6},{"name":"blocked","size":4}],[{"name":"preferedLanguage","size":6}]]},"uid":"admin::user"}	object	\N	\N
18	plugin_content_manager_configuration_content_types::admin::api-token	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"type":{"edit":{"label":"type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"type","searchable":true,"sortable":true}},"accessKey":{"edit":{"label":"accessKey","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"accessKey","searchable":true,"sortable":true}},"encryptedKey":{"edit":{"label":"encryptedKey","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"encryptedKey","searchable":true,"sortable":true}},"lastUsedAt":{"edit":{"label":"lastUsedAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"lastUsedAt","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"expiresAt":{"edit":{"label":"expiresAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"expiresAt","searchable":true,"sortable":true}},"lifespan":{"edit":{"label":"lifespan","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"lifespan","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","description","type"],"edit":[[{"name":"name","size":6},{"name":"description","size":6}],[{"name":"type","size":6},{"name":"accessKey","size":6}],[{"name":"encryptedKey","size":6},{"name":"lastUsedAt","size":6}],[{"name":"permissions","size":6},{"name":"expiresAt","size":6}],[{"name":"lifespan","size":4}]]},"uid":"admin::api-token"}	object	\N	\N
20	plugin_content_manager_configuration_content_types::admin::transfer-token	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"name":{"edit":{"label":"name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"name","searchable":true,"sortable":true}},"description":{"edit":{"label":"description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"description","searchable":true,"sortable":true}},"accessKey":{"edit":{"label":"accessKey","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"accessKey","searchable":true,"sortable":true}},"lastUsedAt":{"edit":{"label":"lastUsedAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"lastUsedAt","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"permissions","searchable":false,"sortable":false}},"expiresAt":{"edit":{"label":"expiresAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"expiresAt","searchable":true,"sortable":true}},"lifespan":{"edit":{"label":"lifespan","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"lifespan","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","description","accessKey"],"edit":[[{"name":"name","size":6},{"name":"description","size":6}],[{"name":"accessKey","size":6},{"name":"lastUsedAt","size":6}],[{"name":"permissions","size":6},{"name":"expiresAt","size":6}],[{"name":"lifespan","size":4}]]},"uid":"admin::transfer-token"}	object	\N	\N
22	plugin_content_manager_configuration_content_types::admin::session	{"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"userId","defaultSortBy":"userId","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"id","searchable":true,"sortable":true}},"userId":{"edit":{"label":"userId","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"userId","searchable":true,"sortable":true}},"sessionId":{"edit":{"label":"sessionId","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"sessionId","searchable":true,"sortable":true}},"childId":{"edit":{"label":"childId","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"childId","searchable":true,"sortable":true}},"deviceId":{"edit":{"label":"deviceId","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"deviceId","searchable":true,"sortable":true}},"origin":{"edit":{"label":"origin","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"origin","searchable":true,"sortable":true}},"expiresAt":{"edit":{"label":"expiresAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"expiresAt","searchable":true,"sortable":true}},"absoluteExpiresAt":{"edit":{"label":"absoluteExpiresAt","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"absoluteExpiresAt","searchable":true,"sortable":true}},"status":{"edit":{"label":"status","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"status","searchable":true,"sortable":true}},"type":{"edit":{"label":"type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"type","searchable":true,"sortable":true}},"createdAt":{"edit":{"label":"createdAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"createdAt","searchable":true,"sortable":true}},"updatedAt":{"edit":{"label":"updatedAt","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"updatedAt","searchable":true,"sortable":true}},"createdBy":{"edit":{"label":"createdBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"createdBy","searchable":true,"sortable":true}},"updatedBy":{"edit":{"label":"updatedBy","description":"","placeholder":"","visible":false,"editable":true,"mainField":"firstname"},"list":{"label":"updatedBy","searchable":true,"sortable":true}},"documentId":{"edit":{},"list":{"label":"documentId","searchable":true,"sortable":true}}},"layouts":{"list":["id","userId","sessionId","childId"],"edit":[[{"name":"userId","size":6},{"name":"sessionId","size":6}],[{"name":"childId","size":6},{"name":"deviceId","size":6}],[{"name":"origin","size":6},{"name":"expiresAt","size":6}],[{"name":"absoluteExpiresAt","size":6},{"name":"status","size":6}],[{"name":"type","size":6}]]},"uid":"admin::session"}	object	\N	\N
\.


--
-- Data for Name: strapi_database_schema; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_database_schema (id, schema, "time", hash) FROM stdin;
15	{"tables":[{"name":"imoveis","indexes":[{"name":"imoveis_documents_idx","columns":["document_id","locale","published_at"]},{"name":"imoveis_created_by_id_fk","columns":["created_by_id"]},{"name":"imoveis_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"imoveis_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"imoveis_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"titulo","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"descricao","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"tamanho","type":"decimal","args":[10,2],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"area_total","type":"decimal","args":[10,2],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"condominio","type":"decimal","args":[10,2],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"iptu","type":"decimal","args":[10,2],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"quartos","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"banheiros","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"bairro","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"cidade","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"preco","type":"decimal","args":[10,2],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"finalidade","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"endereco","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"latitude","type":"decimal","args":[10,2],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"longitude","type":"decimal","args":[10,2],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"tipo","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"caracteristicas","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"noticias","indexes":[{"name":"noticias_documents_idx","columns":["document_id","locale","published_at"]},{"name":"noticias_created_by_id_fk","columns":["created_by_id"]},{"name":"noticias_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"noticias_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"noticias_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"titulo","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"resumo","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"link","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"conteudo","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"categoria","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"data","type":"date","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"files","indexes":[{"name":"upload_files_folder_path_index","columns":["folder_path"],"type":null},{"name":"upload_files_created_at_index","columns":["created_at"],"type":null},{"name":"upload_files_updated_at_index","columns":["updated_at"],"type":null},{"name":"upload_files_name_index","columns":["name"],"type":null},{"name":"upload_files_size_index","columns":["size"],"type":null},{"name":"upload_files_ext_index","columns":["ext"],"type":null},{"name":"files_documents_idx","columns":["document_id","locale","published_at"]},{"name":"files_created_by_id_fk","columns":["created_by_id"]},{"name":"files_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"files_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"files_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"alternative_text","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"caption","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"width","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"height","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"formats","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"hash","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"ext","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"mime","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"size","type":"decimal","args":[10,2],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"url","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"preview_url","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"provider","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"provider_metadata","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"folder_path","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"upload_folders","indexes":[{"name":"upload_folders_path_id_index","columns":["path_id"],"type":"unique"},{"name":"upload_folders_path_index","columns":["path"],"type":"unique"},{"name":"upload_folders_documents_idx","columns":["document_id","locale","published_at"]},{"name":"upload_folders_created_by_id_fk","columns":["created_by_id"]},{"name":"upload_folders_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"upload_folders_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"upload_folders_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"path_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"path","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"i18n_locale","indexes":[{"name":"i18n_locale_documents_idx","columns":["document_id","locale","published_at"]},{"name":"i18n_locale_created_by_id_fk","columns":["created_by_id"]},{"name":"i18n_locale_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"i18n_locale_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"i18n_locale_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"code","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_releases","indexes":[{"name":"strapi_releases_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_releases_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_releases_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_releases_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_releases_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"released_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"scheduled_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"timezone","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"status","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_release_actions","indexes":[{"name":"strapi_release_actions_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_release_actions_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_release_actions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_release_actions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_release_actions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"content_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"entry_document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"is_entry_valid","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_workflows","indexes":[{"name":"strapi_workflows_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_workflows_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_workflows_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_workflows_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_workflows_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"content_types","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_workflows_stages","indexes":[{"name":"strapi_workflows_stages_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_workflows_stages_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_workflows_stages_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_workflows_stages_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_workflows_stages_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"color","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"up_permissions","indexes":[{"name":"up_permissions_documents_idx","columns":["document_id","locale","published_at"]},{"name":"up_permissions_created_by_id_fk","columns":["created_by_id"]},{"name":"up_permissions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"up_permissions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"up_permissions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"action","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"up_roles","indexes":[{"name":"up_roles_documents_idx","columns":["document_id","locale","published_at"]},{"name":"up_roles_created_by_id_fk","columns":["created_by_id"]},{"name":"up_roles_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"up_roles_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"up_roles_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"up_users","indexes":[{"name":"up_users_documents_idx","columns":["document_id","locale","published_at"]},{"name":"up_users_created_by_id_fk","columns":["created_by_id"]},{"name":"up_users_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"up_users_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"up_users_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"username","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"email","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"provider","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"password","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"reset_password_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"confirmation_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"confirmed","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"blocked","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"admin_permissions","indexes":[{"name":"admin_permissions_documents_idx","columns":["document_id","locale","published_at"]},{"name":"admin_permissions_created_by_id_fk","columns":["created_by_id"]},{"name":"admin_permissions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"admin_permissions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"admin_permissions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"action","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"action_parameters","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"subject","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"properties","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"conditions","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"admin_users","indexes":[{"name":"admin_users_documents_idx","columns":["document_id","locale","published_at"]},{"name":"admin_users_created_by_id_fk","columns":["created_by_id"]},{"name":"admin_users_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"admin_users_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"admin_users_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"firstname","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"lastname","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"username","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"email","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"password","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"reset_password_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"registration_token","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"is_active","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"blocked","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"prefered_language","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"admin_roles","indexes":[{"name":"admin_roles_documents_idx","columns":["document_id","locale","published_at"]},{"name":"admin_roles_created_by_id_fk","columns":["created_by_id"]},{"name":"admin_roles_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"admin_roles_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"admin_roles_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"code","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_api_tokens","indexes":[{"name":"strapi_api_tokens_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_api_tokens_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_api_tokens_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_api_tokens_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_api_tokens_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"access_key","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"encrypted_key","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"last_used_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"expires_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"lifespan","type":"bigInteger","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_api_token_permissions","indexes":[{"name":"strapi_api_token_permissions_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_api_token_permissions_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_api_token_permissions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_api_token_permissions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_api_token_permissions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"action","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_transfer_tokens","indexes":[{"name":"strapi_transfer_tokens_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_transfer_tokens_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_transfer_tokens_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_transfer_tokens_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_transfer_tokens_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"description","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"access_key","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"last_used_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"expires_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"lifespan","type":"bigInteger","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_transfer_token_permissions","indexes":[{"name":"strapi_transfer_token_permissions_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_transfer_token_permissions_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_transfer_token_permissions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_transfer_token_permissions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_transfer_token_permissions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"action","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_sessions","indexes":[{"name":"strapi_sessions_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_sessions_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_sessions_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_sessions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_sessions_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"user_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"session_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"child_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"device_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"origin","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"expires_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"absolute_expires_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"status","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_audit_logs","indexes":[{"name":"strapi_audit_logs_documents_idx","columns":["document_id","locale","published_at"]},{"name":"strapi_audit_logs_created_by_id_fk","columns":["created_by_id"]},{"name":"strapi_audit_logs_updated_by_id_fk","columns":["updated_by_id"]}],"foreignKeys":[{"name":"strapi_audit_logs_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"},{"name":"strapi_audit_logs_updated_by_id_fk","columns":["updated_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"action","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"date","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"payload","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"published_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"updated_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_core_store_settings","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"key","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"value","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"environment","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"tag","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_webhooks","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"name","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"url","type":"text","args":["longtext"],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"headers","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"events","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"enabled","type":"boolean","args":[],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"strapi_history_versions","indexes":[{"name":"strapi_history_versions_created_by_id_fk","columns":["created_by_id"]}],"foreignKeys":[{"name":"strapi_history_versions_created_by_id_fk","columns":["created_by_id"],"referencedTable":"admin_users","referencedColumns":["id"],"onDelete":"SET NULL"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"content_type","type":"string","args":[],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"related_document_id","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"locale","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"status","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"data","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"schema","type":"jsonb","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"created_by_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_ai_localization_jobs","indexes":[],"foreignKeys":[],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"content_type","type":"string","args":[],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"related_document_id","type":"string","args":[],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"source_locale","type":"string","args":[],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"target_locales","type":"jsonb","args":[],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"status","type":"string","args":[],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"created_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"updated_at","type":"datetime","args":[{"useTz":false,"precision":6}],"defaultTo":null,"notNullable":false,"unsigned":false}]},{"name":"imoveis_usuario_lnk","indexes":[{"name":"imoveis_usuario_lnk_fk","columns":["imovel_id"]},{"name":"imoveis_usuario_lnk_ifk","columns":["user_id"]},{"name":"imoveis_usuario_lnk_uq","columns":["imovel_id","user_id"],"type":"unique"}],"foreignKeys":[{"name":"imoveis_usuario_lnk_fk","columns":["imovel_id"],"referencedColumns":["id"],"referencedTable":"imoveis","onDelete":"CASCADE"},{"name":"imoveis_usuario_lnk_ifk","columns":["user_id"],"referencedColumns":["id"],"referencedTable":"up_users","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"imovel_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"user_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"files_related_mph","indexes":[{"name":"files_related_mph_fk","columns":["file_id"]},{"name":"files_related_mph_oidx","columns":["order"]},{"name":"files_related_mph_idix","columns":["related_id"]}],"foreignKeys":[{"name":"files_related_mph_fk","columns":["file_id"],"referencedColumns":["id"],"referencedTable":"files","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"file_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"related_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"related_type","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"field","type":"string","args":[],"defaultTo":null,"notNullable":false,"unsigned":false},{"name":"order","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"files_folder_lnk","indexes":[{"name":"files_folder_lnk_fk","columns":["file_id"]},{"name":"files_folder_lnk_ifk","columns":["folder_id"]},{"name":"files_folder_lnk_uq","columns":["file_id","folder_id"],"type":"unique"},{"name":"files_folder_lnk_oifk","columns":["file_ord"]}],"foreignKeys":[{"name":"files_folder_lnk_fk","columns":["file_id"],"referencedColumns":["id"],"referencedTable":"files","onDelete":"CASCADE"},{"name":"files_folder_lnk_ifk","columns":["folder_id"],"referencedColumns":["id"],"referencedTable":"upload_folders","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"file_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"folder_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"file_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"upload_folders_parent_lnk","indexes":[{"name":"upload_folders_parent_lnk_fk","columns":["folder_id"]},{"name":"upload_folders_parent_lnk_ifk","columns":["inv_folder_id"]},{"name":"upload_folders_parent_lnk_uq","columns":["folder_id","inv_folder_id"],"type":"unique"},{"name":"upload_folders_parent_lnk_oifk","columns":["folder_ord"]}],"foreignKeys":[{"name":"upload_folders_parent_lnk_fk","columns":["folder_id"],"referencedColumns":["id"],"referencedTable":"upload_folders","onDelete":"CASCADE"},{"name":"upload_folders_parent_lnk_ifk","columns":["inv_folder_id"],"referencedColumns":["id"],"referencedTable":"upload_folders","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"folder_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"inv_folder_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"folder_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_release_actions_release_lnk","indexes":[{"name":"strapi_release_actions_release_lnk_fk","columns":["release_action_id"]},{"name":"strapi_release_actions_release_lnk_ifk","columns":["release_id"]},{"name":"strapi_release_actions_release_lnk_uq","columns":["release_action_id","release_id"],"type":"unique"},{"name":"strapi_release_actions_release_lnk_oifk","columns":["release_action_ord"]}],"foreignKeys":[{"name":"strapi_release_actions_release_lnk_fk","columns":["release_action_id"],"referencedColumns":["id"],"referencedTable":"strapi_release_actions","onDelete":"CASCADE"},{"name":"strapi_release_actions_release_lnk_ifk","columns":["release_id"],"referencedColumns":["id"],"referencedTable":"strapi_releases","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"release_action_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"release_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"release_action_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_workflows_stage_required_to_publish_lnk","indexes":[{"name":"strapi_workflows_stage_required_to_publish_lnk_fk","columns":["workflow_id"]},{"name":"strapi_workflows_stage_required_to_publish_lnk_ifk","columns":["workflow_stage_id"]},{"name":"strapi_workflows_stage_required_to_publish_lnk_uq","columns":["workflow_id","workflow_stage_id"],"type":"unique"}],"foreignKeys":[{"name":"strapi_workflows_stage_required_to_publish_lnk_fk","columns":["workflow_id"],"referencedColumns":["id"],"referencedTable":"strapi_workflows","onDelete":"CASCADE"},{"name":"strapi_workflows_stage_required_to_publish_lnk_ifk","columns":["workflow_stage_id"],"referencedColumns":["id"],"referencedTable":"strapi_workflows_stages","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"workflow_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"workflow_stage_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_workflows_stages_workflow_lnk","indexes":[{"name":"strapi_workflows_stages_workflow_lnk_fk","columns":["workflow_stage_id"]},{"name":"strapi_workflows_stages_workflow_lnk_ifk","columns":["workflow_id"]},{"name":"strapi_workflows_stages_workflow_lnk_uq","columns":["workflow_stage_id","workflow_id"],"type":"unique"},{"name":"strapi_workflows_stages_workflow_lnk_oifk","columns":["workflow_stage_ord"]}],"foreignKeys":[{"name":"strapi_workflows_stages_workflow_lnk_fk","columns":["workflow_stage_id"],"referencedColumns":["id"],"referencedTable":"strapi_workflows_stages","onDelete":"CASCADE"},{"name":"strapi_workflows_stages_workflow_lnk_ifk","columns":["workflow_id"],"referencedColumns":["id"],"referencedTable":"strapi_workflows","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"workflow_stage_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"workflow_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"workflow_stage_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_workflows_stages_permissions_lnk","indexes":[{"name":"strapi_workflows_stages_permissions_lnk_fk","columns":["workflow_stage_id"]},{"name":"strapi_workflows_stages_permissions_lnk_ifk","columns":["permission_id"]},{"name":"strapi_workflows_stages_permissions_lnk_uq","columns":["workflow_stage_id","permission_id"],"type":"unique"},{"name":"strapi_workflows_stages_permissions_lnk_ofk","columns":["permission_ord"]}],"foreignKeys":[{"name":"strapi_workflows_stages_permissions_lnk_fk","columns":["workflow_stage_id"],"referencedColumns":["id"],"referencedTable":"strapi_workflows_stages","onDelete":"CASCADE"},{"name":"strapi_workflows_stages_permissions_lnk_ifk","columns":["permission_id"],"referencedColumns":["id"],"referencedTable":"admin_permissions","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"workflow_stage_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"permission_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"up_permissions_role_lnk","indexes":[{"name":"up_permissions_role_lnk_fk","columns":["permission_id"]},{"name":"up_permissions_role_lnk_ifk","columns":["role_id"]},{"name":"up_permissions_role_lnk_uq","columns":["permission_id","role_id"],"type":"unique"},{"name":"up_permissions_role_lnk_oifk","columns":["permission_ord"]}],"foreignKeys":[{"name":"up_permissions_role_lnk_fk","columns":["permission_id"],"referencedColumns":["id"],"referencedTable":"up_permissions","onDelete":"CASCADE"},{"name":"up_permissions_role_lnk_ifk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"up_roles","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"permission_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"up_users_role_lnk","indexes":[{"name":"up_users_role_lnk_fk","columns":["user_id"]},{"name":"up_users_role_lnk_ifk","columns":["role_id"]},{"name":"up_users_role_lnk_uq","columns":["user_id","role_id"],"type":"unique"},{"name":"up_users_role_lnk_oifk","columns":["user_ord"]}],"foreignKeys":[{"name":"up_users_role_lnk_fk","columns":["user_id"],"referencedColumns":["id"],"referencedTable":"up_users","onDelete":"CASCADE"},{"name":"up_users_role_lnk_ifk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"up_roles","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"user_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"user_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"admin_permissions_role_lnk","indexes":[{"name":"admin_permissions_role_lnk_fk","columns":["permission_id"]},{"name":"admin_permissions_role_lnk_ifk","columns":["role_id"]},{"name":"admin_permissions_role_lnk_uq","columns":["permission_id","role_id"],"type":"unique"},{"name":"admin_permissions_role_lnk_oifk","columns":["permission_ord"]}],"foreignKeys":[{"name":"admin_permissions_role_lnk_fk","columns":["permission_id"],"referencedColumns":["id"],"referencedTable":"admin_permissions","onDelete":"CASCADE"},{"name":"admin_permissions_role_lnk_ifk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"admin_roles","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"permission_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"admin_users_roles_lnk","indexes":[{"name":"admin_users_roles_lnk_fk","columns":["user_id"]},{"name":"admin_users_roles_lnk_ifk","columns":["role_id"]},{"name":"admin_users_roles_lnk_uq","columns":["user_id","role_id"],"type":"unique"},{"name":"admin_users_roles_lnk_ofk","columns":["role_ord"]},{"name":"admin_users_roles_lnk_oifk","columns":["user_ord"]}],"foreignKeys":[{"name":"admin_users_roles_lnk_fk","columns":["user_id"],"referencedColumns":["id"],"referencedTable":"admin_users","onDelete":"CASCADE"},{"name":"admin_users_roles_lnk_ifk","columns":["role_id"],"referencedColumns":["id"],"referencedTable":"admin_roles","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"user_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"role_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"user_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_api_token_permissions_token_lnk","indexes":[{"name":"strapi_api_token_permissions_token_lnk_fk","columns":["api_token_permission_id"]},{"name":"strapi_api_token_permissions_token_lnk_ifk","columns":["api_token_id"]},{"name":"strapi_api_token_permissions_token_lnk_uq","columns":["api_token_permission_id","api_token_id"],"type":"unique"},{"name":"strapi_api_token_permissions_token_lnk_oifk","columns":["api_token_permission_ord"]}],"foreignKeys":[{"name":"strapi_api_token_permissions_token_lnk_fk","columns":["api_token_permission_id"],"referencedColumns":["id"],"referencedTable":"strapi_api_token_permissions","onDelete":"CASCADE"},{"name":"strapi_api_token_permissions_token_lnk_ifk","columns":["api_token_id"],"referencedColumns":["id"],"referencedTable":"strapi_api_tokens","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"api_token_permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"api_token_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"api_token_permission_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_transfer_token_permissions_token_lnk","indexes":[{"name":"strapi_transfer_token_permissions_token_lnk_fk","columns":["transfer_token_permission_id"]},{"name":"strapi_transfer_token_permissions_token_lnk_ifk","columns":["transfer_token_id"]},{"name":"strapi_transfer_token_permissions_token_lnk_uq","columns":["transfer_token_permission_id","transfer_token_id"],"type":"unique"},{"name":"strapi_transfer_token_permissions_token_lnk_oifk","columns":["transfer_token_permission_ord"]}],"foreignKeys":[{"name":"strapi_transfer_token_permissions_token_lnk_fk","columns":["transfer_token_permission_id"],"referencedColumns":["id"],"referencedTable":"strapi_transfer_token_permissions","onDelete":"CASCADE"},{"name":"strapi_transfer_token_permissions_token_lnk_ifk","columns":["transfer_token_id"],"referencedColumns":["id"],"referencedTable":"strapi_transfer_tokens","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"transfer_token_permission_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"transfer_token_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"transfer_token_permission_ord","type":"double","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]},{"name":"strapi_audit_logs_user_lnk","indexes":[{"name":"strapi_audit_logs_user_lnk_fk","columns":["audit_log_id"]},{"name":"strapi_audit_logs_user_lnk_ifk","columns":["user_id"]},{"name":"strapi_audit_logs_user_lnk_uq","columns":["audit_log_id","user_id"],"type":"unique"}],"foreignKeys":[{"name":"strapi_audit_logs_user_lnk_fk","columns":["audit_log_id"],"referencedColumns":["id"],"referencedTable":"strapi_audit_logs","onDelete":"CASCADE"},{"name":"strapi_audit_logs_user_lnk_ifk","columns":["user_id"],"referencedColumns":["id"],"referencedTable":"admin_users","onDelete":"CASCADE"}],"columns":[{"name":"id","type":"increments","args":[{"primary":true,"primaryKey":true}],"defaultTo":null,"notNullable":true,"unsigned":false},{"name":"audit_log_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true},{"name":"user_id","type":"integer","args":[],"defaultTo":null,"notNullable":false,"unsigned":true}]}]}	2026-02-23 18:30:42.762	a07cff8390fbf60647a0c628b2e4d2b93206ce99492d6143c0f9695d8b95ab1b
\.


--
-- Data for Name: strapi_history_versions; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_history_versions (id, content_type, related_document_id, locale, status, data, schema, created_at, created_by_id) FROM stdin;
\.


--
-- Data for Name: strapi_migrations; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_migrations (id, name, "time") FROM stdin;
\.


--
-- Data for Name: strapi_migrations_internal; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_migrations_internal (id, name, "time") FROM stdin;
1	5.0.0-rename-identifiers-longer-than-max-length	2026-01-25 17:23:56.867
2	5.0.0-02-created-document-id	2026-01-25 17:23:56.881
3	5.0.0-03-created-locale	2026-01-25 17:23:56.893
4	5.0.0-04-created-published-at	2026-01-25 17:23:56.906
5	5.0.0-05-drop-slug-fields-index	2026-01-25 17:23:56.919
6	core::5.0.0-discard-drafts	2026-01-25 17:23:56.931
7	content-releases::5.0.0-add-entry-document-id-to-release-actions	2026-01-25 17:23:56.932
\.


--
-- Data for Name: strapi_release_actions; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_release_actions (id, document_id, type, content_type, entry_document_id, locale, is_entry_valid, created_at, updated_at, published_at, created_by_id, updated_by_id) FROM stdin;
\.


--
-- Data for Name: strapi_release_actions_release_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_release_actions_release_lnk (id, release_action_id, release_id, release_action_ord) FROM stdin;
\.


--
-- Data for Name: strapi_releases; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_releases (id, document_id, name, released_at, scheduled_at, timezone, status, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_sessions; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_sessions (id, document_id, user_id, session_id, child_id, device_id, origin, expires_at, absolute_expires_at, status, type, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
4	qher1rte14x3y1p27cfcwooy	1	2002176813200d17c224f070565e50c3	\N	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-01-25 20:28:20.149	2026-02-24 18:28:20.149	active	session	2026-01-25 18:28:20.149	2026-01-25 18:28:20.149	2026-01-25 18:28:20.149	\N	\N	\N
3	zofea2349lvxue6zf0t9lu3u	1	b64eb52facdc42a1fe6fec7dbe397ed9	2b8963a88155289e506a668a3900097e	1c5a4d7c-cb50-4afd-b1b8-ef324b77fc83	admin	2026-02-08 18:27:16.881	2026-02-24 18:27:16.881	rotated	refresh	2026-01-25 18:27:16.881	2026-01-25 19:26:24.55	2026-01-25 18:27:16.881	\N	\N	\N
6	etyxv3wzddrtidxubcxzwcwl	1	82c0ccc8dbbfcd2daa3b1b66b623783c	\N	055d3682-0c43-45a1-ad2b-d0ae88b0e6a7	admin	2026-01-26 01:05:04.549	2026-02-24 23:05:04.549	active	session	2026-01-25 23:05:04.549	2026-01-25 23:05:04.549	2026-01-25 23:05:04.55	\N	\N	\N
5	men5w513nfvw0mihbfezgahg	1	2b8963a88155289e506a668a3900097e	a4fab00b3e6136bc8fe1248c4560bbca	1c5a4d7c-cb50-4afd-b1b8-ef324b77fc83	admin	2026-02-08 19:26:24.544	2026-02-24 18:27:16.881	rotated	refresh	2026-01-25 19:26:24.544	2026-01-25 23:11:53.905	2026-01-25 19:26:24.544	\N	\N	\N
8	hv7t2oqltbrky5t461wrjnfo	1	23640b4c0b9365fb947a627081fe9bc8	\N	055d3682-0c43-45a1-ad2b-d0ae88b0e6a7	admin	2026-01-26 10:28:50.096	2026-02-25 08:28:50.096	active	session	2026-01-26 08:28:50.096	2026-01-26 08:28:50.096	2026-01-26 08:28:50.097	\N	\N	\N
7	gew105ib955hz6q11ysdqoir	1	a4fab00b3e6136bc8fe1248c4560bbca	d2d02eafac4a46c4e9a7b970f35dbc5b	1c5a4d7c-cb50-4afd-b1b8-ef324b77fc83	admin	2026-02-08 23:11:53.866	2026-02-24 18:27:16.881	rotated	refresh	2026-01-25 23:11:53.867	2026-01-26 08:32:21.51	2026-01-25 23:11:53.871	\N	\N	\N
9	ehn8hv33w8zbkw6qcvw9sv9f	1	d2d02eafac4a46c4e9a7b970f35dbc5b	17f04c5f46c33f866c2d2913b91c45ff	1c5a4d7c-cb50-4afd-b1b8-ef324b77fc83	admin	2026-02-09 08:32:21.493	2026-02-24 18:27:16.881	rotated	refresh	2026-01-26 08:32:21.493	2026-01-26 11:00:39.238	2026-01-26 08:32:21.497	\N	\N	\N
10	nxi0xdxr69of8aavojz0o1ih	1	17f04c5f46c33f866c2d2913b91c45ff	86cd7ad9e4391259eb5a003e3a62df6d	1c5a4d7c-cb50-4afd-b1b8-ef324b77fc83	admin	2026-02-09 11:00:39.223	2026-02-24 18:27:16.881	rotated	refresh	2026-01-26 11:00:39.223	2026-01-26 12:55:02.997	2026-01-26 11:00:39.225	\N	\N	\N
11	la5jlcwmhvgrs0su723mk6c4	1	86cd7ad9e4391259eb5a003e3a62df6d	4fff0b10d6bb3e797c4554b061d59dea	1c5a4d7c-cb50-4afd-b1b8-ef324b77fc83	admin	2026-02-09 12:55:02.986	2026-02-24 18:27:16.881	rotated	refresh	2026-01-26 12:55:02.986	2026-01-26 13:42:57.898	2026-01-26 12:55:02.987	\N	\N	\N
12	r1gd9wmmbhahjfi0lj27d3s2	1	4fff0b10d6bb3e797c4554b061d59dea	a332e26ee38a965c1cb93d49415c1ef7	1c5a4d7c-cb50-4afd-b1b8-ef324b77fc83	admin	2026-02-09 13:42:57.866	2026-02-24 18:27:16.881	rotated	refresh	2026-01-26 13:42:57.867	2026-01-27 16:37:11.892	2026-01-26 13:42:57.871	\N	\N	\N
15	r6d9d4of1lb93ko13yc64adj	1	51fff3e73e3cfc3dd67ddc5e98219c5f	\N	1c5a4d7c-cb50-4afd-b1b8-ef324b77fc83	admin	2026-02-10 17:19:49.744	2026-02-24 18:27:16.881	active	refresh	2026-01-27 17:19:49.745	2026-01-27 17:19:49.745	2026-01-27 17:19:49.748	\N	\N	\N
14	a0mpkq8wyqeq0oe83ln3krxd	1	a332e26ee38a965c1cb93d49415c1ef7	51fff3e73e3cfc3dd67ddc5e98219c5f	1c5a4d7c-cb50-4afd-b1b8-ef324b77fc83	admin	2026-02-10 16:37:11.878	2026-02-24 18:27:16.881	rotated	refresh	2026-01-27 16:37:11.879	2026-01-27 17:19:49.764	2026-01-27 16:37:11.882	\N	\N	\N
13	z882wq2b3llx0ccn2qgx35jv	1	ab4cdb217bf9465ca5c4aed7b0108468	b8215e62f01d2af14b8bb8aa85c600a4	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-09 20:02:38.846	2026-02-25 20:02:38.846	rotated	refresh	2026-01-26 20:02:38.846	2026-01-27 18:20:47.378	2026-01-26 20:02:38.847	\N	\N	\N
16	od08o5mnxgdbicf6pmap486o	1	b8215e62f01d2af14b8bb8aa85c600a4	b0a8279630ff6dc4528bf2d573e6c429	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-10 18:20:47.359	2026-02-25 20:02:38.846	rotated	refresh	2026-01-27 18:20:47.359	2026-01-27 18:51:18.905	2026-01-27 18:20:47.362	\N	\N	\N
17	d8uckcfui0i066ig4lq440d8	1	b0a8279630ff6dc4528bf2d573e6c429	44e4655e21f319033f929a1f49a4c8a4	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-10 18:51:18.894	2026-02-25 20:02:38.846	rotated	refresh	2026-01-27 18:51:18.895	2026-01-27 19:29:51.921	2026-01-27 18:51:18.897	\N	\N	\N
18	mfouug2bhn5d53e81n1wsb02	1	44e4655e21f319033f929a1f49a4c8a4	8072c775b166becb28a856163732cd94	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-10 19:29:51.912	2026-02-25 20:02:38.846	rotated	refresh	2026-01-27 19:29:51.912	2026-01-27 19:59:54.862	2026-01-27 19:29:51.913	\N	\N	\N
19	e4zllaqhpvb7dxhkxdiv6aqa	1	8072c775b166becb28a856163732cd94	53f24eeffc51ba13bb5df19992e84a58	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-10 19:59:54.849	2026-02-25 20:02:38.846	rotated	refresh	2026-01-27 19:59:54.849	2026-01-28 19:27:47.099	2026-01-27 19:59:54.851	\N	\N	\N
20	in7b76jjx7g0hi29196lc4pk	1	53f24eeffc51ba13bb5df19992e84a58	8b8094c0444d0fed549771ea445df1c0	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-11 19:27:47.085	2026-02-25 20:02:38.846	rotated	refresh	2026-01-28 19:27:47.085	2026-01-28 19:58:03.469	2026-01-28 19:27:47.087	\N	\N	\N
21	z0k663o3tyycz3yr6k48fmnc	1	8b8094c0444d0fed549771ea445df1c0	589da774358a7229b227741aa5418302	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-11 19:58:03.463	2026-02-25 20:02:38.846	rotated	refresh	2026-01-28 19:58:03.463	2026-01-30 13:46:54.008	2026-01-28 19:58:03.464	\N	\N	\N
22	phmmxv4frz237b2yli7j0t2z	1	589da774358a7229b227741aa5418302	9ffe629d497a4ff6eb53ec46e71ba03d	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-13 13:46:53.999	2026-02-25 20:02:38.846	rotated	refresh	2026-01-30 13:46:53.999	2026-01-30 14:21:47.154	2026-01-30 13:46:54	\N	\N	\N
23	rgnsqww66jitzi9turzpymtq	1	9ffe629d497a4ff6eb53ec46e71ba03d	2c55351209c633d2e5ca465941366944	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-13 14:21:47.144	2026-02-25 20:02:38.846	rotated	refresh	2026-01-30 14:21:47.144	2026-01-30 17:36:16.744	2026-01-30 14:21:47.145	\N	\N	\N
24	dlxlfiyqg4nuaj43uxlpcu1x	1	2c55351209c633d2e5ca465941366944	3825da35727f5d6aef849d5ced89449a	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-13 17:36:16.737	2026-02-25 20:02:38.846	rotated	refresh	2026-01-30 17:36:16.737	2026-01-30 18:14:36.596	2026-01-30 17:36:16.737	\N	\N	\N
25	c87imasw9pgwbrr0ncbzq0tw	1	3825da35727f5d6aef849d5ced89449a	e68e029168300dc1a4a21c53251fc15e	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-13 18:14:36.583	2026-02-25 20:02:38.846	rotated	refresh	2026-01-30 18:14:36.584	2026-01-30 23:03:05.388	2026-01-30 18:14:36.585	\N	\N	\N
28	mkj9n530t1nd5dd1xds1qjs9	1	63a4ca53f37f35b32a56422562616e74	\N	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-14 11:03:05.532	2026-02-25 20:02:38.846	active	refresh	2026-01-31 11:03:05.532	2026-01-31 11:03:05.532	2026-01-31 11:03:05.533	\N	\N	\N
26	jr25la34pboihbzwg029xcls	1	e68e029168300dc1a4a21c53251fc15e	63a4ca53f37f35b32a56422562616e74	880b1af9-70e3-4aa5-ac79-d9c15da0778a	admin	2026-02-13 23:03:05.373	2026-02-25 20:02:38.846	rotated	refresh	2026-01-30 23:03:05.373	2026-01-31 11:03:05.541	2026-01-30 23:03:05.373	\N	\N	\N
27	hs20029fvi8qadw0vs05gg12	3	d7cf79e51f5ea2d81b4497243047cdb8	d06241fde0ddd77737eff08d40bebe6f	c4d172df-31cd-4212-a6c8-8a1ee119cb0b	admin	2026-01-31 13:01:36.633	2026-03-02 11:01:36.633	rotated	session	2026-01-31 11:01:36.633	2026-01-31 11:33:32.387	2026-01-31 11:01:36.634	\N	\N	\N
29	ezubgddlm3on8uvm8asln08y	3	d06241fde0ddd77737eff08d40bebe6f	64f7e118b4be609258e0fba95bb34836	c4d172df-31cd-4212-a6c8-8a1ee119cb0b	admin	2026-01-31 13:33:32.372	2026-03-02 11:01:36.633	rotated	session	2026-01-31 11:33:32.373	2026-01-31 12:17:26.364	2026-01-31 11:33:32.374	\N	\N	\N
31	sokyjdl19ai6i9tubneq5rsf	3	48077668d792125f40e28fb4f8a18059	\N	c4d172df-31cd-4212-a6c8-8a1ee119cb0b	admin	2026-01-31 15:09:57.692	2026-03-02 11:01:36.633	active	session	2026-01-31 13:09:57.693	2026-01-31 13:09:57.693	2026-01-31 13:09:57.695	\N	\N	\N
30	lgus243xyjxnp0qxlxnb3b8q	3	64f7e118b4be609258e0fba95bb34836	48077668d792125f40e28fb4f8a18059	c4d172df-31cd-4212-a6c8-8a1ee119cb0b	admin	2026-01-31 14:17:26.35	2026-03-02 11:01:36.633	rotated	session	2026-01-31 12:17:26.351	2026-01-31 13:09:57.711	2026-01-31 12:17:26.353	\N	\N	\N
32	imd81olatkkma7p3milf3173	3	424d6cb3519b36d62bf1d2045a79b040	\N	29598d55-d5eb-44de-acae-3582a18d1d95	admin	2026-01-31 19:14:29.356	2026-03-02 17:14:29.356	active	session	2026-01-31 17:14:29.356	2026-01-31 17:14:29.356	2026-01-31 17:14:29.356	\N	\N	\N
33	ype9ofj2qbq9zoq1dox1hg3z	3	6c346ac5e805f5b5c863bf4c847354ee	\N	deb5c501-239f-476e-8b2e-f28ba7c11b52	admin	2026-02-02 17:52:37.039	2026-03-04 15:52:37.039	active	session	2026-02-02 15:52:37.039	2026-02-02 15:52:37.039	2026-02-02 15:52:37.04	\N	\N	\N
\.


--
-- Data for Name: strapi_transfer_token_permissions; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_transfer_token_permissions (id, document_id, action, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_transfer_token_permissions_token_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_transfer_token_permissions_token_lnk (id, transfer_token_permission_id, transfer_token_id, transfer_token_permission_ord) FROM stdin;
\.


--
-- Data for Name: strapi_transfer_tokens; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_transfer_tokens (id, document_id, name, description, access_key, last_used_at, expires_at, lifespan, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_webhooks; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_webhooks (id, name, url, headers, events, enabled) FROM stdin;
\.


--
-- Data for Name: strapi_workflows; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_workflows (id, document_id, name, content_types, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_workflows_stage_required_to_publish_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_workflows_stage_required_to_publish_lnk (id, workflow_id, workflow_stage_id) FROM stdin;
\.


--
-- Data for Name: strapi_workflows_stages; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_workflows_stages (id, document_id, name, color, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
\.


--
-- Data for Name: strapi_workflows_stages_permissions_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_workflows_stages_permissions_lnk (id, workflow_stage_id, permission_id, permission_ord) FROM stdin;
\.


--
-- Data for Name: strapi_workflows_stages_workflow_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.strapi_workflows_stages_workflow_lnk (id, workflow_stage_id, workflow_id, workflow_stage_ord) FROM stdin;
\.


--
-- Data for Name: up_permissions; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.up_permissions (id, document_id, action, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	j2pex2w4d2535o679cda2ir8	plugin::users-permissions.auth.logout	2026-01-25 17:24:07.761	2026-01-25 17:24:07.761	2026-01-25 17:24:07.761	\N	\N	\N
2	n9enltuzyv301yj2f9q72by7	plugin::users-permissions.user.me	2026-01-25 17:24:07.761	2026-01-25 17:24:07.761	2026-01-25 17:24:07.762	\N	\N	\N
3	nnw0eh07w5hslsae85l6o2cr	plugin::users-permissions.auth.changePassword	2026-01-25 17:24:07.761	2026-01-25 17:24:07.761	2026-01-25 17:24:07.762	\N	\N	\N
4	ldhm75m67i21sby6vb09nhj6	plugin::users-permissions.auth.callback	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	\N	\N	\N
5	o1gx8q8zdm36knjdu6s6sdhw	plugin::users-permissions.auth.connect	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	\N	\N	\N
6	x6gfub45duhojdnbt5cfejpf	plugin::users-permissions.auth.forgotPassword	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	\N	\N	\N
7	r6xgtjsp63vw1q29uxum74m0	plugin::users-permissions.auth.resetPassword	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	\N	\N	\N
8	ktk3khpnz6fd9hb1tdnydyso	plugin::users-permissions.auth.register	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	\N	\N	\N
9	c4dxduysm0k5ea6v5wgbb3oe	plugin::users-permissions.auth.emailConfirmation	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	\N	\N	\N
11	mkq2yqzz0nhe772dphjsy2km	plugin::users-permissions.auth.refresh	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	\N	\N	\N
10	hylb5yxf2s4gy66g64wfji7z	plugin::users-permissions.auth.sendEmailConfirmation	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	2026-01-25 17:24:07.768	\N	\N	\N
12	u1klmj7gwxubgfeklyqu9j9y	api::imovel.imovel.find	2026-01-25 18:32:37.104	2026-01-25 18:32:37.104	2026-01-25 18:32:37.105	\N	\N	\N
13	nnhpktqdfq04h2owfe1kxc11	api::imovel.imovel.create	2026-01-25 18:32:37.104	2026-01-25 18:32:37.104	2026-01-25 18:32:37.105	\N	\N	\N
14	czoxsltk4juk44tf1w4m8m1p	api::imovel.imovel.update	2026-01-25 18:32:37.104	2026-01-25 18:32:37.104	2026-01-25 18:32:37.105	\N	\N	\N
15	qu24unn76tn8bfor5uyk1cf1	api::imovel.imovel.findOne	2026-01-25 18:32:37.104	2026-01-25 18:32:37.104	2026-01-25 18:32:37.105	\N	\N	\N
16	ohcevxwd88gtzub50nuuwjpe	api::imovel.imovel.delete	2026-01-25 18:32:37.104	2026-01-25 18:32:37.104	2026-01-25 18:32:37.106	\N	\N	\N
17	l7nva3i2bro8bmi5zoid1nap	plugin::users-permissions.user.update	2026-01-25 18:32:37.104	2026-01-25 18:32:37.104	2026-01-25 18:32:37.106	\N	\N	\N
18	o45lsf0d8pgdtki4yiarha2e	plugin::users-permissions.user.me	2026-01-25 18:32:37.104	2026-01-25 18:32:37.104	2026-01-25 18:32:37.107	\N	\N	\N
19	doglyi4lfjvqqaxxyy3d072x	api::imovel.imovel.find	2026-01-25 18:35:58.339	2026-01-25 18:35:58.339	2026-01-25 18:35:58.339	\N	\N	\N
20	uby8wic1uhusjvcuegbjc3ob	api::imovel.imovel.create	2026-01-25 18:35:58.339	2026-01-25 18:35:58.339	2026-01-25 18:35:58.339	\N	\N	\N
21	enuucczd74fr3gxryynndf66	api::imovel.imovel.update	2026-01-25 18:35:58.339	2026-01-25 18:35:58.339	2026-01-25 18:35:58.34	\N	\N	\N
23	fv1yyn07zfbnmofayixwxp6t	api::imovel.imovel.delete	2026-01-25 18:35:58.339	2026-01-25 18:35:58.339	2026-01-25 18:35:58.34	\N	\N	\N
22	komku95981no74pw55melhqd	api::imovel.imovel.findOne	2026-01-25 18:35:58.339	2026-01-25 18:35:58.339	2026-01-25 18:35:58.339	\N	\N	\N
24	yftlwp54hnujarmjub4h0j2a	plugin::users-permissions.user.update	2026-01-25 18:35:58.339	2026-01-25 18:35:58.339	2026-01-25 18:35:58.34	\N	\N	\N
25	l501xxwwfjw5iw0c3wnn5w9x	plugin::users-permissions.user.me	2026-01-25 18:35:58.339	2026-01-25 18:35:58.339	2026-01-25 18:35:58.34	\N	\N	\N
26	ec0v9tje3ahq5maxxl8smlda	api::imovel.imovel.find	2026-01-25 18:46:09.49	2026-01-25 18:46:09.49	2026-01-25 18:46:09.49	\N	\N	\N
27	uvj3qo97yp3as7gpqv4m6wu5	api::imovel.imovel.create	2026-01-25 18:46:09.49	2026-01-25 18:46:09.49	2026-01-25 18:46:09.49	\N	\N	\N
28	zumfrm2rv2t80uimdvel6vdc	api::imovel.imovel.findOne	2026-01-25 18:46:09.49	2026-01-25 18:46:09.49	2026-01-25 18:46:09.49	\N	\N	\N
29	xt8b9bhhhx94eka11fpbpi4u	api::imovel.imovel.update	2026-01-25 18:46:09.49	2026-01-25 18:46:09.49	2026-01-25 18:46:09.49	\N	\N	\N
30	iu45wtgb9a7er2k2vw5gc0cw	api::imovel.imovel.delete	2026-01-25 18:46:09.49	2026-01-25 18:46:09.49	2026-01-25 18:46:09.491	\N	\N	\N
31	l58alvxu1ex8dljed2ctc706	api::imovel.imovel.find	2026-01-25 18:47:47.154	2026-01-25 18:47:47.154	2026-01-25 18:47:47.154	\N	\N	\N
32	grcuckv2psrdqac0s1mfybvp	api::imovel.imovel.findOne	2026-01-25 18:47:47.154	2026-01-25 18:47:47.154	2026-01-25 18:47:47.154	\N	\N	\N
33	u3vud7haf2x54bupe18mapho	api::imovel.imovel.find	2026-01-25 18:49:49.909	2026-01-25 18:49:49.909	2026-01-25 18:49:49.909	\N	\N	\N
34	upbo76ewvg07fz18e1p2iqf2	api::imovel.imovel.findOne	2026-01-25 18:49:49.909	2026-01-25 18:49:49.909	2026-01-25 18:49:49.909	\N	\N	\N
35	iuzcj7oicf7g5vrtsfy1rnbg	api::imovel.imovel.findOne	2026-01-25 18:51:27.316	2026-01-25 18:51:27.316	2026-01-25 18:51:27.316	\N	\N	\N
36	wnmxhip33rbioaf3eog7bgx4	api::imovel.imovel.find	2026-01-25 18:51:27.316	2026-01-25 18:51:27.316	2026-01-25 18:51:27.316	\N	\N	\N
37	ennncve33nvmgym8eejrelay	plugin::upload.content-api.upload	2026-01-28 19:34:58.913	2026-01-28 19:34:58.913	2026-01-28 19:34:58.915	\N	\N	\N
\.


--
-- Data for Name: up_permissions_role_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.up_permissions_role_lnk (id, permission_id, role_id, permission_ord) FROM stdin;
1	1	1	1
2	2	1	1
3	3	1	2
4	4	2	1
5	5	2	1
6	6	2	1
7	7	2	2
8	8	2	3
9	9	2	3
10	10	2	3
11	11	2	4
26	27	1	3
27	26	1	3
28	29	1	4
29	28	1	4
30	30	1	5
35	35	2	5
36	36	2	6
37	37	1	6
\.


--
-- Data for Name: up_roles; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.up_roles (id, document_id, name, description, type, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
2	nl6ymp0t7kamxzzs37vpjeg3	Public	Default role given to unauthenticated user.	public	2026-01-25 17:24:07.76	2026-01-25 18:51:27.306	2026-01-25 17:24:07.76	\N	\N	\N
1	kve86pjs1b8q4tmccw9rauhk	Authenticated	Default role given to authenticated user.	authenticated	2026-01-25 17:24:07.758	2026-01-28 19:34:58.789	2026-01-25 17:24:07.758	\N	\N	\N
\.


--
-- Data for Name: up_users; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.up_users (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, username, email, provider, password, reset_password_token, confirmation_token, confirmed, blocked) FROM stdin;
2	obhhh1phxcjj4otr459fd17l	2026-01-27 16:39:31.786	2026-01-27 16:39:31.786	2026-01-27 16:39:31.788	\N	\N	\N	admin	admin@example.com	local	$2a$10$hcW98pM4vgscgUpmM3SXu.7/YuB1dzjLRhtAQQ7V6Cukufw9/xOEe	\N	\N	t	f
1	kod7yq7mh4z7sd6sex1qixey	2026-01-26 10:52:49.33	2026-01-31 17:19:00.856	2026-01-31 17:19:00.794	\N	3	\N	tester	tester@example.com	local	$2a$10$LGj7BJNAD7Nth8gl.21pwejfhd7EmjUFlTg.wgXKaVNY0AiruiQiC	\N	\N	t	f
\.


--
-- Data for Name: up_users_role_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.up_users_role_lnk (id, user_id, role_id, user_ord) FROM stdin;
1	1	1	1
2	2	1	2
\.


--
-- Data for Name: upload_folders; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.upload_folders (id, document_id, name, path_id, path, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) FROM stdin;
1	lnsgukt5qohso5dv3opo2obl	API Uploads	1	/1	2026-01-28 19:35:04.918	2026-01-28 19:35:04.918	2026-01-28 19:35:04.918	\N	\N	\N
\.


--
-- Data for Name: upload_folders_parent_lnk; Type: TABLE DATA; Schema: public; Owner: strapi
--

COPY public.upload_folders_parent_lnk (id, folder_id, inv_folder_id, folder_ord) FROM stdin;
\.


--
-- Name: admin_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.admin_permissions_id_seq', 139, true);


--
-- Name: admin_permissions_role_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.admin_permissions_role_lnk_id_seq', 139, true);


--
-- Name: admin_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.admin_roles_id_seq', 3, true);


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 3, true);


--
-- Name: admin_users_roles_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.admin_users_roles_lnk_id_seq', 3, true);


--
-- Name: files_folder_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.files_folder_lnk_id_seq', 2, true);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.files_id_seq', 13, true);


--
-- Name: files_related_mph_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.files_related_mph_id_seq', 47, true);


--
-- Name: i18n_locale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.i18n_locale_id_seq', 1, true);


--
-- Name: imoveis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.imoveis_id_seq', 19, true);


--
-- Name: imoveis_usuario_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.imoveis_usuario_lnk_id_seq', 11, true);


--
-- Name: noticias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.noticias_id_seq', 6, true);


--
-- Name: strapi_ai_localization_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_ai_localization_jobs_id_seq', 1, false);


--
-- Name: strapi_api_token_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_api_token_permissions_id_seq', 1, false);


--
-- Name: strapi_api_token_permissions_token_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_api_token_permissions_token_lnk_id_seq', 1, false);


--
-- Name: strapi_api_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_api_tokens_id_seq', 2, true);


--
-- Name: strapi_audit_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_audit_logs_id_seq', 1, false);


--
-- Name: strapi_audit_logs_user_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_audit_logs_user_lnk_id_seq', 1, false);


--
-- Name: strapi_core_store_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_core_store_settings_id_seq', 35, true);


--
-- Name: strapi_database_schema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_database_schema_id_seq', 15, true);


--
-- Name: strapi_history_versions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_history_versions_id_seq', 40, true);


--
-- Name: strapi_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_migrations_id_seq', 1, false);


--
-- Name: strapi_migrations_internal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_migrations_internal_id_seq', 7, true);


--
-- Name: strapi_release_actions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_release_actions_id_seq', 1, false);


--
-- Name: strapi_release_actions_release_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_release_actions_release_lnk_id_seq', 1, false);


--
-- Name: strapi_releases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_releases_id_seq', 1, false);


--
-- Name: strapi_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_sessions_id_seq', 33, true);


--
-- Name: strapi_transfer_token_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_transfer_token_permissions_id_seq', 1, false);


--
-- Name: strapi_transfer_token_permissions_token_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_transfer_token_permissions_token_lnk_id_seq', 1, false);


--
-- Name: strapi_transfer_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_transfer_tokens_id_seq', 1, false);


--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_webhooks_id_seq', 1, false);


--
-- Name: strapi_workflows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_workflows_id_seq', 1, false);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_workflows_stage_required_to_publish_lnk_id_seq', 1, false);


--
-- Name: strapi_workflows_stages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_workflows_stages_id_seq', 1, false);


--
-- Name: strapi_workflows_stages_permissions_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_workflows_stages_permissions_lnk_id_seq', 1, false);


--
-- Name: strapi_workflows_stages_workflow_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.strapi_workflows_stages_workflow_lnk_id_seq', 1, false);


--
-- Name: up_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.up_permissions_id_seq', 37, true);


--
-- Name: up_permissions_role_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.up_permissions_role_lnk_id_seq', 37, true);


--
-- Name: up_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.up_roles_id_seq', 7, true);


--
-- Name: up_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.up_users_id_seq', 2, true);


--
-- Name: up_users_role_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.up_users_role_lnk_id_seq', 2, true);


--
-- Name: upload_folders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.upload_folders_id_seq', 1, true);


--
-- Name: upload_folders_parent_lnk_id_seq; Type: SEQUENCE SET; Schema: public; Owner: strapi
--

SELECT pg_catalog.setval('public.upload_folders_parent_lnk_id_seq', 1, false);


--
-- Name: admin_permissions admin_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_pkey PRIMARY KEY (id);


--
-- Name: admin_permissions_role_lnk admin_permissions_role_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_permissions_role_lnk
    ADD CONSTRAINT admin_permissions_role_lnk_pkey PRIMARY KEY (id);


--
-- Name: admin_permissions_role_lnk admin_permissions_role_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_permissions_role_lnk
    ADD CONSTRAINT admin_permissions_role_lnk_uq UNIQUE (permission_id, role_id);


--
-- Name: admin_roles admin_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: admin_users_roles_lnk admin_users_roles_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_users_roles_lnk
    ADD CONSTRAINT admin_users_roles_lnk_pkey PRIMARY KEY (id);


--
-- Name: admin_users_roles_lnk admin_users_roles_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_users_roles_lnk
    ADD CONSTRAINT admin_users_roles_lnk_uq UNIQUE (user_id, role_id);


--
-- Name: files_folder_lnk files_folder_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files_folder_lnk
    ADD CONSTRAINT files_folder_lnk_pkey PRIMARY KEY (id);


--
-- Name: files_folder_lnk files_folder_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files_folder_lnk
    ADD CONSTRAINT files_folder_lnk_uq UNIQUE (file_id, folder_id);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: files_related_mph files_related_mph_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files_related_mph
    ADD CONSTRAINT files_related_mph_pkey PRIMARY KEY (id);


--
-- Name: i18n_locale i18n_locale_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_pkey PRIMARY KEY (id);


--
-- Name: imoveis imoveis_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.imoveis
    ADD CONSTRAINT imoveis_pkey PRIMARY KEY (id);


--
-- Name: imoveis_usuario_lnk imoveis_usuario_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.imoveis_usuario_lnk
    ADD CONSTRAINT imoveis_usuario_lnk_pkey PRIMARY KEY (id);


--
-- Name: imoveis_usuario_lnk imoveis_usuario_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.imoveis_usuario_lnk
    ADD CONSTRAINT imoveis_usuario_lnk_uq UNIQUE (imovel_id, user_id);


--
-- Name: noticias noticias_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.noticias
    ADD CONSTRAINT noticias_pkey PRIMARY KEY (id);


--
-- Name: strapi_ai_localization_jobs strapi_ai_localization_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_ai_localization_jobs
    ADD CONSTRAINT strapi_ai_localization_jobs_pkey PRIMARY KEY (id);


--
-- Name: strapi_api_token_permissions strapi_api_token_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_token_permissions
    ADD CONSTRAINT strapi_api_token_permissions_pkey PRIMARY KEY (id);


--
-- Name: strapi_api_token_permissions_token_lnk strapi_api_token_permissions_token_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_token_permissions_token_lnk
    ADD CONSTRAINT strapi_api_token_permissions_token_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_api_token_permissions_token_lnk strapi_api_token_permissions_token_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_token_permissions_token_lnk
    ADD CONSTRAINT strapi_api_token_permissions_token_lnk_uq UNIQUE (api_token_permission_id, api_token_id);


--
-- Name: strapi_api_tokens strapi_api_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_pkey PRIMARY KEY (id);


--
-- Name: strapi_audit_logs strapi_audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_audit_logs
    ADD CONSTRAINT strapi_audit_logs_pkey PRIMARY KEY (id);


--
-- Name: strapi_audit_logs_user_lnk strapi_audit_logs_user_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_audit_logs_user_lnk
    ADD CONSTRAINT strapi_audit_logs_user_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_audit_logs_user_lnk strapi_audit_logs_user_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_audit_logs_user_lnk
    ADD CONSTRAINT strapi_audit_logs_user_lnk_uq UNIQUE (audit_log_id, user_id);


--
-- Name: strapi_core_store_settings strapi_core_store_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_core_store_settings
    ADD CONSTRAINT strapi_core_store_settings_pkey PRIMARY KEY (id);


--
-- Name: strapi_database_schema strapi_database_schema_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_database_schema
    ADD CONSTRAINT strapi_database_schema_pkey PRIMARY KEY (id);


--
-- Name: strapi_history_versions strapi_history_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_history_versions
    ADD CONSTRAINT strapi_history_versions_pkey PRIMARY KEY (id);


--
-- Name: strapi_migrations_internal strapi_migrations_internal_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_migrations_internal
    ADD CONSTRAINT strapi_migrations_internal_pkey PRIMARY KEY (id);


--
-- Name: strapi_migrations strapi_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_migrations
    ADD CONSTRAINT strapi_migrations_pkey PRIMARY KEY (id);


--
-- Name: strapi_release_actions strapi_release_actions_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_release_actions
    ADD CONSTRAINT strapi_release_actions_pkey PRIMARY KEY (id);


--
-- Name: strapi_release_actions_release_lnk strapi_release_actions_release_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_release_actions_release_lnk
    ADD CONSTRAINT strapi_release_actions_release_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_release_actions_release_lnk strapi_release_actions_release_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_release_actions_release_lnk
    ADD CONSTRAINT strapi_release_actions_release_lnk_uq UNIQUE (release_action_id, release_id);


--
-- Name: strapi_releases strapi_releases_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_releases
    ADD CONSTRAINT strapi_releases_pkey PRIMARY KEY (id);


--
-- Name: strapi_sessions strapi_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_sessions
    ADD CONSTRAINT strapi_sessions_pkey PRIMARY KEY (id);


--
-- Name: strapi_transfer_token_permissions strapi_transfer_token_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions
    ADD CONSTRAINT strapi_transfer_token_permissions_pkey PRIMARY KEY (id);


--
-- Name: strapi_transfer_token_permissions_token_lnk strapi_transfer_token_permissions_token_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_lnk
    ADD CONSTRAINT strapi_transfer_token_permissions_token_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_transfer_token_permissions_token_lnk strapi_transfer_token_permissions_token_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_lnk
    ADD CONSTRAINT strapi_transfer_token_permissions_token_lnk_uq UNIQUE (transfer_token_permission_id, transfer_token_id);


--
-- Name: strapi_transfer_tokens strapi_transfer_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_tokens
    ADD CONSTRAINT strapi_transfer_tokens_pkey PRIMARY KEY (id);


--
-- Name: strapi_webhooks strapi_webhooks_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_webhooks
    ADD CONSTRAINT strapi_webhooks_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows strapi_workflows_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows
    ADD CONSTRAINT strapi_workflows_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk strapi_workflows_stage_required_to_publish_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stage_required_to_publish_lnk
    ADD CONSTRAINT strapi_workflows_stage_required_to_publish_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk strapi_workflows_stage_required_to_publish_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stage_required_to_publish_lnk
    ADD CONSTRAINT strapi_workflows_stage_required_to_publish_lnk_uq UNIQUE (workflow_id, workflow_stage_id);


--
-- Name: strapi_workflows_stages_permissions_lnk strapi_workflows_stages_permissions_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages_permissions_lnk
    ADD CONSTRAINT strapi_workflows_stages_permissions_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows_stages_permissions_lnk strapi_workflows_stages_permissions_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages_permissions_lnk
    ADD CONSTRAINT strapi_workflows_stages_permissions_lnk_uq UNIQUE (workflow_stage_id, permission_id);


--
-- Name: strapi_workflows_stages strapi_workflows_stages_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages
    ADD CONSTRAINT strapi_workflows_stages_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows_stages_workflow_lnk strapi_workflows_stages_workflow_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages_workflow_lnk
    ADD CONSTRAINT strapi_workflows_stages_workflow_lnk_pkey PRIMARY KEY (id);


--
-- Name: strapi_workflows_stages_workflow_lnk strapi_workflows_stages_workflow_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages_workflow_lnk
    ADD CONSTRAINT strapi_workflows_stages_workflow_lnk_uq UNIQUE (workflow_stage_id, workflow_id);


--
-- Name: up_permissions up_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_pkey PRIMARY KEY (id);


--
-- Name: up_permissions_role_lnk up_permissions_role_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_permissions_role_lnk
    ADD CONSTRAINT up_permissions_role_lnk_pkey PRIMARY KEY (id);


--
-- Name: up_permissions_role_lnk up_permissions_role_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_permissions_role_lnk
    ADD CONSTRAINT up_permissions_role_lnk_uq UNIQUE (permission_id, role_id);


--
-- Name: up_roles up_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_pkey PRIMARY KEY (id);


--
-- Name: up_users up_users_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_pkey PRIMARY KEY (id);


--
-- Name: up_users_role_lnk up_users_role_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_users_role_lnk
    ADD CONSTRAINT up_users_role_lnk_pkey PRIMARY KEY (id);


--
-- Name: up_users_role_lnk up_users_role_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_users_role_lnk
    ADD CONSTRAINT up_users_role_lnk_uq UNIQUE (user_id, role_id);


--
-- Name: upload_folders_parent_lnk upload_folders_parent_lnk_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.upload_folders_parent_lnk
    ADD CONSTRAINT upload_folders_parent_lnk_pkey PRIMARY KEY (id);


--
-- Name: upload_folders_parent_lnk upload_folders_parent_lnk_uq; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.upload_folders_parent_lnk
    ADD CONSTRAINT upload_folders_parent_lnk_uq UNIQUE (folder_id, inv_folder_id);


--
-- Name: upload_folders upload_folders_path_id_index; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_path_id_index UNIQUE (path_id);


--
-- Name: upload_folders upload_folders_path_index; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_path_index UNIQUE (path);


--
-- Name: upload_folders upload_folders_pkey; Type: CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_pkey PRIMARY KEY (id);


--
-- Name: admin_permissions_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_permissions_created_by_id_fk ON public.admin_permissions USING btree (created_by_id);


--
-- Name: admin_permissions_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_permissions_documents_idx ON public.admin_permissions USING btree (document_id, locale, published_at);


--
-- Name: admin_permissions_role_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_permissions_role_lnk_fk ON public.admin_permissions_role_lnk USING btree (permission_id);


--
-- Name: admin_permissions_role_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_permissions_role_lnk_ifk ON public.admin_permissions_role_lnk USING btree (role_id);


--
-- Name: admin_permissions_role_lnk_oifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_permissions_role_lnk_oifk ON public.admin_permissions_role_lnk USING btree (permission_ord);


--
-- Name: admin_permissions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_permissions_updated_by_id_fk ON public.admin_permissions USING btree (updated_by_id);


--
-- Name: admin_roles_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_roles_created_by_id_fk ON public.admin_roles USING btree (created_by_id);


--
-- Name: admin_roles_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_roles_documents_idx ON public.admin_roles USING btree (document_id, locale, published_at);


--
-- Name: admin_roles_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_roles_updated_by_id_fk ON public.admin_roles USING btree (updated_by_id);


--
-- Name: admin_users_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_users_created_by_id_fk ON public.admin_users USING btree (created_by_id);


--
-- Name: admin_users_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_users_documents_idx ON public.admin_users USING btree (document_id, locale, published_at);


--
-- Name: admin_users_roles_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_users_roles_lnk_fk ON public.admin_users_roles_lnk USING btree (user_id);


--
-- Name: admin_users_roles_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_users_roles_lnk_ifk ON public.admin_users_roles_lnk USING btree (role_id);


--
-- Name: admin_users_roles_lnk_ofk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_users_roles_lnk_ofk ON public.admin_users_roles_lnk USING btree (role_ord);


--
-- Name: admin_users_roles_lnk_oifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_users_roles_lnk_oifk ON public.admin_users_roles_lnk USING btree (user_ord);


--
-- Name: admin_users_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX admin_users_updated_by_id_fk ON public.admin_users USING btree (updated_by_id);


--
-- Name: files_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX files_created_by_id_fk ON public.files USING btree (created_by_id);


--
-- Name: files_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX files_documents_idx ON public.files USING btree (document_id, locale, published_at);


--
-- Name: files_folder_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX files_folder_lnk_fk ON public.files_folder_lnk USING btree (file_id);


--
-- Name: files_folder_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX files_folder_lnk_ifk ON public.files_folder_lnk USING btree (folder_id);


--
-- Name: files_folder_lnk_oifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX files_folder_lnk_oifk ON public.files_folder_lnk USING btree (file_ord);


--
-- Name: files_related_mph_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX files_related_mph_fk ON public.files_related_mph USING btree (file_id);


--
-- Name: files_related_mph_idix; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX files_related_mph_idix ON public.files_related_mph USING btree (related_id);


--
-- Name: files_related_mph_oidx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX files_related_mph_oidx ON public.files_related_mph USING btree ("order");


--
-- Name: files_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX files_updated_by_id_fk ON public.files USING btree (updated_by_id);


--
-- Name: i18n_locale_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX i18n_locale_created_by_id_fk ON public.i18n_locale USING btree (created_by_id);


--
-- Name: i18n_locale_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX i18n_locale_documents_idx ON public.i18n_locale USING btree (document_id, locale, published_at);


--
-- Name: i18n_locale_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX i18n_locale_updated_by_id_fk ON public.i18n_locale USING btree (updated_by_id);


--
-- Name: imoveis_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX imoveis_created_by_id_fk ON public.imoveis USING btree (created_by_id);


--
-- Name: imoveis_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX imoveis_documents_idx ON public.imoveis USING btree (document_id, locale, published_at);


--
-- Name: imoveis_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX imoveis_updated_by_id_fk ON public.imoveis USING btree (updated_by_id);


--
-- Name: imoveis_usuario_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX imoveis_usuario_lnk_fk ON public.imoveis_usuario_lnk USING btree (imovel_id);


--
-- Name: imoveis_usuario_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX imoveis_usuario_lnk_ifk ON public.imoveis_usuario_lnk USING btree (user_id);


--
-- Name: noticias_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX noticias_created_by_id_fk ON public.noticias USING btree (created_by_id);


--
-- Name: noticias_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX noticias_documents_idx ON public.noticias USING btree (document_id, locale, published_at);


--
-- Name: noticias_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX noticias_updated_by_id_fk ON public.noticias USING btree (updated_by_id);


--
-- Name: strapi_api_token_permissions_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_api_token_permissions_created_by_id_fk ON public.strapi_api_token_permissions USING btree (created_by_id);


--
-- Name: strapi_api_token_permissions_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_api_token_permissions_documents_idx ON public.strapi_api_token_permissions USING btree (document_id, locale, published_at);


--
-- Name: strapi_api_token_permissions_token_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_api_token_permissions_token_lnk_fk ON public.strapi_api_token_permissions_token_lnk USING btree (api_token_permission_id);


--
-- Name: strapi_api_token_permissions_token_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_api_token_permissions_token_lnk_ifk ON public.strapi_api_token_permissions_token_lnk USING btree (api_token_id);


--
-- Name: strapi_api_token_permissions_token_lnk_oifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_api_token_permissions_token_lnk_oifk ON public.strapi_api_token_permissions_token_lnk USING btree (api_token_permission_ord);


--
-- Name: strapi_api_token_permissions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_api_token_permissions_updated_by_id_fk ON public.strapi_api_token_permissions USING btree (updated_by_id);


--
-- Name: strapi_api_tokens_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_api_tokens_created_by_id_fk ON public.strapi_api_tokens USING btree (created_by_id);


--
-- Name: strapi_api_tokens_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_api_tokens_documents_idx ON public.strapi_api_tokens USING btree (document_id, locale, published_at);


--
-- Name: strapi_api_tokens_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_api_tokens_updated_by_id_fk ON public.strapi_api_tokens USING btree (updated_by_id);


--
-- Name: strapi_audit_logs_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_audit_logs_created_by_id_fk ON public.strapi_audit_logs USING btree (created_by_id);


--
-- Name: strapi_audit_logs_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_audit_logs_documents_idx ON public.strapi_audit_logs USING btree (document_id, locale, published_at);


--
-- Name: strapi_audit_logs_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_audit_logs_updated_by_id_fk ON public.strapi_audit_logs USING btree (updated_by_id);


--
-- Name: strapi_audit_logs_user_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_audit_logs_user_lnk_fk ON public.strapi_audit_logs_user_lnk USING btree (audit_log_id);


--
-- Name: strapi_audit_logs_user_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_audit_logs_user_lnk_ifk ON public.strapi_audit_logs_user_lnk USING btree (user_id);


--
-- Name: strapi_history_versions_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_history_versions_created_by_id_fk ON public.strapi_history_versions USING btree (created_by_id);


--
-- Name: strapi_release_actions_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_release_actions_created_by_id_fk ON public.strapi_release_actions USING btree (created_by_id);


--
-- Name: strapi_release_actions_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_release_actions_documents_idx ON public.strapi_release_actions USING btree (document_id, locale, published_at);


--
-- Name: strapi_release_actions_release_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_release_actions_release_lnk_fk ON public.strapi_release_actions_release_lnk USING btree (release_action_id);


--
-- Name: strapi_release_actions_release_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_release_actions_release_lnk_ifk ON public.strapi_release_actions_release_lnk USING btree (release_id);


--
-- Name: strapi_release_actions_release_lnk_oifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_release_actions_release_lnk_oifk ON public.strapi_release_actions_release_lnk USING btree (release_action_ord);


--
-- Name: strapi_release_actions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_release_actions_updated_by_id_fk ON public.strapi_release_actions USING btree (updated_by_id);


--
-- Name: strapi_releases_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_releases_created_by_id_fk ON public.strapi_releases USING btree (created_by_id);


--
-- Name: strapi_releases_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_releases_documents_idx ON public.strapi_releases USING btree (document_id, locale, published_at);


--
-- Name: strapi_releases_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_releases_updated_by_id_fk ON public.strapi_releases USING btree (updated_by_id);


--
-- Name: strapi_sessions_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_sessions_created_by_id_fk ON public.strapi_sessions USING btree (created_by_id);


--
-- Name: strapi_sessions_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_sessions_documents_idx ON public.strapi_sessions USING btree (document_id, locale, published_at);


--
-- Name: strapi_sessions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_sessions_updated_by_id_fk ON public.strapi_sessions USING btree (updated_by_id);


--
-- Name: strapi_transfer_token_permissions_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_transfer_token_permissions_created_by_id_fk ON public.strapi_transfer_token_permissions USING btree (created_by_id);


--
-- Name: strapi_transfer_token_permissions_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_transfer_token_permissions_documents_idx ON public.strapi_transfer_token_permissions USING btree (document_id, locale, published_at);


--
-- Name: strapi_transfer_token_permissions_token_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_transfer_token_permissions_token_lnk_fk ON public.strapi_transfer_token_permissions_token_lnk USING btree (transfer_token_permission_id);


--
-- Name: strapi_transfer_token_permissions_token_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_transfer_token_permissions_token_lnk_ifk ON public.strapi_transfer_token_permissions_token_lnk USING btree (transfer_token_id);


--
-- Name: strapi_transfer_token_permissions_token_lnk_oifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_transfer_token_permissions_token_lnk_oifk ON public.strapi_transfer_token_permissions_token_lnk USING btree (transfer_token_permission_ord);


--
-- Name: strapi_transfer_token_permissions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_transfer_token_permissions_updated_by_id_fk ON public.strapi_transfer_token_permissions USING btree (updated_by_id);


--
-- Name: strapi_transfer_tokens_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_transfer_tokens_created_by_id_fk ON public.strapi_transfer_tokens USING btree (created_by_id);


--
-- Name: strapi_transfer_tokens_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_transfer_tokens_documents_idx ON public.strapi_transfer_tokens USING btree (document_id, locale, published_at);


--
-- Name: strapi_transfer_tokens_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_transfer_tokens_updated_by_id_fk ON public.strapi_transfer_tokens USING btree (updated_by_id);


--
-- Name: strapi_workflows_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_created_by_id_fk ON public.strapi_workflows USING btree (created_by_id);


--
-- Name: strapi_workflows_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_documents_idx ON public.strapi_workflows USING btree (document_id, locale, published_at);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_stage_required_to_publish_lnk_fk ON public.strapi_workflows_stage_required_to_publish_lnk USING btree (workflow_id);


--
-- Name: strapi_workflows_stage_required_to_publish_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_stage_required_to_publish_lnk_ifk ON public.strapi_workflows_stage_required_to_publish_lnk USING btree (workflow_stage_id);


--
-- Name: strapi_workflows_stages_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_stages_created_by_id_fk ON public.strapi_workflows_stages USING btree (created_by_id);


--
-- Name: strapi_workflows_stages_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_stages_documents_idx ON public.strapi_workflows_stages USING btree (document_id, locale, published_at);


--
-- Name: strapi_workflows_stages_permissions_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_stages_permissions_lnk_fk ON public.strapi_workflows_stages_permissions_lnk USING btree (workflow_stage_id);


--
-- Name: strapi_workflows_stages_permissions_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_stages_permissions_lnk_ifk ON public.strapi_workflows_stages_permissions_lnk USING btree (permission_id);


--
-- Name: strapi_workflows_stages_permissions_lnk_ofk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_stages_permissions_lnk_ofk ON public.strapi_workflows_stages_permissions_lnk USING btree (permission_ord);


--
-- Name: strapi_workflows_stages_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_stages_updated_by_id_fk ON public.strapi_workflows_stages USING btree (updated_by_id);


--
-- Name: strapi_workflows_stages_workflow_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_stages_workflow_lnk_fk ON public.strapi_workflows_stages_workflow_lnk USING btree (workflow_stage_id);


--
-- Name: strapi_workflows_stages_workflow_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_stages_workflow_lnk_ifk ON public.strapi_workflows_stages_workflow_lnk USING btree (workflow_id);


--
-- Name: strapi_workflows_stages_workflow_lnk_oifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_stages_workflow_lnk_oifk ON public.strapi_workflows_stages_workflow_lnk USING btree (workflow_stage_ord);


--
-- Name: strapi_workflows_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX strapi_workflows_updated_by_id_fk ON public.strapi_workflows USING btree (updated_by_id);


--
-- Name: up_permissions_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_permissions_created_by_id_fk ON public.up_permissions USING btree (created_by_id);


--
-- Name: up_permissions_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_permissions_documents_idx ON public.up_permissions USING btree (document_id, locale, published_at);


--
-- Name: up_permissions_role_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_permissions_role_lnk_fk ON public.up_permissions_role_lnk USING btree (permission_id);


--
-- Name: up_permissions_role_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_permissions_role_lnk_ifk ON public.up_permissions_role_lnk USING btree (role_id);


--
-- Name: up_permissions_role_lnk_oifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_permissions_role_lnk_oifk ON public.up_permissions_role_lnk USING btree (permission_ord);


--
-- Name: up_permissions_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_permissions_updated_by_id_fk ON public.up_permissions USING btree (updated_by_id);


--
-- Name: up_roles_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_roles_created_by_id_fk ON public.up_roles USING btree (created_by_id);


--
-- Name: up_roles_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_roles_documents_idx ON public.up_roles USING btree (document_id, locale, published_at);


--
-- Name: up_roles_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_roles_updated_by_id_fk ON public.up_roles USING btree (updated_by_id);


--
-- Name: up_users_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_users_created_by_id_fk ON public.up_users USING btree (created_by_id);


--
-- Name: up_users_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_users_documents_idx ON public.up_users USING btree (document_id, locale, published_at);


--
-- Name: up_users_role_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_users_role_lnk_fk ON public.up_users_role_lnk USING btree (user_id);


--
-- Name: up_users_role_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_users_role_lnk_ifk ON public.up_users_role_lnk USING btree (role_id);


--
-- Name: up_users_role_lnk_oifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_users_role_lnk_oifk ON public.up_users_role_lnk USING btree (user_ord);


--
-- Name: up_users_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX up_users_updated_by_id_fk ON public.up_users USING btree (updated_by_id);


--
-- Name: upload_files_created_at_index; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_files_created_at_index ON public.files USING btree (created_at);


--
-- Name: upload_files_ext_index; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_files_ext_index ON public.files USING btree (ext);


--
-- Name: upload_files_folder_path_index; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_files_folder_path_index ON public.files USING btree (folder_path);


--
-- Name: upload_files_name_index; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_files_name_index ON public.files USING btree (name);


--
-- Name: upload_files_size_index; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_files_size_index ON public.files USING btree (size);


--
-- Name: upload_files_updated_at_index; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_files_updated_at_index ON public.files USING btree (updated_at);


--
-- Name: upload_folders_created_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_folders_created_by_id_fk ON public.upload_folders USING btree (created_by_id);


--
-- Name: upload_folders_documents_idx; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_folders_documents_idx ON public.upload_folders USING btree (document_id, locale, published_at);


--
-- Name: upload_folders_parent_lnk_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_folders_parent_lnk_fk ON public.upload_folders_parent_lnk USING btree (folder_id);


--
-- Name: upload_folders_parent_lnk_ifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_folders_parent_lnk_ifk ON public.upload_folders_parent_lnk USING btree (inv_folder_id);


--
-- Name: upload_folders_parent_lnk_oifk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_folders_parent_lnk_oifk ON public.upload_folders_parent_lnk USING btree (folder_ord);


--
-- Name: upload_folders_updated_by_id_fk; Type: INDEX; Schema: public; Owner: strapi
--

CREATE INDEX upload_folders_updated_by_id_fk ON public.upload_folders USING btree (updated_by_id);


--
-- Name: admin_permissions admin_permissions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_permissions_role_lnk admin_permissions_role_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_permissions_role_lnk
    ADD CONSTRAINT admin_permissions_role_lnk_fk FOREIGN KEY (permission_id) REFERENCES public.admin_permissions(id) ON DELETE CASCADE;


--
-- Name: admin_permissions_role_lnk admin_permissions_role_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_permissions_role_lnk
    ADD CONSTRAINT admin_permissions_role_lnk_ifk FOREIGN KEY (role_id) REFERENCES public.admin_roles(id) ON DELETE CASCADE;


--
-- Name: admin_permissions admin_permissions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_permissions
    ADD CONSTRAINT admin_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_roles admin_roles_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_roles admin_roles_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_roles
    ADD CONSTRAINT admin_roles_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_users admin_users_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: admin_users_roles_lnk admin_users_roles_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_users_roles_lnk
    ADD CONSTRAINT admin_users_roles_lnk_fk FOREIGN KEY (user_id) REFERENCES public.admin_users(id) ON DELETE CASCADE;


--
-- Name: admin_users_roles_lnk admin_users_roles_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_users_roles_lnk
    ADD CONSTRAINT admin_users_roles_lnk_ifk FOREIGN KEY (role_id) REFERENCES public.admin_roles(id) ON DELETE CASCADE;


--
-- Name: admin_users admin_users_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: files files_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: files_folder_lnk files_folder_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files_folder_lnk
    ADD CONSTRAINT files_folder_lnk_fk FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE CASCADE;


--
-- Name: files_folder_lnk files_folder_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files_folder_lnk
    ADD CONSTRAINT files_folder_lnk_ifk FOREIGN KEY (folder_id) REFERENCES public.upload_folders(id) ON DELETE CASCADE;


--
-- Name: files_related_mph files_related_mph_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files_related_mph
    ADD CONSTRAINT files_related_mph_fk FOREIGN KEY (file_id) REFERENCES public.files(id) ON DELETE CASCADE;


--
-- Name: files files_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: i18n_locale i18n_locale_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: i18n_locale i18n_locale_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.i18n_locale
    ADD CONSTRAINT i18n_locale_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: imoveis imoveis_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.imoveis
    ADD CONSTRAINT imoveis_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: imoveis imoveis_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.imoveis
    ADD CONSTRAINT imoveis_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: imoveis_usuario_lnk imoveis_usuario_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.imoveis_usuario_lnk
    ADD CONSTRAINT imoveis_usuario_lnk_fk FOREIGN KEY (imovel_id) REFERENCES public.imoveis(id) ON DELETE CASCADE;


--
-- Name: imoveis_usuario_lnk imoveis_usuario_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.imoveis_usuario_lnk
    ADD CONSTRAINT imoveis_usuario_lnk_ifk FOREIGN KEY (user_id) REFERENCES public.up_users(id) ON DELETE CASCADE;


--
-- Name: noticias noticias_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.noticias
    ADD CONSTRAINT noticias_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: noticias noticias_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.noticias
    ADD CONSTRAINT noticias_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_api_token_permissions strapi_api_token_permissions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_token_permissions
    ADD CONSTRAINT strapi_api_token_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_api_token_permissions_token_lnk strapi_api_token_permissions_token_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_token_permissions_token_lnk
    ADD CONSTRAINT strapi_api_token_permissions_token_lnk_fk FOREIGN KEY (api_token_permission_id) REFERENCES public.strapi_api_token_permissions(id) ON DELETE CASCADE;


--
-- Name: strapi_api_token_permissions_token_lnk strapi_api_token_permissions_token_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_token_permissions_token_lnk
    ADD CONSTRAINT strapi_api_token_permissions_token_lnk_ifk FOREIGN KEY (api_token_id) REFERENCES public.strapi_api_tokens(id) ON DELETE CASCADE;


--
-- Name: strapi_api_token_permissions strapi_api_token_permissions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_token_permissions
    ADD CONSTRAINT strapi_api_token_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_api_tokens strapi_api_tokens_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_api_tokens strapi_api_tokens_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_api_tokens
    ADD CONSTRAINT strapi_api_tokens_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_audit_logs strapi_audit_logs_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_audit_logs
    ADD CONSTRAINT strapi_audit_logs_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_audit_logs strapi_audit_logs_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_audit_logs
    ADD CONSTRAINT strapi_audit_logs_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_audit_logs_user_lnk strapi_audit_logs_user_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_audit_logs_user_lnk
    ADD CONSTRAINT strapi_audit_logs_user_lnk_fk FOREIGN KEY (audit_log_id) REFERENCES public.strapi_audit_logs(id) ON DELETE CASCADE;


--
-- Name: strapi_audit_logs_user_lnk strapi_audit_logs_user_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_audit_logs_user_lnk
    ADD CONSTRAINT strapi_audit_logs_user_lnk_ifk FOREIGN KEY (user_id) REFERENCES public.admin_users(id) ON DELETE CASCADE;


--
-- Name: strapi_history_versions strapi_history_versions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_history_versions
    ADD CONSTRAINT strapi_history_versions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_release_actions strapi_release_actions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_release_actions
    ADD CONSTRAINT strapi_release_actions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_release_actions_release_lnk strapi_release_actions_release_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_release_actions_release_lnk
    ADD CONSTRAINT strapi_release_actions_release_lnk_fk FOREIGN KEY (release_action_id) REFERENCES public.strapi_release_actions(id) ON DELETE CASCADE;


--
-- Name: strapi_release_actions_release_lnk strapi_release_actions_release_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_release_actions_release_lnk
    ADD CONSTRAINT strapi_release_actions_release_lnk_ifk FOREIGN KEY (release_id) REFERENCES public.strapi_releases(id) ON DELETE CASCADE;


--
-- Name: strapi_release_actions strapi_release_actions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_release_actions
    ADD CONSTRAINT strapi_release_actions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_releases strapi_releases_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_releases
    ADD CONSTRAINT strapi_releases_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_releases strapi_releases_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_releases
    ADD CONSTRAINT strapi_releases_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_sessions strapi_sessions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_sessions
    ADD CONSTRAINT strapi_sessions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_sessions strapi_sessions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_sessions
    ADD CONSTRAINT strapi_sessions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_transfer_token_permissions strapi_transfer_token_permissions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions
    ADD CONSTRAINT strapi_transfer_token_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_transfer_token_permissions_token_lnk strapi_transfer_token_permissions_token_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_lnk
    ADD CONSTRAINT strapi_transfer_token_permissions_token_lnk_fk FOREIGN KEY (transfer_token_permission_id) REFERENCES public.strapi_transfer_token_permissions(id) ON DELETE CASCADE;


--
-- Name: strapi_transfer_token_permissions_token_lnk strapi_transfer_token_permissions_token_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions_token_lnk
    ADD CONSTRAINT strapi_transfer_token_permissions_token_lnk_ifk FOREIGN KEY (transfer_token_id) REFERENCES public.strapi_transfer_tokens(id) ON DELETE CASCADE;


--
-- Name: strapi_transfer_token_permissions strapi_transfer_token_permissions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_token_permissions
    ADD CONSTRAINT strapi_transfer_token_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_transfer_tokens strapi_transfer_tokens_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_tokens
    ADD CONSTRAINT strapi_transfer_tokens_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_transfer_tokens strapi_transfer_tokens_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_transfer_tokens
    ADD CONSTRAINT strapi_transfer_tokens_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_workflows strapi_workflows_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows
    ADD CONSTRAINT strapi_workflows_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_workflows_stage_required_to_publish_lnk strapi_workflows_stage_required_to_publish_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stage_required_to_publish_lnk
    ADD CONSTRAINT strapi_workflows_stage_required_to_publish_lnk_fk FOREIGN KEY (workflow_id) REFERENCES public.strapi_workflows(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows_stage_required_to_publish_lnk strapi_workflows_stage_required_to_publish_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stage_required_to_publish_lnk
    ADD CONSTRAINT strapi_workflows_stage_required_to_publish_lnk_ifk FOREIGN KEY (workflow_stage_id) REFERENCES public.strapi_workflows_stages(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows_stages strapi_workflows_stages_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages
    ADD CONSTRAINT strapi_workflows_stages_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_workflows_stages_permissions_lnk strapi_workflows_stages_permissions_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages_permissions_lnk
    ADD CONSTRAINT strapi_workflows_stages_permissions_lnk_fk FOREIGN KEY (workflow_stage_id) REFERENCES public.strapi_workflows_stages(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows_stages_permissions_lnk strapi_workflows_stages_permissions_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages_permissions_lnk
    ADD CONSTRAINT strapi_workflows_stages_permissions_lnk_ifk FOREIGN KEY (permission_id) REFERENCES public.admin_permissions(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows_stages strapi_workflows_stages_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages
    ADD CONSTRAINT strapi_workflows_stages_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: strapi_workflows_stages_workflow_lnk strapi_workflows_stages_workflow_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages_workflow_lnk
    ADD CONSTRAINT strapi_workflows_stages_workflow_lnk_fk FOREIGN KEY (workflow_stage_id) REFERENCES public.strapi_workflows_stages(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows_stages_workflow_lnk strapi_workflows_stages_workflow_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows_stages_workflow_lnk
    ADD CONSTRAINT strapi_workflows_stages_workflow_lnk_ifk FOREIGN KEY (workflow_id) REFERENCES public.strapi_workflows(id) ON DELETE CASCADE;


--
-- Name: strapi_workflows strapi_workflows_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.strapi_workflows
    ADD CONSTRAINT strapi_workflows_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_permissions up_permissions_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_permissions_role_lnk up_permissions_role_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_permissions_role_lnk
    ADD CONSTRAINT up_permissions_role_lnk_fk FOREIGN KEY (permission_id) REFERENCES public.up_permissions(id) ON DELETE CASCADE;


--
-- Name: up_permissions_role_lnk up_permissions_role_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_permissions_role_lnk
    ADD CONSTRAINT up_permissions_role_lnk_ifk FOREIGN KEY (role_id) REFERENCES public.up_roles(id) ON DELETE CASCADE;


--
-- Name: up_permissions up_permissions_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_permissions
    ADD CONSTRAINT up_permissions_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_roles up_roles_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_roles up_roles_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_roles
    ADD CONSTRAINT up_roles_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_users up_users_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: up_users_role_lnk up_users_role_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_users_role_lnk
    ADD CONSTRAINT up_users_role_lnk_fk FOREIGN KEY (user_id) REFERENCES public.up_users(id) ON DELETE CASCADE;


--
-- Name: up_users_role_lnk up_users_role_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_users_role_lnk
    ADD CONSTRAINT up_users_role_lnk_ifk FOREIGN KEY (role_id) REFERENCES public.up_roles(id) ON DELETE CASCADE;


--
-- Name: up_users up_users_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.up_users
    ADD CONSTRAINT up_users_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: upload_folders upload_folders_created_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_created_by_id_fk FOREIGN KEY (created_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: upload_folders_parent_lnk upload_folders_parent_lnk_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.upload_folders_parent_lnk
    ADD CONSTRAINT upload_folders_parent_lnk_fk FOREIGN KEY (folder_id) REFERENCES public.upload_folders(id) ON DELETE CASCADE;


--
-- Name: upload_folders_parent_lnk upload_folders_parent_lnk_ifk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.upload_folders_parent_lnk
    ADD CONSTRAINT upload_folders_parent_lnk_ifk FOREIGN KEY (inv_folder_id) REFERENCES public.upload_folders(id) ON DELETE CASCADE;


--
-- Name: upload_folders upload_folders_updated_by_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: strapi
--

ALTER TABLE ONLY public.upload_folders
    ADD CONSTRAINT upload_folders_updated_by_id_fk FOREIGN KEY (updated_by_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict 8Dq146vVzxVNcj3IH4CykyNOVekQdZrxh4XTKiFjZr2eg2KzuEKJ0vU0NVbkPMy

