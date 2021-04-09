const devBaseUrl = 'https://flxcx.ahxingdian.com/index.php/api/';
const probaseUrl = '';

const request = (options) => {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${devBaseUrl}${options.url}`,
      method: options.method,
      data:options.data,
      header:{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      success(request) {
        if (request.data) {
          resolve(request.data)
        } else {
          reject(request.data)
        }
      },
      fail(error) {
        reject(error.data)
      }
    })
  })
}

export function sendLogin(data) {
  return request({
    url: 'auth/wxlogin',
    method: 'post',
    data
  })
}