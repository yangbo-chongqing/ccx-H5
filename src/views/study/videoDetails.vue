<template>
  <div class="videoDetails">
    <MyHeader :title="'在线学习详情'" />
    <div class="videobox">
      <video :src="video.vedioUrl" controls="controls"></video>
    </div>
    <div class="tit">
      <p>
        {{video.vedioTitle}}
        <span style="float:right;color:#a8a8a8">
          <i class="iconfont">&#xe891;</i>评论
          <span style="color:red">{{video.commentNum}}</span>
        </span>
      </p>
    </div>
    <div class="bq">
      <p>{{video.vedioPraise}}</p>
    </div>
    <div class="lst">
      <div class="boximg">
        <img src="http://119.3.196.255:7604/images/iconPic/Frame 4.png" alt srcset />
        <span>全部评论</span>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="getComment"
      >
        <comment :list="commentList" />
      </van-list>
    </div>
    <div class="iput">
      <input type="text" placeholder="我也来说一句" v-model="comment" />
      <span @click="sendComment()">发送</span>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import comment from "@/components/member/comment";
import { getShow, getComment, enter, getZan, saveVideo } from "@/apis";
import { Toast } from "vant";
import { List } from "vant";
export default {
  name: "videoDetails",
  components: {
    MyHeader,
    comment,
    [List.name]: List,
    Toast
  },
  data() {
    return {
      menu: 1, //1视频学习，2文档学习
      id: this.$route.query.id,
      video: {},
      commentList: [], //评论
      loading: false,
      finished: false,
      pageCurrent: 0,
      total: 0,
      comment: "", //输入的评论
      userID: "", //用户id
      onTime: "" //获取当前时间
    };
  },
  methods: {
    //切换
    changeMenu(e) {
      this.menu = e;
    },
    // 获取视频
    getvideo() {
      getShow({
        url: "/vedio/vedioList",
        data: {
          vedioId: this.id
        }
      }).then(res => {
        if (res.code == 200) {
          this.video = res.data.list[0];
        } else {
          this.GToast({ message: res.msg });
        }
      });
    },
    //评论列表
    getComment() {
      getComment({
        url: "/interface/course/getCourseCommentInfo",
        data: {
          classId: this.id,
          type: 2,
          pageCurrent: this.pageCurrent + 1,
          pageSize: 10
        }
      }).then(res => {
        if (res.code == 200) {
          this.commentList = [...this.commentList, ...res.data.list];
          this.total = res.data.total;
          this.pageCurrent = this.pageCurrent + 1;
          // 加载状态结束
          this.loading = false;
          console.log(this.commentList);
          // 数据全部加载完成
          if (this.commentList.length >= res.data.total) {
            this.finished = true;
          }
        } else {
          this.GToast({ message: res.msg });
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
    //阅读增加积分
    saveVi() {
      saveVideo({
        data: {
          classId: this.video.id,
          employeeId: this.userID,
          integralType: 8,
          integralNum: this.video.vedioIntegral,
          integralStatus: this.video.vedioStatus
        }
      }).then(res => {
        console.log(this.video);
        console.log(res);
      });
    },
    //发送评论
    sendComment() {
      if (!this.comment) {
        this.GToast({ message: "评论不能为空" });
      } else {
        Toast.loading({
          message: "提交中..."
        });
        enter({
          url: "/interface/course/insertCourseComment",
          data: {
            classId: this.id,
            type: 2,
            commentContent: this.comment
          }
        }).then(res => {
          if (res.code == 200) {
            Toast.success("提交成功");
            this.commentList = [];
            this.loading = false;
            this.finished = false;
            console.log()((this.pageCurrent = 0)), (this.total = 0);
            this.comment = "";
            this.getComment();
          } else {
            Toast.fail(res.msg);
          }
        });
      }
    }
  },
  created() {
    this.getvideo();
    this.getComment();
    console.log(this.id);
    this.onTime = new Date();
    let userInfo = JSON.parse(window.sessionStorage.userInfo);
    this.userID = userInfo.menberId;
    setTimeout(() => {
      this.saveVi();
    }, 20000);
  }
};
</script>
<style lang="stylus" scoped>
.videoDetails {
  min-height: 100vh;
  background-color: #e5e5e5;
  padding-top: func(44);

  .videobox {
    width: 100%;
    height: func(211);
    background: #f2f2f2;

    video {
      width: 100%;
      height: 100%;
    }
  }

  .tit {
    padding: func(5) func(15);
    background: #ffffff;

    p {
      font-size: func(16);
      color: #444444;
    }
  }

  .bq {
    background: #ffffff;
    text-align: center;
    padding-top: func(5);
    padding-bottom: func(15);

    p {
      color: #D33333;
      font-size: func(11);
      margin-right: func(3);
      display: inline-block;

      span {
        color: #8a8a8a;
      }
    }

    p:nth-child(1) {
      background-size: func(12.3);
      padding-left: func(15);
    }

    p:nth-child(2) {
      background-size: func(12.3);
      padding-left: func(15);
    }
  }

  .lst {
    width: 100%;
    margin-top: func(8);
    background: #ffffff;

    .boximg {
      width: 100%;
      height: func(44);
      display: flex;
      align-items: center;

      img {
        width: func(24);
        height: func(24);
        margin-left: func(15);
      }

      span {
        font-size: func(14);
        color: #444444;
        margin-left: func(12);
      }
    }
  }

  .iput {
    width: 100%;
    height: func(44);
    position: fixed;
    bottom: 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding-left: func(13);

    input {
      width: func(303);
      height: func(30);
      border: 0;
      background: #f5f5f5;
      padding-left: func(12);
      box-sizing: border-box;
    }

    span {
      color: #6CB127;
      font-size: func(16);
      margin-left: func(12);
    }
  }
}
</style>