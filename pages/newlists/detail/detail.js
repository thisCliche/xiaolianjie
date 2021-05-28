// pages/newlists/detail/detail.js
import {getNewDetail,getComments,sendComments,getallPoint,memberDetail} from '../../../api/api'
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
        timer: null,
        desc: '',
        point_second: null,
        points: '',
        second: 0,
        source_type: '',
        isReply: false,
        inter: null
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
            let that = this
            if (json.code == 1) {
                let data=json.data.article
                data.create_time = timestampToTime(data.create_time,false)
                data.cover = trail.fixImageUrl(data.cover)
                let contentold = data.content
                data.content = contentold.replace(/\<img/gi, '<img style="width: 100%;height:auto"');
                // data.content = html.HtmlToNodes(data.content, trail.fixTag)
                // json.data.images = trail.fixListImage(json.data.images,'image')
                this.setData({
                    model: data,
                    images: json.data.images,
                    digged: json.data.digged,
                    desc: json.data.desc,
                    point_second: json.data.point_second,
                    points: json.data.points,
                    second: json.data.second,
                    source_type: json.data.source_type
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
            if(this.data.point_second){
                let second = parseInt(that.data.second)
                this.setData({
                    inter:setInterval(() => {
                        second--
                        that.setData({
                            second: second
                        })
                        if(second<=0){
                            clearInterval(this.data.inter)
                            console.log('定时结束了')
                            getallPoint({type:1,value:that.data.points,source_type:that.data.source_type,desc:that.data.desc}).then(res=>{
                                console.log(res)
                            })
                        }
                    }, 1000)
                })
            }
        })
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        memberDetail().then(res=>{
            if(res.data.auth == 1) {
                this.setData({
                    isReply: true
                })
              }
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
        clearInterval(this.data.inter)
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