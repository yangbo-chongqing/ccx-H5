<template>
  <div id="member">
    <MyHeader :title="'党员学习'" />
    <img :src="banner" alt />
    <div id="Tools">
      <div v-for="(item , index) in toolsList" :key="index" @click="go(item.pageRouter)">
        <img :src="item.img" />
        <p>{{ item.title }}</p>
      </div>
    </div>
    <Lines />
    <!-- <Options /> -->
    <div id="Options">
      <div class="leftTitle">
        <img src="../../assets/img/study/ztjy.png" class="left" />
      </div>
      <div class="rightTitle">
        <ul>
          <li :class="{active : flag === 0 }" @click="toggleFlag(0)">治党治国</li>
          <li :class="{active : flag === 1  }" @click="toggleFlag(1)">党的历程</li>
        </ul>
      </div>
    </div>
    <div v-if="flag==0">
      <div
        class="NewsList"
        @click="goNews(item.news_id)"
        v-for="(item,index) in boxList"
        :key="index"
      >
        <img :src="item.contentPic | formatImg" />
        <div class="info">
          <h6>
            <!-- <span v-show="!item.isNotice">「{{item.typeName | formatType}}」</span> -->
            {{ item.title }}
          </h6>
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
    <div v-if="flag==1">
      <div
        class="NewsList"
        @click="goNews(item.news_id)"
        v-for="(item,index) in roadList"
        :key="index"
      >
        <img :src="item.contentPic | formatImg" />
        <div class="info">
          <h6>
            <!-- <span v-show="!item.isNotice">「{{item.typeName | formatType}}」</span> -->
            {{ item.title }}
          </h6>
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
import Lines from "@/components/public/Lines";
// import Options from "@/components/member/newOptions";
import { getStudy, getroad } from "@/apis";
export default {
  name: "member",
  components: {
    MyHeader,
    Lines
    // Options
  },
  data() {
    return {
      flag: 0,
      toolsList: [
        {
          title: "在线学习",
          img: baseImgUrl + "dyxx_1.png",
          pageRouter: "/onlineLearning.html"
        },
        {
          title: "在线考试",
          img: baseImgUrl + "dyxx_2.png",
          pageRouter: "/zxks.html"
        },
        // {
        //   title: "三会一课",
        //   img: baseImgUrl + "dyxx_3.png",
        //   pageRouter: "/threeSessions.html"
        // },
        {
          title: "法规政策",
          img: baseImgUrl + "dyxx_4.png",
          pageRouter: "/policy.html"
        }
      ],
      boxList: [], //治党治国列表
      roadList: [], //党的历程列表

      banner: baseImgUrl + "banner.png"
    };
  },
  methods: {
    go(pageRouter) {
      this.switchPage({ pageRouter });
    },
    //切换
    toggleFlag(flag) {
      this.flag = flag;
      if (this.flag == 0) {
        this.getStudys();
      } else {
        this.getroads();
      }
    },
    //获取治党治国
    getStudys() {
      let data = {
        news_type: 8
      };
      getStudy({
        data: data,
        currentObject: this
      }).then(res => {
        if (res.code == 1) {
          this.boxList = res.data.list;
        }
      });
    },
    //获取党的历程
    getroads() {
      let data = {
        news_type: 48
      };
      getroad({
        data: data,
        currentObject: this
      }).then(res => {
        if (res.code == 1) {
          this.roadList = res.data.list;
        }
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
  filters: {
    formatTime(date) {
      let index = date.lastIndexOf(" "); //截取空格前的年月日  不要具体的时间
      return date.substring(0, index);
    },
    formatType(type) {
      if (type === "党务公开") {
        return "党务";
      } else if (type === "村务公开") {
        return "村务";
      } else {
        return "政务";
      }
    },
    formatImg(pic) {
      if (pic) {
        return require("../../assets/img/noImg.png"); //如果后台提供的图片地址为null，使用默认图片
      }
    },
    formatUserImg(img) {
      return baseImgUrl + img;
    }
  },
  created() {
    this.getStudys();
  }
};
</script>
<style scoped lang="stylus">
#member {
  padding-top: func(44);

  > img {
    max-width: 100%;
  }

  #Tools {
    width: 100%;
    height: func(106);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 func(15);

    div {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: func(44);
        height: func(44);
        margin-bottom: func(12);
      }

      p {
        width: 100%;
        color: #444;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  #Options {
    width: 100%;
    height: 54px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 func(10);
    padding-bottom: func(5);
    border-bottom: func(1) solid #e3e3e3;

    .leftTitle {
      width: 50%;
      height: func(44);
      display: flex;
      align-items: center;

      .left {
        height: func(22);
        margin-right: func(15);
      }

      .right {
        width: func(120);
        height: func(33);
      }
    }

    .rightTitle {
      width: 50%;
      height: func(44);
      display: flex;
      justify-content: flex-end;

      ul {
        height: func(44);
        display: flex;
        align-items: center;

        li {
          padding: 0 func(4);
          margin-right: func(6);
          font-size: func(14);
          height: func(33);
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          color: #8A8A8A;
          position: relative;

          &::after {
            position: absolute;
            content: '';
            width: 50%;
            height: func(2);
            bottom: 10%;
            transition: all 0.2s;
          }

          &.active {
            color: #4bb344;
            border-bottom: 2px solid #6CB127;
          }
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
