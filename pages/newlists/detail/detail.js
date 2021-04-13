// pages/newlists/detail/detail.js
import {getNewDetail,getComments,sendComments} from '../../../api/api'
const trail = require("../../../utils/trail.js");
const html = require("../../../utils/HtmlToNodes.js");
import {timestampToTime} from '../../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        digging:false,
        digged:false,
        model:{},
        moment: [],
        inputCon: '',
        reply: '',
    },
    activeReply(e){
        this.setData({
            reply: e.detail.value
        })
    },
    activeInput(e){
        this.setData({
            inputCon: e.detail.value
        })
    },
    sendComent(){
        sendComments({id: this.data.id,content:this.data.inputCon}).then(res=>{
            
            if(res.msg == '评论成功') {
                this.setData({
                    inputCon: ''
                })
                return wx.showToast({
                  title: '评论等待审核',
                })
            }
        })
    },
    sendReply(e){
        console.log(e)
        sendComments({reply_id:e.currentTarget.dataset.id,content:this.data.reply,id: this.data.id,}).then(res=>{
            console.log(res)
            if(res.msg == '评论成功') {
                this.setData({
                    reply: ''
                })
                return wx.showToast({
                  title: '评论等待审核',
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.id) {
            this.setData({
                id: parseInt(options.id)
            })
            this.params={id:this.data.id}
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.showLoading({
            title: '',
        })
        getComments(this.data.id).then(res=>{
            console.log(res)
            res.data.lists.forEach(item=>{
                item.create_time = timestampToTime(item.create_time)
            })
            if(res.data.total != 0){
                this.setData({
                    moment: res.data.lists
                })
            }
        })
        getNewDetail({ id: this.data.id}).then(json=>{
            if (json.code == 1) {
                let data=json.data.article
                data.create_time = timestampToTime(data.create_time,false)
                data.cover = trail.fixImageUrl(data.cover)
                data.content = html.HtmlToNodes(data.content, trail.fixTag)
                json.data.images = trail.fixListImage(json.data.images,'image')
                this.setData({
                    model: data,
                    images: json.data.images,
                    digged: json.data.digged
                })
                wx.setNavigationBarTitle({
                    title: data.title,
                })
            }else{
                wx.showToast({
                  title: '请重试!',
                })
            }
            wx.hideLoading()
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})