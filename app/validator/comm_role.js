'use strict';

// 通用的请求参数验证规则
module.exports = app => {
  const joi = app.Joi;
  return {
    att: joi.object().keys({
      att_key: joi.string().required().max(36),
      file_type: joi.number().required().integer().min(0).max(4), // eslint-disable-line newline-per-chained-call
      duration: joi.number().allow(null).optional(),
    }),
    pageable: joi.object().keys({
      skip: joi.number().required().integer().min(0), // eslint-disable-line newline-per-chained-call
      take: joi.number().required().integer().min(1), // eslint-disable-line newline-per-chained-call
    }),
  };
};
