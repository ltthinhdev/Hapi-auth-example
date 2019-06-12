'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const secret = require('./config');

const server = new Hapi.Server({ port: 3000 });

const dbUrl = 'mongodb+srv://root:abcd1234@tanthinh-gsp78.mongodb.net/test?retryWrites=true&w=majority';

const validate = (decoded, request) => {
    console.log('DECODED', decoded)
    let session = request.yar.get(decoded.id);

    console.log('SESSION', request.yar._store)
    let sessionJson = JSON.parse(session);

    console.log('SESSIONJSON', sessionJson)

    if (sessionJson) {
        if(sessionJson.valid) {
            return { isValid: true };
        }
    }
    
    return { isValid: false };
}

const yarOpts = {
    storeBlank: false,
    cookieOptions: {
        password: 'the-password-must-be-at-least-32-characters-long',
        isSecure: true
    }
};

const init = async () => {

    await server.register(require('hapi-auth-jwt2'));
    await server.register({
        plugin: require('@hapi/yar'),
        options: yarOpts
    });
    
    server.auth.strategy('jwt', 'jwt', {
        key: secret,
        validate: validate,
        verifyOptions: { algorithms: ['HS256'] }
    });

    glob.sync('api/**/routes/*.js', {
        root: __dirname
    }).forEach(file => {
        const route = require(path.join(__dirname, file));
        server.route(route);
    });

    await server.start()

    mongoose.connect(dbUrl, {useNewUrlParser: true})

    console.log('Running!');

};

init();