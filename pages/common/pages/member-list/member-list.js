// pages/member-list/member-list.js
const app = getApp();
const config = require("../../../../utils/config.js").config;
const common = require("../../../../utils/common.js").common;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList:[],
    reList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.typeval == 'check'){
      wx.setNavigationBarTitle({
        title: '选择审核人',
      })
    }else if(options.typeval == 'look'){
      wx.setNavigationBarTitle({
        title: '选择抄送人',
      })
    }
    var optionData = JSON.parse(options.list);
    this.setData({
      reList: optionData
    })
    this.getMemList();
  },
  getMemList:function(){
    common.loading();
    wx.request({
      url: config.baosun,
      method: "POST",
      data: {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        action: 'getmemberinfo',
        pageNumber: 1,
        pageSize:100000000
      },
      success: (res) => {
        console.log(res)
        if (res.data.data && res.data.data.list){
          var memberList = res.data.data.list;
          this.setData({
            memberList: memberList
          })
          var reList = this.data.reList;
          if (reList.length>0){
            for (let i = 0; i < reList.length;i++){
              for( let j = 0;j<memberList.length;j++){
                if (memberList[j].id == reList[i].id){
                  memberList[j].ifCheck = true;
                }
              }
            }
          }
          this.setData({
            memberList: memberList
          })
        }
      },
      complete:(res)=>{
        wx.hideLoading();
      }
    })
  },
  makeSure:function(){
    wx.setStorageSync('reList', this.data.reList||[]);
    wx.navigateBack({
      delta:1
    })
  },
  removeCheck:function(e){
    var reList = this.data.reList || [];
    var index = e.currentTarget.dataset.index;
    var memberList = this.data.memberList;
    for (let i = 1; i < memberList.length;i++){
      if (reList[index].id == memberList[i].id){
        memberList[i].ifCheck = false;
      }
    }
    reList.splice(index,1);
    this.setData({
      memberList: memberList,
      reList: reList
    })
  },
  checkIt:function(e){
    var reList = this.data.reList||[];
    var index = e.currentTarget.dataset.index;
    var memberList = this.data.memberList;
    if (memberList[index].ifCheck){
      for (let i = 0; i < reList.length;i++){
        if (reList[i].id == memberList[index].id){
          reList.splice(i,1)
          break;
        }
      }
    }else{
      reList.push(memberList[index]);
    }
    memberList[index].ifCheck = !memberList[index].ifCheck;
    this.setData({
      memberList: memberList,
      reList: reList
    })
    if (memberList[index].ifCheck){
      this.setData({
        scrollLeft:99999999999999
      })
    }
  },
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})