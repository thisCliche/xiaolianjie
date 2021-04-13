// pages/lovelist/lovelist.js
const app = getApp()
import areaList from "../../utils/areaList";
import {
  getUserList,getRange
} from '../../api/api'
let {
  areaList: areaListNew
} = areaList
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name: '',
      address_pro: '',
      gender: '',
      age: '',
      edu: '',
      page: 1,
      pagesize: 7
    },
    isNoMore: false,
    district: false,
    areaList: areaListNew,
    statusBarHeight: app.globalData.statusBarHeight,
    show: false,
    sex: [ {
      active: 1,
      name: '女'
    },{
      active: 0,
      name: '男'
    }],
    age: [],
    edu: [],
    listColumn: [],
    total: '',
  },
  inputVal: function (e) {
    this.setData({
      ["form.name"]: e.detail.value
    })
  },
  backUp() {
    wx.navigateBack({
      delta: 1,
    })
  },
  todetial(e) {
    console.log(e.detail)
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  showFil() {
    this.setData({
      show: true
    })
  },
  sexSele(e) {
    let sex = this.data.sex
    sex.forEach(item => {
      item.active = 0
      if (item.name == e.currentTarget.dataset.sex) {
        item.active = 1
      }
    })
    this.setData({
      sex,
      ['form.gender']: e.currentTarget.dataset.idx
    })
  },
  ageSele(e) {
    console.log(e)
    let age = this.data.age
    age.forEach(item => {
      item.active = 0
      if (item.name == e.currentTarget.dataset.sex) {
        item.active = 1
      }
    })
    this.setData({
      age,
      ['form.age']: e.currentTarget.dataset.idx
    })
  },
  eduSele(e) {
    let edu = this.data.edu
    edu.forEach(item => {
      item.active = 0
      if (item.name == e.currentTarget.dataset.sex) {
        item.active = 1
      }
    })
    this.setData({
      edu,
      ['form.edu']: e.currentTarget.dataset.idx
    })
  },
  showPopDistrict() {
    this.setData({
      district: true
    });
  },
  onCloseDistrict() {
    this.setData({
      district: false
    });
  },
  onChangeDistrict(e) {
    console.log(e)
    let district = `${e.detail.values[0].name},${e.detail.values[1].name},${e.detail.values[2].name}`
    this.setData({
      district: false,
      ["form.address_pro"]: district,
    });
  },
  reset() {
    let sex = [{
      active: 1,
      name: '男'
    }, {
      active: 0,
      name: '女'
    }]
    let age = this.data.age,edu = this.data.edu;
    age.forEach(item=>{
      item.active = 0
    })
    edu.forEach(item=>{
      item.active = 0
    })
    age[0].active = 1
    edu[0].active = 1
    
    this.setData({
      sex,
      age,
      edu,
      form: {
        name: '',
        address_pro: '',
        gender: '',
        age: '',
        edu: ''
      }
    })
  },
  // 获取用户列表
  async getUerList(data) {
    let res = await getUserList(data)
    this.setData({
      listColumn: res.data.list,
      total: res.data.total
    })
  },
  classification() {
    this.setData({
      show: false,
      ['form.page']: 1
    })
    this.getUerList(this.data.form)
  },
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/persdata/persdata?id=' + id,
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
    this.getUerList(this.data.form);
    getRange().then(res=>{
      let newAge = []
      let newEdu = []
      res.data.age.forEach((item,idx)=>{
        if(idx == 0) {
          item = {
            name: item,
            active: 1
          }
        }else{
          item = {
            name: item,
            active: 0
          }
        }
        newAge.push(item)
      })
      res.data.edu.forEach((item,idx)=>{
        if(idx == 0) {
          item = {
            name: item,
            active: 1
          }
        }else{
          item = {
            name: item,
            active: 0
          }
        }
        newEdu.push(item)
      })
      this.setData({
        edu: newEdu,
        age: newAge
      })
    })
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
    if (this.data.total <= this.data.listColumn.length) {
      return this.setData({
        isNoMore: true
      })
    } else {
      wx.showNavigationBarLoading();
      this.setData({
        ["form.page"]: this.data.form.page + 1
      })
      let that = this
      getUserList(this.data.form).then(res => {
        let listColumn = this.data.listColumn
        let newlistColumn = listColumn.concat(res.data.list)
        that.setData({
          listColumn: newlistColumn,
          total: res.data.total
        })
      })
      wx.hideNavigationBarLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})