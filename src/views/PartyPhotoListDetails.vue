<template>
  <div id="PartyPhotoListDetails">
    <MyHeader :title="'党建相册详情'" />
    <div class="photo-list">
      <div class="list-main">
        <img :src="img" />
        <div class="photo-list-msg">
          <div>
            <i class="iconfont">&#xe891;</i>评论
            <span>{{commentnum || 0}}</span>
          </div>
          <div @click="zan(id)">
            <i :class="{'iconfont':true ,'colorgreen':iszan }">&#xe600;</i>点赞
            <span>{{num}}</span>
          </div>
        </div>
      </div>
    </div>
    <Lines />

    <!-- 查看评论 -->
    <div class="showCommentss">
      <div class="competition-title">
        <img class="iconfont" src="http://119.3.196.255:7604/images/iconPic/Frame 4.png" />
        <span>全部评论</span>
      </div>
      <div class="itemBox" v-for="(item , index) in list" :key="index">
        <div class="item">
          <img :src="item.HeadPic" />
          <div class="userBox">
            <p>{{item.userName}}</p>
            <p>{{item.createdate}}</p>
          </div>
        </div>
        <div class="textArea">{{item.comment_content}}</div>
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
import MyHeader from "../components/public/MyHeader";
import Lines from "../components/public/Lines";
import { Toast } from "vant";
import { getList, getSend, getZan } from "../apis";
export default {
  name: "PartyPhotoListDetails",
  data() {
    return {
      id: "",
      img: "",
      num: "",
      commentnum: "",
      inputNum: "",
      iszan: "",
      list: []
    };
  },
  methods: {
    // 获取评论列表
    getList(id) {
      getList({
        url: "/Photos/getComment",
        data: {
          class_id: id
        }
      }).then(msg => {
        if (~~msg.code === 0) {
          msg = msg.data.list;
          this.list = msg;
        } else {
          this.GToast({ message: "获取失败" });
        }
      });
    },
    zan(id) {
      //点赞
      getZan({
        url: "/Photos/PhotoFabulous",
        data: {
          photo_list_id: id
        }
      }).then(msg => {
        if (~~msg.code === 0 && ~~msg.status === 200) {
          Toast("点赞成功");
          this.photoDetails();
        } else {
          Toast("您已经点过赞了！");
        }
      });
    },
    inners(e) {
      this.inputNum = e.target.value;
    },
    enter() {
      if (this.inputNum != "") {
        this.getSend(this.inputNum);
      } else {
        Toast("评论不能为空");
      }
    },
    getSend(val) {
      getSend({
        url: "/Photos/PhotoComment",
        data: {
          class_id: this.id,
          comment_content: val
        }
      }).then(msg => {
        if (~~msg.code === 0 && ~~msg.status === 200) {
          Toast("评论成功");
          this.getList(this.id);
          this.inputNum = "";
        } else {
          Toast("评论失败");
        }
      });
    }
  },
  components: {
    MyHeader,
    Lines,
    Toast
  },
  created() {
    (this.id = this.$route.query.id),
      (this.img = this.$route.query.img),
      (this.num = this.$route.query.num),
      (this.commentnum = this.$route.query.com),
      (this.iszan = this.$route.query.iszan);
    this.getList(this.id);
    console.log(this.iszan);
  }
};
</script>

<style scoped lang="stylus">
#PartyPhotoListDetails {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .active {
    color: red;
  }

  .photo-list {
    background: #fff;
  }

  .list-main {
    padding: 0rem 0.6rem;
    margin-bottom: 1rem;

    >img {
      width: 100%;
      height: 7.52rem;
    }
  }

  .photo-list-msg {
    margin-top: 0.64rem;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    font-size: 1rem;
    color: #8A8A8A;
    line-height: 1rem;

    >div>span:last-child {
      color: #d33333;
    }

    .iconfont {
      margin-right: 0.5rem;
    }
  }

  /* 全部评论 */
  .competition-title>.iconfont {
    width: 0.96rem;
    height: 0.96rem;
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

.colorgreen {
  color: #16DFA9 !important;
}
</style>