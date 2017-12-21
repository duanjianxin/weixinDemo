Page({
  data: {
    dataList: [
      {
        url:
          "http://public-1255382141.file.myqcloud.com/miniApp/%E9%A6%96%E9%A1%B5%20%EF%BC%8D%E9%A2%84%E5%91%8A%E8%AF%A6%E6%83%85.png",
        title: "第七届中国国际机器人高峰论坛报名",
        time: "2017.10.10 09:00-10.12 16:00",
        place: "深圳",
        pass: true
      },
      {
        url:
          "http://public-1255382141.file.myqcloud.com/miniApp/%E9%A6%96%E9%A1%B5%20%EF%BC%8D%E9%A2%84%E5%91%8A%E8%AF%A6%E6%83%85.png",
        title: "第七届中国国际机器人高峰论坛报名",
        time: "2017.10.10 09:00-10.12 16:00",
        place: "深圳",
        pass: false
      },
      {
        url:
          "http://public-1255382141.file.myqcloud.com/miniApp/%E9%A6%96%E9%A1%B5%20%EF%BC%8D%E9%A2%84%E5%91%8A%E8%AF%A6%E6%83%85.png",
        title: "第七届中国国际机器人高峰论坛报名",
        time: "2017.10.10 09:00-10.12 16:00",
        place: "深圳",
        pass: false
      },
      {
        url:
          "http://public-1255382141.file.myqcloud.com/miniApp/%E9%A6%96%E9%A1%B5%20%EF%BC%8D%E9%A2%84%E5%91%8A%E8%AF%A6%E6%83%85.png",
        title: "第七届中国国际机器人高峰论坛报名",
        time: "2017.10.10 09:00-10.12 16:00",
        place: "深圳",
        pass: false
      },
      {
        url:
          "http://public-1255382141.file.myqcloud.com/miniApp/%E9%A6%96%E9%A1%B5%20%EF%BC%8D%E9%A2%84%E5%91%8A%E8%AF%A6%E6%83%85.png",
        title: "第七届中国国际机器人高峰论坛报名",
        time: "2017.10.10 09:00-10.12 16:00",
        place: "深圳",
        pass: false
      },
      {
        url:
          "http://public-1255382141.file.myqcloud.com/miniApp/%E9%A6%96%E9%A1%B5%20%EF%BC%8D%E9%A2%84%E5%91%8A%E8%AF%A6%E6%83%85.png",
        title: "第七届中国国际机器人高峰论坛报名",
        time: "2017.10.10 09:00-10.12 16:00",
        place: "深圳",
        pass: false
      },
      {
        url:
          "http://public-1255382141.file.myqcloud.com/miniApp/%E9%A6%96%E9%A1%B5%20%EF%BC%8D%E9%A2%84%E5%91%8A%E8%AF%A6%E6%83%85.png",
        title: "第七届中国国际机器人高峰论坛报名",
        time: "2017.10.10 09:00-10.12 16:00",
        place: "深圳",
        pass: false
      }
    ]
  },
  // 数据展示
  dataShow(data = null) {
    if (data != null) {
      console.log("aaaa");
    } else {
      wx.showToast({
        title: "暂无数据",
        icon: "info",
        duration: 2000
      });
    }
  },
  onShow: function() {},
  onLoad: function() {
  }
});
