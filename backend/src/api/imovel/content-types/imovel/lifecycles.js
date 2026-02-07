'use strict';

/**
 * Lifecycle hooks for imovel
 * Automatically geocodes address to lat/long when saving
 */

const geocodeAddress = async (endereco, bairro, cidade) => {
  if (!endereco || !endereco.trim()) return null;
  
  try {
    // Build full address string
    const bairroStr = typeof bairro === 'object' ? bairro?.bairro : bairro;
    const fullAddress = `${endereco}, ${bairroStr || ''}, ${cidade || 'Campo Grande'}, MS, Brasil`;
    
    // Use OpenStreetMap Nominatim API (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`,
      { 
        headers: { 
          'User-Agent': 'AlugueNaHora-Strapi/1.0' 
        } 
      }
    );
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
    }
  } catch (error) {
    strapi.log.error('Geocoding error:', error);
  }
  
  return null;
};

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    
    // Only geocode if endereco is provided and lat/long are not set
    if (data.endereco && (!data.latitude || !data.longitude)) {
      const coords = await geocodeAddress(data.endereco, data.bairro, data.cidade);
      if (coords) {
        data.latitude = coords.latitude;
        data.longitude = coords.longitude;
        strapi.log.info(`Geocoded address: ${data.endereco} -> ${coords.latitude}, ${coords.longitude}`);
      }
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;
    
    // Only geocode if endereco changed and is provided
    if (data.endereco) {
      // Get current entry to check if address changed
      const currentEntry = await strapi.documents('api::imovel.imovel').findOne({
        documentId: where.documentId
      });
      
      // Geocode if address changed or coordinates are missing
      if (!currentEntry || 
          currentEntry.endereco !== data.endereco || 
          !currentEntry.latitude || 
          !currentEntry.longitude) {
        const coords = await geocodeAddress(
          data.endereco, 
          data.bairro || currentEntry?.bairro, 
          data.cidade || currentEntry?.cidade
        );
        if (coords) {
          data.latitude = coords.latitude;
          data.longitude = coords.longitude;
          strapi.log.info(`Geocoded address: ${data.endereco} -> ${coords.latitude}, ${coords.longitude}`);
        }
      }
    }
  }
};
