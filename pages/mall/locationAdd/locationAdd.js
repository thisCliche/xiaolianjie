// pages/member/address-add.js
import {checkMobile,success,error} from '../../../utils/util'
import {getAddressView,addressSave} from '../../../api/api'
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        action: "添加",
        address_id: 0,
        address: {},
        area: [],
        isloading: false,
        is_defaultId: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // app.initShare(null)
        console.log(options)
        if (options.address_id) {
            this.setData({
                action: "修改",
                address_id: options.address_id
            })
            getAddressView({ id: options.address_id }).then(json => {
                if (json.code == 1) {
                    var areas = [json.data.province, json.data.city, json.data.area]
                    this.setData({
                        address: json.data,
                        area: areas,
                        is_defaultId: json.data.is_default
                    })
                }
            })
        } else {
            wx.setNavigationBarTitle({
                title: '添加地址',
            })
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

    onChanged: function (e) {
        console.log(e)
        var address = this.data.address
        if (e.detail) {
            address.is_default = true
        } else {
            address.is_default = false
        }
        this.setData({
            address: address
        })
    },
    checkRowTap: function () {
        var address = this.data.address
        if (!address.is_default) {
            address.is_default = true
        } else {
            address.is_default = false
        }
        this.setData({
            address: address
        })
    },
    bindValueChange: function (e) {
        var address = this.data.address
        var k = e.currentTarget.dataset.key
        address[k] = e.detail.value
        this.setData({
            address: address
        })
    },
    bindAreaChange: function (e) {
        //console.log(e)
        var areas = e.detail.value
        var address = this.data.address
        address.province = areas[0]
        address.city = areas[1]
        address.area = areas[2]
        this.setData({
            address: address,
            area: areas
        })
    },
    bindTextAreaBlur: function (e) {
        //console.log(e)
        var address = this.data.address
        address.address = e.detail.value
        this.setData({
            address: address
        })
    },
    backUp() {
        wx.navigateBack({
          delta: 1,
        })
      },
    buttonComplete: function () {
        var address = this.data.address
        if (!address.recive_name) {
            error('请填写收货人')
            return
        }
        if (!address.mobile) {
            error('请填写联系电话')
            return
        }
        if (address.mobile.length == 11 && !checkMobile(address.mobile)) {
            error('手机号码不正确')
        }
        if (!address.area) {
            error('请选择所在地区')
            return
        }
        if (!address.address) {
            error('请填写详细地址')
            return
        }
        this.setData({
            isloading: true
        })
        addressSave({ id: this.data.address_id, address: address }).then(json => {
            if (json.code == 1) {
                success('保存成功')
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1000)
            } else {
                error(json.msg)
            }
        })
    }
})