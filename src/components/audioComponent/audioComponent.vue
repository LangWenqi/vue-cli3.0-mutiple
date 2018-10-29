<template>
  <div class="audioWrap" flex="cross:center" @click="play">
    <div class="blackBgWrapper">
      <div class="blackBg" :style="{'width':audioWidth+'%'}"></div>
    </div>
    <img :src="playingUrl" class="playBtn" v-if="playState"/>
    <img :src="playUrl" class="playBtn" v-if="!playState"/>
    <ul class="dianList" flex="main:center cross:center" flex-box="0">
      <li class="dianItem" flex="main:center cross:center" flex-box="0"></li>
      <li class="dianItem" flex="main:center cross:center" flex-box="0"></li>
      <li class="dianItem" flex="main:center cross:center" flex-box="0"></li>
      <li class="dianItem" flex="main:center cross:center" flex-box="0"></li>
      <li class="dianItem" flex="main:center cross:center" flex-box="0"></li>
      <li class="dianItem" flex="main:center cross:center" flex-box="0"></li>
      <li class="dianItem" flex="main:center cross:center" flex-box="0"></li>
      <li class="dianItem" flex="main:center cross:center" flex-box="0"></li>
      <li class="dianItem" flex="main:center cross:center" flex-box="0"></li>
      <li class="dianItem" flex="main:center cross:center" flex-box="0"></li>
    </ul>
    <div class="timeWrapper" flex="main:center cross:center" flex-box="0" v-text="seconds"
         v-if="!(playState&&audioWidth>0)"></div>
    <div class="timeWrapper" flex="main:center cross:center" flex-box="0" v-text="audioFormat"
         v-if="playState&&audioWidth>0"></div>
  </div>
</template>
<script type="text/babel">
  import {domain} from '../../api/api.js'
  export default{
    data(){
      return {
        playUrl: require('./images/audioStatrt.png'),
        playingUrl: require('./images/audioStop.gif'),
        audioTime: 0,
        audioFormat: '',
        playState: false,
        audioWidth: 0,
        clearId: ''
      }
    },
    mounted(){
      this.$util.jsBridgeCallBack('closeAudio', this.closeAudio);
      sessionStorage.setItem('audioId', '')
    },
    computed: {
      seconds() {
        return new Date(this.time * 1000).Time('m\'s\"')
      }
    },
    methods: {
      timeInterval(){
        this.intervalCallBack();
        this.clearId = setInterval(() => {
          this.intervalCallBack();
        }, 300)
      },
      intervalCallBack(){
        this.audioTime = parseInt(this.$util.audio.duration) - parseInt(this.$util.audio.currentTime);
        this.audioFormat = new Date(this.audioTime * 1000).Time('m\'s\"');
        this.audioWidth = 100 * parseInt(this.$util.audio.currentTime) / parseInt(this.$util.audio.duration);
      },
      play(){
        if (this.audioId === sessionStorage.getItem('audioId')) {
          this.closeAudio();
        } else {
          this.$emit('closeAllAudio');
          clearInterval(this.clearId);
          this.url = this.$util.handleImages(this.url,2);
          this.$util.audio.setAttribute('src', this.url);
          this.$util.audio.play();
          this.playState = true;
          sessionStorage.setItem('audioId', this.audioId);
          this.audioTime = this.time;
          this.timeInterval();
        }
        this.$util.audio.addEventListener('ended', () => {
          this.closeAudio();
        }, false);
      },
      closeAudio(){
        clearInterval(this.clearId);
        if (this.$util.audio.currentTime) {
          this.$util.audio.currentTime = 0;
        }
        this.$util.audio.pause();
        this.playState = false;
        this.audioWidth = 0;
        sessionStorage.setItem('audioId', '');
      }

    },
    props: ['url', 'time', 'audioId']
  }
</script>
<style scoped lang="scss">
  .audioWrap {
    position: relative;
    overflow: hidden;
    height: 0.3rem;
    background: #3BB9AC;
    border-radius: 0.06rem;
    display: inline-flex;
    .blackBgWrapper {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-left: 0.08rem;
      padding-right: 0.16rem;
      position: absolute;
    }
    .blackBg {
      height: 100%;
      width: 0;
    }
    .playBtn {
      height: 0.16rem;
      width: 0.24rem;
      position: relative;
      padding-left:0.08rem;
      z-index: 1;
    }
    .dianList {
      position: relative;
      z-index: 1;
      .dianItem {
        width: 0.03rem;
        font-size: 0.1rem;
        opacity: 0.4;
      }
    }
    .timeWrapper {
      height: 100%;
      padding: 0 0.08rem;
      border-radius: 0.74rem;
      font-family: PingFangSC-Regular;
      font-size: 0.12rem;
      color: #fff;
      position: relative;
      z-index: 1;
    }
  }
</style>
