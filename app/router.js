'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, config } = app;

  // wx登陆验证
  router.get(config.includeApi.auth.login, controller.auth.login);

  // 附件上传
  router.get(config.includeApi.att.uptoken, controller.upload.getUpToken);

};
