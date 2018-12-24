function coverString(star) {
  var num = star.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array
}

function http(url, callBack) {
  console.log(url)
  var that = this;
  // 热映
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function(res) {
      callBack(res.data.subjects)
    },
    fail: function(res) {
      // console.log(res)
    },
    complete: function(res) {
      // console.log(res)
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = '';
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + "/";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = [];
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  coverString: coverString,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}