'use strict';
const Service = require('egg').Service;

class UserService extends Service {

  async checkIfUserNotExistThenInsert({ openId, phone, userName } = {}) {
    const exist = await this.exist(openId);
    if (!exist) {
      this.insert({ openId, phone, userName });
    }
  }

  async exist(openId) {
    const user = await this.app.mysql.get('users', { open_id: openId });
    return user !== null;
  }

  async insert({ openId, phone, userName } = {}) {
    const result = await this.app.mysql.insert('users', {
      open_id: openId,
      user_name: userName,
      phone,
    });
    return result;
  }
}

module.exports = UserService;
