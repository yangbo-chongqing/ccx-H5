<template>
  <div id="Tools">
    <div v-for="(item , index) in toolsList" :key="index" @click="go(item.pageRouter)">
      <img :src="item.titleImg" />
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tools",
  data() {
    return {
      toolsList: [
        {
          title: "换届选举",
          titleImg: baseImgUrl + "zzjs1.png",
          pageRouter: "/election.html"
        },
        {
          title: "书记考核",
          titleImg: baseImgUrl + "zzjs2.png",
          pageRouter: "/secretary.html"
        },
        {
          title: "投票调研",
          titleImg: baseImgUrl + "zzjs3.png",
          pageRouter: "/pollresearch.html"
        },
        // {
        //     title:"党员发展",
        //     titleImg:baseImgUrl+"zzjs5.png",
        //     pageRouter:"/development.html"
        // },
        {
          title: "关系转移",
          titleImg: baseImgUrl + "zzjs4.png",
          pageRouter: "/relational.html"
        },
        {
          title: "组织架构",
          titleImg: baseImgUrl + "zzjs7.png",
          pageRouter: "/orgStructure.html"
        },
        {
          title: "外出登记",
          titleImg: baseImgUrl + "zzjs8.png",
          pageRouter: "/outregistration.html"
        }
      ]
    };
  },
  methods: {
    go(src) {
      this.$router.push(src);
    }
  },
  components: {},
  created() {}
};
</script>

<style scoped lang="stylus">
#Tools {
  width: 100%;
  height: func(200);
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;

  div {
    width: 25%;
    height: func(100);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-bottom: func(1) solid #E6E6E6;
    border-right: func(1) solid #E6E6E6;

    &:nth-of-type(4n) {
      border-right: 0;
    }

    &:nth-of-type(n + 5) {
      border-bottom: 0;
    }

    img {
      width: func(44);
      height: func(44);
      margin-bottom: func(10);
    }

    p {
      margin: 0;
    }
  }
}
</style>