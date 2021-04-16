// pages/littlegame/randomLove/random.js
import {getSelectActivity,listJoinMember} from '../../../api/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        selectList: [],
        join_num: '',
        activity_id: ''
    },
    backUp() {
        wx.navigateBack({
          delta: 1,
        })
      },
      onClickHide() {
        this.setData({ show: false });
      },
      onClickShow() {
        if(this.data.join_num ==  0) return wx.showToast({
          title: '暂无机会',
        })
        this.getSelectList()
        this.setData({ show: true });
      },
      getSelectList(){
        getSelectActivity().then(res=>{
          let selectList = []
          for(let i =0;i<4;i++){
            selectList.push(res.data.member_list.data[i])
          }
          this.setData({
            selectList,
            join_num: res.data.join_num,
            activity_id: res.data.member_list.activity_id
          })
        })
      },
      toDetail(e){
        let data = {
          select_member_id: e.currentTarget.dataset.id,
          activity_id: this.data.activity_id,
          show: false
        }
        listJoinMember(data).then(res=>{
          if(res.msg == "参与成功") {
            this.setData({
              show: false
            })
            wx.navigateTo({
              url: '/pages/persdata/persdata?id=' + e.currentTarget.dataset.id,
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
      this.getSelectList()
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