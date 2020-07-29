<template>
  <div class="VideoList" @click="goDetails(video.news_id)">
    <div class="img">
      <img :src="video.people_pic" alt class="cover" />
      <img src="../../assets/img/CollectiveDetails/play.png" class="play" />
    </div>
    <div class="info">
      <p class="one">{{ video.title }}</p>
      <div>
        <span>
          <i class="iconfont">&#xe61b;</i>
          <span>{{ video.comment_num }}</span>
          条
        </span>
        <span>
          <i class="iconfont">&#xe606;</i>
          <span>{{ video.read_count }}</span>
          条
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoList",
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  methods: {
    //去详情页
    goDetails(news_id) {
      this.switchPage({
        pageRouter: "/esVideoDetails.html",
        params: { news_id }
      });
    }
  },
  components: {},
  created() {},
  mounted() {},
  filters: {},
  computed: {},
  watch: {}
};
</script>

<style scoped lang="stylus">
.VideoList {
  width: 100%;
  height: func(263);

  > .img {
    width: 100%;
    height: func(211);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    > .cover {
      max-width: 100%;
      max-height: 100%;
    }

    > .play {
      position: absolute;
      width: 50px;
      height: 50px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  > .info {
    width: 100%;
    height: func(52);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 func(15);

    > p {
      width: func(224);
      font-size: func(16);
    }

    > div {
      > span {
        color: #c4c4c4;

        > i {
          color: #6CB127;
        }

        >span {
          color: #D33333;
        }
      }
    }
  }
}

.VideoList > .info > div > span > i {
  color: #16DFA9;
  margin-right: func(5);
}
</style>
