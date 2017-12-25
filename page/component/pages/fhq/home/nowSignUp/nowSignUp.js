Page({
  //   正式用
  data: {
    input_items: null,
    id: null,
    phoneNumber: null,
    subdata: {
      id: null,
      input_items: {
        base: [{}, {}, {}, {}],
        ext: [{}, {}, {}, {}]
      }
    },
    token_info: null
  },
  // 测试用
  //   data: {
  //     id: "82e5c447-9036-aecf-e670-e214c2836da8",
  //     phoneNumber: "36932651",
  //     input_items: {
  //       base: [
  //         {
  //           alias: "姓名",
  //           needed: 1,
  //           selected: true,
  //           key: "name",
  //           type: 0
  //         },
  //         {
  //           alias: "手机",
  //           needed: 1,
  //           selected: true,
  //           key: "mobile",
  //           type: 2
  //         },
  //         {
  //           alias: "公司",
  //           needed: 1,
  //           selected: true,
  //           key: "company",
  //           type: 0
  //         },
  //         {
  //           alias: "人数",
  //           needed: 1,
  //           selected: true,
  //           key: "counts",
  //           type: 1
  //         }
  //       ],
  //       ext: [
  //         {
  //           alias: "部门",
  //           needed: 0,
  //           selected: true,
  //           key: "depart",
  //           type: 0
  //         },
  //         {
  //           alias: "职位",
  //           needed: 0,
  //           selected: true,
  //           key: "job",
  //           type: 0
  //         },
  //         {
  //           alias: "行业",
  //           needed: 0,
  //           selected: true,
  //           key: "trade",
  //           type: 0
  //         },
  //         {
  //           alias: "学历",
  //           needed: 0,
  //           selected: true,
  //           key: "diploma",
  //           type: 0
  //         }
  //       ]
  //     },
  //     subdata: {
  //       id: null,
  //       input_items: {
  //         base: [{}, {}, {}, {}],
  //         ext: [{}, {}, {}, {}]
  //       }
  //     },
  //     token_info: null
  //   },
  //   正式用
  onLoad: function(options) {
    this.setData({
      input_items: JSON.parse(options.input_items),
      id: options.id,
      phoneNumber: options.phoneNumber,
      token_info: getApp().globalData.token_info
    });
  },
  bindKeyInput: function(e) {
    let index = e.target.dataset.index;
    if (e.target.dataset.typewarp == "base") {
      this.data.subdata.input_items.base[index].value = e.detail.value;
      this.data.subdata.input_items.base[index].key = e.target.dataset.key;
      this.data.subdata.input_items.base[index].alias = e.target.dataset.alias;
      this.data.subdata.input_items.base[index].type = e.target.dataset.type;
      this.data.subdata.input_items.base[index].needed =
        e.target.dataset.needed;
    } else if (e.target.dataset.typewarp == "ext") {
      this.data.subdata.input_items.ext[index].value = e.detail.value;
      this.data.subdata.input_items.ext[index].key = e.target.dataset.key;
      this.data.subdata.input_items.ext[index].alias = e.target.dataset.alias;
      this.data.subdata.input_items.ext[index].type = e.target.dataset.type;
      this.data.subdata.input_items.ext[index].needed = e.target.dataset.needed;
    }
    this.setData({
      subdata: {
        id: this.data.id,
        input_items: {
          base: this.data.subdata.input_items.base,
          ext: this.data.subdata.input_items.ext
        }
      }
    });
  },
  onSubmit() {
    let _this = this;
    let data = _this.data.subdata.input_items.base;
    // 判断object/json 是否为空，
    function isEmptyObject(obj) {
      for (var key in obj) {
        return false; //返回false，不为空对象
      }
      return true; //返回true，为空对象
    }
    //   验证
    for (let index = 0; index < data.length; index++) {
      // 为空
      if (isEmptyObject(data[index])) {
        wx.showModal({
          content: _this.data.input_items.base[index].alias + "不能为空！",
          showCancel: false
        });
        return false;
      } else if (data[index].value == "") {
        wx.showModal({
          content: _this.data.input_items.base[index].alias + "不能为空！",
          showCancel: false
        });
        return false;
      }
    }

    console.log("ok");
    console.log(this.data.token_info);
  }
});
