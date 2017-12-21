const apiUrl = require("../../../../config").apiUrl;
Page({
  data: {
    // banner数据
    bannerImgUrls: [],
    bannerImgUrls2: [],
    bannerImgUrls3: [],
    pageScroll: null,
    pageScroll2: null,
    pageScroll3: null,
    // banner是否显示
    isbannerImgUrls: false,
    isbannerImgUrls2: false,
    isbannerImgUrls3: false,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 1,
    // 列表数据 场地 2动态  3预告
    listFieldData: [],
    listFieldData2: [],
    listFieldData3: [],
    // 数据是否到底
    listFieldDataTheEnd: false,
    listFieldDataTheEnd2: false,
    listFieldDataTheEnd3: false,
    // 微信查看相片
    previewImage: [],
    previewImage2: [],
    previewImage3: [],
    // 城市id
    cityId: "",
    // 最后一条数据id
    listLastId: "",
    listLastId2: "",
    listLastId3: "",
    // 城市名称
    cityName: "",
    area_id: "",
    // 获取动态列表 分类（ 0:所有, 1: 场地； 2:动态）
    listPage: 1,
    listPage2: 2,
    // 分享
    shareDataTitle: "分享demo",
    shareDataDesc: "分享demo",
    shareDataPath: "http://www.baidu.com"
  },
  //   分享
  onShareAppMessage: function() {
    return {
      title: this.data.shareDataTitle,
      desc: this.data.shareDataDesc,
      path: this.data.shareDataPath
    };
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    wx.showToast({
      title: "加载中...",
      icon: "loading"
    });
    console.log("下拉刷新");
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    });
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    });
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    });
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    });
  },
  onLoad: function() {
    var that = this;
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  // 页面显示
  onShow() {
    if (this.data.cityId != getApp().globalData.cityId) {
      this.setData({
        // 列表数据 场地
        listFieldData: [],
        // 列表数据 动态
        listFieldData2: [],
        // 列表数据 预告
        listFieldData3: [],
        // 数据是否到底
        listFieldDataTheEnd: false,
        listFieldDataTheEnd2: false,
        listFieldDataTheEnd3: false,
        // 微信查看相片
        previewImage: [],
        previewImage2: [],
        previewImage3: [],
        // 最后一条数据id
        listLastId: "",
        listLastId2: "",
        listLastId3: ""
      });
    }
    // // 获取城市id
    // this.getStorageCity();
    // console.log(getApp().globalData.cityId, this.data.listPage);
    this.setData({
      cityName: getApp().globalData.cityName,
      cityId: getApp().globalData.cityId, // 最后一条数据id
      listLastId: "", // 最后一条数据id
      listLastId2: "",
      // 最后一条数据id
      listLastId3: ""
    });
    console.log(this.data.cityName);

    if (this.data.currentTab == 1) {
      if (
        this.data.listFieldData == "" &&
        this.data.listFieldDataTheEnd === false
      ) {
        // 获取banner场地
        this.getBanner(1);
        // 获取列表
        this.getListData(
          this.data.cityId,
          this.data.listPage,
          this.data.listLastId
        );
      }
    } else if (this.data.currentTab == 2) {
      if (
        this.data.listFieldData2 == "" &&
        this.data.listFieldDataTheEnd2 === false
      ) {
        // // 获取banner场地
        this.getBanner(2);
        this.getListData2(
          this.data.cityId,
          this.data.listPage2,
          this.data.listLastId2
        );
      }
    } else if (this.data.currentTab == 3) {
      if (
        this.data.listFieldData3 == "" &&
        this.data.listFieldDataTheEnd3 === false
      ) {
        // 获取列表
        this.getListData3(this.data.cityId, this.data.listLastId3);
      }
    }
  },
  // 页面隐藏
  onHide() {
    this.setData({
      // // 列表数据 场地
      // listFieldData: [],
      // // 列表数据 动态
      // listFieldData2: [],
      // // 列表数据 预告
      // listFieldData3: [],
      // 数据是否到底
      // listFieldDataTheEnd: false,
      // listFieldDataTheEnd2: false,
      // listFieldDataTheEnd3: false,
      // 微信查看相片
      previewImage: [],
      previewImage2: [],
      previewImage3: []
      // // 最后一条数据id
      // listLastId: "",
      // listLastId2: "",
      // listLastId3: ""
    });
  },
  /**
   * 点击tab切换
   */
  swichNav: function(e) {
    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
      if (e.target.dataset.current == 1) {
        // // 获取列表
        // that.getListData(this.data.cityId, this.data.listPage);
        // that.setData({
        //   listFieldData: [],
        //   listFieldData2: [],
        //   listFieldData3: [],
        //   previewImage2: [],
        //   previewImage3: [],
        //   // 最后一条数据id
        //   listLastId: "",
        //   listLastId2: "",
        //   // 最后一条数据id
        //   listLastId3: "",
        //   listFieldDataTheEnd2: false
        // });

        if (
          this.data.listFieldData == "" &&
          this.data.listFieldDataTheEnd === false
        ) {
          // 获取banner场地
          this.getBanner(1);
          // 获取列表
          that.getListData(
            that.data.cityId,
            that.data.listPage,
            that.data.listLastId
          );
        }
      }
      if (e.target.dataset.current == 2) {
        // that.setData({
        //   listFieldData: [],
        //   listFieldData2: [],
        //   listFieldData3: [],
        //   previewImage2: [],
        //   previewImage3: [],
        //   listFieldDataTheEnd: false,
        //   // 最后一条数据id
        //   listLastId: "",
        //   listLastId2: "",
        //   // 最后一条数据id
        //   listLastId3: ""
        // });
        // // 获取列表
        // that.getListData2(that.data.cityId, that.data.listPage2);
        // // 获取banner场地
        // that.getBanner2(2);
        console.log(this.data.listFieldData2);
        console.log("|||||||||||");
        console.log(this.data.listFieldDataTheEnd2);
        if (
          this.data.listFieldData2 == "" &&
          this.data.listFieldDataTheEnd2 === false
        ) {
          that.getBanner2(2);
          // 获取列表
          that.getListData2(
            that.data.cityId,
            that.data.listPage2,
            that.data.listLastId2
          );
        }
      }
      if (e.target.dataset.current == 3) {
        // that.setData({
        //   listFieldData: [],
        //   listFieldData2: [],
        //   listFieldData3: [],
        //   previewImage: [],
        //   previewImage2: [],
        //   previewImage3: [],
        //   listFieldDataTheEnd: false,
        //   // 最后一条数据id
        //   listLastId: "",
        //   listLastId2: "",
        //   // 最后一条数据id
        //   listLastId3: ""
        // });
        // // 获取列表
        // that.getListData3({
        //   id: that.data.listLastId3,
        //   area_id: that.data.cityId
        // });
        // // 获取banner场地
        // that.getBanner3(3);
        if (
          this.data.listFieldData3 == "" &&
          this.data.listFieldDataTheEnd3 === false
        ) {
          // 获取列表
          that.getListData3(that.data.cityId, that.data.listLastId3);
        }
      }
    }
  },
  getListData(cityid, type, listLastId) {
    let _this = this;

    function getId(data) {
      if (data.length > 0) {
        return data[data.length - 1].id;
      } else {
        return "";
      }
    }
    console.log(_this.data.listFieldData, listLastId);
    wx.request({
      url: apiUrl + "/record/list",
      data: {
        area_id: cityid,
        type: type,
        id: listLastId
      },
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res) {
        if (
          res.data.status_code % 100 == 0 &&
          res.data.result.length != 0 &&
          _this.data.listFieldDataTheEnd === false
        ) {
          _this.setData(
            {
              listFieldData: _this.data.listFieldData.concat(res.data.result),
              listLastId: getId(res.data.result)
            },
            function() {
              console.log(_this.data.listFieldData);
            }
          );
        } else {
          _this.setData({
            listFieldDataTheEnd: true
          });
        }
      }
    });
  },
  getListData2(cityid, type, listLastId2) {
    let _this = this;
    function getId(data) {
      if (data.length > 0) {
        return data[data.length - 1].id;
      } else {
        return "";
      }
    }
    wx.request({
      url: apiUrl + "/record/list",
      data: {
        area_id: cityid,
        type: type,
        id: listLastId2
      },
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res) {
        console.log(_this.data.listLastId2 + "======" + getId(res.data.result));
        if (
          res.data.status_code % 100 == 0 &&
          res.data.result.length != 0 &&
          _this.data.listFieldDataTheEnd2 === false
        ) {
          _this.setData({
            listFieldData2: _this.data.listFieldData2.concat(res.data.result),
            listLastId2: getId(res.data.result)
          });
        } else {
          _this.setData({
            listFieldDataTheEnd2: true
          });
        }
      }
    });
  },
  getListData3(cityid, listLastId3) {
    let _this = this;

    function getId(data) {
      if (data.length > 0) {
        return data[data.length - 1].id;
      } else {
        return "";
      }
    }
    wx.request({
      url: apiUrl + "/prevue/list",
      data: {
        area_id: cityid,
        id: listLastId3
      },
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res) {
        console.log(res);
        if (
          res.data.status_code % 100 == 0 &&
          res.data.result.length != 0 &&
          _this.data.listFieldDataTheEnd3 === false
        ) {
          _this.setData({
            listFieldData3: _this.data.listFieldData3.concat(res.data.result),
            listLastId3: getId(res.data.result)
          });
        } else {
          _this.setData({
            listFieldDataTheEnd3: true
          });
        }
      }
    });
  },
  //   获取banner图片
  getBanner(datas) {
    let _this = this;
    wx.request({
      url: apiUrl + "/record/banners",
      data: {
        type: datas
      },
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res) {
        if (res.data.status_code % 100 == 0 && res.data.result.length > 0) {
          _this.setData({
            bannerImgUrls: res.data.result,
            isbannerImgUrls: true
          });
        } else {
          _this.setData({
            isbannerImgUrls: false
          });
        }
      }
    });
  },
  //   获取banner图片
  getBanner2(datas) {
    let _this = this;
    wx.request({
      url: apiUrl + "/record/banners",
      data: {
        type: datas
      },
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res) {
        if (res.data.status_code % 100 == 0 && res.data.result.length > 0) {
          _this.setData({
            bannerImgUrls2: res.data.result,
            isbannerImgUrls2: true
          });
        } else {
          _this.setData({
            isbannerImgUrls2: false
          });
        }
      }
    });
  },
  //   获取banner图片
  getBanner3(datas) {
    let _this = this;
    wx.request({
      url: apiUrl + "/record/banners",
      data: {
        type: datas
      },
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res) {
        if (res.data.status_code % 100 == 0 && res.data.result.length > 0) {
          _this.setData({
            bannerImgUrls3: res.data.result,
            isbannerImgUrls3: true
          });
        } else {
          _this.setData({
            isbannerImgUrls3: false
          });
        }
      }
    });
  },
  // 点击图片调用微信查看图片
  previewImage: function(e, index) {
    let _this = this;
    var current = e.target.dataset.src;
    let fatherIndex = e.target.dataset.index;
    if (this.data.currentTab == "1") {
      let medias = this.data.listFieldData[fatherIndex].medias;
      let forMedias = [];
      for (let index = 0; index < medias.length; index++) {
        forMedias.push(medias[index].url);
      }
      this.setData(
        {
          previewImage: forMedias
        },
        function() {
          wx.previewImage({
            current: current,
            urls: forMedias
          });
        }
      );
    } else if (this.data.currentTab == "2") {
      let medias = this.data.listFieldData2[fatherIndex].medias;
      let forMedias = [];
      for (let index = 0; index < medias.length; index++) {
        forMedias.push(medias[index].url);
      }
      this.setData(
        {
          previewImage2: forMedias
        },
        function() {
          wx.previewImage({
            current: current,
            urls: forMedias
          });
        }
      );
    }
  },
  // 滚动到底部了
  onPageScroll: function(res) {
    // Do something when page scroll
    if (this.data.currentTab == 1 && res.scrollTop < 1000) {
      this.setData({
        pageScroll: res.scrollTop
      });
    } else if (this.data.currentTab == 2 && res.scrollTop < 1000) {
      this.setData({
        pageScroll2: res.scrollTop
      });
    } else if (this.data.currentTab == 3 && res.scrollTop < 1000) {
      this.setData({
        pageScroll3: res.scrollTop
      });
    }
  },
  onReachBottom() {
    console.log("滚动到底部了");
    if (this.data.currentTab == 1 && this.data.pageScroll > 700) {
      if (!this.data.listFieldDataTheEnd) {
        // 获取场地列表;
        this.getListData(
          this.data.cityId,
          this.data.listPage,
          this.data.listLastId
        );
      }
    } else if (this.data.currentTab == 2 && this.data.pageScroll2 > 700) {
      if (this.data.listFieldDataTheEnd2 === false) {
        this.getListData2(
          this.data.cityId,
          this.data.listPage2,
          this.data.listLastId2
        );
      }
    } else if (this.data.currentTab == 3 && this.data.pageScroll3 > 700) {
      if (!this.data.listFieldDataTheEnd3) {
        this.getListData3(this.data.cityId, this.data.listLastId3);
      }
    }
  },

  // 播放视频
  playVideo() {
    console.log("视频播放了");
  },
  // 跳转到孵化器主页
  goToHomePage(e) {
    wx.navigateTo({
      url:
        "./home/homePage/homePage?id=" +
        e.currentTarget.dataset.id +
        "&name=" +
        e.currentTarget.dataset.name,
      // 接口调用成功的回调方法
      fuccess: function() {},
      // 接口调用失败的回调方法
      fail: function() {},
      // 接口调用无论成功或者失败的回调方法
      complete: function() {}
    });
    // console.log(e.currentTarget.dataset);
  }
});
