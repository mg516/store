// pages/request-add/request-add.js
const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
var goodsData = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData:[],
    idarr:[], 
  },
  
  //提交
  Submit: function () {
    wx.showModal({
      title: '提交前,请确认信息无误',
      content: '(提交后信息不可修改)',
      cancelColor: '#F97D47',
      cancelText: '我再想想',
      confirmText: '提交',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 获取光标跳转
  goToSearch: function () {
    let backStatus = 'request';
    wx.navigateTo({
      url: `/pages/common/pages/search-goods-all/search-goods-all?backStatus=${backStatus}`
    })
  },
  // 编辑备注
  keyRemark:function(e){
    console.log(e.detail.value);
    this.setData({
      remark: e.detail.value
    })
    wx.setStorageSync('requestRemark', e.detail.value)
  },
  // 修改请货商品数量
  inputNumber:function(e){
    let num = common.pattNumFunc(e.detail.value,2);//保留两位小数
    var index = e.currentTarget.dataset.index;
    var requestGoods = this.data.requestGoods;
    if (!isNaN(num) && num){
      requestGoods[index].needNum = num;
      requestGoods[index].totalMoney = (num * requestGoods[index].price).toFixed(2);
    } else if (!num){
      requestGoods[index].needNum = null;
      requestGoods[index].totalMoney = null;
    } else {
      return '';
    }
    wx.setStorageSync('requestGoods', requestGoods);
    this.setData({
      requestGoods: requestGoods
    })
    this.countMoney();
  },
  
  // 删除商品
  delGoods: function (e) {
    var index = e.currentTarget.dataset.index;
    var requestGoods = this.data.requestGoods;
    wx.showModal({
      title: '提示',
      content: '是否要删除选中商品',
      cancelColor: '#F97D47',
      cancelText: '取消',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          requestGoods.splice(index, 1);
          wx.setStorageSync('requestGoods', requestGoods);
          this.setData({
            requestGoods: requestGoods
          })
          this.countMoney();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 计算金额
  countMoney:function(){
    let requestGoods = this.data.requestGoods;
    let totalMoney = 0;
    for (let i = 0; i < requestGoods.length; i++){
      let price = parseFloat(requestGoods[i].price);
      let needNum = parseFloat(requestGoods[i].needNum);
      requestGoods[i].totalMoney = parseFloat((price * needNum).toFixed(2));
      totalMoney += (requestGoods[i].totalMoney);
    }
    totalMoney = common.pattNumFunc((totalMoney).toString(), 2);
    this.setData({
      requestGoods: requestGoods,
      totalMoney: totalMoney,//保留两位小数
    })
  },
  onShow: function () {
    var storageData = wx.getStorageSync('requestGoods') || '';
    var storageRemark = wx.getStorageSync('requestRemark') || '';
    
    this.setData({
      requestGoods: storageData,
      remark: storageRemark
    })
    this.countMoney()
  },
  onLoad: function (options) {
    this.setData({
      member: app.globalData.member
    })
  }
})
