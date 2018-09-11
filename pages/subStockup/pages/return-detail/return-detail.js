// pages/return-detail/return-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooselistData: ['退货明细', '退货原因'],
    currentid: 0,
    orderList: [{
      name: '大白菜',
      code: '515431341345',
      pickNum: '9654.6',
      pickMoney: '63515.3',
      id: 1
    }, {
      name: '胡萝卜',
      code: '515431341345',
      pickNum: '654.6',
      pickMoney: '3515.3',
      id: 2
    }, {
      name: '农夫山泉',
      code: '515431341345',
      pickNum: '20',
      pickMoney: '30',
      id: 3
    }],
  },
  //选项卡列表类型切换
  ChooseList: function (e) {
    var listid = e.currentTarget.dataset.listid
    this.setData({
      currentid: listid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})