const apiUrl = require("../../../../../../config").apiUrl;
Page({
  data: {
    switch: false
  },
  //   onLoad(options) {
  //     let _this = this;
  //     this.setData({
  //       id: options.id
  //     }),
  //       wx.setNavigationBarTitle({
  //         title: options.name + "详情"
  //       });
  //     _this.getData(
  //       "/prevue/detail",
  //       {
  //         id: options.id
  //       },
  //       _this.success,
  //       _this.fail
  //     );
  //   },
  onShow() {
    let _this = this;
    _this.getData(
      "/prevue/detail",
      {
        id: "8a0a22e0-0bd4-f477-8e4c-fb0323f16f1d"
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
      id: data.id,
      media_type: data.media_type,
      topic: data.topic,
      description: data.description,
      stock_count: data.stock_count,
      count_limit: data.count_limit,
      sale_count: data.sale_count,
      focus_count: data.focus_count,
      template: data.template,
      created_at: data.created_at,
      is_top: data.is_top,
      start_time: data.start_time,
      end_time: data.end_time,
      stop_time: data.stop_time,
      status: data.status,
      area_id: data.area_id,
      location: data.location,
      lng: data.lng,
      lat: data.lat,
      input_items: data.input_items,
      user: {
        name: data.user.name,
        avatar: data.user.avatar,
        auth_status: data.user.auth_status,
        unread_nums: data.user.unread_nums,
        id: data.user.id,
        hotline: data.user.hotline
      },
      detail: data.detail,
      cover: data.cover
    });
  },
  fail(data) {
    console.log(data);
  },
  //热线电话
  clickHotline: function() {
    var _this = this;
    if (this.data.user.hotline) {
      wx.showModal({
        title: "拨打电话：",
        content: _this.data.user.hotline,
        confirmText: "确定",
        cancelText: "取消",
        success: function(res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: _this.data.user.hotline,
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
  },
  onSwitch() {
    this.setData({
      switch: !this.data.switch
    });
  }
});
