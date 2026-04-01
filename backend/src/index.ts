import type { Core } from '@strapi/strapi';
import axios from 'axios';
import sharp from 'sharp';

// Optimize sharp for low memory environments
sharp.concurrency(1);
sharp.cache(false);

// Geocode function
const geocodeAddress = async (endereco: string, bairro: any, cidade: string): Promise<{ latitude: number; longitude: number } | null> => {
  if (!endereco || !endereco.trim()) return null;
  
  const bairroStr = typeof bairro === 'object' ? bairro?.bairro : (typeof bairro === 'string' ? bairro : '');
  const cidadeStr = cidade || 'Campo Grande';
  
  // Try different address formats from most specific to least specific
  const addressVariations = [
    `${endereco}, ${bairroStr}, ${cidadeStr}, MS, Brasil`,
    `${endereco}, ${cidadeStr}, MS, Brasil`,
    `${endereco}, ${cidadeStr}, Brasil`
  ].filter(v => v.length > 0);

  for (const fullAddress of addressVariations) {
    try {
      console.log(`[Geocoding] Attempting: ${fullAddress}`);
      
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          format: 'json',
          q: fullAddress,
          limit: 1
        },
        headers: { 
          'User-Agent': 'AlugueNaHora-App/1.0 (pavaoleonardo@gmail.com)' 
        },
        timeout: 10000
      });
      
      const data = response.data;
      
      if (data && data.length > 0) {
        console.log(`[Geocoding] Success: lat=${data[0].lat}, lon=${data[0].lon}`);
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon)
        };
      }
    } catch (error: any) {
      console.error(`[Geocoding] Error with variation "${fullAddress}": ${error.message}`);
    }
  }
  
  return null;
};

