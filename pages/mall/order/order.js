// pages/member/order.js
// const util = require("../../utils/util.js");
const trail = require("../../../utils/trail.js");
import {tip} from '../../../utils/util'
import {orderMange} from '../../../api/api'


Page({

    /**
     * 页面的初始数据
     */
    data: {
        status:"",
        page:1,
        orders:[[]],
        ordercounts:[],
        hasmore:true,
        totalcount:0,
        isloading:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.status !== undefined && options.status !== '' && options.status !== null){
            this.setData({
                status: options.status
            })
        }
        this.loadData();
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

    backUp() {
        wx.navigateBack({
          delta: 1,
        })
      },
    changeStatus(e){
        let status=e.target.dataset.status
        //console.log(status)
        this.setData({
            status: status,
            hasmore: true,
            orders:[[]],
            page:1
        })
        this.loadData()
    },
    reloadData(e){
        let newData = { }
        newData['orders[' + this.data.page + ']'] = []
        this.setData(newData)
        if(this.data.hasmore)this.data.page--
        else this.data.hasmore=true
        this.loadData()
    },
    loadmoreData(e){
        this.loadData()
    },
    loadData(){
        //console.log('loadData')
        if(!this.data.hasmore)return false;
        this.setData({
            isloading: true
        })
        orderMange({status:this.data.status,page:this.data.page}).then(json=>{
            let newData = {
                hasmore: false,
                isloading: false
            }
            if(json.code == 1){
                newData['ordercounts']=json.data.counts
                newData['totalcount']=json.data.count
                if(json.data && json.data.lists && json.data.lists.length>0){
                    let lists = trail.fixListImage(json.data.lists,'products.product_image')
                    newData['orders[' + this.data.page + ']'] = json.data.lists
                    if (this.data.page < json.data.total_page){
                        newData['hasmore'] = true;
                        this.data.page ++
                    }
                }
                
            }else{
                newData['orders[' + this.data.page + ']'] = [];
                tip('加载错误')
            }
            //console.log(newData)
            this.setData(newData)
        })
        return true
    },
    orderDetail(e){
        let data = e.currentTarget.dataset
        
        let id = data.id
        wx.navigateTo({
            url: 'order-detail?id=' + id
        })
    },
    orderAction(e){
        let data = e.currentTarget.dataset;
        let id=data.id,status=data.status

        trail.orderAction(data.action,id,status,()=>{
            this.reloadData()
        })
    }
})