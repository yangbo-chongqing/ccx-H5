<template>
  <div class="integralDetails">
    <MyHeader :title="'积分详情'" />
    <div class="content" v-for="(item, index) in list" :key="index">
      <div class="box">
        <p>{{item.createDate | getMonth }}月</p>
        <span>{{item.createDate | getDate }}</span>
      </div>
      <span class="span01">{{item.createDate | formatTime }}{{item.integralTypeDesc}}</span>
      <span class="span02">+{{item.integralNum}}分</span>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import { integerDetails } from "../../apis";
export default {
  name: "integralDetails",
  components: {
    MyHeader
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    integerDetails()
      .then(msg => {
        if (~~msg.code === 200) {
          this.list = msg.data;
        } else {
          this.GToast({ message: "获取失败" });
        }
      })
      .catch(err => {
        this.GToast({ message: "网络错误" });
      });
  },
  filters: {
    getMonth(time) {
      time = new Date(time).getMonth() + 1; //月
      if (time < 10) {
        time = "0" + time;
      }
      return time;
    },
    getDate(time) {
      return new Date(time).getDate();
    },
    formatTime(time) {
      time = new Date(time);
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const date = time.getDate();
      return `${year}年${month}月${date}`;
    }
  }
};
</script>
<style lang="stylus" scoped>
.integralDetails {
  width: 100%;
  padding-top: func(44);

  .content {
    width: 100;
    padding: func(16) func(19) func(21) func(15);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .box {
      width: func(30);
      text-align: center;

      p {
        color: #8A8A8A;
        font-size: func(14);
      }

      span {
        color: #6CB127;
        font-size: func(14);
      }
    }

    .span01 {
      color: #8A8A8A;
    }

    .span02 {
      color: #6CB127;
    }
  }
}
</style>
