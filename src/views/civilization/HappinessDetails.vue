<template>
  <div id="HappinessDetails">
    <MyHeader :title="'新闻详情'" />
    <div class="top">
      <h6>{{ news.title }}</h6>
      <div>
        <div class="left">
          <div>
            <p>发布时间：{{ news.createDate | formatTime}}</p>
          </div>
        </div>
        <div class="right">
          <span>{{ news.likeCount }}</span>
          次浏览
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="left">
        <img :src="news.picId" />
        <div>
          <h6>{{ news.createUserName }}</h6>
        </div>
      </div>
      <div class="right">
        <p v-if="news.isConcern==1" class="p1" @click="removeFollow(news.id)">已关注</p>
        <p v-if="news.isConcern==0" class="p2" @click="getFollow(news.id)">关注</p>
      </div>
    </div>
    <div class="bottom" v-html="news.content" />

    <!-- 查看评论 -->
    <div class="showCommentss">
      <div class="competition-title">
        <img class="iconfont" src="http://119.3.196.255:7604/images/iconPic/Frame 4.png" />
        <span>全部评论</span>
      </div>
      <div class="itemBox" v-for="(item , index) in list" :key="index">
        <div class="item">
          <img :src="item.showImg" />
          <div class="userBox">
            <p>{{item.createUserName}}</p>
            <p>{{item.createDate | formatTime}}</p>
          </div>
        </div>
        <div class="textArea">{{item.content}}</div>
      </div>
    </div>
    <!-- 发送评论 -->
    <div class="commentss">
      <input class="inner" placeholder="我也来说一句" value v-model="inputNum" @click="inners" />
      <div class="commit" @click="enter">发送</div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/public/MyHeader";
