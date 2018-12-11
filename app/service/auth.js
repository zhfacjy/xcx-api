'use strict';
const Service = require('egg').Service;

class AuthService extends Service {
  async find(openId) {
    const user = await this.app.mysql.get('users', { open_id: openId });
    return { user };
  }

  async exist(openId) {
    const user = await this.app.mysql.get('users', { open_id: openId });
    return user !== null;
  }
}

module.exports = AuthService;
