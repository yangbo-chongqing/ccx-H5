<template>
  <div class="NewsList" @click="goNews(news.news_id)">
    <img :src="news.showImg | formatImg" @error="imgError" />
    <div class="info">
      <h6>
        <!-- <span v-show="!news.isNotice">「{{news.typeName | formatType}}」</span> -->
        {{ news.title }}
      </h6>
      <p>
        <img :src="'locate.png' | formatUserImg" alt />
        <span>{{ news.areaName }}</span>
      </p>
      <p>
        <span>
          <img :src="'tab_more_select.png' | formatUserImg" alt />
          <span>{{ news.CreateName }}</span>
        </span>
        <span>
          <img :src="'ic_time.png' | formatUserImg" alt />
          <span>{{news.create_date | formatTime}}</span>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsList",
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  methods: {
    //去新闻页面
    goNews(news_id) {
      this.switchPage({
        pageRouter: "/NewsDetails.html",
        params: {
          news_id
        }
      });
    }
  },
  created() {
    console.log(this.news);
  },
  filters: {
    formatTime(date) {
      let index = date.lastIndexOf(" "); //截取空格前的年月日  不要具体的时间
      return date.substring(0, index);
    },
    formatType(type) {
      if (type === "党务公开" || type === "党务") {
        return "党务";
      } else if (type === "村务公开" || type === "村务") {
        return "村务";
      } else {
        return "政务";
      }
    },
    formatUserImg(img) {
      return baseImgUrl + img;
    },
    formatImg(pic) {
      if (!pic) {
        return require("../../assets/img/noImg.png"); //如果后台提供的图片地址为null，使用默认图片
      } else {
        return pic;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.NewsList {
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  height: func(120);
  padding: func(26) func(15) func(31.5) func(15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: func(1) solid #e3e3e3;

  img {
    width: func(110);
    height: func(82.5);
    border-right: func(5);
  }

  .info {
    width: func(223);
    height: func(82.5);

    h6 {
      width: 100%;
      height: func(38);
      line-height: func(19);
      font-size: func(14);
      nLine();
      font-weight: 400;

      span {
        color: #d33333;
      }
    }

    p {
      margin-top: func(10);
      height: func(12);
      display: flex;
      margin-right: func(8);
      align-items: center;

      img {
        width: func(12);
        height: func(12);
        margin-right: func(8);
      }

      span {
        font-size: func(12);
        color: #8A8A8A;
      }

      &:last-of-type {
        justify-content: space-between;

        span {
          display: flex;
          align-items: center;
          color: #8A8A8A;
        }
      }
    }
  }
}
</style>
