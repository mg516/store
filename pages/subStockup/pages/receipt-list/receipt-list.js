// pages/receipt-list/receipt-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooselistData: ['未收货', '已收货', '已入库'],
    currentid: 0,
    showdelect: false,
    Startdate: '2018-07-08',
    Enddate: '2018-09-08',
    items: [
      { ordername: '1', checked: false },
      { ordername: '2', checked: false },
      { ordername: '3', checked: false },
      { ordername: '4', checked: false },
    ],
    items1: [
      { ordername: '1', checked: false },
      { ordername: '2', checked: false }
    ],
    showselect: false,//全选显示
    middlearr: [],//商品数量
  },

  //选项卡列表类型切换
  ChooseList: function (e) {
    var listid = e.currentTarget.dataset.listid
    console.log(listid);
    this.setData({
      currentid: listid
    })
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
  //点击搜索
  // searchText: function (e) {
  //   var that = this;
  //   var datas = {
  //     user_token: user_token,
  //     access_token: access_token,
  //     action: 'list',
  //     list_rows: 7,
  //     search_data: that.data.searchContent,
  //     provider_id: app.providerid
  //   }
  //   //调用接口请求数据
  //   that.searchResult(datas)
  // },
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
  // 初始时间的点击
  startTimeChange: function (e) {
    var that = this;
    that.setData({
      Startdate: e.detail.value
    })
    // if (that.data.Startdate != '初始时间' && that.data.Enddate != '结束时间') {
    //   var datas = {
    //     user_token: user_token,
    //     access_token: access_token,
    //     action: 'list',
    //     page: 1,
    //     list_rows: 5,
    //     start_time: e.detail.value,
    //     end_time: that.data.Enddate,
    //     search_data: that.data.searchContent,
    //     category_id: that.data.typeid,
    //     land_id: app.landid
    //   }
    //   //调用接口请求数据
    //   that.FarmRequest(datas);
    //}

  },
  // 结束时间的点击
  endTimeChange: function (e) {
    var that = this;
    that.setData({
      Enddate: e.detail.value
    })
    // if (that.data.Startdate != '初始时间' && that.data.Enddate != '结束时间') {
    //   var datas = {
    //     user_token: user_token,
    //     access_token: access_token,
    //     action: 'list',
    //     page: 1,
    //     list_rows: 5,
    //     start_time: that.data.Startdate,
    //     end_time: e.detail.value,
    //     search_data: that.data.searchContent,
    //     category_id: that.data.typeid,
    //     land_id: app.landid
    //   }
    //   //调用接口请求数据
    //   that.FarmRequest(datas);

    // }
  },
  //跳转
  receiptDetail: function (e) {
    var currentid = this.data.currentid;
    console.log(currentid)
    wx.navigateTo({
      url: "../receipt-detail/receipt-detail?pageid=" + currentid
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
    console.log(options.currentid)
    if (options.currentid != undefined) {
      this.setData({
        currentid: options.currentid
      })
    }
  },
  onShow:function(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }
})
