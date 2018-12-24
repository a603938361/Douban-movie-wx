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


  },
  getUserInfo: function(res) {

    this.setData({
      g_userInfo: res.detail.userInfo
    })
  },

  /**4.jpg
   * 
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(event) {
    var headerImg = this.data.g_userInfo.avatarUrl;
    var title = this.data.g_userInfo.nickName;
    var shareObj = {
      title: title,
      path: 'pages/Home/Home',
      imgUrl: headerImg
    }
    return shareObj;
  },

  onTap: function() {

    wx.switchTab({
      url: '../Home/Home',
    })
  }
})