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

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  timestampToTime,
  routerFiliter
}
