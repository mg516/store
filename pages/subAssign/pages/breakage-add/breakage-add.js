// pages/request-add/request-add.js
const common = require("../../../../utils/common.js").common;
const config = require("../../../../utils/config.js").config;
const app = getApp();
var goodsData = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: [],
    idarr: [],
  },

  //提交
  Submit: function () {
    var baosunGoods = this.data.baosunGoods;
    var remark = this.data.remark;
    var checkList = this.data.checkList || '';
    var lookList = this.data.lookList || '';
    if (!remark || checkList.length <= 0 || lookList.length <= 0){
      common.tip('请补选信息', 'none');
      this.setData({
        scrollTop: 0
      })
      return;
    }
    if (baosunGoods.length > 0) {
      for (let i = 0; i < baosunGoods.length; i++) {
        if (!baosunGoods[i].report_xs || parseFloat(baosunGoods[i].report_xs) <= 0 || !baosunGoods[i].report_total_price || parseFloat(baosunGoods[i].report_total_price) <= 0 || !baosunGoods[i].report_reson) {
          common.tip('信息不合法 或 不完整', 'none');
          this.setData({
            scrollToThere: 'scroll' + i
          })
          return;
        }
      }
    } else if (!baosunGoods || baosunGoods.length<=0){
      common.tip('请选择报损商品', 'none');
      return
    }
    wx.showModal({
      title: '提交前,请确认信息无误',
      content: '(提交后信息不可修改)',
      cancelColor: '#F97D47',
      cancelText: '我再想想',
      confirmText: '提交',
      success: (res)=> {
        if (res.confirm) {
          console.log('用户点击确定');
          this.submitData();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  submitData: function () {
    var baosunGoods = this.data.baosunGoods;
    var totalMoney = this.data.totalMoney;
    var remark = this.data.remark;
    let param = {
      access_token: app.globalData.access_token,
      user_token: app.globalData.user_token,
      action: 'add',
      goods: baosunGoods,
      total: totalMoney,
      remark: remark,
      check_member: this.returnStr(this.data.checkList),
      cs_member: this.returnStr(this.data.lookList)
    }
    var breakage_file = this.data.breakage_file;
    let img_ids = '';
    for (let i = 0; i < breakage_file.length;i++){
      img_ids += (i >= breakage_file.length - 1 ? breakage_file[i].id:breakage_file[i].id + ',');
    }
    // if (img_ids) { param.img_ids = img_ids}
    param.img_ids = img_ids||'';
    wx.request({
      url: config.baosun,
      method: "POST",
      data: param,
      success: (res) => {
        console.log(res)
        wx.removeStorageSync('breakage_file')
        wx.removeStorageSync('baosunGoods')
        wx.removeStorageSync('baosun')
        wx.navigateBack({
          delta:1
        })
      }
    })
  },
  returnStr:function(arr){
    var str = '';
    for(let i=0;i<arr.length;i++){
      str += arr[i].id;
      if(i<arr.length-1){
        str += ',';
      }
    }
    return str;
  },
  // 选择审核人
  chooseCheck:function(e){
    var typeval = e.currentTarget.dataset.typeval;
    var thisList = [];
    if (typeval=='check'){
      thisList = this.data.checkList || [];
    }else if(typeval=='look'){
      thisList = this.data.lookList || [];
    }
    this.setData({
      typeval: typeval
    });
    wx.navigateTo({
      url: '/pages/common/pages/member-list/member-list?typeval=' + typeval + '&list=' + JSON.stringify(thisList),
    });
  },
  // 获取光标跳转
  goToSearch: function () {
    wx.navigateTo({
      url: '/pages/common/pages/search-list/search-list?goodsType=baosun',
    })
  },
  countMoney:function(){
    var baosunGoods = this.data.baosunGoods;
    var totalMoney = 0;
    if (baosunGoods && baosunGoods.length>0){
      for (let i = 0; i < baosunGoods.length;i++){
        if (baosunGoods[i].report_total_price){
          totalMoney += parseFloat(baosunGoods[i].report_total_price);
        }
      }
    }
    this.setData({
      totalMoney: totalMoney.toFixed(2)
    })
  },
  // 选择照片
  chooseImage: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    // var filePath = this.data.filePath;
    var that = this;
    wx.chooseImage({
      count: '9',
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        that.uploadImg(tempFilePaths, 0);
      }
    })
  },
  /**上传 */
  uploadImg: function (imageArr,imgIndex) {
    var that = this;
    var breakage_file = this.data.breakage_file;
    console.log(imgIndex >= imageArr.length)
    if (imgIndex >= imageArr.length){
      return '';
    }
    var path = imageArr[imgIndex];
    wx.uploadFile({
      url: config.baosun,
      filePath: path,
      // header: {'Content-Type': 'multipart/form-data'},
      name: 'pic',
      formData: {
        access_token: app.globalData.access_token,
        user_token: app.globalData.user_token,
        action:'upload'
      },
      success: function (res) {
        console.log("upload success" + res);
        var data = JSON.parse(res.data);
        breakage_file ? (breakage_file = breakage_file.concat(data.data)) : (breakage_file = [data.data]);
        that.setData({
          breakage_file: breakage_file
        });
        wx.setStorageSync('breakage_file', breakage_file);
        that.uploadImg(imageArr, imgIndex+1);
      },
      fail: function (res) {
        console.log("upload fail" + res);
      }
    });
  },
  // 预览图片
  previewImage: function (e) {
    let breakage_file = this.data.breakage_file;
    let imgPath = [];
    for (let i = 0; i < breakage_file.length;i++){
      imgPath.push(breakage_file[i].url)
    }
    let indeximg = e.currentTarget.dataset.indeximg;
    wx.previewImage({
      current: imgPath[indeximg], // 当前显示图片的http链接
      urls: imgPath // 需要预览的图片http链接列表
    })
  },
  // 删除图片
  delThisImg: function (e) {
    var breakage_file = this.data.breakage_file;
    var indeximg = e.currentTarget.dataset.indeximg;
    wx.showModal({
      title: '提示',
      content: '是否要删除该图片',
      cancelColor: '#F97D47',
      cancelText: '取消',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          breakage_file.splice(indeximg, 1);
          this.setData({
            breakage_file: breakage_file
          })
          wx.setStorageSync('breakage_file', breakage_file);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  editRemark:function(e){
    var remark = e.detail.value;
    this.setData({
      remark: remark
    })
    wx.setStorageSync('remark', remark)
  },
  // 报损细数/报损价
  inputNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    var typeval = e.currentTarget.dataset.typeval;
    var baosunGoods = this.data.baosunGoods;
    if (typeval == 'key1') {
      if (e.detail.value > parseFloat(baosunGoods[index].num)) {
        common.tip('报损细数不可大于库存','none');
      }else{
        e.detail.value >= 0 ? baosunGoods[index].report_xs = (e.detail.value).toString() : '';
      }
    } else if (typeval == 'key2') {
      if (e.detail.value > baosunGoods[index].price) {
        baosunGoods[index].key2 = parseFloat(baosunGoods[index].price);
        common.tip('折后价不可大于原价','none');
      } else {
        e.detail.value >= 0 ? baosunGoods[index].key2 = (e.detail.value).toString() : '';
      }
    }
    baosunGoods[index].report_total_price = ((baosunGoods[index].report_xs || 0) * (parseFloat(baosunGoods[index].report_sun_money) || 0)).toFixed(2);
    this.setData({
      baosunGoods: baosunGoods
    })
    this.countMoney();
    wx.setStorageSync('baosunGoods', baosunGoods);
  },
  // 报损原因
  inputText: function (e) {
    var index = e.currentTarget.dataset.index;
    var typeval = e.currentTarget.dataset.typeval;
    var baosunGoods = this.data.baosunGoods;
    if (typeval == 'key4') {
      baosunGoods[index].report_reson = e.detail.value;
    }
    this.setData({
      baosunGoods: baosunGoods
    })
    wx.setStorageSync('baosunGoods', baosunGoods);
  },
  // 删除商品
  delGoods: function (e) {
    var index = e.currentTarget.dataset.index;
    var baosunGoods = this.data.baosunGoods;
    wx.showModal({
      title: '提示',
      content: '是否要删除选中商品',
      cancelColor: '#F97D47',
      cancelText: '取消',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          baosunGoods.splice(index, 1);
          this.setData({
            baosunGoods: baosunGoods
          })
          wx.setStorageSync('baosunGoods', baosunGoods);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onShow: function () {
    this.setData({
      checkListStr: wx.getStorageSync('checkListStr') || '',
      lookListStr: wx.getStorageSync('lookListStr') || '',
      checkList: wx.getStorageSync('checkList') || '',
      lookList: wx.getStorageSync('lookList') || '',
      remark: wx.getStorageSync('remark')||'',
    })
    // 审核人
    var reList = wx.getStorageSync('reList') || '';
    var typeval = this.data.typeval;
    if (typeval && typeval=='check'){
      // checkList
      var checkListStr = '';
      for (var i = 0; i < reList.length;i++){
        checkListStr += reList[i].now_realname;
        if (i < reList.length-1){
          checkListStr += ','
        }
      }
      this.setData({
        checkList: reList,
        checkListStr: checkListStr,
        typeval: null
      })
      wx.setStorageSync('checkList', reList)
      wx.setStorageSync('checkListStr', checkListStr)
    } else if (typeval && typeval == 'look') {
      // checkList
      var lookListStr = '';
      for (var i = 0; i < reList.length; i++) {
        lookListStr += reList[i].now_realname;
        if (i < reList.length - 1) {
          lookListStr += ','
        }
      }
      this.setData({
        lookList: reList,
        lookListStr: lookListStr,
        typeval: null
      })
      wx.setStorageSync('lookList', reList)
      wx.setStorageSync('lookListStr', lookListStr)
    }
    // wx.removeStorageSync('reList');
    var baosunBack = wx.getStorageSync('baosun') || '';
    var baosunGoods = wx.getStorageSync('baosunGoods') || '';
    if (baosunBack) {
      if (baosunGoods && baosunGoods.length>0) {
        for (let i = 0; i < baosunGoods.length; i++) {
          if (baosunGoods[i].goods_id == baosunBack.goods_id) {
            common.tip('选中的商品已存在', 'none');
            this.setData({
              scrollToThere: 'scroll' + i
            })
            break;
          }
          if (i >= baosunGoods.length - 1) {
            baosunGoods.push(baosunBack);
            break;
          }
        }
      } else {
        baosunGoods = [baosunBack];
      }
    }
    wx.removeStorageSync('baosun');
    wx.setStorageSync('baosunGoods', baosunGoods);
    var breakage_file = wx.getStorageSync('breakage_file') || '';
    // var filePath = wx.getStorageSync('filePath') || '';
    this.setData({
      baosunGoods: baosunGoods,
      // filePath: filePath,
      breakage_file: breakage_file
    })

    this.countMoney();
  },
  onLoad: function () {
    let member = app.globalData.member;
    this.setData({
      member: member
    })
  }

})
