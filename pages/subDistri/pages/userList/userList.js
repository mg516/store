const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArr: ['今天', '近7天', '近15天', '近30天'],
    selectIndex: 0,
    customerList: [],
    limit: 15,
    pageNum: 1,
  },
  checkStatus: function (e) {
    let customerList = this.data.customerList;
    let index = e.currentTarget.dataset.index;
    if (customerList[index].ifOpen == true) {
      customerList[index].ifOpen = false;
      this.setData({
        customerList: customerList
      })
      return '';
    }
    for (let i = 0; i < customerList.length; i++)customerList[i].ifOpen = false;
    customerList[index].ifOpen = !customerList[index].ifOpen;
    this.setData({
      customerList: customerList
    })
  },
  getAccount: function () {
    let param = {
      user_token: app.globalData.user_token,
      action: 'customer_list',
      list_rows: this.data.limit,
      page: this.data.pageNum,
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: config.customer,
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        let customerList = this.data.customerList;
        let data = res.data.data;
        if (data) {
          for(let i=0;i<data.length;i++){
            data[i].ifOpen = false;
          }
          if (param.page == 1) {
            customerList = data;
          } else {
            customerList = customerList.concat(data)
          }
        } else {
          if (param.page == 1) {
            customerList = [];
          }
        }
        if (param.page == 1) {
          setTimeout(() => {
            this.setData({
              customerList: customerList
            })
          }, 10)
        } else {
          this.setData({
            customerList: customerList
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