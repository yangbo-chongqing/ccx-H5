<template>
  <div class="affairsOpen">
    <MyHeader :title="'政务公开'" />
    <img :src="banner" alt class="imgs" />
    <div id="Tools">
      <div v-for="(item , index) in toolsList" :key="index" @click="go(item.pageRouter,item.title)">
        <img :src="item.img" />
        <p>{{ item.title }}</p>
      </div>
    </div>
    <Lines />
    <div class="fenge">
      <img src="http://www.mlxc365.com/images/sxccx/icon/Frame 4.png" class="left" />
      <span>通知快讯</span>
      <div class="genduo">
        <router-link to="/notice.html">
          <span>更多</span>
        </router-link>>
      </div>
    </div>
    <NewsList v-for="(item , index ) in list" :key="index" :news="item" />
    <img style="width:100%" src="../../assets/img/noData.png" v-show="list.length === 0" />
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import Lines from "@/components/public/Lines";
import NewsList from "@/components/public/NewsList";
import imageList from "@/components/public/imageList";
import { getNewsClass } from "../../apis";

export default {
  name: "affairsOpen",
  components: {
    MyHeader,
    Lines,
    NewsList,
    imageList
  },
  data() {
    return {
      toolsList: [
        {
          title: "党务公开",
          img: baseImgUrl + "partydynamics.png",
          pageRouter: "/affairs.html"
        },
        {
          title: "村务公开",
          img: baseImgUrl + "zwgk9.png",
          pageRouter: "/affairs.html"
        },
        {
          title: "政策宣传",
          img: baseImgUrl + "zwgk10.png",
          pageRouter: "/publicity.html"
        },
        {
          title: "村情介绍",
          img: baseImgUrl + "zwgk11.png",
          pageRouter: "/affairs.html"
        }
      ],
      list: [],
      banner: baseImgUrl + "banner1.png"
    };
  },
  methods: {
    go(pageRouter, title) {
      this.switchPage({
        pageRouter,
        params: {
          title
        }
      });
    },
    getList() {
      getNewsClass({
        data: {
          news_type: 33
        },
        currentObject: this
      })
        .then(msg => {
          if (~~msg.status === 200 && ~~msg.code === 1) {
            msg = msg.data.list;
            msg.forEach(item => {
              if (item.contentPic && item.contentPic !== "null") {
                item.showImg = item.contentPic.split(",")[0];
              } else {
                item.showImg = require("../../assets/img/noImg.png");
              }
              item.typeName = "政务";
              item.isNotice = true;
            });
            this.list = msg;
          } else {
            this.GToast({ message: "获取失败" });
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="stylus" scoped>
.affairsOpen {
  width: 100%;
  padding-top: func(44);

  .imgs {
    width: 100%;
    height: func(188);
  }

  #Tools {
    width: 100%;
    height: func(106);
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
    padding: func(12);
    box-sizing: border-box;
    margin-bottom: func(12);

    div {
      width: 25%;
      height: func(100);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      &:nth-of-type(3n) {
        border-right: 0;
      }

      &:nth-of-type(n+4) {
        border-bottom: 0;
      }

      img {
        width: func(44);
        height: func(44);
        margin-bottom: func(10);
      }

      p {
        margin: 0;
      }
    }
  }

  .fenge {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: func(15);
    border-bottom: func(1) solid #e3e3e3;
    position: relative;

    img {
      width: func(21);
      height: func(21);
      margin-right: func(15);
    }

    span {
      font-size: func(14);
      color: #444444;
    }

    .genduo {
      position: absolute;
      right: func(15);
      color: #8A8A8A;
      font-size: func(12);

      span {
        color: #8A8A8A;
        font-size: func(12);
      }
    }
  }

  > img {
    max-width: 100%;
  }
}
</style>
