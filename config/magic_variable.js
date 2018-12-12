'use strict';
const BASE_PREFFIX = '/xcx/api/v1';

module.exports = {
  // 无需验证的接口
  ignoreRouters: [
    `${BASE_PREFFIX}/auth/login`,
    `${BASE_PREFFIX}/att/uptoken`,
    `${BASE_PREFFIX}/sys/version`,
  ],
  // 需要拦截的接口
  matchAops: [
    `${BASE_PREFFIX}/test`,
  ],
  // 系统基路由
  baseUrl: BASE_PREFFIX,
};
