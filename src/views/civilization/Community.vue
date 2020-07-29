<template>
  <div class="Community">
    <MyHeader :title="'社区文化'" />
    <Lines />
    <ul>
      <li v-for="(item , index) in newsList" :key="index">
        <NewsList v-if="item.showImg" :news="item" />
        <textList v-else :news="item" />
      </li>
    </ul>
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
  name: "Community",
  components: {
    MyHeader,
    Lines,
    NewsList,
    imageList,
    textList
  },
  data() {
    return {
      newsList: null
    };
  },
  methods: {
    getNewsClass(news_type = 114) {
      //news_type==18 老版本
      if (this.news_type) {
        news_type = this.news_type;
      }

      const data = {
        pageSize: 10,
        pageCurrent: 1,
        news_type
      };
      getNewsClass({
        data,
        currentObject: this
      }).then(msg => {
        if (~~msg.code === 1 && ~~msg.status === 200) {
          msg = msg.data.list;
          //news_type==18
          if (news_type === 114) {
            msg.forEach(item => {
              if (item.contentPic !== "null") {
                item.showImg = item.contentPic.split(",")[0];
                item.typeName = "党建要闻";
              }
            });
          }
          this.newsList = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    }
  },
  components: {
    Lines,
    NewsList,
    MyHeader,
    textList
  },
  created() {
    this.getNewsClass();
  }
};
</script>
<style lang="stylus" scoped>
.Community {
  width: 100%;
  padding-top: func(44);
  background: #E5E5E5;
}
</style>
