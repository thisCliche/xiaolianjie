// pages/medata/medata.js
const app = getApp()
import areaList from "../../utils/areaList";
let {areaList:areaListNew} = areaList
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curActive: 1,
    statusBarHeight: app.globalData.statusBarHeight,
    fromSelect:{
      birthday: false,
      height: false,
      weight: false,
      district: false,
      educational: false,
      marriage: false
    },
    heightColumns: ['156cm', '157cm', '158cm', '159cm', '160cm'],
    weightColumns: ['56Kg', '57Kg', '58Kg', '59Kg', '60Kg'],
    educationalColumns: ['专科', '本科', '硕士'],
    marriageColumns: ['未婚', '已婚'],
    areaList:areaListNew,
    from:{
      name: '',
      birthday: '',
      height: '',
      weight: '',
      district: '',
      educational: '',
      marriage: '',
      sex: '1',
    },
  },
  backUp() {
    wx.navigateBack({
      delta: 1,
    })
  },
currClick(e){
    console.log(n)
    this.setData({
      curActive: e.currentTarget
    })
  },
  onChangeSex(event) {
    this.setData({
      ["from.sex"]: event.detail,
    });
  },
  showPopBirthday() {
    this.setData({ ["fromSelect.birthday"]: true });
  },
  onCloseBirthday() {
    this.setData({ ["fromSelect.birthday"]: false });
  },
  onConfirmBirthday(event) {
    this.setData({
      ["fromSelect.birthday"]: false,
      ["from.birthday"]: this.formatDate(event.detail),
    });
  },
  showPopHeight() {
    this.setData({ ["fromSelect.height"]: true });
  },
  onCloseHeight() {
    this.setData({ ["fromSelect.height"]: false });
  },
  onChangeHeight(e) {
    console.log(e)
    this.setData({
      ["fromSelect.height"]: false,
      ["from.height"]: e.detail.value,
    });
  },
  showPopWeight() {
    this.setData({ ["fromSelect.weight"]: true });
  },
  onCloseWeight() {
    this.setData({ ["fromSelect.weight"]: false });
  },
  onChangeWeight(e) {
    this.setData({
      ["fromSelect.weight"]: false,
      ["from.weight"]: e.detail.value,
    });
  },
  showPopDistrict() {
    this.setData({ ["fromSelect.district"]: true });
  },
  onCloseDistrict() {
    this.setData({ ["fromSelect.district"]: false });
  },
  onChangeDistrict(e){
    console.log(e)
    this.setData({
      ["fromSelect.district"]: false,
      ["from.district"]: e.detail.values[2].name,
    });
  },
  showPopeDucational() {
    this.setData({ ["fromSelect.educational"]: true });
  },
  onCloseeDucational() {
    this.setData({ ["fromSelect.educational"]: false });
  },
  onChangeeDucational(e) {
    this.setData({
      ["fromSelect.educational"]: false,
      ["from.educational"]: e.detail.value,
    });
  },
  showPopeMarriage(){
    this.setData({ ["fromSelect.marriage"]: true });
  },
  onCloseMarriage(){
    this.setData({ ["fromSelect.marriage"]: false });
  },
  onChangeeMarriage(e){
    this.setData({
      ["fromSelect.marriage"]: false,
      ["from.marriage"]: e.detail.value,
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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