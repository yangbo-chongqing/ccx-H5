<template>
  <div class="poDetails">
    <MyHeader :title="'人物简介'" />
    <div class="title">
      <h3>{{msg.title}}</h3>
    </div>
    <div class="messBox">
      <div class="headbox">
        <img :src="msg.pic?msg.pic:require('@/assets/img/noImg.png')" alt srcset />
      </div>
      <div class="txt">
        <span>{{msg.voting_contents}}</span>
        <p>
          {{msg.votingNum}}
          <span>票</span>
        </p>
      </div>
    </div>
    <div class="content" v-html="msg.introduce"></div>
    <div class="btn" v-if="msg.isVoting==='false'" @click="vote(msg)">投TA一票</div>
    <div class="btn btn1" v-else @click="voted">已投票</div>
  </div>
</template>
<script>
import { getVoteone, getmingyi, Voteone } from "@/apis";
import MyHeader from "@/components/public/MyHeader";
import { Toast } from "vant";

import Lines from "@/components/public/Lines";

export default {
  name: "Detail",
  components: {
    MyHeader,
    Lines
  },
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    vote(item) {
      let data = {
        information_id: item.information_id,
        voting_num: 1,
        voting_contents_id: item.v_contents_id,
        voting_contents: item.voting_contents
      };
      getVoteone({
        url: "/Voting/VoteOn",
        data: data
      }).then(msg => {
        if (~~msg.code === 0 && ~~msg.status === 200) {
          Toast("投票成功");
          this.getvoteone();
          location.reload();
        } else {
          Toast("投票失败");
        }
      });
    },
    voted() {
      Toast("你已经投过票了！");
    }
  },
  created() {
    this.msg = JSON.parse(window.sessionStorage.selectDetail);
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>
.poDetails {
  padding: func(15);
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: func(44);

  .title {
    padding: func(8) 0;
    color: #444444;
    font-size: func(14);
  }

  .messBox {
    width: 100%;
    border-bottom: 1px solid #F5F5F5;
    min-height: func(80);
    box-sizing: border-box;
    padding: func(19) 0;
    padding-top: func(9);
    position: relative;
    display: flex;

    .headbox {
      width: func(80);
      height: func(80);
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      background: #f2f2f2;
      margin-right: func(12);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .txt {
      item-align: center;
      margin-top: func(10);
      margin-left: func(10);

      >span {
        font-size: func(22);
        color: #444444;
      }

      p {
        font-size: func(18);
        color: #FF5A2D;
        margin-top: func(8);

        span {
          color: #DADADA;
        }
      }
    }

    .num {
      position: absolute;
      right: 0;
      top: func(10);
      display: flex;

      p {
        font-size: func(30);
        color: #D33333;
      }

      span {
        font-size: func(30);
        color: #999999;
      }
    }
  }

  .content {
    padding: func(12) 0;
    font-size: func(18);
  }
}

.btn {
  width: 100%;
  height: 1.44rem;
  background: #d33333;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  font-size: 0.6rem;
  line-height: 1.44rem;
  position: absolute;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
}

.btn1 {
  background: #6CB127;
}
</style>