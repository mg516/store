// pages/request-add/request-add.js
const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
var goodsData = []
Page({
  data: {
    goodsData:[],
    idarr:[],
    senddate:'' 
  },
  // 扫码添加商品
  codeAddGoods:function(){
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode'],
      success: (res) => {
        // common.loading('加载中');
        console.log(res.result);
        this.searchGoods(res.result);
      },
      fail: (res) => {
        console.log(res);
        if (res.errMsg == 'scanCode:fail cancel') {
          console.log('取消扫码')
        } else if (res.errMsg == 'scanCode:fail') {
          wx.showToast({
            title: '请识别正确的二维码',
            icon: 'none'
          })
        }
      }
    })
  },
  searchGoods: function (_code) {
    wx.request({
      url: config.goods,
      method: "POST",
      data: {
        user_token: app.globalData.user_token,
        action: 'info',
        sweep: 1,
        code: _code
      },
      success: (res) => {
        console.log(res.data)
        if (res.data.data) {
          let curGoods = res.data.data;
          let requestGoods = this.data.requestGoods;
          for (let i = 0; i < requestGoods.length; i++) {
            if (requestGoods[i].bar_code == curGoods.bar_code) {
              this.setData({
                scrollToThere: 'scroll' + i
              })
              setTimeout(() => {
                this.setData({ scrollToThere: null })
              }, 500)
              common.tip('该商品已存在','none')
              break;
            }
            if (i >= requestGoods.length - 1) {
              console.log(i)
              requestGoods.push(curGoods);
              wx.setStorageSync('requestGoods', requestGoods);
              this.setData({
                requestGoods: requestGoods,
                scrollToThere: 'scroll' + (i + 1)
              })
              setTimeout(() => {
                this.setData({ scrollToThere: null })
              }, 500)
              this.countMoney();
              break;
            }
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '没有获取到商品信息，请重试',
            showCancel: false
          })
        }
      }
    })
  },
  //提交
  Submit: function () {
    let senddate = this.data.senddate;
    if (!senddate) {
      common.tip('请选择配送时间', 'none');
      this.setData({scrollTop: 0}); return;
    }
    let requestGoods = this.data.requestGoods;
    if (requestGoods.length > 0) {
      for (let i = 0; i < requestGoods.length; i++) {
        if (!requestGoods[i].needNum || parseFloat(requestGoods[i].needNum) <= 0 || !requestGoods[i].total_price || parseFloat(requestGoods[i].total_price) <= 0) {
          common.tip('信息不合法 或 不完整', 'none');
          this.setData({
            scrollToThere: 'scroll' + i
          })
          setTimeout(()=>{
            this.setData({ scrollToThere: null })
          },500)
          return;
        }
      }
    } else if (!requestGoods || requestGoods.length <= 0) {
      common.tip('请选择报损商品', 'none');
      return
    }
    wx.showModal({
      title: '提交前,请确认信息无误',
      content: '(提交后信息不可修改)',
      cancelColor: '#F97D47',
      cancelText: '我再想想',
      confirmText: '提交',
      success: (res) => {
        if (res.confirm) {
          this.submitFunc()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  submitFunc:function(){
    wx.request({
      url: config.request,
      method: "POST",
      data: {
        user_token: app.globalData.user_token,
        action: 'add',
        total: this.data.totalMoney,
        content: this.data.remark,
        goods: this.data.requestGoods,
        direct_supply: this.data.direct_supply
      },
      success: (res) => {
        console.log(res.data)
        
      }
    })
  },
  // 选择配送时间
  sendTimeChange: function (e) {
    var that = this;
    that.setData({
      senddate: e.detail.value
    })
    wx.setStorageSync('senddate', e.detail.value)
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
  // 编辑请货商品描述
  inputRemark:function(e){
    var index = e.currentTarget.dataset.index;
    var requestGoods = this.data.requestGoods;
    requestGoods[index].remark = e.detail.value;
    wx.setStorageSync('requestGoods', requestGoods);
    this.setData({
      requestGoods: requestGoods
    })
    this.countMoney();
  },
  // 修改请货商品数量
  inputNumber:function(e){
    let num = common.pattNumFunc(e.detail.value,2);//保留两位小数
    var index = e.currentTarget.dataset.index;
    var requestGoods = this.data.requestGoods;
    if (!isNaN(num) && num){
      requestGoods[index].needNum = num;
      requestGoods[index].total_price = (num * requestGoods[index].price).toFixed(2);
    } else if (!num){
      requestGoods[index].needNum = null;
      requestGoods[index].total_price = null;
    } else {
      console.log('输入数量不合法');
    }
    wx.setStorageSync('requestGoods', requestGoods);
    this.setData({
      requestGoods: requestGoods
    })
    this.countMoney();
  },
  // 商品备注
  inputText: function (e) {
    var index = e.currentTarget.dataset.index;
    var typeval = e.currentTarget.dataset.typeval;
    var requestGoods = this.data.requestGoods;
    if (typeval == 'key4') {
      requestGoods[index].remark = e.detail.value;
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
      let needNum = parseFloat(requestGoods[i].needNum||0);
      requestGoods[i].total_price = parseFloat((price * needNum).toFixed(2));
      totalMoney += (requestGoods[i].total_price);
    }
    totalMoney = common.pattNumFunc((totalMoney).toString(), 2);
    this.setData({
      requestGoods: requestGoods,
      totalMoney: totalMoney,//保留两位小数
    })
  },
  onShow: function () {
    var storageData = wx.getStorageSync('requestGoods') || '';
    var storageRemark = wx.getStorageSync('requestRemark') || '';//备注
    var senddate = wx.getStorageSync('senddate') || '';//配送时间
    
    this.setData({
      requestGoods: storageData,
      remark: storageRemark,
      senddate: senddate
    })
    this.countMoney()
  },
  onLoad: function (options) {
    this.setData({
      member: app.globalData.member,
      direct_supply: options.direct_supply
    })
  }
})
