// pages/home/home.js
import {entitiestoUtf16,timestampToTime} from '../../../utils/util'
import {articleList,memberDetail} from '../../../api/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    securyheight: app.globalData.statusBarHeight + 84 +72 +50,
    triggered: false,
    noteList: [],
    queryInfo: {
      // 当前页码
      page: 1,
      // 当前每页条数
      pagesize: 7
    },
    total_page: 0,
    nomore: false
  },
  backUp() {
    wx.navigateBack({
      delta: 1,
    })
  },
  onClickRight() {
    // console.log('发生了点击')
    memberDetail().then(res=>{
      if(res.data.auth == 3) {
        wx.showToast({
          title: '请重新认证',
          icon:'error'
        })
        setTimeout(_=>{
          wx.navigateTo({
            url: '/pages/vipuser/vipuser',
          })
        },500)
        return 
      }else if(res.data.auth == 2){
        return wx.showToast({
          title: '认证中..',
          icon:'error'
        })
      }
      else{
wx.navigateTo({
      url: '../sendwescom/send',
    })
      }
    })
    
  },
  getNoteList() {
    let that = this
    articleList({page:this.data.queryInfo.page,pagesize:this.data.queryInfo.pagesize,type:this.data.type}).then(res=>{
      let result = res.msg.comments;
      let total_page = res.msg.total_page;
      // 修改用户名与时间戳 
      result.forEach(idx => {
        idx.create_time = timestampToTime(idx.create_time)
        idx.content = entitiestoUtf16(idx.content)
      })
      
      that.setData({
        noteList: result,
        total_page
      })
    })
  },
  todetail(e){
      wx.navigateTo({
        url: '../wescomDetail/detial?id='+e.currentTarget.dataset.id,
      })
  },
  bottoOut(){
    
    let queryInfo = this.data.queryInfo
    if(queryInfo.page>= this.data.total_page) return this.setData({
      nomore: true
    })
    wx.showNavigationBarLoading();
    queryInfo.page+=1
    this.setData(
      {queryInfo}
    )
    articleList({page:this.data.queryInfo.page,pagesize:this.data.queryInfo.pagesize,type:1}).then(res=>{
      let result = res.msg.comments;
      let total_page = res.msg.total_page;
      // 修改用户名与时间戳 
      result.forEach(idx => {
        idx.create_time = timestampToTime(idx.create_time)
        idx.content = entitiestoUtf16(idx.content)
      })
      let noteList = this.data.noteList
      let newList = noteList.concat(result)
      this.setData({
        noteList: newList,
        total_page
      })
      wx.hideNavigationBarLoading();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.from == 'me'){
      this.setData({
        type: 2
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getNoteList()
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
  onRefresh: function () {
    let queryInfo = {
      page: 1,
      pagesize: 7
    }
    this.setData({
      queryInfo
    })

    this.getNoteList()
    this.setData({
      triggered: false,
    })
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