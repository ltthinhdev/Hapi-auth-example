'use strict';

const Boom = require('boom');
const User = require('../model/User');
const bcrypt = require('bcrypt');

async function verifyUniqueUser(request, h) {
    let user = await User.findOne({
        $or: [
            { email: request.payload.email },
            { username: request.payload.username }
        ]
    });

    if(user) {
        if(user.username === request.payload.username) {
            throw Boom.badRequest('Username taken');
        }
        if(user.email === request.payload.email) {
            throw Boom.badRequest('Email taken');
        }
    }
    return h.response(request.payload).code(201);
};

async function verifyCerdentials(request, h) {
    const password = request.payload.password;

    let user = await User.findOne({
        $or: [
            { email: request.payload.email },
            { username: request.payload.username }
        ]
    })

    if(user) {
        let isValid = await bcrypt.compareSync(password, user.password);
        if(isValid) {
            return h.response(user).code(201);
        }
        throw Boom.badRequest('Incorrect password!');
    }

    throw Boom.badRequest('Uncorrect username or email!');
}

module.exports = {
    verifyUniqueUser,
    verifyCerdentials
};