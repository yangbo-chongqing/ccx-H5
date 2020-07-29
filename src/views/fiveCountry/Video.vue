<template>
  <div id="Video">
    <MyHeader :title="'视频播放'" />
    <!-- 视频 -->
    <div class="videoBox">
      <video :src="video" controls></video>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { Toast } from "vant";
import { getNews } from "@/apis";
export default {
  name: "Video",
  data() {
    return {
      video: ""
    };
  },
  methods: {
    getNews() {
      getNews({
        url: "/information/getOne",
        data: {
          news_id: this.$route.query.id
        }
      }).then(msg => {
        if (~~msg.code === 0) {
          msg = msg.data[0].videos;
          this.video = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    }
  },
  components: {
    MyHeader,
    Toast
  },
  created() {
    this.getNews();
  }
};
</script>

<style scoped lang="stylus">
#Video {
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
    text-indent: 2em;
  }

  .videoBox {
    width: 100%;
    min-height: 100vh;
    padding-top: func(44);
    padding-bottom: func(44);
    box-sizing: border-box;
    position: relative;

    video {
      width: 100%;
      height: func(500);
    }
  }
}
</style>
