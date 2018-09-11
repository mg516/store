// pages/request-add/request-add.js
const common = require("../../../../utils/common.js").common;
var goodsData = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData:[],
    idarr:[], 
  },
  
  //提交
  Submit: function () {
    var convertGoods = this.data.convertGoods;
    if (convertGoods.length>0){
      for (let i = 0; i < convertGoods.length;i++){
        if (!convertGoods[i].key1 || parseFloat(convertGoods[i].key1) <= 0 || !convertGoods[i].key2 || parseFloat(convertGoods[i].key2) <= 0 || !convertGoods[i].key3 || parseFloat(convertGoods[i].key3)<=0 || !convertGoods[i].key4){
          common.tip('信息不合法 或 不完整','none');
          this.setData({
            scrollToThere:'scroll' + i
          })
          return;
        }
      }
    }
    wx.showModal({
      title: '提交前,请确认信息无误',
      content: '(提交后信息不可修改)',
      cancelColor: '#F97D47',
      cancelText: '我再想想',
      confirmText: '提交',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 获取光标跳转
  goToSearch: function () {
    wx.navigateTo({
      url: '../convert-search/convert-search'
    })
  },
  // 选择照片
  chooseImage: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var convertGoods = this.data.convertGoods;
    var that = this;
    wx.chooseImage({
      count:'9',
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // if (convertGoods[index].file){
        //   convertGoods[index].file.concat(res.tempFilePaths)
        // }else{
        //   convertGoods[index].file = res.tempFilePaths
        // }
        convertGoods[index].file ? (convertGoods[index].file = convertGoods[index].file.concat(res.tempFilePaths)) : (convertGoods[index].file = res.tempFilePaths);
        that.setData({
          convertGoods: convertGoods
        });
        wx.setStorageSync('convertGoods', convertGoods);
        var tempFilePaths = res.tempFilePaths;
        // that.tip('正在上传...', 'none', 1000);
        // for (var i = 0, h = tempFilePaths.length; i < h; i++) {
        //   wx.uploadFile({
        //     url: fileupload,
        //     filePath: tempFilePaths[i],//要上传文件资源的路径
        //     name: 'file',//	文件对应的 key 
        //     formData: {
        //       user_token: user_token,
        //       access_token: access_token,
        //       path_name: 'land',
        //       file: tempFilePaths[i]
        //     },
        //     success: function (res) {

        //       if (res.data) {
        //         var Uploaddata = JSON.parse(res.data);
        //         var imgdata = Uploaddata.data;

        //         imgarr.push(imgdata.id);
        //         that.setData({
        //           imgarr: imgarr
        //         })

        //       } else {
        //         that.tip('图片上传失败', 'none', 1000);
        //       }

        //     }
        //   })
        // }

      }
    })
  },
  // 预览图片
  previewImage: function (e) {
    var convertGoods = this.data.convertGoods;
    var index = e.currentTarget.dataset.index;
    var indeximg = e.currentTarget.dataset.indeximg;
    wx.previewImage({
      current: convertGoods[index].file[indeximg], // 当前显示图片的http链接
      urls: convertGoods[index].file // 需要预览的图片http链接列表
    })
  },
  // 删除图片
  delThisImg: function (e) {
    var convertGoods = this.data.convertGoods;
    var index = e.currentTarget.dataset.index;
    var indeximg = e.currentTarget.dataset.indeximg;
    wx.showModal({
      title: '提示',
      content: '是否要删除该图片',
      cancelColor: '#F97D47',
      cancelText: '取消',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          convertGoods[index].file.splice(indeximg,1);
          this.setData({
            convertGoods: convertGoods
          })
          wx.setStorageSync('convertGoods', convertGoods);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 折价细数/折后价
  inputNumber:function(e){
    var index = e.currentTarget.dataset.index;
    var typeval = e.currentTarget.dataset.typeval;
    var convertGoods = this.data.convertGoods;
    if (typeval == 'key1'){
      convertGoods[index].key1 = e.detail.value >= 0 ? (e.detail.value).toString() : '';
    } else if (typeval == 'key2') {
      if (e.detail.value > convertGoods[index].price){
        convertGoods[index].key2 = parseFloat(convertGoods[index].price);
        common.tip('折后价不可大于原价');
      }else{
        convertGoods[index].key2 = e.detail.value >= 0 ? (e.detail.value).toString() : '';
      }
    }
    convertGoods[index].key3 = ((convertGoods[index].key1 || 0) * (convertGoods[index].key2 || 0)).toFixed(2);
    this.setData({
      convertGoods: convertGoods
    })
    wx.setStorageSync('convertGoods', convertGoods);
  },
  // 折价原因
  inputText:function(e){
    var index = e.currentTarget.dataset.index;
    var typeval = e.currentTarget.dataset.typeval;
    var convertGoods = this.data.convertGoods;
    if (typeval == 'key4') {
      convertGoods[index].key4 = e.detail.value;
    }
    this.setData({
      convertGoods: convertGoods
    })
    wx.setStorageSync('convertGoods', convertGoods);
  },
  // 删除商品
  delGoods:function(e){
    var index = e.currentTarget.dataset.index;
    var convertGoods = this.data.convertGoods;
    wx.showModal({
      title: '提示',
      content: '是否要删除选中商品',
      cancelColor: '#F97D47',
      cancelText: '取消',
      confirmText: '确定',
      success: (res)=>{
        if (res.confirm) {
          convertGoods.splice(index,1);
          this.setData({
            convertGoods: convertGoods
          })
          wx.setStorageSync('convertGoods', convertGoods);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShow:function(){
    var convertGoodsBack = wx.getStorageSync('convertGoodsBack') || '';
    var convertGoods = wx.getStorageSync('convertGoods')||'';
    if (convertGoodsBack){
      if (convertGoods){
        for (let i = 0; i < convertGoods.length;i++){
          if (convertGoods[i].id == convertGoodsBack.id){
            common.tip('选中的商品已存在','none');
            this.setData({
              scrollToThere: 'scroll' + i
            })
            break;
          }
          if (i >= convertGoods.length-1){
            convertGoods.push(convertGoodsBack);
            break;
          }
        }
      }else{
        convertGoods = [convertGoodsBack];
      }
    }
    wx.removeStorageSync('convertGoodsBack');
    wx.setStorageSync('convertGoods', convertGoods);
    this.setData({
      convertGoods: convertGoods
    })
  },
  onLoad:function(){

  }

})
