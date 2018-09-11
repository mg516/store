//app.js
App({
  onLaunch: function () {
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 更新清除用户信息缓存，可以重新请求数据
                  wx.removeStorageSync('user_token')
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    userInfo: null,
    appid:'wx43504183714b85e0',
    // userName:'小明',
    // storeName:'青蛙',
    // userId:1,
    // access_token:'325262fc7c9105f038d8f681cc4e6104',
    // user_token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJRaW5nV2FKaWEgSldUIiwiaWF0IjoxNTM2MzI4OTc2LCJleHAiOjMwNzI2NTc5NTIsImF1ZCI6IlFpbmdXYUppYSIsInN1YiI6IlFpbmdXYUppYSIsImRhdGEiOnsibWVtYmVyX2lkIjo5NCwiY29tcGFueV9pZCI6NCwic3RvcmVfaWQiOjZ9fQ.JDPJioT3wgGmXQ0FTosVPjZuHSWeu1jIO5dAXA4_UQU',
  }
})