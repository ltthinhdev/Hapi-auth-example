'use strict';
const jwt = require('jsonwebtoken');

module.exports = {
    method: 'GET',
    path: '/api/users/logout',
    config: {
        handler: async (request, h) => {
            console.log(request);
            let session = await request.yar.get(request.auth.credentials.id);
            let sessionJson = JSON.parse(session);
            sessionJson.valid = false;
            sessionJson.exp = new Date().getTime();
            request.yar.set(sessionJson.id, JSON.stringify(sessionJson));
            return h.response('Logged out!').code(201);
        },
        auth: {
            strategy: 'jwt'
        }
    }
}