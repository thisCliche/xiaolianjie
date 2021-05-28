// pages/littlegame/activityList/activityList.js
import {getactivitylist} from '../../../api/api'
import {routerFiliter} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  backUp() {
    wx.navigateBack({
      delta: 1,
      ed_arr: [],
      ing_arr: []
    })
  },
  todetail(e){
    let url = '../activityReginst/reginst?id='+e.currentTarget.dataset.id
    routerFiliter(url)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getactivitylist().then(res=>{
      res.data.ed_arr.forEach(item=>{
        item.start_time = item.start_time.substring(0,10)
      })
      res.data.ing_arr.forEach(item=>{
        item.start_time = item.start_time.substring(0,10)
      })
      this.setData({
        ed_arr: res.data.ed_arr,
        ing_arr: res.data.ing_arr
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})