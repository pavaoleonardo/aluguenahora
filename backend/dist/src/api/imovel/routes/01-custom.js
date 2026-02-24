"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/imoveis/fix',
            handler: 'api::imovel.imovel.fix',
            config: {
                auth: false,
            },
        },
    ],
};
