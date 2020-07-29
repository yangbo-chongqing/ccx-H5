<template>
  <div id="CollectiveDetails">
    <MyHeader title="集体经济详情" />
    <img :src="obj.pic" />
    <main>
      <Single title="企业名称" :info="obj.affiliated_company" />
      <Single title="组织机构代码" :info="obj.organizational_code" />
      <Single title="联系方式" :info="obj.tel" />
      <Single title="简介" :info="obj.introduce" />
    </main>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { getCollectiveDetails } from "../../apis";
import Single from "../../components/CollectiveDetails/Single";
export default {
  name: "CollectiveDetails",
  data() {
    return {
      obj: {}
    };
  },
  methods: {},
  components: {
    MyHeader,
    Single
  },
  created() {
    const collective_economy_id = this.decodeBase64(this.$route.query)
      .collective_economy_id;
    getCollectiveDetails({ data: { collective_economy_id } })
      .then(msg => {
        if (~~msg.status === 200) {
          this.obj = msg.data;
        } else {
          this.GToast({ message: "请求失败" });
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
#CollectiveDetails {
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: func(44);

  > img {
    width: 100%;
  }

  >main {
    width: 100%;
    box-sizing: border-box;
    padding: func(12) func(15);
  }
}
</style>
