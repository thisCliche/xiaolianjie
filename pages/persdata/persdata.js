// pages/persdata/persdata.js
const app = getApp()
import {
  getMemberDetail,leaveMessageapi,is_show
} from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    id: '',
    perdata: [],
    demand: [],
    nick: '',
    bg: 'https://img.xiaojiayun.top/bg1.png',
    avatar: 'https://img.xiaojiayun.top/avatar1.png',
    leaveMessage: '',
    isme: false,
    isVip: false,
    isShow: 1,
  },

  backUp() {
    wx.navigateBack({
      delta: 1,
    })
  },
  inputConten(e){
    this.setData({
      leaveMessage: e.detail.value
    })
  },
  toLeaveMeass() {
    let that = this
    if(this.data.leaveMessage == '') return wx.showToast({
      title: '请输入内容',
      icon: 'error'
    })
    let form = {
      source_member: this.data.id,
      content: this.data.leaveMessage
    }
    leaveMessageapi(form).then(res=>{
      that.setData({
        leaveMessage : ''
      })
      if(res.msg == '留言成功') return wx.showToast({
        title: '留言成功！',
      })
      else return wx.showToast({
        title: res.msg,
        icon: 'error'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: parseInt(options.id)
      })
      if(options.fromme){
        this.setData({
          isme: true
        })
      }
      this.params = {
        id: this.data.id,
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    getMemberDetail({
      member_id: this.data.id
    }).then(res => {
      let perdata = [],
        demand = [],
        nick = "",
        bg = '',
        source_auth=false,
        avatar = "";
      if (res.data.detail.gender) perdata[0] = res.data.detail.gender == 1 ? '男' : '女'
      if (res.data.detail.birthday) perdata[1] = res.data.detail.birthday + '岁'
      if (res.data.detail.height) perdata[2] = res.data.detail.height + 'cm'
      if (res.data.detail.weigh) perdata[3] = res.data.detail.weigh + 'kg'
      if (res.data.detail.marriage) perdata[4] = res.data.detail.marriage
      if (res.data.detail.city) {
        perdata[5] = res.data.detail.city + res.data.detail.county
      }
      if (res.data.detail.select_age_text) demand[0] = res.data.detail.select_age_text
      if (res.data.detail.select_height_text) demand[1] = res.data.detail.select_height_text
      if (res.data.detail.select_salary_text) demand[2] = res.data.detail.select_salary_text
      if (res.data.detail.select_mary_text) demand[3] = res.data.detail.select_mary_text
      if (res.data.detail.select_edu_text) demand[4] = res.data.detail.select_edu_text
      if (res.data.detail.details.avatar) avatar = res.data.detail.details.avatar
      if (res.data.detail.details.life_image) bg = res.data.detail.details.life_image
      if (res.data.detail.details.nickname) nick = res.data.detail.details.nickname
      if (res.data.detail.details.source_auth == 1) source_auth = true
      this.setData({
        perdata,
        demand,
        avatar,
        bg,
        nick,
        isVip: source_auth
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    is_show().then(res=>{
      this.setData({
        isShow: res.data.show
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