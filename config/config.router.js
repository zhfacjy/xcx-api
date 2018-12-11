'use strict';
const BASE_PREFFIX = '/xcx/api/v1';
// 路由表
const includeRouterConfig = {
  auth: {
    login: `${BASE_PREFFIX}/auth/login`,
  },
  att: {
    uptoken: `${BASE_PREFFIX}/att/uptoken`,
  },
  sys: {
    version: `${BASE_PREFFIX}/sys/version`,
  },
};
// 不需要鉴权的api
const excludeRouterConfig = [
  includeRouterConfig.auth.login,
  includeRouterConfig.sys.version,
];

module.exports = {
  baseApi: BASE_PREFFIX,
  includeApi: includeRouterConfig,
  excludeApi: excludeRouterConfig,
};
