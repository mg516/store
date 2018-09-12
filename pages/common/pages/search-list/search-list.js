// pages/search-list/search-list.js
const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdelect: false,//搜索框的清除开始隐藏
    limit:15,
    pageNum:1,
    goodsList:[
      // { name: '精品苹果', code: '634618761311843', kucun: 258, unit: '斤' },
      // { name: '精品橘子', code: '634618433161843', kucun: 658, unit: '斤' },
      // { name: '精品菠萝', code: '634615553117843', kucun: 1658, unit: '个' }
      ]
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
  scanCode: function () {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode'],
      success: (res) => {
        // common.loading('加载中');
        console.log(res.result);
        this.setData({
          showdelect: res.result ? true : false,
          searchContent: res.result,
          pageNum: 1,
        })
        this.getGoodsList();
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
      }
    })
  },
  //点击搜索
  searchText: function (e) {
    var that = this;
    this.setData({
      pageNum:1
    })
    this.getGoodsList();
  },
  //删除搜索
  Delect: function () {
    var searchcontent = this.data.searchContent;
    this.setData({
      showdelect: false,
      searchContent: '',
      pageNum: 1
    })
    this.getGoodsList();
  },
  chooseIt:function(e){
    var goodsList = this.data.goodsList;
    var index = e.currentTarget.dataset.index;
    var thisGoods = goodsList[index];
    wx.setStorageSync(this.data.goodsType, thisGoods);
    wx.navigateBack({
      delta:1
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getGoodsList();
    setTimeout(function () {
      // function()
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  //加载更多
  onReachBottom: function () {
    console.log('加载更多')
    this.setData({
      pageNum: this.data.pageNum+1
    })
    this.getGoodsList();
    setTimeout(() => {
      wx.hideLoading()
    }, 1500)
  },
  onLoad: function (options) {
    var goodsType = options.goodsType;
    this.setData({
      goodsType:goodsType
    })
  },

  onShow: function () {
    this.getGoodsList();
  },
  getGoodsList:function(){
    common.loading();
    wx.request({
      url: config.baosun,
      method: "POST",
      data: {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        pageNumber: this.data.pageNum || 1,
        pageSize: this.data.limit,
        action: 'getgoods',
        name: this.data.searchContent||''
      },
      success: (res) => {
        console.log(res)
        let goodsList = this.data.goodsList || [];
        if (res.data.data && res.data.data.list){
          let data = res.data.data.list;
          if (this.data.pageNum == 1) {
            goodsList = data
          }else{
            goodsList = goodsList.concat(data);
          }
        }else{
          if (this.data.pageNum == 1){
            goodsList = []
          }
        }
        this.setData({
          goodsList: goodsList
        })
      },
      complete:(res)=>{
        wx.hideLoading()
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  }
})
