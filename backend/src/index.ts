import type { Core } from '@strapi/strapi';
import axios from 'axios';

// Geocode function
const geocodeAddress = async (endereco: string, bairro: any, cidade: string): Promise<{ latitude: number; longitude: number } | null> => {
  if (!endereco || !endereco.trim()) return null;
  
  try {
    const bairroStr = typeof bairro === 'object' ? bairro?.bairro : bairro;
    const fullAddress = `${endereco}, ${bairroStr || ''}, ${cidade || 'Campo Grande'}, MS, Brasil`;
    
    console.log(`[Geocoding] Address: ${fullAddress}`);
    
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        format: 'json',
        q: fullAddress,
        limit: 1
      },
      headers: { 
        'User-Agent': 'AlugueNaHora-Strapi/1.0' 
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
    } else {
      console.log(`[Geocoding] No results for: ${fullAddress}`);
    }
  } catch (error: any) {
    console.error(`[Geocoding] Error: ${error.message}`);
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

      // Check if we have an address and no coordinates
      if (data?.endereco && (!data.latitude || !data.longitude)) {
        console.log(`[Middleware] Geocoding for action: ${context.action}`);
        
        const coords = await geocodeAddress(
          data.endereco,
          data.bairro,
          data.cidade || 'Campo Grande'
        );
        
        if (coords) {
          data.latitude = coords.latitude;
          data.longitude = coords.longitude;
          console.log(`[Middleware] Coordinates set: ${coords.latitude}, ${coords.longitude}`);
        }
      }

      return next();
    });
  },

  bootstrap({ strapi }: { strapi: Core.Strapi }) {},
};
