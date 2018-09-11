// 输入框插件
// page页面需在input的bindfocus事件为'showInputModal',
// 调用方法：onLoad方法里 inputModal.inputModal(this,callstart,callback);
// 传入（page对象，点击输入框回调，确定执行的回调函数）
const app = getApp();
let inputModal = null;
{
  let that = null;
  let callback = null;
  inputModal = function (target, _callstart, _callback){
    that = target;
    let callstart = _callstart;
    let callback = _callback;
    that.setData({
      showInputModel: true
    })
    // 显示输入框模态框
    that.showInputModal = function (e) {
      var curInputValue = e.detail.value;
      this.setData({
        inputModelStatus: true,
        curInputValue: curInputValue
      })
      callstart(e);
    }
    // 确定
    that.inputSure = function () {
      wx.showLoading({
        title: '加载中...',
      })
      var curInputValue = this.data.curInputValue;
      this.setData({
        inputModelStatus: false
      })
      console.log(this.data.curInputValue);
      
      callback(curInputValue);
    }
    // 减
    that.inputReduce = function () {
      this.setData({
        curInputValue: parseFloat(this.data.curInputValue) - 1
      })
    }
    // 加
    that.inputAdd = function () {
      this.setData({
        curInputValue: parseFloat(this.data.curInputValue) + 1
      })
    }
    // 输入
    that.changeInputModal = function(e) {
      this.setData({
        curInputValue: e.detail.value
      })
    }
    // 隐藏
    that.inputClose = function() {
      this.setData({
        inputModelStatus: false
      })
    }
  }
}

module.exports = {
  inputModal: inputModal
}