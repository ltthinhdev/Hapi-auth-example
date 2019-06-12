'use strict';
const User = require('../model/User');
const Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/api/users',
    config: {
        handler: async (request, h) => {
            // return await new Promise((resolve, reject) => { 
            //     User.find()
            //     .select('-password -__v')
            //     .exec((err, users) => {
            //         if(err) {
            //             console.log('THINH', err)
            //             throw Boom.badRequest(err);
            //         }
            //         if(!users.length) {
            //             throw Boom.badRequest('No users found!');
            //         }
            //         resolve(h.response(users).code(201))
            //     })
            // });
            console.log('ZZZZZZZZZZZ');
            let users = await User.find().select('-password -__v');
            return h.response(users).code(201);
        },
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        }
    }
}