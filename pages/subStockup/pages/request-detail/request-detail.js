// pages/request-detail/request-detail.js
const app = getApp();
const common = require('../../../../utils/common.js').common;
const config = require('../../../../utils/config.js').config;
Page({
  data: {
    chooselistData: ['订货信息', '收货信息'],
    currentid: 0,
    orderList: [{
      name: '大白菜',
      code: '515431341345',
      pickNum: '94.6',
      pickMoney: '63515.3',
      id: 1,
      unit:'个',
      total:1500,
      remark:'备注。。。',

    }, {
      name: '胡萝卜',
      code: '515431341345',
      pickNum: '654.6',
      pickMoney: '3515.3',
      id: 2,
      unit:'个',
      total:500,
      remark:'备注。。。',

    }, {
      name: '农夫山泉',
      code: '515431341345',
      pickNum: '20',
      pickMoney: '30',
      id: 3,
      unit:'个',
      total:3500,
      remark:'备注。。。',

    }],
  },
  //选项卡列表类型切换
  ChooseList: function (e) {
    var listid = e.currentTarget.dataset.listid
    this.setData({
      currentid: listid
    })
  },
  //跳转到配送中
  request: function () {
    var Listcurrentid = this.data.Listcurrentid;
    let pages = getCurrentPages();//当前页面栈
    let prevPage = pages[pages.length - 2];//上一页面
    if (Listcurrentid == 0) {
      prevPage.setData({//直接给上移页面赋值
        currentid: 1
      });
      // wx.navigateTo({url: "../receipt-list/receipt-list?currentid=" + 1})
    } else if (Listcurrentid == 1) {
      prevPage.setData({//直接给上移页面赋值
        currentid: 2
      });
      // wx.navigateTo({url: "../receipt-list/receipt-list?currentid=" + 2})
    }
    wx.navigateBack({//返回
      delta: 1
    })
  },
  getOrderData:function(){
    let orderId = this.data.orderId;
    common.loading();
    wx.request({
      url: config.request,
      method: "POST",
      data: {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        action: 'info',
        id:this.data.orderId
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
  onLoad: function (options) {
    this.setData({
      orderId: options.id
    })
    this.getOrderData();
  }
})