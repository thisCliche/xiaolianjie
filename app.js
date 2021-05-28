// app.js
import {profilemember} from './api/api'
const util = require("./utils/util.js");
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    const updateManager = wx.getUpdateManager();

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate);
});

updateManager.onUpdateReady(function (res) {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate();
      }
    }
  });

});

updateManager.onUpdateFailed(function (res) {
  // 新的版本下载失败
});

    // 登录
    try{
        const res = wx.getSystemInfoSync();
        this.globalData.systemInfo = res
        // this.addDebug(res)

        // //基础库版本提示
        // if (util.compareVersion(res.SDKVersion, '2.4.4') < 0) {
        //     wx.showModal({
        //         title: '提示',
        //         content: '当前微信版本过低，部分功能可能无法使用。'
        //     })
        // }

        // this.addDebug('statusBarHeight:'+res.statusBarHeight)
        // this.globalData.StatusBar = res.statusBarHeight;

        // if (custom.right < 1) custom.right = res.windowWidth - (custom.top - res.statusBarHeight)*2
        // if (custom.left < 1) custom.left =custom.right-custom.width
    }catch(e){
        this.addDebug('getSystemInfo:'+e.message)

        // if (custom.left < 1) custom.left = defaultCustom.left
        // if (custom.right < 1) custom.right = custom.left + custom.width
    }
    
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
    if (!this.profileRequest) {
        this.profileRequest = new TSRequest('member/profile',{agent:this.globalData.agent}, profile => {
            profile.avatar = this.fixImageUrl(profile.avatar)
            profile.cardno = util.formatNumber(profile.id, 8)
            profile.money_formated = (profile.money*.01).toFixed(2)
            profile.credit_formated = (profile.credit*.01).toFixed(2)
            profile.reward_formated = (profile.reward * .01).toFixed(2)
            return profile
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
    systemInfo: ''
  }
})
