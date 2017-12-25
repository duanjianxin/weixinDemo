// 获取接口地址
const apiUrl = require("../../../../../../config").apiUrl;
Page({
  data: {
    token_info: null,
    dataList: []
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
  onShow: function() {
    this.setData({
      token_info: getApp().globalData.token_info
    });
    this.getList("/user/prevueJoinList", this.data.token_info.access_token);
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
            dataList: res.data.result
          });
        }
        console.log(res.data);
      },
      fail(res) {
        wx.showModal({
          content: res.data.message,
          showCancel: false,
          confirmText: "确定"
        });
      }
    });
  }

  // url /user/prevueJoinList
});
