// pages/message/message.js
import {getmessageList,deleteMessage,leaveMessageapi} from '../../api/api'
import {timestampToTime} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    readyDeleteId: '',
    messageList: [],
    replyContent: '',
    member_id: '',
    actions: [
      {
        name: '删除',
      },
    ],
  },
  replyInput(e){
    this.setData({
      replyContent: e.detail.value
    })
  },
  showAction(e) {
    this.setData({
      show: true,
      readyDeleteId: e.currentTarget.dataset.id
    })
  },
  backUp() {
    wx.navigateBack({
      delta: 1,
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  sendMessage(e){
    console.log(e)
  },
  onSelect(event) {
    let data={
      id: this.data.readyDeleteId,
      status: 2
    }
    deleteMessage(data).then(res=>{
      let that = this
      if(res.data == 1){
        wx.showToast({
          title: '删除成功',
        })
        that.getmessageList()
      }
    })
  },
  getmessageList(){
    getmessageList().then(res=>{
      res.msg.comments.forEach(item=>{
        item.create_time = timestampToTime(item.create_time)
      })
      this.setData({
        messageList: res.msg.comments
      })
    })
  },
  replyMessage(e){
    let that = this
    let data={
      source_member: e.currentTarget.dataset.member_id,
      content: this.data.replyContent,
      reply_id: e.currentTarget.dataset.id,
    }
    leaveMessageapi(data).then(res=>{
      if(res.msg == '留言成功'){
        that.getmessageList()
        return wx.showToast({
        title: '留言成功！',
      })}
      else return wx.showToast({
        title: res.msg,
        icon: 'error'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getmessageList()
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