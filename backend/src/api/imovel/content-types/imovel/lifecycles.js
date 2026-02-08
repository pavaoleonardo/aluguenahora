'use strict';

const axios = require('axios');

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
    
    strapi.log.info(`Geocoding address: ${fullAddress}`);
    
    // Use OpenStreetMap Nominatim API (free, no API key required)
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          format: 'json',
          q: fullAddress,
          limit: 1
        },
        headers: { 
          'User-Agent': 'AlugueNaHora-Strapi/1.0' 
        },
        timeout: 10000
      }
    );
    
    const data = response.data;
    
    if (data && data.length > 0) {
      strapi.log.info(`Geocoded successfully: lat=${data[0].lat}, lon=${data[0].lon}`);
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
    } else {
      strapi.log.warn(`No geocoding results for: ${fullAddress}`);
    }
  } catch (error) {
    strapi.log.error(`Geocoding error: ${error.message}`);
  }
  
  return null;
};

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    
    strapi.log.info(`beforeCreate triggered. endereco: ${data.endereco}`);
    
    // Only geocode if endereco is provided and lat/long are not set
    if (data.endereco && (!data.latitude || !data.longitude)) {
      const coords = await geocodeAddress(data.endereco, data.bairro, data.cidade);
      if (coords) {
        data.latitude = coords.latitude;
        data.longitude = coords.longitude;
      }
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;
    
    strapi.log.info(`beforeUpdate triggered. endereco: ${data.endereco}, documentId: ${where?.documentId}`);
    
    // Only geocode if endereco is provided
    if (data.endereco !== undefined) {
      try {
        // Get current entry to check if address changed
        let currentEntry = null;
        if (where?.documentId) {
          currentEntry = await strapi.documents('api::imovel.imovel').findOne({
            documentId: where.documentId
          });
        }
        
        // Geocode if address changed or coordinates are missing
        const addressChanged = !currentEntry || currentEntry.endereco !== data.endereco;
        const coordsMissing = !data.latitude && !data.longitude && (!currentEntry?.latitude || !currentEntry?.longitude);
        
        if (addressChanged || coordsMissing) {
          const coords = await geocodeAddress(
            data.endereco, 
            data.bairro || currentEntry?.bairro, 
            data.cidade || currentEntry?.cidade
          );
          if (coords) {
            data.latitude = coords.latitude;
            data.longitude = coords.longitude;
          }
        }
      } catch (err) {
        strapi.log.error(`Error in beforeUpdate: ${err.message}`);
      }
    }
  }
};
