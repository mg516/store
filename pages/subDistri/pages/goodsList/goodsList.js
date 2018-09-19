const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[
      { name: '宁夏奶白菜300g', text: '超甜的白菜', price: '9.5', zhuan: '0.28', unit: '份', saleNum: '225' },
      { name: '宁夏奶白菜300g', text: '超甜的白菜', price: '9.5', zhuan: '0.28', unit: '份', saleNum: '225' },
      { name: '宁夏奶白菜300g', text: '超甜的白菜', price: '9.5', zhuan: '0.28', unit: '份', saleNum: '225' },
      { name: '宁夏奶白菜300g', text: '超甜的白菜', price: '9.5', zhuan: '0.28', unit: '份', saleNum: '225' },
      { name: '宁夏奶白菜300g', text: '超甜的白菜', price: '9.5', zhuan: '0.28', unit: '份', saleNum: '225' },
      { name: '宁夏奶白菜300g', text: '超甜的白菜', price: '9.5', zhuan: '0.28', unit: '份', saleNum: '225' },
      { name: '宁夏奶白菜300g', text: '超甜的白菜', price: '9.5', zhuan: '0.28', unit: '份', saleNum: '225' },
      { name: '宁夏奶白菜300g', text: '超甜的白菜', price: '9.5', zhuan: '0.28', unit: '份', saleNum: '225' },
      { name: '宁夏奶白菜300g', text: '超甜的白菜', price: '9.5', zhuan: '0.28', unit: '份', saleNum: '225' },
      { name: '宁夏奶白菜300g', text: '超甜的白菜', price: '9.5', zhuan: '0.28', unit: '份', saleNum: '225' },
    ]
  },
  //搜索绑定
  searchContent: function (event) {
    if (event.detail.value) {
      this.setData({
        showdelect: true,
        searchContent: event.detail.value
      })
    } else {
      this.setData({
        showdelect: false,
      })
    }
  },
  //删除搜索
  Delect: function () {
    var searchcontent = this.data.searchContent;
    this.setData({
      showdelect: false,
      searchContent: '',
      pageNum: 1,
      nomore: false
    })
    console.log('删除条件查询')
  },
  shareGoods:function(){
    this.onShareAppMessage()
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

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