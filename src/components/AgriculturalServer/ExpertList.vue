<template>
  <div class="ExpertList" @click="goDetails(expert.expert_id)">
    <img :src="expert.expert_pic | formatImg" alt />
    <div>
      <h6>{{ expert.expert_name }}</h6>
      <p>{{ expert.expert_profession }}</p>
      <span>{{ expert.direction }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpertList",
  props: {
    expert: {
      type: Object,
      required: true
    }
  },
  methods: {
    //跳转详情页
    goDetails(expert_id) {
      this.switchPage({
        pageRouter: "/expertDetails.html",
        params: { expert_id }
      });
    }
  },
  components: {},
  created() {},
  mounted() {},
  filters: {},
  computed: {},
  watch: {}
};
</script>

<style scoped lang="stylus">
.ExpertList {
  width: 100%;
  height: func(126);
  box-sizing: border-box;
  border-bottom: func(1) solid #e5e5ea;
  display: flex;
  padding: 0 func(13.5);
  align-items: center;

  > img {
    width: func(91.5);
    height: func(90);
    border-radius: 50%;
    margin-right: func(12);
  }

  > div {
    width: 75%;
    height: func(70);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > h6 {
      font-size: func(16);
      color: #444;
      font-weight: 400;
    }

    > p {
      font-size: func(14);
      color: #444;
    }

    >span {
      font-size: func(12);
      color: #8A8A8A;
    }
  }
}
</style>
