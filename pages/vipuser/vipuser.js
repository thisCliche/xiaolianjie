// pages/vipuser/vipuser.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      fileList: [],
    },
 
    backUp() {
        wx.navigateBack({
          delta: 1,
        })
      },
      afterRead(event) {
        const { file } = event.detail;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
          url: 'https://flxcx.ahxingdian.com/api/index/upload_image', // 仅为示例，非真实的接口地址
          filePath: file.url,
          formData: {
            'user': 'test'
          },
          header: { "Content-Type": "multipart/form-data" },
          name: 'file',
          // formData: { user: 'test' },
          success(res) {
            // 上传完成需要更新 fileList
            console.log(res)
            // const { fileList = [] } = this.data;
            // fileList.push({ ...file, url: res.data });
            // this.setData({ fileList });
          },
        });
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