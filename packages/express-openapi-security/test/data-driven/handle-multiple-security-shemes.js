var expect = require('chai').expect;

module.exports = {
  path: '/',
  headers: null,

  securityDefinitions: {
    keyScheme: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header'
    },
    passwordScheme: {
      type: 'basic'
    },

    keyScheme1: {
      type: 'apiKey',
      name: 'api_key1',
      in: 'header'
    },
    passwordScheme1: {
      type: 'basic'
    }

  },

  securityHandlers: {
    keyScheme: function(req, scopes, securityDefinition, cb) {
      cb(null, false);
    },
    passwordScheme: function(req, scopes, securityDefinition, cb) {
      cb(null, false);
    },

    keyScheme1: function(req, scopes, securityDefinition, cb) {
      req.user = {name: 'fred'};
      cb(null, true);
    },
    passwordScheme1: function(req, scopes, securityDefinition, cb) {
      cb(null, true);
    }

  },

  operationSecurity: [
    {
      keyScheme: ['write'],
      passwordScheme: ['write']
    },
    {
      keyScheme1: ['write'],
      passwordScheme1: ['write']
    }
  ],

  expectationMiddleware: function(req, res, next) {
    expect(req.user).to.be.ok;
    next();
  },

  expectedStatusCode: 200,
  expectedResponse: '"woo"',

};
