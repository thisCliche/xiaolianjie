// pages/member/address.js
import {success,error, confirm} from '../../../utils/util'
import {getAddress,addressSetDefau,addressDelete,addressSave} from '../../../api/api'
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        default_id: 0,
        addresses: [],
        deleted: {},
        isloading: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // app.initShare(null)
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
        var self = this;
        getAddress().then(data=> {
            if (data.code == 1) {
                var addresses = data.data
                var default_id = 0
                for (var i = 0; i < addresses.length; i++) {
                    if (addresses[i].is_default) {
                        default_id = addresses[i].address_id
                    }
                }
                self.setData({
                    default_id: default_id,
                    addresses: addresses,
                    isloading: false
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

    },

    onSetDefault: function (e) {
        var defaultid = e.detail
        if (defaultid == this.data.default_id) return;
        var self = this
        confirm('您确定将所选地址设为默认地址？', () => {
            addressSetDefau({ id: defaultid }).then(json => {
                if (json.code == 1) {
                    self.setData({
                        default_id: defaultid
                    })
                    success(json.msg)
                } else {
                    error(json.msg)

                }
            })
        })
    },
    addAddress: function () {
        wx.navigateTo({
            url: '../locationAdd/locationAdd',
        })
    },
    editAddress: function (e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../locationAdd/locationAdd?address_id=' + id,
        })
    },
    delAddress: function (e) {
        var id = e.currentTarget.dataset.id
        var self = this
        confirm('您是否确认删除该地址？', () => {
            addressDelete( { id: id }).then(data => {
                if (data.code == 1) {
                    success('删除成功')
                    var deleted = self.data.deleted
                    deleted[id] = true
                    self.setData({
                        deleted: deleted
                    })
                } else {
                    error(data.message || "删除失败")
                }
            })

        })
    },
    addFromWechat: function () {
        var self = this
        wx.chooseAddress({
            success: (res) => {
                var address = {}
                address.recive_name = res.userName
                //address.recive_name = res.postalCode
                address.province = res.provinceName
                address.city = res.cityName
                address.area = res.countyName
                address.address = res.detailInfo
                //address.recive_name = res.nationalCode
                address.mobile = res.telNumber
                //address.id = 0

                wx.showLoading({
                    title: '正在提交'
                })
                addressSave({address:address,id:0}).then(json => {
                        wx.hideLoading()
                        if (json.code == 1) {
                            success('保存成功')
                            self.onShow()
                        } else {
                            error(json.msg)
                        }
                    })
            }
        })
    },
    backUp() {
        wx.navigateBack({
          delta: 1,
        })
      },
})