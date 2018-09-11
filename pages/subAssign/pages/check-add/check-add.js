// pages/check-add/check-add.js
const common = require('../../../../utils/common.js').common;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取光标跳转
  goToSearch: function () {
    wx.navigateTo({
      url: '../check-search/check-search',
    })
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
          //console.log('用户点击取消')
        }
      }
    })
  },
  // 库存
  changeKucun: function (e) {
    var num = e.detail.value;
    var index = e.currentTarget.dataset.index;
    var curGoods = this.data.curGoods;
    if (num) {
      curGoods[index].kucun = num;
    } else {
      curGoods[index].kucun = null;
    }
    this.setData({
      curGoods: curGoods
    })
    wx.setStorageSync('pandian', curGoods);
  },
  // 金额
  changeMoney: function (e) {
    var num = e.detail.value;
    var index = e.currentTarget.dataset.index;
    var curGoods = this.data.curGoods;
    if (num) {
      curGoods[index].money = num;
    } else {
      curGoods[index].money = null;
    }
    this.setData({
      curGoods: curGoods
    })
    wx.setStorageSync('pandian', curGoods);
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
          wx.setStorageSync('pandian', curGoods);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShow: function () {
    var checkGoodsBack = wx.getStorageSync('checkGoodsBack') || '';
    var curGoods = wx.getStorageSync('pandian') || '';
    if (checkGoodsBack) {
      if (curGoods && curGoods.length>0) {
        for (let i = 0; i < curGoods.length; i++) {
          if (curGoods[i].id == checkGoodsBack.id) {
            common.tip('选中的商品已存在', 'none');
            this.setData({
              scrollToThere: 'scroll' + i
            })
            break;
          }
          if (i >= curGoods.length - 1) {
            curGoods.push(checkGoodsBack);
            break;
          }
        }
      } else {
        curGoods = [checkGoodsBack];
      }
    }
    wx.removeStorageSync('checkGoodsBack');
    wx.setStorageSync('pandian', curGoods);
    this.setData({
      curGoods: curGoods
    })
  },
  onLoad: function (options) {

  },

})
