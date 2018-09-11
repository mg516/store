// pages/request-add/request-add.js
const common = require('../../../../utils/common.js').common;
const inputModal = require('../../../../utils/inputModal/inputModal.js');
var goodsData = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: [],
    idarr: [],
    curGoods: [{ "id": "1", "name": "精品黑猪肉", "price": "70.00", "store": "500", "yesterday": "1200", "number": "1234567890123" }, { "id": "2", "name": "精品黄瓜", "price": "60.00", "store": "500", "yesterday": "1200", "number": "1234567890123" }, { "id": "4", "name": "精品西红柿", "price": "40.00", "store": "500", "yesterday": "1200", "number": "1234567890123" }]
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
          wx.request({
            url: config.order,
            method: 'POST',
            data: {
              access_token: app.globalData.access_token,
              user_token: app.globalData.user_token,
              action: 'add',
              goods: order_stutas
            },
            success: (res) => {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 获取光标跳转
  goToSearch: function () {
    console.log('000')
    wx.navigateTo({
      url: '/pages/subOrder/pages/order-search/order-search'
    })
  },
  inputNumber: function (e) {
    var num = e.detail.value;
    var index = e.currentTarget.dataset.index;
    var curGoods = this.data.curGoods;
    if (num) {
      curGoods[index].num = num;
      curGoods[index].totalMoney = (num * curGoods[index].price).toFixed(2);
    } else {
      curGoods[index].num = null;
      curGoods[index].totalMoney = null;
    }
    this.setData({
      curGoods: curGoods
    })
    wx.setStorageSync('curGoods', curGoods);
  },

  // 删除商品
  delGoods: function (e) {
    var index = e.currentTarget.dataset.index;
    var curGoods = this.data.curGoods;
    wx.showModal({
      title: '提示',
      content: '是否要删除选中商品',
      cancelColor: '#F97D47',
      cancelText: '取消',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          curGoods.splice(index, 1);
          this.setData({
            curGoods: curGoods
          })
          wx.setStorageSync('curGoods', curGoods);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  changeNum:function(e){
    var index = e.currentTarget.dataset.index;
    var curGoods = this.data.curGoods;
    if (curGoods && curGoods.length>0){
      for (let i = 0; i < curGoods.length;i++){
        
      }
    }
    wx.setStorageSync('curGoods', curGoods);
  },
  countData:function(){

  },
  onShow: function () {
    var requestGoodsBack = wx.getStorageSync('requestGoodsBack') || '';
    var curGoods = wx.getStorageSync('curGoods') || '';
    if (requestGoodsBack) {
      if (curGoods) {
        for (let i = 0; i < curGoods.length; i++) {
          if (curGoods[i].id == requestGoodsBack.id) {
            common.tip('选中的商品已存在', 'none');
            this.setData({
              scrollToThere: 'scroll' + i
            })
            break;
          }
          if (i >= curGoods.length - 1) {
            curGoods.push(requestGoodsBack);
            break;
          }
        }
      } else {
        curGoods = [requestGoodsBack];
      }
    }
    wx.removeStorageSync('requestGoodsBack');
    // wx.setStorageSync('curGoods', curGoods);
    this.setData({
      curGoods: [{ "id": "1", "name": "精品黑猪肉", "price": "70.00", "store": "500", "yesterday": "1200", "number": "1234567890123" }, { "id": "2", "name": "精品黄瓜", "price": "60.00", "store": "500", "yesterday": "1200", "number": "1234567890123" }, { "id": "4", "name": "精品西红柿", "price": "40.00", "store": "500", "yesterday": "1200", "number": "1234567890123" }]
    })
  },
  onLoad: function (options) {
    inputModal.inputModal(this, this.MtouchInput, this.MsureInput)
  },
  // 点击输入框回调
  MtouchInput:function(e){
    var curIndex = e.currentTarget.dataset.index;
    this.setData({
      curIndex: curIndex,
    })
  },
  // 输入框确认回调
  MsureInput: function (MinputValue){
    var curIndex = this.data.curIndex;
    var curGoods = this.data.curGoods;
    curGoods[curIndex].num = MinputValue;
    this.setData({
      curGoods: curGoods
    })
    wx.setStorageSync('curGoods', curGoods);
  }
})
