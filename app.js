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
    openid: null,
    unionid: null,
    result: null,
    // 城市id
    cityId: "",
    // 城市名称
    cityName: "全国"
  },
  // lazy loading openid
  getUserOpenId: function(callback) {
    var self = this;
    if (self.globalData.openid && self.globalData.unionid) {
      callback(null, self.globalData.openid);
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
              callback(null, self.globalData.openid);
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
        self.globalData.openid = data.data.result.user_info.openid;
        self.globalData.unionid = data.data.result.user_info.unionid;
        console.log("用户未注册");
        wx.setStorage({
          key: "openid",
          data: data.data.result.user_info.openid
        });
        wx.setStorage({
          key: "unionid",
          data: data.data.result.user_info.unionid
        });
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
        // self.globalData.result = res.data.result.user_info.result;
        console.log(res.data);
      }
    });
  }
});
