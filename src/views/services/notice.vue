<template>
  <div class="notice">
    <MyHeader :title="'通知快讯'" />
    <Lines />
    <NewsList v-for="(item, index) in list" :key="index" :news="item" />
    <img style="width:100%" src="../../assets/img/noData.png" v-show="list.length === 0" />
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import Lines from "@/components/public/Lines";
import NewsList from "@/components/public/NewsList";
import imageList from "@/components/public/imageList";
import textList from "@/components/public/textList";
import { getNewsClass } from "../../apis";
export default {
  name: "notice",
  components: {
    MyHeader,
    Lines,
    NewsList,
    imageList,
    textList
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    getNotice() {
      getNewsClass({
        data: {
          news_type: 33
        },
        currentObject: this
      }).then(msg => {
        if (~~msg.code === 1 && ~~msg.status === 200) {
          msg = msg.data.list;
          msg.forEach(item => {
            if (item.contentPic && item.contentPic !== "null") {
              item.showImg = item.contentPic.split(",")[0];
              item.isNotice = true;
            } else {
              item.showImg = require("../../assets/img/noImg.png");
              item.isNotice = true;
            }
          });
          this.list = msg;
        }
      });
    }
  },
  created() {
    this.getNotice();
  }
};
</script>
<style lang="stylus" scoped>
.notice {
  width: 100%;
  padding-top: func(44);
  background: #E5E5E5;
}
</style>
