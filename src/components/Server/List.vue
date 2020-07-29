<template>
  <div id="List">
    <div class="item" v-for="(item , index) in serverList" :key="index">
      <div class="title">
        <img :src="item.titleImg" alt />
        <span>{{item.title}}</span>
      </div>
      <div class="info">
        <div v-for="(i , j) in item.list" :key="j" @click="goPage(i)">
          <img :src="i.img" alt />
          <p>{{ i.title }}</p>
        </div>
      </div>
      <Lines />
    </div>
  </div>
</template>

<script>
import Lines from "../public/Lines";
import { Dialog } from "vant";
export default {
  name: "List",
  props: {
    serverList: {
      type: Array,
      required: true
    }
  },
  methods: {
    goPage(obj) {
      let userInfo = this.$store.state.userInfo || "";
      if (!userInfo) {
        Dialog.confirm({
          title: "温馨提示",
          message: "您尚未登录，是否前往登录页面？"
        }).then(() => {
          this.$router.push("/login.html");
        });
      } else if (!userInfo.isMenber && obj.isMember) {
        Dialog.confirm({
          title: "温馨提示",
          message: "您不是党员，是否前往绑定党员信息？"
        }).then(() => {
          this.$router.push("/profile.html");
        });
      } else {
        console.log(obj);
        this.go(obj);
      }
    },
    go(obj) {
      this.switchPage({
        pageRouter: obj.pageRouter
      });
    }
  },
  components: {
    Lines
  },
  created() {}
};
</script>

<style scoped lang="stylus">
#List {
  width: 100%;

  .item {
    width: 100%;

    .title {
      width: 100%;
      height: 44px;
      border-bottom: 1px solid #f8f8f8;
      color: #444;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 10px;

      img {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }

      span {
        color: #444;
      }
    }

    .info {
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      flex-wrap: wrap;

      > div {
        width: 25%;
        height: 96px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        > img {
          width: 44px;
          height: 44px;
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>
