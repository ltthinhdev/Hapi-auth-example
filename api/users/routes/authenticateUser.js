'use strict';

const Boom = require('boom');
const User = require('../model/User');
const authenticateUserSchema = require('../schemas/authenticateUser');
const verifyCredentials = require('../util/userFunctions').verifyCerdentials;
const createToken = require('../util/token');
const jwt = require('jsonwebtoken');
const aguid = require('aguid');
const secret = require('../../../config');

const cookie_options = {
    ttl: 30 * 60 * 1000, //
    encoding: 'none',    // we already used JWT to encode
    isSecure: false,      // warm & fuzzy feelings
    isHttpOnly: true,    // prevent client alteration
    clearInvalid: false, // remove invalid cookies
    strictHeader: true,  // don't allow violations of RFC 6265
    path: '/'            // set the cookie for all routes
  }

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
            request.redis.set(session.id, JSON.stringify(session));
            let token = jwt.sign(session, secret, {algorithm: 'HS256'});
            return h.response({ id_token: token }).state("token", token).code(201);
        },  
        validate: {
            payload: authenticateUserSchema
        },
        config: {
            plugins: {
                yar: {}
            }
        }
    }
};