'use strict';
const Controller = require('egg').Controller;

class Order extends Controller {
  async addOrder() {
    await this.ctx.service.order.addOrder();
    this.ctx.body = {
      code: 0,
      data: null,
    };
  }
}

module.exports = Order;
