<template>
    <div class="monitorComponent">
        <div class="videoPage">
            <div class="videoPage_main">
                <div class="videoBox video-js">
                    <video-player
                    :options="playerOptions"
                    :playsinline="true"
                    ref="videoPlayer"
                    class="video-player-box"
                    @play="onPlayerPlay($event)"></video-player>
                </div>
            </div>
            <!-- <a class='flashA' v-if='showMark===2' href="http://www.adobe.com/go/getflashplayer"  rel="nofollow" target="_blank" title="升级Flash插件">
                <img src="https://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="">
            </a> -->
        </div>
    </div>
</template>
<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
import SWF_URL from 'videojs-swf/dist/video-js.swf'
import 'videojs-contrib-hls'
window.videojs = videojs
require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
videojs.options.flash.swf = SWF_URL


export default {
    name: 'monitorComponent',
    components: {
        videoPlayer
    },
    props: ['videoUrl'],
    data: function () {
        let _this = this
        return {
        showMark: 2,
        // videoAdress: '',
        playerOptions: {
            // videojs options
            muted: true,
            controls: true,
            language: 'en',
            autoplay: true,
            preload: 'auto',
            fluid: true,
            aspectRatio: '16:9',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            poster: '', // /static/images/test/bg.png
            sources: [{
                type: '', // rtmp/mp4 application/x-mpegURL m3u8
                // src: _this.videoAdress,
                src:'http://125.76.229.199:83/pag/125.76.229.199/7302/006927/0/MAIN/TCP/live.m3u8',
                withCredentials: false
            }],
            techOrder: ['html5', 'flash'],
            html5: {
                hls: {
                    withCredentials: true
                }
            },
            flash: {
                hls: {
                    withCredentials: false
                },
                swf: SWF_URL
            },
            controlBar: {
                timeDivider: false, // 当前时间和持续时间的分隔符
                durationDisplay: false, // 显示持续时间
                remainingTimeDisplay: false, // 是否显示剩余时间功能
                fullscreenToggle: true // 全屏按钮
            }
        }
        }
    },
    watch: {
      // videoAdress (value) {
      //   this.playerOptions.sources[0].src = value
      // }
    },
    created () {
        // this.getVideoAdress()
        this.getFlash()
    },
    methods: {
        onPlayerPlay (player) {
            const myPlayer = this.$refs.videoPlayer.player
            myPlayer.play()
        },
        getFlash () {
            if (window.navigator && window.navigator.plugins.length > 0) {
                if (window.navigator.plugins['Shockwave Flash']) {
                  this.showMark = 1
                } else {
                  this.showMark = 2
                }
            }
        },
        // 获取视频地址
        getVideoAdress () {
            // vedioAdress().then(res => {
            //   this.videoAdress = res.data[0].videoStreamAddress
            // }).catch(err => {
            //   this.handleErrorFun(err)
            // })
            this.videoAdress = this.videoUrl.adress
            this.poster = this.videoUrl.pic
        }
    }
    
}
</script>
<style lang="stylus" scoped>
.videoPage{
  width:100%;
  height: 100%;
  position: relative;
  .flashA{
    display:block;
    display:inline-block;
    position: absolute;
    top:50%;
    left:50%;
    z-index:1000;
    transform:translate(-50%, -50%);
  }
  .vjs-error .vjs-error-display:before{
    content: ''
  }
  .videoPage_main{
    height:100%;
    .videoBox{
      margin:0 auto;
      width:100%;
      height:100%;
      .video-player-box{
        width:100%;
        height: 100%;
        position: relative;
        #vjs_video_3{
          width:100%;
          height: 100%;
        }
        .vjs_video_3-dimensions.vjs-fluid{
          padding-top:0;
          width:100%;
          height: 100%;
        }
        .vjs-text-track-display{
          height:100%!important;
        }
        .vjs-big-play-button {
          //display:none;
          top:50%;
          left:50%;
          transform:translate(-50%, -50%);
        }
        // .vjs-modal-dialog-content{
        //   // display:none;
        // }
        .vjs-control-bar{
          bottom:40px!important;
          left:0;
        }
        .video-js.vjs-16-9, .video-js.vjs-4-3 {
          width: 100%!important;
          height:100%!important;
        }
        .video-js .vjs-tech{
          width:100%;
          height:100%;
        }
      }
    }
  }
}
</style>