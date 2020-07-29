<template>
  <div id="GuideDetails">
    <MyHeader title="办理详情" />
    <MyTitle :title="'办理事项'" :info="guide.flow_name" />
    <MyTitle :title="'补助标准'" :info="guide.flow_file" />
    <MyTitle :title="'所属类型'" :info="guide.type_name" />
    <MyTitle :title="'责任科室'" :info="guide.areaName" />
    <MyTitle :title="'单位电话'" :info="guide.link_phone" />
    <MyTitle :title="'办理说明'" :info="guide.flow_info" />
    <MyTitle :title="'所需费用'" :info="guide.flow_money" />
    <MyTitle :title="'办理流程'" :info="guide.flow_content" />
    <div class="button" @click="goOnLine">在线办理</div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import MyTitle from "../../components/convenience/public/MyTitle";
import { getGuideDetails } from "../../apis";
export default {
  name: "GuideDetails",
  data() {
    return {
      guide: {}
    };
  },
  methods: {
    //去在线办理页面
    goOnLine() {
      this.switchPage({ pageRouter: "/OnLine.html", params: {} });
      this.$router.push("/OnLine.html");
    },
    getGuideDetails(flow_id) {
      getGuideDetails({
        url: "/flow/get",
        currentObject: this,
        data: {
          flow_id
        }
      }).then(msg => {
        if (~~msg.code === 200) {
          this.guide = msg.data;
        }
      });
    }
  },
  components: {
    MyHeader,
    MyTitle
  },
  created() {
    const flow_id = window.sessionStorage.getItem("guideDetaiilsFlowId");
    this.getGuideDetails(flow_id);
  }
};
</script>

<style scoped lang="stylus">
#GuideDetails {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: func(44);
  padding-left: func(15);
  padding-right: func(15);
  padding-bottom: func(44);

  > .button {
    width: func(375);
    height: func(44);
    background-color: #6CB127;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}
</style>
