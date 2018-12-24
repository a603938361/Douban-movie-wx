var postData = require('../data/post-datas.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      post_key: postData.postList
    });

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

  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../post-detail/post-detail?id=' + postId,
    })
  },

  clickSwiper:function(event){
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: '../post-detail/post-detail?id=' + postId,
    })
  },

  clickLike:function(event){
    var postId = event.currentTarget.dataset.postid;
    var view_num = this.data.post_key[postId].view_num;
    var num = parseInt(view_num);
    num += 1;
    this.data.post_key[postId].view_num = num;
    var postList = this.data.post_key;
    this.setData({
      post_key: postList
    })
  }
})