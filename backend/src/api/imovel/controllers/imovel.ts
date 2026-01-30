/**
 * imovel controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::imovel.imovel', ({ strapi }) => ({
  async find(ctx) {
    // If the request is coming from the dashboard (user is authenticated)
    // we automatically filter by their properties.
    if (ctx.state.user) {
      ctx.query.filters = {
        ...(ctx.query.filters as any || {}),
        usuario: {
          documentId: {
            $eq: ctx.state.user.documentId
          }
        }
      };
    }

    try {
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      
      // Strapi 5 Document Service needs an explicit status.
      // For public requests, we only want 'published'.
      // For authenticated dashboard, we usually want 'all' (draft + published).
      const status = ctx.query.status || (ctx.state.user ? 'all' : 'published');

      const results = await strapi.documents('api::imovel.imovel').findMany({
        ...sanitizedQuery,
        status: status as any,
        filters: (sanitizedQuery.filters as any) || {}
      });
      
      const sanitizedResults = await this.sanitizeOutput(results, ctx);
      return this.transformResponse(sanitizedResults);
    } catch (err: any) {
      console.error('Custom find error', err);
      ctx.badRequest('Erro ao buscar imóveis: ' + err.message);
    }
  },
  async create(ctx) {
    if (ctx.state.user) {
      // Force the usuario to be the current user
      ctx.request.body.data.usuario = ctx.state.user.documentId;
    }
    
    try {
      // Bypass create validation if it also throws "Invalid key usuario"
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
