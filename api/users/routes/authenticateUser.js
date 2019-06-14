'use strict';

const Boom = require('boom');
const User = require('../model/User');
const authenticateUserSchema = require('../schemas/authenticateUser');
const verifyCredentials = require('../util/userFunctions').verifyCerdentials;
const createToken = require('../util/token');
const jwt = require('jsonwebtoken');
const aguid = require('aguid');
const secret = require('../../../config');

module.exports = {
    method: 'POST',
    path: '/api/users/authenticate',
    config: {
        pre: [
            { method: verifyCredentials, assign: 'user' }
        ],
        handler: (request, h) => {
            let user = request.pre.user;
            var session = {
                valid: true,
                id: aguid(),
                userId: user._id,
                username: user.username,
                scope: user.admin ? 'admin' : '',
                exp: new Date().getTime() + 30 * 60 * 1000
              }
            request.yar.set(session.id, JSON.stringify(session));
            let token = jwt.sign(session, secret, {algorithm: 'HS256'});
            return h.response({ id_token: token, username: user.username }).code(201);
        },  
        validate: {
            payload: authenticateUserSchema
        }
    }
};