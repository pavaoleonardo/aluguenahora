/**
 * imovel controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::imovel.imovel', ({ strapi }) => ({
  async find(ctx) {
    try {
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      
      // If the request is coming from the dashboard (user is authenticated)
      // we automatically filter by their properties if ?myProperties=true is passed.
      if (ctx.state.user && ctx.query.myProperties === 'true') {
        const userId = ctx.state.user.id;
        const userDocId = ctx.state.user.documentId;
        
        // Strapi 5 Document Service filters for relations work best with documentId.
        // If we don't have documentId, we fall back to numeric ID.
        const filterValue = userDocId || userId;

        sanitizedQuery.filters = {
          ...(sanitizedQuery.filters as any || {}),
          usuario: filterValue
        };
        
        console.log(`[Dashboard Filter] User: ${ctx.state.user.username}`);
        console.log(`[Dashboard Filter] IDs: { id: ${userId}, documentId: ${userDocId} }`);
        console.log(`[Dashboard Filter] Using filter value: ${filterValue}`);
      }

      // Strapi 5 Document Service needs an explicit status.
      const status = ctx.query.status || (ctx.state.user && ctx.query.myProperties === 'true' ? 'all' : 'published');
      console.log(`[Dashboard Filter] Final status: ${status}`);

      const results = await strapi.documents('api::imovel.imovel').findMany({
        ...sanitizedQuery,
        status: status as any,
      });

      console.log(`[Dashboard Filter] Found ${results?.length || 0} properties`);
      
      const sanitizedResults = await this.sanitizeOutput(results, ctx);
      return this.transformResponse(sanitizedResults);
    } catch (err: any) {
      console.error('[Custom Find Error]', err);
      ctx.badRequest('Erro ao buscar imóveis: ' + err.message);
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    
    try {
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      
      // Strapi 5: For private dashboard views, we allow draft/pending status if owner.
      // But findOne is shared with public view.
      // Strategy: Fetch the document first to check owner.
      const property = await strapi.documents('api::imovel.imovel').findOne({
        documentId: id,
        populate: ['usuario']
      });

      if (!property) {
        return ctx.notFound();
      }

      // owner check
      const isOwner = ctx.state.user && property.usuario && (
        (property.usuario as any).documentId === ctx.state.user.documentId || 
        (property.usuario as any).id === ctx.state.user.id
      );
      
      // If not owner and not published, deny
      if (!isOwner && property.estatus !== 'publicado') {
        return ctx.unauthorized('Você não tem permissão para visualizar este imóvel em rascunho.');
      }

      const sanitizedResult = await this.sanitizeOutput(property, ctx);
      return this.transformResponse(sanitizedResult);
    } catch (err: any) {
      console.error('Custom findOne error', err);
      ctx.badRequest('Erro ao buscar detalhes do imóvel: ' + err.message);
    }
  },

  async update(ctx) {
    const { id } = ctx.params;
    
    try {
      // 1. Find the property to check ownership
      const property = await strapi.documents('api::imovel.imovel').findOne({
        documentId: id,
        populate: ['usuario']
      });

      if (!property) {
        return ctx.notFound();
      }

      const isOwner = ctx.state.user && property.usuario && (
        (property.usuario as any).documentId === ctx.state.user.documentId || 
        (property.usuario as any).id === ctx.state.user.id
      );
      
      if (!isOwner) {
        return ctx.unauthorized('Você só pode editar seus próprios imóveis.');
      }

      // 2. Perform the update
      // Prevent user from changing the owner
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
    if (ctx.state.user) {
      // Force the usuario to be the current user
      ctx.request.body.data.usuario = ctx.state.user.documentId || ctx.state.user.id;
    }
    
    try {
      const sanitizedInput = await this.sanitizeInput(ctx.request.body.data, ctx);
      const result = await strapi.documents('api::imovel.imovel').create({
        data: sanitizedInput as any,
      });
      const sanitizedResult = await this.sanitizeOutput(result, ctx);
      return this.transformResponse(sanitizedResult);
    } catch (err: any) {
      console.error('Custom create error', err);
      ctx.badRequest('Erro ao criar imóvel: ' + err.message);
    }
  }
}));
