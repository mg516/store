const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArr: ['今天', '近7天', '近15天', '全部'],
    selectIndex: 0,
    dataList: [],
    limit:15,
    pageNum: 1,
    ableMoney:'0.00',
  },
  // 切换分类
  checkSelect: function (e) {
    this.setData({
      pageNum: 1,
      selectIndex: e.currentTarget.dataset.index
    })
    this.getAccount()
    console.log(this.data.pageNum)
  },
  getAccount: function () {
    let param = {
      user_token: app.globalData.user_token,
      list_rows: this.data.limit,
      page: this.data.pageNum,
      action: 'list',
      action_type: 2
    }
    if (this.data.selectIndex!=3){
      param.day_type = this.data.selectIndex + 1
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: config.account,
      method: 'POST',
      data: param,
      success: (res) => {
        wx.hideLoading();
        common.hidePullLoading()
        console.log(res)
        let dataList = this.data.dataList;
        if (res.data.data) {
          this.setData({
            ableMoney: (res.data.data.today_return_money).toFixed(2)
          })
          console.log(res.data.data.length)
          if(param.page==1){
            dataList = res.data.data.list;
          }else{
            dataList = dataList.concat(res.data.data.list)
          }
        }else{
          if (param.page == 1) {
            dataList = [];
          }
        }
        if (param.page == 1){
          setTimeout(() => {
            this.setData({
              dataList: dataList
            })
          }, 10)
        }else{
          this.setData({
            dataList: dataList
          })
        }
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