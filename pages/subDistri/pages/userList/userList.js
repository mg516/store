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
    userList: [
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '200.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '1350.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '5600', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '200.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '200.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '200.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '200.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '200.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '200.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '200.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '200.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '200.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
      { name: '苗刚', time: '2018-08-08',payTime: '2018-08-08 14:00', money: '200.5', ifOpen: false,status:'已绑定',offerMoney:520.2 },
    ],
    pageNum: 1,
  },

  checkStatus: function (e) {
    let userList = this.data.userList;
    let index = e.currentTarget.dataset.index;
    for (let i = 0; i < userList.length; i++)userList[i].ifOpen = false;
    userList[index].ifOpen = !userList[index].ifOpen;
    this.setData({
      userList: userList
    })
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