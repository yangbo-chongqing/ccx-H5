<template>
  <div id="ResultDetails">
    <MyHeader :title="'结果详情'" :color="false" />
    <p />
    <div class="top">
      <div class="title" v-html="result.app_title" />
      <div class="other">
        <p v-html="result.popName" />
        <span v-html="result.app_date" />
      </div>
      <img v-if="result.app_status=='已处理'" src="../../assets/img/partyServices/ycl.png" alt />
      <!-- 已处理-->
      <img v-if="result.app_status=='处理中'" src="../../assets/img/partyServices/clz.png" alt />
      <!-- 处理中-->
      <img v-if="result.app_status=='未处理'" src="../../assets/img/partyServices/wcl.png" alt />
      <!-- 未处理-->

      <img v-if="result.app_status=='流转出'" src="../../assets/img/partyServices/outto.png" alt />
      <!-- 流转中-->
    </div>
    <div class="bottom">
      <div v-html="result.app_content" />
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
export default {
  name: "ResultDetails",
  data() {
    return {
      result: {}
    };
  },
  methods: {},
  components: {
    MyHeader
  },
  created() {
    this.result = window.JSON.parse(window.sessionStorage.getItem("resultObj"));
  },
  beforeDestroy() {
    window.sessionStorage.removeItem("resultObj");
  }
};
</script>

<style scoped lang="stylus">
#ResultDetails {
  width: 100%;
  min-height: 100vh;
  padding-top: func(44);
  box-sizing: border-box;

  > p {
    width: 100%;
    height: func(1) solid #f5f5f5 f;
    margin-bottom: func(8);
  }

  > .top {
    width: 100%;
    height: func(90);
    box-sizing: border-box;
    padding: 0 func(15);
    position: relative;

    > img {
      width: func(60);
      height: func(60);
    }

    > .title {
      width: 100%;
      height: func(40);
      line-height: func(20);
      nLine(2);
      color: #444;
      font-weight: 600;
    }

    > .other {
      width: 100%;
      height: func(50);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-bottom: func(1) solid #f5f5f5;

      > p {
        margin-right: func(24);
        color: #444;
        font-weight: 600;
      }

      >span {
        color: #999;
      }
    }

    > img {
      position: absolute;
      right: func(15);
      top: func(30);
    }
  }

  > .bottom {
    width: 100%;
    box-sizing: border-box;
    padding: 0 func(15);
    font-size: func(16);
    line-height: 1.5;

    div, span, p {
      font-size: func(16) !important;
      line-height: 1.5 !important;
    }

    p, div {
      text-indent: 2em;
    }

    img {
      max-width: 100%;
    }
  }
}
</style>
