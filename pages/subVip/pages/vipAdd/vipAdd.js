const app = getApp();
const common = require('../../../../utils/common.js').common;
const config = require("../../../../utils/config.js").config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardStatusList: [{ name: '未激活', id: 1 }, { name: '正常', id: 2 }, { name: '已到期', id: 2 }],
    cardStatusIndex:-1,
    sexList: [{ name: '男', id: 1 }, { name: '女', id: 2 }],
    sexIndex:-1,
    storeList: [{ id: 1, name: '苗栗路店1' }, { id: 2, name: '苗栗路店2' }, { id: 3, name: '苗栗路店3' }, { id: 4, name: '苗栗路店4' }],
    storeIndex: -1,
    birthStart: '1990-01-01',
    birthEnd: common.GetDay(-365 * 10),
    birthday: null,
    intDay: null,
    moneyDay: null,
    today: common.today()
  },
  bindDateChange: function (e) {
    let valtype = e.currentTarget.dataset.valtype;
    let value = e.detail.value;
    if (valtype == 'birthday') this.setData({birthday: e.detail.value})
    else if (valtype == 'intDay') this.setData({ intDay: e.detail.value }) 
    else if (valtype == 'moneyDay') this.setData({ moneyDay: e.detail.value }) 
    else if (valtype == 'curstore') this.setData({ storeIndex: e.detail.value }) 
    else if (valtype == 'sex') this.setData({ sexIndex: e.detail.value }) 
    else if (valtype == 'cardStatus') this.setData({ cardStatusIndex: e.detail.value }) 
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let valueArr = e.detail.value;
    if (!valueArr.n_1.replace(/\s/g, '')) { common.tip('请输入会员ID', 'none'); return ''; }
    if (!valueArr.n_2.replace(/\s/g, '')) { common.tip('请输入会员卡号', 'none'); return ''; }
    if (valueArr.n_3 < 0) { common.tip('请选择发卡门店', 'none'); return ''; }
    if (!valueArr.n_4.replace(/\s/g, '')) { common.tip('请输入会员名称', 'none'); return ''; }
    if (!valueArr.n_5) { common.tip('请输入会员密码', 'none'); return ''; }
    else if (valueArr.n_5.length < 6) { common.tip('请输入至少6位的会员密码', 'none'); return ''; }
    if (!valueArr.n_6) { common.tip('请输入确认密码', 'none'); return ''; }
    else if (valueArr.n_5 != valueArr.n_6) { common.tip('两次密码输入不一致', 'none'); return ''; }
    if (!valueArr.n_7) { common.tip('请选择会员生日', 'none'); return ''; }
    let emailStatus = common.pattFunc('ifEmail', valueArr.n_8)
    if (!valueArr.n_8) { common.tip('请输入邮箱', 'none'); return ''; }
    else if (!emailStatus) { common.tip('请输入正确的邮箱', 'none'); return ''; }
    if (!valueArr.n_9.replace(/\s/g, '')) { common.tip('请输入父卡卡号', 'none'); return ''; }
    if (!valueArr.n_10.replace(/\s/g, '')) { common.tip('请输入父卡ID', 'none'); return ''; }
    if (!valueArr.n_11) { common.tip('请选择积分到期日', 'none'); return ''; }
    if (!valueArr.n_12) { common.tip('请选择储值到期日', 'none'); return ''; }
    let phoneStatus = common.pattFunc('ifPhone', valueArr.n_13)
    if (!valueArr.n_13) { common.tip('请输入会员联系方式', 'none'); return ''; }
    else if (!phoneStatus) { common.tip('请输入正确的会员联系方式', 'none'); return ''; }
    if (valueArr.n_14 < 0) { common.tip('请选择会员性别', 'none'); return ''; }
    if (valueArr.n_15 < 0) { common.tip('请选择会员卡状态', 'none'); return ''; }
    // 。。。选择性别，会员卡状态
  },
  onLoad: function (options) {

  },
  onShow: function () {

  }
})