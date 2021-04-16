// pages/add/add.js
import {addArticle} from '../../../api/api'
import {utf16toEntities} from '../../../utils/util'
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      securtyHeight: app.globalData.statusBarHeight + 88,
      title: '',
      content: '',  //留言内容
      
      fileList: [], //图片临时位置
      cover:[]  // 用于提交时图片位置
  },
  backUp() {
    wx.navigateBack({
      delta: 1,
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    let that = this
    wx.uploadFile({
      url: 'https://flxcx.ahxingdian.com/api/index/upload_image', 
      filePath: file.url,
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      success(res) {
        // 上传完成需要更新 fileList
        let result = JSON.parse(res.data)
        const { fileList = [] } = that.data;
        const { cover = [] } = that.data;
        fileList.push({ ...file, url: result.data.url }); 
        cover.push(result.data.url)
        that.setData({ fileList,cover });
      }
    });
  },
  delete(event) {
    const { index } = event.detail;
    console.log(index)
    const fileList = this.data.fileList;
    const cover = this.data.cover;
    fileList.splice(index, 1);
    cover.splice(index, 1);
    this.setData({ fileList });
    this.setData({cover})
  },
  clickPreview() {},
  overFllowSize(){
      console.log(1)
    Notify({safeAreaInsetTop:true, type: 'danger', message: '照片请小于2M' });
},
  async submit() {
    if(!this.data.content || !this.data.title) return Notify({safeAreaInsetTop:true, type: 'danger', message: '标题或内容不能为空' }); 
    let content =  utf16toEntities(this.data.content)
    const { msg: res } = await addArticle({
      content: content, 
      cover: this.data.cover,
      title: this.data.title
    });
    console.log(res)
    if( res != '添加成功！' ) return Notify({safeAreaInsetTop:true, type: 'danger', message: '创建失败！' });
    Notify({safeAreaInsetTop:true, type: 'success', message: '发布成功！' });
    setTimeout(_=> wx.switchTab({
        url: '../../index/index',
      }),500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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