const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nomore: false,//没有更多数据了
    ifLoad:false,
    ifOnce:true,
    chooselistData: [
      { name: '全部订单', order_stutas: 0 },
      { name: '待支付', order_stutas: 1 },
      // { name: '待提货', order_stutas: 2 },
      // { name: '已提货', order_stutas: 3 },
    ],
    //分类筛选条件-订单状态
    orderSearch: [//全部订单状态
      { text: '选择状态', order_status: '1' },
      { text: '未支付', order_status: '2' },
      { text: '待配送', order_status: '3' },
      { text: '配送中', order_status: '4' },
      { text: '待提货', order_status: '5' },
      { text: '已完成', order_status: '6' }
    ],
    orderSearchIndex:0,//分类筛选，序号
    //分类筛选条件-订单类别
    classifySearch:[
      { text: '选择类别', order_type: '' },
      { text: '配送订单', order_type: '2' },
      { text: '自提订单', order_type: '1' }
    ],
    classifySearchIndex:0,
    currentid: 0,
    order_stutas:0,
    pageNum:1,
    limit:5,
    showdelect: false,
    Startdate: '',
    Enddate: '',
    orderList:[],
    showselect: false,//全选显示
    middlearr: [],//商品数量
  },
  changeStatus(e){
    let dispatch = e.currentTarget.dataset.dispatch;
    let modalText = '';
    if (dispatch == 0) {//发货
      modalText = '请开始配送商品'
    } else if (dispatch == 1) {//配送完成，提货完成
      modalText = '请确认收货人已收到商品，确认配送完成吗？'
    }
    wx.showModal({
      title: '提示',
      content: modalText,
      success: (res) => {
        if (res.confirm) {
          this.changeStatusFunc(e)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  changeStatusFunc(e){
    let dispatch = e.currentTarget.dataset.dispatch;
    let id = e.currentTarget.dataset.id;
    let param = {};
    if (dispatch == 0) {//发货
      param = {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        action: 'send_goods',
        id: id
      }
    } else if (dispatch == 1) {//配送完成，提货完成
      param = {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        action: 'qr_pick_sh',
        id: id
      }
    }
    common.loading('加载中');
    wx.request({
      url: config.order,
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          this.onShow()
        }else{
          common.tip(res.data.msg,'none')
        }
        wx.hideLoading();
      },
      complete:(res)=>{
        wx.hideLoading()
      }
    })
  },
  //拨打电话
  callPhone(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phonenum
    })
  },
  // 按订单分类搜索
  searchOrder:function(e){
    let picType = e.currentTarget.dataset.pictype;
    if (picType == 'status') {
      this.setData({
        orderSearchIndex: e.detail.value,
        pageNum: 1,
        nomore:false
      })
      console.log('按订单分类查询')
    } else if (picType == 'type') {
      let orderSearch = [//配送订单的订单状态
        { text: '选择状态', order_status: '1' },{ text: '未支付', order_status: '2' },{ text: '待配送', order_status: '3' },{ text: '配送中', order_status: '4' },{ text: '待提货', order_status: '5' },{ text: '已完成', order_status: '6' }];
      let orderSearch0 = [//配送订单的订单状态
        { text: '选择状态', order_status: '1' },{ text: '未支付', order_status: '2' },{ text: '待配送', order_status: '3' },{ text: '配送中', order_status: '4' },{ text: '已完成', order_status: '6' }];
      let orderSearch1 = [//自提订单的订单状态
        { text: '选择状态', order_status: '1' },{ text: '未支付', order_status: '2' },{ text: '待提货', order_status: '5' },{ text: '已完成', order_status: '6' }];
      let typeVal = this.data.classifySearch[e.detail.value].order_type;
      if (typeVal=='2'){this.setData({orderSearch: orderSearch0})}
      else if (typeVal == '1'){this.setData({orderSearch: orderSearch1})}
      else{this.setData({orderSearch: orderSearch})}
      this.setData({
        orderSearchIndex: 0,//切换订单类别->重置订单状态
        classifySearchIndex: e.detail.value,
        pageNum: 1,
        nomore:false
      })
    }
    this.cancelSearchOrder();
    this.getOrderList();
  },
  // 取消按订单分类筛选
  cancelSearchOrder:function(){
    this.setData({
      openSearch: false,
      openClassSearch: false
    })
  },
  // 展开按分类搜索
  openSearchOrder:function(e){
    let picType = e.currentTarget.dataset.pictype;
    if (picType == 'status'){
      this.setData({
        openSearch:true
      })
    } else if (picType == 'type'){
      this.setData({
        openClassSearch: true
      })
    }
  },
  // 条件查询
  getSearchOrderList:function(){
    this.setData({
      pageNum: 1,
      nomore:false
    })
    console.log('条件查询')
    this.getOrderList();
  },
  //选项卡列表类型切换
  ChooseList: function (e) {
    var listid = e.currentTarget.dataset.listid
    console.log(listid);
    this.setData({
      order_stutas: listid,
      currentid: listid,
      pageNum:1
    })
    console.log('选项卡切换')
    this.getOrderList();
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
      nomore:false
    })
    console.log('删除条件查询')
    this.getOrderList();
  },
  // 初始时间的点击
  startTimeChange: function (e) {
    var that = this;
    that.setData({
      Startdate: e.detail.value,
      pageNum:1
    })
    console.log('选择开始时间查询')
    this.getOrderList()
  },
  // 结束时间的点击
  endTimeChange: function (e) {
    var that = this;
    that.setData({
      Enddate: e.detail.value,
      pageNum: 1,
      nomore:false
    })
    console.log('选择结束时间查询')
    this.getOrderList()
  },
  //跳转
  receiptDetail: function (e) {
    var currentid = this.data.currentid;
    wx.navigateTo({
      url: "../order-detail/order-detail?pageid=" + currentid + '&orderId=' + e.currentTarget.dataset.id
    })
  },
  // 获取订单数据
  getOrderList:function(_param){
    wx.showLoading({
      title: '加载在',
    })
    let param = null;
    if (!_param){
      param = {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        list_rows: this.data.limit,
        page: this.data.pageNum,
        action: 'list',
        // order_stutas: this.data.order_stutas,
        sign: app.globalData.sign,
        time_type: 1,
        start_time: this.data.Startdate,
        end_time: this.data.Enddate,
        search_data: this.data.searchContent,
        order: 2, //1 创建时间 2更新时间
        order_status: this.data.orderSearch[this.data.orderSearchIndex].order_status
      }
      if (this.data.classifySearchIndex != 0) {
        param.type = this.data.classifySearch[this.data.classifySearchIndex].order_type
      }
    } else {
      param = _param;
    }
    wx.request({
      url: config.order,
      method:'POST',
      data:param,
      success:(res)=>{
        console.log(res)
        wx.hideLoading();
        if (res.data.data && res.data.data.length>0){
          var orderList = this.data.orderList;
          if (param.page>1){
            // orderList.push(res.data.data)
            orderList = orderList.concat(res.data.data)
          }else{
            orderList = res.data.data;
          }
          this.setData({
            orderList: orderList
          })
        }else{
          if (param.page == 1){
            this.setData({
              orderList: []
            })
          }else{
            // setTimeout(function(){
            //   common.tip('没有更多数据了','none')
            // },100)
            this.setData({
              nomore:true
            })
          }
        }
      },
      complete:()=>{
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
  onPullDownRefresh: function () {
    common.pullLoading();
    common.loading();
    this.setData({
      pageNum: 1,
      nomore:false
    })
    console.log('下拉刷新')
    this.getOrderList();
    // setTimeout(function () {
    //   wx.hideNavigationBarLoading() //完成停止加载
    //   wx.stopPullDownRefresh() //停止下拉刷新
    // }, 1500);
  },
  //加载更多
  onReachBottom: function () {
    console.log('加载更多')
    common.loading('加载中');
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.getOrderList();
    
    // setTimeout(() => {
    //   wx.hideLoading()

    // }, 1000)
  },
  onLoad: function (options) {
    console.log(options.currentid)
    if (options.currentid != undefined) {
      this.setData({
        currentid: options.currentid
      })
    }
    if (options.status){
      let status = options.status;
      let orderSearchIndex = 0;
      let classifySearchIndex = 0;
      let orderSearch = null;
      let orderSearch0 = [//配送订单的订单状态
        { text: '选择状态', order_status: '1' }, { text: '未支付', order_status: '2' }, { text: '待配送', order_status: '3' }, { text: '配送中', order_status: '4' }, { text: '已完成', order_status: '6' }];
      let orderSearch1 = [//自提订单的订单状态
        { text: '选择状态', order_status: '1' }, { text: '未支付', order_status: '2' }, { text: '待提货', order_status: '5' }, { text: '已完成', order_status: '6' }];
      if (options.status == '1-0') { classifySearchIndex = 2; orderSearch = orderSearch1; orderSearchIndex = 2 }//待自提
      else if (options.status == '1-2'){ classifySearchIndex = 2; orderSearch = orderSearch1; orderSearchIndex = 3 }//已自提
      else if (options.status == '2-0'){ classifySearchIndex = 1; orderSearch = orderSearch0; orderSearchIndex = 2 }//待配送
      else if (options.status == '2-1'){ classifySearchIndex = 1; orderSearch = orderSearch0; orderSearchIndex = 3 }//配送中
      else if (options.status == '2-2'){ classifySearchIndex = 1; orderSearch = orderSearch0; orderSearchIndex = 4 }//已配送
      this.setData({
        orderSearchIndex: orderSearchIndex,
        classifySearchIndex: classifySearchIndex,
        orderSearch: orderSearch,
        Startdate: common.today(),
        Enddate: common.today()
      })
    }
    this.onLoadFunc();
  },
  onShow: function () {
    console.log('初始查询')
    if (!this.data.ifOnce){
      this.onLoadFunc();
    }
  },
  onLoadFunc:function(){
    if (!this.data.Startdate) {
      this.setData({
        Startdate: common.GetDay(-7),
        Enddate: common.today()
      })
    }
    var param = null;
    if (this.data.pageNum > 1) {
      param = {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        list_rows: parseInt(this.data.limit * this.data.pageNum),
        page: 1,
        action: 'list',
        order_stutas: this.data.order_stutas,
        sign: app.globalData.sign,
        time_type: 1,
        start_time: this.data.Startdate,
        end_time: this.data.Enddate,
        search_data: this.data.searchContent,
        order: 2, //1 创建时间 2更新时间
        order_status: this.data.orderSearch[this.data.orderSearchIndex].order_status
      }
      if (this.data.classifySearchIndex != 0) {
        param.type = this.data.classifySearch[this.data.classifySearchIndex].order_type
      }
    }
    this.getOrderList(param);
  }
})
