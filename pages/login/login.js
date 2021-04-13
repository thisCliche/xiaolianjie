// pages/login/login.js
const app = getApp()
import {sendLogin} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {}
  },
  backUp() {
    wx.navigateBack({
      delta: 1,
    })
  },
  getUserProfile() {
  wx.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      console.log(res);
      wx.setStorage({
        data: res.userInfo.avatarUrl,
        key: 'avatarUrl',
      })
      wx.setStorage({
        data: res.userInfo.nickName,
        key: 'nickName',
      })
      wx.showLoading({
        title: '登录中...',
      })
      if(res.errMsg == 'getUserProfile:ok'){
        this.data.userinfo = res.userInfo;
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
                        wx.setStorage({
                          data: json.data.token,
                          key: 'token',
                        })
                        wx.setStorage({
                          data: json.data.member_id,
                          key: 'member_id',
                        })
                        wx.navigateBack({
                          delta: 1,
                        })
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