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
// 获取手机号
export function getPhoneNum(data){
  return request({
    url: 'auth/b_mobile',
    method: 'post',
    data
  })
}
// 获取答题活动
export function getAnswerList(){
  return request({
    url: 'activity/get_question_all',
    method: 'post'
  })
}
// 提交答题
export function sendAnswerRecord(data){
  return request({
    url: 'activity/user_answer_record',
    method: 'post',
    data
  })
}
// 获取转盘
export function getTurntablList(){
  return request({
    url: 'activity/activity_turntable',
    method: 'post'
  })
}
// 提交中奖
export function sendTurntablList(data){
  return request({
    url: 'activity/user_join_activity',
    method: 'post',
    data
  })
}
// 配对活动详情
export function getSelectActivity(){
  return request({
    url: 'activity/select_activity',
    method: 'post'
  })
}
// 记录选人
export function listJoinMember(data){
  return request({
    url: 'activity/list_join_member',
    method: 'post',
    data
  })
}
// 获取收货地址
export function getAddress(){
  return request({
    url: 'member.address/index',
    method: 'post',
  })
}
// 获取收货地址详情
export function getAddressView(data){
  return request({
    url: 'member.address/view',
    method: 'post',
    data
  })
}
// 设置默认地址
export function addressSetDefau(data){
  return request({
    url: 'member.address/set_default',
    method: 'post',
    data
  })
}
// 删除地址
export function addressDelete(data){
  return request({
    url: 'member.address/delete',
    method: 'post',
    data
  })
}
// 保存地址
export function addressSave(data){
  return request({
    url: 'member.address/save',
    method: 'post',
    data
  })
}
// 发帖子
export function addArticle(data){
  return request({
    url: 'article/add_article',
    method: 'post',
    data
  })
}
// 帖子列表
export function articleList(data){
  return request({
    url: 'article/article_list',
    method: 'post',
    data
  })
}
// 帖子详情
export function viewArticle(data){
  return request({
    url: 'article/view_article',
    method: 'post',
    data
  })
}
// 中奖记录
export function winCheck(data){
  return request({
    url: 'activity/turn_award_record',
    method: 'post',
    data
  })
}
// 商城分类
export function getAllCates(){
  return request({
    url: 'product/get_cates',
    method: 'post',
  })
}
// 获取商品
export function getMallList(data){
  return request({
    url: 'product/get_list',
    method: 'post',
    data
  })
}
// 订单管理
export function orderMange(data){
  return request({
    url: 'member.order/index',
    method: 'post',
    data
  })
}
// 订单详情
export function orderDetail(data){
  return request({
    url: 'member.order/view',
    method: 'post',
    data
  })
}
// 订单删除
export function deleteorder(data){
  return request({
    url: 'member.order/delete',
    method: 'post',
    data
  })
}
// 订单取消
export function cancelorder(data){
  return request({
    url: 'member.order/cancel',
    method: 'post',
    data
  })
}
// 订单确认
export function confirmorder(data){
  return request({
    url: 'member.order/confirm',
    method: 'post',
    data
  })
}
// 移除收藏
export function delfavourite(data){
  return request({
    url: 'member/del_favourite',
    method: 'post',
    data
  })
}
// 添加收藏
export function addfavourite(data){
  return request({
    url: 'member/add_favourite',
    method: 'post',
    data
  })
}

// 商品详情
export function productView(data){
  return request({
    url: 'product/view',
    method: 'post',
    data
  })
}
export function profilemember(data){
  return request({
    url: 'member/profile',
    method: 'post',
    data
  })
}

export function orderprepare(data){
  return request({
    url: 'order/prepare',
    method: 'post',
    data
  })
}
// 积分明细
export function pointdetail(){
  return request({
    url: 'points/get_member_point_detail',
    method: 'post',
  })
}
// 增加减少积分
export function getallPoint(data){
  return request({
    url: 'points/get_all_point',
    method: 'post',
    data
  })
}