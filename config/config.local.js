'use strict';
const variable = require('./magic_variable');

module.exports = {
  middleware: [ 'errorHandler', 'auth', 'aop' ], // add your config here
  auth: {
    ignore: variable.ignoreRouters,
  },
  aop: {
    enable: false,
    match: variable.matchAops,
  },
  mysql: {
    client: {
      host: 'localhost',
      port: '33060',
      user: 'egg_dev',
      password: 'egg123456',
      database: 'egg',
    },
  },
  security: {
    csrf: false,
  },
  joi: {
    options: {},
    locale: {
      'zh-cn': {},
    },
    throw: true, // when capture exception throw immediately
    // throwHandle: (error) => { return error; }, // when throw is true the error message format
    // errorHandle: (error) => { return error; }, // when throw is false the error message format
    // resultHandle: (result) => { return result; } // fromat result
  },
};
