<template>
  <div id="Options">
    <div class="leftTitle">
      <img src="http://119.3.196.255:7604/images/iconPic/Frame 4.png" class="left" />
      <span>景区介绍</span>
    </div>
    <div class="rightTitle">
      <router-link to="/BeautifulCountry.html">
        <span>更多</span>
        <i class="iconfont">&#xe636;</i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Options",
  data() {
    return {};
  },
  methods: {},
  components: {},
  created() {}
};
</script>

<style scoped lang="stylus">
#Options {
  width: 100%;
  height: func(54);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 func(10);
  padding-bottom: func(5);
  border-bottom: 1px solid #e3e3e3;

  .leftTitle {
    width: 50%;
    height: func(44);
    display: flex;
    align-items: center;

    .left {
      width: func(22);
      height: func(22);
      margin-right: func(15);
    }

    .right {
      width: func(120);
      height: func(33);
    }
  }

  .rightTitle {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
