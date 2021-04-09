// components/love/love.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemColumn: Object
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetial(e) {
      this.triggerEvent('todetial',e.currentTarget.dataset.loveid)
    }

  }
})
