<template>
  <div id="MyHeader" :class="{isTransparent:bg}">
    <i class="iconfont" @click="goBack">&#xe638;</i>
    <slot>
      <span>{{ title }}</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  props: {
    title: {
      type: String,
      required: true
    },
    bg: {
      type: Boolean,
      required: false,
      default: false
    },
    back: {
      type: Function,
      required: false,
      default: function() {}
    }
  },
  methods: {
    goBack() {
      this.back();
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="stylus">
#MyHeader {
  min-width: 320px;
  max-width: 750px;
  width: 15rem;
  height: func(44);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  z-index: 2;

  &.isTransparent {
    background-color: transparent;
  }

  span {
    font-size: func(18);
  }

  i {
    position: absolute;
    top: 50%;
    left: func(10);
    transform: translateY(-40%);
    font-size: func(20);
  }
}
</style>
