// pages/littlegame/activityReginst/reginst.js
import {activityDetail,signupActivity} from '../../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id: '',
    detail: ''
  },
  backUp() {
    wx.navigateBack({
      delta: 1,
    })
  },
  toSign(e){
    console.log(e)
    wx.navigateTo({
      url: '../signInfo/signinfo?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activity_id: options.id
    })
    
    // console.log(options.id)
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
    activityDetail({activity_id:this.data.activity_id}).then(res=>{
      res.data.join_list.forEach(item=>{
        item.mobile = item.mobile.replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2");
      })
      res.data.start_time=res.data.start_time.substring(0,10)
      res.data.end_time=res.data.end_time.substring(0,10)
      this.setData({
        detail: res.data
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
    let that =this;
      return {
        title: that.data.detail.title, // 转发后 所显示的title
        path: '/pages/littlegame/activityReginst/reginst?id='+ that.data.activity_id, // 相对的路径
        imageUrl: that.data.detail.background_image,
        success: (res)=>{    // 成功后要做的事情
          console.log(res.shareTickets[0])
        },
        fail: function (res) {
          // 分享失败
          console.log(res)
        }
      }
  }
})