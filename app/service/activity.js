'use strict';
const Service = require('egg').Service;


class ActivityService extends Service {
  async get(id) {
    const sql = 'SELECT u.user_name, a.*  FROM activities a LEFT JOIN users u ON u.open_id = a.create_by WHERE a.id = ?';
    const result = await this.app.mysql.query(sql, [ id ]);
    if (result.length) {
      delete result[0].create_by;
      return result[0];
    }
    return null;
  }

  async select({ offset = 0, limit = 10 } = {}) {
    offset = Number(offset) || 0;
    limit = Number(limit) || 0;
    const sql = `SELECT u.user_name, a.*  FROM activities a LEFT JOIN users u ON u.open_id = a.create_by ORDER BY created_at DESC LIMIT ${offset}, ${limit}`;
    const result = await this.app.mysql.query(sql);
    // const result = await this.app.mysql.select('activities', {
    //   orders: [[ 'created_at', 'desc' ]], // 排序方式
    //   limit, // 返回数据量
    //   offset, // 数据偏移量
    // });
    return result;
  }

  async insert({ title, description, type, richtext_description, start_date, end_date, image_key, create_by } = {}) {
    const result = await this.app.mysql.insert('activities', {
      title,
      description,
      richtext_description,
      start_date,
      end_date,
      image_key,
      type,
      create_by,
      created_at: new Date(),
    });
    return result;
  }
}

module
    .exports = ActivityService;
