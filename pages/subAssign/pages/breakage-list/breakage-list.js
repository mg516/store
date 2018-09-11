// pages/breakage-list/breakage-list.js
const app = getApp();
const common = require('../../../../utils/common.js').common;
const config = require('../../../../utils/config.js').config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifLoading:true,
    nomore:false,
    showdelect: false,
    Startdate: '',
    Enddate: '',
    pageNum:1,
    limit:5,
    curList: [],
  },
  //搜索绑定
  searchContent: function (event) {
    if (event.detail.value) {
      this.setData({
        showdelect: true,
      })
    } else {
      this.setData({
        showdelect: false,
      })
    }
    this.setData({
      searchContent: event.detail.value
    })
  },
  //点击搜索
  searchText: function (e) {
    this.setData({
      pageNum:1,
      nomore: false
    })
    this.getBsList()
  },
  //删除搜索
  Delect: function () {
    var searchcontent = this.data.searchContent;
    this.setData({
      showdelect: false,
      searchContent: '',
      pageNum: 1,
      nomore: false
    })
    this.getBsList()
  },
  // 初始时间的点击
  startTimeChange: function (e) {
    var that = this;
    that.setData({
      Startdate: e.detail.value,
      pageNum: 1,
      nomore: false
    })
    this.getBsList();
  },
  // 结束时间的点击
  endTimeChange: function (e) {
    var that = this;
    that.setData({
      Enddate: e.detail.value,
      pageNum:1,
      nomore: false
    })
    this.getBsList();
  },
  //跳转
  breakageDetail: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../breakage-detail/breakage-detail?id=" + id
    })
  },
  breakageAdd: function (e) {
    wx.navigateTo({
      url: "../breakage-add/breakage-add"
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      pageNum: 1,
      nomore: false
    })
    this.getBsList()
    setTimeout(()=> {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  //加载更多
  onReachBottom: function () {
    console.log('加载更多')
    var count = this.data.count;
    var limit = this.data.limit;
    var pageNum = this.data.pageNum;
    if (count <= parseInt(limit) * parseInt(pageNum)){
      // common.tip('没有更多数据了','none');
      this.setData({ nomore: true })
      return;
    }
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.getBsList();
  },
  onLoad: function (options) {
    
  },
  onShow:function(){
    if (!this.data.Startdate || !this.data.Enddate)
    this.setData({
      Startdate: common.GetDay(-60),
      Enddate: common.today()
    })
    this.getBsList()
  },
  getBsList:function(){
    common.loading();
    wx.request({
      url: config.baosun,
      method:"POST",
      data:{
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        list_rows: this.data.limit,
        page: this.data.pageNum||1,
        action: 'list',
        words: this.data.searchContent||'',
        startTime: this.data.Startdate,
        endTime: this.data.Enddate,
      },
      success:(res)=>{
        console.log(res.data.data)
        var curList = this.data.curList||[];
        if (res.data.data){
          var data = res.data.data.list;
          var count = res.data.data.count;
          if (this.data.pageNum == 1){          
            curList = data;
          }else{
            curList = curList.concat(data);
          }
        }else{
          if (this.data.pageNum == 1) {
            curList = [];
          }else{
            this.setData({ nomore: true })
          }
          // common.tip(res.data.msg);
        }
        this.setData({
          curList: curList,
          count: count
        })
      },
      complete:(res)=>{
        this.setData({
          ifLoading:false
        })
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    })
  }
})