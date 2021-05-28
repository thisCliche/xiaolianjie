// pages/littlegame/list/list.js
import {gameList} from '../../../api/api'
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
        })
      },
      toContent(e){
        wx.navigateTo({
          url: '/'+e.currentTarget.dataset.router,
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
      gameList().then(res=>{
        this.setData({
          list: res.data
        })
      })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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