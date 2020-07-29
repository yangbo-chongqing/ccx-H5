<template>
  <!--景区-->
  <div id="Scenic">
    <MyHeader :title="'景区'" />
    <img src="http://www.mlxc365.com/images/sxccx/icon/intro_bg.png" alt />

    <!-- 四个按钮 -->
    <Swipe class="my-swipe swiper" width="185" :loop="false" :show-indicators="false">
      <SwipeItem v-for="(item , index) in swipeList" :key="index" @click="go(item.pageRouter)">
        <img :src="item.img" alt />
        <p>{{ item.title}}</p>
      </SwipeItem>
    </Swipe>
    <Lines />
    <Options />

    <!-- 景区列表 -->
    <div class="attractions">
      <div
        class="item"
        v-for="(item , index) in list"
        :key="index"
        @click="handleFunc(item)"
        :login="login"
      >
        <img class="left" :src="item.showImg" />
        <div class="right">
          <div class="title single">{{item.title}}</div>
          <div class="about multiLine">景区地址：{{item.address}}</div>
          <div class="numberPeople">到这去</div>
        </div>
        <i class="icon iconfont" @click.stop="handleMap">&#xe656;</i>
      </div>
    </div>

    <MyFooter :page-index="2" />
  </div>
</template>

<script>
import MyHeader from "../components/public/MyHeader";
import MyFooter from "../components/public/MyFooter";
import Swiper from "../components/scenic/Swiper";
import Options from "../components/scenic/Options";
import Lines from "../components/public/Lines";
import { Swipe, SwipeItem, Dialog } from "vant";
import { getNewsClass, getMap, isLogin } from "../apis";
import md5 from "js-md5";
export default {
  name: "Scenic",
  data() {
    return {
      active: 0,
      swipeList: [
        {
          img: baseImgUrl + "beatifulCountry.png",
          pageRouter: "/BeautifulCountry.html"
        },
        {
          img: baseImgUrl + "Frame 2-1.png",
          pageRouter: "/vr.html"
        },
        {
          img: baseImgUrl + "Frame 2-2.png",
          pageRouter: "/villageIntroduction.html"
        }
      ],
      list: [],
      lat: "", //纬度
      lng: "", //经度
      title: "", //导航标题
      login: "false"
    };
  },
  methods: {
    getNewsClass() {
      const data = {
        pageSize: 10,
        pageCurrent: 1,
        news_type: 34
        // city: 34, //需删除
        // district: 24156 //需删除
      };
      getNewsClass({
        data,
        currentObject: this
      }).then(msg => {
        if (~~msg.code === 1 && ~~msg.status === 200) {
          msg = msg.data.list;
          msg.forEach(item => {
            if (item.contentPic && item.contentPic !== "null") {
              item.showImg = item.contentPic.split(",")[0];
            } else {
              item.showImg = require("../assets/img/noImg.png");
            }
          });
          this.list = msg;
        } else {
          //获取失败
          this.GToast({ message: "获取新闻失败" });
        }
      });
    },
    // 获取地图
    getMap() {
      getMap({
        url: "/industry/map/getList",
        data: {}
      }).then(msg => {
        if (~~msg.code === 0) {
          msg.data.list.forEach(val => {
            this.lat = val.latitude;
            this.lng = val.longitude;
            this.title = val.enterprise_name;
          });
        } else {
          //获取失败
          this.GToast({ message: "获取失败" });
        }
      });
    },
    go(src) {
      if (src === "/shop") {
        const userInfo = this.$store.state.userInfo;
        const username = userInfo.username;
        const password = md5(userInfo.plaintextPassword);
        let url = "http://shop.mlxc365.com/#/index";
        url = url + "?username=" + username + "&password=" + password;
        window.open(url, "_self");
      } else {
        this.$router.push(src);
      }
    },
    handleFunc(item) {
      this.$router.push({
        path: "/beautifulDetails.html",
        query: { id: item.news_id }
      });
    },
    isLogin(resolve, params) {
      isLogin()
        .then(msg => {
          //没有登录
          if (~~msg.code === 0 && ~~msg.status === 400) {
            Dialog.confirm({
              title: "温馨提示",
              message: "此功能需要登录才能查看，是否进行登录？"
            })
              .then(() => {
                //确认
                this.$router.push("/Login.html");
              })
              .catch(() => {
                //取消
              });
          } else {
            this.goMap();
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    },
    goMap() {
      window.location.href = `http://api.map.baidu.com/marker?location=${this.lat},${this.lng}&title=我的位置&content=${this.title}&output=html&src=webapp.baidu.openAPIdemo`;
    },
    handleMap() {
      if (isLogin) {
        this.isLogin();
      }
      // window.location.href = `http://api.map.baidu.com/marker?location=${this.lat},${this.lng}&title=我的位置&content=${this.title}&output=html&src=webapp.baidu.openAPIdemo`;
      // this.$router.push({path:'/map.html'});
    }
  },
  components: {
    MyFooter,
    MyHeader,
    Swiper,
    Options,
    Lines,
    Swipe,
    SwipeItem,
    Dialog
  },
  created() {
    this.getNewsClass();
    this.getMap();
  }
};
</script>

<style scoped lang="stylus">
#Scenic {
  width: 100%;
  min-height: 100vh;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .swiper {
    height: 4rem;
    padding: 0.6rem 0;

    .van-swipe-item {
      margin-right: 0.1rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    /deep/ .van-swipe__track {
      width: 40rem !important;
    }
  }

  .attractions {
    margin-top: 0.4rem;
    width: 100%;
    min-height: 15rem;
    background-color: #fff;
    box-sizing: border-box;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;

      img {
        height: 1rem;
        width: 60%;
      }

      div {
        font-size: 0.5rem;
        color: #aaa;
      }
    }

    .item {
      display: flex;
      box-sizing: border-box;
      position: relative;

      .left {
        width: 35%;
        height: 3.56rem;
        padding: 0.5rem;
      }

      .right {
        padding: 0.5rem 0;
        width: 55%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-size: 0.6rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .about {
          font-size: 0.5rem;
          color: #999;
        }

        .numberPeople {
          font-size: 0.5rem;
          color: #4ce0b0;
          display: flex;

          div {
            color: #ff0000;
          }
        }
      }
    }
  }

  .multiLine {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .icon {
    position: absolute;
    right: 0.5rem;
    bottom: 0.2rem;
    font-size: 0.8rem;
    color: #4ce0b0;
  }
}
</style>
