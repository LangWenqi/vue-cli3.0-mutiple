import {getWeixinTicket} from '@/api/apis/weChat'
import Vue from 'vue'
Vue.prototype.$weChat=function (obj={}) {
  const params = {
    url: encodeURIComponent(window.location.href)
  };
  getWeixinTicket(params).then(res => {
    wx.config({
      debug: false,
      appId: res.appId,
      timestamp: res.timestamp,
      nonceStr: res.nonceStr,
      signature: res.signature,
      jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "hideMenuItems"]
    });
    wx.ready(function() {
      wx.checkJsApi({
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "hideMenuItems"],
        success: function(res) {

        }
      });
      wx.hideMenuItems({
        menuList: ["menuItem:share:qq", "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      });
      //分享给朋友
      wx.onMenuShareAppMessage({
        title: obj.title,
        desc: obj.desc,
        link: obj.link?obj.link:location.href,
        imgUrl: obj.imgUrl,
        success: function() {

        },
        cancel: function(err) {}
      });
      // 分享到朋友圈
      wx.onMenuShareTimeline({
        title: obj.title,
        desc: obj.desc,
        link: obj.link?obj.link:location.href,
        imgUrl: obj.imgUrl,
        success: function() {

        }
      });
    });
  });
};
