// pages/check-search/check-search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdelect: false,//搜索框的清除开始隐藏
    searchdatas: [
      { id: '1', name: '精品黑猪肉', unit: '件', kucun: '500', money: '1200', code: '1234567890123' },
      { id: '2', name: '精品黄瓜', unit: '件', kucun: '500', money: '1200', code: '1234567890123' },
      { id: '3', name: '精品番茄', unit: '件', kucun: '500', money: '1200', code: '1234567890123' },
      { id: '4', name: '精品西红柿', unit: '件', kucun: '500', money: '1200', code: '1234567890123' },
      { id: '5', name: '精品大豆油', unit: '件', kucun: '500', money: '1200', code: '1234567890123' },
      { id: '6', name: '精品黄瓜瓜瓜', unit: '件', kucun: '500', money: '1200', code: '1234567890123' }
    ],
  },
  //搜索绑定
  getSearchContent: function (event) {
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
    // var datas = {
    //   access_token: access_token,
    //   user_token: user_token,
    //   action: 'list',
    //   list_rows: 7,
    //   page: 1
    // }
    // this.searchResult(datas)
  },
  goodsResult: function (e) {
    var that = this;
    var searchindex = e.currentTarget.dataset.searchindex;
    var searchdatas = that.data.searchdatas;

    var checkGoodsBack = searchdatas[searchindex];
    wx.setStorageSync('checkGoodsBack', checkGoodsBack);
    wx.navigateBack({
      delta: 1
    })
  },
  onPullDownRefresh: function () {
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
  onLoad: function (options) {
    // checkGoodsBack
  },

})