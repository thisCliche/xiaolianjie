// pages/littlegame/signInfo/signinfo.js
import {
  usersignupactivity,activityDetail
} from '../../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    activity_id: '',
    fileList: [],
    fileList1: [],
    mobile: '',
    edu: 0,
    name: '',
    gender: 0,
    age: 0,
    address: '',
    salar: 0,
    card_no: '',
    weixin_no: '',
    shenfenzheng: '',
    marstatus: 0,
    desc: '',
    life_image: '',
    promise: 0,
    height: '',
    position: ''
  },
  backUp() {
    wx.navigateBack({
      delta: 1,
    })
  },
  onChange1(event) {
    this.setData({
      gender: event.detail,
    });
  },
  onChange2(event) {
    this.setData({
      edu: event.detail,
    });
  },
  onChange3(event) {
    this.setData({
      salar: event.detail,
    });
  },
  onChange4(event) {
    this.setData({
      marstatus: event.detail,
    });
  },
  onChange5(event) {
    this.setData({
      promise: event.detail,
    });
  },
  afterRead(event) {
    let that = this
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://flxcx.ahxingdian.com/api/index/upload_image',
      filePath: file.url,
      header: {
        "Content-Type": "multipart/form-data"
      },
      name: 'file',
      success(res) {
        let fileList = []
        let data = JSON.parse(res.data)
        console.log(data)
        fileList.push({
          ...file,
          url: data.data.url
        });
        that.setData({
          fileList,
          shenfenzheng: data.data.url
        });
      },
    });
  },
  afterRead1(event) {
    let that = this
    const {
      file
    } = event.detail;
    wx.uploadFile({
      url: 'https://flxcx.ahxingdian.com/api/index/upload_image',
      filePath: file.url,
      header: {
        "Content-Type": "multipart/form-data"
      },
      name: 'file',
      success(res) {
        let fileList1 = []
        let data = JSON.parse(res.data)
        console.log(data)
        fileList1.push({
          ...file,
          url: data.data.url
        });
        that.setData({
          fileList1,
          life_image: data.data.url
        });
      },
    });
  },
  sumb() {
    let form = {}
    form = JSON.parse(JSON.stringify(this.data))
    delete form.fileList
    delete form.fileList1
    console.log(form)
    if(form.promise == 1) return wx.showToast({
      title: '请通过承诺',
      icon:"error"
    })
    if(form.name == ''){
      return wx.showToast({
        title: '请输入姓名',
        icon:"error"
      })
    }
    if(!(/^1[3456789]\d{9}$/.test(form.mobile))){ 
      return wx.showToast({
        title: '请输入正确手机号',
        icon:"error"
      })
  } 
    usersignupactivity(form).then(res=>{
      if(res.msg == '添加成功'){
        wx.showToast({
          title: '报名成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 500);
      }
      else{
        wx.showToast({
          title: '请重试',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activity_id: options.id
    })
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
    activityDetail({activity_id:this.data.activity_id}).then(res=>{
      this.setData({
        title:res.data.title
      })
    })
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