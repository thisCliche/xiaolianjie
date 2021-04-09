// pages/medata/medata.js
const app = getApp()
import areaList from "../../utils/areaList";
let {areaList:areaListNew} = areaList
const agetran = {
  20: ['21', '22', '23', '24', '25'],
  30: ['31', '32', '33', '34', '35'],
};
const heightran = {
  170: ['171', '172', '173', '174', '175'],
  180: ['181', '182', '183', '184', '185'],
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    curActive: 1,
    statusBarHeight: app.globalData.statusBarHeight,
    formSelect:{
      birthday: false,
      height: false,
      weight: false,
      district: false,
      educational: false,
      marriage: false
    },
    form1:{
      agerange: [],
      heightrange: [],
      marr: '',
      edu: ''
    },
    form1Select:{
      agerange: false,
      heightrange: false,
      marr: false,
      edu: false
    },
    agerangeColumn: [
      {
        values: Object.keys(agetran),
        className: 'column1',
      },
      {
        values: agetran ['20'],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
    heightrangeColumn: [
      {
        values: Object.keys(heightran),
        className: 'column1',
      },
      {
        values: heightran ['170'],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
    marrColumn:['不限','已婚','未婚'],
    eduColumn: ['专科', '本科', '硕士'],
    
    heightColumns: ['156cm', '157cm', '158cm', '159cm', '160cm'],
    weightColumns: ['56Kg', '57Kg', '58Kg', '59Kg', '60Kg'],
    educationalColumns: ['专科', '本科', '硕士'],
    marriageColumns: ['未婚', '已婚'],
    areaList:areaListNew,
    form:{
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
  onChangeage(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, agetran[value[0]]);
  },
  onChangeheight2(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, heightran[value[0]]);
  },
  showPop(e){
    this.setData({ [`form1Select.${e.currentTarget.dataset.name}`]: true });
  },
  onconfirmRight(e){
    this.setData({ [`form1Select.${e.currentTarget.dataset.name}`]: false,
    [`form1.${e.currentTarget.dataset.name}`]: e.detail.value
  });
  },
  oncancelRight(e) {
    this.setData({ [`form1Select.${e.currentTarget.dataset.name}`]: false });
  },
currClick(e){
    console.log(e)
    this.setData({
      curActive: e.currentTarget.dataset.name
    })
  },
  onagerangeChange(event){
    console.log(event)
  },
  onChangeSex(event) {
    this.setData({
      ["form.sex"]: event.detail,
    });
  },
  showPopBirthday() {
    this.setData({ ["formSelect.birthday"]: true });
  },
  onCloseBirthday() {
    this.setData({ ["formSelect.birthday"]: false });
  },
  onConfirmBirthday(event) {
    this.setData({
      ["formSelect.birthday"]: false,
      ["form.birthday"]: this.formatDate(event.detail),
    });
  },
  showPopHeight() {
    this.setData({ ["formSelect.height"]: true });
  },
  onCloseHeight() {
    this.setData({ ["formSelect.height"]: false });
  },
  onChangeHeight(e) {
    console.log(e)
    this.setData({
      ["formSelect.height"]: false,
      ["form.height"]: e.detail.value,
    });
  },
  showPopWeight() {
    this.setData({ ["formSelect.weight"]: true });
  },
  onCloseWeight() {
    this.setData({ ["formSelect.weight"]: false });
  },
  onChangeWeight(e) {
    this.setData({
      ["formSelect.weight"]: false,
      ["form.weight"]: e.detail.value,
    });
  },
  showPopDistrict() {
    this.setData({ ["formSelect.district"]: true });
  },
  onCloseDistrict() {
    this.setData({ ["formSelect.district"]: false });
  },
  onChangeDistrict(e){
    console.log(e)
    this.setData({
      ["formSelect.district"]: false,
      ["form.district"]: e.detail.values[2].name,
    });
  },
  showPopeDucational() {
    this.setData({ ["formSelect.educational"]: true });
  },
  onCloseeDucational() {
    this.setData({ ["formSelect.educational"]: false });
  },
  onChangeeDucational(e) {
    this.setData({
      ["formSelect.educational"]: false,
      ["form.educational"]: e.detail.value,
    });
  },
  showPopeMarriage(){
    this.setData({ ["formSelect.marriage"]: true });
  },
  onCloseMarriage(){
    this.setData({ ["formSelect.marriage"]: false });
  },
  onChangeeMarriage(e){
    this.setData({
      ["formSelect.marriage"]: false,
      ["form.marriage"]: e.detail.value,
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