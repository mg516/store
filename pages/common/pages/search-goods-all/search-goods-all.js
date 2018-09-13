// pages/request-search/request-search.js
const inputModal = require('../../../../utils/inputModal/inputModal.js');
const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdelect: false,//搜索框的清除开始隐藏
    searchdatas:[
      {id:'1',name:'精品黑猪肉',price:'70.00',store:'500',yesterday:'1200',number:'1234567890123'},
      { id: '2', name: '精品黄瓜', price: '60.00', store: '500', yesterday: '1200', number: '1234567890123'},
      { id: '3', name: '精品番茄', price: '50.00', store: '500', yesterday: '1200', number: '1234567890123'},
      { id: '4', name: '精品西红柿', price: '40.00', store: '500', yesterday: '1200', number: '1234567890123'},
      { id: '5', name: '精品大豆油', price: '30.00', store: '500', yesterday: '1200', number: '1234567890123'},
      { id: '6', name: '精品黄瓜瓜瓜', price: '20.00', store: '500', yesterday: '1200', number: '1234567890123'}
    ],
    limit:10,
    pageNum:1,
    arr:[],
    idarr:[],
    categoryList:[],
  },
  nextStep:function(){
    
  },
  toSearchList:function(){
    wx.navigateTo({
      url: '/pages/subOrder/pages/order-search-list/order-search-list',
    })
  },
  //搜索绑定
  getSearchContent: function (event) {
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
    let searchContent = (this.data.searchContent).replace(/\s/g,'');
    var that = this;
    this.setData({
      ifSearchCommit: searchContent ? true : false
    })
  },
  //删除搜索
  Delect: function () {
    var searchcontent = this.data.searchContent;
    this.setData({
      showdelect: false,
      searchContent: '',
      ifSearchCommit:false
    })
  },
  goodsResult:function(e){
    // var that = this;
    // var searchid = e.currentTarget.dataset.searchid;
    // var searchindex = e.currentTarget.dataset.searchindex;
    // var searchdatas = that.data.searchdatas;

    // var searchname = searchdatas[searchindex].name;
    // var searchprice = searchdatas[searchindex].price;
    // var searchnumber = searchdatas[searchindex].number;
    // that.setData({
    //   searchid: searchid,
    //   searchname: searchname,
    //   searchprice:searchprice,
    //   searchnumber: searchnumber
    // })
    let chooseType = this.data.chooseType;
    if (chooseType == 'request') {
      wx.setStorageSync('requestGoods', this.data.storageData)
    }
    wx.navigateBack({
      delta: 1
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getCategory();
    setTimeout(function () {
      // function()
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  //加载更多
  onReachBottom: function () {
    console.log('加载更多')
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  },
  // 修改商品数量
  changeNum:function(e){
    // wx.showLoading({
    //   title: '加载中...',
    // })
    var curIndex = e.currentTarget.dataset.index;
    var typebar = e.currentTarget.dataset.typebar;
    var goodsList = this.data.goodsList;
    var MinputValue = 0;
    if (typebar == '+'){
      goodsList[curIndex].needNum = goodsList[curIndex].needNum + 1 || 1
    } else if (typebar == '-'){
      goodsList[curIndex].needNum = goodsList[curIndex].needNum - 1
    }
    this.saveStorage(goodsList[curIndex]);
    this.setData({ goodsList: goodsList})
  },
  // 把数据变更存入缓存
  saveStorage:function(goodsData){
    let chooseType = this.data.chooseType;
    let storageData = this.data.storageData;
    for (let i = 0; i < storageData.length;i++){
      if (storageData[i].id == goodsData.id){
        storageData[i] = goodsData;
        break;
      }
      if (i >= storageData.length){
        storageData.push(goodsData)
      }
    }
    if (storageData.length <= 0) storageData.push(goodsData)
    this.setData({
      storageData: storageData
    })
  },
  getGoodsList:function(){
    let param = {
      access_token: app.globalData.access_token,
      user_token: app.globalData.user_token,
      list_rows: this.data.limit,
      page: this.data.pageNum,
      action: 'list'
    }
    wx.request({
      url: config.goods,
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        wx.hideLoading();
        if (res.data.data && res.data.data.length > 0) {
          var goodsList = this.data.goodsList;
          if (param.page > 1) {
            goodsList = goodsList.concat(res.data.data)
          } else {
            goodsList = res.data.data;
          }
          this.setData({
            goodsList: goodsList
          })
        } else {
          if (param.page == 1) {
            this.setData({
              goodsList: []
            })
          } else {
            this.setData({
              nomore: true
            })
          }
        }
      },
      complete: () => {
        wx.hideLoading();
        wx.stopPullDownRefresh() //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        this.setData({
          ifLoad: true,
          ifOnce: false
        })
      }
    })
  },
  chooseC: function (e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      curCid: id
    })
    this.getGoodsList();
  },
  chooseP: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var categoryList = this.data.categoryList;
    var curCid = '';
    if (categoryList[index].list && categoryList[index].list.length>0){
      curCid = categoryList[index].list[0].id;
    }
    this.setData({
      curPid: id,
      curCid: curCid
    })
    this.getGoodsList();
  },
  // 获取分类列表
  getCategory:function(){
    let param = {
      access_token: app.globalData.access_token,
      user_token: app.globalData.user_token,
      action: 'list_all'
    };
    wx.request({
      url: config.category,
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        wx.hideLoading();
        if (res.data.data && res.data.data.length > 0) {
          let categoryList = this.countCateData(res.data.data);
          let curPid = this.data.curPid || '';
          let curCid = this.data.curCid || '';
          if (categoryList && categoryList.length > 0 && !curPid && !curCid) {
            curPid = categoryList[0].id;
            if (categoryList[0].list && categoryList[0].list.length > 0) {
              curCid = categoryList[0].list[0].id;
            }
          }
          this.setData({
            curPid: curPid,
            curCid: curCid,
            categoryList: categoryList
          })
          this.getGoodsList();
        }
      }
    })
  },
  // 处理接口一次性返回的分类数据
  countCateData: function (_list){
    let arr = [];
    let list = _list;
    for (let i = 0; i < list.length; i++){
      if (list[i].pid == 0){
        arr.push(list[i])
        arr[arr.length-1].list = [];
      }
    }
    for (let i = 0; i < arr.length; i++){
      for (let j = 0; j < list.length; j++){
        if (arr[i].id == list[j].pid){
          arr[i].list.push(list[j]);
        }
      }
    }
    return arr;
  },
  onShow:function(){
  },
  onLoad: function (options) {
    if (options.backStatus == 'request') {
      wx.setNavigationBarTitle({title: '选择请货商品'});
      this.setData({ 
        chooseType:'request',
        storageData: wx.getStorageSync('requestGoods')||[]
      })
    }
    inputModal.inputModal(this, this.MtouchInput, this.MsureInput)
    this.getCategory();
  },
  // 点击输入框回调
  MtouchInput: function (e) {
    var curIndex = e.currentTarget.dataset.index;
    this.setData({
      curIndex: curIndex,
    })
  },
  // 输入框确认回调
  MsureInput: function (MinputValue) {
    var curIndex = this.data.curIndex;
    var goodsList = this.data.goodsList;
    var curGoods = goodsList[curIndex];
    
    // 根据条码获取商品信息
    let path = config.shopcartadd;
    let param = {
      num: MinputValue,
      sign: app.globalData.sign,
      openid: app.globalData.openid,
      goods_id: curGoods.goods_id,
      md_goods_id: curGoods.md_goods_id,
      unit_id: curGoods.unit_id,
      unit: curGoods.unit,
      goods_price: curGoods.goods_price,
      origin: 0
    }
    // 加入购物车
    common.shopcartadd(path, param, app, this, function(){
      wx.hideLoading();
      goodsList[curIndex].caigou = MinputValue;
      this.setData({
        goodsList: goodsList
      })
    });
  }

})