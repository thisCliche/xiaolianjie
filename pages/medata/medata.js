// pages/medata/medata.js
import {
  changeMate,
  getRange,
  changemedata,
  getMeDate,
  is_show
} from '../../api/api'
const app = getApp()
import areaList from "../../utils/areaList";
let {
  areaList: areaListNew
} = areaList
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow: 1,
    minDate: new Date(1980, 0, 1).getTime(),
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    fileList: [],
    token: '',
    member_id: '',
    curActive: 1,
    statusBarHeight: app.globalData.statusBarHeight,
    formSelect: {
      birthday: false,
      height: false,
      weight: false,
      district: false,
      educational: false,
      marriage: false
    },
    form1: {
      agerange: '',
      heightrange: '',
      salary: '',
      edu: '',
      marrange: ''
    },
    form1sub: {
      agerange: '',
      heightrange: '',
      salary: '',
      edu: '',
      marrange: ''
    },
    form1Select: {
      agerange: false,
      heightrange: false,
      salary: false,
      edu: false,
      marrange: false,
    },
    agerangeColumn: [],
    heightrangeColumn: [],
    edurangeColumn: [],
    salaryColumn: [],
    marrangeColumn: [],

    heightColumns: ['156cm', '157cm', '158cm', '159cm', '160cm'],
    weightColumns: ['56Kg', '57Kg', '58Kg', '59Kg', '60Kg'],
    educationalColumns: ['专科', '本科', '硕士', '博士'],
    marriageColumns: ['未婚', '离异', '丧偶'],
    areaList: areaListNew,
    form: {
      name: '',
      life_image: [],
      birthday: '',
      height: '',
      weight: '',
      district: '',
      educational: '',
      marriage: '',
      sex: '1',
      autograph: ''
    },
    fileList: [],
  },
  deleteImg(e){
    const fileList = this.data.fileList;
    fileList.splice(e.detail.index,1)
    this.setData({ fileList });
  },
  handleInputChange(e) {
    let targetData = e.currentTarget.dataset.model;
    let currentValue = e.detail;
    this.setData({
      [`form.${targetData}`]: currentValue
    })
  },
  afterRead(event) {
    let that = this
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://flxcx.ahxingdian.com/api/index/upload_image', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: JSON.parse(res.data).data.url });
        that.setData({ fileList });

        let newRes = JSON.parse(res.data)
        let life_image = that.data.form.life_image
        life_image.push(newRes.data.url)
        //上传服务器成功之后可以对url处理，例如图片预览，长按删除等功能
        that.setData({
          ['form.life_image']: life_image
        })
      },
      fail: (error) => {
        console.log(error);
      },
    });
  },
  uploadImage() {
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (res) => {
        var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B
        console.log(tempFilesSize)
        if (tempFilesSize <= 2000000) { //图片小于或者等于2M时 可以执行获取图片
          const {
            errMsg,
            tempFilePaths,
            tempFiles
          } = res;
          tempFilePaths.forEach((filePath, index) => {
            if (errMsg === 'chooseImage:ok') {
              console.log(filePath)
              this.uploadFile(filePath);
            }
          });
        } else {
          wx.showToast({
            title: '图片不大于2M!',
          })
        }
      },
    });
  },
  //uploadFile
  uploadFile(filePath) {
    let that = this
    wx.uploadFile({
      url: 'https://flxcx.ahxingdian.com/api/index/upload_image', //这里是后台服务器的请求地址
      filePath: filePath, //图片url
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {}, //如果上传图片api有其他的参数，可以在这里添加
      success: (res) => {
        let newRes = JSON.parse(res.data)
        let life_image = that.data.form.life_image
        life_image.push(newRes.data.url)
        //上传服务器成功之后可以对url处理，例如图片预览，长按删除等功能
        that.setData({
          ['form.life_image']: life_image
        })
      },
      fail: (error) => {
        console.log(error);
      },
    });
  },

  overAfterRead() {
    wx.showToast({
      title: '文件请小于5MB',
    })
  },
  backUp() {
    wx.navigateBack({
      delta: 1,
    })
  },
  upLifePho() {

  },
  onChangeage(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, agetran[value[0]]);
  },
  onChangeheight2(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, heightran[value[0]]);
  },
  showPop(e) {
    this.setData({
      [`form1Select.${e.currentTarget.dataset.name}`]: true
    });
  },
  onconfirmRight(e) {
    console.log(e)
    this.setData({
      [`form1Select.${e.currentTarget.dataset.name}`]: false,
      [`form1.${e.currentTarget.dataset.name}`]: e.detail.value,
      [`form1sub.${e.currentTarget.dataset.name}`]: e.detail.index
    });
  },
  oncancelRight(e) {
    this.setData({
      [`form1Select.${e.currentTarget.dataset.name}`]: false
    });
  },
  currClick(e) {
    console.log(e)
    this.setData({
      curActive: e.currentTarget.dataset.name
    })
  },
  onagerangeChange(event) {
    console.log(event)
  },
  onChangeSex(event) {
    this.setData({
      ["form.sex"]: event.detail,
    });
  },
  showPopBirthday() {
    this.setData({
      ["formSelect.birthday"]: true
    });
  },
  onCloseBirthday() {
    this.setData({
      ["formSelect.birthday"]: false
    });
  },
  onConfirmBirthday(event) {
    this.setData({
      ["formSelect.birthday"]: false,
      ["form.birthday"]: this.formatDate(event.detail),
    });
  },
  showPopHeight() {
    this.setData({
      ["formSelect.height"]: true
    });
  },
  onCloseHeight() {
    this.setData({
      ["formSelect.height"]: false
    });
  },
  onChangeHeight(e) {
    console.log(e)
    this.setData({
      ["formSelect.height"]: false,
      ["form.height"]: e.detail.value,
    });
  },
  showPopWeight() {
    this.setData({
      ["formSelect.weight"]: true
    });
  },
  onCloseWeight() {
    this.setData({
      ["formSelect.weight"]: false
    });
  },
  onChangeWeight(e) {
    this.setData({
      ["formSelect.weight"]: false,
      ["form.weight"]: e.detail.value,
    });
  },
  showPopDistrict() {
    this.setData({
      ["formSelect.district"]: true
    });
  },
  onCloseDistrict() {
    this.setData({
      ["formSelect.district"]: false
    });
  },
  onChangeDistrict(e) {
    let district = `${e.detail.values[0].name},${e.detail.values[1].name},${e.detail.values[2].name}`
    console.log(e)
    this.setData({
      ["formSelect.district"]: false,
      ["form.district"]: district,
    });
  },
  showPopeDucational() {
    this.setData({
      ["formSelect.educational"]: true
    });
  },
  onCloseeDucational() {
    this.setData({
      ["formSelect.educational"]: false
    });
  },
  onChangeeDucational(e) {
    this.setData({
      ["formSelect.educational"]: false,
      ["form.educational"]: e.detail.value,
    });
  },
  showPopeMarriage() {
    this.setData({
      ["formSelect.marriage"]: true
    });
  },
  onCloseMarriage() {
    this.setData({
      ["formSelect.marriage"]: false
    });
  },
  onChangeeMarriage(e) {
    this.setData({
      ["formSelect.marriage"]: false,
      ["form.marriage"]: e.detail.value,
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  async submedata() {
    let {
      form
    } = this.data
    let data = {
      name: form.name,
      token: this.data.token,
      member_id: this.data.member_id,
      gender: form.sex,
      birth: form.birthday,
      height: form.height,
      weigh: form.weight,
      address_pro: form.district,
      education: form.educational,
      marriage: form.marriage,
      life_image: form.life_image,
      autograph: form.autograph
    }
    let res = await changemedata(data)
    if (res.data.res) {
      wx.showToast({
        title: '修改成功！',
      })
    }
  },
  async subMate() {
    let {
      form1sub
    } = this.data
    let subForm = {
      select_age: form1sub.agerange,
      token: this.data.token,
      member_id: this.data.member_id,
      select_height: form1sub.heightrange,
      select_salary: form1sub.salary,
      select_edu: form1sub.edu,
      select_mary: form1sub.marrange
    }

    let res = await changeMate(subForm)
    if (res.msg == '操作成功') {
      wx.showToast({
        title: '修改成功',
      })
    }
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
    let that = this
    is_show().then(res => {
      this.setData({
        isShow: res.data.show
      })
    })
    getRange().then(res => {
      console.log(res)
      this.setData({
        agerangeColumn: res.data.age,
        heightrangeColumn: res.data.height_array,
        edurangeColumn: res.data.edu,
        salaryColumn: res.data.sar_array,
        marrangeColumn: res.data.mar_array
      })
    })
    wx.getStorage({
      key: 'member_id',
      success(res) {
        that.setData({
          member_id: res.data
        })
      }
    })
    wx.getStorage({
      key: 'token',
      success(res) {
        that.setData({
          token: res.data
        })
      }
    })

    // 获取个人信息
    getMeDate({
      token: this.data.token
    }).then(res => {
      this.setData({
        ["form.name"]: res.data.detail.name,
        // ["form.life_image"]: res.data.detail.details.life_image,
        ["form.birthday"]: res.data.detail.birth,
        ["form.height"]: res.data.detail.details.height,
        ["form.weight"]: res.data.detail.weigh,
        ["form.district"]: `${res.data.detail.province},${res.data.detail.city},${res.data.detail.county}`,
        ["form.educational"]: res.data.detail.education,
        ["form.marriage"]: res.data.detail.marriage,
        ["form.sex"]: res.data.detail.gender + '',
        ["form1.agerange"]: res.data.detail.select_age_text,
        ["form1.heightrange"]: res.data.detail.select_height_text,
        ["form1.salary"]: res.data.detail.select_salary_text,
        ["form1.edu"]: res.data.detail.select_edu_text,
        ["form1.marrange"]: res.data.detail.select_mary_text,
        ["form.autograph"]: res.data.detail.autograph,
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