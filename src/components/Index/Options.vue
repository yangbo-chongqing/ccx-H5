<template>
  <div id="Options">
    <div class="leftTitle">
      <img src="http://119.3.196.255:7604/images/iconPic/Frame 4.png" class="left" />
      <span>最新动态</span>
    </div>
    <div class="rightTitle">
      <ul>
        <li :class="{active : optionFlag === 0 }" @click="toggleFlag(0)">居务</li>
        <li :class="{active : optionFlag === 1  }" @click="toggleFlag(1)">惠民</li>
        <li :class="{active : optionFlag === 2  }" @click="toggleFlag(2)">村情</li>
        <li :class="{active : optionFlag === 3  }" @click="toggleFlag(3)">普法</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Options",
  props: {
    optionFlag: {
      type: Number,
      required: true
    },
    toggleFlag: {
      type: Function,
      required: true
    }
  },
  components: {},
  created() {}
};
</script>

<style scoped lang="stylus">
#Options {
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 func(10);
  padding-bottom: func(5);
  border-bottom: func(1) solid #e3e3e3;

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
    height: func(44);
    display: flex;
    justify-content: flex-end;

    ul {
      height: func(44);
      display: flex;
      align-items: center;

      li {
        padding: 0 func(3);
        font-size: func(14);
        margin-right: func(7);
        height: func(33);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        color: #8A8A8A;
        position: relative;

        &::after {
          position: absolute;
          content: '';
          width: 50%;
          height: func(2);
          bottom: 10%;
          transition: all 0.2s;
        }

        &.active {
          color: #4bb344;
          border-bottom: 1px solid #4bb344;
        }
      }
    }
  }
}
</style>
