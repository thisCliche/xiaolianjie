// pages/product/detail.js
const util = require("../../../utils/util.js");
const trail = require("../../../utils/trail.js");
const Product = require("../../../utils/product.js");
const app = getApp()
import {productView} from '../../../api/api'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: false,
        autoplay: false,
        interval: 4000,
        duration: 500,
        currentIndex: 1,
        screenWidth: 500,

        member:{},
        //product:null,
        id: 0,
        model: null,
        postage:'免运费',
        hasProp:false,
        is_favourite:0,
        albums: null,
        skus: null,
        price: '',
        points: '',
        market_price: '',
        allstorage:0,
        good_count:1,
        options:{},

        cart_count:0,

        shareimg:'',
        shareheight:750,

        showshare:false,

        maskfor:''
    },

    //组件数据
    product:null,
    params:{},
    backUp() {
      wx.navigateBack({
        delta: 1,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (options) {
        if (options.id) {
            this.setData({
                id: parseInt(options.id)
            })
            this.params.id=this.data.id
        }else if(options.scene){
            let sceneQuery=util.parseScene(options.scene)
            if (sceneQuery.id){
                this.setData({
                    id: parseInt(sceneQuery.id)
                })
                this.params.id = this.data.id
            }
        }
        if (app.globalData.systemInfo){
            this.setData({
                screenWidth: app.globalData.systemInfo.windowWidth
            })
        }
        this.updateCartCount()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady () {
        if(!this.data.id){
            app.error('参数错误')
            // setTimeout(util.tryBack,400)
            return;
        }
        // app.getProfile(profile=>{
        //     this.setData({member:profile})
        //     this.loadData()
        // })
        this.loadData()
    },
    loadData(){
      productView({ id: this.data.id }).then(json => {
            if (json.code == 1) {
                let model = json.data.product
                
                let productModel = new Product(model, json.data.skus, this.data.member?this.data.member.level:null)
                
                this.product = productModel
                let product = productModel.getProduct()
                let skus = productModel.getSkus()
                let albums = [];
                
                albums.push(model.image)
                this.setData({
                    model: product,
                    postage: json.data.postage,
                    //product:product,
                    is_favourite:json.data.is_favourite,
                    albums: albums,
                    skus: skus,
                    points: json.data.product.points,
                    allstorage: productModel.getAllStorage(),
                    sku:skus && skus.length==1?skus[0]:null,
                    specstext: productModel.getSpecText(),
                    proptext: productModel.getPropText(),
                    hasProp: model.prop_data && util.countObject(model.prop_data)>0
                })
                this.setPrice()
            } else {
                app.error(json.msg)
                // setTimeout(util.tryBack, 800)
            }
        })
    },
    bannerChange (e) {
        this.setData({
            currentIndex: e.detail.current+1
        })
    },
    setPrice () {
        let product=this.product
        this.setData({
            price: product.getPriceText(),
            // points: product.
            price_desc: product.getPriceDescText(),
            market_price: product.getMarketPriceText()
        })
    },
    openModal (e, frm = '') {
        var data = {
            ismask: true,
            opt_from: frm,
            modal_title: e.currentTarget.dataset.title,
            maskfor: e.currentTarget.dataset.for
        }
        if (data.maskfor == 'spec') {
            if (this.data.skus instanceof Array && this.data.skus.length > 0) {
                data.selected = this.product.getSelectedText( this.data.options)
                data.sku = this.product.searchSku(this.data.options)
                data.optsku = this.product.getSpecStatus(this.data.options)
            }
        }
        this.setData(data)
    },
    hideModal (e) {
        this.setData({
            ismask: false,
            modal_title:'',
            maskfor: ''
        })
    },
    confirmModal (e) {
        if(this.maskfor=='spec'){
            if(this.opt_from=='buy'){
                this.sureAddCart(e)
            }else{
                this.sureBuy(e)
            }
        }else{
            this.hideModal();
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload () {

    },

    updateCartCount(){
        // trail.getCartCount(count => {
        //     this.setData({
        //         cart_count: count
        //     })
        // })
    },
    selectOption (e) {
        var d = e.currentTarget.dataset
        var options = this.data.options
        if (!this.data.optsku[d.spec_id]
            || !this.data.optsku[d.spec_id][d.value]) {
            return
        }
        if (options[d.spec_id] == d.value) {
            delete options[d.spec_id]
        } else {
            options[d.spec_id] = d.value
        }
        var sku = this.product.searchSku(options)
        
        this.setData({
            sku: sku,
            options: options,
            optsku: this.product.getSpecStatus( options),
            selected: this.product.getSelectedText( options)
        })
    },
    setCount(e) {
        if (this.data.sku == null) {
            app.error("请选择商品规格")
            return false;
        }
        var value = parseInt(e.detail.value)

        if (value < 1) {
            value = 1
        }

        if (value > this.data.sku.storage) {
            app.error("库存不足")
            value = this.data.sku.storage
        }
        this.setData({
            good_count: value
        })
    },
    // gotocart(e){
    //     app.switchIndex('cart')
    // },
    checkLogin(){
        if(!this.data.member.id){
            wx.showModal({
                title: '未登录',
                content: '请登录后购买',
                cancelText:'暂不登录',
                confirmText:'现在登录',
                success(res) {
                    if (res.confirm) {
                        app.switchIndex('member')
                    } 
                }
            })
            return false
        }
        return true
    },
    /**
     * 添加到购物车
     */
    // addtocart(e=null){
    //     this.openModal(e, 'cart')
    // },
    sureAddCart (e) {
        if(!this.checkLogin())return
        if (!this.data.sku) {
            app.error('请选择规格')
        } else {
            if (this.data.sku.storage < 1) {
                app.error('该商品暂时缺货')
                return
            }
            var data = {
                sku_id: this.data.sku.sku_id,
                count: this.data.good_count
            }
            app.httpPost('cart/add', data, json => {
                if (json.code == 1) {
                    app.success('成功添加到购物车')
                    this.updateCartCount()
                } else {
                    app.error(json.msg)
                }
                this.hideModal()
            })
        }
    },
    buynow (e=null) {
        if (this.data.sku) {
            this.sureBuy(e)
        } else {
            this.openModal(e, 'buy')
        }
    },
    sureBuy (e) {
        // if (!this.checkLogin()) return
        if (!this.data.sku) {
            app.error('请选择规格')
        } else {
            if (this.data.sku.storage < 1) {
                app.error('该商品暂时缺货')
                return
            }
            this.hideModal()
            wx.navigateTo({
                url: '../orderconfirm/confirm?from=buy&storage=' + this.data.sku.storage + '&data=cartdata',
                success:  (res) =>{
                    if (res.eventChannel) {
                        res.eventChannel.emit('acceptDataFromOpenerPage', this.getOrderData())
                    } else {
                        app.globalData['cartdata'] = this.getOrderData()
                    }
                 }
            })
        }
    },
    getOrderData () {
        var product = this.data.model
        var cart = {}
        cart.sku_id = this.data.sku.sku_id
        cart.product_price = this.data.sku.price
        cart.product_image = product.image
        cart.count = this.data.good_count > 1 ? this.data.good_count : 1
        cart.product_id = product.id
        cart.product_title = product.title
        //cart.promotion = this.data.promotions,
        //cart.max_buy = product.max_buy

        return [cart]
    },
    
    emptyEvent(e=null){
        if(e){
            
        }
    }
})