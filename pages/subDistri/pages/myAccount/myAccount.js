const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getAccount();
  },
  getAccount:function(){
    let param = {
      user_token: app.globalData.user_token,
      action: 'my_account'
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: config.account,
      method:'POST',
      data:param,
      success:(res)=>{
        console.log(res)
        if (res.data.data){
          let data = res.data.data;
          data.total_moneyArr = common.pattIntFloat(data.total_money||0, 2);
          data.frozen_moneyArr = common.pattIntFloat(data.frozen_money||0, 2);
          data.already_cashArr = common.pattIntFloat(data.already_cash||0,2);
          this.setData({
            accountData:data
          })
        }
      },
      complete:(res)=>{
        common.hidePullLoading();
      }
    })
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
  onPullDownRefresh: function () {
    common.pullLoading()
    this.getAccount();
  }
})