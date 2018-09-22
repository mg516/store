const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit: 10,
    pageNum: 1,
    goodsList:[]
  },
  getSearchOrderList:function(){
    this.setData({
      pageNum: 1,
      nomore: false
    })
    this.getAccount()
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
    this.getAccount()
  },
  // 推广，跳转至商城小程序
  shareGoods:function(e){
    let id = e.currentTarget.dataset.id;
    if(!id)return '';
    console.log(id)
    wx.navigateToMiniProgram({
      // appId:'wx3dcd06a59742ce6d',
      appId:'wxe4f4b3386a5825af',
      path: `/pages/index/index?sign=${app.globalData.sign}&id=${id}`,
      // extraData: { "id":719 },
      envVersion: 'develop',
      success: (res) => {
        console.log(res)
      }
    })
  },
  getAccount: function () {
    let param = {
      user_token: app.globalData.user_token,
      list_rows: this.data.limit,
      page: this.data.pageNum,
      action: 'goods_price',
      search_data: this.data.searchContent
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: config.goods,
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        common.hidePullLoading();
        let goodsList = this.data.goodsList;
        if (res.data.data) {
          console.log(res.data.data.length)
          if (param.page == 1) {
            goodsList = res.data.data;
          } else {
            goodsList = goodsList.concat(res.data.data)
          }
        } else {
          if (param.page == 1) {
            goodsList = [];
          }
        }
        if (param.page == 1) {
          this.setData({ goodsList: [] })
          setTimeout(() => {
            this.setData({ goodsList: goodsList })
          }, 10)
        } else {
          this.setData({
            goodsList: goodsList
          })
        }
      },
      complete: (res) => {
        this.setData({
          ifLoad:true
        })
      }
    })
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getAccount()
  },
  onReachBottom: function () {
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    console.log(this.data.pageNum)
    this.getAccount();
  },
  onPullDownRefresh: function () {
    common.pullLoading()
    this.setData({
      pageNum: 1
    })
    console.log(this.data.pageNum)
    this.getAccount();
  }
})