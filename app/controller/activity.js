'use strict';
const Controller = require('egg').Controller;

class Activity extends Controller {
  async getActivity() {
    const result = await this.ctx.service.activity.get(this.ctx.params.id);
    this.ctx.body = {
      code: 0,
      data: result,
    };
  }

  async getActivities() {
    const offset = this.ctx.request.query.offset || 0;
    const limit = this.ctx.request.query.limit || 10;
    const result = await this.ctx.service.activity.select({ offset, limit });
    this.ctx.body = {
      code: 0,
      data: result,
    };
  }

  async addActivity() {
    const result = await this.ctx.service.activity.insert(this.ctx.request.body);
    this.ctx.body = {
      code: 0,
      data: result,
    };
  }
}

module.exports = Activity;
