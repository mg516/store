let app = getApp();
let that = null;
let loginFunc = null;
let config = require("config.js").config;
let signUp = require("./signUp/signUp.js");
{
  loginFunc = function ( target, _callback, _param){
    that = target;
    let param = _param || null;
    let callback = _callback||null;
    app.globalData.phoneNumber = wx.getStorageSync('phoneNumber')||null;
    app.globalData.access_token = wx.getStorageSync('access_token')||null;
    app.globalData.user_token = wx.getStorageSync('user_token')||null;
    app.globalData.openid = wx.getStorageSync('openid')||null;
    app.globalData.sign = wx.getStorageSync('sign') || null;
    app.globalData.entrance = wx.getStorageSync('entrance') || null;
    app.globalData.member = wx.getStorageSync('member') || null;
    app.globalData.store_cg_id = wx.getStorageSync('store_cg_id') || null;
    if (app.globalData.access_token && app.globalData.user_token && app.globalData.openid && app.globalData.entrance) {
      wx.setStorageSync('login', 'ok');
      callback(param);
      return;
    }else{
      wx.removeStorageSync('login');
    }
    //验证授权
    wx.login({
      success: function (res) {
        console.log(`loginsuccess:${config.login},${res.code}`)
        //发起网络请求
        wx.request({
          url: config.login,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            appid: app.globalData.appid,
            jscode: res.code,
            sign: '',
            q: ''
          },
          success: function (res) {
            // if (res.data.code == 0 || res.data.code == 1){
            console.log(`success:${res}`)
            if (res.data.data){
              app.globalData.openid = res.data.data.openid;
              app.globalData.access_token = res.data.data.access_token;
              app.globalData.user_token = res.data.data.user_token||'';
              app.globalData.sign = res.data.data.sign || '';
              app.globalData.entrance = res.data.data.entrance||'';
              app.globalData.member = res.data.data.member || '';
              app.globalData.store_cg_id = res.data.data.store_cg_id || '';
              wx.setStorageSync('openid', app.globalData.openid)
              wx.setStorageSync('access_token', app.globalData.access_token)
              wx.setStorageSync('user_token', app.globalData.user_token)
              wx.setStorageSync('sign', app.globalData.sign)
              wx.setStorageSync('entrance', app.globalData.entrance)
              wx.setStorageSync('member', app.globalData.member)
              wx.setStorageSync('store_cg_id', app.globalData.store_cg_id)
            }
            if (app.globalData.access_token && app.globalData.user_token && app.globalData.openid 
            && app.globalData.entrance && app.globalData.store_cg_id) {
              wx.setStorageSync('login', 'ok');
              callback(param);
              return;
            }else{
              signUp.signUp(that, callback, param);
            }
            // }else{
            //   wx.showToast({
            //     title: res.data.msg,
            //     icon:'none'
            //   })
            // }
          },
          complete:(res)=>{
            console.log(`complete:${res}`)
            console.log(res)
          }
        })
      }
    })
  }
}

module.exports = {
  loginFunc: loginFunc
}
