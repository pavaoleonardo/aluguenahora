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
                // Merge: use draft data but mark publishedAt from published version
                const merged = drafts.map((d) => {
                    if (publishedDocIds.has(d.documentId)) {
                        const pub = published.find((p) => p.documentId === d.documentId);
                        return { ...d, publishedAt: (pub === null || pub === void 0 ? void 0 : pub.publishedAt) || new Date().toISOString() };
                    }
                    return { ...d, publishedAt: null };
                });
                // Add published-only entries not in drafts (edge case)
                for (const p of published) {
                    if (!drafts.some((d) => d.documentId === p.documentId)) {
                        merged.push(p);
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
            // Delegate to default which handles media mappings properly
            const result = await super.update(ctx);
            return result;
        }
        catch (err) {
            console.error('Custom update error', err);
            return ctx.badRequest(err.message || 'Erro ao atualizar imóvel.');
        }
    },
    async fix(ctx) {
        try {
            const users = await strapi.db.query('plugin::users-permissions.user').findMany();
            if (users.length === 0)
                return ctx.send({ message: 'No users found' });
            const adminId = users[0].id; // id is a string/number
            const adminDocId = users[0].documentId;
            const unlinked = await strapi.db.query('api::imovel.imovel').findMany({
                where: { usuario: null }
            });
            const fixedIds = [];
            const errs = [];
            for (const p of unlinked) {
                try {
                    // In Strapi v5, updating a relation via document API:
                    await strapi.documents('api::imovel.imovel').update({
                        documentId: p.documentId,
                        data: {
                            // pass documentId of the related entity
                            usuario: adminDocId
                        }
                    });
                    fixedIds.push(p.id);
                }
                catch (e) {
                    errs.push({ id: p.id, error: e.message });
                }
            }
            return ctx.send({
                fixed: fixedIds,
                errs,
                unlinkedCount: unlinked.length,
                adminDocId
            });
        }
        catch (err) {
            return ctx.badRequest(err.message);
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
            // Force assign the current user as the owner using Document API
            if (ctx.state.user && ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.documentId)) {
                await strapi.documents('api::imovel.imovel').update({
                    documentId: result.data.documentId,
                    data: {
                        usuario: ctx.state.user.documentId || ctx.state.user.id
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
