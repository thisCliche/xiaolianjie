const timestampToTime = (timestamp) =>{
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  // return Y+M+D+h+m+s;
  return Y+M+D;
}
const parseScene = (scene)=>{
  scene = decodeURIComponent(scene)
  let sceneArr = scene.split('&')
  let query={}
  for (let i = 0; i < sceneArr.length; i++) {
      let eqindex = sceneArr[i].indexOf('=')
      if (eqindex > 0) {
          query[sceneArr[i].substr(0, eqindex)] = sceneArr[i].substr(eqindex + 1)
      }
  }
  return query
}
// 路由登录判断
function routerFiliter(torouter) {
  wx.getStorage({
    key: 'token',
    success: res => {
      if(res.data == ''){
        return wx.showModal({
          title: '提示',
          content: '是否授权登录体验完整小程序？',
          showCancel: true,
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          },
        })
      }
      wx.navigateTo({
        url: torouter,
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
              url: '/pages/login/login',
            })
          }
        },
      })
    }
  })
}

const tip = (msg) => {
  wx.showToast({
      icon: 'none',
      title: msg,
  })
}
const success = (msg) => {
  wx.showToast({
      title: msg,
      icon: 'success'
  });
}
const error = (msg) => {
  if (!msg) msg = '系统错误'
  if (msg.length > 7) {
      wx.showToast({
          icon: 'none',
          title: msg,
      })
  } else {
      wx.showToast({
          image: '/icons/error.png',
          title: msg,
      })
  }
}
const alert = (msg, callback = null) => {
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
      config = {
          ...config,
          ...msg
      }
  }
  wx.showModal(config)
}
function confirm (msg, confirm = null, cancel = null, callback = null) {
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
}
const checkMobile = (mobile) => {
  var mobilePatter = '^1[3-9][0-9]{9}$'
  var mobileReg = new RegExp(mobilePatter)
  return mobileReg.test(mobile)
}
function utf16toEntities(str) {
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
  str = str.replace(patt, function (char) {
    var H, L, code;
    if (char.length === 2) {
      H = char.charCodeAt(0); // 取出高位
      L = char.charCodeAt(1); // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
      return "&#" + code + ";";
    } else {
      return char;
    }
  });
  return str;
}
function entitiestoUtf16(str){
  var reg = /\&#.*?;/g;
  var result = str.replace(reg, function (char) {
    var H, L, code;
    if (char.length == 9) {
      code = parseInt(char.match(/[0-9]+/g));
      H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
      L = (code - 0x10000) % 0x400 + 0xDC00;
      return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
    } else {
      return char;
    }
  });
  return result;
}
const timestamp2date = timestamp => {
  return (timestamp) ? new Date(timestamp * 1000) : new Date()
}
const countObject = obj => {
  var i = 0
  for (var o in obj) {
      i++
  }
  return i
}
const force_number = (number)=>{
  if(typeof number === typeof 'a'){
      number = parseFloat(number)
  }
  if (typeof number !== typeof 0.1 && typeof number !== typeof 1){
      return 0
  }
  return isNaN(number)?0:number
}
module.exports = {
  timestampToTime,
  routerFiliter,
  tip,
  success,
  error,
  alert,
  confirm,
  checkMobile,
  utf16toEntities,
  entitiestoUtf16,
  timestamp2date,
  parseScene,
  countObject,
  force_number
}
