// pages/request-list/request-list.js
const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    ifLoad: false,
    showdelect: false,
    Startdate: '',
    Enddate: '',
    limit:5,
    pageNum:1,
    orderList: [
      { ordername: '1', checked: false },
      { ordername: '2', checked: false },
      { ordername: '3', checked: false },
      { ordername: '4', checked: false },
      { ordername: '5', checked: false },
      { ordername: '6', checked: false }
    ],
    //分类筛选条件-订单状态
    pickStataus: [//全部订单状态
      { text: '收货状态', order_status: '' },
      { text: '未收货', order_status: '0' },
      { text: '待收货', order_status: '1' },
      { text: '收货完成', order_status: '2' }
    ],
    pickStatausIndex:0,
    searchContent:'',
  },
  scanCode: function () {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode'],
      success: (res) => {
        // common.loading('加载中');
        console.log(res.result);
        this.setData({
          showdelect: res.result ? true : false,
          searchContent: res.result,
          pageNum: 1,
          nomore: false
        })
        this.getRequestList();
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
  //搜索绑定
  searchContent: function (e) {
    if (e.detail.value) {
      this.setData({
        showdelect: true,
        searchContent: e.detail.value
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
    this.getRequestList()
  },
  // 提交内容查询
  searchTextCommit:function(e){
    this.setData({
      searchContent: e.detail.value,
      pageNum: 1,
      nomore:false
    })
    this.getRequestList()
  },
  // 切换收货状态
  searchpick:function(e){
    this.setData({
      pickStatausIndex: e.detail.value,
      openSearch:false,
      pageNum: 1,
      nomore:false
    })
    this.getRequestList()
  },
  // 取消按收货状态搜索
  cancelSearchpick: function () {
    this.setData({
      openSearch: false
    })
  },
  // 展开按收货状态搜索
  openSearchpick: function (e) {
    let picType = e.currentTarget.dataset.pictype;
    if (picType == 'status') {
      this.setData({
        openSearch: true
      })
    }
  },
  // 初始时间的点击
  startTimeChange: function (e) {
    var that = this;
    that.setData({
      Startdate: e.detail.value,
      pageNum: 1,
      nomore:false
    })
    this.getRequestList()
  },
  // 结束时间的点击
  endTimeChange: function (e) {
    var that = this;
    that.setData({
      Enddate: e.detail.value,
      pageNum: 1,
      nomore:false
    })
    this.getRequestList()
  },
  //跳转
  requestDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../request-detail/request-detail?id=${id}`
    })
  },
  requestAdd: function (e) {
    let direct_supply = this.data.direct_supply;
    wx.navigateTo({
      url: `../request-add/request-add?direct_supply=${direct_supply}`
    })
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      pageNum: 1
    })
    this.getRequestList();
    setTimeout(function () {
      // function()
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  //加载更多
  onReachBottom: function () {
    common.loading();
    common.pullLoading();
    this.setData({
      pageNum: this.data.pageNum+1
    })
    this.getRequestList()
  },
  getRequestList:function(_param){
    let param = {
      access_token: app.globalData.access_token,
      user_token: app.globalData.user_token,
      list_rows: this.data.limit,
      page: this.data.pageNum,
      action: 'list',
      direct_supply: this.data.direct_supply,//统配0，直供1
      create_date_start: this.data.Startdate,
      create_date_end: this.data.Enddate
    }
    if (_param) param = _param;
    if (this.data.searchContent && (this.data.searchContent).replace(/\s/g, ''))
      param.search_data = (this.data.searchContent).replace(/\s/g, '');
    //全部不传，0 未收货 1 收货中 2收货完成
    let pickStatausIndex = this.data.pickStatausIndex, pickStataus = this.data.pickStataus;
    if (pickStatausIndex != 0) param.sh_status = pickStataus[pickStatausIndex].order_status;
    wx.request({
      url: config.request,
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        wx.hideLoading();
        if (res.data.data && res.data.data.length > 0) {
          var orderList = this.data.orderList;
          if (param.page > 1) {
            orderList = orderList.concat(res.data.data)
          } else {
            orderList = res.data.data;
          }
          this.setData({
            orderList: orderList
          })
        } else {
          if (param.page == 1) {
            this.setData({
              orderList: []
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
  onLoad: function (option) { 
    let direct_supply = option.direct_supply;//0非直供订单 1直供订单
    this.setData({
      direct_supply: direct_supply,
    });
    this.onShow();
  },
  onShow:function(){
    if (!this.data.Startdate && !this.data.Enddate){
      this.setData({
        Startdate: common.GetDay(-30),
        Enddate: common.today()
      })
    }
    var currentid = this.data.currentid;
    let param = {
      access_token: app.globalData.access_token,
      user_token: app.globalData.user_token,
      action: 'list',
      list_rows: this.data.limit,
      page: this.data.pageNum,
      direct_supply: this.data.direct_supply,//统配0，直供1
      create_date_start: this.data.Startdate,
      create_date_end: this.data.Enddate
    }
    if (this.data.pageNum>1){
      param.page = 1;
      param.list_rows = parseInt(this.data.pageNum * this.data.limit)
    }
    if (this.data.flag && this.data.direct_supply){
      console.log(`direct_supply${this.data.direct_supply}`)
      this.getRequestList(param);
      this.setData({flag:false})
      setTimeout(()=>{ this.setData({ flag: true })}, 5000);
    }else{
      console.log('刷新频率过高')
    }
  },
})