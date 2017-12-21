const apiUrl = require("../../../../../../config").apiUrl;
Page({
  data: {
    // id
    id: "",
    //头像
    avatar: "",
    // 名字
    name: "",
    // 是否关注
    following: false,
    // 	动态总数
    record_count: "",
    // 粉丝数
    follower_count: "",
    // 区id
    area_id: "",
    location: "",
    // 简介
    description: "",
    // 热线电话
    hotline: ""
  },
  onLoad(options) {
    let _this = this;
    this.setData({
      id: options.id
    }),
      wx.setNavigationBarTitle({
        title: options.name + "的主页"
      });
    _this.getData(
      "/user/userInfo",
      {
        id: options.id
      },
      _this.success,
      _this.fail
    );
  },

  //   请求数据  success成功 回调方法     fail 失败 回调方法
  getData(url, data, success, fail) {
    let _this = this;
    wx.request({
      url: apiUrl + url,
      data: data,
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res) {
        if (res.data.status_code % 100 == 0) {
          success(res.data.result);
        }
      },
      fail: function(res) {
        fail(res);
      }
    });
  },
  success(data) {
    console.log(data);
    this.setData({
      //头像
      avatar: data.avatar,
      // 名字
      name: data.name,
      // 是否关注
      following: data.following,
      // 	动态总数
      record_count: data.record_count,
      // 	粉丝数
      focus_count: data.focus_count,
      // 区id
      area_id: data.area_id,
      location: data.location,
      // 简介
      description: data.description,
      // 热线电话
      hotline: data.hotline
    });
  },
  fail(data) {
    console.log(data);
  },
  //热线电话
  clickHotline: function() {
    var _this = this;
    if (this.data.hotline) {
      wx.showModal({
        title: "拨打电话：",
        content: _this.data.hotline,
        confirmText: "确定",
        cancelText: "取消",
        success: function(res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: _this.data.hotline,
              success: function() {
                console.log("成功拨打电话");
              }
            });
          }
        }
      });
    } else {
      wx.showModal({
        content: "该用户暂未填联系方式",
        showCancel: false,
        confirmText: "确定"
      });
    }
  }
});
