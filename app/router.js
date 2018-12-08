'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, config } = app;

  // wx登陆验证
  router.get(`${config.site.base}/wx/onlogin`, controller.auth.onlogin);

  // 附件上传
  router.get(`${config.site.base}/uptoken`, controller.upload.getUpToken);

};
