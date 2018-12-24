var util = require('../../pages/utils/util.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startCount:0,
    isFirst:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.categoryTitle;
    console.log(category)

    wx.setNavigationBarTitle({
      title:category
    })
    wx.showLoading();
    var apiUrl = '';
    switch(category){
      case "正在热映":
        apiUrl = app.globalData.g_BaseUrl + '/v2/movie/in_theaters';
        break;
      case "TOP250":
        apiUrl = app.globalData.g_BaseUrl + '/v2/movie/top250';
        break;
    }
    this.data.newUrl = apiUrl;

    util.http(apiUrl, this.processMovieData)
  },

  processMovieData: function (moviesData){
    wx.hideLoading();

    var movies = [];
    for (var idx in moviesData) {
      var movieData = moviesData[idx];
      var title = movieData.title;
      if (title.length > 6){
        title = title.substring(0,6) + '...';
      }
      var temp = {
        star: util.coverString(movieData.rating.stars),
        title: title,
        coverageUrl: movieData.images.large,
        movieId: movieData.id,
        average: movieData.rating.average,
      }
      movies.push(temp);
    }

    var moviesData = {};
    if(!this.data.isFirst){
      // 下拉加载更多数据
      movieData = this.data.movData.concat(movies);
    }else{
      // 请求第一页数据
      movieData = movies;
      this.data.isFirst = false;
    }

    this.setData({
      movData: movieData
    })

    this.data.startCount += 20;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading();
    this.data.isFirst = true;
    this.data.movieData = {};
    var nextUrl = this.data.newUrl + "&start=0&count=20";
    util.http(nextUrl, this.processMovieData)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading();
    var nextUrl = this.data.newUrl + "&start=" + this.data.startCount + "&count=20";
    util.http(nextUrl, this.processMovieData)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  
  jumpDetail: function (event) {
    //movieId
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/Movies/Movies-detail/Movies-detail?movieId=' + movieId,
    })
  },
})