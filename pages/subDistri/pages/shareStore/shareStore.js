Page({
  data: {

  },
  preview:function(){
    wx.previewImage({
      urls: ['/images/shareImg.png']
    })
  },
  // 保存图片
  saveImg:function(){
    wx.saveImageToPhotosAlbum({
      filePath:'/images/shareImg.png',
      success(res) {
        console.log(res)
      }
    })
  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '欢迎加入青蛙家',
      path: '/page/index/index'
    }
  }
})