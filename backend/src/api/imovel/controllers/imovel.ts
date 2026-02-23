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
      if (ctx.state.user && ctx.query.myProperties === 'true') {
        const userDocId = ctx.state.user.documentId;
        const userId = ctx.state.user.id;

        const orConditions: any[] = [];
        if (userDocId) {
          orConditions.push({ usuario: { documentId: { $eq: userDocId } } });
        }
        if (userId) {
          orConditions.push({ usuario: { id: { $eq: userId } } });
        }

        const userFilter = {
          $or: orConditions.length > 0 ? orConditions : [{ id: -1 }]
        };

        // Document API does NOT support populate='*'. Convert to explicit fields.
        const DEFAULT_POPULATE = ['usuario', 'fotos', 'foto_fachada'] as any;

        // Fetch both drafts and published using Document API
        const drafts = await strapi.documents('api::imovel.imovel').findMany({
          filters: userFilter,
          populate: DEFAULT_POPULATE,
          status: 'draft' as any
        }) as any[];

        const published = await strapi.documents('api::imovel.imovel').findMany({
          filters: userFilter,
          populate: DEFAULT_POPULATE,
          status: 'published' as any
        }) as any[];

        // Merge: prefer draft data but preserve publishedAt from published version
        const mergedMap = new Map();
        
        for (const p of published) {
          mergedMap.set(p.documentId, p);
        }
        
        for (const d of drafts) {
          if (mergedMap.has(d.documentId)) {
            const p = mergedMap.get(d.documentId);
            mergedMap.set(d.documentId, { ...d, publishedAt: p.publishedAt });
          } else {
            mergedMap.set(d.documentId, d);
          }
        }

        const mergedResults = Array.from(mergedMap.values());
        const sanitizedResults = await this.sanitizeOutput(mergedResults, ctx);
        return this.transformResponse(sanitizedResults);
      }

      return await super.find(ctx);
    } catch (err: any) {
      console.error('[Custom Find Error]', err.message, err.stack);
      return ctx.badRequest(err.message || 'Erro ao buscar imóveis.');
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

      // Enforce stripped fields for security
      const sanitizedInput = await this.sanitizeInput(ctx.request.body.data, ctx);
      const safeData = sanitizePropertyInput(sanitizedInput);
      ctx.request.body.data = safeData;

      // Delegate to default which handles media mappings properly
      const result = await super.update(ctx);

      return result;
    } catch (err: any) {
      console.error('Custom update error', err);
      return ctx.badRequest(err.message || 'Erro ao atualizar imóvel.');
    }
  },

  async fix(ctx) {
    try {
      const users = await strapi.db.query('plugin::users-permissions.user').findMany();
      if (users.length === 0) return ctx.send({ message: 'No users found' });
      
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
        } catch(e: any) {
          errs.push({ id: p.id, error: e.message });
        }
      }

      return ctx.send({ 
        fixed: fixedIds, 
        errs,
        unlinkedCount: unlinked.length,
        adminDocId 
      });
    } catch (err: any) {
      return ctx.badRequest(err.message);
    }
  },

  async create(ctx) {
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
      if (ctx.state.user && result?.data?.documentId) {
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
    } catch (err: any) {
      console.error('[Create Imovel] ERROR:', err);
      return ctx.badRequest(err.message || 'Erro ao criar imóvel.');
    }
  },
}));
