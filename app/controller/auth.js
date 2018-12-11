'use strict';
const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class Auth extends Controller {
  // 包装生成令牌异步函数
  jwtSign(data) {
    return new Promise((resolve, reject) => {
      jwt.sign(data, this.config.site.secret, {
        expiresIn: 60 * 60 * 24 * 30, // 测试阶段，token 有效时间 30 天
      }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

  async login() {
    const joi = this.app.Joi;
    const config = this.config.site;
    this.ctx.validate(joi.object().keys({
      code: joi.string().required().max(2000),
    }), this.ctx.request.query);
    const result = await this.ctx.curl(`${config.wxlogin}?grant_type=${config.grant_type}&appid=${config.appid}&secret=${config.wxsecret}&js_code=${this.ctx.request.query.code}`, { dataType: 'json' });
    const data = result.data;
    // 生成token
    if (data.openid) {
      this.ctx.service.user.checkIfUserNotExistThenInsert({ openId: data.openid });
      const token = await this.jwtSign({ openid: data.openid });
      this.ctx.body = {
        code: 0,
        data: { token },
      };
    } else {
      this.ctx.body = {
        code: 500,
        message: '访问微信登陆验证失败',
        data,
      };
    }
  }
}

module.exports = Auth;
