<template>
  <div id="Person">
    <MyHeader :title="'人才兴村'" />
    <img src="http://www.mlxc365.com/images/sxccx/icon/zhaopingonglue.png" alt />

    <!-- 三个按钮 -->
    <Swipe class="my-swipe swiper" width="110" :loop="false" :show-indicators="false">
      <SwipeItem v-for="(item , index) in swipeList" :key="index" @click="go(item.pageRouter)">
        <img :src="item.img" alt />
        <p>{{ item.title}}</p>
      </SwipeItem>
    </Swipe>
    <Lines />
    <Options />

    <!-- 人才列表 -->
    <div class="attractions">
      <div class="item" v-for="(item , index) in list" :key="index" @click="handleFunc(item)">
        <img class="left" :src="item.showImg" />
        <div class="right">
          <div class="title single">
            <p>{{item.expert_name}}</p>
            <p>#学习坊</p>
          </div>
          <div class="about multiLine">{{item.expert_profession}}</div>
          <div class="numberPeople">接待：{{item.time}}次</div>
        </div>
        <div class="btn" @click.stop="handlego(item)">预约</div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import Options from "../../components/fiveCountry/Options";
import Lines from "../../components/public/Lines";
import { Swipe, SwipeItem, Dialog, Form } from "vant";
import { getPerson } from "@/apis";
import md5 from "js-md5";
export default {
  name: "Person",
  data() {
    return {
      active: 0,
      swipeList: [
        {
          img: baseImgUrl + "Frame 236.png",
          pageRouter: "/Agricultural.html"
        },
        {
          img: baseImgUrl + "Frame 237.png",
          pageRouter: "/Talent.html"
        },
        {
          img: baseImgUrl + "Frame 238.png",
          pageRouter: "/College.html"
        }
      ],
      list: []
    };
  },
  methods: {
    // 获取专家列表
    getPerson() {
      const data = {
        pageSize: 10,
        pageCurrent: 1
      };
      getPerson({
        url: "/expert/subscribe/getListExpert",
        data
      }).then(msg => {
        if (~~msg.code === 0 && ~~msg.status === 200) {
          msg = msg.data.list;
          msg.forEach(item => {
            if (item.expert_pic && item.expert_pic !== "null") {
              item.showImg = item.expert_pic.split(",")[0];
            } else {
              item.showImg = require("../../assets/img/noImg.png");
            }
          });

          this.list = msg;
        } else {
          //获取失败
          this.GToast({ message: "暂无数据" });
        }
      });
    },
    go(src) {
      this.$router.push(src);
    },
    handleFunc(item) {
      this.$router.push({
        path: "/PersonDetails.html",
        query: { id: item.expert_id }
      });
    },
    handlego(item) {
      this.$router.push({
        path: "/Appointment.html",
        query: { id: item.expert_id }
      });
    }
  },
  components: {
    MyHeader,
    Options,
    Lines,
    Swipe,
    SwipeItem,
    Dialog
  },
  created() {
    this.getPerson();
  }
};
</script>

<style scoped lang="stylus">
#Person {
  width: 100%;
  min-height: 100vh;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .swiper {
    height: 2.5rem;
    padding: 0.6rem 0;

    .van-swipe-item {
      margin-left: 0.45rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    /deep/ .van-swipe__track {
      width: 40rem !important;
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

      .left {
        width: 24%;
        height: 3.6rem;
        padding: 0.5rem;
        border-radius: 50%;
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
          color: #444;
        }

        .numberPeople {
          font-size: 0.5rem;
          color: #8A8A8A;
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

  .btn {
    position: absolute;
    right: 0.5rem;
    top: 2rem;
    width: 2rem;
    height: 0.88rem;
    background: #6CB127;
    border-radius: 0.5rem;
    color: #fff;
    text-align: center;
  }
}
</style>
