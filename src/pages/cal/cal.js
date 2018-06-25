// pages/cal/cal.js

const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isExecute: false,
    show: '0',
    rows: [{
        row: [
          { bgClass: 'orange', text: '退格', data: 'back' },
          { bgClass: 'orange', text: '清屏', data: 'clear' },
          { bgClass: 'orange', text: '+/-', data: 'negative' },
          { bgClass: 'orange', text: '+', data: '+' },
        ]
      }, {
        row: [
          { bgClass: 'blue', text: '9', data: '9' },
          { bgClass: 'blue', text: '8', data: '8' },
          { bgClass: 'blue', text: '7', data: '7'},
          { bgClass: 'orange', text: '-', data: '-' },
        ]
      }, {
        row: [
          { bgClass: 'blue', text: '6', data: '6' },
          { bgClass: 'blue', text: '5', data: '5' },
          { bgClass: 'blue', text: '4', data: '4' },
          { bgClass: 'orange', text: '*', data: '*' },
        ]
      }, {
        row: [
          { bgClass: 'blue', text: '3', data: '3' },
          { bgClass: 'blue', text: '2', data: '2' },
          { bgClass: 'blue', text: '1', data: '1' },
          { bgClass: 'orange', text: '/', data: '/' },
        ]
      }, {
        row: [
          { bgClass: 'blue', text: '0', data: '0' },
          { bgClass: 'blue', text: '.', data: '.' },
          { bgClass: 'blue', text: '历史', data: 'history' },
          { bgClass: 'orange', text: '=', data: '=' },
        ]
      }  
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  onItemTap: function(e) {
    var id = e.target.dataset.id;
    var curShow = String(this.data.show);

    if (id === 'back') {
      if (curShow.length > 1) {
        this.setData({ show: curShow.substr(0, curShow.length - 1)});
      } else {
        this.setData({ show: '0' });  
      }
    } else if (id === 'clear') {
      this.setData({ show: '0' });
    } else if (id === 'negative') {
      if (curShow[0] === '-') {
        this.setData({ show: curShow.substr(1) });
      } else if (curShow[0] !== '0') {
        this.setData({ show: '-' + curShow });
      }
    } else if (id === 'history') {
      wx.navigateTo({
        url: '../his/his',
      })
    } else if (id === '=') {
      if (this.data.isExecute) {
        console.log('is execute...')
        return;
      }

      if (!isNaN(curShow)) {
        return;
      }

      this.setData({ isExecute: true });
      const self = this;
      util.evaluateExpression(curShow, function(data) {
        self.setData({ isExecute: false });
        if (!isNaN(data)) {
          self.setData({ show: data });
          var his = wx.getStorageSync('his') || [];
          his.push(curShow + '=' + data);
          wx.setStorageSync('his', his);
        }
      });
    } else {
      if (this.data.show === '0' && '+-*/.'.indexOf(id) >= 0) {
        return;
      }

      var last = curShow[curShow.length - 1];
      if (curShow === '0' || 
          ('+-*/.'.indexOf(id) >= 0 && '+-*/.'.indexOf(last) >= 0)) {
        curShow = curShow.substr(0, curShow.length - 1);
      }

      this.setData({ show: curShow + id });
    }
  }
})
