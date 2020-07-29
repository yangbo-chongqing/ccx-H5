<template>
  <div class="documentDetails">
    <MyHeader :title="'课程目录详情'" />
    <div class="content">
      <div class="title multiLine">{{list.classTitle}}</div>
      <div class="info">
        <div class="date">
          <div>{{list.createdate}}</div>
        </div>
      </div>
      <div class="center" v-html="list.classContent" />
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import { getClassDetails, saveVideo } from "@/apis";
export default {
  name: "documentDetails",
  components: {
    MyHeader
  },
  data() {
    return {
      list: [],
      id: this.$route.query.id,
      userID: "" //用户id
    };
  },
  methods: {
    getClassDetails() {
      let data = {
        classId: this.id
      };
      getClassDetails({
        url: "/fun/class/info",
        data: data
      }).then(res => {
        if (~~res.code === 200) {
          res = res.data;
          this.list = res;
        } else {
          //获取失败
          this.GToast({ message: "获取失败" });
        }
      });
    },
    //阅读增加积分
    saveVi() {
      saveVideo({
        data: {
          classId: this.list.classId,
          employeeId: this.userID,
          integralType: 7,
          integralNum: this.list.classIntegral,
          integralStatus: this.list.classStatus
        }
      }).then(res => {
        console.log(this.video);
        console.log(res);
      });
    }
  },
  created() {
    this.getClassDetails();
    let userInfo = JSON.parse(window.sessionStorage.userInfo);
    this.userID = userInfo.menberId;
    setTimeout(() => {
      this.saveVi();
    }, 20000);
  }
};
</script>
<style lang="stylus" scoped>
.documentDetails {
  padding-top: func(44);
  min-height: 100vh;
  background: #fff;

  .content {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;

    > .info {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      border-bottom: 1px solid #f4f4f4;
      padding-bottom: 0.5rem;

      > .date {
        font-size: 0.6rem;

        > div:last-child {
          color: #999;
        }
      }

      > .num {
        font-size: 0.5rem;
        display: flex;

        > div {
          color: #d33333;
        }
      }
    }

    > .center {
      margin-top: 0.5rem;
      text-indent: 2em;
    }
  }
}
</style>