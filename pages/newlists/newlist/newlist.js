// pages/newlists/newlist/newlist.js
import {timestampToTime,routerFiliter} from '../../../utils/util'
import {getNewList} from '../../../api/api.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isNoMore: false,
        triggered: false,
        article: [],
        show: true,
        queryInfo: {
            // 当前页码
            page: 1,
            // 当前每页条数
            pagesize: 10
        },
        total_page: ''
    },
    backUp() {
        wx.navigateBack({
            delta: 1,
        })
    },
    // 获取美文列表
    async getNewList(){
        let res = await getNewList(this.data.queryInfo)
        res.data.lists.forEach(item=>{
            item.create_time = timestampToTime(item.create_time)
        })
        this.setData({
            article:res.data.lists,
            total_page: res.data.total_page
        })
    },
    gotoDetail(e){
        let id = e.currentTarget.dataset.id
        let url = '/pages/newlists/detail/detail?id=' + id
        routerFiliter(url)
        // let id = e.currentTarget.dataset.id
        //     wx.navigateTo({
        //         url: '/pages/newlists/detail/detail?id=' + id,
        //     })
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
        this.getNewList()
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
        wx.showNavigationBarLoading(); //在标题栏中显示加载图标
        let that = this
        getNewList({page:1,pagesize:10}).then(res=>{
            res.data.lists.forEach(item=>{
                item.create_time = timestampToTime(item.create_time)
            })
            that.setData({
                article:res.data.lists,
                total_page: res.data.total_page
            })
            wx.hideNavigationBarLoading(); //完成停止加载图标
            wx.stopPullDownRefresh();
        })
        this.setData({
            queryInfo:{page:1,pagesize:10}
        })
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