export default {
  async register({ strapi }: { strapi: Core.Strapi }) {
    // Register custom field
    strapi.customFields.register({
      name: 'bairro-regiao',
      type: 'json',
    });

    // Temporarily disabled geocoding middleware to save memory and avoid crashes on update
    /*
    strapi.documents.use(async (context, next) => {
      if (context.uid !== 'api::imovel.imovel') return next();
      if (context.action !== 'create' && context.action !== 'update') return next();

      const params = context.params as any;
      const data = params?.data;

      if (data?.endereco) {
        const hasCoords = data.latitude && data.longitude && 
                         Math.abs(data.latitude) > 0 && Math.abs(data.longitude) > 0;

        if (!hasCoords) {
          const coords = await geocodeAddress(data.endereco, data.bairro, data.cidade);
          if (coords) {
            data.latitude = coords.latitude;
            data.longitude = coords.longitude;
          }
        }
      }
      return next();
    });
    */
  },
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1. Force the Users-Permissions "Shipper email" to match Resend's strict domain rules so 400 Bad Request errors stop
    (async () => {
      try {
        const pluginStore = strapi.store({
          environment: '',
          type: 'plugin',
          name: 'users-permissions',
        });
        const templateSettings = await pluginStore.get({ key: 'email' }) as any;
        if (templateSettings && templateSettings.email_confirmation) {
          // Strapi natively hardcodes 'no-reply@strapi.io', which actively crashes Resend. Override this to the verified Sender.
          templateSettings.email_confirmation.options.from.email = 'noreply@mail.aluguenahora.com.br';
          templateSettings.email_confirmation.options.from.name = 'Alugue na Hora';
          templateSettings.email_confirmation.options.response_email = 'noreply@mail.aluguenahora.com.br';
          
          templateSettings.reset_password.options.from.email = 'noreply@mail.aluguenahora.com.br';
          templateSettings.reset_password.options.from.name = 'Alugue na Hora';
          templateSettings.reset_password.options.response_email = 'noreply@mail.aluguenahora.com.br';
          
          await pluginStore.set({ key: 'email', value: templateSettings });
          console.log('✅ [Bootstrap] Re-aligned Users-Permissions email shipper domains for Resend SMTP compatibility.');
        }
      } catch (err: any) {
        console.log('[Bootstrap] Error fetching email template settings:', err.message);
      }
    })();

    // 2. Auto-recovery for corrupted or missing up_users table
    (async () => {
      try {
        if (strapi.db && strapi.db.connection) {
          const hasTable = await strapi.db.connection.schema.hasTable('up_users');
          if (!hasTable) {
            console.log('🚨 [Bootstrap] up_users table is missing! Natively reconstructing base schema...');
            await strapi.db.connection.schema.createTable('up_users', (table: any) => {
              table.increments('id').primary();
              table.string('username', 255);
              table.string('email', 255);
              table.string('provider', 255);
              table.string('password', 255);
              table.string('reset_password_token', 255);
              table.string('confirmation_token', 255);
              table.boolean('confirmed').defaultTo(false);
              table.boolean('blocked').defaultTo(false);
              table.integer('role_id'); // Relation to up_roles
              table.datetime('created_at').defaultTo(strapi.db.connection.fn.now());
              table.datetime('updated_at').defaultTo(strapi.db.connection.fn.now());
              table.integer('created_by_id');
              table.integer('updated_by_id');
              table.string('document_id', 255);
              table.string('published_at', 255);
              table.string('locale', 255);
              
              // Our custom fields
              table.string('telefone', 255);
              table.string('celular', 255);
              table.string('creci', 255);
              table.string('nome_imobiliaria', 255);
            });
            console.log('✅ [Bootstrap] up_users table successfully reconstructed with custom fields.');
          } else {
            // Apply safe custom columns if table exists but is missing our custom fields
            const hasTelefone = await strapi.db.connection.schema.hasColumn('up_users', 'telefone');
            if (!hasTelefone) {
              await strapi.db.connection.schema.alterTable('up_users', (table: any) => {
                table.string('telefone', 255);
                table.string('celular', 255);
                table.string('creci', 255);
                table.string('nome_imobiliaria', 255);
              });
              console.log('[Bootstrap] Successfully added custom structural columns to healthy up_users table.');
            }
            
            // Fix: Strapi i18n plugin demands "locale" column but might be missing on manual db reconstruction
            const hasLocale = await strapi.db.connection.schema.hasColumn('up_users', 'locale');
            if (!hasLocale) {
               await strapi.db.connection.schema.alterTable('up_users', (table: any) => {
                 table.string('locale', 255);
               });
               console.log('[Bootstrap] Added explicitly missing locale column to up_users.');
            }
            
            // Fix: Strapi 5 uses "role" direct column in some queries for users-permissions limits and authentications
            const hasRole = await strapi.db.connection.schema.hasColumn('up_users', 'role');
            if (!hasRole) {
               await strapi.db.connection.schema.alterTable('up_users', (table: any) => {
                 table.integer('role');
               });
               console.log('[Bootstrap] Added explicitly missing role column to up_users.');
            }
          }
        }
      } catch (err: any) {
        console.warn('[Bootstrap] Auto-recovery logic error:', err.message);
      }
    })();

    // Seed news logic
    const seedNews = async () => {
      try {
        const newsToSeed = [
          {
            titulo: 'Bairro São Francisco lidera valorização imobiliária em Campo Grande com alta de 35%',
            resumo: 'Com infraestrutura consolidada e localização privilegiada, o bairro se destaca como o principal polo de valorização na capital sul-mato-grossense em 2025.',
            conteudo: 'O mercado imobiliário de Campo Grande vive um momento de forte valorização, e o bairro São Francisco é o grande destaque deste ciclo. Segundo pesquisas recentes, o bairro registrou um aumento médio de 35% no valor do metro quadrado apenas no último ano.\n\nA proximidade com o centro, a presença de serviços de alta qualidade e o perfil residencial de alto padrão têm atraído investidores e famílias que buscam solidez e qualidade de vida. Outros bairros como Planalto e Jardim dos Estados também seguem em ritmo acelerado de crescimento, consolidando a Capital como um dos melhores destinos para investimento imobiliário no Centro-Oeste.',
            categoria: 'Valorização',
            data: '2026-02-10',
          },
          {
            titulo: 'Alta demanda: Estoque de imóveis em Campo Grande pode se esgotar em apenas 4 meses',
            resumo: 'O aquecimento do mercado imobiliário na Capital atinge níveis recordes, impulsionado pela facilidade de crédito e novos lançamentos.',
            conteudo: 'A velocidade de vendas em Campo Grande atingiu patamares nunca antes vistos. Se o ritmo atual de comercialização for mantido e não houver novos lançamentos expressivos, o estoque atual de imóveis prontos e na planta pode se esgotar em menos de 120 dias.\n\nEste cenário é reflexo de uma combination de fatores: a redução das taxas de juros em linhas de crédito específicas, o aumento do poder de compra regional impulsionado pelo agronegócio e a busca por ativos reais como forma de proteção patrimonial. Especialistas recomendam que compradores fiquem atentos às oportunidades, pois a tendência é de continuidade na alta dos preços devido à escassez de oferta.',
            categoria: 'Investimento',
            data: '2026-02-08',
          },
          {
            titulo: 'Agronegócio e infraestrutura impulsionam recorde de investimentos imobiliários em MS',
            resumo: 'O setor imobiliário do estado vive um momento de forte expansão, atraindo investidores de todo o Brasil interessados na solidez econômica regional.',
            conteudo: 'Mato Grosso do Sul consolidou sua posição como um dos estados mais dinâmicos do Brasil para o setor imobiliário. O sucesso recorde das safras e a expansão das fronteiras agrícolas têm gerado um excedente de capital que está sendo reinvestido massivamente em imóveis urbanos e rurais.\n\nAlém disso, os grandes projetos de infraestrutura, como a Rota Bioceânica, estão criando novos polos de desenvolvimento no interior do estado, como em Porto Murtinho e Ribas do Rio Pardo. Em Campo Grande, o reflexo é visto em lançamentos de luxo e na modernização da rede hoteleira e de serviços, atraindo olhares de grandes incorporadoras nacionais que antes focavam apenas no eixo Rio-São Paulo.',
            categoria: 'Alta Demanda',
            data: '2026-02-05',
          }
        ];

        for (const item of newsToSeed) {
          const existing = await strapi.db.query('api::noticia.noticia').findOne({
            where: { titulo: item.titulo }
          });

          if (!existing) {
            await (strapi as any).documents('api::noticia.noticia').create({
              data: item,
              status: 'published'
            });
          }
        }
      } catch (error) {
        console.error('[Bootstrap] Error seeding news:', error);
      }
    };

    seedNews();
  },
};
