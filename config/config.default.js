'use strict';
const { baseApi, includeApi, excludeApi } = require('./config.router');

module.exports = appInfo => {
  return {
    site: {
      base: baseApi,
      secret: 'I#will#fuck#YOU',
      grant_type: 'authorization_code',
      appid: 'wx258169370c69ee4c',
      wxsecret: 'd9fcf46566519e01935a8c53225bb352',
      wxlogin: 'https://api.weixin.qq.com/sns/jscode2session',
    },
    includeApi,
    excludeApi,
    qiniu: {
      ak: 'w4cDcDH4OybaTsNVVp02bxdVWpHvVGCnTK2iWmbp', // Access Key
      sk: 'vHcoxx_SMTmWhWQXsJjY4Zbk7Vcux4xrMW602Im2', // Secret Key
      zone: 'Zone_z2', // Zone_z0 华东, Zone_z1 华北, Zone_z2 华南, Zone_na0 北美
      bucket: 'camplus-plus',
    },
    keys: appInfo.name + '_1541055266564_8039', // use for cookie sign key, should change to your own and keep security
    middleware: [ 'errorHandler', 'auth', 'aop' ], // add your config here
    aop: {
      enable: false,
      match: [ '/test', '/fuck' ],
    },
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'dig?fuck',
        database: 'campus-plus',
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
};
