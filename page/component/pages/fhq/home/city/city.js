const apiUrl = require("../../../../../../config").apiUrl;
Page({
  data: {
    city: "全国",
    cityList: [],
    shoufenqinName: "",
    shoufenqinBloo: "", //保存第二次点击的list的ID
    did: "", //保存第一次点击的list的ID，
    areasSelect: 0
  },
  onShow() {
    let _this = this;
    _this.getData(
      "/address/cities", {
        pid: 100,
        type: 1
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
      success: function (res) {
        if (res.data.status_code % 100 == 0) {
          success(res.data.result);
        }
      },
      fail: function (res) {
        fail(res);
      }
    });
  },
  success(data) {
    this.setData({
      cityList: data
    });
  },
  fail(data) {
    console.log(data);
  },
  //手风琴
  shoufenqin(e) {
    var listid = e.currentTarget.dataset.listid; //获取wxml当前点击的list标签上的自定义属性data-listid
    this.data.did = listid; //保留当前点击的list的ID号
    if (this.data.shoufenqinBloo == this.data.did) {
      //如果当前list已经展开（list两次点击了同一个list，list关闭）
      this.setData({
        shoufenqinName: 0, //返回一个所有list都不满足的ID号（那么所有的list都将关闭）
        shoufenqinBloo: "", //list已经关闭掉，所以记录点击的当前list就应该清空掉
        areasSelect: 0
      });
    } else {
      //第一次点击（list展开）
      this.setData({
        shoufenqinName: listid, //获取到点击list的id号（传到了wxml页面，当前list展开）
        shoufenqinBloo: listid, //list展开后返回当前点击的list的ID号
        areasSelect: 0
      });
    }
  },
  // 点击市
  clickAreas(e) {
    var areaskey = e.currentTarget.dataset.areaskey;
    this.setData({
      areasSelect: areaskey
    });
  },
  //   点击 确认按钮
  clickIsok(e) {


    var city_id = e.currentTarget.dataset.cityid;
    var city_name = e.currentTarget.dataset.cityname;
    var china = e.currentTarget.dataset.china;
    if (china) {
      getApp().globalData.cityId = city_id;
      getApp().globalData.cityName = city_name;
      wx.navigateBack();
    } else {
      if (this.data.areasSelect == 0) {
        wx.showModal({
          content: "您还未选择区",
          showCancel: false
        });
      } else {
        getApp().globalData.cityId = city_id;
        getApp().globalData.cityName = city_name;
        wx.navigateBack();
      }
    }
  }
});