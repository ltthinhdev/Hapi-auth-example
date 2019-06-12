'use strict';
const User = require('../model/User');
const Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/api/users',
    config: {
        handler: async (request, h) => {
            return await new Promise((resolve, reject) => { 
                User.find()
                .select('-password -__v')
                .exec((err, users) => {
                    if(err) {
                        throw Boom.badRequest(err);
                    }
                    if(!users.length) {
                        throw Boom.badRequest('No users found!');
                    }
                    resolve(h.response(users).code(201))
                })
            });
        },
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        }
    }
}