'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
      if (ctx.status === 404 && !ctx.body) {
        ctx.body = {
          code: 404,
          message: 'Not Found',
        };
      }
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, this);
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod' ?
        'Internal Server Error' :
        err.message;
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
        code: status,
        // error: error
        message: error,
      };
      if (status === 422) {
        ctx.body.detail = err.errors;
        // ctx.body.data = err.errors
      }
      ctx.status = 200;
    }
  };
};
