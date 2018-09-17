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
  // 扫码收货
  codeAddGoods: function () {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode'],
      success: (res) => {
        // common.loading('加载中');
        console.log(res.result);
        this.searchGoods(res.result);
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
  searchGoods:function(_code){
    wx.request({
      url: config.goods,
      method: "POST",
      data: {
        user_token: app.globalData.user_token,
        action: 'info',
        sweep:1,
        code: _code
      },
      success: (res) => {
        console.log(res.data)
        if (res.data.data){
          let curGoods = res.data.data;
          let goodsList = this.data.orderDetail.goods;
          for (let i = 0; i < goodsList.length;i++){
            if (goodsList[i].bar_code == curGoods.bar_code){
              this.setData({
                scrollToThere:'goods' + i
              })
              break;
            }
            this.setData({
              scrollToThere: 'goods' + 5
            })
            break;
            if (i >= goodsList.length-1){
              wx.showModal({
                title: '提示',
                content: '当前请货单不存在该商品',
                showCancel:false
              })
            }
          }
        }else{
          wx.showModal({
            title: '提示',
            content: '没有获取到商品信息，请重试',
            showCancel: false
          })
        }
      }
    })
  },
  // 获取请货单数据
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