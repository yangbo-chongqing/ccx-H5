<template>
  <div id="Collective">
    <MyHeader title="集体经济" />
    <div
      class="GoodsList"
      v-for="(item,index) in list"
      :key="index"
      @click="swiperPage(item.collective_economy_id)"
    >
      <img :src="item.pic | formatImg " alt="item.collective_economy_name" />
      <div :class="{content:true}">
        <h6 class="one">
          <span v-text="item.collective_economy_name" />
        </h6>
        <p class="one">
          <i class="iconfont">&#xe665;</i>
          <span v-text="item.affiliated_company" />
        </p>
        <p class="one">
          <i class="iconfont">&#xe603;</i>
          <span v-text="item.tel ? item.tel : ''" />
        </p>
        <p class="one">
          <i class="iconfont">&#xe602;</i>
          <span v-text="item.organizational_code ? item.organizational_code : ''" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import GoodsList from "../../components/estate/GoodsList";
import { getCollective } from "../../apis";
import md5 from "js-md5";

export default {
  name: "Collective",
  data() {
    return {
      list: []
    };
  },
  methods: {
    swiperPage(collective_economy_id) {
      this.switchPage({
        pageRouter: "/collectiveDetails.html",
        params: { collective_economy_id }
      });
    }
  },
  components: {
    MyHeader,
    GoodsList
  },
  created() {
    getCollective({ currentObject: this })
      .then(msg => {
        if (~~msg.status === 200) {
          msg = msg.data.list;
          msg.forEach(item => {
            item.tel = "电话：" + item.tel;
            item.organizational_code = "机构代码：" + item.organizational_code;
            item.affiliated_company = "所属：" + item.affiliated_company;
          });
          this.list = msg;
        } else {
          this.GToast({ message: "获取失败" });
        }
      })
      .catch(err => {
        this.GToast({ message: "网络错误" });
      });
  },
  mounted() {},
  filters: {},
  computed: {},
  watch: {}
};
</script>

<style scoped lang="stylus">
#Collective {
  width: 100%;
  box-sizing: border-box;
  padding-top: func(52);
  min-height: 100vh;
  background-color: #f8f8f8;

  > .GoodsList {
    width: 100%;
    height: func(120);
    box-sizing: border-box;
    padding: func(16) func(15) func(21.5) func(15);
    display: flex;
    justify-content: space-between;
    border-bottom: func(1) solid #f5f5f5;
    background-color: #fff;

    > img {
      width: func(110);
      height: func(82.5);
    }

    > .content {
      width: func(223);
      height: func(82.5);
      transition: all 0.4s;

      &.cell {
        color: #6CB127;
      }

      &.buy {
        color: #16DFA9;
      }

      > h6 {
        font-weight: 400;
        font-size: func(14);
        margin-bottom: func(4);

        span {
          color: #444;
        }
      }

      > p {
        box-sizing: border-box;
        padding-left: func(8);
        line-height: 1;
        margin-top: func(4);

        > i {
          margin-right: func(10);
          color: #6CB127;
        }

        >span {
          color: #8A8A8A;
          font-size: func(12);
        }
      }
    }
  }
}

#Collective > .GoodsList > .content > p > i {
  color: #16DFA9;
}
</style>
