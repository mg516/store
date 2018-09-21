const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    limit: 20,
    pageNum: 1,
  },
  getAccount: function () {
    let param = {
      user_token: app.globalData.user_token,
      list_rows: this.data.limit,
      page: this.data.pageNum,
      action: 'list'
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: config.account,
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        let dataList = this.data.dataList;
        if (res.data.data) {
          if (param.page == 1) {
            dataList = res.data.data.list;
          } else {
            dataList = dataList.concat(res.data.data.list)
          }
        } else {
          if (param.page == 1) {
            dataList = [];
          }
        }
        if (param.page == 1) {
          setTimeout(() => {
            this.setData({
              dataList: dataList
            })
          }, 10)
        } else {
          this.setData({
            dataList: dataList
          })
        }
      },
      complete: (res) => {
        wx.hideLoading();
        common.hidePullLoading()
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
    this.getAccount();
    console.log(this.data.pageNum)
  },
  onPullDownRefresh: function () {
    common.pullLoading()
    this.setData({
      pageNum: 1
    })
    this.getAccount();
    console.log(this.data.pageNum)
  }
})