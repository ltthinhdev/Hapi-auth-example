'use strict';

const bcrypt = require('bcrypt');
const Boom = require('boom');
const User = require('../model/User');
const createUserSchema = require('../schemas/createUser');
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser;
const createToken = require('../util/token');

async function hashPasswordAsync(password, cb) {
    let salt = await bcrypt.genSaltSync();

    let hash = await bcrypt.hashSync(password, salt)

    return hash;
}

module.exports = {
    method: 'POST',
    path: '/api/users',
    config: {
        pre: [
            { method: verifyUniqueUser }
        ],
        handler: async (request, h) => {
            let user = new User();
            user.email = request.payload.email;
            user.username = request.payload.username;
            user.admin = false;
            user.password = await hashPasswordAsync(request.payload.password);
            
            let createdUser = await user.save();
            return h.response({ id_token: createToken(createdUser) }).code(201)
        },
        validate: {
            payload: createUserSchema
        }
    }
}