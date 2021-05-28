// pages/wescom/detail/detial.js
import {viewArticle} from '../../../api/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: '',
      title: '',
      images: []
    },
    backUp() {
        wx.navigateBack({
          delta: 1,
        })
      },
      clickImg(e) {
        var index=e.currentTarget.dataset['index'];
        var imgUrl = this.data.images;
        wx.previewImage({
          urls: imgUrl, //需要预览的图片http链接列表，注意是数组
          current: imgUrl[index], // 当前显示图片的http链接，默认是第一个
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
        viewArticle({id:options.id}).then(res=>{
            let images = []
            if(res.data.article.cover){
              images = res.data.article.cover.split(',')
            }
            
            this.setData({
                detail: res.data.article.description,
                title: res.data.article.title,
                images
            })
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