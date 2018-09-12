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
    arr:[],
    idarr:[]
  },
  nextStep:function(){
    
  },
  toSearchList:function(){
    wx.navigateTo({
      url: '../order-search-list/order-search-list',
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
    var that = this;
    // var datas = {
    //   user_token: user_token,
    //   access_token: access_token,
    //   action: 'list',
    //   list_rows: 7,
    //   search_data: that.data.searchContent,
    //   provider_id: app.providerid
    // }
    // //调用接口请求数据
    // that.searchResult(datas)
  },
  //删除搜索
  Delect: function () {
    var searchcontent = this.data.searchContent;
    this.setData({
      showdelect: false,
      searchContent: ''
    })
    // var datas = {
    //   access_token: access_token,
    //   user_token: user_token,
    //   action: 'list',
    //   list_rows: 7,
    //   page: 1
    // }
    // this.searchResult(datas)
  },
  goodsResult:function(e){
    var that = this;
    var searchid = e.currentTarget.dataset.searchid;
    var searchindex = e.currentTarget.dataset.searchindex;
    var searchdatas = that.data.searchdatas;

    var searchname = searchdatas[searchindex].name;
    var searchprice = searchdatas[searchindex].price;
    var searchnumber = searchdatas[searchindex].number;
    that.setData({
      searchid: searchid,
      searchname: searchname,
      searchprice:searchprice,
      searchnumber: searchnumber
    })

    var requestGoodsBack = searchdatas[searchindex];
    wx.setStorageSync('requestGoodsBack', requestGoodsBack);
    wx.navigateBack({
      delta: 1
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
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
  changeNum:function(e){
    wx.showLoading({
      title: '加载中...',
    })
    var curIndex = e.currentTarget.dataset.index;
    var typebar = e.currentTarget.dataset.typebar;
    var goodsList = this.data.goodsList;
    var curGoods = goodsList[curIndex];
    var MinputValue = 0;
    if (typebar == '+'){
      MinputValue = goodsList[curIndex].caigou + 1
    } else if (typebar == '-'){
      MinputValue = goodsList[curIndex].caigou - 1
    }

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
    common.shopcartadd(path, param, app, this, function () {
      wx.hideLoading();
      goodsList[curIndex].caigou = MinputValue;
      this.setData({
        goodsList: goodsList
      })
    });
  },
  getGoodsList:function(){
    var res = {
      "code": 1,
      "msg": "操作成功",
      "data": [
        {
          "id": 38,
          "goods_id": 2,
          "name": "鲁花花生油1.8L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":1
        },
        {
          "id": 37,
          "goods_id": 6,
          "name": "福临门黄金产地玉米油5L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":0
        },
        {
          "id": 38,
          "goods_id": 2,
          "name": "鲁花花生油1.8L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":0
        },
        {
          "id": 37,
          "goods_id": 6,
          "name": "福临门黄金产地玉米油5L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":0
        },
        {
          "id": 38,
          "goods_id": 2,
          "name": "鲁花花生油1.8L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":0
        },
        {
          "id": 37,
          "goods_id": 6,
          "name": "福临门黄金产地玉米油5L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":0
        },
        {
          "id": 38,
          "goods_id": 2,
          "name": "鲁花花生油1.8L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":1
        },
        {
          "id": 37,
          "goods_id": 6,
          "name": "福临门黄金产地玉米油5L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":1
        },
        {
          "id": 38,
          "goods_id": 2,
          "name": "鲁花花生油1.8L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":1
        },
        {
          "id": 37,
          "goods_id": 6,
          "name": "福临门黄金产地玉米油5L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":1
        },
        {
          "id": 38,
          "goods_id": 2,
          "name": "鲁花花生油1.8L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":0
        },
        {
          "id": 37,
          "goods_id": 6,
          "name": "福临门黄金产地玉米油5L",
          "saleprice": "60.00",
          "sold_num": 0,
          "caigou":0
        },
      ],
      "exe_time": "0.034444"
    }
    var goodsList = res.data;
    this.setData({
      goodsList: goodsList
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
    var res = {
      "code": 1,
      "msg": "操作成功",
      "data": [
        {
          "id": 79,
          "code": "",
          "name": "海鲜水产",
          "store_id": 13,
          "list": ""
        },
        {
          "id": 73,
          "code": "",
          "name": "调味调料",
          "store_id": 13,
          "list": [
            {
              "id": 78,
              "code": "",
              "name": "火锅底料"
            },
            {
              "id": 77,
              "code": "",
              "name": "酱菜/腐乳"
            },
            {
              "id": 76,
              "code": "",
              "name": "调味酱/果酱"
            },
            {
              "id": 75,
              "code": "",
              "name": "调味汁/油"
            },
            {
              "id": 74,
              "code": "",
              "name": "调味料"
            }
          ]
        },
        {
          "id": 24,
          "code": "",
          "name": "日用百货",
          "store_id": 13,
          "list": [
            {
              "id": 67,
              "code": "",
              "name": "厨房用品"
            },
            {
              "id": 66,
              "code": "",
              "name": "一次性用品"
            }
          ]
        },
        {
          "id": 23,
          "code": "",
          "name": "速食冻品",
          "store_id": 13,
          "list": [
            {
              "id": 65,
              "code": "",
              "name": "冷藏食品"
            },
            {
              "id": 53,
              "code": "",
              "name": "冻海鲜"
            },
            {
              "id": 52,
              "code": "",
              "name": "冻肉品"
            },
            {
              "id": 51,
              "code": "",
              "name": "冻面点"
            }
          ]
        },
        {
          "id": 6,
          "code": "",
          "name": "新鲜水果",
          "store_id": 13,
          "list": [
            {
              "id": 45,
              "code": "",
              "name": "苹果/梨"
            },
            {
              "id": 44,
              "code": "",
              "name": "桃杏李"
            },
            {
              "id": 43,
              "code": "",
              "name": "柑橘橙柚"
            },
            {
              "id": 42,
              "code": "",
              "name": "西瓜/蜜瓜"
            },
            {
              "id": 41,
              "code": "",
              "name": "草莓/蓝莓"
            },
            {
              "id": 40,
              "code": "",
              "name": "提子/葡萄"
            },
            {
              "id": 39,
              "code": "",
              "name": "热带水果"
            },
            {
              "id": 38,
              "code": "",
              "name": "进口水果"
            },
            {
              "id": 17,
              "code": "",
              "name": "时令水果"
            }
          ]
        },
        {
          "id": 5,
          "code": "",
          "name": "粮油米面",
          "store_id": 13,
          "list": [
            {
              "id": 37,
              "code": "",
              "name": "火腿肠"
            },
            {
              "id": 36,
              "code": "",
              "name": "五谷杂粮"
            },
            {
              "id": 35,
              "code": "",
              "name": "南北干货"
            },
            {
              "id": 34,
              "code": "",
              "name": "食用油"
            },
            {
              "id": 20,
              "code": "",
              "name": "米粉面"
            }
          ]
        },
        {
          "id": 2,
          "code": "",
          "name": "肉禽蛋品",
          "store_id": 13,
          "list": [
            {
              "id": 33,
              "code": "",
              "name": "加工肉片"
            },
            {
              "id": 32,
              "code": "",
              "name": "蛋类"
            },
            {
              "id": 16,
              "code": "",
              "name": "猪肉类"
            },
            {
              "id": 15,
              "code": "",
              "name": "牛羊肉"
            },
            {
              "id": 14,
              "code": "",
              "name": "鸡鸭鹅"
            }
          ]
        },
        {
          "id": 1,
          "code": "",
          "name": "蔬菜豆菇",
          "store_id": 13,
          "list": [
            {
              "id": 31,
              "code": "",
              "name": "盆栽菜"
            },
            {
              "id": 30,
              "code": "",
              "name": "青蛙家健康菜"
            },
            {
              "id": 29,
              "code": "",
              "name": "豆制品"
            },
            {
              "id": 27,
              "code": "",
              "name": "当日鲜蔬菜"
            },
            {
              "id": 26,
              "code": "",
              "name": "本地时蔬"
            },
            {
              "id": 25,
              "code": "",
              "name": "时令必吃"
            },
            {
              "id": 13,
              "code": "",
              "name": "茄果/瓜果"
            },
            {
              "id": 12,
              "code": "",
              "name": "菌菇类"
            },
            {
              "id": 11,
              "code": "",
              "name": "鲜佐料类"
            },
            {
              "id": 10,
              "code": "",
              "name": "豆类"
            },
            {
              "id": 9,
              "code": "",
              "name": "根茎类"
            },
            {
              "id": 8,
              "code": "",
              "name": "叶菜类"
            }
          ]
        }
      ],
      "exe_time": "0.018040"
    }
    var categoryList = res.data;
    console.log(categoryList)
    var curPid = '';
    var curCid = '';
    if (categoryList && categoryList.length>0){
      curPid = categoryList[0].id;
      if (categoryList[0].list && categoryList[0].list.length>0){
        curCid = categoryList[0].list[0].id;
      }
    }
    this.setData({
      categoryList: categoryList,
      curPid: curPid,
      curCid: curCid
    })
    this.getGoodsList();
  },
  onShow:function(){
    this.getCategory();
  },
  onLoad: function (options) {
    if (options.backStatus == 'request') wx.setNavigationBarTitle({title: '选择请货商品'})
    inputModal.inputModal(this, this.MtouchInput, this.MsureInput)
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