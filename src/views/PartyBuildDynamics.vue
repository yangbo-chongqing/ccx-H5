<template>
  <div id="PartyBuildDynamics">
    <MyHeader :title="'党建要闻'" />
    <div id="Options">
      <div class="rightTitle">
        <ul>
          <li :class="{active : flag === 0 }" @click="toggleFlag(0)">村社资讯</li>
          <li :class="{active : flag === 1  }" @click="toggleFlag(1)">街镇资讯</li>
          <li :class="{active : flag === 2  }" @click="toggleFlag(2)">省市资讯</li>
          <li :class="{active : flag === 3  }" @click="toggleFlag(3)">全国资讯</li>
        </ul>
      </div>
    </div>
    <ul class="aa">
      <li class="aa" v-for="(item , index) in newsList" :key="index">
        <NewsList class="aa" v-if="item.showImg" :news="item" />
        <textList class="aa" v-else :news="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import MyHeader from "../components/public/MyHeader";
import NewsList from "../components/public/NewsList";
import textList from "@/components/public/textList";
import { getNewsClass } from "../apis";
export default {
  name: "PartyBuildDynamics",
  data() {
    return {
      flag: 0,
      active: 2,
      news_type: null, // 32 村务 19 党务 33 政务
      newsList: null
    };
  },
  methods: {
    getNewsClass(news_type = 217) {
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
          // 32 村务 19 党务 33 政务
          if (news_type === 217) {
            msg.forEach(item => {
              if (item.contentPic !== "null") {
                item.showImg = item.contentPic.split(",")[0];
                item.typeName = "村社资讯";
              }
            });
          }
          if (news_type === 218) {
            msg.forEach(item => {
              if (item.contentPic !== "null") {
                item.showImg = item.contentPic.split(",")[0];
                item.typeName = "街镇资讯";
              }
            });
          }
          if (news_type === 219) {
            msg.forEach(item => {
              if (item.contentPic !== "null") {
                item.showImg = item.contentPic.split(",")[0];
                item.typeName = "省市资讯";
              }
            });
          }
          if (news_type === 220) {
            msg.forEach(item => {
              if (item.contentPic !== "null") {
                item.showImg = item.contentPic.split(",")[0];
                item.typeName = "全国资讯";
              }
            });
          }
          this.newsList = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },
    toggleFlag(flag) {
      switch (flag) {
        case 0:
          this.news_type = 217;
          break;
        case 1:
          this.news_type = 218;
          break;
        case 2:
          this.news_type = 219;
          break;
        default:
          this.news_type = 220;
      }
      this.flag = flag;
      this.getNewsClass();
    }
  },
  components: {
    MyHeader,
    NewsList,
    textList
  },
  created() {
    this.getNewsClass();
  }
};
</script>

<style scoped lang="stylus">
#PartyBuildDynamics {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }
}

#Options {
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 func(10);
  padding-bottom: func(5);
  border-bottom: func(1) solid #e3e3e3;

  .rightTitle {
    width: 100%;
    height: func(44);
    display: flex;
    justify-content: flex-end;

    ul {
      width: 100%;
      height: func(44);
      display: flex;
      align-items: center;
      justify-content: space-around;

      li {
        padding: 0 func(10);
        font-size: func(14);
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
          border-bottom: func(2) solid #6CB127;
        }
      }
    }
  }
}
</style>
