<template>
  <div id="PersonDetails">
    <MyHeader :title="'专家预约'" />
    <div class="attractions">
      <div class="item">
        <img class="left" :src="list.showImg" />
        <div class="right">
          <div class="title single">姓名：{{list.expert_name}}</div>
          <div class="title">电话：{{list.tel}}</div>
          <div class="about multiLine">学历：{{list.education}} {{list.time}}</div>
          <div class="numberPeople">类型：{{list.expert_profession}}</div>
        </div>
      </div>
      <div class="bottom" v-html="list.expert_content" />
    </div>
    <div class="next" @click="next(list.expert_id)">预约</div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { Swipe, SwipeItem, Dialog } from "vant";
import { getPersonDetails } from "@/apis";
export default {
  name: "PersonDetails",
  data() {
    return {
      list: {}
    };
  },
  methods: {
    getPersonDetails() {
      getPersonDetails({
        url: "/expert/subscribe/getOneExpert",
        data: {
          expert_id: this.$route.query.id
        }
      }).then(msg => {
        if (~~msg.code === 0) {
          msg = msg.data;
          if (msg.expert_pic && msg.expert_pic !== "null") {
            msg.showImg = msg.expert_pic.split(",")[0];
          } else {
            msg.showImg = require("../../assets/img/noImg.png");
          }
          this.list = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },
    next(id) {
      this.$router.push({ path: "/Appointment.html", query: { id: id } });
    }
  },
  components: {
    MyHeader,
    Dialog
  },
  created() {
    this.getPersonDetails();
  }
};
</script>

<style scoped lang="stylus">
#PersonDetails {
  width: 100%;
  min-height: 100vh;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .attractions {
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
        width: 34%;
        height: 6.68rem;
        padding: 0.5rem;
      }

      .right {
        padding: 0.5rem 0;
        width: 55%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .title {
          font-size: 0.5rem;
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
          display: flex;

          div {
            color: #ff0000;
          }
        }

        div {
          margin-top: 0.5rem;
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
  }

  .multiLine {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .next {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    line-height: func(43);
    text-align: center;
    font-size: func(16);
    color: #fff;
    background: #6CB127;
  }
}
</style>
