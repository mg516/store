const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderMsg:null,
    currentid: 0,
  },
  cashBack:function(){
    let param = {
      openid: app.globalData.openid,
      sn: this.data.cashData.sn,
      cashback: this.data.cashData.cashback,
      action: 'pay'
    }
    wx.request({
      url: config.cash,
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          common.tip(tipText)
          this.getOrderDetail()
        } else {
          common.tip(res.data.msg, 'none')
        }
        wx.hideLoading();
      }
    })
  },
  orderHandle(){
    wx.showModal({
      title: '提示',
      content: `确认支付${this.data.cashData.cashback}元佣金`,
      success:(res)=>{
        this.cashBack();
      }
    })
  },
  onLoad: function (options) {
    let cashStr = options.cashStr;
    let cashData = JSON.parse(cashStr);
    this.setData({
      cashData: cashData
    })
  },
})

