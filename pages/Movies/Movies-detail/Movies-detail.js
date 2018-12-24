// pages/Movies/Movies-detail/Movies-detail.js
var util = require('../../utils/util.js')

// ES6 引入module
import {Movie} from 'class/Movie-Class.js';

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
    wx.showLoading();

    var that = this;
    var movieId = options.movieId;
    console.log(movieId);
    var url = app.globalData.g_BaseUrl + "/v2/movie/subject/" + movieId

    // var movie = new Movie(url);
    // movie.getMovieData(function(movie){
    //   this.setData({
    //     movie:movie
    //   })
    // });
    
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        that.processData(res.data);
      },
      complete:function(res){
        wx.hideLoading();
      }
    })
  },

  onClickImage:function(res){
    var imgUrl = res.currentTarget.dataset.imgurl;
    wx.previewImage({
      current:imgUrl,
      urls: [imgUrl],
    })
  },

  processData:function(data){

    if(!data){
      return;
    }
    
    var director = {
      avatar:'',
      name:'',
      id:'',
    }
    if(data.directors[0] != null){
      if(data.directors[0].avatars != null){
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id
    }

    var movie = {
      movieImg : data.images ? data.images.large : "",
      country : data.countries[0],
      title: data.title,
      originalTitle:data.original_title,
      wishCount:data.wish_count,
      commentCount:data.comments_count,
      year:data.year,
      generes:data.genres.join(","),
      stars: util.coverString(data.rating.stars),
      score:data.rating.average,
      director:director,
      casts:util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary:data.summary
    }
    this.setData({
      movie:movie
    })
  }
})
