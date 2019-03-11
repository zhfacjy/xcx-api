'use strict';

const crypto = require('crypto');

module.exports = {
  // 获取微信支付需要的参数nonce_str
  getNonceStr() {
    const str = crypto.randomBytes(Math.ceil(32 / 2)).toString('hex').slice(0, 32);
    return str.toUpperCase();
  },
  // 获取微信支付需要的sign
  getSign(params, key) {
    const paramsArr = Object.keys(params);
    paramsArr.sort();
    const stringArr = [];
    paramsArr.map(key => {
      stringArr.push(key + '=' + params[key]);
      return null;
    });
    // 最后加上 商户Key
    const md5 = crypto.createHash('md5');
    stringArr.push('key=' + key);
    const string = stringArr.join('&');
    const str = md5.update(string).digest('hex').toString();
    return str.toUpperCase();
  },
  // 格式化xml
  formMessage(result) {
    const message = {};
    if (typeof result === 'object') {
      const keys = Object.keys(result);
      for (let i = 0; i < keys.length; i++) {
        const item = result[keys[i]];
        const key = keys[i];
        if (!(item instanceof Array) || item.length === 0) {
          continue;
        }
        if (item.length === 1) {
          const val = item[0];
          if (typeof val === 'object') {
            message[key] = this.formMessage(val);
          } else {
            message[key] = (val || '').trim();
          }
        } else {
          message[key] = [];
          for (let j = 0, k = item.length; j < k; j++) {
            message[key].push(this.formMessage(item[j]));
          }
        }
      }
    }
    return message;
  },
};
