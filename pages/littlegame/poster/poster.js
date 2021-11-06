// / pages/haibao/haibao.js
import {getWeixinConfig,anniversary,joinRecord} from '../../../api/api'
let app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    loadingShow:true,
    show:false,
    columns: [],
    linkColumns: [],
    idColumns: [],
    curRole: '',
    curLink : '',
    curRoleId: '',
    name: '',
    age: '',
    backgroundImage:'',
    imagePath:"",
    maskHidden:false,
    qrcode_image:'',
    appsecret: '',
  },
  // 获取角色信息
  async getRole(){
    let res = await anniversary()
    let columns=[],linkColumns=[],idColumns=[],curRole='',curLink='',curRoleId=''
    if(res.msg == '未登录') return wx.navigateTo({
      url: '../../login/login',
    })
    res.data.data.map((item, idx)=>{
      columns.push(item.title)
      linkColumns.push(item.image_url)
      idColumns.push(item.id)
      if(idx == 0) {
        curRole = item.title
        curLink = item.image_url
        curRoleId = item.id
      }
    })
    this.setData({
      loadingShow: false,
      columns,
      linkColumns,
      curRole,
      curLink,
      curRoleId,
      idColumns
    })
    this.getImage()
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    let linkColumns = this.data.linkColumns,idColumns = this.data.idColumns
    this.setData({
      curRole: value,
      curLink: linkColumns[index],
      curRoleId: idColumns[index]
    })
    this.getImage()
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  //点击生成海报
  generatePoster: function (e) {
    let name = this.data.name, age = this.data.age;
    if(name == "" || age == '') return wx.showToast({
      title: '内容不为空',
      icon: 'error'
    })
    if(age.includes('年')){
      age = age.replace(/年/,'')
    }
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    // wx.showToast({
    //   title: '海报生成中...',
    //   icon: 'loading',
    // });
    that.createNewImg(name,age);
    this.sendPosterInfo(name,age);
  },
  sendPosterInfo(name,age){
    joinRecord({id:this.data.curRoleId,name,age}).then(res=>console.log(res))
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function (name,age) {
    
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#fff")
    context.save();
 
    var path = that.data.backgroundImage;
    context.drawImage(path, 0, 0, 750, 1236);
 
    var path2 = that.data.qrcode_image;  // 二维码
 
    var results = `我是共产党员${name}，党龄${age}年`;
    // context.setFontSize(30)
    context.setShadow(1,1,0,'rgba(255,255,255,1)')
    context.setFillStyle("#f50000")
    context.draw()

    context.font = 'normal normal bold 30px songti'
    
    context.setTextAlign('center')
    context.fillText(results, 375, 1102)
    
    context.stroke();
    context.save(); //保存之前的画布设置
    context.beginPath();
    context.arc(661, 983, 67, 0, 2 * Math.PI);
    context.clip(); //裁剪上面的圆形
    context.drawImage(path2, 594, 916,134,134);

    // context.restore();
    // context.closePath();
    context.save(); //保存之前的画布设置
    context.draw(true);//true表示保留之前绘制内容
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          wx.hideLoading()
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            maskHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 1000);
  },
  // 获取图片方法
  getImageInfo(src){
    return new Promise((resolve)=>{
      wx.getImageInfo({
        src: src,
        success(res){
          resolve(res.path)
        }
      })
    })
  },
  // 获取必要图片
  async getImage(){
    // let res = await getWeixinConfig({wxid:app.globalData.wxid})
    // this.setData({
    //   appsecret: res.data.appsecret
    // })
    let ditu = this.data.curLink
    this.getImageInfo(ditu).then(backgroundImage=>{
      this.setData({
        backgroundImage
      })
    })
    let qrcode_image = 'https://anhuixingdian.oss-cn-hangzhou.aliyuncs.com/hrfulian/mini_code.jpg'
    this.getImageInfo(qrcode_image).then(qrcode_image=>{
      this.setData({
        qrcode_image
      })
    })
    // this.qrcode_image();
  },
  //文本换行
  dealWords(options) {
    // 测试结果说明
    // that.dealWords({
    //   ctx: context,                     //画布上下文 canvasID
    //   fontSize: 30,                //字体大小
    //   word: results,                  //需要处理的文字
    //   maxWidth: 270,             //一行文字最大宽度
    //   x: 80,                    //文字在x轴要显示的位置
    //   y: 440,                      //文字在y轴要显示的位置
    //   maxLine: 6              //文字最多显示的行数
    // });
    // context.stroke();
    // context.save(); //保存之前的画布设置
    options.ctx.setFontSize(options.fontSize);//设置字体大小
    var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth);//实际总共能分多少行
    var count = allRow >= options.maxLine ? options.maxLine : allRow;//实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数
 
    var endPos = 0;//当前字符串的截断点
    for (var j = 0; j < count; j++) {
      var nowStr = options.word.slice(endPos);//当前剩余的字符串
      var rowWid = 0;//每一行当前宽度    
      if (options.ctx.measureText(nowStr).width > options.maxWidth) {//如果当前的字符串宽度大于最大宽度，然后开始截取
        for (var m = 0; m < nowStr.length; m++) {
          rowWid += options.ctx.measureText(nowStr[m]).width;//当前字符串总宽度
          if (rowWid > options.maxWidth) {
            if (j === options.maxLine - 1) { //如果是最后一行
              options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) * 10);    //(j+1)*20这是每一行的高度        
            } else {
              options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * 10);
            }
            endPos += m;//下次截断点
            break;
          }
        }
      } else {//如果当前的字符串宽度小于最大宽度就直接输出
        options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * 25);
      }
    }
  },
  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          }, fail: function (res) {
            console.log(11111)
          }
        })
      }
    })
  },
  qrcode_image: function () {
    let that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      data: {
        grant_type: 'client_credential',
        appid: 'wx9940f281257909e1', //不能缺少
        secret:  that.data.appsecret
      },
      success: function (res) {
        wx.request({
          url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + res.data.access_token,
          data: {
            "path": "pages/index/index", //默认跳转到主页:pages/index/index，可指定
            "width": 280,
            "scene": "type=0&evaId=" + that.data.id,
          },
          responseType: 'arraybuffer', // 这行很重要,转为二进制数组
          header: {
            'content-type': 'application/json;charset=utf-8'
          },
          method: 'POST',
          success(res) {
          //   var url = wx.arrayBufferToBase64(res.data); //服务器回给的getwxacodeunlimit分享小程序码
          // that.setData({
          //   sharecode: url,
          //   isshow: true
          // })
          var fsm =  wx.getFileSystemManager();
          var filePath = wx.env.USER_DATA_PATH + '/share_img.png';
          var buffer = res.data;
          fsm.writeFile({
            filePath: filePath,
            data: buffer,
            encoding:"binary",
            success() {
              that.setData({
                qrcode_image:filePath
              })
            },
          })
            //转为base64
            // let bin64 = wx.arrayBufferToBase64(res.data);
            // that.setData({
            //   //base 64设置到页面上
            //   qrcode_image: "data:image/png;base64," + bin64
            // });
          }
        })
      }
    })
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
    
    this.getRole()
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
 
  },
  
  
})