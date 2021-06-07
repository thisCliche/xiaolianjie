// pages/mall/mallList/mall.js
import {
    getAllCates,
    getMallList
} from '../../../api/api'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        securyheight: app.globalData.statusBarHeight + 90,
        triggered: false,
        option1: [{
            text: '全部商品',
            value: 0
        }],
        option2: [{
                text: '售价顺序',
                value: 1
            },
            {
                text: '售价逆序',
                value: 2
            },
        ],
        option3: [{
                text: '销量顺序',
                value: 1
            },
            {
                text: '销量逆序',
                value: 2
            },
        ],
        cate: 0,
        price: 1,
        sale: 1,
        page: 1,
        pagesize: 8,
        total_page: 0,
        lists: [],
        nomore: false
    },
    backUp() {
        wx.navigateBack({
            delta: 1,
        })
    },

    async getMallList(data) {
        let res = await getMallList(data)
        this.setData({
            total_page: res.data.total_page,
            lists: res.data.lists
        })
    },
    cateChage(e){
        let data = {
            cate: e.detail,
            price: this.data.price,
            sale: this.data.sale,
            page: 1,
            pagesize: this.data.pagesize,
        }
        this.setData({cate: e.detail})
        this.getMallList(data)
    },
    priceChage(e){
        let data = {
            cate: this.data.cate,
            price: e.detail,
            sale: this.data.sale,
            page: 1,
            pagesize: this.data.pagesize,
        }
        this.setData({price: e.detail})
        this.getMallList(data)
    },
    saleChage(e){
        let data = {
            cate: this.data.cate,
            price: this.data.price,
            sale: e.detail,
            page: 1,
            pagesize: this.data.pagesize,
        }
        this.setData({sale: e.detail})
        this.getMallList(data)
    },
    gotoProduct(e){
        this.gotoDetail(e)
    },
    gotoDetail (e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../mallDetail/malldetail?id=' + id,
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
        getAllCates().then(res => {
            let arr = []
            res.data.forEach(item => {
                let ele = {}
                ele.text = item.title
                ele.value = item.id
                arr.push(ele)
            })
            let option1 = this.data.option1
            this.setData({
                option1: option1.concat(arr)
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let query = {
            cate: 0,
            price: 1,
            sale: 1,
            page: 1,
            pagesize: 8,
        }
        this.getMallList(query)
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
    onRefresh: function () {
        let data = {
            cate: this.data.cate,
            price: this.data.price,
            sale: this.data.sale,
            page: 1,
            pagesize: this.data.pagesize,
        }
        this.setData({page: 1})
        let that = this
        getMallList(data).then(res=>{
            that.setData({
                total_page: res.data.total_page,
                lists: res.data.lists,
                triggered: false,
            })
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log('触底了')
        let data = {
            cate: this.data.cate,
            price: this.data.price,
            sale: this.data.sale,
            page: this.data.page,
            pagesize: this.data.pagesize,
        }
    if(data.page>= this.data.total_page) return this.setData({
      nomore: true
    })
    wx.showNavigationBarLoading();
    data.page+=1
    this.setData({page:data.page} )
    getMallList(data).then(res=>{
        console.log(res)
      let result = res.data.lists;
      let total_page = res.data.total_page;
      let lists = this.data.lists
      let newList = lists.concat(result)
      this.setData({
        lists: newList,
        total_page
      })
      wx.hideNavigationBarLoading();
    })

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})