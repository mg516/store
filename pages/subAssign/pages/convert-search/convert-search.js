// pages/request-search/request-search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdelect: false,//搜索框的清除开始隐藏
    searchdatas:[
      {id:'1',name:'精品黑猪肉',price:'70.00',store:'500',yesterday:'1200',number:'1234567890123'},
      { id: '2', name: '精品黄瓜', price: '60.00', store: '500', yesterday: '1200', number: '1234567890123'},
      { id: '3', name: '精品番茄', price: '50.00', store: '500', yesterday: '1200', number: '1234567890123'},
      { id: '4', name: '精品西红柿', price: '40.00', store: '500', yesterday: '1200', number: '1234567890123'},
      { id: '5', name: '精品大豆油', price: '30.00', store: '500', yesterday: '1200', number: '1234567890123'},
      { id: '6', name: '精品黄瓜瓜瓜', price: '20.00', store: '500', yesterday: '1200', number: '1234567890123'}
    ],
    arr:[],
    idarr:[]
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
  //点击搜索
  searchText: function (e) {
    var that = this;
    // var datas = {
    //   user_token: user_token,
    //   access_token: access_token,
    //   action: 'list',
    //   list_rows: 7,
    //   search_data: that.data.searchContent,
    //   provider_id: app.providerid
    // }
    // //调用接口请求数据
    // that.searchResult(datas)
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
  goodsResult:function(e){
    var that = this;
    var searchid = e.currentTarget.dataset.searchid;
    var searchindex = e.currentTarget.dataset.searchindex;
    var searchdatas = that.data.searchdatas;

    var searchname = searchdatas[searchindex].name;
    var searchprice = searchdatas[searchindex].price;
    var searchnumber = searchdatas[searchindex].number;
    that.setData({
      searchid: searchid,
      searchname: searchname,
      searchprice:searchprice,
      searchnumber: searchnumber
    })
    var convertGoodsBack = searchdatas[searchindex];
    wx.setStorageSync('convertGoodsBack', convertGoodsBack);
    wx.navigateBack({
      delta:1
    })

    // let x = searchdatas.find(res => res.id == searchid)
    // let arr = this.data.arr
    // let idarr = this.data.idarr
    // console.log(idarr)
    // let i 
    // let state = 1
    // for (i = 0; i < idarr.length; i++) {
    //   if (searchid == idarr[i]) {
    //     state = 0
    //     break
    //   }else{
    //     state = 1
    //   }
    // }

    // if (state == 1){
    //   arr.push(x)
    //   idarr.push(searchid)
    // }
    // this.setData({
    //   idarr: idarr,
    //   arr:arr
    // })
    // console.log(arr)
    // var model = JSON.stringify(arr);

    // wx.redirectTo({
    //   url: '../request-add/request-add?id=' + searchid + '&name=' + searchname + '&price=' + searchprice + '&number=' + searchnumber 
    // })
    
    
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
    // console.log(options)
    // if (options.bean){
    //   var datas = JSON.parse(options.bean);
    //   console.log(datas);
    // }
  },

})