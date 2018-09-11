// pages/stock-goods/stock-goods.js
const app = getApp();
const common = require('../../../../utils/common.js').common;
const config = require("../../../../utils/config.js").config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifLoading:true,
    nomore:false,
    chooselistData: [{ name: '现有库存', id: 0 }, { name: '库存上限预警', id: 1 }, { name: '库存下限预警', id: 2 }],
    activeIndex:0,
    showdelect: false,
    pageNum:1,
    limit:10,
    showmore:false
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
          activeIndex: 0,
          nomore: false
        })
        this.goodsStock();
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
  //选项卡列表类型切换
  ChooseList: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index,
      pageNum: 1,
      nomore: false
    })
    this.goodsStock()
  },
  //搜索绑定
  getSearchContent: function (e) {
    console.log(e.detail.value)
    this.setData({
      showdelect: e.detail.value?true:false,
      searchContent: e.detail.value
    })
  },
  //点击搜索
  searchText: function (e) {
    this.setData({
      pageNum: 1,
      nomore: false
    })
    this.goodsStock()
  },
  //删除搜索
  Delect: function () {
    this.setData({
      showdelect: false,
      searchContent: '',
      pageNum: 1,
      nomore: false
    })
    this.goodsStock()
  },
  //对巡检记录的请求
  goodsStock: function () {
    var param = {
      user_token: app.globalData.user_token,
      action: 'list',
      page: this.data.pageNum,
      list_rows: this.data.limit
    }
    if (this.data.searchContent) param.search_data = this.data.searchContent;
    if (this.data.activeIndex == 1) param.mode = 1;
    else if (this.data.activeIndex == 2) param.mode = 2;
    common.loading();
    wx.request({
      url: config.stock,
      data: param,
      method: 'POST',
      success: (res)=> {
        console.log(res.data)
        var stockData = this.data.stockData || [];
        if (res.data.data) {
          var data = res.data.data;
          if (this.data.pageNum == 1) {
            stockData = data;
          } else {
            stockData = stockData.concat(data);
          }
        } else {
          if (this.data.pageNum == 1) {
            stockData = [];
            // common.tip('没有查到相关商品', 'none')
          }else{
            this.setData({ nomore:true })
            // common.tip('没有更多商品了', 'none')
          }
        }
        this.setData({
          stockData: stockData
        })
      },
      complete:(res)=>{
        this.setData({
          ifLoading:false
        })
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        console.log('结束加载')
        wx.hideLoading()
      }
    });
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    common.pullLoading();
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    // wx.showLoading({title: '加载中'})
    this.setData({
      pageNum: 1,
      nomore: false
    })
    console.log('下拉刷新')
    this.goodsStock();
    // setTimeout(() => {
    //   console.log('111')
    //   wx.hideNavigationBarLoading();
    //   wx.hideLoading()
    // }, 200);
  },
  //加载更多
  onReachBottom: function () {
    console.log('加载更多')
    common.loading('加载中');
    this.setData({
      pageNum: this.data.pageNum+1
    })
    this.goodsStock();
  },
  onLoad: function (options) {
    this.goodsStock()
  },
  //提示信息
  tip: function (tip, statue) {
    wx.showToast({
      title: tip,
      icon: statue,
    })
  },


})