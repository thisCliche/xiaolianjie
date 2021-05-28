// pages/me/fenxiao/fenxiao.js
import {postapplymatchmaker,getapplymatchmaker} from '../../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: '',
    isdisabled :false
  },
  newApp(){
    postapplymatchmaker().then(res=>{
      console.log(res)
      wx.showToast({
        title: '等待后台审核',
      })
    })
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
    getapplymatchmaker().then(res=>{
      if(res.data.data.agent_status == 2) {
        this.setData({isdisabled: true})
      }
      this.setData({
        bgImg: res.data.image
      })
      console.log(res)
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