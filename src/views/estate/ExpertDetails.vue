<template>
  <div id="ExpertDetails">
    <MyHeader title="专家详情" />
    <Lines />
    <main>
      <div class="top">
        <img :src="expert.expert_pic" alt />
        <div>
          <p>
            <label>姓名：</label>
            <span>{{expert.expert_name}}</span>
          </p>
          <p>
            <label>性别：</label>
            <span>{{expert.expert_sex}}</span>
          </p>
          <p>
            <label>电话：</label>
            <span>{{expert.tel}}</span>
          </p>
          <p>
            <label>出生日期：</label>
            <span>{{expert.birthday}}</span>
          </p>
          <p>
            <label>政治面貌：</label>
            <span>{{expert.face}}</span>
          </p>
          <p>
            <label>学历：</label>
            <span>{{expert.education}}</span>
          </p>
          <p>
            <label>职称：</label>
            <span>{{ expert.technical }}</span>
          </p>
        </div>
      </div>
      <div class="middle">
        <p>
          <label>单位及职务：</label>
          <span>{{ expert.unit_duty }}</span>
        </p>
        <p>
          <label>专家类型：</label>
          <span>{{ expert.expert_type | format}}专家</span>
        </p>
        <p>
          <label>职业类别：</label>
          <span>{{ expert.expert_profession }}</span>
        </p>
        <p>
          <label>职业方向：</label>
          <span>{{ expert.direction }}</span>
        </p>
        <p>
          <label>备注：</label>
          <span>{{ expert.remark }}</span>
        </p>
      </div>
      <p>生平简介：</p>
      <div class="introduction" v-html="expert.expert_content"></div>
    </main>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import Lines from "../../components/public/Lines";
import { expertDetails } from "../../apis";

export default {
  name: "ExpertDetails",
  data() {
    return {
      expert: {}
    };
  },
  methods: {},
  components: {
    MyHeader,
    Lines
  },
  created() {
    const expert_id = this.decodeBase64(this.$route.query).expert_id;
    expertDetails({ data: { expert_id } })
      .then(msg => {
        if (~~msg.code === 0 && ~~msg.status === 200) {
          msg = msg.data;
          this.expert = msg;
        } else {
          this.GToast({ message: "获取信息失败" });
        }
      })
      .catch(err => {
        this.GToast({ message: "网络错误" });
      });
  },
  mounted() {},
  filters: {
    format(type) {
      if (~~type === 0) {
        return "农业";
      } else {
        return "其他";
      }
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped lang="stylus">
#ExpertDetails {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: func(44);

  > main {
    width: 100%;
    box-sizing: border-box;
    padding: func(15);

    > .top {
      display: flex;

      > img {
        width: func(127);
        height: func(167);
        margin-right: func(12);
      }

      > div {
        > p {
          line-height: 1;
          margin-bottom: func(12);
        }
      }
    }

    > .middle {
      > p {
        line-height: 1;
        margin-bottom: func(12);
      }
    }

    > .introduction {
      text-indent: 2em;

      >>> img {
        max-width: 100%;
      }
    }
  }
}
</style>
