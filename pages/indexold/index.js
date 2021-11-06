// pages/service/service.js
const app = getApp()
import {timestampToTime, routerFiliter} from '../../utils/util'
import {getBarch,is_show} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: 0,
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
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
  gotoDetail(e){
    let id = e.currentTarget.dataset.id
    let url = '/pages/newlists/detail/detail?id=' + id
    routerFiliter(url)
  },
  toActivity(e){
    wx.switchTab({
      url: '/pages/littlegame/activityList/activityList',
    })
    // routerFiliter('/pages/littlegame/activityList/activityList')
  },
  tomeiwen(){
    wx.switchTab({
      url: '/pages/newlists/newlist/newlist',
    })
  },
  tohuigu() {
    routerFiliter('../littlegame/poster/poster')
  },
  toDetial(e){
    let id = e.currentTarget.dataset.id
    let url = '/pages/persdata/persdata?id=' + id
    routerFiliter(url)
  },
  togame(){
    routerFiliter('../littlegame/list/list')
    // routerFiliter('../littlegame/poster/poster')
  },
  tomall() {
    routerFiliter('../mall/mallList/mall')
  },
  toTieZi(){
    routerFiliter('../wescom/wescomList/list')
  },
  toLoveList() {
    routerFiliter('../lovelist/lovelist')
  },
  swiperChange(e) {
    let current = e.detail.current;
    let that = this;
    that.setData({
      swiperCurrent: current,
    })
  },
  //推荐有礼
  async getHomeInof(){
    let res = await getBarch({
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
  })
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
  },
  tonewList() {
    wx.switchTab({
      url: '/pages/newlists/newlist/newlist',
    })
    // routerFiliter('')
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
    setTimeout(_=>{
      this.getHomeInof()
    },300)
  },

  /**
   * 生命周期函数--监听页面显示
   */
    onShow:  async function() {
      let res = await is_show()
      this.setData({
        isShow: res.data.show
      })
      // this.getHomeInof()
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