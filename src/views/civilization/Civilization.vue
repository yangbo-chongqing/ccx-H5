<template>
  <div id="Civilization">
    <MyHeader :title="'文明乐村'" />
    <img src="http://www.mlxc365.com/images/sxccx/icon/xiangcunfazhang.png" alt />
    <Tools />
    <Lines />
    <Options />
    <div
      class="NewsList"
      @click="goNews(item.news_id)"
      v-for="(item , index) in newsList"
      :key="index"
    >
      <img :src="item.showImg | formatImg" />
      <div class="info">
        <h6>{{ item.title }}</h6>
        <p>
          <img :src="'locate.png' | formatUserImg" alt />
          <span>{{ item.read_count }}次</span>
        </p>
        <p>
          <span>
            <img :src="'ic_time.png' | formatUserImg" alt />
            <span>{{item.create_date | formatTime}}</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Tools from "@/components/Civilization/Tools";
import MyHeader from "@/components/public/MyHeader";
import Lines from "@/components/public/Lines";
import Options from "@/components/Civilization/Options";
import { getNewsClass } from "../../apis";
export default {
  name: "Civilization",
  data() {
    return {
      newsList: []
    };
  },
  methods: {
    getNewsClass() {
      const data = {
        pageSize: 10,
        pageCurrent: 1,
        news_type: 17
      };
      getNewsClass({
        data,
        currentObject: this
      }).then(msg => {
        if (~~msg.code === 1 && ~~msg.status === 200) {
          msg = msg.data.list;
          msg.forEach(item => {
            if (item.contentPic !== "null") {
              item.showImg = item.contentPic.split(",")[0];
            }
          });
          this.newsList = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
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
  filters: {
    formatTime(date) {
      let index = date.lastIndexOf(" "); //截取空格前的年月日  不要具体的时间
      return date.substring(0, index);
    },
    formatUserImg(img) {
      return baseImgUrl + img;
    }
  },
  components: {
    Tools,
    MyHeader,
    Lines,
    Options
  },
  created() {
    this.getNewsClass();
  }
};
</script>

<style scoped lang="stylus">
#Civilization {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

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
