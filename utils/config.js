// var host = "http://gy.t.geekzj.cn/apimd/";
// var host = "http://192.168.3.29/apimd/";
var host = "https://wb.qingwajia.cn/apimd/";
var config = {
  // 下面的地址配合云端 Server 工作
  host,
  apiUrl: host,
  //微信授权登录
  login: `${host}common/wxidentity`, 
  //短信接口
  sendsmscode: `${host}common/sendsmscode`,
  //用户授权
  auth: `${host}common/auth`,
  //用户注册
  register: `${host}common/register`,

  baosun:`${host}mdreportloss/index`,
  //商品列表
  goodslist: `${host}apigoods/index`,

  //购物车
  shopcartadd: `${host}apicart/add`,
  shopcartinfo: `${host}apicart/info`,
  shopcartindex: `${host}apicart/index`,

  //个人中心
  mine: `${host}apicoustomer/index`,

  // 库存
  stock: `${host}storagegoods/index`,
  // 订单
  order: `${host}apiorder/index`,
  // 销售报表
  sale: `${host}apiorderreport/index`,
  // 请货
  request: `${host}psorder/index`,
  // 商品分类
  category: `${host}goodscategory/index`,
  // 商品信息
  goods: `${host}goods/index`,
  // 我的账户
  account: `${host}storeaccount/index`,
  // 申请提现
  tixian:`${host}storeaccount/index`,
  // pc端提现者身份验证
  checkID:`${host}apicheck`,
  // 提现
  cash: `${host}apicashback`,
  // 客户列表
  customer:`${host}storeaccount/index`,
  // 个人信息
  personal:`${host}storeaccount/index`,


  //门店信息
  store: `${host}apistore/index`,
  //支付接口
  payment: `${host}payment/wxpay`,
  //支付返回
  check_weixin_order: `${host}payment/check_weixin_order`,

};
module.exports = {
  host: host,
  config: config,
}
