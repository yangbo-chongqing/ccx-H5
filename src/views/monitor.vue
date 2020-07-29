<template>
  <div class="monitor">
    <MyHeader :title="'疫情监控'" />
    <div class="blackline"></div>
    <monitorComponent />
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import monitorComponent from "../components/monitor/monitorComponent";

export default {
  name: "monitor",
  components: {
    MyHeader,
    monitorComponent
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
.blackline {
  margin-top: func(44);
  width: 100%;
  height: func(1);
  background: #ccc;
}

.listBox {
  padding: 0 func(15);

  >.videoList {
    border-bottom: 1px solid #ccc;
    height: func(73);
    display: flex;
    align-items: center;
    justify-content: space-between;

    >p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 80%;
    }

    >img {
      width: func(47);
      height: func(38);
      display: block;
    }
  }
}
</style>