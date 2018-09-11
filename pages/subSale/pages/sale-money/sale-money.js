const app = getApp();
const common = require('../../../../utils/common.js').common;
const config = require("../../../../utils/config.js").config;

import * as echarts from '../../resource/ec-canvas/echarts';
let chart = null;
let chartPie = null;
function setOption(chart,xData,yData) {
  const option = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '4%',
      top: '8%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: xData,
        axisTick: {
          alignWithLabel: true
        },
        axisLine:{
          lineStyle:{
            color:'#999999'
          }
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {//坐标轴颜色
            color: '#999999'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {//网格颜色
            color: ['#eee'],
            width: 1,
            type: 'solid'
          }
        }
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        itemStyle: {
          normal: {
            color: function (params) {
              var colorList = [
                '#061C69', '#3357DB', '#2185D9', '#45F9FF', '#7EACED',
                '#061C69', '#3357DB', '#2185D9', '#45F9FF', '#7EACED',
                '#061C69', '#3357DB', '#2185D9', '#45F9FF', '#7EACED',
              ];
              return colorList[params.dataIndex]
            },
            label: {
              normal: {
                show: false,
                position: 'inside'
              },
            },
          }
        },
        barWidth: '20',
        data: yData
      }
    ]
  };
  chart.setOption(option);
}
function setOptionPie(chartPie, pieData){
  const optionPie = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: pieData,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };
  chartPie.setOption(optionPie);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_year:null,
    activeBarIndex:0,
    ifLoading:false,
    ifLoading_pie:false,
    ec: {
      lazyLoad: true
    },
    showdelect: false,//搜索框的清除开始隐藏
    goodsArray: [
      { id: '1', name: '石桥一路店' },
      { id: '2', name: '武汉天地店',  }
    ],
    saleList: [
      { id: '1', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '2', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '3', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '4', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '5', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' },
      { id: '6', time: '2018.07.21', num: 961354, payOff: 964673.21, saleMoney: 964673.21, moneyRate: '35%' }
    ],
    goodsIndex:0,
    arr: [],
    idarr: []
  },
  // 切换时间
  bindDateChange:function(e){
    this.setData({
      cur_year: e.detail.value
    })
    this.upDataChart();
  },
  handleCalendar:function(e){
    let barType = e.currentTarget.dataset.handle;
    if (barType == 'prev'){
      this.setData({
        cur_year: this.data.cur_year-1
      })
    } else if (barType == 'next') {
      this.setData({
        cur_year: this.data.cur_year+1
      })
    }
    this.upDataChart();
  },
  // 取消选择，picker箭头向下
  cancelPicker:function(){
    this.setData({
      goodsPickerOpen: false
    })
  },
  changePickerStatus:function(){
    this.setData({
      goodsPickerOpen: !this.data.goodsPickerOpen
    })
  },
  onPullDownRefresh: function () {
    common.pullLoading();
    common.loading();
    console.log('下拉刷新')
    this.getSalesData();
  },
  // 跳转到订单列表
  toOrderList:function(e){
    console.log(e.currentTarget.dataset.status)
    let status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: `/pages/subOrder/pages/order-list/order-list?status=${status}`,
    })
  },
  // 更新饼图
  upDataChartPie:function(){
    this.setData({
      ifLoading_pie: true
    })
    if (this.chartPie) {
      this.chartPie.dispose();
    }
    let saleData = this.data.saleData;
    let dataPie = [
      { value: saleData.today_pick_0_num, name: '待自提 ' + saleData.today_pick_0_num },
      { value: saleData.today_pick_2_num, name: '已自提 ' + saleData.today_pick_2_num },
      { value: saleData.today_dispatch_0_num, name: '待配送 ' + saleData.today_dispatch_0_num },
      { value: saleData.today_dispatch_1_num, name: '配送中 ' + saleData.today_dispatch_1_num },
      { value: saleData.today_dispatch_2_num, name: '已配送 ' + saleData.today_dispatch_2_num }
    ]
    // setTimeout(() => {
      this.setData({
        ifLoading_pie: false
      })
      this.initChartPie(dataPie)
    // }, 500);
  },
  // 初始化饼图
  initChartPie: function (_dataPie){
    var dataPie = _dataPie;
    this.ecComponentPie.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOptionPie(chart, dataPie);
    });
  },
  // 更新图表数据
  upDataChart:function(){
    this.setData({
      ifLoading:true
    })
    if (this.chart) {
      this.chart.dispose();
    }
    var xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var yData = [100, 100, 100, 100, 400, 400, 400, 400, 200, 200, 200, 100];
    setTimeout(()=> {
      this.setData({
        ifLoading: false
      })
      this.initChart(xData, yData)
    }, 500);
  },
  // 点击按钮后初始化图表
  initChart: function (_xData, _yData) {
    var xData = _xData||[1, 2, 3, 4, 5, 6, 7];
    var yData = _yData||[800, 800, 800, 800, 800, 800, 100];
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, xData, yData);
    });
  },
  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    // this.upDataChart();
    this.ecComponentPie = this.selectComponent('#mychart-dom-pie');
    // this.upDataChartPie();
  },
  // 获取商品排行列表
  getSalesData: function (_param) {
    common.loading('加载中');
    let param = null;
    param = {
      access_token: app.globalData.access_token,
      user_token: app.globalData.user_token,
      action: 'real_time_sales'
    }
    wx.request({
      url: config.sale,
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        wx.hideLoading();
        if (res.data.data) {
          this.setData({
            saleData: res.data.data
          })
          this.upDataChartPie();
        } else {
          
        }
      },
      complete: (res) => {
        wx.hideLoading();
        wx.stopPullDownRefresh() //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
      }
    })
  },
  onShow: function () {
    this.setData({
      member: app.globalData.member
    })
    this.getSalesData();
  },
  onLoad: function (options) {
  }
})
