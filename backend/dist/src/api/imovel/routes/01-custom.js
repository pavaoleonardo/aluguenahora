"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'POST',
            path: '/imoveis/upload-video',
            handler: 'api::imovel.imovel.uploadVideo',
            config: {
            // No auth: false means this route IS protected by default in Strapi v5
            },
        },
    ],
};
