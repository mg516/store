// pages/subVip/pages/vipList/vipList.js
const app = getApp();
const common = require('../../../../utils/common.js').common;
const config = require("../../../../utils/config.js").config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  // 条件查询
  getSearchOrderList: function () {
    this.setData({
      pageNum: 1,
      nomore: false
    })
    console.log('条件查询')
    this.getGoodsRank();
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
  //点击搜索
  searchText: function (e) {
    var that = this;
  },
  //删除搜索
  Delect: function () {
    var searchcontent = this.data.searchContent;
    this.setData({
      showdelect: false,
      searchContent: ''
    })
  },
  // 新增订单
  toAddOrder:function(e){
    let name = e.currentTarget.dataset.name;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/subOrder/pages/order-add/order-add?name=${name}&id=${id}`,
    })
  },
  // 拨号
  callphone:function(e){
    let phoneNum = e.currentTarget.dataset.phonenum;
    wx.makePhoneCall({
      phoneNumber: phoneNum 
    })
  },
  // 新增会员
  addUser:function(){
    wx.navigateTo({
      url: `/pages/subVip/pages/vipAdd/vipAdd`,
    })
  },
  onPullDownRefresh: function () {
    common.pullLoading();
    common.loading();
    console.log('下拉刷新')
    // this.getOrderList();
  },
  // 会员详情
  userDetail:function(e){
    let name = e.currentTarget.dataset.name;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/subVip/pages/vipDetail/vipDetail?id=${id}&name=${name}`
    })
  },
  getUserList:function(){
    let userList = [
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三张三张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
      { name: '张三', phone: '18866669999',id:'1' },
    ];
    this.setData({
      userList: userList
    })
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
    this.getUserList();
  },
  onPullDownRefresh: function () {
    console.log('下拉')
  },
  onReachBottom: function () {
    console.log('上拉')
  },
})