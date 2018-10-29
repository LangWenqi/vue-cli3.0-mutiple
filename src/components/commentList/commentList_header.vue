<template>
  <div class="slide_area no-user-select">
    <ul class="reply_list">
      <li class="reply_item" v-for="(replyItem,replyIndex) in commentList" v-clickoutside="handleClose" :key="replyIndex" v-long-tap="{fun:blackShowFun,param:{index:index,replyIndex:replyIndex,userId:replyItem.sendUserId,ifTch:replyItem.sendIfTeacher}}">
        <div flex="main:justify cross:top" class="commentCtrl">
          <div flex="cross:top">
            <img :src="replyItem.sendUserPhotoUrl?replyItem.sendUserPhotoUrl:$util.getDefaultHeader(replyItem.sendUserId)" class="commentHeader" />
            <div>
              <div class="font12 userName" v-html="replyItem.sendUserName"></div>
              <div class="font10 commentTime" v-text="replyItem.createTime"></div>
            </div>
          </div>
          <div flex="cross:center">
            <img src="./images/conment.png" class="comment" v-if="replyItem.sendUserId !=userId && replyItem.sendUserId>0" @click.stop="replyComment(commentList[replyIndex].secId,commentList[replyIndex].appId,replyItem.sendUserId,'回复 '+replyItem.sendUserName+':')" />
            <div flex="cross:center" @click="clickZan(replyItem.tid,replyIndex)">
              <img src="./images/commentZan.png" class="zan" v-if="!replyItem.ifFocus" />
              <img src="./images/commentZan_sel.png" class="zan" v-if="replyItem.ifFocus" />
              <div class="focusNum font10" v-text="replyItem.focusNum"></div>
            </div>
          </div>
        </div>
        <div class="reply_wrapper" @click.stop="replyComment(commentList[replyIndex].secId,commentList[replyIndex].appId,replyItem.sendUserId,'回复 '+replyItem.sendUserName+':')">
          <span v-if="replyItem.replyUserId" class="reply_span">回复</span>
          <span v-if="type=='APP_HOMEWORK'&&!replyItem.replyUserId&&replyItem.sendIfTeacher==1 && text!='提问 '" class="comment_span" v-text="text"></span>
          <span v-if="type=='APP_HOMEWORK'&&!replyItem.replyUserId && text=='提问 '" class="comment_span" v-text="text"></span>
          <span v-if="replyItem.replyUserId" v-html="replyItem.replyUserName"></span>
          <span class="span" v-if="replyItem.replyUserId">:</span>
          <span class="reply_content" v-html="replyItem.content" v-if="replyItem.type!=2" flex-box="1" ref="copyValue"></span>
          <audio-player :url="replyItem.content" :time="replyItem.time" :audioId="replyItem.content" ref="audio" @closeAllAudio="closeAllAudio" v-if="replyItem.type==2"></audio-player>
          <div class="delWrapper" v-if="blackShow && blackIndex==index && blackReplyIndex==replyIndex" :style="{width:(replyItem.sendUserId == userId || (userId==classOwner?true:(($route.query.role !=1&&replyItem.sendIfTeacher==1)?true:false)))?0.97+'rem':0.4+'rem'}">
            <div class="delInner" flex="cross:center">
              <div flex-box="1" flex="main:center cross:center" class="copyBtn" @click.stop="copy(replyIndex)">复制
              </div>
              <div flex-box="0" class="white_line" v-if="replyItem.sendUserId == userId || (userId==classOwner?true:(($route.query.role !=1&&replyItem.sendIfTeacher==1)?true:false))"></div>
              <div flex-box="1" flex="main:center cross:center" class="copyBtn" v-if="replyItem.sendUserId == userId || (userId==classOwner?true:(($route.query.role !=1&&replyItem.sendIfTeacher==1)?true:false))" @click.stop="delComment(replyIndex,replyItem.tid)">删除
              </div>
            </div>
            <div class="triangle"></div>
          </div>
        </div>
      </li>
    </ul>
    <a v-if="ios" v-show="false" class="go Medium" id="btnOpenApp">立即前往</a>
  </div>
</template>

