// pages/me/me.js
import { routerFiliter} from '../../utils/util'
import {
  getMemberDetail,getUserCode,is_show
} from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    nickName: '',
    avatarUrl: '',
    member_id: '',
    credit: '',
    show:false,
    kefuurl: '',
    isShow: 1,
  },
  onClickHide(){
    this.setData({show:false})
  },
  toVisiting() {
    routerFiliter(`../persdata/persdata?id=${this.data.member_id}&fromme=yes`)
  },
  toGeren() {
    routerFiliter('../medata/medata')
  },
  toMessage() {
    routerFiliter('../message/message')
     },
  toLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  tokefu(){
    getUserCode().then(res=>{
      this.setData({show:true,kefuurl:res.data})
    })
  },
  toconfirm(){
    wx.setClipboardData({
      data: this.data.kefuurl.name
    })
  },
  tofenxiao(){
    routerFiliter('./fenxiao/fenxiao')
  },
  towinCheck() {
    routerFiliter('./winCheck/wincheck')
  },
  toOrder(){
    routerFiliter('../mall/order/order')
  },
  tojifen() {
    routerFiliter('./jifen/jifen')
  },
  toLocation() {
    routerFiliter('../mall/location/location')
  },
  towescom(){
    routerFiliter(`../wescom/wescomList/list?from=me`)
  },
  toVip(){
    routerFiliter('../user/user')
  },
  outLogin(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定退出登录吗？',
      success (res) {
        if (res.confirm) {
          wx.setStorage({
            data: '',
            key: 'token',
          })
          that.setData({
            isLogin:false
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    let that = this
    is_show().then(res=>{
      this.setData({
        isShow : res.data.show
      })
      // console.log(res)
    })
    wx.getStorage({
      key: 'nickName',
      success (res) {
        if(res.data){
          that.setData({
            nickName: res.data,
          })
        }
      },
      fail(error) {

      }
    }) 
    wx.getStorage({
      key: 'avatarUrl',
      success (res) {
        if(res.data){
          that.setData({
            avatarUrl:res.data,
          })
        }
      },
      fail(error) {
      }
    }) 
    wx.getStorage({
      key: 'token',
      success (res) {
        if(res.data != ''){
          that.setData({
            isLogin:true
          })
        }else {
          that.setData({
            isLogin:false
          })
        }
      },
      fail(error) {
      }
    }) 
    wx.getStorage({
      key: 'member_id',
      success (res) {
        if(res.data){
          that.setData({
            member_id:res.data
          })
          getMemberDetail({
            member_id: res.data
          }).then(res=>{
            that.setData({
              credit:res.data.detail.details.credit
            })
          })
        }
      },
      fail(error) {
      }
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