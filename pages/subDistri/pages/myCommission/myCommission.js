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
    dataList: [
      { name: '收入-客单', time: '2018-08-08 14:00', money: '200.5', ifIn: true },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '1350.5', ifIn: true },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '5600', ifIn: false },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '200.5', ifIn: true },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '200.5', ifIn: true },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '200.5', ifIn: true },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '200.5', ifIn: true },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '200.5', ifIn: true },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '200.5', ifIn: true },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '200.5', ifIn: true },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '200.5', ifIn: true },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '200.5', ifIn: true },
      { name: '收入-客单', time: '2018-08-08 14:00', money: '200.5', ifIn: true },
    ],
    pageNum: 1,
  },
  checkSelect: function (e) {
    this.setData({
      pageNum: 1,
      selectIndex: e.currentTarget.dataset.index
    })
    let dataList = this.data.dataList;
    this.setData({
      dataList:{}
    })
    setTimeout(()=>{
      this.setData({
        dataList: dataList
      })
    }, 10)
    console.log(this.data.pageNum)
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onReachBottom: function () {
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    console.log(this.data.pageNum)
  },
  onPullDownRefresh: function () {
    common.pullLoading()
    this.setData({
      pageNum: 1
    })
    console.log(this.data.pageNum)
  }
})