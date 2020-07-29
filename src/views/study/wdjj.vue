<template>
  <div class="wdjj">
    <MyHeader :title="'文档简介'" />
    <img class="boximg" :src="img" alt srcset />
    <div class="topmenu">
      <div @click="changeMenu(1)">
        <p :class="menu == 1 ? 'active' : ''">课程简介</p>
        <span v-if="menu == 1"></span>
      </div>
      <div @click="changeMenu(2)">
        <p :class="menu == 2 ? 'active' : ''">课程目录</p>
        <span v-if="menu == 2"></span>
      </div>
      <div @click="changeMenu(3)">
        <p :class="menu == 3 ? 'active' : ''">评论社区</p>
        <span v-if="menu == 3"></span>
      </div>
    </div>
    <!-- 课程简介 -->
    <div class="jj" v-if="menu==1">
      <p>{{content}}</p>
    </div>
    <!-- 课程目录 -->
    <!-- <div class="ml" v-if="menu==2">
             1111  
    </div>-->
    <div class="catalog" v-if="menu==2" style="background:#fff;">
      <div class="bottompadd">
        <div
          class="itemone"
          v-for="(item, index) in treeData"
          :key="index"
          @click="show(item.classId)"
        >
          <div class="itemTop">
            <div class="itemname">{{item.classTitle}}</div>
            <i class="right iconfont">&#xe601;</i>
          </div>
          <div v-if="isShow&& flag==item.classId">
            <div
              class="item_one"
              v-for="(item, index) in manlist"
              :key="index"
              @click="goDetials(item)"
            >
              <div>{{item.classTitle}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pl" v-if="menu==3">
      <!-- 查看评论 -->
      <div class="showCommentss">
        <div class="competition-title">
          <img class="iconfont" src="http://119.3.196.255:7604/images/iconPic/Frame 4.png" />
          <span>全部评论</span>
        </div>
        <div class="itemBox" v-for="(item , index) in listData" :key="index">
          <div class="item">
            <img :src="item.popImg" />
            <div class="userBox">
              <p>{{item.popName}}</p>
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
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import comment from "@/components/member/comment";
import { Toast } from "vant";
import { getClass, getSends, getlist } from "@/apis";
export default {
  name: "wdjj",
  components: {
    MyHeader,
    comment,
    Toast
  },
  data() {
    return {
      menu: 1, //1课程简介，2课程目录，3评论社区
      classId: this.$route.query.id,
      img: this.$route.query.img,
      content: this.$route.query.content,
      isShow: false,
      treeData: [], //课程目录
      manlist: [],
      listData: [], //评论列表
      inputNum: ""
    };
  },
  methods: {
    //切换
    changeMenu(e) {
      this.menu = e;
    },
    show(id) {
      this.flag = id;
      this.isShow = !this.isShow;
      this.manlist = [];
      this.getClassBook(id);
    },
    goDetials(item) {
      this.$router.push({
        path: "/documentDetails.html",
        query: { id: item.classId }
      });
    },
    //课程目录
    getClass(id) {
      getClass({
        url: "/fun/class/list",
        data: {
          treeType: 2,
          parentId: this.classId
        }
      })
        .then(msg => {
          this.treeData = msg.data.list;
        })
        .catch(error => {
          this.GToast({ message: "网络错误" });
        });
    },
    //课程文章
    getClassBook(id) {
      getClass({
        url: "/fun/class/list",
        data: {
          treeType: 3,
          parentId: id
        }
      })
        .then(msg => {
          this.manlist = msg.data.list;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 评论
    getlist(val) {
      let _this = this;
      getlist({
        url: "/interface/course/getCourseCommentInfo",
        data: {
          classId: this.classId,
          type: 1
        }
      })
        .then(msg => {
          this.listData = msg.data.list;
        })
        .catch(error => {
          console.log(error);
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
      getSends({
        url: "/interface/course/insertCourseComment",
        data: {
          classId: this.classId,
          type: 1,
          commentContent: val
        }
      }).then(msg => {
        console.log(msg);
        if (~~msg.code === 200) {
          Toast("评论成功");
          this.getlist(this.classId);
          this.inputNum = "";
        } else {
          Toast("评论失败");
        }
      });
    }
  },
  mounted() {
    console.log(this.classId);
    console.log(this.img);
  },
  created() {
    this.getClass();
    this.getlist();
  }
};
</script>
<style lang="stylus" scoped>
.wdjj {
  width: 100%;
  padding-top: func(44);
  background-color: #e5e5e5;
  box-sizing: border-box;

  .boximg {
    width: 100%;
    height: func(211);
  }

  .topmenu {
    width: 100%;
    height: func(44);
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    z-index: 2;

    div {
      position: relative;
      width: 50%;
      text-align: center;

      p {
        font-size: func(14);
        color: #8A8A8A;
        line-height: func(44);
      }

      p.active {
        color: #6CB127;
      }

      span {
        width: func(20);
        height: func(3);
        background: #6CB127;
        position: absolute;
        left: 0;
        right: 0;
        bottom: func(6);
        margin: auto;
        box-shadow: 0 0 func(4) #6CB127;
        border-radius: func(2);
      }
    }
  }

  .jj {
    width: 100%;
    background: #ffffff;
    padding: func(16) func(15);
    box-sizing: border-box;
    margin-top: func(8);

    p {
      font-size: func(16);
      color: #444444;
      text-indent: 2em;
    }
  }

  .pl {
    .lst {
      width: 100%;
      margin-top: func(8);
      background: #ffffff;
    }

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

    .iput {
      width: 100%;
      height: func(44);
      position: fixed;
      bottom: 0;
      background: #ffffff;
      display: flex;
      align-items: center;
      padding-left: func(13);
      outline: none;

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

  .competition-title>.iconfont {
    width: 0.96rem;
    height: 0.96rem;
    vertical-align: middle;
    margin-right: 0.2rem;
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

  .itemone {
    >.itemTop {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    padding: 0.5rem 0.5rem 0 0.5rem;
    width: 100%;
    box-sizing: border-box;
    flex-wrap: wrap;
    line-height: 40rpx;

    >image {
      width: 1rem;
      height: 1rem;
      display: block;
      margin-right: 0.5rem;
    }
  }

  .itemname {
    flex: 1;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .right {
    font-size: 0.65rem;
    color: #DADADA;
    transition: all 0.1s;
  }

  .rotate {
    transform: rotate(90deg);
  }

  .item_one {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    margin-left: 1rem;
    padding: 0.5rem 0.5rem 0 0.5rem;
    line-height: 40rpx;
  }

  .item_one>image {
    width: 1.2rem;
    height: 1.2rem;
    display: block;
    margin-right: 0.7rem;
    border-radius: 50%;
  }

  .iteminfo {
    flex: 1;
  }

  .iteminfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.6rem;
  }

  .bottompadd {
    padding-bottom: 1rem;
  }
}
</style>