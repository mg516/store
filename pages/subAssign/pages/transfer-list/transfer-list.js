// pages/transfer-list/transfer-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooselistData: ['调出', '调入'],
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

    year: '',
    month: '',
    day: '',
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
  // 选择
  select: function (e) {
    var that = this;
    var arr = that.data.items;
    var selectindex = e.currentTarget.dataset.currentid;
    console.log(selectindex)
    var i;
    var state = 0;//控制状态
    arr[selectindex].checked = !arr[selectindex].checked;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].checked == false) {//只要有一个为false,就显示全选
        var state = 1;//显示全选,状态为1的时候
        this.setData({
          showselect: false
        })
      }
    }
    if (state == 0) {//状态为0的时候，显示取消全选
      that.setData({
        showselect: true
      })
    }
    that.setData({
      items: arr,
      selectindex: selectindex
    })

  },
  // 全选
  selectAll: function () {
    let that = this;
    var arr = that.data.items;
    var selectindex = that.data.selectindex;
    console.log(selectindex);
    console.log(arr)
    that.setData({
      showselect: !that.data.showselect
    })
    if (that.data.showselect) {
      console.log(that.data.showselect)
      let arr = that.data.items;
      let arr2 = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked == true) {//有true的时候
          arr2.push(arr[i]);
        } else {//没有true的时候
          arr[i].checked = true;
          arr2.push(arr[i]);
        }
      }
      that.setData({
        items: arr2,
        middlearr: arr2
      })
    }
  },
  // 取消全选
  selectNone: function () {
    let that = this;
    that.setData({
      showselect: !that.data.showselect
    })
    let arr = that.data.items;
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i].checked = false;
      arr2.push(arr[i]);
    }
    that.setData({
      items: arr2,
      middlearr: []
    })
  },
  //点击配送
  Carry: function () {
    var that = this;
    var arr = that.data.items;
    let arr3 = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].checked == true) {//有true的时候
        arr3.push(arr[i].ordername);
      }
    }
    console.log(arr3)
    if (arr3 != '') {
      wx.showModal({
        title: '配送前,请确认配送信息无误',
        content: '(去配送后信息不可修改)',
        cancelColor: '#F97D47',
        cancelText: '我再想想',
        confirmText: '去配送',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            that.setData({
              currentid: 1
            })
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    } else {
      wx: wx.showToast({
        title: '还没有选择配送的订单噢',
        icon: 'none'
      })
    }
  },

  
  //跳转到
  transferDetail: function (e) {
    wx.navigateTo({
      url: "../transfer-detail/transfer-detail"
    })
  },
  goToOutAdd: function (e) {
    wx.navigateTo({
      url: "../transfer-outadd/transfer-outadd"
    })
  },
  goToInAdd: function (e) {
    wx.navigateTo({
      url: "../transfer-inadd/transfer-inadd"
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
    var that = this
    var myDate = new Date()//获取系统当前时间
    var year = myDate.getFullYear()
    var month = myDate.getMonth() + 1
    var day = myDate.getDate()
    this.setData({
      year: year,
      month: month,
      day: day
    }) 
  }
})
