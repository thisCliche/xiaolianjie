// pages/lovelist/lovelist.js
const app = getApp()
import areaList from "../../utils/areaList";
import {getUserList} from '../../api/api'
let {areaList:areaListNew} = areaList
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      search: '',
      district: ''
    },
    district: false,
    areaList:areaListNew,
    statusBarHeight: app.globalData.statusBarHeight,
    show: false,
    sex:[{active:1,name:'男'},{active:0,name:'女'}],
    age:[{active:1,name:'不限'},{active:0,name:'18-22岁'},{active:0,name:'23-25岁'}
    ,{active:0,name:'26-30岁'},{active:0,name:'31-35岁'},{active:0,name:'36-40岁'}
    ,{active:0,name:'41-45岁'},{active:0,name:'45-50岁'},{active:0,name:'51-60岁'}
    ,{active:0,name:'60岁以上'}
  ],
  edu:[{active:1,name:'不限'},{active:0,name:'初中'},{active:0,name:'高中'}
    ,{active:0,name:'大专'},{active:0,name:'本科'},{active:0,name:'硕士'}
    ,{active:0,name:'博士'}
  ],
    listColumn:[],
    total: '',
  },
  inputVal:function(e){
    this.setData({
      ["form.search"]:e.detail.value
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
    this.setData({show: true})
  },
  sexSele(e) {
    let sex = this.data.sex
    sex.forEach(item=>{
      item.active = 0
      if(item.name == e.currentTarget.dataset.sex) {
        item.active = 1
      }
    })
    this.setData({
      sex
    })
  },
  ageSele(e){
    let age = this.data.age
    age.forEach(item=>{
      item.active = 0
      if(item.name == e.currentTarget.dataset.sex) {
        item.active = 1
      }
    })
    this.setData({
      age
    })
  },
  eduSele(e){
    let edu = this.data.edu
    edu.forEach(item=>{
      item.active = 0
      if(item.name == e.currentTarget.dataset.sex) {
        item.active = 1
      }
    })
    this.setData({
      edu
    })
  },
  showPopDistrict() {
    this.setData({ district: true });
  },
  onCloseDistrict() {
    this.setData({ district: false });
  },
  onChangeDistrict(e){
    console.log(e)
    this.setData({
      district: false,
      ["form.district"]: e.detail.values[2].name,
    });
  },
  reset() {
    let sex=[{active:1,name:'男'},{active:0,name:'女'}]
    let age=[{active:1,name:'不限'},{active:0,name:'18-22岁'},{active:0,name:'23-25岁'}
    ,{active:0,name:'26-30岁'},{active:0,name:'31-35岁'},{active:0,name:'36-40岁'}
    ,{active:0,name:'41-45岁'},{active:0,name:'45-50岁'},{active:0,name:'51-60岁'}
    ,{active:0,name:'60岁以上'}
  ]
  let edu=[{active:1,name:'不限'},{active:0,name:'初中'},{active:0,name:'高中'}
    ,{active:0,name:'大专'},{active:0,name:'本科'},{active:0,name:'硕士'}
    ,{active:0,name:'博士'}
  ]
  this.setData({sex,age,edu,form:{search: '',
  district: ''}})
  },
  // 获取用户列表
 async getUerList(data){
  let res = await getUserList(data)
  this.setData({
    listColumn: res.data.list.data,
    total: res.data.list.total
  })
  // {
  //   id: '1',
  //   avatart: 'https://img.xiaojiayun.top/wly.jpg',
  //   nick: '若即若离1',
  //   age: 27,
  //   location: '庐阳区',
  //   height: '173cm',
  //   education: '大专',
  //   occupation: '职业经理人'
  // }
  console.log(res)
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
    this.getUerList()
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

    if(this.data.total_page <= this.data.queryInfo.page) {
      return this.setData({
          isNoMore: true
      })
  }
  else{
      wx.showNavigationBarLoading();
      this.setData({
          ["queryInfo.page"]:this.data.queryInfo.page+1
      })
      let that = this
      getNewList(this.data.queryInfo).then(res=>{
          res.data.lists.forEach(item=>{
              item.create_time = timestampToTime(item.create_time)
          })
          let article = this.data.article
          console.log(res.data.lists,1)
          let newarticle = article.concat(res.data.lists)
          that.setData({
              article:newarticle,
              total_page: res.data.total_page
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