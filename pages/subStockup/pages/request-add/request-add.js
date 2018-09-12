// pages/request-add/request-add.js
const common = require('../../../../utils/common.js').common;
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
  inputNumber:function(e){
    var num = e.detail.value;
    var index = e.currentTarget.dataset.index;
    var requestGoods = this.data.requestGoods;
    if(num){
      requestGoods[index].num = num;
      requestGoods[index].totalMoney = (num * requestGoods[index].price).toFixed(2);
    }else{
      requestGoods[index].num = null;
      requestGoods[index].totalMoney = null;
    }
    this.setData({
      requestGoods: requestGoods
    })
    wx.setStorageSync('requestGoods', requestGoods);
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
          this.setData({
            requestGoods: requestGoods
          })
          wx.setStorageSync('requestGoods', requestGoods);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShow: function () {
    var requestGoodsBack = wx.getStorageSync('requestGoodsBack') || '';
    var requestGoods = wx.getStorageSync('requestGoods') || '';
    if (requestGoodsBack) {
      if (requestGoods) {
        for (let i = 0; i < requestGoods.length; i++) {
          if (requestGoods[i].id == requestGoodsBack.id) {
            common.tip('选中的商品已存在', 'none');
            this.setData({
              scrollToThere: 'scroll' + i
            })
            break;
          }
          if (i >= requestGoods.length - 1) {
            requestGoods.push(requestGoodsBack);
            break;
          }
        }
      } else {
        requestGoods = [requestGoodsBack];
      }
    }
    wx.removeStorageSync('requestGoodsBack');
    wx.setStorageSync('requestGoods', requestGoods);
    this.setData({
      requestGoods: requestGoods
    })
  },
  onLoad: function (options) {
    
  },

})
