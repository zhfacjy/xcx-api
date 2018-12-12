'use strict';
const { baseUrl } = require('./magic_variable');

module.exports = appInfo => {
  return {
    site: {
      base: baseUrl,
      secret: 'I#will#fuck#YOU',
      grant_type: 'authorization_code',
      appid: 'wx258169370c69ee4c',
      wxsecret: 'd9fcf46566519e01935a8c53225bb352',
      wxlogin: 'https://api.weixin.qq.com/sns/jscode2session',
    },
    // includeApi,
    // excludeApi,
    qiniu: {
      ak: 'w4cDcDH4OybaTsNVVp02bxdVWpHvVGCnTK2iWmbp', // Access Key
      sk: 'vHcoxx_SMTmWhWQXsJjY4Zbk7Vcux4xrMW602Im2', // Secret Key
      zone: 'Zone_z2', // Zone_z0 华东, Zone_z1 华北, Zone_z2 华南, Zone_na0 北美
      bucket: 'camplus-plus',
    },
    keys: appInfo.name + '_1541055266564_8039', // use for cookie sign key, should change to your own and keep security
  };
};
