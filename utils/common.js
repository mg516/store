const common = {
  //提示信息
  tip: function (tip, statue) {
    wx.showToast({
      title: tip,
      icon: statue,
    })
  },
  //存缓存
  setStor: function (key, data) {
    wx.setStorage({
      key: key,
      data: data,
    })
  },

  //秒杀函数
  cutDownTime: function (time, that) {
    var interval = setInterval(function () {
      var a = Date.parse(time)//获取结束时间戳的总毫秒数
      var b = Date.parse(new Date())//获取当前时间戳的总毫秒数
      var second = (a - b) / 1000//获取时间戳的差值，并换成相应的秒数

      // 小时位  
      var hr = Math.floor((second) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位  
      var min = Math.floor((second - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位  
      var sec = second - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      //格式拼接
      //var showTime = hrStr + ":" + minStr + ":" + secStr + "";//时分秒拼接在一起

      if (second < 0) {//当秒数小于0时
        clearInterval(interval);//定时器停止
        wx.showToast({
          title: '活动已结束',
        });
        var hourtime = '00'
        var mintime = '00'
        var sectime = '00'
      } else {
        var hourtime = hrStr
        var mintime = minStr
        var sectime = secStr
      }

      //渲染倒计时
      that.setData({
        hourtime: hourtime,
        mintime: mintime,
        sectime: sectime,
      });
      second--;
    }.bind(this), 1000)
  },
  shopcartadd:(path,param,_app,_that,callback)=>{
    let app = _app;
    let that = _that;
    wx.request({
      url: path,
      data:param,
      method:'POST',
      success:(res)=>{
        if(res.data.code == 1){
          callback();
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      },
      fail:(res)=>{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    })
  },
  today: function(){
    var time = new Date();
    var y = time.getFullYear();
    var m = time.getMonth() + 1;//获取当前月份的日期 
    var d = time.getDate();
    if (m < 10) m = '0' + m;
    if (d < 10) d = '0' + d;
    return y + "-" + m + "-" + d;
  },
  GetDay: function (day) {
    var time = new Date();
    time.setDate(time.getDate() + day);//获取Day天后的日期 
    var y = time.getFullYear();
    var m = time.getMonth() + 1;//获取当前月份的日期 
    var d = time.getDate();
    if (m < 10) m = '0' + m;
    if (d < 10) d = '0' + d;
    return y + "-" + m + "-" + d;
  },
  Month: function (month) {
    var time = new Date();
    time.setDate(time.getDate());//获取Day天后的日期 
    var y = time.getFullYear();
    var m = time.getMonth() + month + 1;//获取当前月份的日期 
    var d = time.getDate();
    if (m < 10) m = '0' + m;
    if (d < 10) d = '0' + d;
    return y + "-" + m + "-" + d;
  },
  loading: function(text){
    wx.showLoading({
      title: text || '加载中',
    })
    setTimeout(() => {
      wx.hideLoading();
    },2000)
  },
  pullLoading:function(){
    wx.showNavigationBarLoading();
    setTimeout(() => {
      wx.hideNavigationBarLoading()
    }, 2000)
  },
  hidePullLoading:function(){
    wx.hideLoading();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  pattFunc: function (testType, str){
    let status = false;
    let patt = null;
    switch (testType){
      case 'ifPhone': patt = /^\d{11}$/g; break;
      case 'ifEmail': patt = /^\S+@\w+\.(net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$/g; break;
      default: break;
    }
    if (patt) return patt.test(str)
  },
  //保留N位小数 //传入数字和保留小数点位数
  pattNumFunc: function (__num, _digits){
    let _num = __num.toString();
    var re = new RegExp('([0-9]+\.[0-9]{' + _digits + '})[0-9]*', "g"); // re为/^\d+bl$/gim
    let num = _num.replace(re, "$1");//保留两位小数
    return num;
  },
  // 拆分小数和整数部分(__digits 小数部分的位数)
  pattIntFloat: function (__num, __digits){
    let _num = __num.toString();
    let _digits = __digits + 1;
    let numArr = _num.split(".");
    if (numArr[1]) numArr[1] += new Array(_digits - numArr[1].length).join('0')
    else numArr[1] = new Array(_digits).join('0')
    return numArr;
  }
}


module.exports = {
  common: common,
}