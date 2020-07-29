<template>
  <div class="manual">
    <MyHeader :title="'工作手册'" />
    <Lines />
    <div class="NewsList" @click="goNews(item.news_id)" v-for="(item,index) in list" :key="index">
      <img :src="item.showImg| formatImg" />
      <div class="info">
        <h6>{{ item.title }}</h6>
        <p>
          <img src="http://www.mlxc365.com/images/sxccx/icon/locate.png" alt />
          <span>{{ item.areaName }}</span>
        </p>
        <p>
          <span>
            <img src="http://www.mlxc365.com/images/sxccx/icon/tab_more_select.png" alt />
            <span>{{ item.CreateName }}</span>
          </span>
          <span>
            <img src="http://www.mlxc365.com/images/sxccx/icon/ic_time.png" alt />
            <span>{{item.create_date | formatTime}}</span>
          </span>
        </p>
      </div>
    </div>
    <!-- <imageList />
    <textList />-->
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import Lines from "@/components/public/Lines";
import { getManual } from "@/apis";
// import imageList from "@/components/public/imageList";
// import textList from "@/components/public/textList";
export default {
  name: "manual",
  components: {
    MyHeader,
    Lines
  },
  data() {
    return {
      list: {}
    };
  },
  methods: {
    // 获取工作手册
    getmaibox() {
      let data = {
        news_type: 13
      };
      getManual({
        currentObject: this,
        data: data
      }).then(res => {
        if (res.code == 1) {
          this.list = res.data.list;
        }
      });
    },
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
    this.getmaibox();
  },
  filters: {
    formatTime(date) {
      let index = date.lastIndexOf(" "); //截取空格前的年月日  不要具体的时间
      return date.substring(0, index);
    }
  }
};
</script>
<style lang="stylus" scoped>
.manual {
  width: 100%;
  padding-top: func(44);
  background: #E5E5E5;

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
}
</style>