// pages/transfer-outadd/transfer-outadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取光标跳转
  goToSearch: function () {
    wx.navigateTo({
      url: '/pages/search-list/search-list?goodsType=diaochu',
    })
  },
  //提交
  Submit: function () {
    wx.showModal({
      title: '提交前,请确认信息无误',
      content: '(提交后信息不可修改)',
      cancelColor: '#F97D47',
      cancelText: '我再想想',
      confirmText: '提交',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
  },
  // 调出金额
  changeMoney: function (e) {
    var curMsg = this.data.curMsg;
    curMsg.curMoney = e.detail.value;
    this.setData({
      curMsg: curMsg
    })
    wx.setStorageSync('diaochu', curMsg);
  },
  // 调出原因
  changeReason: function (e) {
    var curMsg = this.data.curMsg;
    curMsg.curReason = e.detail.value;
    this.setData({
      curMsg: curMsg
    })
    wx.setStorageSync('diaochu', curMsg);
  },
  // 调出数量
  changeNum: function (e) {
    var curMsg = this.data.curMsg;
    curMsg.curNum = e.detail.value;
    this.setData({
      curMsg: curMsg
    })
    wx.setStorageSync('diaochu', curMsg);
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var diaochuGoods = wx.getStorageSync('diaochu') || null;
    var curMsg = this.data.curMsg;
    if (diaochuGoods && (!curMsg || (curMsg && curMsg.code != diaochuGoods.code))) {
      var today = new Date;
      curMsg = diaochuGoods;
      var todayStr = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      curMsg.time = todayStr;
      this.setData({
        curMsg: diaochuGoods
      })
      // wx.removeStorageSync('diaochu')
    }
  },
})
