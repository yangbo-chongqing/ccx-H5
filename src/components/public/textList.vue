<template>
  <div class="textList" @click="goNews(news.news_id)">
    <p class="one">
      <!-- <span v-show="!news.isNotice">「{{news.typeName | formatType}}」</span> -->
      {{ news.title }}
    </p>
    <!-- <p class="two">
            {{ news.introduction }}
    </p>-->
    <div class="two" v-html="news.introduction" />
    <div class="liSpan">
      <div>
        <img :src="userImg" alt />
        <span>{{ news.CreateName }}</span>
      </div>
      <div>
        <img :src="address" />
        <span>{{ news.areaName}}</span>
      </div>
      <div>
        <img :src="timeImg" alt />
        <span>{{news.create_date | formatTime}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goNews(news_id) {
      this.switchPage({
        pageRouter: "/NewsDetails.html",
        params: {
          news_id
        }
      });
    }
  },
  data() {
    return {
      address: baseImgUrl + "locate.png",
      userImg: baseImgUrl + "tab_more_select.png",
      timeImg: baseImgUrl + "ic_time.png"
    };
  },
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  filters: {
    formatTime(date) {
      let index = date.lastIndexOf(" "); //截取空格前的年月日  不要具体的时间
      return date.substring(0, index);
    },
    formatType(type) {
      if (type === "党务公开") {
        return "党务";
      } else if (type === "村务公开") {
        return "村务";
      } else {
        return "政务";
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.textList {
  width: 100%;
  padding: func(16) func(15) func(15) func(21);
  box-sizing: border-box;
  border-bottom: func(1) solid #e3e3e3;
  background: #ffffff;

  .one {
    font-size: func(14);
    color: rgb(68, 68, 68);
    nLine();

    span {
      color: #d33333;
    }
  }
}

.two {
  nLine(3);
  margin-top: func(16);
  color: #8A8A8A;
  font-size: func(14);
}

.liSpan {
  display: flex;
  justify-content: space-between;
  margin-top: func(16);

  div {
    display: flex;
    align-items: center;

    img {
      width: func(12);
      height: func(12);
      margin-right: func(8);
    }
  }
}
</style>
