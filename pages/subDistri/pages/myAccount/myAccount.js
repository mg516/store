const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  // 已提现
  cashPostal:function(){
    wx.navigateTo({
      url: '/pages/subDistri/pages/cashPostal/cashPostal',
    })
  },
  // 申请提现
  reflect:function(){
    wx.navigateTo({
      url: '/pages/subDistri/pages/applyPresent/applyPresent',
    })
  },
  //账户明细
  accountDetail: function () {
    wx.navigateTo({
      url: '/pages/subDistri/pages/accountDetail/accountDetail',
    })
  },
})