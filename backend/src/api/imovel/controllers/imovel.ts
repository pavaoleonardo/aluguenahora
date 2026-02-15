/**
 * imovel controller - BUILD TRIGGER v2
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::imovel.imovel', ({ strapi }) => ({
  async find(ctx) {
    try {
      const sanitizedQuery = await this.sanitizeQuery(ctx);
      
      let status = 'published';

      if (ctx.state.user && ctx.query.myProperties === 'true') {
        const userDocId = ctx.state.user.documentId;
        
        sanitizedQuery.filters = {
          ...(sanitizedQuery.filters as any || {}),
          usuario: {
            documentId: {
              $eq: userDocId
            }
          }
        };
        
        status = ctx.query.status as string || 'all';
        console.log(`[Dashboard Filter] Filtering for user DocID: ${userDocId}, Status: ${status}`);
      }
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
    console.log('[Create Imovel] Received request');
    
    try {
      if (!ctx.request.body || !ctx.request.body.data) {
        console.error('[Create Imovel] Missing body or data');
        return ctx.badRequest('Dados do imóvel não encontrados no corpo da requisição.');
      }

      // 1. Sanitize the user input (removes forbidden fields)
      const sanitizedInput = await this.sanitizeInput(ctx.request.body.data, ctx);
      
      // 2. Add system-controlled fields (owner and status)
      const ownerId = ctx.state.user.documentId || ctx.state.user.id;
      
      const propertyData = {
        ...(sanitizedInput as any),
        usuario: ownerId,
        estatus: 'pendente' // All new properties from the site start as pending
      };

      console.log(`[Create Imovel] Creating property for user: ${ctx.state.user.username} (ownerId: ${ownerId})`);

      // 3. Save to database using Strapi 5 Document Service
      const result = await strapi.documents('api::imovel.imovel').create({
        data: propertyData,
      });

      console.log(`[Create Imovel] Successfully created property: ${result.documentId}`);

      // 4. Sanitize and return response
      const sanitizedResult = await this.sanitizeOutput(result, ctx);
      return this.transformResponse(sanitizedResult);
    } catch (err: any) {
      console.error('[Create Imovel] ERROR:', err);
      // Detailed error for debugging, though we might want to mask this in pure production
      ctx.badRequest('Erro ao processar criação de imóvel: ' + (err.message || 'Erro interno'));
    }
  },
}));
