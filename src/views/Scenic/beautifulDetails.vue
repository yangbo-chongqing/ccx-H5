<template>
  <div id="beautifulDetails">
    <MyHeader :title="'最美乡村介绍详情'" />
    <!-- 内容 -->
    <div class="details-top">
      <p class="details-title">{{news.title}}</p>
      <div class="details-user">
        <div>
          <div class="details-user-name">
            <div>{{news.CreateName}}</div>
            <div class="details-user-time">{{news.create_date}}</div>
          </div>
        </div>
        <div>
          <span>{{news.read_count}}</span>次浏览
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div v-html="content" class="content">{{content}}</div>
    <!-- 多媒体 -->
    <div class="media">
      <div class="video" @click="showBox">
        <i class="iconfont">&#xe60a;</i>景区视频
      </div>
      <div class="hr"></div>
      <div class="audio" @click="showAudio">
        <i class="iconfont">&#xe62b;</i>语音讲解
      </div>
    </div>
    <!-- 视频 -->
    <div class="videoBox" v-if="isVideo">
      <video controls id="videoPlay" preload="auto">
        <source :src="news.videos" type="video/mp4" />
      </video>
    </div>
    <!-- 音频 -->
    <div class="audioBox">
      <audio id="showAudio" :src="news.voice" />
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { Toast } from "vant";
import { getBeautiful } from "../../apis";
export default {
  name: "beautifulDetails",
  data() {
    return {
      news_id: "",
      news: [],
      content: "<h>你好</h>",
      isVideo: false,
      isAudio: false
    };
  },
  methods: {
    getBeautiful() {
      getBeautiful({
        url: "/information/getOne",
        data: {
          news_id: this.news_id
        }
      }).then(msg => {
        if (~~msg.code === 0 && ~~msg.status === 200) {
          msg = msg.data[0];
          this.news = msg;
          this.content = msg.content;
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },
    showBox() {
      if (this.news.videos.length > 0) {
        // var vdo = document.getElementById("videoPlay");
        this.isVideo = true;
        // vdo.play();
      } else {
        Toast("暂无视频");
      }
    },
    hideBox() {
      this.isVideo = false;
    },
    showAudio() {
      if (this.isAudio == false) {
        if (this.news.voice.length > 0) {
          var vdo = document.getElementById("showAudio");
          this.isAudio = true;
          vdo.play();
          Toast("语音已播放");
        } else {
          Toast("暂无语音");
        }
      } else {
        var vdo = document.getElementById("showAudio");
        vdo.pause();
        this.isAudio = false;
        Toast("语音已暂停");
      }
    }
  },
  components: {
    MyHeader,
    Toast
  },
  created() {
    this.news_id = this.$route.query.id;
    this.getBeautiful();
  }
};
</script>

<style scoped lang="stylus">
#beautifulDetails {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .details-top {
    margin: 0rem 0.6rem 0.4rem 0.6rem;

    .details-title {
      font-family: PingFang SC;
      font-size: 0.64rem;
      color: #000;
      font-weight: bold;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }

  .details-user {
    margin-top: 0.6rem;

    .details-user-name {
      display: inline-block;
      margin-left: 0.5rem;

      >div:first-child {
        font-size: 0.6rem;
        color: #000;
        margin-bottom: 0.3rem;
      }

      .details-user-time {
        font-size: 0.4rem;
        color: #999;
      }
    }

    >div:first-child, >div:last-child {
      display: inline-block;
    }

    >div:last-child {
      float: right;
      color: #999;
      font-size: 0.4rem;

      >span {
        color: #d33333;
      }
    }
  }

  .line {
    width: 85%;
    height: 1px;
    margin: auto;
    background: #f5f5f5;
    padding: 0 0.6rem;
  }

  .content {
    padding: 0.5rem 0.6rem 0 0.6rem;
    // 首行缩进 text-indent: 2em;
  }

  /* 多媒体 */
  .media {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2rem;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e7e7e7;
    background-color: #fff;

    .video>i {
      font-size: 0.6rem;
    }

    .audio>i {
      font-size: 0.8rem;
    }

    .hr {
      width: 1px;
      height: 70%;
      background-color: #e7e7e7;
    }
  }

  .media .video, .audio {
    width: 50%;
    text-align: center;
    color: #6CB127;
    font-size: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 视频 */
  .videoBox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 90000;

    video {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 99999;
    }
  }
}
</style>
