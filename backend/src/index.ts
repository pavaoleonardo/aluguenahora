import type { Core } from '@strapi/strapi';
import axios from 'axios';

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
    // Wait a bit between attempts to respect rate limits if needed, 
    // though here we only have 3 variations max.
  }
  
  return null;
};

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    // Register custom field
    strapi.customFields.register({
      name: 'bairro-regiao',
      type: 'json',
    });

    // Register document service middleware for geocoding
    strapi.documents.use(async (context, next) => {
      // Only process imovel content type
      if (context.uid !== 'api::imovel.imovel') {
        return next();
      }

      // Only process create and update actions
      if (context.action !== 'create' && context.action !== 'update') {
        return next();
      }

      const params = context.params as any;
      const data = params?.data;

      // Check if we have an address
      if (data?.endereco) {
        // Only geocode if coordinates are missing or zero
        // This allows manual override if the user manually enters coords
        const hasCoords = data.latitude && data.longitude && 
                         Math.abs(data.latitude) > 0 && Math.abs(data.longitude) > 0;

        if (!hasCoords) {
          console.log(`[Middleware] Geocoding for address: ${data.endereco}`);
          
          const coords = await geocodeAddress(
            data.endereco,
            data.bairro,
            data.cidade
          );
          
          if (coords) {
            data.latitude = coords.latitude;
            data.longitude = coords.longitude;
            console.log(`[Middleware] Coordinates automatically set: ${coords.latitude}, ${coords.longitude}`);
          } else {
            console.log(`[Middleware] Could not geocode address: ${data.endereco}`);
          }
        }
      }

      return next();
    });
  },

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
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
            publishedAt: new Date(),
          },
          {
            titulo: 'Alta demanda: Estoque de imóveis em Campo Grande pode se esgotar em apenas 4 meses',
            resumo: 'O aquecimento do mercado imobiliário na Capital atinge níveis recordes, impulsionado pela facilidade de crédito e novos lançamentos.',
            conteudo: 'A velocidade de vendas em Campo Grande atingiu patamares nunca antes vistos. Se o ritmo atual de comercialização for mantido e não houver novos lançamentos expressivos, o estoque atual de imóveis prontos e na planta pode se esgotar em menos de 120 dias.\n\nEste cenário é reflexo de uma combination de fatores: a redução das taxas de juros em linhas de crédito específicas, o aumento do poder de compra regional impulsionado pelo agronegócio e a busca por ativos reais como forma de proteção patrimonial. Especialistas recomendam que compradores fiquem atentos às oportunidades, pois a tendência é de continuidade na alta dos preços devido à escassez de oferta.',
            categoria: 'Investimento',
            data: '2026-02-08',
            publishedAt: new Date(),
          },
          {
            titulo: 'Agronegócio e infraestrutura impulsionam recorde de investimentos imobiliários em MS',
            resumo: 'O setor imobiliário do estado vive um momento de forte expansão, atraindo investidores de todo o Brasil interessados na solidez econômica regional.',
            conteudo: 'Mato Grosso do Sul consolidou sua posição como um dos estados mais dinâmicos do Brasil para o setor imobiliário. O sucesso recorde das safras e a expansão das fronteiras agrícolas têm gerado um excedente de capital que está sendo reinvestido massivamente em imóveis urbanos e rurais.\n\nAlém disso, os grandes projetos de infraestrutura, como a Rota Bioceânica, estão criando novos polos de desenvolvimento no interior do estado, como em Porto Murtinho e Ribas do Rio Pardo. Em Campo Grande, o reflexo é visto em lançamentos de luxo e na modernização da rede hoteleira e de serviços, atraindo olhares de grandes incorporadoras nacionais que antes focavam apenas no eixo Rio-São Paulo.',
            categoria: 'Alta Demanda',
            data: '2026-02-05',
            publishedAt: new Date(),
          }
        ];

        for (const item of newsToSeed) {
          const existing = await strapi.db.query('api::noticia.noticia').findOne({
            where: { titulo: item.titulo }
          });

          if (!existing) {
            console.log(`[Bootstrap] Seeding news: ${item.titulo}`);
            await strapi.service('api::noticia.noticia').create({
              data: item
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
