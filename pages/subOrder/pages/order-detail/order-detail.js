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
  orderHandle(){
    let orderMsg = this.data.orderMsg;
    let orderType = orderMsg.type;//订单类别 1自提 2送货上门
    let dispatch = orderMsg.dispatch;//配送状态 0待配送 1配送中 2配送完成
    let pick = orderMsg.pick;//提货状态 0待提货 1提货中 2提货完成
    let modalText = '';
    let tipText = '';//操作成功后的提示文字
    if (orderType == 1 && pick == 0) { modalText = '请确认提货人身份，确认提货吗？'; tipText:'提货成功'}
    else if (orderType == 2 && dispatch == 0) { modalText = '请开始配送商品'; tipText: '操作成功' }
    else if (orderType == 2 && dispatch == 1) { modalText = '请确认收货人已收到商品，确认配送完成吗？'; tipText: '操作成功' }
    else { common.tip('数据异常，请联系管理员', 'none')}
    wx.showModal({
      title: '提示',
      content: modalText,
      success: (res)=> {
        if (res.confirm) {
          let param = {};
          if (orderType == 2 && dispatch == 0){//发货
            param = {
              access_token: app.globalData.access_token,
              user_token: app.globalData.user_token,
              action: 'send_goods',
              id: this.data.orderId
            }
          } else if ((orderType == 1 && pick == 0) || (orderType == 2 && dispatch == 1)){//配送完成，提货完成
            param = {
              access_token: app.globalData.access_token,
              user_token: app.globalData.user_token,
              action: 'qr_pick_sh',
              id: this.data.orderId
            }
          }
          common.loading('加载中');
          wx.request({
            url: config.order,
            method: 'POST',
            data: param,
            success: (res) => {
              console.log(res)
              if (res.data.code == 1) {
                common.tip(tipText)
                this.getOrderDetail()
              }else{
                common.tip(res.data.msg,'none')
              }
              wx.hideLoading();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //拨打电话
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phonenum
    })
  },
  getOrderDetail: function () {
    common.loading('加载中');
    wx.request({
      url: config.order,
      method: 'POST',
      data: {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        action: 'info',
        sign: app.globalData.sign,
        id: this.data.orderId
      },
      success: (res) => {
        console.log(res)
        if (res.data.data) {
          var orderMsg = res.data.data;
          this.setData({
            orderMsg: orderMsg
          })
        }
      },
      complete:(res)=>{
        wx.hideLoading();
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId
    })
    this.getOrderDetail();
  },


})

