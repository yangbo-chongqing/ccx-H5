<template>
  <!--办事指南页面-->
  <div id="Guide">
    <MyHeader :title="'办事指南'" :color="false" />
    <!--banner-->
    <img src="../../assets/img/convenience/bg1.png" />
    <List :listInfo="listInfo" :goType="goType" />
    <img src="../../assets/img/noData.png" v-show="listInfo.length === 0" />
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import List from "../../components/convenience/Guide/List";
import { getGuideType } from "../../apis";
export default {
  name: "Guide",
  data() {
    return {
      listInfo: []
    };
  },
  methods: {
    //去办事指南的类型
    goType(obj) {
      window.sessionStorage.setItem("guideTitle", obj.type_name);
      window.sessionStorage.setItem("guideTypeId", obj.type_id);
      this.$router.push("/GuideClass.html");
    },
    //获取办事指南
    getGuideType() {
      getGuideType({
        url: "/flowType/listByDept",
        data: {
          deptId: this.$store.state.userInfo.deptId
        },
        currentObject: this
      })
        .then(msg => {
          if (~~msg.code === 200) {
            msg = msg.data;
            this.listInfo = msg;
          } else {
            this.GToast({ message: "获取失败" });
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    }
  },
  components: {
    MyHeader,
    List
  },
  created() {
    this.getGuideType();
  }
};
</script>

<style scoped lang="stylus">
#Guide {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: func(44);
  background-color: #f8f8f8;

  > img {
    width: 100%;
    height: func(188);
  }
}
</style>
