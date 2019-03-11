'use strict';
const { baseUrl } = require('./magic_variable');

module.exports = appInfo => {
  return {
    site: {
      base: baseUrl,
      secret: 'wx!xcx#api@',
    },
    // 调用微信接口需要的参数
    wx: {
      grant_type: 'authorization_code', // 登录验证参数
      appid: 'wx258169370c69ee4c', // 小程序ID
      wxsecret: 'd9fcf46566519e01935a8c53225bb352', // 小程序的 app secret
      wxlogin: 'https://api.weixin.qq.com/sns/jscode2session', // 登录验证接口地址
      mch_id: '1484553462', // 商户号
      wxpay: 'https://api.mch.weixin.qq.com/pay/unifiedorder', // 支付接口地址
      businessKey: 'aass5641581259865352478953214589', // 商家key
      notifyUrl: 'https://5531708a.ngrok.io/wxpay/notify', // 通知地址
      trade_type: 'JSAPI', // 交易类型
      spbill_create_ip: '120.239.196.73', // 调用支付接口的ip
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
