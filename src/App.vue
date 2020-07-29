<template>
  <div id="app">
    <transition
      data-wow-duration="0.5s"
      enter-active-class="wow fadeIn"
      leave-active-class="wow  bounceOutRight leave"
    >
      <router-view class="animated" />
    </transition>
  </div>
</template>

<script>
import { WOW } from "wowjs";
export default {
  mounted() {
    new WOW().init({ live: false });
  }
};
</script>
<style lang="stylus">
@import 'assets/css/init.css';
@import 'assets/css/icon.css';
@import 'assets/css/resetFont.styl';
@import '~animate.css/animate.min.css';

.leave {
  position: absolute;
  display: none;
}

#app {
  min-width: 320px;
  width: 15rem;
  display: block;
  box-sizing: border-box;
}
</style>
