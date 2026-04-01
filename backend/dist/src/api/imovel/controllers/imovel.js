"use strict";
/**
 * imovel controller - BUILD TRIGGER v4
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const isOwnerOfProperty = (property, user) => {
    if (!(property === null || property === void 0 ? void 0 : property.usuario) || !user)
        return false;
    return (property.usuario.documentId === user.documentId ||
        property.usuario.id === user.id);
};
const VIDEO_MAX_SIZE = 60 * 1024 * 1024; // 60MB
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm', 'video/ogg'];
const sanitizePropertyInput = (input) => {
    const data = { ...(input || {}) };
    delete data.usuario;
    delete data.estatus;
    delete data.publishedAt;
    delete data.status;
    delete data.createdBy;
    delete data.updatedBy;
    return data;
};
exports.default = strapi_1.factories.createCoreController('api::imovel.imovel', ({ strapi }) => ({
    async find(ctx) {
        try {
            if (ctx.state.user && ctx.query.myProperties === 'true') {
                // Remove custom param so Strapi core doesn't choke on it
                delete ctx.query.myProperties;
                // Step 1: Use low-level DB query to find property IDs owned by this user
                // (super.find blocks filtering by 'usuario' relation for security)
                const userId = ctx.state.user.id;
                const userProperties = await strapi.db.query('api::imovel.imovel').findMany({
                    where: { usuario: userId },
                    select: ['id', 'documentId'],
                });
                if (!userProperties || userProperties.length === 0) {
                    return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
                }
                const docIds = userProperties.map((p) => p.documentId);
                // Step 2: Fetch full data using super.find() with documentId filter (allowed!)
                ctx.query.filters = {
                    documentId: { $in: docIds }
                };
                // Fetch published version
                ctx.query.status = 'published';
                const pubResult = await super.find(ctx);
                const published = (pubResult === null || pubResult === void 0 ? void 0 : pubResult.data) || [];
                const publishedDocIds = new Set(published.map((p) => p.documentId));
                // Fetch draft version
                ctx.query.filters = { documentId: { $in: docIds } };
                ctx.query.status = 'draft';
                const draftResult = await super.find(ctx);
                const drafts = (draftResult === null || draftResult === void 0 ? void 0 : draftResult.data) || [];
                // Merge: use draft data but detect publish status
                const merged = drafts.map((d) => {
                    if (publishedDocIds.has(d.documentId)) {
                        const pub = published.find((p) => p.documentId === d.documentId);
                        const draftUpdated = new Date(d.updatedAt).getTime();
                        const pubUpdated = pub ? new Date(pub.updatedAt).getTime() : 0;
                        const isModified = draftUpdated > pubUpdated;
                        return {
                            ...d,
                            publishedAt: (pub === null || pub === void 0 ? void 0 : pub.publishedAt) || new Date().toISOString(),
                            _status: isModified ? 'modified' : 'published'
                        };
                    }
                    return { ...d, publishedAt: null, _status: 'draft' };
                });
                // Add published-only entries not in drafts (edge case)
                for (const p of published) {
                    if (!drafts.some((d) => d.documentId === p.documentId)) {
                        merged.push({ ...p, _status: 'published' });
                    }
                }
                return { data: merged, meta: { pagination: { page: 1, pageSize: 100, pageCount: 1, total: merged.length } } };
            }
            return await super.find(ctx);
        }
        catch (err) {
            console.error('[Custom Find Error]', err.message, err.stack);
            return ctx.badRequest(err.message || 'Erro ao buscar imóveis.');
        }
    },
    async findOne(ctx) {
        const { id } = ctx.params;
        const requestedStatus = String(ctx.query.status || '');
        try {
            const sanitizedQuery = await this.sanitizeQuery(ctx);
            let populate = sanitizedQuery.populate;
            if (!populate) {
                populate = ['usuario', 'fotos', 'foto_fachada'];
            }
            else if (populate === '*') {
                populate = '*';
            }
            else if (Array.isArray(populate)) {
                if (!populate.includes('usuario')) {
                    populate.push('usuario');
                }
            }
            else if (typeof populate === 'string') {
                populate = [populate, 'usuario'];
            }
            else if (typeof populate === 'object') {
                populate = { ...populate, usuario: true };
            }
            const isAuthenticated = Boolean(ctx.state.user);
            const statusesToTry = isAuthenticated
                ? requestedStatus === 'draft' || requestedStatus === 'published'
                    ? [requestedStatus]
                    : ['draft', 'published']
                : ['published'];
            let property = null;
            for (const status of statusesToTry) {
                property = await strapi.documents('api::imovel.imovel').findOne({
                    documentId: id,
                    populate: populate,
                    status: status,
                });
                if (property)
                    break;
            }
            if (!property) {
                return ctx.notFound();
            }
            const propertyAny = property;
            const isOwner = isOwnerOfProperty(propertyAny, ctx.state.user);
            const isActuallyPublished = Boolean(propertyAny.publishedAt);
            if (!isOwner && !isActuallyPublished) {
                return ctx.unauthorized('Você não tem permissão para visualizar este imóvel.');
            }
            const sanitizedResult = await this.sanitizeOutput(property, ctx);
            return this.transformResponse(sanitizedResult);
        }
        catch (err) {
            console.error('Custom findOne error:', err);
            ctx.badRequest('Erro ao buscar detalhes do imóvel.');
        }
    },
    async update(ctx) {
        var _a;
        const { id } = ctx.params;
        try {
            const property = await strapi.documents('api::imovel.imovel').findOne({
                documentId: id,
                populate: ['usuario']
            });
            if (!property)
                return ctx.notFound();
            const propertyAny = property;
            const isOwner = isOwnerOfProperty(propertyAny, ctx.state.user);
            if (!isOwner)
                return ctx.unauthorized('Você só pode editar seus próprios imóveis.');
            if (!((_a = ctx.request.body) === null || _a === void 0 ? void 0 : _a.data)) {
                return ctx.badRequest('Dados inválidos para atualização.');
            }
            // Enforce stripped fields for security
            const sanitizedInput = await this.sanitizeInput(ctx.request.body.data, ctx);
            const safeData = sanitizePropertyInput(sanitizedInput);
            ctx.request.body.data = safeData;
            // Delegate to default which handles media mappings properly (modifies Draft)
            const result = await super.update(ctx);
            // FORCE UNPUBLISH: When a user edits a property, immediately pull it down from live
            // so the admin has to review the new photos/description and re-publish it.
            try {
                await strapi.documents('api::imovel.imovel').unpublish({
                    documentId: id,
                });
            }
            catch (unpublishErr) {
                console.error('Failed to auto-unpublish property after edit:', unpublishErr);
            }
            return result;
        }
        catch (err) {
            console.error('Custom update error', err);
            return ctx.badRequest(err.message || 'Erro ao atualizar imóvel.');
        }
    },
    async create(ctx) {
        var _a;
        try {
            if (!ctx.request.body || !ctx.request.body.data) {
                return ctx.badRequest('Dados do imóvel não encontrados.');
            }
            // Sanitize input to prevent injection of estatus, usuario, etc
            const sanitizedInput = await this.sanitizeInput(ctx.request.body.data, ctx);
            const safeData = sanitizePropertyInput(sanitizedInput);
            ctx.request.body.data = safeData;
            // FORCE draft status — properties MUST be approved by admin before publishing.
            // Strapi v5 REST API publishes by default if status is not explicitly set.
            ctx.query.status = 'draft';
            // Create using default core logic (handles drafts, data normalization)
            const result = await super.create(ctx);
            // Force assign the current user as the owner using Document API
            if (ctx.state.user && ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.documentId)) {
                await strapi.documents('api::imovel.imovel').update({
                    documentId: result.data.documentId,
                    data: {
                        usuario: ctx.state.user.documentId || ctx.state.user.id
                    },
                    status: 'draft', // ensure we update the draft version
                });
                // Also fetch and append it manually to result so the UI gets it instantly
                result.data.usuario = {
                    id: ctx.state.user.id,
                    documentId: ctx.state.user.documentId
                };
            }
            return result;
        }
        catch (err) {
            console.error('[Create Imovel] ERROR:', err);
            return ctx.badRequest(err.message || 'Erro ao criar imóvel.');
        }
    },
    async uploadVideo(ctx) {
        try {
            if (!ctx.request.files || !ctx.request.files.video) {
                return ctx.badRequest('Arquivo de vídeo não encontrado.');
            }
            const file = Array.isArray(ctx.request.files.video)
                ? ctx.request.files.video[0]
                : ctx.request.files.video;
            const fileAny = file;
            // Strapi 5 / Formidable 3 properties
            const fileSize = fileAny.size;
            const fileType = fileAny.mimetype || fileAny.type; // Fallback for safety
            const fileTempPath = fileAny.filepath || fileAny.path;
            const fileNameOriginal = fileAny.originalFilename || fileAny.name;
            // Validation
            if (fileSize > VIDEO_MAX_SIZE) {
                return ctx.badRequest('O vídeo excede o limite de 60MB.');
            }
            if (!ALLOWED_VIDEO_TYPES.includes(fileType)) {
                return ctx.badRequest('Formato de vídeo não suportado. Use MP4, MOV, WebM ou OGG.');
            }
            // Prepare local path
            const uploadDir = path_1.default.join(process.cwd(), 'public', 'uploads', 'videos');
            if (!fs_1.default.existsSync(uploadDir)) {
                fs_1.default.mkdirSync(uploadDir, { recursive: true });
            }
            const extension = path_1.default.extname(fileNameOriginal || '');
            const fileName = `${crypto_1.default.randomUUID()}${extension}`;
            const filePath = path_1.default.join(uploadDir, fileName);
            // Copy file to local storage
            if (fileTempPath) {
                fs_1.default.copyFileSync(fileTempPath, filePath);
                // Clean up temp file
                if (fs_1.default.existsSync(fileTempPath)) {
                    try {
                        fs_1.default.unlinkSync(fileTempPath);
                    }
                    catch (e) { }
                }
            }
            // Return consistent URL path
            return ctx.send({
                url: `/uploads/videos/${fileName}`,
                name: fileNameOriginal,
            });
        }
        catch (err) {
            console.error('[Video Upload] ERROR:', err);
            return ctx.badRequest('Falha ao processar o upload do vídeo.');
        }
    },
}));
