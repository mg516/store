// pages/request-detail/request-detail.js
const app = getApp();
const common = require('../../../../utils/common.js').common;
const config = require('../../../../utils/config.js').config;
const inputModal = require('../../../../utils/inputModal/inputModal.js');
Page({
  data: {
    chooselistData: ['订货信息', '收货信息'],
    currentid: 0,
    orderList: [],
  },
  codeAddGoods: function () {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode'],
      success: (res) => {
        // common.loading('加载中');
        console.log(res.result);
        this.setData({
          showdelect: res.result ? true : false,
          searchContent: res.result,
          pageNum: 1,
          nomore: false
        })
        this.getRequestList();
      },
      fail: (res) => {
        console.log(res);
        if (res.errMsg == 'scanCode:fail cancel') {
          console.log('取消扫码')
        } else if (res.errMsg == 'scanCode:fail') {
          wx.showToast({
            title: '请识别正确的二维码',
            icon: 'none'
          })
        }
      }
    })
  },
  getOrderData: function() {
    let orderId = this.data.orderId;
    common.loading();
    wx.request({
      url: config.request,
      method: "POST",
      data: {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        action: 'info',
        id: this.data.orderId
      },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          orderDetail: res.data.data
        })
      },
      complete: (res) => {
        this.setData({
          ifLoading: false
        })
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    })
  },
  onLoad: function(options) {
    this.setData({
      orderId: options.id
    })
    this.getOrderData();
    inputModal.inputModal(this, this.MtouchInput, this.MsureInput);
  },
  // 点击输入框回调
  MtouchInput: function (e) {
    var curIndex = e.currentTarget.dataset.index;
    this.setData({
      curIndex: curIndex,
    })
  },
  // 输入框确认回调
  MsureInput: function (MinputValue) {
    let curIndex = this.data.curIndex;
    let orderDetail = this.data.orderDetail;
    orderDetail.goods[curIndex].pickNum = MinputValue;
    this.setData({ orderDetail: orderDetail })
  }
})