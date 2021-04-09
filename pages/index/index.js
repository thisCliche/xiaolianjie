// pages/service/service.js
const app = getApp()
import {sendLogin} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 800,
    swiperCurrent: 0,
    statusBarHeight: app.globalData.statusBarHeight,
    imgUrls: ['/icon/banner.png','/icon/banner.png','/icon/banner.png'],
    show: false,
    image: app.globalData.image
  },
  swiperChange(e) {
    let current = e.detail.current;
    // console.log(current, '轮播图')
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
  //点击客服预约
  showbtn() {
    this.setData({
      show: !this.data.show
    })
  },
  //点击搜索
  search() {
    wx.navigateTo({
      url: '../indexSearch/indexSearch',
    })
  },
  //留学攻略
  strategy() {
    wx.navigateTo({
      url: '../strategy/strategy',
    })
  },
  //资料下载
  database() {
    wx.getStorage({
      key: 'userinfo',
      success: res => {
        wx.requestSubscribeMessage({
          tmplIds: ['-k0OQ0cnU14zWrSWm9Nh3k34P--Xn6YBuwpT_QpMwpo'],
          success(res) { }
        })
        wx.navigateTo({
          url: '../database/database',
        })
      },
      fail: res => {
        wx.showModal({
          title: '提示',
          content: '是否授权登录体验完整小程序？',
          showCancel: true,
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '../wxlogin/wxlogin',
              })
            }
          },
        })
      }
    })

  },
  //目的国家
  countrylist() {
    wx.navigateTo({
      url: '../countrylist/countrylist',
    })
  },
  //推荐有礼
  service() {
    wx.getStorage({
      key: 'userinfo',
      success: res => {
        wx.navigateTo({
          url: '../service/service',
        })
      },
      fail: res => {
        wx.showModal({
          title: '提示',
          content: '是否授权登录体验完整小程序？',
          showCancel: true,
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '../wxlogin/wxlogin',
              })
            }
          },
        })
      }
    })

  },
  //院校排行
  grade() {
    wx.navigateTo({
      url: '../grade/grade',
    })
  },
  //专业排行
  gradezy() {
    wx.navigateTo({
      url: '../gradeSpecialty/gradeSpecialty',
    })
  },
  //点击活动消息
  active() {
    sendLogin({page:'1',size:"10",criCode:''}).then(res=>{console.log(res)})
    // wx.navigateTo({
    //   url: '../activity/activity?activity=' + 2,
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})