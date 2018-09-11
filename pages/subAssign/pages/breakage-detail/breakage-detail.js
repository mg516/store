// pages/breakage-detail/breakage-detail.js
const app = getApp();
const config = require('../../../../utils/config.js').config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooselistData: ['报损明细', '报损金额'],
    currentid: 0,
    orderList: [{
      name: '大白菜',
      code: '515431341345',
      pickNum: '9654.6',
      pickMoney: '63515.3',
      id: 1
    }, {
      name: '胡萝卜',
      code: '515431341345',
      pickNum: '654.6',
      pickMoney: '3515.3',
      id: 2
    }, {
      name: '农夫山泉',
      code: '515431341345',
      pickNum: '20',
      pickMoney: '30',
      id: 3
    }],
  },
  //选项卡列表类型切换
  ChooseList: function (e) {
    var listid = e.currentTarget.dataset.listid
    this.setData({
      currentid: listid
    })
  },
  // 预览
  previewImg: function(e){
    let index = e.currentTarget.dataset.index;
    let arr = this.data.orderData.thumb;
    wx.previewImage({
      urls: arr,
      current: arr[index]
    })
  },
  // 报损单详情
  getDetail: function (id) {
    wx.request({
      url: config.baosun,
      method: "POST",
      data: {
        access_token: app.globalData.access_token,//app.globalData.access_token
        user_token: app.globalData.user_token,//app.globalData.access_token
        // list_rows: this.data.limit,
        // page: this.data.pageNum || 1,
        action: 'detail',
        id: id
      },
      success: (res) => {
        console.log(res)
        var orderData = res.data.data;
        this.setData({
          orderData: orderData
        })
        wx.hideLoading()
      }
    })
  },
  onShow:function(){
  },
  onLoad: function (options) {
    var id = options.id;
    this.getDetail(id);
  },

})