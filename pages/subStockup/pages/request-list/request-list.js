// pages/request-list/request-list.js
const common = require('../../../../utils/common.js').common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentid: 0,
    showdelect: false,
    Startdate: '2018-07-08',
    Enddate: '2018-09-08',
    orderList: [
      { ordername: '1', checked: false },
      { ordername: '2', checked: false },
      { ordername: '3', checked: false },
      { ordername: '4', checked: false },
      { ordername: '5', checked: false },
      { ordername: '6', checked: false }
    ],
    //分类筛选条件-订单状态
    pickStataus: [//全部订单状态
      { text: '收货状态', order_status: '' },
      { text: '未收货', order_status: '0' },
      { text: '待收货', order_status: '1' },
      { text: '收货完成', order_status: '2' }
    ],
    pickStatausIndex:0,
  },
  //搜索绑定
  searchContent: function (event) {
    if (event.detail.value) {
      this.setData({
        showdelect: true,
        searchContent: event.detail.value
      })
    } else {
      this.setData({
        showdelect: false,
      })
    }
  },
  //删除搜索
  Delect: function () {
    var searchcontent = this.data.searchContent;
    this.setData({
      showdelect: false,
      searchContent: ''
    })
  },
  searchpick:function(e){
    this.setData({
      pickStatausIndex: e.detail.value,
      openSearch:false
    })
  },
  // 取消按收货状态搜索
  cancelSearchOrder: function () {
    this.setData({
      openSearch: false,
      openClassSearch: false
    })
  },
  // 展开按收货状态搜索
  openSearchpick: function (e) {
    let picType = e.currentTarget.dataset.pictype;
    if (picType == 'status') {
      this.setData({
        openSearch: true
      })
    } else if (picType == 'type') {
      this.setData({
        openClassSearch: true
      })
    }
  },
  // 初始时间的点击
  startTimeChange: function (e) {
    var that = this;
    that.setData({
      Startdate: e.detail.value
    })
  },
  // 结束时间的点击
  endTimeChange: function (e) {
    var that = this;
    that.setData({
      Enddate: e.detail.value
    })
  },
  //跳转
  requestDetail: function (e) {
    var currentid = this.data.currentid;
    wx.navigateTo({
      url: "../request-detail/request-detail?pageid=" + currentid
    })
  },
  requestAdd: function (e) {
    wx.navigateTo({
      url: "../request-add/request-add"
    })
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      // function()
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  //加载更多
  onReachBottom: function () {
    console.log('加载更多')
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  },
  onLoad: function () { 
    
  },
  onShow:function(){
    this.setData({
      Startdate: common.GetDay(-60),
      Enddate: common.today()
    })
    var currentid = this.data.currentid;
  }
})