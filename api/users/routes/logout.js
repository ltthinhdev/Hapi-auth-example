'use strict';
const jwt = require('jsonwebtoken');

module.exports = {
    method: 'GET',
    path: '/api/users/logout',
    config: {
        handler: async (request, h) => {
            console.log(request);
            // let decoded = jwt.decode(request.auth.credentials.id);
            return h.response(request).code(201);
        },
        auth: {
            strategy: 'jwt'
        }
    }
}