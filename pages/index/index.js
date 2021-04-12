// pages/service/service.js
const app = getApp()
import {timestampToTime, routerFiliter} from '../../utils/util'
import {getBarch} from '../../api/api.js'
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
    image: app.globalData.image,

    bannerList:[],
    bannerList1: [],
    recommend: [],
    activity: [],
    article: [],
  },
  toLoveList() {
    routerFiliter('../lovelist/lovelist')
    // wx.navigateTo({
    //   url: '../lovelist/lovelist',
    // })
  },
  swiperChange(e) {
    let current = e.detail.current;
    // console.log(current, '轮播图')
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
  //推荐有礼
  
  tonewList() {
    routerFiliter('/pages/newlists/newlist/newlist')
    // wx.navigateTo({
    //   url: '/pages/newlists/newlist/newlist',
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
    // console.log(timestampToTime(1616132061))
    getBarch({
      'get_list':{},
      'product.get_list': { withsku: 1, type: 4, pagesize:4},
      'product.get_cates': { goods_count: 4,withsku:1 },
      'article.get_list': {pagesize:3},
      'advs': {
          flag: 'banner'
      },
      'four_advs': {
          call: 'advs',
          flag: 'fourmenu'
      },
      'medium_advs': {
          call: 'advs',
          flag: 'midbanner'
      }
  }).then(res=>{
    let article = res.data['article.get_list'].lists
    article.forEach(item=>{
      item.create_time = timestampToTime(item.create_time)
    })
      this.setData({
        bannerList: res.data.advs,
        bannerList1:res.data.medium_advs,
        recommend: res.data.get_list,
        activity: res.data.four_advs,
        article,
      })
    }).catch(error=>{
      wx.showToast({
        title: '网络错误',
      })
    })
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