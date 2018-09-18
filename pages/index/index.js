//index.js
//获取应用实例
const loginFunc = require("../../utils/login.js");
const config = require("../../utils/config.js").config;
const common = require("../../utils/common.js").common;
const app = getApp();
Page({
  data: {
    opacity: '0',
    ifOnce: true,
    distributor:{
      member:{
        mobile:"18566215125",
        realname:"苗刚",
        store_name:"青蛙家苗栗路沁园店"
      },
      yongjin:88.88,
      ordernum:88,
      df_ordernum:15,
      entrance: [{
        list: [
          { id: '1', name: '我的账户', icon: '/images/index/qinghuo.png', url: '/pages/subDistri/pages/myAccount/myAccount' },
          { id: '1', name: '商品列表', icon: '/images/index/qinghuo.png', url: '/pages/subStockup/pages/request-list/request-list?direct_supply=1' }
        ],
        id: 6,
        name: '账户·资产',
        pid: 0
      },
        {
          list: [
            { id: '9', name: '扫码提货单', icon: '/images/index/saoma.png', url: 'code' },
            { id: '8', name: '订单列表单', icon: '/images/index/dingdan.png', url: '/pages/subOrder/pages/order-list/order-list' },
            { id: '8', name: '客户列表', icon: '/images/index/vip.png', url: '/pages/subVip/pages/vipList/vipList' },
            { id: '8', name: '推广小单', icon: '/images/index/addorder.png', url: '/pages/subOrder/pages/order-add/order-add' },
          ],
          id: 6,
          name: '客户·服务',
          pid: 0
        }]
    },
    entrance1: [
      {
        list:[
          { id: '1', name: '门店请货单', icon: '/images/index/qinghuo.png', url: '/pages/subStockup/pages/request-list/request-list?direct_supply=0' },
          { id: '1', name: '门店直供单', icon: '/images/index/qinghuo.png', url: '/pages/subStockup/pages/request-list/request-list?direct_supply=1' },
          { id: '2', name: '门店收货单', icon: '/images/index/shouhuo.png', url: '/pages/subStockup/pages/receipt-list/receipt-list' },
          { id: '3', name: '门店退货单', icon: '/images/index/tuihuo.png', url: '/pages/subStockup/pages/return-list/return-list' },
          { id: '3', name: '商品库存', icon: '/images/index/stock.png', url: '/pages/subStockup/pages/stock-goods/stock-goods' },
          { id: '4', name: '门店报损单', icon: '/images/index/baosun.png', url: '/pages/subAssign/pages/breakage-list/breakage-list' },
        ],
        id:6,
        name:'仓储·物流',
        pid:0
      },
      {
        list: [
          { id: '5', name: '门店调拨单', icon: '/images/index/diaobo.png', url: '/pages/subAssign/pages/transfer-list/transfer-list' },
          { id: '6', name: '门店盘点单', icon: '/images/index/pandian.png', url: '/pages/subAssign/pages/check-list/check-list' },
          { id: '7', name: '门店折价单', icon: '/images/index/zhejia.png', url: '/pages/subAssign/pages/convert-list/convert-list' },
        ],
        id: 6,
        name: '分拣·销售',
        pid: 0
      },
      {
        list: [
          { id: '9', name: '扫码提货单', icon: '/images/index/saoma.png', url: 'code' },
          { id: '8', name: '订单列表单', icon: '/images/index/dingdan.png', url: '/pages/subOrder/pages/order-list/order-list' },
          { id: '8', name: '新增订单', icon: '/images/index/addorder.png', url: '/pages/subOrder/pages/order-add/order-add' },
          { id: '8', name: '会员', icon: '/images/index/vip.png', url: '/pages/subVip/pages/vipList/vipList' },
        ],
        id: 6,
        name: '客户·服务',
        pid: 0
      },
      {
        list: [
          { id: '9', name: '门店销售额', icon: '/images/index/xiaoshou.png', url: '/pages/subSale/pages/sale-money/sale-money' },
          { id: '8', name: '门店销售情况', icon: '/images/index/salestatus.png', url: '/pages/subSale/pages/sales-status/sales-status' },
          { id: '8', name: '商品销售情况', icon: '/images/index/salegoods.png', url: '/pages/subSale/pages/sale-goods/sale-goods' },
        ],
        id: 6,
        name: '销售·报表',
        pid: 0
      }
    ],
    entrence1: [
      { id: '1', name: '门店请货单', image: '/images/index/qinghuo.png', url: '/pages/request-list/request-list' },
      { id: '2', name: '门店收货单', image: '/images/index/shouhuo.png', url: '/pages/receipt-list/receipt-list' },
      { id: '3', name: '门店退货单', image: '/images/index/tuihuo.png', url: '/pages/return-list/return-list' },
    ],
    entrence2: [
      { id: '4', name: '门店报损单', image: '/images/index/baosun.png', url: '/pages/breakage-list/breakage-list' },
      { id: '5', name: '门店调拨单', image: '/images/index/diaobo.png', url: '/pages/transfer-list/transfer-list' },
      { id: '6', name: '门店盘点单', image: '/images/index/pandian.png', url: '/pages/check-list/check-list' },
      { id: '7', name: '门店折价单', image: '/images/index/zhejia.png', url: '/pages/convert-list/convert-list' },
    ],
    entrence3: [
      { id: '9', name: '扫码提货单', image: '/images/index/saoma.png', url: 'code' },
      { id: '8', name: '订单列表单', image: '/images/index/dingdan.png', url: '/pages/subOrder/pages/order-list/order-list' },
      { id: '8', name: '新增订单', image: '/images/index/addorder.png', url: '/pages/subOrder/pages/order-add/order-add' },
    ],
    entrence4: [
      { id: '9', name: '门店销售额', image: '/images/index/xiaoshou.png', url: '/pages/subSale/pages/sale-money/sale-money' },
      { id: '8', name: '门店销售情况', image: '/images/index/salestatus.png', url: '/pages/subSale/pages/sales-status/sales-status' },
      { id: '8', name: '单品销售情况', image: '/images/index/salegoods.png', url: '/pages/subSale/pages/sale-goods/sale-goods' },
    ],
  },
  scanCode:function(){
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode','barCode'],
      success: (res) => {
        // common.loading('加载中');
        console.log(res);
        wx.request({
          url: config.order,
          method: 'POST',
          data: {
            user_token: app.globalData.user_token,
            action: 'pick_code',
            pick_code: res.result
          },
          success: (res) => {
            console.log(res)
            if (res.data.data && res.data.data.id){
              wx.navigateTo({
                // url: '/pages/userOrder/userOrder?codeMsg=' + res.result,
                url: '/pages/subOrder/pages/order-detail/order-detail?orderId=' + res.data.data.id,
                // url: '/pages/userOrder/userOrder?id=399&orderstatus=4',
                // url: '/pages/userOrder/userOrder?id=374&orderstatus=3',
              })
            }else{
              // wx.hideLoading();
              wx.showModal({
                title: '温馨提示',
                content: res.data.msg,
              })
              // common.tip(res.data.msg,'none')
            }
          },
          complete:(res) => {
            // wx.hideLoading();
          }
        })
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
        wx.getSystemInfo({
          success: function (res) {
            // if (res.platform == "android") {
              // android扫一扫失败，跳回首页
            wx.switchTab({
              url: '/pages/index/index',
            })
            // } else {
            //   console.log("不是安卓")
            // }
          }
        })
      },
      complete: (res) => {
        this.setData({
          opacity: Math.random()
        });
      }
    })
  },
  //点击跳转下一页
  goTo: function (e) {
    var url = e.currentTarget.dataset.url;
    if (url == 'code'){
      this.scanCode();
    }else{
      wx.navigateTo({
        url: url,
      })
    }
  },
  onPullDownRefresh: function () {
    wx.removeStorageSync('user_token');
    this.ifLogin()
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    // this.setData({
    //   pageNum: 1
    // })
    // this.getOrderList();
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },
  onLoadFunc:function(){
    console.log(app.globalData)
    this.setData({ ifOnce: false })
    this.setData({
      entrance: app.globalData.entrance,
      member: app.globalData.member
    })
  },
  ifLogin:function(e){
    console.log(1)
    loginFunc.loginFunc(this, this.onLoadFunc,e||null)
  },
  onLoad: function (e) {
    this.ifLogin(e);
  },
  onShow:function(){
    wx.removeStorageSync('user_token');
    if (!this.data.ifOnce){
      this.ifLogin();
    }
  }
})
