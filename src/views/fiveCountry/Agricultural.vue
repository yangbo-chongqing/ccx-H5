<template>
  <div id="Agricultural">
    <MyHeader :title="'在线学习'" />
    <div class="topmenu">
      <div @click="changeMenu(1)">
        <p :class="menu == 1 ? 'active' : ''">课程资源</p>
        <span v-if="menu == 1"></span>
      </div>
      <div @click="changeMenu(2)">
        <p :class="menu == 2 ? 'active' : ''">线下培训</p>
        <span v-if="menu == 2"></span>
      </div>
    </div>
    <Lines />
    <!-- 课程资源 -->
    <div class="attractions" v-if="menu == 1">
      <div class="item" v-for="(item , index) in list" :key="index" @click="handleFunc(item)">
        <img class="left" :src="item.people_pic" />
        <div class="right">
          <div class="title single">
            <p>{{item.title}}</p>
            <p>#{{item.typeName}}</p>
          </div>
          <div class="about multiLine">{{item.introduction}}</div>
          <div class="numberPeople">{{item.remark}}</div>
        </div>
      </div>
    </div>
    <!-- 线下培训 -->
    <div v-if="menu == 2">
      <div class="photo" v-for="(item , index) in Textlist" :key="index">
        <div @click="goText(item)">
          <div class="photo-main">
            <img :src="item.showImg" />
            <div class="photo-main-details">
              <div>
                <div class="photo-details-name">
                  <div style="color:#444">{{item.title}}</div>
                  <div>{{item.introduction}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Lines />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/public/MyHeader";
import Lines from "../../components/public/Lines";
import { getNewsClass } from "@/apis";
export default {
  name: "Agricultural",
  components: {
    MyHeader,
    Lines
  },
  data() {
    return {
      menu: 1, //1课程资源，2线下培训
      list: [],
      Textlist: []
    };
  },
  methods: {
    //切换
    changeMenu(e) {
      if (e == 1) {
        this.menu = e;
        this.news_type = 87;
        this.getNewsClass();
      } else {
        this.menu = e;
        this.news_type = 86;
        this.getNewsClass();
      }
    },
    getNewsClass(news_type = 87) {
      if (this.news_type) {
        news_type = this.news_type;
      }
      const data = {
        pageSize: 10,
        pageCurrent: 1,
        news_type
      };
      getNewsClass({
        data,
        currentObject: this
      }).then(msg => {
        if (~~msg.code === 1 && ~~msg.status === 200) {
          msg = msg.data.list;
          // 86 线下培训  87 课程资源
          if (news_type === 86) {
            msg.forEach(item => {
              if (item.contentPic && item.contentPic !== "null") {
                item.showImg = item.contentPic.split(",")[0];
              } else {
                item.showImg = require("../../assets/img/noImg.png");
              }
            });
            this.Textlist = msg;
          }
          if (news_type === 87) {
            msg.forEach(item => {
              if (item.contentPic && item.contentPic !== "null") {
                item.showImg = item.contentPic.split(",")[0];
              } else {
                item.showImg = require("../../assets/img/noImg.png");
              }
            });
            this.list = msg;
          }
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },
    // 课程资源
    handleFunc(item) {
      this.$router.push({ path: "/Video.html", query: { id: item.news_id } });
    },
    // 线下培训
    goText(item) {
      this.$router.push({
        path: "/AgriculturalDetails.html",
        query: { id: item.news_id }
      });
    }
  },
  created() {
    this.getNewsClass();
  }
};
</script>

<style scoped lang="stylus">
#Agricultural {
  padding-top: func(88);
  min-height: 100vh;
  background-color: #fff;
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

  .attractions {
    margin-top: 0.4rem;
    width: 100%;
    min-height: 15rem;
    background-color: #fff;
    box-sizing: border-box;

    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;

      img {
        height: 1rem;
        width: 60%;
      }

      div {
        font-size: 0.5rem;
        color: #aaa;
      }

      p:nth-child(2) {
        color: #6CB127;
        margin-left: 0.4rem;
      }
    }

    .item {
      display: flex;
      box-sizing: border-box;
      position: relative;
      border-bottom: 1px solid #f5f5f5;

      .left {
        width: 31%;
        height: 3.6rem;
        padding: 0.5rem;
      }

      .right {
        padding: 0.5rem 0;
        width: 55%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-size: 0.6rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .about {
          font-size: 0.5rem;
          color: #8A8A8A;
        }

        .numberPeople {
          font-size: 0.5rem;
          color: #6CB127;
          display: flex;

          div {
            color: #ff0000;
          }
        }
      }
    }
  }

  .multiLine {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .photo {
    border-top: 1px solid #f5f5f5;

    .photo-main-title {
      margin: 0.5rem;
      color: #444;
    }

    .photo-main img {
      width: 14rem;
      height: 7.8rem;
      display: block;
      margin: auto;
    }

    .photo-main-details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 0.6rem;
      margin-top: 0.4rem;

      >div:last-child {
        color: #999;

        span {
          color: #d33333;
        }
      }
    }

    .photo-details-name div:last-child {
      color: #999;
      font-size: 0.5rem;
      margin-top: 0.32rem;
    }
  }
}
</style>
