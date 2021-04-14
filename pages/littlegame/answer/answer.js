// pages/littlegame/answer/answer.js
import {getAnswerList,sendAnswerRecord} from '../../../api/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        questionList: [],
        curren: 1,
        total: 0,
        answer: {},
        currenList: {},
        correct: 0,
    },
    backUp() {
        wx.navigateBack({
          delta: 1,
        })
      },
      upan(){
        let beforeCu =  this.data.curren
        let curren = --beforeCu
        let currenList = this.data.questionList[curren-1]
        this.setData({
            curren,
            currenList
        })
      },
      nextan(){
        let beforeCu =  this.data.curren
        let curren = ++beforeCu
        let currenList = this.data.questionList[curren-1]
        this.setData({
            curren,
            currenList
        })
      },
      async suban(){
       let res = await sendAnswerRecord({success_num:this.data.answer,number:this.data.total})
      },
      confirmAn(e){
        if(this.data.currenList.currenAn) return
        // 判断是否答对
        let isCorrect = false,correct=this.data.correct;
        console.log(correct)
        correct+=1
        console.log(correct)
        if(this.data.currenList.correct_answer == e.currentTarget.dataset.order) {
            isCorrect = true
            this.setData({
                correct:correct
            })
        }
        let curren=e.currentTarget.dataset.curren;
        let id= e.currentTarget.dataset.id;
        let order=e.currentTarget.dataset.order,
        questionList = this.data.questionList,
        currenList= this.data.currenList,
        answer = this.data.answer
        answer[id] = isCorrect

        questionList.forEach((item,idx)=>{
            if(idx==curren) {
                item.currenAn = order
            }
        })
        currenList.currenAn = order
        // answer.push(answerColumn)
        this.setData({
            answer,
            questionList,
            currenList,
        })
      },
      async getAnswerList() {
        let res = await getAnswerList()
        let total = res.data.length
        this.setData({
            questionList: res.data,
            total,
            currenList: res.data[0]
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
        this.getAnswerList()
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