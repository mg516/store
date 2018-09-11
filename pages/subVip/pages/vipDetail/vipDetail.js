// pages/subVip/pages/vipDetail/vipDetail.js
Page({
  data: {
    chooselistData: [{ name: '会员详情', id: 0 }, { name: '会员地址', id: 1 }, { name: '会员订单', id: 2 }],
    activeIndex: 0,
  },
  //选项卡列表类型切换
  ChooseList: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index,
      pageNum: 1
    })
    // this.goodsRequest()
  },
  // 新增订单
  addOrder:function(){
    let id = this.data.userData.id;
    wx.navigateTo({
      url: `/pages/subOrder/pages/order-add/order-add?id=${id}`
    })
  },
  // 新增地址
  addAddr:function(){
    let id = this.data.userData.id;
    wx.navigateTo({
      url: `/pages/subVip/pages/addAddress/addAddress?id=${id}`
    })
  },
  //跳转
  receiptDetail: function (e) {
    wx.navigateTo({
      url: `/pages/subOrder/pages/order-detail/order-detail?orderId=${e.currentTarget.dataset.id}`
    })
  },
  // 获取会员信息
  getUserData:function(){
    let userData = {
      id:'4003',
      name:'我是Vip',
      date:'2020-08-20',
      phone:'15612345678',
      sex:1,
      cardId:'1000000032',
      date1:'2038-03-05',
      level:'普通会员',
      status:'正常',
      birthday:'1993-12-03',
      money:'20.5',
      freeze:'50',
      payIntegral:100,
      levelIntegral:200,
      address:[
        {
          sh_mobile:"13986012889",
          sh_name:"徐",
          sh_sex: '1',
          sh_province:'湖北省',
          sh_city:'武汉市',
          sh_area:'江岸区',
          sh_address:"盈安大厦江岸区工商局（京汉大道950号）"
        },{
          sh_mobile: "13986012889",
          sh_name: "徐",
          sh_sex:'1',
          sh_province: '湖北省',
          sh_city: '武汉市',
          sh_area: '江岸区',
          sh_address: "盈安大厦江岸区工商局（京汉大道950号）"
        }
      ],
      orderList: [{ "id": 14304, "sn": "QWJ20180908090608442921", "total": "0.03", "order_origin": 1, "type": 1, "pay": 0, "pick": 0, "create_time": "2018-09-08 09:06:07", "update_time": "2018-09-08 09:06:07", "dispatch": 0, "ps_date": "2018-09-08", "ps_time": "12:00-18:00", "user_mobile": "13477008178", "store_name": "青蛙家苗栗路沁园店", "sh_name": "", "sh_mobile": null, "address": null, "user_name": "墨白" }, { "id": 14303, "sn": "QWJ20180907211724794929", "total": "0.02", "order_origin": 1, "type": 1, "pay": 0, "pick": 0, "create_time": "2018-09-07 21:17:23", "update_time": "2018-09-07 21:17:23", "dispatch": 0, "ps_date": "2018-09-07", "ps_time": "12:00-18:00", "user_mobile": "18312345679", "store_name": "青蛙家万松园千禧店", "sh_name": "刘小新", "sh_mobile": null, "address": null, "user_name": "刘小新|你的烂借口" }, { "id": 14302, "sn": "QWJ20180907211547373151", "total": "21.91", "order_origin": 1, "type": 1, "pay": 0, "pick": 0, "create_time": "2018-09-07 21:14:37", "update_time": "2018-09-07 21:14:37", "dispatch": 0, "ps_date": "2018-09-07", "ps_time": "12:00-18:00", "user_mobile": "18312345679", "store_name": "青蛙家万松园千禧店", "sh_name": "刘小新", "sh_mobile": null, "address": null, "user_name": "刘小新|你的烂借口" }, { "id": 14061, "sn": "QWJ20180906162231071353", "total": "5.94", "order_origin": 1, "type": 1, "pay": 2, "pick": 2, "create_time": "2018-09-06 16:22:31", "update_time": "2018-09-06 16:22:48", "dispatch": 0, "ps_date": "2018-09-06", "ps_time": "12:00-18:00", "user_mobile": "13407100277", "store_name": "青蛙家苗栗路沁园店", "sh_name": "彭梦琪", "sh_mobile": null, "address": null, "user_name": "彭梦琪" }, { "id": 14060, "sn": "QWJ20180906162026504500", "total": "5.94", "order_origin": 1, "type": 1, "pay": 2, "pick": 2, "create_time": "2018-09-06 16:20:25", "update_time": "2018-09-06 16:20:56", "dispatch": 0, "ps_date": "2018-09-06", "ps_time": "12:00-18:00", "user_mobile": "13237193824", "store_name": "青蛙家苗栗路沁园店", "sh_name": "罗", "sh_mobile": null, "address": null, "user_name": "罗|天真" }]
    }
    this.setData({
      userData: userData
    })
  },
  onLoad: function (options) {
    if (options){
      wx.setNavigationBarTitle({
        title: options.name + '-详情',
      })
      this.setData({
        id:options.id
      })
    }
    this.getUserData();
  },
  onShow: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
})