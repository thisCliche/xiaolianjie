// pages/member/order-detail.js
const trail = require("../../../utils/trail.js");
import {error,success,timestampToTime} from '../../../utils/util'
import {orderDetail} from '../../../api/api'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:0,
        order:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let order_id = parseInt(options.id)
        if(!order_id){
            app.error('参数错误')
            setTimeout(util.tryBack,500)
        }else{
            this.setData({
                id: order_id
            })
            this.loadData()
        }
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

    gotoProduct(e){
        let data=e.currentTarget.dataset
        wx.navigateTo({
            url: '/pages/product/detail?id=' + data.id
        })
    },
    gotoExpress(){
        let order = this.data.order;
        if(order.status>0 && order.express_no){
            wx.navigateTo({
                url: 'order-express?id=' + order.order_id
            })
        }else{
            error('没有物流信息')
        }
    },
    loadData(){
        wx.showLoading({
            title: '',
        })
        orderDetail({ id: this.data.id }).then(json => {
            wx.hideLoading()
            if(json.code==1){
                let order = json.data
                order.create_date = timestampToTime(order.create_time)
                order.pay_date = timestampToTime(order.pay_time)
                order.deliver_date = timestampToTime(order.deliver_time)
                order.confirm_date = timestampToTime(order.confirm_time)
                if(order.products){
                    order.products = trail.fixListImage(order.products, 'product_image')
                }
                
                this.setData({order:order})
            } else {
                error(json.msg)
                setTimeout(util.tryBack, 800)
            }
        })
    },
    orderAction(e) {
        let data = e.currentTarget.dataset;
        let id = data.id, status = data.status

        trail.orderAction(data.action, id, status, () => {
            if(data.action=='delete'){
                wx.navigateBack({
                    
                })
            }else{
                this.loadData()
            }
        })
    },
    copyOrderNo(e){
        wx.setClipboardData({
            data: this.data.order.order_no,
            success:res=>{
                success('复制成功')
            },
            fail:res=>{
                success('请手动选择复制')
            }
        })
    },
    backUp() {
        wx.navigateBack({
          delta: 1,
        })
      },

})