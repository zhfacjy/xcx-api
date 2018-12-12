'use strict';
const jwt = require('jsonwebtoken');

// 包装验证令牌异步函数
const jwtVerify = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = () => {
  return async (ctx, next) => {
    // let tokenExpWarning = false;
    const config = ctx.app.config.site;
    const headers = ctx.request.header || {};
    const query = ctx.query || {};
    const jwtToken = headers[ 'x-access-token' ] || query.token;
    try {
      ctx.state.user = await jwtVerify(jwtToken, config.secret);
    } catch (e) {
      // token 验证失败
      ctx.throw(403, '身份验证失败，可能 token 已过期');
    }
    await next();
    /* if (tokenExpWarning && ctx.body) {
      ctx.body.warning = {
        token_will_exp: tokenExpWarning,
      };
    } */
  };
};
