'use strict';
const Service = require('egg').Service;

class OrderService extends Service {
  // 生成订单
  async addOrder() {
    await this.app.mysql.query('update commodity set repertory = repertory - 1 where id = 1');
  }
}

module.exports = OrderService;
