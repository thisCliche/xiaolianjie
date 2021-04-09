// components/header.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    isBack: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backUp() {
      this.triggerEvent('childBackUp')
    }
  }
})
