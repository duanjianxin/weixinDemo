// 获取接口地址
const apiUrl = require("../../../../../../config").apiUrl;
Page({
  data: {
    token_info: null,
    messageList: []
  },

  onShow() {
    this.setData({
      token_info: getApp().globalData.token_info
    });
    this.getList("/user/messages", this.data.token_info.access_token);
  },
  getList(url, access_token) {
    let _this = this;
    wx.request({
      url: apiUrl + url,
      method: "GET",
      data: {},
      header: {
        "content-type": "application/json",
        Authorization: " Bearer " + access_token
      },
      success: function(res) {
        if (res.data.status_code % 100 == 0) {
          _this.setData({
            messageList: res.data.result
          });
        }
        console.log(res.data);
      }
    });
  }
});
