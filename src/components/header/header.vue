<template>
  <div class="headerComponent" flex="main:justify cross:center">
    <div flex="cross:center">
      <img src="./images/zxzLogo.png" alt="">
      <div>
        <p class="Componenttitle">指学针</p>
        <p class="Componentdesc">让品质教育成就美好未来</p>
      </div>
    </div>
    <a class="Componentgo Medium" id="btnOpenAppCom" @click="goApp" flex="main:center cross:center">立即前往</a>
  </div>
</template>
<script type="text/ecmascript-6">
import { appLink } from "api/api";
export default {
  data() {
    return {
      weixin: this.$util.browser.versions.weixin,
      ios: this.$util.browser.versions.ios
    };
  },
  mounted() {
    if (this.ios && this.weixin) {
      var btn = document.querySelector("a#btnOpenAppCom");
      var options = [
        {
          mlink: appLink,
          button: btn
        }
      ];
      new Mlink(options);
    }
  },
  methods: {
    goApp() {
      if (this.ios && this.weixin) {
        document.querySelector("a#btnOpenAppCom").click();
      } else {
        window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.jlb.zhixuezhen.app";
      }
    }
  }
};
</script>
<style scoped lang="scss">
.headerComponent {
  position: fixed;
  background: #ffffff;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
  height: 0.5rem;
  width: 100%;
  top: 0;
  padding: 0 0.12rem;
  z-index: 9999;
  img {
    height: 0.34rem;
    width: 0.34rem;
    margin-right: 0.1rem;
  }
  .Componenttitle {
    font-family: PingFangSC-Medium;
    font-size: 0.14rem;
    color: #3e3e41;
  }
  .Componentdesc {
    font-family: PingFangSC-Regular;
    font-size: 0.1rem;
    color: #8e8e93;
  }
  .Componentgo {
    background: #ffffff;
    border: 1px solid #ffa42f;
    border-radius: 0.04rem;
    height: 0.28rem;
    width: 0.7rem;
    font-family: PingFangSC-Medium;
    font-size: 0.12rem;
    color: #ffa42f;
  }
}
</style>
