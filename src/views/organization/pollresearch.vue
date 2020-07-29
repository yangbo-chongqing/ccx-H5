<template>
  <div id="pollresearch">
    <MyHeader :title="'投票调研'" />
    <div class="list-main" v-for="(item , index) in list" :key="index" @click="goPollDetails(item)">
      <img :src="item.showImg" />
      <div class="list-main-right">
        <p>{{item.title}}</p>
        <div style="color:#d33333">
          <i class="iconfont" style="color:#d33333">&#xe7de;</i>进行中
        </div>
        <div class="other">
          <div>
            <i class="iconfont">&#xe671;</i>
            {{item.create_date |formatTime}}
          </div>
          <div>
            <i class="iconfont">&#xe713;</i>
            {{item.areaName}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { getVotingList } from "../../apis";
export default {
  name: "pollresearch",
  data() {
    return {
      list: []
    };
  },
  methods: {
    getVotingList() {
      getVotingList({
        url: "/Voting/getVotingListApp",
        data: {
          news_type: 122,
          getNow: true
        }
      }).then(msg => {
        if (~~msg.code === 1) {
          msg = msg.data.list;
          msg.forEach(item => {
            if (item.contentPic && item.contentPic !== "null") {
              item.showImg = item.contentPic.split(",")[0];
            } else {
              item.showImg = require("../../assets/img/noImg.png");
            }
          });
          this.list = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取失败" });
        }
      });
    },
    goPollDetails(item) {
      this.$router.push({
        path: "/pollDetails.html",
        query: { id: item.news_id }
      });
    }
  },
  filters: {
    formatTime(date) {
      let index = date.lastIndexOf(" "); //截取空格前的年月日  不要具体的时间
      return date.substring(0, index);
    }
  },
  components: {
    MyHeader
  },
  created() {
    this.getVotingList();
  }
};
</script>

<style scoped lang="stylus">
#pollresearch {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .list {
    background-color: #fff;
  }

  .list-title>img {
    width: 6.8rem;
    height: 1.3rem;
    margin: 1rem 0 0 1.2rem;
  }

  .list-main {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.6rem;
    border-bottom: 0.1rem solid #f5f5f5;

    >img {
      width: 4.4rem;
      height: 3.28rem;
      display: block;
      margin-right: 0.48rem;
    }
  }

  .list-main-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >p {
      width: 100%;
      font-family: PingFang SC;
      line-height: 1.2rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      color: rgba(34, 34, 34, 1);
    }

    >div:nth-child(2) {
      font-size: 0.5rem;
      color: #999;
    }

    .other {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 1rem;
      line-height: 1rem;

      >div {
        color: #999;
      }

      >div:first-child {
        margin-right: 0.48rem;
      }
    }

    .iconfont {
      color: #7ec26f;
      font-size: 0.5rem;
      vertical-align: middle;
      margin-right: 0.32rem;
    }
  }

  .list-other {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 1rem;
    line-height: 1.1rem;
    margin: 1rem 1.1rem;

    >div {
      color: #999;
    }

    .iconfont {
      color: #7ec26f;
      font-size: 1.1rem;
      vertical-align: sub;
    }
  }
}
</style>
