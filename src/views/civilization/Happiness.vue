<template>
  <div id="Happiness">
    <MyHeader :title="'幸福分享'" />
    <div id="Options">
      <div class="rightTitle">
        <ul>
          <li :class="{active : flag === 0 }" @click="toggleFlag(0)">推荐阅读</li>
          <li :class="{active : flag === 1  }" @click="toggleFlag(1)">最新发布</li>
          <li :class="{active : flag === 2  }" @click="toggleFlag(2)">我的关注</li>
        </ul>
      </div>
    </div>
    <div>
      <div
        class="NewsList"
        @click="goNews(item.id)"
        v-for="(item , index) in newsList"
        :key="index"
      >
        <img :src="item.showImg | formatImg" />
        <div class="info">
          <h6>
            <span v-if="item.isTop==1">「置顶」</span>
            {{ item.title }}
          </h6>
          <p>
            <img :src="'locate.png' | formatUserImg" alt />
            <span>{{ item.createUserName }}</span>
          </p>
          <p>
            <span>
              <img :src="'ic_time.png' | formatUserImg" alt />
              <span>{{item.createDate|formatTime}}</span>
            </span>
            <span>
              <img :src="'以评论.png' | formatUserImg" alt />
              <span>{{item.commentCount}}条</span>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="add" @click="add">添加</div>
  </div>
</template>

<script>
import MyHeader from "@/components/public/MyHeader";
import { getHapply } from "@/apis";
export default {
  name: "Happiness",
  data() {
    return {
      flag: 0,
      newsList: [],
      getType: null // 1 推荐 2 最新 3 关注
    };
  },
  methods: {
    add() {
      this.$router.push({ path: "/PublishArticles.html" });
    },
    getHapply(getType = 1) {
      if (this.getType) {
        getType = this.getType;
      }

      const data = {
        status: 1,
        pageSize: 10,
        pageCurrent: 1,
        getType
      };
      getHapply({
        url: "/dp_happy_share/list",
        data
      }).then(msg => {
        if (~~msg.code === 200) {
          msg = msg.data.list;
          if (getType === 1) {
            msg.forEach(item => {
              if (item.backImg && item.backImg !== "null") {
                item.showImg = item.backImg.split(",")[0];
              } else {
                item.showImg = require("../../assets/img/noImg.png");
              }
              item.typeName = "村务";
            });
          }
          if (getType === 2) {
            msg.forEach(item => {
              if (item.backImg && item.backImg !== "null") {
                item.showImg = item.backImg.split(",")[0];
              } else {
                item.showImg = require("../../assets/img/noImg.png");
              }
            });
          }
          if (getType === 3) {
            msg.forEach(item => {
              if (item.backImg && item.backImg !== "null") {
                item.showImg = item.backImg.split(",")[0];
              } else {
                item.showImg = require("../../assets/img/noImg.png");
              }
            });
          }
          this.newsList = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },
    //去新闻页面
    goNews(id) {
      // this.$router.push({path:'/HappinessDetails.html',query:{ id:id}});
      this.switchPage({
        pageRouter: "/HappinessDetails.html",
        params: {
          id
        }
      });
    },
    toggleFlag(flag) {
      switch (flag) {
        case 0:
          this.getType = 1;
          break;
        case 1:
          this.getType = 2;
          break;
        default:
          this.getType = 3;
      }
      this.flag = flag;
      this.getHapply();
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
    MyHeader
  },
  created() {
    this.getHapply();
  }
};
</script>

<style scoped lang="stylus">
#Happiness {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }
}

#Options {
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 func(10);
  padding-bottom: func(5);
  border-bottom: func(1) solid #e3e3e3;

  .rightTitle {
    width: 100%;
    height: func(44);
    display: flex;
    justify-content: flex-end;

    ul {
      width: 100%;
      height: func(44);
      display: flex;
      align-items: center;
      justify-content: space-around;

      li {
        padding: 0 func(10);
        font-size: func(14);
        height: func(33);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        color: #8A8A8A;
        position: relative;

        &::after {
          position: absolute;
          width: 50%;
          height: func(2);
          background-color: #4bb344;
          bottom: 10%;
          transition: all 0.2s;
        }

        &.active {
          border-bottom: func(2) solid #4bb344;
        }
      }
    }
  }
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

.add {
  width: 1.6rem;
  height: 1.6rem;
  color: #fff !important;
  background: #0EDD9C;
  border-radius: 50%;
  text-align: center;
  line-height: 1.6rem;
  position: fixed;
  right: 1rem;
  bottom: 5rem;
}
</style>
