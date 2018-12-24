var postData = require('../data/post-datas.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var subData = postData.postList[options.id]

    this.setData({
      postData: subData
    })
    wx.setNavigationBarTitle({
      title: this.data.postData.title,
    })
    wx.getStorage({
        key: 'key',
        success: function(res) {
        },
      }),

      this.setAudioMon();
  },

  setAudioMon: function() {
    wx.onBackgroundAudioPlay(function() {
      this.setData({
        isPlay: true
      })
    })
    wx.onBackgroundAudioPause(function() {
      this.setData({
        isPlay: false
      })
    }),
    wx.onBackgroundAudioStop(function(){
      this.setData({
        isPlay: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // 退出页面关闭播放器
    if (this.data.isPlay) {
      wx.stopBackgroundAudio()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  clickShare: function(event) {

    var tempFlag = this.data.collected;

    this.setData({
      collected: !tempFlag
    })

    wx.showToast({
      title: this.data.collected ? this.showToast() : '取消成功',
      duration: 3000
    })
  },



  showToast: function() {
    wx.showModal({
      title: '收藏',
      content: '是否收藏该文章',
      showCancel: true,
      cancelText: '取消',
      success: function(res) {
        if (res.confirm) {
          wx.showToast({
            title: '收藏成功',
          })
        }
      }
    })
  },

  clickEmail: function(event) {
    var itemList = ['QQ', 'SINA', '163', '126']
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function(res) {
        // res.cancel   点击取消
        // res.tapIndex  点击序号

        wx.showToast({
          title: '将要打开邮箱' + itemList[res.tapIndex],
        })
      }
    })
  },
  clickMusic: function(event) {

    var url = this.data.postData.music.url;
    var title = this.data.postData.music.title;
    var coverImgUrl = this.data.postData.music.coverImg;

    if (this.data.isPlay) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlay: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: url,
        title: title,
        coverImgUrl: coverImgUrl,
      })
      this.setData({
        isPlay: true
      })
    }
  }
})