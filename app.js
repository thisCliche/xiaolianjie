// app.js
import {profilemember} from './api/api'
const util = require("./utils/util.js");
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
  },
  tip: function (msg) {
    wx.showToast({
        icon: 'none',
        title: msg,
    })
},
success: function (msg) {
    wx.showToast({
        title: msg,
        icon: 'success'
    });
},
getProfile(callback = null, force = false) {
    let that = this
    if (!this.profileRequest) {
        profilemember({agent:this.globalData.agent}).then(profile => {
            profile.avatar = this.fixImageUrl(profile.avatar)
            profile.cardno = util.timestampToTime(profile.id, 8)
            profile.money_formated = (profile.money*.01).toFixed(2)
            profile.credit_formated = (profile.credit*.01).toFixed(2)
            profile.reward_formated = (profile.reward * .01).toFixed(2)
            that.profileRequest = profile
        })
    }
    if(force || !this.globalData.profile){
        if (this.globalData.agent && this.profileRequest.getparam('agent') != this.globalData.agent){
            console.log('update agent:' + this.globalData.agent)
            this.profileRequest.setparam('agent', this.globalData.agent)
        }
    }
    if (!force && this.globalData.agent){
        if (this.globalData.profile && this.globalData.profile.is_agent == 0 && this.globalData.profile.referer == 0){
            force=true
            console.log('force agent:' + this.globalData.agent)
            this.profileRequest.setparam('agent', this.globalData.agent)
        }
    }
    this.profileRequest.getData(profile => {
        this.globalData.profile = profile
        callback && callback(profile)
    },()=>{
        callback && callback({
            niakname: '请登录',
            avatar: '/images/avatar-default.png',
            level:{}
            })
    } ,force)
},
fixImageUrl (url,size=null) {
    if (!url) return url
    if (typeof url !== 'string') return url
    if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) return url
    
    if (url.indexOf('/') !== 0) {
        url = '/' + url
    }
    if(size && url.indexOf('?')<0){
        if(typeof size==typeof 'a' || typeof size == typeof 1){
            url += this.globalData.imgSize.replace(/\{(width|height)\}/g,size)
        }else if(size instanceof Array){
            let sizestr = this.globalData.imgSize.replace('{width}', size[0])
            
            sizestr = sizestr.replace('{height}', size[1]||0)
            
            url += sizestr
        }else if(size.width || size.height){
            let sizestr = this.globalData.imgSize.replace('{width}', size.width||0)
            sizestr = sizestr.replace('{height}', size.height||0)
            url += sizestr
        }
    }
    return this.globalData.imgDir + url
},
error: function (msg) {
    if (!msg) msg = '系统错误'
    wx.showToast({
        icon: 'none',
        title: msg,
    })
},
alert: function (msg, callback = null) {
    var config = {
        title: "系统提示",
        content: msg,
        showCancel: false,
        success: function (res) {
            if (typeof callback == 'function') {
                callback(res)
            }
        }
    }
    if (typeof msg == 'object') {
        config = { ...config, ...msg }
    }
    wx.showModal(config)
},
confirm: function (msg, confirm = null, cancel = null, callback = null) {
    var config = {
        title: "系统提示",
        content: msg,
        showCancel: true,
        success: function (res) {
            if (res.confirm) {
                if (typeof confirm == 'function') {
                    confirm(res)
                }
            } else if (res.cancel) {
                if (typeof cancel == 'function') {
                    cancel(res)
                }
            }
            if (typeof callback == 'function') {
                callback(res)
            }
        }
    }
    if (typeof msg == 'object') {
        config = { ...config, ...msg }
    }
    wx.showModal(config);
},
  globalData: {
    img: '',
    image: 'https://flxcx.ahxingdian.com',
    host: '',
    statusBarHeight:  wx.getSystemInfoSync()['statusBarHeight'],//自定义导航栏顶部高度
    userInfo: null,
    wxid: 'PFrUYFh',
    scene:0,
  }
})
