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

  // 创建活动
  router.post(`${baseUrl}/activity`, controller.activity.addActivity);

  // 获取活动
  router.get(`${baseUrl}/activities`, controller.activity.getActivities);

  // 获取活动详情
  router.get(`${baseUrl}/activity/:id`, controller.activity.getActivity);

};