<script type="text/babel">
import API from "api/api.js";
import { appLink } from "api/api";
const api = new API();
// import audioPlayer from "../audioComponent/audioComponent.vue";
export default {
  data() {
    return {
      blackShow: false,
      userId: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")).userId : "",
      classOwner: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")).classOwner : "",
      commentList: [],
      weixin: this.$util.browser.versions.weixin,
      ios: this.$util.browser.versions.ios
    };
  },
  mounted() {
    if (this.ios && this.weixin) {
      var btn = document.querySelector("a#btnOpenApp");
      var options = [
        {
          mlink: appLink,
          button: btn
        }
      ];
      new Mlink(options);
    }
    this.commentList = this.commentObj.commentList;
    if (!this.weixin) {
      if (!this.userId) {
        this.$util.getToken().then(() => {
          api.getUserInfo().then(result => {
            if (result.code == 200) {
              this.userId = result.rs.userId;
            }
          });
        });
      }
    }
    this.dataReset();
  },
  /*computed: {
     commentList() {
     return this.commentObj.commentList
     },
     },*/
  components: {
    //audioPlayer
  },
  methods: {
    goApp() {
      if (this.ios && this.weixin) {
        document.querySelector("a#btnOpenApp").click();
      } else {
        window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.jlb.zhixuezhen.app";
      }
    },
    getUserInfo() {
      let param = {
        classId: this.classId
      };
      api.getUserInfo(param).then(res => {
        const { rs, code } = res;
        if (code == 200) {
          sessionStorage.setItem("userInfo", JSON.stringify(rs));
        }
      });
    },
    dataReset() {
      this.commentList.map(e => {
        if (!e.sendUserPhotoUrl || e.sendUserPhotoUrl === "") {
          e.sendUserPhotoUrl = this.$util.getDefaultHeader(e.sendUserId);
        }
        if (typeof e.createTime === "number") {
          e.createTime = this.$util.getDate(e.createTime);
        }
      });
    },
    closeAllAudio() {
      this.$refs.audio.forEach((el, elIndex) => {
        this.$refs.audio[elIndex].closeAudio();
      });
    },
    /*
       * @description: 关闭黑色弹框
       *
       * @update: cxy (2017-03-07)
       */
    handleClose() {
      this.blackShow = false;
    },
    /*
       * @description: 显示黑色弹框
       *
       * @update: cxy (2017-03-07)
       */
    blackShowFun(param) {
      if (this.weixin) {
        return;
      }
      this.blackReplyIndex = param.replyIndex;
      this.blackIndex = param.index;
      this.blackShow = true;
    },
    copy(index) {
      if (this.weixin) {
        return;
      }
      this.handleClose();
      this.$util.JsBridge(
        "copy",
        {
          copyValue: this.$refs.copyValue[index].innerHTML
        },
        res => {}
      );
    },
    delComment(replyIndex, tid) {
      if (this.weixin) {
        return;
      }
      this.handleClose();
      let param = {
        tid: tid
      };
      api.delComment(param).then(res => {
        if (res.code == 200) {
          this.$delete(this.commentList, replyIndex);
        }
      });
    },
    clickZan(tid, index) {
      if (this.weixin) {
        this.goApp();
        return;
      }
      let param = {
        focusType: 401,
        appId: tid
      };
      this.commentList[index].ifFocus
        ? api.cancelZan(param).then(res => {
            let { code } = res;
            if (code == 200) {
              this.commentList[index].ifFocus = false;
              this.commentList[index].focusNum--;
            }
          })
        : api.clickZan(param).then(res => {
            let { code } = res;
            if (code == 200) {
              this.commentList[index].ifFocus = true;
              this.commentList[index].focusNum++;
            }
          });
    },
    sonSetComment(res) {
      if (this.weixin) {
        return;
      }
      res.ifFocus = false;
      res.focusNum = 0;
      this.commentList.push(res);
      this.dataReset();
    },
    replyComment(secId, appId, userId, placeHolder) {
      if (this.weixin) {
        this.goApp();
      }
      /*const param = {
         type: 1,
         appId: '26',
         content: '2222',
         appCode: this.type,
         replyUserId: '1000066'
         }
         api.setCommentArticle(param).then((res) => {
         let {code, rs} = res;
         if (code == 200) {
         rs.ifFocus = false;
         rs.focusNum = 0;
         this.commentList.push(rs);
         this.dataReset()
         }
         })
         return*/
      if (userId != this.userId && userId > 0) {
        this.$util.JsBridge(
          "setComment",
          {
            placeHolder: placeHolder,
            limit: 500
          },
          result => {
            let data = {};
            if (result.content === "") {
              this.$toast("评论内容不能为空");
            } else {
              data.type = result.type;
              if (data.type == 2) {
                data.time = result.time;
              }
              data.content = this.$util.utf16toEntities(result.content);
              if (this.extends && this.extends.article === undefined) {
                const param = {
                  type: data.type,
                  appId: appId,
                  content: data.content,
                  appCode: this.type,
                  replyUserId: userId
                };
                if (result.type == 2) {
                  param.time = result.time;
                }
                api.setCommentArticle(param).then(res => {
                  let { code, rs } = res;
                  if (code == 200) {
                    rs.ifFocus = false;
                    rs.focusNum = 0;
                    this.commentList.push(rs);
                    this.dataReset();
                  }
                });
              } else {
                const param = {
                  classId: this.classId ? this.classId : this.$route.query.classId,
                  type: data.type,
                  appId: appId,
                  secId: secId,
                  content: data.content,
                  appCode: this.type,
                  replyUserId: userId
                };
                if (result.type == 2) {
                  param.time = result.time;
                }
                api.setComment(param).then(res => {
                  let { code, rs } = res;
                  if (code == 200) {
                    rs.ifFocus = false;
                    rs.focusNum = 0;
                    this.commentList.push(rs);
                    this.dataReset();
                  }
                });
              }
            }
          }
        );
      }
    }
  },
  props: ["commentObj", "index", "type", "classId", "text", "extends"]
};
</script>
<style scoped lang="scss">
.commentTitle {
  padding: 0.12rem;
  img {
    width: 0.1rem;
    margin-right: 0.06rem;
  }
}

