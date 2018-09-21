const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({
  data: {

  },
  // 保存输入金额
  searchContent: function (event) {
    let user_money = parseInt(this.data.accountData.user_money);
    let inputMoney = parseInt(event.detail.value)||0;
    if (inputMoney > user_money) inputMoney = user_money;
    console.log(inputMoney)
    this.setData({
      inputMoney: inputMoney
    })
  },
  reflect:function(){
    if (!isNaN(this.data.inputMoney)){
      wx.showModal({
        title: '提示',
        content: `确认提现 ${this.data.inputMoney}元 吗？`,
        success:(res)=>{
          console.log(res.confirm)
          if (res.confirm){
            this.cashMoney();
          }
        }
      })
    }
  },
  // 调用提现接口
  cashMoney:function(){
    let param = {
      user_token: app.globalData.user_token,
      openid: app.globalData.openid,
      action:'apply_cash',
      user_change: this.data.inputMoney
    };
    wx.request({
      url: config.tixian,
      method:'POST',
      data:param,
      success:(res)=>{
        if (res.data.code == 1) {
          wx.showModal({
            title: '提示',
            content: '申请提现成功',
          })
        }
        this.setData({
          inputMoney:null
        })
        this.getAccount()
      }
    })
  },
  // 全部提现
  cashAll:function(){
    this.setData({
      inputMoney:parseInt(this.data.accountData.user_money)
    })
  },
  // 获取可提现金额
  getAccount: function () {
    let param = {
      user_token: app.globalData.user_token,
      action: 'my_account'
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: config.account,
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        if (res.data.data) {
          let data = res.data.data;
          this.setData({
            accountData: data
          })
        }
      },
      complete: (res) => {
        common.hidePullLoading();
      }
    })
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.setData({
      member: app.globalData.member
    })
    this.getAccount()
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  }
})