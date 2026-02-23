"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
// Optimize sharp for low memory environments
sharp_1.default.concurrency(1);
sharp_1.default.cache(false);
// Geocode function
const geocodeAddress = async (endereco, bairro, cidade) => {
    if (!endereco || !endereco.trim())
        return null;
    const bairroStr = typeof bairro === 'object' ? bairro === null || bairro === void 0 ? void 0 : bairro.bairro : (typeof bairro === 'string' ? bairro : '');
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
            const response = await axios_1.default.get('https://nominatim.openstreetmap.org/search', {
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
        }
        catch (error) {
            console.error(`[Geocoding] Error with variation "${fullAddress}": ${error.message}`);
        }
    }
    return null;
};
exports.default = {
    register({ strapi }) {
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
    bootstrap({ strapi }) {
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
                        await strapi.documents('api::noticia.noticia').create({
                            data: item,
                            status: 'published'
                        });
                    }
                }
            }
            catch (error) {
                console.error('[Bootstrap] Error seeding news:', error);
            }
        };
        seedNews();
        // ----------------------------------------------------
        // HOTFIX: Relink broken properties to admin user
        // ----------------------------------------------------
        const fixUnlinkedProperties = async () => {
            try {
                const users = await strapi.db.query('plugin::users-permissions.user').findMany();
                if (users.length === 0)
                    return;
                const adminUser = users[0]; // Gets the first user (usually the creator/admin)
                const unlinkedProperties = await strapi.db.query('api::imovel.imovel').findMany({
                    where: { usuario: null }
                });
                if (unlinkedProperties.length > 0) {
                    console.log(`[HOTFIX] Linking ${unlinkedProperties.length} orphaned properties to user ID ${adminUser.id}`);
                    for (const p of unlinkedProperties) {
                        await strapi.db.query('api::imovel.imovel').update({
                            where: { id: p.id },
                            data: { usuario: adminUser.id }
                        });
                    }
                    console.log('[HOTFIX] Orphaned properties successfully linked.');
                }
            }
            catch (error) {
                console.error('[HOTFIX] Error linking properties:', error);
            }
        };
        fixUnlinkedProperties();
    },
};
