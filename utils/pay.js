const config = require('config.js').config;
const common = require('common.js').common;
const app = getApp();
/*
  that:页面对象,
  _orderid：订单号,
  _sn, 
  _orderstatus（成功后的订单状态）,
  _callback：支付后的回掉函数
  _backPath：支付跳转路径（成功/失败）,
  _ifJump:支付结束后是否跳转,
*/
function pay(that, _orderid, _sn, _orderstatus, _backPath, _ifJump, _callback) {
  var orderid = _orderid;
  var sn = _sn;
  var orderstatus = _orderstatus;
  var ifJump = _ifJump;
  var backPath = _backPath;
  var callback = _callback||null;
  wx.request({
    url: config.payment,
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      user_token: app.globalData.user_token,
      access_token: app.globalData.access_token,
      openid: app.globalData.openid,
      orderid: orderid,
      appid: app.globalData.appid
    },
    success: function (res) {
      console.log(res.data.package)
      if (res.data.data.package) {
        wx.requestPayment({
          'package': res.data.data.package,
          'timeStamp': res.data.data.timeStamp,
          'nonceStr': res.data.data.nonceStr,
          'signType': res.data.data.signType,
          'paySign': res.data.data.paySign,
          success: function (res) {
            wx.request({
              url: config.check_weixin_order,
              method: 'POST',
              data: {
                sn: sn,
                appid: app.globalData.appid
              },
              success: function (res) {
                if (callback) callback()
                if (res.data.code == 1) {
                  if (ifJump){
                    wx.navigateTo({
                      url: backPath + '?orderstatus=' + orderstatus + '&id=' + orderid,
                    })
                  }
                }
              }
            })
          },
          fail:function(res){
            if (callback) callback()
            if (ifJump){
              wx.navigateTo({
                url: backPath + '?orderstatus=' + 2 + '&id=' + orderid,
              })
            } else {
              common.tip('支付已取消', 'none');
            }
          }
        })
      } else if (res.data.data.sn) {
        wx.showModal({
          title: '提示信息',
          content: '此商品已支付成功，返回购物车继续购买',
          showCancel: true,
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/shoppingcart/shoppingcart',
              })
            }
          },
        })
      }
    },
  })
}
module.exports = {
  pay: pay,
}