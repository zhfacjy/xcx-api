'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, config } = app;
  const baseUrl = config.site.base;

  // wx登陆验证
  router.get(`${baseUrl}/auth/login`, controller.auth.login);

  // 附件上传
  router.get(`${baseUrl}/att/uptoken`, controller.upload.getUpToken);

};
