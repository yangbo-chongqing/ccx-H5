<template>
  <div class="policy">
    <MyHeader :title="'政策法规'" />
    <div class="topmenu">
      <div @click="changeMenu(1)">
        <p :class="menu == 1 ? 'active' : ''">法规政策</p>
        <span v-if="menu == 1"></span>
      </div>
      <div @click="changeMenu(2)">
        <p :class="menu == 2 ? 'active' : ''">规章制度</p>
        <span v-if="menu == 2"></span>
      </div>
    </div>
    <!-- 法规政策 -->
    <div class="fagui" v-if="menu == 1">
      <NewsList />
      <div
        class="NewsList"
        @click="goNews(item.news_id)"
        v-for="(item,index) in getList"
        :key="index"
      >
        <img :src="item.showImg" />
        <div class="info">
          <h6>{{ item.title }}</h6>
          <p>
            <img :src="'locate.png' | formatUserImg" alt />
            <span>{{ item.areaName }}</span>
          </p>
          <p class="two">
            <span>
              <img :src="'tab_more_select.png' | formatUserImg" alt />
              <span>{{ item.CreateName }}</span>
            </span>
            <span>
              <img :src="'ic_time.png' | formatUserImg" alt />
              <span>{{item.create_date | formatTime}}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- 规章制度 -->
    <div class="fagui" v-if="menu == 2">
      <NewsList />
      <div
        class="NewsList"
        @click="goNews(item.news_id)"
        v-for="(item,index) in getList1"
        :key="index"
      >
        <img :src="item.showImg" />
        <div class="info">
          <h6>{{ item.title }}</h6>
          <p>
            <img :src="'locate.png' | formatUserImg" alt />
            <span>{{ item.areaName }}</span>
          </p>
          <p class="two">
            <span>
              <img :src="'tab_more_select.png' | formatUserImg" alt />
              <span>{{ item.CreateName }}</span>
            </span>
            <span>
              <img :src="'ic_time.png' | formatUserImg" alt />
              <span>{{item.create_date | formatTime}}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import NewsList from "@/components/public/NewsList";
import { getStatute, getSystem } from "@/apis";
export default {
  name: "policy",
  components: {
    MyHeader,
    NewsList
  },
  data() {
    return {
      menu: 1, //1法规政策，2规章制度
      getList: [], //政策法规列表
      getList1: [] //规章制度列表
    };
  },
  methods: {
    //切换
    changeMenu(e) {
      this.menu = e;
    },
    //获取政策法规
    getList2() {
      let data = {
        news_type: 2
      };
      getStatute({
        currentObject: this,
        data: data
      }).then(res => {
        res = res.data.list;
        res.forEach(item => {
          if (item.contentPic && item.contentPic !== "null") {
            item.showImg = item.contentPic.split(",")[0];
          } else {
            item.showImg = require("../../assets/img/noImg.png");
          }
        });
        this.getList = res;
      });
    },
    //获取规章制度
    getList3() {
      let data = {
        news_type: 6
      };
      getSystem({
        currentObject: this,
        data: data
      }).then(res => {
        res = res.data.list;
        res.forEach(item => {
          if (item.contentPic && item.contentPic !== "null") {
            item.showImg = item.contentPic.split(",")[0];
          } else {
            item.showImg = require("../../assets/img/noImg.png");
          }
        });
        this.getList1 = res;
      });
    },
    goNews(news_id) {
      this.switchPage({
        pageRouter: "/NewsDetails.html",
        params: {
          news_id
        }
      });
    }
  },
  created() {
    this.getList2();
    this.getList3();
  },
  filters: {
    formatTime(date) {
      let index = date.lastIndexOf(" "); //截取空格前的年月日  不要具体的时间
      return date.substring(0, index);
    },
    formatUserImg(img) {
      return baseImgUrl + img;
    }
  }
};
</script>
<style lang="stylus" scoped>
.policy {
  width: 100%;
  min-height: 100vh;
  background-color: #e5e5e5;
  padding-top: func(100);

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
        width: 50%;
        font-size: func(14);
        color: #8A8A8A;
        line-height: func(44);
        margin-left: 25%;
      }

      p.active {
        color: #6CB127;
        border-bottom: func(2) solid #6cb127;
      }
    }
  }

  .fagui {
    width: 100%;
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

      .two {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>