.line {
  background: rgba(255, 255, 255, 0.2);
  height: 1px;
}

.comment {
  width: 0.16rem;
  height: 0.16rem;
  margin-right: 0.2rem;
}

.commentTime {
  margin-top: 0.03rem;
  font-size: 0.1rem;
  color: #8e8e93;
}

.focusNum {
  min-width: 0.1rem;
  text-align: right;
  font-size: 0.12rem;
  color: #515154;
  line-height: 0.14rem;
}

.zan {
  width: 0.16rem;
  height: 0.16rem;
  margin-right: 0.06rem;
}

.commentHeader {
  background: #d8d8d8;
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 100%;
  margin-right: 0.12rem;
}

.reply_item {
  position: relative;
  padding: 0.12rem 0.12rem 0.12rem 0;
  border-bottom: 0.5px solid #ececec;
  margin-left: 0.12rem;
}

.reply_wrapper {
  position: relative;
  margin-left: 0.44rem;
  .span {
    color: #3e3e41;
  }
  .reply_content {
    font-size: 0.12rem;
    color: #3e3e41;
    line-height: 0.17rem;
  }
}
.reply_wrapper span {
  font-size: 0.12rem;
  color: #3bb9ac;
}

.reply_wrapper .reply_span {
  color: #00001d;
  font-size: 0.12rem;
  opacity: 0.5;
}

.comment_span {
  color: #fff;
  font-size: 0.1rem;
  opacity: 0.5;
  margin: 0 0.04rem;
}

.reply_slide {
  padding-bottom: 0.25rem;
}

.reply_slide .span {
  font-size: 0.1rem;
  color: #fff;
  opacity: 0.5;
  margin-left: 0;
}

.reply_slide .slideIcon {
  width: 0.06rem;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  margin: 0.03rem;
}

.slideIconTop {
  width: 0.06rem;
  -webkit-transform: rotate(-90deg) !important;
  transform: rotate(-90deg) !important;
  margin: 0.03rem;
}

.delWrapper {
  height: 0.44rem;
  width: 0.97rem;
  position: absolute;
  top: -0.44rem;
  right: 0.12rem;
  z-index: 1;
}

.delWrapper .delInner {
  height: 0.34rem;
  width: 100%;
  background: #2b292a;
  border-radius: 0.06rem;
}

.delWrapper .delInner .copyBtn {
  height: 100%;
  color: #fff;
  font-size: 0.1rem;
}

.delWrapper .delInner .white_line {
  background: rgba(255, 255, 255, 0.3);
  width: 0.01rem;
  height: 0.24rem;
}

.delWrapper .triangle {
  margin: 0 auto;
  width: 0;
  height: 0;
  border-top: 0.1rem solid #2b292a;
  border-left: 0.08rem solid transparent;
  border-right: 0.08rem solid transparent;
}

.userName {
  font-size: 0.13rem;
  color: #3bb9ac;
  line-height: 0.13rem;
}
</style>
