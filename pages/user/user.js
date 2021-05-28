// pages/user/user.js
import {createOrder,rejectreason} from '../../api/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      fileList: [],
      shenfen_zheng_img: '',
      shenfen_fan_img: '',
      isrepeat: false,
      season: '',
      pay_status: 1
    },
    async authentication(){
      if(this.data.shenfen_zheng_img==''||this.data.shenfen_fan_img=='') return wx.showToast({
        title: '请上传身份证',
        icon:'error'
      })
      let that = this
      let res = await createOrder({shenfen_zheng_img:that.data.shenfen_zheng_img,shenfen_fan_img:that.data.shenfen_fan_img})
      console.log(res)
      wx.showToast({
        title: '修改成功待审核',
      })
    },
    async toPay() {
      if(this.data.shenfen_zheng_img==''||this.data.shenfen_fan_img=='') return wx.showToast({
        title: '请上传身份证',
        icon:'error'
      })
      let that = this
     let res = await createOrder({shenfen_zheng_img:that.data.shenfen_zheng_img,shenfen_fan_img:that.data.shenfen_fan_img})
     if(this.data.pay_status != 0){
      wx.requestPayment({
        timeStamp: res.data.payment.timeStamp+'',
        nonceStr: res.data.payment.nonceStr,
        package: res.data.payment.package,
        signType: 'MD5',
        paySign: res.data.payment.paySign,
        success (res) { 
          console.log('成功')
        },
        fail (res) { 
          wx.showToast({
            title: '支付失败',
            icon: 'error'
          })
          console.log('失败',res)
        }
      })
     }
      else{
        wx.showToast({
          title: '待管理员审核',
        })
      }
    },
    backUp() {
        wx.navigateBack({
          delta: 1,
        })
      },
      uploadImage(e){
        wx.chooseImage({
         count: 1, // 最多可以选择的图片张数，默认9
         sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
         sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
         success: (res) => {
          var tempFilesSize = res.tempFiles[0].size;  //获取图片的大小，单位B
          if(tempFilesSize <= 2000000){   //图片小于或者等于2M时 可以执行获取图片
            const { errMsg, tempFilePaths, tempFiles } = res;
            tempFilePaths.forEach((filePath, index) => {
              if (errMsg === 'chooseImage:ok') {
                this.uploadFile(filePath,e.currentTarget.dataset.distinguish);
              }
            });
          }else{    
              wx.showToast({
                  title:'图片不大于2M!', 
              })
          }
         },
       });
    },
    //uploadFile
    uploadFile(filePath,type){
      let that = this
        wx.uploadFile({
         url: 'https://flxcx.ahxingdian.com/api/index/upload_image',//这里是后台服务器的请求地址
         filePath: filePath,//图片url
         name: 'file',
         header: { "Content-Type": "multipart/form-data" },
         formData: {},//如果上传图片api有其他的参数，可以在这里添加
         success: (res) => {
           let newRes = JSON.parse(res.data)
          //上传服务器成功之后可以对url处理，例如图片预览，长按删除等功能
          that.setData({
            [type]: newRes.data.url
             })
         },
         fail: (error) => {
           console.log(error);
         },
       });
    },
      
      overAfterRead(){
        wx.showToast({
          title: '文件请小于5MB',
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
      rejectreason().then(res=>{
        if(res.data.source_auth == 3){
          this.setData({
            isrepeat: true,
            season: res.data.reject_msg,
            pay_status: res.data.pay_status
          })
        }
        this.setData({
          pay_status: res.data.pay_status
        })
        console.log(res)
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