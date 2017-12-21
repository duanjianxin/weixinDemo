const apiUrl = require("../../../../../../config").apiUrl;

Page({
  data: {
    //   详情id
    id: "",
    // 场地 1 动态 2
    type: "",
    headerFirstImg: "",
    headerImgs: [],
    // 头像
    headAvatar: "",
    // 	用户昵称
    user_name: "",
    //用户ID
    user_id: "",
    // 是否关注该用户
    following: "",
    // 认证状态(0:无认证; 1:等待认; 2: 认证中; 3:认证成功; -1:认证失败)
    auth_status: "",
    // 描述
    description: "",
    // 区编号
    area_id: "",
    // 收藏总数
    focus_count: "",
    // 点赞总数
    favorite_count: "",
    //是否收藏
    is_focus: "",
    // 是否点赞
    is_favorite: "",
    //热线电话
    hotline: "",
    // 媒体类型(（0: 图片, 1: 视频)
    media_type: ""
  },
  //   获取url传过来的值
  onLoad: function(options) {
    this.setData({
      id: options.id,
      type: options.type
    });
    let _this = this;
    _this.getData(
      "/record/detail",
      {
        id: _this.data.id,
        type: _this.data.type
      },
      _this.hendle
    );
  },
  // onLoad() {
  //   let _this = this;
  //   _this.getData(
  //     "/record/detail",
  //     {
  //       id: _this.data.id,
  //       type: _this.data.type
  //     },
  //     _this.hendle
  //   );
  // },
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
          success(res);
        }
      },
      fail: function(res) {
        fail(res);
      }
    });
  },
  hendle(data) {
    console.log(data);
    let medias = data.data.result.medias;
    let forMedias = [];
    for (let index = 0; index < medias.length; index++) {
      forMedias.push(medias[index].url);
    }
    this.setData({
      // 图片第一张
      headerFirstImg: data.data.result.medias[0].url,
      // 图片数组
      headerImgs: forMedias,
      // 头像
      headAvatar: data.data.result.user.avatar,
      // 	用户昵称
      user_name: data.data.result.user.name,
      //用户ID
      user_id: data.data.result.user.id,
      // 是否关注该用户
      following: String(data.data.result.user.following),
      // 认证状态(0:无认证; 1:等待认; 2: 认证中; 3:认证成功; -1:认证失败)
      auth_status: data.data.result.user.auth_status,
      //   描述
      description: data.data.result.description,
      // 区编号
      area_id: data.data.result.area_id,
      // 收藏总数
      focus_count: data.data.result.focus_count,
      // 点赞总数
      favorite_count: data.data.result.favorite_count,
      //是否收藏
      is_focus: data.data.result.is_focus,
      // 是否点赞
      is_favorite: data.data.result.is_favorite,
      //热线电话
      hotline: data.data.result.user.hotline,
      // 媒体类型(（0: 图片, 1: 视频)
      media_type: data.data.result.media_type,
      // 视频地址
      headerFirstVideo: data.data.result.medias[0].url,
      // 视频封面图
      headerFirstCover: data.data.result.medias[0].cover
    });
  },
  //   点击图片调用微信查看图片
  previewImage: function(e) {
    let _this = this;
    let current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: _this.data.headerImgs
    });
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
