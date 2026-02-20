/**
 * imovel controller - BUILD TRIGGER v4
 */

import { factories } from '@strapi/strapi';

const isOwnerOfProperty = (property: any, user: any) => {
  if (!property?.usuario || !user) return false;

  return (
    property.usuario.documentId === user.documentId ||
    property.usuario.id === user.id
  );
};

const sanitizePropertyInput = (input: any) => {
  const data = { ...(input || {}) };

  delete data.usuario;
  delete data.estatus;
  delete data.publishedAt;
  delete data.status;
  delete data.createdBy;
  delete data.updatedBy;

  return data;
};

export default factories.createCoreController('api::imovel.imovel', ({ strapi }) => ({
  async find(ctx) {
    try {
      const sanitizedQuery: any = await this.sanitizeQuery(ctx);
      let status: 'published' | 'draft' | 'all' = 'published';

      if (ctx.state.user && ctx.query.myProperties === 'true') {
        const userDocId = ctx.state.user.documentId;
        const userId = ctx.state.user.id;

        sanitizedQuery.filters = {
          ...(sanitizedQuery.filters || {}),
          $or: [
            { usuario: { documentId: { $eq: userDocId } } },
            { usuario: { id: { $eq: userId } } }
          ]
        };

        const requestedStatus = String(ctx.query.status || '');
        if (requestedStatus === 'draft' || requestedStatus === 'published' || requestedStatus === 'all') {
          status = requestedStatus;
        } else {
          status = 'all';
        }
      }

      const results = await strapi.documents('api::imovel.imovel').findMany({
        ...sanitizedQuery,
        status: status as any,
      });

      const sanitizedResults = await this.sanitizeOutput(results, ctx);
      return this.transformResponse(sanitizedResults);
    } catch (err: any) {
      console.error('[Custom Find Error]', err);
      ctx.badRequest('Erro ao buscar imóveis.');
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const requestedStatus = String(ctx.query.status || '');
    
    try {
      const sanitizedQuery: any = await this.sanitizeQuery(ctx);
      let populate: any = sanitizedQuery.populate;
      
      if (!populate) {
        populate = ['usuario', 'fotos', 'foto_fachada'];
      } else if (populate === '*') {
        populate = '*';
      } else if (Array.isArray(populate)) {
        if (!populate.includes('usuario')) {
          populate.push('usuario');
        }
      } else if (typeof populate === 'string') {
        populate = [populate, 'usuario'];
      } else if (typeof populate === 'object') {
        populate = { ...populate, usuario: true };
      }

      const isAuthenticated = Boolean(ctx.state.user);
      const statusesToTry: Array<'draft' | 'published'> = isAuthenticated
        ? requestedStatus === 'draft' || requestedStatus === 'published'
          ? [requestedStatus]
          : ['draft', 'published']
        : ['published'];

      let property = null;
      for (const status of statusesToTry) {
        property = await strapi.documents('api::imovel.imovel').findOne({
          documentId: id,
          populate: populate,
          status: status as any,
        });
        if (property) break;
      }

      if (!property) {
        return ctx.notFound();
      }

      const propertyAny = property as any;
      const isOwner = isOwnerOfProperty(propertyAny, ctx.state.user);
      const isActuallyPublished = Boolean(propertyAny.publishedAt);

      if (!isOwner && !isActuallyPublished) {
        return ctx.unauthorized('Você não tem permissão para visualizar este imóvel.');
      }

      const sanitizedResult = await this.sanitizeOutput(property, ctx);
      return this.transformResponse(sanitizedResult);
    } catch (err: any) {
      console.error('Custom findOne error:', err);
      ctx.badRequest('Erro ao buscar detalhes do imóvel.');
    }
  },

  async update(ctx) {
    const { id } = ctx.params;
    
    try {
      const property = await strapi.documents('api::imovel.imovel').findOne({
        documentId: id,
        populate: ['usuario']
      });

      if (!property) return ctx.notFound();

      const propertyAny = property as any;
      const isOwner = isOwnerOfProperty(propertyAny, ctx.state.user);
      
      if (!isOwner) return ctx.unauthorized('Você só pode editar seus próprios imóveis.');

      if (!ctx.request.body?.data) {
        return ctx.badRequest('Dados inválidos para atualização.');
      }

      const sanitizedInput = await this.sanitizeInput(ctx.request.body.data, ctx);
      const safeData = sanitizePropertyInput(sanitizedInput);

      const result = await strapi.documents('api::imovel.imovel').update({
        documentId: id,
        data: {
          ...(safeData as any),
          estatus: 'pendente',
        },
      });

      const sanitizedResult = await this.sanitizeOutput(result, ctx);
      return this.transformResponse(sanitizedResult);
    } catch (err: any) {
      console.error('Custom update error', err);
      ctx.badRequest('Erro ao atualizar imóvel.');
    }
  },

  async create(ctx) {
    try {
      if (!ctx.request.body || !ctx.request.body.data) {
        return ctx.badRequest('Dados do imóvel não encontrados.');
      }

      const sanitizedInput = await this.sanitizeInput(ctx.request.body.data, ctx);
      const ownerId = ctx.state.user.documentId || ctx.state.user.id;
      const safeData = sanitizePropertyInput(sanitizedInput);
      
      const propertyData = {
        ...(safeData as any),
        usuario: ownerId,
        estatus: 'pendente'
      };

      const result = await strapi.documents('api::imovel.imovel').create({
        data: propertyData,
      });

      const sanitizedResult = await this.sanitizeOutput(result, ctx);
      return this.transformResponse(sanitizedResult);
    } catch (err: any) {
      console.error('[Create Imovel] ERROR:', err);
      ctx.badRequest('Erro ao criar imóvel.');
    }
  },
}));
