// pages/Movies/Movies.js

var util = require('../../pages/utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPage: false,
    mainPage: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var intheaterUrl = app.globalData.g_BaseUrl + '/v2/movie/in_theaters?city=上海&start=0&count=3';
    var top250 = app.globalData.g_BaseUrl + '/v2/movie/top250&start=0&count=3';

    wx.showLoading();
    this.getMovieListData(intheaterUrl, 'intheaterUrl', '正在热映');
    this.getMovieListData(top250, 'top250', 'TOP250');
  },

  getMovieListData: function(url, key, categoryTitle) {

    var that = this;
    // 热映
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        that.processMovieData(res.data.subjects, key, categoryTitle);
      },
      fail: function(res) {
      },
      complete: function(res) {
      }
    })
  },

  processMovieData: function(moviesData, key, categoryTitle) {
    wx.hideLoading();

    var movies = [];
    for (var idx in moviesData) {
      var movieData = moviesData[idx];
      var title = movieData.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...';
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

    var data = {};
    data[key] = {
      categoryTitle: categoryTitle,
      movData: movies
    }
    this.setData(data)
  },

  clickMore: function(event) {

    var title = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: '/pages/Top250/Top250?categoryTitle=' + title,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onBindFocus: function() {
    this.setData({
      searchPage: true,
      mainPage: false,
    })
  },

  onBindChange: function(event) {
    var that = this;
    var keyword = event.detail.value;
    var searchUrl = app.globalData.g_BaseUrl + '/v2/movie/search?tag=' + keyword + '&start=0&count=10';
    this.getMovieListData(searchUrl, 'searchResults', '');
  },

  onClickClose: function(event) {
    this.setData({
      searchPage: false,
      mainPage: true,
    })
  },
  jumpDetail:function(event){
    //movieId
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/Movies/Movies-detail/Movies-detail?movieId='+movieId,
    })
  }
})