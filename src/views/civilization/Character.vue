<template>
  <div id="Character">
    <MyHeader :title="'人物评选'" />
    <div id="Options">
      <div class="rightTitle">
        <ul>
          <li :class="{active : flag === 0 }" @click="toggleFlag(0)">进行中</li>
          <li :class="{active : flag === 1  }" @click="toggleFlag(1)">已结束</li>
        </ul>
      </div>
    </div>
    <div v-if="flag===0">
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
            <span>
              <img :src="'ic_time.png' | formatUserImg" alt />
              <span>{{item.create_date | formatTime}}</span>
            </span>
            <!-- <span>
              <img :src="'ic_time.png' | formatUserImg" alt />
              <span>剩余：{{Date.parse(item.end_time)-Date.parse(item.start_time) | dateFormat}}</span>
            </span>-->
          </p>
        </div>
      </div>
    </div>

    <div v-if="flag===1">
      <div
        class="NewsList"
        @click="goNewed(item.news_id)"
        v-for="(item , index) in newsListed"
        :key="index"
      >
        <img :src="item.showImg | formatImg" />
        <div class="info">
          <h6>{{ item.title }}</h6>
          <p>
            <span>
              <img :src="'ic_time.png' | formatUserImg" alt />
              <span>{{item.create_date | formatTime}}</span>
            </span>
            <span>
              <img :src="'ic_time.png' | formatUserImg" alt />
              <span>浏览：{{item.read_count}}次</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/public/MyHeader";
import { getVote } from "@/apis";
export default {
  name: "Character",
  data() {
    return {
      flag: 0,
      active: 2,
      newsList: [],
      newsListed: [],
      overtime: "",
      overtimes: ""
    };
  },
  methods: {
    getVote() {
      const data = {
        pageSize: 10,
        pageCurrent: 1,
        news_type: 121,
        getOld: true
      };
      getVote({
        url: "/Voting/getVotingListApp",
        data
      }).then(msg => {
        if (~~msg.code === 1) {
          msg = msg.data.list;
          this.newsListed = msg;
          this.overtimes =
            Date.parse(msg.end_time) - Date.parse(msg.start_time);
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },

    getVoted() {
      const data = {
        pageSize: 10,
        pageCurrent: 1,
        news_type: 121,
        getNow: true
      };
      getVote({
        url: "/Voting/getVotingListApp",
        data
      }).then(msg => {
        if (~~msg.code === 1) {
          msg = msg.data.list;
          this.newsList = msg;
          this.overtime = Date.parse(msg.end_time) - Date.parse(msg.start_time);
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },
    //去新闻页面
    goNews(news_id) {
      this.switchPage({
        pageRouter: "/CharacterDetails.html",
        params: {
          news_id
        }
      });
    },
    //去新闻页面
    goNewed(news_id) {
      this.switchPage({
        pageRouter: "/CharacterDetailsed.html",
        params: {
          news_id
        }
      });
    },
    toggleFlag(flag) {
      this.flag = flag;
    }
  },
  filters: {
    formatTime(date) {
      let index = date.lastIndexOf(" "); //截取空格前的年月日  不要具体的时间
      return date.substring(0, index);
    },
    dateFormat(date) {
      date = new Date(date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${day}天`;
    },
    formatUserImg(img) {
      return baseImgUrl + img;
    }
  },
  components: {
    MyHeader
  },
  created() {
    this.getVote();
    this.getVoted();
  }
};
</script>

<style scoped lang="stylus">
#Character {
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
      height: func(55);
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
