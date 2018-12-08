'use strict';

module.exports = () => {
  return async (ctx, next) => {
    await next();
    console.log('now in aop');
    if (ctx.body && ctx.body.code === 0) ; // do something
  };
};
