<template>
  <div id="List">
    <div v-for="(item , index) in listInfo" :key="index" @click="goType(item)">
      <img style="width:50px" :src="item.type_img | formatImg" />
      <p>{{ item.type_name }}</p>
    </div>
  </div>
</template>

<script>
const baseURL = "http://www.mlxc365.com";
export default {
  name: "List",
  props: {
    listInfo: {
      type: Array,
      required: true
    },
    goType: {
      type: Function,
      required: true
    }
  },
  methods: {},
  components: {},
  created() {},
  filters: {
    formatImg(img) {
      return img.indexOf("http") === -1 ? baseURL + img : img;
    }
  }
};
</script>

<style scoped lang="stylus">
#List {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 50%;
    height: func(106);
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > img {
      width: func(44);
      height: func(44);
      margin-bottom: func(12);
    }

    > p {
      font-size: func(14);
      color: #444;
    }
  }
}
</style>
