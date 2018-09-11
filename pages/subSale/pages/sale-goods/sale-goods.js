// pages/request-search/request-search.js
const app = getApp();
const common = require('../../../../utils/common.js').common;
const config = require("../../../../utils/config.js").config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifLoading: true,
    showdelect: false,//搜索框的清除开始隐藏
    goodsArray1: [
      { id: '1', name: '精品黑猪肉' },
      { id: '2', name: '精品黄瓜',  },
      { id: '3', name: '精品番茄', },
      { id: '4', name: '精品西红柿', },
      { id: '5', name: '精品大豆油', },
      { id: '6', name: '精品黄瓜瓜瓜',  }
    ],
    saleList1: [
      { id: '1', name: '精品黑猪肉精品黑猪肉精品黑猪肉精品黑猪肉精品黑猪肉精品黑猪肉', code: '13541315384314', num: 961354, payOff: 12, kucun: 986321 },
      { id: '2', name: '精品黄瓜精品', code: '13541315384314', num: 961354, payOff: 12, kucun: 19863.21 },
      { id: '3', name: '精品番茄', code: '13541315384314', num: 961354, payOff: 12, kucun: 19863.21 },
      { id: '4', name: '精品西红柿', code: '13541315384314', num: 961354, payOff: 12, kucun: 19863.21 },
      { id: '5', name: '精品大豆油', code: '13541315384314', num: 961354, payOff: 12, kucun: 19863.21 },
      { id: '5', name: '精品大豆油', code: '13541315384314', num: 961354, payOff: 12, kucun: 19863.21 },
      { id: '5', name: '精品大豆油', code: '13541315384314', num: 961354, payOff: 12, kucun: 19863.21 },
      { id: '5', name: '精品大豆油', code: '13541315384314', num: 961354, payOff: 12, kucun: 19863.21 },
      { id: '6', name: '精品黄瓜瓜瓜', code: '13541315384314', num: 961354, payOff: 12, kucun: 19863.21 },
      { id: '6', name: '精品黄瓜瓜瓜', code: '13541315384314', num: 961354, payOff: 12, kucun: 19863.21 },
      { id: '6', name: '精品黄瓜瓜瓜', code: '13541315384314', num: 961354, payOff: 12, kucun: 19863.21 },
      { id: '6', name: '精品黄瓜瓜瓜', code: '13541315384314', num: 961354, payOff: 12, kucun: 19863.21 }
    ],
    goodsIndex:0,
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
  cancelPicker:function(){
    this.setData({
      goodsPickerOpen: false
    })
  },
  changePickerStatus:function(){
    this.setData({
      goodsPickerOpen: !this.data.goodsPickerOpen
    })
  },
  changeGoods:function(e){
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
      page:1
    })
    this.getGoodsRank();
  },
  // 结束时间的点击
  endTimeChange: function (e) {
    var that = this;
    that.setData({
      Enddate: e.detail.value,
      page:1
    })
    this.getGoodsRank();
  },
  // 条件查询
  getSearchOrderList: function () {
    this.setData({
      pageNum: 1,
      nomore: false
    })
    console.log('条件查询')
    this.getGoodsRank();
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
      searchContent: '',
      pageNum: 1,
      nomore: false
    })
    console.log('删除条件查询')
    this.getGoodsRank();
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
    this.getGoodsRank();
  },
  //加载更多
  onReachBottom: function () {
    console.log('加载更多')
    common.loading('加载中');
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.getGoodsRank();
  },
  // 获取商品排行列表
  getGoodsRank: function (_param){
    common.loading('加载中');
    let param = null;
    if (!_param) {
      param = {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        list_rows: this.data.limit,
        page: this.data.pageNum,
        action: 'store_goods_sales',
        search_data: this.data.searchContent,
        start_time: this.data.Startdate,
        end_time: this.data.Enddate,
        time_type:1
      }
    } else {
      param = _param;
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
            saleList: saleList
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
    var param = null;
    if (this.data.pageNum > 1) {
      param = {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        list_rows: parseInt(this.data.limit * this.data.pageNum),
        page: 1,
        action: 'store_goods_sales',
        search_data: this.data.searchContent,
        start_time: this.data.Startdate,
        end_time: this.data.Enddate
      }
    }
    this.getGoodsRank(param);
  },
  onLoad: function (options) {
  },
})