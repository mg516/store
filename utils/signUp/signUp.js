const app = getApp();
const config = require("../config.js").config;
const common = require("../common.js").common;
let that = null;
let signUp = null;
let callback = null;
let param = null;
{
  signUp = function (_that, _callback, _param){
    that = _that;
    callback = _callback || null;
    param = _param || null;
    that.watchPassWord = watchPassWord;
    that.getCode = getCode;
    that.Countdown = Countdown;
    that.formSubmit = formSubmit;
    that.close = close;
    that.setData({
      cuttime: 60,
      showcuttime: true
    })
    if (wx.getStorageSync('login') != 'ok') {
      // 显示注册/登陆页
      that.setData({
        showLogin: true
      })
    }else{
      if (callback) callback(param || null)
    }
  }
  // 监听输入
  let watchPassWord = function (event) {
    var phoneNumber = event.detail.value;
    console.log(phoneNumber);
    that.setData({
      phoneNumber: phoneNumber
    })
  };
  //获取验证码
  let getCode = function (e) {
    var access_token = app.globalData.access_token;
    var phoneNumber = that.data.phoneNumber;
    var phonereg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    if (!phoneNumber) {
      common.tip('请输入手机号', 'none')
    } else if (phoneNumber.length != 11) {
      common.tip('手机号有误', 'none')
    } else if (!phonereg.test(phoneNumber)) {
      common.tip('手机号格式错误', 'none')
    } else {
      wx.request({
        url: config.sendsmscode,
        method: 'POST',
        data: {
          access_token: access_token,
          mobile: phoneNumber,
          openid: app.globalData.openid
        },
        success: function (res) {
          if (res.data.code != 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          } else {
            that.setData({
              showcuttime: false
            })
            that.Countdown();
          }
        }
      })
    }
  };
  // 倒计时
  let Countdown = function () {
    var that = this;
    var cuttime = that.data.cuttime
    if (cuttime == 0) {
      that.setData({
        showcuttime: true,
        cuttime: 60
      })
    } else {
      var timer = setTimeout(function () {
        cuttime--
        that.setData({
          cuttime: cuttime
        })
        that.Countdown(that)
      }, 1000)
    }
  };
  // 点击提交
  let formSubmit = function (e) {
    var phonereg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    if (e.detail.value.phoneNumber == '' || e.detail.value.phoneNumber.length != 11) {
      common.tip('手机号有误', 'loading')
    } else if (!phonereg.test(e.detail.value.phoneNumber)) {
      common.tip('手机号格式错误', 'loading')
    } else if (e.detail.value.verificationCode == '' || e.detail.value.verificationCode.length != 6) {
      common.tip('验证码无效', 'loading')
    } else {
      // 上传身份信息
      wx.request({
        url: config.register,
        method: 'POST',
        data: {
          access_token: app.globalData.access_token,
          openid: app.globalData.openid,
          mobile: e.detail.value.phoneNumber,
          code: e.detail.value.verificationCode
        },
        success: function (res) {
          if (res.data.code != 1) {
            wx.showToast({
              title: '验证码有误',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '登陆成功',
              icon: 'none'
            })
            if (res.data.data){
              wx.setStorageSync('login', 'ok');
              app.globalData.phoneNumber = e.detail.value.phoneNumber;
              app.globalData.user_token = res.data.data.user_token;
              app.globalData.entrance = res.data.data.entrance;
              app.globalData.member = res.data.data.member || '';
              wx.setStorageSync('user_token', app.globalData.user_token)
              wx.setStorageSync('phoneNumber', app.globalData.phoneNumber)
              wx.setStorageSync('entrance', app.globalData.entrance)
              wx.setStorageSync('member', app.globalData.member)
              that.setData({
                showLogin: false,
                isUserInfo: false
              })
              if (callback) callback(param||null)
            }else{
              common.tip('手机号格式错误', 'none')
            }
          }
        },
      });
    }
  };
  let close = function () {
    that.setData({
      showLogin: false
    })
  }
}

module.exports = {
  signUp: signUp
}
