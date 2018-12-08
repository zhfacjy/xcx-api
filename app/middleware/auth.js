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
    if (ctx.path === `${config.base}/wx/onlogin`) {
      // 如果是登录请求就不做身份验证, 留给 login ctrl 去处理
    } else if (ctx.path.startsWith(`${config.base}/sys/version/`)) {
      // 如果是获取版本信息
    } else if (ctx.path.startsWith(config.base)) {
      // 正常的api访问需要做身份验证
      const headers = ctx.request.header;
      if (headers && headers['x-access-token']) {
        // token 在 header 中
        try {
          ctx.state.user = await jwtVerify(headers['x-access-token'], config.secret);
          // 通知前端token快过期
          /* if (ctx.path !== `${config.base}/token/renew`) {
            const iat = ctx.state.user.iat;
            const exp = ctx.state.user.exp;
            const warnAt = (exp - iat) * 0.7 + iat;
            const now = Math.round(new Date() / 1000);
            if (warnAt < now) {
              tokenExpWarning = true;
            }
          } */
        } catch (e) {
          // token 验证失败
          ctx.throw(403, '身份验证失败，可能 x-access-token 已过期');
        }
      } else if (ctx.query && ctx.query.token) {
        // token 在 query 中
        try {
          ctx.state.user = await jwtVerify(ctx.query.token);
        } catch (e) {
          // token 验证失败
          ctx.throw(403, '身份验证失败，可能 token 已过期');
        }
      } else {
        // 没有带 x-access-token 头部信息
        ctx.throw(403, '身份认证失败，没有提供 token 身份信息');
      }
    } else {
      // 访问地址没有以 config.site.base 开头
      ctx.throw(404, '未匹配本系统 api 基地址');
    }
    await next();
    /* if (tokenExpWarning && ctx.body) {
      ctx.body.warning = {
        token_will_exp: tokenExpWarning,
      };
    } */
  };
};
