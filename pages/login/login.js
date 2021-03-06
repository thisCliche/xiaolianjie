// pages/login/login.js
const app = getApp()
import {sendLogin,getPhoneNum} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    userPhone: '',
    isLogin: true
  },
  backUp() {
    wx.navigateBack({
      delta: 1,
    })
  },
  getPhoneNumber(e){
    let data = {
      appid: app.globalData.wxid,
      iv: e.detail.iv,
      encryptedData:e.detail.encryptedData
    }
    if(e.detail.errMsg == "getPhoneNumber:ok"){
     wx.showLoading({
       title: '获取中...',
     })
      getPhoneNum(data).then(res=>{
        if(res.msg == "绑定成功"){
          wx.hideLoading()
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
  },
  getUserProfile() {
    let that = this
  wx.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      console.log(res);
      wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
      wx.setStorageSync('nickName', res.userInfo.nickName)
      wx.showLoading({
        title: '登录中...',
      })
      if(res.errMsg == 'getUserProfile:ok'){
        // this.data.userinfo = res.userInfo;
        // this.data.detail = {
        //     'encryptedData' : res.encryptedData,
        //     'iv' : res.iv,
        //     'rawData' : res.rawData,
        //     'signature' : res.signature,
        // }
        wx.login({
          success: (lres) => {
              if (lres.code) {
                  var data = {
                      code: lres.code,
                      wxid: app.globalData.wxid,
                      rawData: res.rawData,
                      signature: res.signature,
                      scene:app.globalData.scene,
                      encryptedData:res.encryptedData,
                      iv:res.iv
                  }
                  const code = lres.code  
                  sendLogin(data).then(json=>{
                    wx.hideLoading()
                    if (json.data && json.data.token) {
                      wx.setStorageSync('token',json.data.token)
                      wx.setStorageSync('member_id',json.data.member_id)
                      wx.setStorageSync('refreshToken',json.data.refresh_token)
                      if(json.data.mobile_bind == 0) {
                        that.setData({
                          isLogin: false
                        })
                      }else{
                        wx.navigateBack({
                        delta: 1,
                      })
                      }                        
                    } else {
                      wx.showToast({
                        title: json.msg || "获取登录信息失败",
                        icon: 'error',
                        duration: 2000
                      })
                    }
                  }).catch(res => {
                    wx.showToast({
                      title: '网络错误，登录失败',
                      icon: 'error',
                      duration: 2000
                    })
                  })
              } else {
                  wx.showToast({
                    title: '获取登录状态失败',
                    icon: 'error',
                    duration: 2000
                  })
              }
          }
      })
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