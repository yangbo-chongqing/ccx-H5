<template>
  <div id="PartyBuild">
    <MyHeader :title="'党建动态'" />
    <img src="http://www.mlxc365.com/images/sxccx/icon/djdt_bg.png" alt />
    <Tools />
    <Lines />
    <Options />
    <ul>
      <li v-for="(item , index) in newsList" :key="index">
        <NewsList :news="item" />
        <!--v-if="item.showImg" -->
        <!-- <textList v-else :news="item"/> -->
      </li>
    </ul>
  </div>
</template>

<script>
import Tools from "../components/PartyBuild/Tools";
import Lines from "../components/public/Lines";
import NewsList from "../components/public/NewsList";
import Options from "../components/PartyBuild/Options";
import MyHeader from "../components/public/MyHeader";
import textList from "@/components/public/textList";
import { getNewsClass } from "../apis";
export default {
  name: "PartyBuild",
  data() {
    return {
      newsList: [] //党建要闻
    };
  },
  methods: {
    getNewsClass(news_type = 217) {
      if (this.news_type) {
        news_type = this.news_type;
      }

      const data = {
        pageSize: 3,
        pageCurrent: 1,
        news_type
      };
      getNewsClass({
        data,
        currentObject: this
      }).then(msg => {
        if (~~msg.code === 1 && ~~msg.status === 200) {
          msg = msg.data.list;
          if (news_type === 217) {
            msg.forEach(item => {
              if (item.contentPic !== "null") {
                item.showImg = (item.contentPic || "").split(",")[0];
                item.typeName = "党建要闻";
              }
            });
          }
          this.newsList = this.newsList.concat(msg);
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },
    getNewsClass1(news_type = 219) {
      if (this.news_type) {
        news_type = this.news_type;
      }
      const data = {
        pageSize: 3,
        pageCurrent: 1,
        news_type
      };
      getNewsClass({
        data,
        currentObject: this
      }).then(msg => {
        if (~~msg.code === 1 && ~~msg.status === 200) {
          msg = msg.data.list;
          if (news_type === 219) {
            msg.forEach(item => {
              if (item.contentPic !== "null") {
                item.showImg = (item.contentPic || "").split(",")[0];
                item.typeName = "党建要闻";
              }
            });
          }
          this.newsList = this.newsList.concat(msg);
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },
    getNewsClass2(news_type = 220) {
      if (this.news_type) {
        news_type = this.news_type;
      }

      const data = {
        pageSize: 3,
        pageCurrent: 1,
        news_type
      };
      getNewsClass({
        data,
        currentObject: this
      }).then(msg => {
        if (~~msg.code === 1 && ~~msg.status === 200) {
          msg = msg.data.list;
          if (news_type === 220) {
            msg.forEach(item => {
              if (item.contentPic !== "null") {
                item.showImg = (item.contentPic || "").split(",")[0];
                item.typeName = "党建要闻";
              }
            });
          }
          this.newsList = this.newsList.concat(msg);
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },
    getNewsClass3(news_type = 218) {
      if (this.news_type) {
        news_type = this.news_type;
      }

      const data = {
        pageSize: 3,
        pageCurrent: 1,
        news_type
      };
      getNewsClass({
        data,
        currentObject: this
      }).then(msg => {
        if (~~msg.code === 1 && ~~msg.status === 200) {
          msg = msg.data.list;
          if (news_type === 218) {
            msg.forEach(item => {
              if (item.contentPic !== "null") {
                item.showImg = (item.contentPic || "").split(",")[0];
                item.typeName = "党建要闻";
              }
            });
          }
          this.newsList = this.newsList.concat(msg);
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },
    async getAll() {
      await this.getNewsClass();
      await this.getNewsClass1();
      await this.getNewsClass2();
      await this.getNewsClass3();
    }
  },
  components: {
    Tools,
    Lines,
    NewsList,
    Options,
    MyHeader,
    textList
  },
  created() {
    this.getAll();
  }
};
</script>

<style scoped lang="stylus">
#PartyBuild {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }
}
</style>
