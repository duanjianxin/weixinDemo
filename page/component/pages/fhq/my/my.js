// 获取接口地址
const apiUrl = require("../../../../../config").apiUrl;

Page({
  data: {
    // 默认昵称
    nickname: "",
    // 关注数
    follow: 0,
    // 收藏数
    collection: 0,
    // 消息圆点
    messageCircle: false,
    // 关注
    icon_fllow: "../images/icon_fllow.png",
    // 收藏
    icon_favor_pressed: "../images/icon_favor_pressed.png",
    icon_message: "../images/icon_message.png",
    // 消息iocn
    icon_forward_gold: "../images/icon_forward_gold.png",
    // 咨询iocn
    icon_phone: "../images/icon_phone.png",
    // 我的报名iocn
    ic_apply_my: "../images/ic_apply_my.png",
    user_info: null,
    token_info: null
  },
  // 打电话
  makePhoneCall: function() {
    var _this = this;
    wx.showModal({
      title: "拨打电话：",
      content: _this.data.user_info.official_line,
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: _this.data.user_info.official_line,
            success: function() {
              console.log("成功拨打电话");
            }
          });
        }
      }
    });
  },
  makeRequest: function() {},
  onLoad: function() {
    let _this = this;
    // 读取用户信息
    _this.setData({
      user_info: getApp().globalData.user_info
    });
    // 读取授权信息
    _this.setData({
      token_info: getApp().globalData.token_info
    });
  },
  onShow: function() {
    let _this = this;
    _this.newMessage("/user/newMessage", _this.data.token_info.access_token);
  },
  // 判断是否有最新消息
  newMessage(url, access_token) {
    let _this = this;
    wx.request({
      url: apiUrl + url,
      method: "GET",
      data: {
        type: 0
      },
      header: {
        "content-type": "application/json",
        Authorization: " Bearer " + access_token
      },
      success: function(res) {
        if (res.data.status_code % 100 == 0) {
          console.log(res.data);

          if (res.data.result == null) {
            _this.setData({
              messageCircle: false
            });
          } else if (res.data.result.nums > 0) {
            _this.setData({
              messageCircle: true
            });
          }
        }
      }
    });
  }
});
