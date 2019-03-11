'use strict';

const { app } = require('egg-mock/bootstrap');
const xml2js = require('xml2js');

describe('test/app/controller/home.test.js', () => {

  it('should get nonce_str', () => {
    const ctx = app.mockContext();
    console.log(`nonce_str：${ctx.helper.getNonceStr(32)}`);
  });

  it('should get sign', () => {
    const ctx = app.mockContext();
    const wxParams = ctx.app.config.wx;
    const params = {
      appid: wxParams.appid,
      mch_id: wxParams.mch_id,
      body: '拼团抢购-纸巾',
      out_trade_no: '20190303180230',
      total_fee: 1000,
      spbill_create_ip: wxParams.spbill_create_ip,
      trade_type: wxParams.trade_type,
      notifyUrl: wxParams.notifyUrl,
      businessKey: wxParams.businessKey,
      notify_url: wxParams.notifyUrl,
    };
    console.log(`sign：${ctx.helper.getSign(params, wxParams.businessKey)}`);
  });

  it('should req wxpay', async () => {
    const ctx = app.mockContext();
    const wx = ctx.app.config.wx;
    const nonce_str = ctx.helper.getNonceStr();
    const params = {
      appid: wx.appid,
      mch_id: wx.mch_id,
      body: '拼团抢购-纸巾',
      out_trade_no: '20190303180230',
      total_fee: 1000,
      spbill_create_ip: wx.spbill_create_ip,
      trade_type: wx.trade_type,
      notifyUrl: wx.notifyUrl,
      businessKey: wx.businessKey,
      notify_url: wx.notifyUrl,
      nonce_str,
    };
    const sign = ctx.helper.getSign(params, wx.businessKey);
    const formData = `<xml>
    <appid>${wx.appid}</appid>
    <body>拼团抢购-纸巾</body>
    <mch_id>${wx.mch_id}</mch_id>
    <nonce_str>${nonce_str}</nonce_str>
    <notify_url>${wx.notifyUrl}</notify_url>
    <out_trade_no>20190303180230</out_trade_no>
    <total_fee>1000</total_fee>
    <spbill_create_ip>${wx.spbill_create_ip}</spbill_create_ip>
    <sign>${sign}</sign>
    <trade_type>JSAPI</trade_type>
    </xml>`;
    const resultData = await ctx.curl(wx.wxpay, {
      method: 'POST',
      content: formData,
      headers: {
        'content-type': 'text/html',
      },
    });
    // xml转json格式
    xml2js.parseString(resultData.data, (err, json) => {
      if (err) {
        new Error('解析xml报错');
      } else {
        const result = ctx.helper.formMessage(json.xml); // 转换成正常的json 数据
        console.log(result); // 打印出返回的结果
      }
    });
  });

});
