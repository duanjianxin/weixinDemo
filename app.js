const openIdUrl = require("./config").openIdUrl;
const apiUrl = require("./config").apiUrl;

App({
  onLaunch: function() {
    console.log("App Launch");
    this.getUserOpenId(this.onError);
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {
    hasLogin: false,
    unionid: null,
    result: null,
    // 城市id
    cityId: "",
    // 城市名称
    cityName: "全国",
    user_info: null,
    token_info: null
  },
  // lazy loading openid
  getUserOpenId: function(callback) {
    var self = this;
    if (self.globalData.unionid) {
      callback(null, self.globalData.unionid);
      console.log("已有unionid");
    } else {
      wx.login({
        success: function(data) {
          wx.request({
            url: openIdUrl,
            method: "POST",
            data: {
              code: data.code
            },
            success: function(res) {
              console.log("拉取openid成功", res);
              callback(null, self.globalData.unionid);
              self.fhqSetStorage(res);
            },
            fail: function(res) {
              console.log(
                "拉取用户openid失败，将无法正常使用开放接口等服务",
                res
              );
              callback(res);
            }
          });
        },
        fail: function(err) {
          console.log(
            "wx.login 接口调用失败，将无法正常使用开放接口等服务",
            err
          );
          callback(err);
        }
      });
    }
  },
  onError: function(msg) {
    // console.log(msg);
  },
  // 将openid保存到本地
  fhqSetStorage: function(data) {
    var self = this;
    // console.log(data);
    if (data.data.status_code % 100 == 0) {
      if (data.data.result.register == 0) {
        self.globalData.unionid = data.data.result.user_info.unionid;
        console.log("用户未注册");
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
        wx.getSetting({
          success(res) {
            if (!res.authSetting["scope.record"]) {
              wx.getUserInfo({
                lang: "zh_CN",
                scope: "scope.userInfo",
                success(res) {
                  console.log(res);
                  self.getAccessToken(
                    "/oAuth2/accessToken",
                    self.globalData.unionid,
                    {
                      userInfo: res.userInfo,
                      rawData: res.rawData,
                      signature: res.signature,
                      encryptedData: res.encryptedData,
                      iv: res.iv
                    }
                  );
                }
              });
            }
          }
        });
      } else {
        console.log("用户已经注册");
        console.log(data.data.result);
        self.globalData.token_info = data.data.result.token_info;
        //获取用户信息
        self.getUserinfo(
          "/user/userInfo",
          data.data.result.token_info.access_token
        );
      }
    } else {
      wx.showModal({
        content: "openid保存到本地失败",
        showCancel: false,
        confirmText: "确定"
      });
    }
  },
  //获取访问令牌接口
  getAccessToken(url, union_id, user_info) {
    let _this = this;
    wx.request({
      url: apiUrl + url,
      method: "POST",
      data: {
        union_id: union_id,
        user_info: user_info
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        if (res.data.status_code % 100 == 0) {
          _this.globalData.token_info = res.data.result;

          //获取用户信息
          _this.getUserinfo("/user/userInfo", res.data.result.access_token);
        }
      }
    });
  },
  // 获取用户信息
  getUserinfo(url, access_token) {
    let _this = this;
    wx.request({
      url: apiUrl + url,
      method: "GET",
      data: {
        id: ""
      },
      header: {
        "content-type": "application/json",
        Authorization: " Bearer " + access_token
      },
      success: function(res) {
        if (res.data.status_code % 100 == 0) {
          _this.globalData.user_info = res.data.result;
        }
      }
    });
  }
});
