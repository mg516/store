const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({
  data: {

  },
  getPersonal:function(){
    let param = {
      user_token: app.globalData.user_token,
      action:'personal_data',
      appid: app.globalData.appid,
      openid: app.globalData.openid
    }
    wx.request({
      url: config.personal,
      method:"POST",
      data:param,
      success:(res)=>{
        console.log(res)
        this.setData({
          personalData:res.data.data
        })
      }
    })
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getPersonal();
  },
  onPullDownRefresh: function () {
    this.getPersonal();
  }
})