import { Toast } from "vant";
import {
  getHapplyDetails,
  getHapplyFollow,
  getCommentList,
  sendComment
} from "@/apis";
export default {
  name: "HappinessDetails",
  data() {
    return {
      id: "",
      followId: "",
      news: {},
      inputNum: "",
      list: []
    };
  },
  methods: {
    //获取详情
    getHapplyDetails(id) {
      const data = id;
      getHapplyDetails({
        url: "/dp_happy_share/get",
        data
      }).then(msg => {
        if (~~msg.code === 200) {
          msg = msg.data;
          this.news = msg;
        }
      });
    },
    // 点击关注
    getFollow(id) {
      getHapplyFollow({
        url: "/dp_happy_share/saveConcern",
        data: {
          userId: this.news.createUser
        }
      }).then(msg => {
        if (~~msg.code === 200) {
          msg = msg.data;
          this.news.isConcern = 1;
          this.GToast({ message: msg.message });
        }
      });
    },
    // 取消关注
    removeFollow(id) {
      getHapplyFollow({
        url: "/dp_happy_share/saveConcern",
        data: {
          userId: this.news.createUser
        }
      }).then(msg => {
        if (~~msg.code === 200) {
          msg = msg.data;
          this.news.isConcern = 0;
          this.GToast({ message: msg.message });
        }
      });
    },
    // 获取评论列表
    getCommentList() {
      getCommentList({
        url: "/dp_happy_share/listComment",
        data: {
          articleId: this.id.id,
          status: 1
        }
      }).then(msg => {
        if (~~msg.code === 200) {
          msg = msg.data.list;
          msg.forEach(item => {
            if (item.picId && item.picId !== "null") {
              item.showImg = item.picId.split(",")[0];
            } else {
              item.showImg = require("../../assets/img/noImg.png");
            }
          });
          this.list = msg;
        } else {
          this.GToast({ message: "获取失败" });
        }
      });
    },
    inners(e) {
      this.inputNum = e.target.value;
    },
    enter() {
      if (this.inputNum != "") {
        this.sendComment(this.inputNum);
      } else {
        Toast("评论不能为空");
      }
    },
    sendComment(val) {
      sendComment({
        url: "/dp_happy_share/saveComment",
        data: {
          articleId: this.id.id,
          content: val
        }
      }).then(msg => {
        if (~~msg.code === 0) {
          Toast("评论成功");
          this.getCommentList(this.id.id);
          this.inputNum = "";
        } else {
          Toast("评论失败");
        }
      });
    }
  },
  filters: {
    formatTime(date) {
      date = new Date(date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}年${month}月${day}日`;
    },
    formatUserImg(img) {
      return baseImgUrl + img;
    }
  },
  components: {
    MyHeader
  },
  created() {
    // let Id = this.decodeBase64(this.$route.query);
    this.id = this.decodeBase64(this.$route.query);
    this.getHapplyDetails(this.id);
    this.getCommentList();
  }
};
</script>

<style scoped lang="stylus">
#HappinessDetails {
  width: 100%;
  box-sizing: border-box;
  padding-top: func(44);

  > .top {
    width: 100%;
    max-height: func(128.5);
    box-sizing: border-box;
    padding: func(8) func(15) 0 func(15);

    > h6 {
      width: 100%;
      max-height: func(40);
      font-size: func(14);
      font-weight: 400;
      color: #444;
      line-height: func(20);
      nLine();
    }

    > div {
      width: 100%;
      height: func(50);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: func(1) solid #f5f5f5;

      > .left {
        display: flex;
        align-items: center;
        height: 100%;

        > img {
          width: func(44);
          height: func(44);
          border-radius: 50%;
          margin-right: func(12);
        }

        > div {
          display: flex;
          flex-direction: column;
          justify-content: center;

          > h6 {
            font-size: func(14);
          }

          > p {
            font-size: func(12);
            color: #999;
          }
        }
      }

      > .right {
        font-size: func(14);
        color: #8a8a8a;

        > span {
          color: #D33333;
        }
      }
    }
  }

  >.middle {
    width: 100%;
    max-height: func(128.5);
    box-sizing: border-box;
    padding: func(8) func(15) 0 func(15);
    display: flex;
    justify-content: space-between;
    align-items: center;

    > h6 {
      width: 100%;
      max-height: func(40);
      font-size: func(14);
      font-weight: 400;
      color: #444;
      line-height: func(20);
      nLine();
    }

    > .left {
      width: 100%;
      height: func(50);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      > img {
        width: func(44);
        height: func(44);
        border-radius: 50%;
        margin-right: func(12);
      }

      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;

        > h6 {
          font-size: func(14);
        }

        > p {
          font-size: func(12);
          color: #999;
        }
      }
    }

    > .right {
      font-size: func(14);
      font-size: 0.56rem;
      width: 3rem;
      height: 0.9rem;
      text-align: center;

      > .p1 {
        border-radius: 0.5rem;
        color: #fff;
        background: rgba(108, 177, 39, 0.96);
      }

      >.p2 {
        border-radius: 0.5rem;
        background: rgba(108, 177, 39, 0.2);
        color: #6CB127;
      }
    }
  }

  > .bottom {
    width: 100%;
    box-sizing: border-box;
    padding: func(12.5) func(15);

    img {
      max-width: 100% !important;
    }

    >>>span, >>>p, >>>div, >>>h1, >>>h2, >>>h3, >>>h4, >>>h5, >>>h6 {
      font-size: func(16) !important;
      color: #444;
    }
  }

  .competition-title>.iconfont {
    width: 0.96rem;
    vertical-align: middle;
    margin-right: 0.2rem;
    margin-top: 0.44rem;
  }

  .competition-title>span:nth-child(2) {
    color: #444;
    font-weight: 600;
    vertical-align: -webkit-baseline-middle;
  }

  .shareMain {
    width: 100%;
    margin: 1.3rem 0;

    .mainList {
      overflow: hidden;
      margin: 0 auto;
      text-align: center;
    }

    .title {
      margin: 0 auto;
      text-align: center;
      font-size: 13px;
      margin-top: -13px;
    }
  }

  .commentss {
    width: 100%;
    height: 1.76rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0.28rem 0.52rem;
    box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);

    > .inner {
      background-color: #f3f3f3;
      width: 85%;
      height: 1.2rem;
      padding-left: 0.4rem;
      font-size: 0.6rem;
      border: none;
    }

    > .commit {
      color: #3686FB;
    }
  }

  .showCommentss {
    background-color: #fff;
    width: 100%;
    min-height: 20rem;
    box-sizing: border-box;
    padding: 0 0.5rem;
    margin-bottom: 3.1rem;

    > .commentsTitle {
      background-image: url('http://www.mlxc365.com/images/zhongyixiang/suibiandayige.png');
      background-repeat: no-repeat;
      background-size: 1.3rem;
      padding-left: 1.2rem;
      background-position-y: 0.1rem;
      font-size: 1.2rem;
      color: #259B24;
    }

    > .itemBox {
      width: 100%;
      margin-top: 0.48rem;
      margin-left: 0.48rem;

      > .item {
        display: flex;
        align-items: center;

        > img {
          width: 1.44rem;
          height: 1.44rem;
          border-radius: 50%;
        }

        .userBox {
          display: flex;
          flex-direction: column;
          margin-left: 0.48rem;

          > p:last-child {
            font-size: 0.48rem;
            color: #ccc;
          }
        }
      }

      > .textArea {
        font-size: 0.5rem;
        color: #444;
        width: 80%;
        margin: 0.64rem 0 0.8rem 2rem;
      }
    }
  }
}
</style>
