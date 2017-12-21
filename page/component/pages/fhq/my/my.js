// 获取接口地址
const apiUrl = require("../../../../../config").apiUrl;

Page({
  data: {
    // 默认头像
    imageUrl:
      "http://public-1255382141.file.myqcloud.com/miniApp/ic_default_img.png",
    // 关注
    icon_fllow: "../images/icon_fllow.png",
    // 收藏
    icon_favor_pressed: "../images/icon_favor_pressed.png",
    // 默认昵称
    nickname: "骚呢！大兄弟",
    // 关注数
    follow: 0,
    // 收藏数
    collection: 0,
    icon_message: "../images/icon_message.png",
    // 消息iocn
    icon_forward_gold: "../images/icon_forward_gold.png",
    // 消息圆点
    messageCircle: true,
    // 咨询iocn
    icon_phone: "../images/icon_phone.png",
    // 默认电话号码
    phoneNub: "17080951690",
    // 我的报名iocn
    ic_apply_my: "../images/ic_apply_my.png"
  },
  // 打电话
  makePhoneCall: function() {
    var _this = this;
    wx.showModal({
      title: "拨打电话：",
      content: _this.data.phoneNub,
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: _this.data.phoneNub,
            success: function() {
              console.log("成功拨打电话");
            }
          });
        }
      }
    });
  },
  makeRequest: function() {

  },
  onShow: function() {
    // this.makeRequest();
    // console.log(apiUrl);
  }
});
