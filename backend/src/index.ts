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

  bootstrap({ strapi }: { strapi: Core.Strapi }) {},
};
