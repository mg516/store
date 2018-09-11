const app = getApp();
const common = require('../../../../utils/common.js').common;
const config = require("../../../../utils/config.js").config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifLoading:true,
    showdelect: false,//搜索框的清除开始隐藏
    goodsArray: [
      { id: '1', name: '石桥一路店' },
      { id: '2', name: '武汉天地店',  }
    ],
    saleList1: [
      { id: '1', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '2', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '3', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '4', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '6', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' }
    ],
    goodsIndex: 0,
    arr: [],
    idarr: [],
    pageNum: 1,
    limit: 15,
    Startdate: '',
    Enddate: '',
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
  },
  //删除搜索
  Delect: function () {
    var searchcontent = this.data.searchContent;
    this.setData({
      showdelect: false,
      searchContent: ''
    })
  },
  // 取消选择，picker箭头向下
  cancelPicker: function () {
    this.setData({
      goodsPickerOpen: false
    })
  },
  changePickerStatus: function () {
    this.setData({
      goodsPickerOpen: !this.data.goodsPickerOpen
    })
  },
  changeGoods: function (e) {
    console.log(e.detail.value)
    this.setData({
      goodsIndex: e.detail.value,
      goodsPickerOpen: false
    })
  },
  // 时间选择器
  // 初始时间的点击
  startTimeChange: function (e) {
    var that = this;
    that.setData({
      Startdate: e.detail.value,
      page: 1
    })
    this.getSalesRank();
  },
  // 结束时间的点击
  endTimeChange: function (e) {
    var that = this;
    that.setData({
      Enddate: e.detail.value,
      page: 1
    })
    this.getSalesRank();
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    common.pullLoading();
    common.loading();
    this.setData({
      pageNum: 1,
      nomore: false
    })
    console.log('下拉刷新')
    this.getSalesRank();
  },
  //加载更多
  // onReachBottom: function () {
  //   console.log('加载更多')
  //   common.loading('加载中');
  //   this.setData({
  //     pageNum: this.data.pageNum + 1
  //   })
  //   this.getSalesRank();
  // },
  // 获取商品排行列表
  getSalesRank: function (_param) {
    common.loading('加载中');
    let param = null;
    param = {
      access_token: app.globalData.access_token,
      user_token: app.globalData.user_token,
      // list_rows: this.data.limit,
      // page: this.data.pageNum,
      action: 'store_sales',
      // search_data: this.data.searchContent,
      start_date: this.data.Startdate,
      end_date: this.data.Enddate
    }
    wx.request({
      url: config.sale,
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        wx.hideLoading();
        if (res.data.data && res.data.data.length > 0) {
          let saleList = this.data.saleList;
          if (param.page > 1) {
            // orderList.push(res.data.data)
            saleList = saleList.concat(res.data.data)
          } else {
            saleList = res.data.data;
          }
          this.setData({
            saleList: saleList,
            scrollTop:0
          })
        } else {
          if (param.page == 1) {
            this.setData({
              saleList: []
            })
          } else {
            this.setData({
              nomore: true
            })
          }
        }
      },
      complete: (res) => {
        this.setData({
          ifLoading:false
        })
        wx.hideLoading();
        wx.stopPullDownRefresh() //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },
  onShow: function () {
    if (!this.data.Startdate) {
      this.setData({
        Startdate: common.GetDay(-30),
        Enddate: common.today()
      })
    }
    this.setData({
      member: app.globalData.member
    })
    var param = null;
    if (this.data.pageNum > 1) {
      param = {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        // list_rows: parseInt(this.data.limit * this.data.pageNum),
        // page: 1,
        action: 'store_goods_sales',
        // search_data: this.data.searchContent,
        start_date: this.data.Startdate,
        end_date: this.data.Enddate
      }
    }
    this.getSalesRank(param);
  },
  onLoad: function (options) {
  },
})