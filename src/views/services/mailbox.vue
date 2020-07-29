<template>
  <div class="mailbox">
    <MyHeader :title="'书记信箱'" />
    <div class="topmenu">
      <div @click="changeMenu(1)">
        <p :class="menu == 1 ? 'active' : ''">最新民意</p>
        <span v-if="menu == 1"></span>
      </div>
      <div @click="changeMenu(2)">
        <p :class="menu == 2 ? 'active' : ''">我的发布</p>
        <span v-if="menu == 2"></span>
      </div>
    </div>
    <!-- 最新民意 -->
    <div class="list" v-if="menu == 1">
      <ul>
        <li v-for="(item,index) in boxList" :key="index" @click="toDetail(item.id)">
          <div class="headbox">
            <img :src="item.picId?item.picId:require('@/assets/logo.png')" alt srcset />
          </div>
          <div class="name">{{ item.createUserName }}</div>
          <div class="position">类型:【{{ item.typeDesc }}】</div>
          <div class="tit" v-html="item.title"></div>
          <div class="time">{{item.createDate}}</div>
        </li>
      </ul>
    </div>
    <!-- 我的发布 -->
    <div class="list" v-if="menu == 2">
      <ul>
        <li
          v-for="(item,index) in boxList"
          :key="index"
          v-show="item.createUserName==userName"
          @click="toDetail(item.id)"
        >
          <div class="headbox">
            <img :src="item.picId?item.picId:require('@/assets/logo.png')" alt srcset />
          </div>
          <div class="name">{{ item.createUserName }}</div>
          <div class="position">类型:【{{ item.typeDesc }}】</div>
          <div class="tit" v-html="item.title"></div>
          <div class="time">{{item.createDate}}</div>
        </li>
      </ul>
    </div>
    <div class="btnbox">
      <router-link to="/release.html" class="btn">发布</router-link>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import { mailbox } from "@/apis";
export default {
  name: "mailbox",
  components: {
    MyHeader
  },
  data() {
    return {
      menu: 1, //1最新民意，2我的发布
      boxList: [],
      userName: JSON.parse(sessionStorage.getItem("userInfo")).name
    };
  },
  methods: {
    //切换
    changeMenu(e) {
      this.menu = e;
    },
    toDetail(id) {
      this.$router.push({
        path: "/poDetails.html",
        query: {
          id: id
        }
      });
    },
    // 获取书记信箱
    getmaibox() {
      mailbox({
        url: "/peopleOpinion/list"
      }).then(res => {
        if (res.code == 200) {
          this.boxList = res.data.list;
        }
      });
    }
  },
  created() {
    this.getmaibox();
  }
};
</script>
<style lang="stylus" scoped>
.mailbox {
  min-height: 100vh;
  background: #f8f8f8;
  padding-top: func(88);
  padding-bottom: func(44);

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
    margin-bottom: func(44);

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

  .list {
    ul {
      li {
        height: func(140);
        background: #ffffff;
        margin-top: func(8);
        position: relative;

        .headbox {
          width: func(40);
          height: func(40);
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: #f2f2f2;
          position: absolute;
          left: func(15);
          top: func(16);

          img {
            width: 100%;
          }
        }

        .name {
          position: absolute;
          top: func(18);
          left: func(64);
          color: #444444;
          font-size: func(14);
        }

        .position {
          position: absolute;
          top: func(42);
          left: func(64);
          color: #8A8A8A;
          font-size: func(12);
        }

        .tit {
          position: absolute;
          top: func(76);
          left: func(0);
          color: #444444;
          font-size: func(14);
          padding: func(0) func(15);
          box-sizing: border-box;
          nLine(1);
        }

        .time {
          position: absolute;
          bottom: func(20);
          left: func(15);
          color: #8A8A8A;
          font-size: func(12);
        }
      }
    }
  }

  .btnbox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    .btn {
      display: block;
      width: 100%;
      line-height: func(44);
      text-align: center;
      background: #6CB127;
      color: #FFFFFF;
      font-size: func(14);
    }
  }
}
</style>