/**
 * imovel controller - BUILD TRIGGER v4
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::imovel.imovel', ({ strapi }) => ({
  async find(ctx) {
    try {
      const sanitizedQuery: any = await this.sanitizeQuery(ctx);
      console.log('[Backend find] Query filters:', JSON.stringify(sanitizedQuery.filters, null, 2));
      
      let status = 'published';

      if (ctx.state.user && ctx.query.myProperties === 'true') {
        const userDocId = ctx.state.user.documentId;
        const userId = ctx.state.user.id;
        
        // Robust filter for owner
        sanitizedQuery.filters = {
          ...(sanitizedQuery.filters || {}),
          $or: [
            { usuario: { documentId: { $eq: userDocId } } },
            { usuario: { id: { $eq: userId } } }
          ]
        };
        
        // For dashboard, we want to see everything
        status = (ctx.query.status as string) || 'all';
        console.log(`[Dashboard Filter] User: ${ctx.state.user.username} Status: ${status}`);
      }

      const results = await strapi.documents('api::imovel.imovel').findMany({
        ...sanitizedQuery,
        status: status as any,
      });

      console.log(`[Dashboard Filter] Results: ${results?.length || 0}`);
      
      const sanitizedResults = await this.sanitizeOutput(results, ctx);
      return this.transformResponse(sanitizedResults);
    } catch (err: any) {
      console.error('[Custom Find Error]', err);
      ctx.badRequest('Erro ao buscar imóveis: ' + err.message);
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const requestedStatus = ctx.query.status as string;
    
    try {
      const sanitizedQuery: any = await this.sanitizeQuery(ctx);
      
      // Simplified and robust populate logic to avoid "Invalid populate parameter" error
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
        // If it's already an object, just ensure usuario is included
        populate = { ...populate, usuario: true };
      }

      console.log(`[findOne] ID: ${id}, Status: ${requestedStatus || 'draft (default)'}`);

      // Try as draft first
      let property = await strapi.documents('api::imovel.imovel').findOne({
        documentId: id,
        populate: populate,
        status: (requestedStatus as any) || 'draft'
      });

      // Fallback to published if not found as draft and no status was explicitly requested
      if (!property && !requestedStatus) {
        console.log(`[findOne Fallback] Not found as draft, trying published for ID: ${id}`);
        property = await strapi.documents('api::imovel.imovel').findOne({
          documentId: id,
          populate: populate,
          status: 'published'
        });
      }

      if (!property) {
        console.warn(`[findOne] Not found: ${id}`);
        return ctx.notFound();
      }

      // Owner check
      const propertyAny = property as any;
      const isOwner = ctx.state.user && propertyAny.usuario && (
        (propertyAny.usuario as any).documentId === ctx.state.user.documentId || 
        (propertyAny.usuario as any).id === ctx.state.user.id
      );
      
      // If not owner and not published, deny
      if (!isOwner && propertyAny.estatus !== 'publicado') {
        console.warn(`[findOne] Unauthorized: ${id} by ${ctx.state.user?.username || 'Guest'}`);
        return ctx.unauthorized('Você não tem permissão para visualizar este imóvel.');
      }

      const sanitizedResult = await this.sanitizeOutput(property, ctx);
      return this.transformResponse(sanitizedResult);
    } catch (err: any) {
      console.error('Custom findOne error:', err);
      ctx.badRequest('Erro ao buscar detalhes do imóvel: ' + err.message);
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
      const isOwner = ctx.state.user && propertyAny.usuario && (
        (propertyAny.usuario as any).documentId === ctx.state.user.documentId || 
        (propertyAny.usuario as any).id === ctx.state.user.id
      );
      
      if (!isOwner) return ctx.unauthorized('Você só pode editar seus próprios imóveis.');

      if (ctx.request.body.data) {
        delete ctx.request.body.data.usuario;
      }

      const result = await strapi.documents('api::imovel.imovel').update({
        documentId: id,
        data: ctx.request.body.data,
      });

      const sanitizedResult = await this.sanitizeOutput(result, ctx);
      return this.transformResponse(sanitizedResult);
    } catch (err: any) {
      console.error('Custom update error', err);
      ctx.badRequest('Erro ao atualizar imóvel: ' + err.message);
    }
  },

  async create(ctx) {
    try {
      if (!ctx.request.body || !ctx.request.body.data) {
        return ctx.badRequest('Dados do imóvel não encontrados.');
      }

      const sanitizedInput = await this.sanitizeInput(ctx.request.body.data, ctx);
      const ownerId = ctx.state.user.documentId || ctx.state.user.id;
      
      const propertyData = {
        ...(sanitizedInput as any),
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
      ctx.badRequest('Erro ao criar imóvel: ' + err.message);
    }
  },
}));
