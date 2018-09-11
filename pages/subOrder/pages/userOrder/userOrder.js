// pages/mine/orderdetails/orderdetails.js
const order = require('../../../../utils/config').config.order
const payment = require('../../../../utils/config').config.payment
const paymentback = require('../../../../utils/config').config.check_weixin_order
var user_token = wx.getStorageSync('token').user_token
const common = require('../../../../utils/common').common
const payModule = require("../../../../utils/pay.js");
Page({
  data: {
    ifOnce: true,
    qcode: '',
    type_choose: true,
    content: 1,
    daytime: [
      '今天',
      '明天',
      '后天'
    ],
    dayIndex: 1,
    hourtime: [
      '10:00-12:00',
      '14:00-16:00',
      '18:00-20:00'
    ],
    dayIndex: 1,
    hourIndex: 0,
    qr_code_bg: false
  },
  qr_code: function () {
    var qcode = this.data.qcode
    this.setData({
      qcode: qcode,
      qr_code_bg: true
    })
  },
  qr_code_bg: function () {
    this.setData({
      qr_code_bg: false
    })
  },

  goto_buy: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  onLoad: function (options) {
    var id = options.id||''
    var codeMsg = options.codeMsg||'';
    var orderstatus = options.orderstatus||''
    this.setData({
      isshow: orderstatus,
      id: id,
      codeMsg: codeMsg
    })
    this.onLoadFunc()
  },
  onShow: function () {
    if (!this.data.ifOnce) {
      this.onLoadFunc();
    }
  },
  onLoadFunc: function () {
    var that = this
    wx.request({
      url: order,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        // user_token: wx.getStorageSync('token').user_token,
        user_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJRaW5nV2FKaWEgSldUIiwiaWF0IjoxNTM1MDExNzk0LCJleHAiOjMwNzAwMjM1ODgsImF1ZCI6IlFpbmdXYUppYSIsInN1YiI6IlFpbmdXYUppYSIsImRhdGEiOnsibWRfY3VzdG9tZXJfaWQiOjQ0LCJzdG9yZV9pZCI6N319.XF4QchYBBSJ4QdplPR4KbWNLAnhaiM9IfUEr9X2wzes",
        // access_token: wx.getStorageSync('token').access_token,
        access_token: 'cc65d83a11c97b3fdf7ba4431ef3d908',
        // sign: wx.getStorageSync('sign'),
        sign: '4426a055360a7d0f2cc86a30d101bcd9',
        // openid: wx.getStorageSync('token').openid,
        openid: 'o5-sM5PFe6ZsoZHefCdpd76wc8cg',
        action: 'info',
        id: that.data.id
      },
      success: function (res) {
        console.log(res)
        if (res.data.data) {
          that.setData({
            info_list: res.data.data,
            goods: res.data.data.goods,
            store: res.data.data.store,
            customer: res.data.data.customer
          })
        }
        if (res.data.data.qcode) {
          that.setData({
            qcode: res.data.data.qcode
          })
        }
      },
      complete: function (res) {
        that.setData({
          ifOnce: false
        })
      }
    })
  }
})