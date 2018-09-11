const app = getApp();
const common = require('../../../../utils/common.js').common;
const config = require("../../../../utils/config.js").config;
Page({
  data: {
    customItem: '请选择',
    region: ['选择地区', '', ''],
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 提交
  formSubmit:function(e){
    let valueArr = e.detail.value;
    // 判断收货人是否为空
    if (!valueArr.sh_name.replace(/\s/g, '')){ common.tip('请输入收货人', 'none');return ''; }
    // 判断是否为手机号
    let phoneStatus = common.pattFunc('ifPhone', valueArr.sh_phone)
    if (!valueArr.sh_phone) { common.tip('请输入手机号', 'none'); return ''; }
    else if (!phoneStatus) { common.tip('请输入正确的手机号', 'none');return ''; }
    if (!valueArr.sh_addr[2] || valueArr.sh_addr[2].indexOf('请选择') > -1){ common.tip('请选择所在地区', 'none'); return ''; }
    if (!valueArr.sh_address.replace(/\s/g, '')){ common.tip('请输入详细地址', 'none'); return ''; }
    console.log(e.detail.value)
  },
  pattFunc: function (patt,str){
    let status = patt.test(str);
    return status;
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
  
  }
})