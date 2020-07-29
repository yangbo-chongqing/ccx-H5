<template>
  <div id="poverty">
    <MyHeader :title="'扶贫动态'" />
    <img src="../../assets/img/partyBuild/partyBuild.png" alt />
    <!-- 导航 -->
    <div id="Options">
      <div class="rightTitle">
        <ul>
          <li :class="{active : flag === 0 }" @click="toggleFlag(0)">扶贫动态</li>
          <li :class="{active : flag === 1  }" @click="toggleFlag(1)">扶贫项目</li>
        </ul>
      </div>
    </div>

    <!-- 扶贫动态 -->
    <div v-if="flag==0">
      <ul>
        <li v-for="(item , index) in newsList" :key="index" @click="goDetails(item)">
          <NewsList :news="item" />
          <!-- v-if="item.showImg" -->
          <!-- <textList v-else :news="item" /> -->
        </li>
      </ul>
    </div>

    <!-- 扶贫项目 -->
    <div class="dynamicBox" v-if="flag==1">
      <div class="lestone">
        <div v-for="(item , index) in proList" :key="index" class="allbox" @click="goNews(item)">
          <div class="imgbox">
            <img :src="item.project_pic | formatImg" />
          </div>
          <div class="textbox">
            <div class="onetext">
              名称:
              <span>{{item.project_name}}</span>
            </div>
            <div class="twotext">
              类型:
              <span>{{ item.typeName }}</span>
            </div>
            <div class="tretext">
              进度:
              <div class="trebox">
                <div :style="'width:'+item.project_progress + '%'"></div>
              </div>
              {{ item.project_progress }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import NewsList from "../../components/public/NewsList";
import textList from "../../components/public/textList";
import { getNewsClass, getProList } from "../../apis";
export default {
  name: "poverty",
  data() {
    return {
      flag: 0,
      active: 2,
      newsList: null,
      proList: []
    };
  },
  methods: {
    // 扶贫动态
    getNewsClass(news_type = 20) {
      if (this.news_type) {
        news_type = this.news_type;
      }

      const data = {
        pageSize: 10,
        pageNum: 1,
        news_type
      };
      getNewsClass({
        data,
        currentObject: this
      }).then(msg => {
        if (~~msg.code === 1 && ~~msg.status === 200) {
          msg = msg.data.list;
          if (news_type === 20) {
            msg.forEach(item => {
              if (item.contentPic !== "null") {
                item.showImg = item.contentPic.split(",")[0];
                item.typeName = "扶贫动态";
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
    // 扶贫过程
    getProList() {
      getProList({
        url: "/country/projectHelpPoor/getList",
        data: {
          app: "true"
        },
        currentObject: this
      }).then(msg => {
        if (~~msg.code === 0) {
          msg = msg.data.list;
          this.proList = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取失败" });
        }
      });
    },
    toggleFlag(flag) {
      this.flag = flag;
    },
    goDetails(item) {
      // this.$router.push({path:'/dynamicDetails.html',query:{ id:item.news_id}});
    },
    goNews(item) {
      this.$router.push({
        path: "/projectDetails.html",
        query: { id: item.project_id }
      });
    }
  },
  components: {
    MyHeader,
    NewsList,
    textList
  },
  created() {
    this.getNewsClass();
    this.getProList();
  }
};
</script>

<style scoped lang="stylus">
#poverty {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .dynamicBox {
    width: 100%;
    background: #ffffff;
    padding: 0 0.6rem 0 0.6rem;
    box-sizing: border-box;
  }

  .allbox {
    border-bottom: 1px solid #dadada;
    margin-top: 0.5rem;
    width: 47%;
    margin-right: 0.2rem;
  }

  .lestone {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .imgbox {
      width: 6.72rem;
      height: 5rem;
      overflow: hidden;
      display: flex;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .textbox {
      margin-top: 0.5rem;
      width: 6.72rem;

      .onetext {
        font-size: 0.6rem;
        color: #444444;
        margin-bottom: 0.6rem;
      }

      .twotext {
        font-size: 0.6rem;
        color: #444444;
        margin-bottom: 0.6rem;

        span {
          color: #6CB127;
        }
      }

      .tretext {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.5rem;
        color: #444444;
        margin-bottom: 0.6rem;

        .trebox {
          width: 4rem;
          height: 0.1rem;
          background: #DADADA;
          border-radius: 0.1rem;

          div {
            width: 50%;
            height: 100%;
            background: #6CB127;
          }
        }
      }
    }
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
          border-bottom: 1px solid #4bb344;
        }
      }
    }
  }
}
</style>
