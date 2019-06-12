'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../../../config');

function createToken(user) {
    let scopes;

    if(user.admin) {
        scopes = 'admin';
    }

    return jwt.sign({ id: user._id, username: user.username, scopes: scopes}, secret, {algorithm: 'HS256'});
}

module.exports = createToken;