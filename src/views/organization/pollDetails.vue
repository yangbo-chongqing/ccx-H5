<template>
  <div id="pollDetails">
    <MyHeader :title="'投票调研详情'" />
    <div>
      <div class="details-top">
        <p class="details-title">{{data1.title}}</p>
        <div class="details-user">
          <div>
            <div class="details-user-name">
              <div>{{data1.CreateName}}</div>
              <div class="details-user-time">{{data1.create_date |formatTime}}</div>
            </div>
          </div>
          <div>
            <span>{{data1.read_count}}</span>次浏览
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="chooseall">
        <div v-for="(item , index) in data2" :key="index" class="choose">
          <div class="perimg">
            <img :src="item.pic" />
          </div>
          <div class="intro">
            <div>{{item.voting_contents}}</div>
          </div>
        </div>
        <div class="votingall">
          <div v-for="(item , index) in data2" :key="index" class="voting">
            <div>{{item.voting_contents}}</div>
            <div class="votingnum">({{item.votingNum}}票)</div>
            <div class="choosebtn" @click="goVote(item)">投票</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { Toast } from "vant";
import { getVotedetails, choseVote } from "../../apis";
export default {
  name: "pollDetails",
  data() {
    return {
      news_id: "",
      data1: [],
      data2: []
    };
  },
  methods: {
    getVotedetails() {
      getVotedetails({
        url: "/Voting/GetOneVote",
        data: {
          news_id: this.news_id
        }
      }).then(msg => {
        if (~~msg.code === 0) {
          this.data1 = msg.data.data1[0];
          this.data2 = msg.data.data2;
        } else {
          //获取失败
          this.GToast({ message: "获取失败" });
        }
      });
    },
    goVote(item) {
      choseVote({
        url: "/Voting/VoteOn",
        data: {
          information_id: item.information_id,
          voting_num: 1,
          voting_contents_id: item.v_contents_id,
          voting_contents: item.voting_contents
        }
      }).then(msg => {
        if (~~msg.code === 0 && ~~msg.status === 200) {
          Toast("投票成功");
          this.getVotedetails(this.news_id);
        } else {
          Toast("您已投过票了！");
        }
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
    MyHeader,
    Toast
  },
  created() {
    this.news_id = this.$route.query.id;
    this.getVotedetails();
  }
};
</script>

<style scoped lang="stylus">
#pollDetails {
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

  .chooseall {
    padding: 0.4rem;

    .choose {
      width: 6.72rem;
      display: inline-block;
      height: 8.8rem;
    }

    .choose:nth-child(odd) {
      margin-right: 0.7rem;
    }
  }

  .perimg {
    width: 100%;
    height: 100%;
    margin-top: 0.4rem;

    >img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .intro {
    // text-indent: 2em;
    white-space: pre-line;
    margin-top: 0.1rem;
  }

  .choosebtn {
    width: 3rem;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    border: 1px solid red;
    border-radius: 0.4rem;
    color: #6CB127;
    // background: #e73032;
    font-size: 0.6rem;
  }

  .votingall {
    border: 1px solid #F7F4F4;
    margin-top: 1rem;
  }

  .voting {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #F7F4F4;
    padding: 0.3rem;

    :last-child {
      border: none;
    }

    >div:first-child {
      flex: 1;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .votingnum {
    margin: 0 0.4rem;
  }
}
</style>