'use strict';
const Controller = require('egg').Controller;
const qiniu = require('qiniu');

class Upload extends Controller {
  uuid() {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    const uuid = s.join('');
    return uuid;
  }

  async getUpToken() {
    const config = this.config;
    const uuid = this.uuid();
    const mac = new qiniu.auth.digest.Mac(config.qiniu.ak, config.qiniu.sk);
    const options = {
      scope: `${config.qiniu.bucket}:${uuid}`,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    this.ctx.body = {
      code: 0,
      data: uploadToken,
      key: uuid,
    };
  }
}

module.exports = Upload;
