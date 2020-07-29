<template>
  <div id="orgDetails">
    <MyHeader :title="'组织架构成员'" />
    <div class="list">
      <div class="person-list" v-for="(item , index) in list" :key="index">
        <img :src="item.mebImg" />
        <div class="list-right">
          <p>{{item.mebName}}</p>
          <p style="color:#8A8A8A;font-size:0.5rem">{{item.mebPosition}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { orgDetail } from "../../apis";
export default {
  name: "orgDetails",
  data() {
    return {
      orgId: "",
      list: []
    };
  },
  methods: {
    orgDetail() {
      orgDetail({
        url: "/fun/partyMember/list",
        data: {
          orgId: this.orgId
        }
      }).then(msg => {
        if (~~msg.code === 200) {
          msg = msg.data.list;
          this.list = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取失败" });
        }
      });
    }
  },
  components: {
    MyHeader
  },
  created() {
    this.orgId = this.$route.query.id;
    this.orgDetail();
  }
};
</script>

<style scoped lang="stylus">
#orgDetails {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .person-list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.6rem;
    border-bottom: 1px solid #f5f5f5;

    >img {
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
    }
  }

  .list-right>p {
    display: block;
    margin: 0 0 0.3rem 0.4rem;
    font-size: 0.6rem;
  }
}
</style>
