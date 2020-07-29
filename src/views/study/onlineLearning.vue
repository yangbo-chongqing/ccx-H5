<template>
  <div id="onlineLearning">
    <MyHeader :title="'在线学习'" />
    <div class="topmenu">
      <div @click="changeMenu(1)">
        <p :class="menu == 1 ? 'active' : ''">视频学习</p>
        <span v-if="menu == 1"></span>
      </div>
      <div @click="changeMenu(2)">
        <p :class="menu == 2 ? 'active' : ''">文档学习</p>
        <span v-if="menu == 2"></span>
      </div>
    </div>
    <!-- 视频学习 -->
    <div class="videoLearning" v-if="menu == 1">
      <!-- <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="getmorevedio"
      >-->
      <div class="li" v-for="(item, index) in videoList" :key="index">
        <div class="imgbox" @click="toVideoDetails(item.id)">
          <img :src="item.vedioImgUrl" alt srcset />
        </div>
        <div class="mess">
          <div class="tit">{{item.vedioTitle}}</div>
          <div class="ribox">
            <p>{{item.vedioPraise}}</p>
            <p>
              <span>
                <i class="iconfont">&#xe891;</i>评论
              </span>
              <span>{{item.commentNum}}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- </van-list> -->
    </div>
    <!-- 文档学习 -->
    <div class="wdLearning" v-if="menu == 2">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="getmoretext"
      >
        <!-- <router-link to="/wdjj.html"> -->
        <div
          class="NewsList"
          @click="goNews(item.classId,item.classTitle,item.classBackImg)"
          v-for="(item,index) in textList"
          :key="index"
        >
          <img :src="item.classBackImg | formatImg" />
          <div class="info">
            <h6>{{ item.classTitle }}</h6>
            <!-- <p>
                <img :src="'locate.png' | formatUserImg" alt />
                <span>{{ news.areaName }}</span>
            </p>-->
            <p>
              <span>
                <img :src="'tab_more_select.png' | formatUserImg" alt />
                <span>{{ item.areaName }}</span>
              </span>
              <span>
                <img :src="'ic_time.png' | formatUserImg" alt />
                <span>{{item.createdate | formatTime}}</span>
              </span>
            </p>
          </div>
        </div>
        <!-- </router-link> -->
      </van-list>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/public/MyHeader";
// import NewsList from "@/components/public/NewsList";
import { List } from "vant";
import { getvedio, getText } from "@/apis";
import { get } from "../../Request";
export default {
  name: "onlineLearning",
  components: {
    MyHeader,
    // NewsList,
    [List.name]: List
  },
  data() {
    return {
      menu: 1, //1视频学习，2文档学习
      videoList: [], //视频列表
      loading: false,
      finished: false,
      pageCurrent: 1, //当前页码
      textList: [] //文档列表
    };
  },
  methods: {
    //切换
    changeMenu(e) {
      this.loading = false;
      this.finished = false;
      this.videoList = [];
      this.textList = [];

      this.pageCurrent = 1;
      if (e == 1) {
        this.menu = e;
        // this.loading = false;
        // this.finished = false;
        // this.videoList = [];
        // this.pageCurrent = 1;

        this.getlist();
      } else {
        this.menu = e;
        // this.loading1 = false;
        // this.finished1 = false;
        // this.textList = [];
        // this.pageCurrent = 1;

        this.getText();
      }
    },
    //获取视频列表
    getmorevedio() {
      if (!this.finished) {
        this.pageCurrent += 1;
        this.getlist();
      } else {
      }
    },
    getlist() {
      getvedio({
        url: "/vedio/vedioList",
        data: {
          type: "app",
          pageCurrent: this.pageCurrent,
          pageSize: 5
        }
      }).then(res => {
        if (res.code == 200) {
          this.videoList = [...this.videoList, ...res.data.list];
          //   this.pageCurrent++;
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.videoList.length >= res.data.total) {
            this.finished = true;
          }
        } else {
          this.GToast({ message: res.msg });
        }
      });
    },
    //获取文档学习列表
    getmoretext() {
      if (!this.finished) {
        this.pageCurrent += 1;

        this.getText();
      } else {
      }
    },
    getText() {
      getText({
        url: "/fun/class/list",
        data: {
          // type: "app", 旧
          treeType: 1, //新调试
          del_lag: 0, //新调试
          pageCurrent: this.pageCurrent,
          pageSize: 7
        }
      }).then(res => {
        if (res.code == 200) {
          this.textList = res.data.list;
          //   this.pageCurrent = this.pageCurrent + 1;
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成

          if (this.textList.length >= res.data.total) {
            this.finished = true;
          }
        } else {
          this.GToast({ message: res.msg });
        }
      });
    },
    toVideoDetails(e) {
      this.$router.push({
        path: "/videoDetails.html",
        query: {
          id: e
        }
      });
    },
    goNews(id, content, img) {
      this.$router.push({
        path: "/wdjj.html",
        query: { id: id, content: content, img: img }
      });
    }
  },
  created() {
    this.getlist();
  },
  filters: {
    formatUserImg(img) {
      return baseImgUrl + img;
    },
    formatTime(date) {
      let index = date.lastIndexOf(" "); //截取空格前的年月日  不要具体的时间
      return date.substring(0, index);
    }
  }
};
</script>

<style scoped lang="stylus">
#onlineLearning {
  padding-top: func(88);
  min-height: 100vh;
  background-color: #e5e5e5;
  box-sizing: border-box;

  .topmenu {
    width: 100%;
    height: func(44);
    position: fixed;
    top: func(44);
    left: 0;
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

  .videoLearning {
    .imgbox {
      width: 100%;
      height: func(211);
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f2f2f2;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .mess {
      width: 100%;
      box-sizing: border-box;
      padding: 0 func(15);
      height: func(52);
      background: #ffffff;
      display: flex;
      justify-content: space-between;

      .tit {
        line-height: func(52);
        font-size: func(16);
        color: #444444;
        width: func(230);
        nLine(1);
      }

      .ribox {
        display: flex;
        height: 100%;
        align-items: center;

        p {
          color: #D33333;
          font-size: func(11);
          margin-left: func(5);
        }

        span:nth-child(1) {
          background-size: func(12.3);
          color: #8a8a8a;
          padding-left: func(15);
        }

        p:nth-child(2) {
          background-size: func(12.3);
          padding-left: func(15);
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
}
</style>
