const devBaseUrl = 'https://flxcx.ahxingdian.com/index.php/api/';
const probaseUrl = '';

const request = (options) => {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${devBaseUrl}${options.url}`,
      method: options.method,
      data:options.data,
      header:{
        'Content-Type': 'application/json',
      },
      success(request) {
        if (request.data) {
          console.log(request)
          resolve(request.data)
        } else {
          resolve(request.data)
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

export function getBarch(data){
  return request({
    url: 'common/batch',
    method: "post",
    data
  })
}