//index.js
//获取应用实例
const loginFunc = require("../../utils/login.js");
const config = require("../../utils/config.js").config;
const common = require("../../utils/common.js").common;
const app = getApp();
Page({
  data: {
    waitZiTi:0,
    todayNum:0,
    todayMoney:'0.00',//今日佣金
    opacity: '0',
    ifOnce: true,
    store_cg_id:null,
    entrance1: [
      {
        list: [
          { id: '1', name: '我的账户', icon: '/images/index/account.png', url: '/pages/subDistri/pages/myAccount/myAccount' },
          { id: '1', name: '商品列表', icon: '/images/index/commodity.png', url: '/pages/subDistri/pages/goodsList/goodsList' },
          { id: '1', name: '扫码返佣', icon: '/images/index/codecash.png', url: 'code_cash' },
        ],
        id: 6,
        name: '账户·资产',
        pid: 0
      },
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
          { id: '8', name: '客户列表', icon: '/images/index/customer.png', url: '/pages/subDistri/pages/userList/userList' },
          { id: '8', name: '推广小店', icon: '/images/index/spread.png', url: 'shareApp' },
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
  },
  // 扫码确认返佣者的身份
  scanToCash: function (_res){
    wx.request({
      url: config.checkID,
      method: 'POST',
      data: {
        openid: app.globalData.openid,
        action: 'cash_code',
        pick_code: _res.result
      },
      success: (res) => {
        console.log(res)
        if (res.data.data && res.data.data.pay == 0) {
          let cashData = res.data.data;
          let cashStr = JSON.stringify(cashData);
          wx.navigateTo({
            url: '/pages/subDistri/pages/checkCasher/checkCasher?cashStr=' + cashStr,
          })
        } else if (res.data.data.pay == 1){
          wx.showModal({
            title: '温馨提示',
            content: '该佣金已支付',
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
          })
        }
      }
    })
  },
  // 扫码前往订单
  scanToOrder: function (_res){
    wx.request({
      url: config.order,
      method: 'POST',
      data: {
        user_token: app.globalData.user_token,
        action: 'pick_code',
        pick_code: _res.result
      },
      success: (res) => {
        console.log(res)
        if (res.data.data && res.data.data.id) {
          wx.navigateTo({
            url: `/pages/subOrder/pages/order-detail/order-detail?orderId=${res.data.data.id}&type=code`,
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: res.data.msg,
          })
        }
      }
    })
  },
  // 扫码入口函数
  scanCode:function(_code){
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode','barCode'],
      success: (res) => {
        // common.loading('加载中');
        console.log(res);
        if (_code == 'code'){
          this.scanToOrder(res);
        } else if (_code == 'code_cash'){
          this.scanToCash(res);
        }
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
            wx.switchTab({
              url: '/pages/index/index',
            })
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
  // 分销-跳转到订单列表
  toOrderDetail:function(e){
    let totype = e.currentTarget.dataset.totype;
    wx.navigateTo({
      url: `/pages/subOrder/pages/order-list/order-list?distri_status=${totype}`,
    })
  },
  // 个人中心
  userDetail:function(){
    wx.navigateTo({
      url: '/pages/subDistri/pages/userDetail/userDetail',
    })
  },
  // 我的佣金
  myCommission:function(){
    wx.navigateTo({
      url: '/pages/subDistri/pages/myCommission/myCommission',
    })
  },
  //点击跳转下一页
  goTo: function (e) {
    var url = e.currentTarget.dataset.url;
    if (url == 'code' || url == 'code_cash'){
      this.scanCode(url);
    } else if (url == 'shareApp'){
      // 推广，跳转至商城小程序
      wx.navigateToMiniProgram({
        // appId:'wx3dcd06a59742ce6d',
        appId: 'wxe4f4b3386a5825af',
        path: `/pages/index/index?sign=${app.globalData.sign}`,
        envVersion: 'develop',
        success: (res) => {
          console.log(res)
        }
      })
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
      member: app.globalData.member,
      store_cg_id: app.globalData.store_cg_id
    })
    // 修改自提账号的样式
    if (this.data.store_cg_id == 3) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#6FBA2C',
        animation: {
          duration: 200,
          timingFunc: 'easeIn'
        }
      })
    };
    this.getAccount();//获取今日佣金
    this.getTodayOrder();//获取今日订单数
    this.getWaitZiTi();//获取待自提单数
    // let a = {
    //   '441':[1,1,1],
    //   id:441
    // }
    // for(let i in a){
    //   let b = {};
    //   b[i] = a[i]
    //   console.log(b)
    // }
  },
  ifLogin:function(e){
    console.log(1)
    loginFunc.loginFunc(this, this.onLoadFunc,e||null)
  },
  onLoad: function (e) {
    this.ifLogin(e);
  },
  onShow:function(){
    wx.removeStorageSync('access_token');
    if (!this.data.ifOnce){
      this.ifLogin();
    }
  },
  // 获取今日佣金
  getAccount: function () {
    let param = {user_token: app.globalData.user_token,list_rows: 1,page: 1,action: 'list',action_type: 2}
    wx.request({
      url: config.account,method: 'POST',data: param,
      success: (res) => {
        if (res.data.data) this.setData({todayMoney: (res.data.data.today_return_money).toFixed(2)})
        else this.setData({todayMoney: '0.00'})
      }
    })
  },
  getTodayOrder: function () {
    let param = { user_token: app.globalData.user_token, action: 'order_count', day_type: 1 }
    wx.request({
      url: config.order, method: 'POST', data: param,
      success: (res) => {
        if(res.data.data){
          this.setData({ todayNum: res.data.data.count||0 })
        }
      }
    })
  },
  getWaitZiTi: function () {
    let param = { user_token: app.globalData.user_token, action: 'order_count', order_status: 5 }
    wx.request({
      url: config.order, method: 'POST', data: param,
      success: (res) => {
        if (res.data.data) {
          this.setData({ waitZiTi: res.data.data.count||0 })
        }
      }
    })
  },
})
