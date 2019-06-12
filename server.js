'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const secret = require('./config');
const CatboxRedis = require('@hapi/catbox-redis');
const Yar = require('@hapi/yar');

const server = new Hapi.Server({
  port: 3000,
  cache: [
    {
      name: 'my_cache',
      provider: {
        constructor: CatboxRedis,
        options: {
          partition: 'my_cached_data',
          host: '127.0.0.1',
          port: 6379,
          database: 0,
          tls: {}
        }
      }
    }
  ],
  routes:
  {
    cors: {
      origin: [
        'http://localhost:3001',
        'http://localhost',
      ],
      additionalHeaders: [
        'Access-Control-Allow-Origin',
        'Access-Control-Request-Method',
        'Allow-Origin',
        'Origin',
      ]
    }
  }
});

const dbUrl = 'mongodb+srv://root:abcd1234@tanthinh-gsp78.mongodb.net/test?retryWrites=true&w=majority';

const validate = async (decoded, request) => {

  let session = await request.yar.get(decoded.id);
  let sessionJson = JSON.parse(session);

  if (sessionJson) {
    if (sessionJson.valid) {
      return { isValid: true };
    }
  }

  return { isValid: false };
}

const yarOpts = {
  maxCookieSize: 0,
  cache: {
    cache: 'my_cache'
  },
  cookieOptions: {
    password: 'the-password-must-be-at-least-32-characters-long',
    isSecure: true
  }
};

const init = async () => {

  await server.register(require('hapi-auth-jwt2'));
  await server.register({
    plugin: Yar,
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

  mongoose.connect(dbUrl, { useNewUrlParser: true })

  console.log('Running!');

};

init();