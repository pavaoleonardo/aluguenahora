"use strict";
/**
 * imovel controller - BUILD TRIGGER v4
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const isOwnerOfProperty = (property, user) => {
    if (!(property === null || property === void 0 ? void 0 : property.usuario) || !user)
        return false;
    return (property.usuario.documentId === user.documentId ||
        property.usuario.id === user.id);
};
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
                const userDocId = ctx.state.user.documentId;
                const userId = ctx.state.user.id;
                ctx.query.filters = {
                    ...(typeof ctx.query.filters === 'object' && ctx.query.filters !== null ? ctx.query.filters : {}),
                    $or: [
                        { usuario: { documentId: { $eq: userDocId } } },
                        { usuario: { id: { $eq: userId } } }
                    ]
                };
                const requestedStatus = String(ctx.query.status || '');
                if (requestedStatus === 'draft' || requestedStatus === 'published' || requestedStatus === 'all') {
                    ctx.query.status = requestedStatus;
                }
                else {
                    ctx.query.status = 'all';
                }
            }
            return await super.find(ctx);
        }
        catch (err) {
            console.error('[Custom Find Error]', err.message, err.stack);
            ctx.badRequest(err.message || 'Erro ao buscar imóveis.');
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
            // Delegate to default which handles media mappings properly
            const result = await super.update(ctx);
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
            // Create using default core logic (handles drafts, data normalization)
            const result = await super.create(ctx);
            // Force assign the current user as the owner using DB layer!
            if (ctx.state.user && ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.documentId)) {
                await strapi.db.query('api::imovel.imovel').update({
                    where: { documentId: result.data.documentId },
                    data: {
                        usuario: ctx.state.user.id // DB layer uses numeric ID always
                    }
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
}));
