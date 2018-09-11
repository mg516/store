// pages/receipt-detail/receipt-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooselistData: ['订货信息', '收货信息'],
    orderList:[{
      name:'大白菜',
      code:'515431341345',
      pickNum:'9654.6',
      pickMoney:'63515.3',
      id:1
    }, {
      name: '胡萝卜',
      code: '515431341345',
      pickNum: '654.6',
      pickMoney: '3515.3',
      id:2
    }, {
      name: '农夫山泉',
      code: '515431341345',
      pickNum: '20',
      pickMoney: '30',
      id:3
    }],
    currentid: 0,
  },
  //选项卡列表类型切换
  ChooseList: function (e) {
    var listid = e.currentTarget.dataset.listid
    // console.log(listid);
    this.setData({
      currentid: listid
    })
  },
  //跳转到配送中
  receipt: function () {
    var Listcurrentid = this.data.Listcurrentid;
    let pages = getCurrentPages();//当前页面栈
    let prevPage = pages[pages.length - 2];//上一页面
    if (Listcurrentid == 0) {
      prevPage.setData({//直接给上移页面赋值
        currentid:1
      });
      // wx.navigateTo({url: "../receipt-list/receipt-list?currentid=" + 1})
    } else if (Listcurrentid == 1) {
      prevPage.setData({//直接给上移页面赋值
        currentid: 2
      });
      // wx.navigateTo({url: "../receipt-list/receipt-list?currentid=" + 2})
    }
    wx.navigateBack({//返回
      delta: 1
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.pageid)
    if (options.pageid) {
      this.setData({
        Listcurrentid: options.pageid
      })
    } 
  },


})

