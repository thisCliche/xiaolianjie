const devBaseUrl = 'https://flxcx.ahxingdian.com/index.php/api/';
const probaseUrl = '';


const request = (options) => {
  var token = wx.getStorageSync('token');
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${devBaseUrl}${options.url}`,
      method: options.method,
      data:options.data,
      header:{
        'Content-Type': 'application/json',
        'token': token
      },
      success(request) {
        if(request.data.code == 103) {
          wx.setStorage({
            data: '',
            key: 'token',
          })
          wx.navigateTo({
            url: '/pages/login/login',
          })
          return wx.showToast({
            title: '请重新登录',
            icon: 'error',
          })
        }
        if (request.data) {
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

// 获取情感美文列表
export function getNewList(data){
  return request({
    url:'article/get_list',
    method:"post",
    data
  })
}
// 用户基本资料修改
export function changemedata(data) {
  return request({
    url: 'member/modify_user',
    method: "post",
    data
  })
}
// 用户择偶信息修改
export function changeMate(data) {
  return request({
    url: 'member/change_select_mate',
    method: "post",
    data
  })
}
// 获取用户身高年龄范围
export function getRange(){
  return request({
    url:'member/getAgeList',
    method: 'get'
  })
}
// 获取我的资料
export function getMeDate(data){
  return request({
    url: 'member/my_detail',
    method: 'post',
    data
  })
}
// 用户列表member/get_list
export function getUserList(data){
  return request({
    url: 'member/get_list',
    method: 'post',
    data
  })
}
// 获取文章详情
export function getNewDetail(data){
  return request({
    url: 'article/view',
    method: 'post',
    data
  })
}
// 获取个人资料详情
export function getMemberDetail(data){
  return request({
    url: 'member/member_detail',
    method: 'post',
    data
  })
}
// 获取评论
export function getComments(data){
  return request({
    url: `article/comments?id=${data}`,
    method: 'get',
  })
}
// 发送评论
export function sendComments(data){
  return request({
    url: 'article/do_comment',
    method: 'post',
    data
  })
}
// 用户留言
export function leaveMessageapi(data){
  return request({
    url: 'member/user_leave_message',
    method: 'post',
    data
  })
}
//获取我的留言
export function getmessageList(){
  return request({
    url: 'member/messageList',
    method: 'post',
  })
}
// 删除留言
export function deleteMessage(data){
  return request({
    url: 'member/learn_message',
    method: 'post',
    data
  })
}