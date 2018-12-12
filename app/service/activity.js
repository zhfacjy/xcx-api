'use strict';
const Service = require('egg').Service;


class ActivityService extends Service {
  async get(id) {
    const result = await this.app.mysql.get('activities', { id });
    return result;
  }

  async select({ limit = 10, offset = 0 } = {}) {
    const result = await this.app.mysql.select('activities', {
      orders: [ ['created_at', 'desc'] ], // 排序方式
      limit, // 返回数据量
      offset, // 数据偏移量
    });
    return result;
  }

  async insert({ title, description, type, richtext_description, start_date, end_date, image_key } = {}) {
    const result = await this.app.mysql.insert('activities', {
      title,
      description,
      richtext_description,
      start_date,
      end_date,
      image_key,
      type,
      created_at: new Date(),
    });
    return result;
  }
}

module
    .exports = ActivityService;
