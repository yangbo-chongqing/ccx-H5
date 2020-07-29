<template>
  <div class="dyfuwu">
    <MyHeader :title="'党员服务'" />
    <img :src="banner" alt class="imgs" />
    <div id="Tools">
      <div v-for="(item , index) in toolsList" :key="index" @click="go(item.pageRouter)">
        <img :src="item.img" />
        <p>{{ item.title }}</p>
      </div>
    </div>
    <Lines />
    <div class="fenge">
      <img :src="img1" class="left" />
      <p class="right">工作手册</p>
      <div class="genduo">
        <div class="rightTitle">
          <router-link to="/manual.html">
            <span>更多</span>
            <i class="iconfont">&#xe636;</i>
          </router-link>
        </div>
      </div>
    </div>
    <NewsList v-for="(item , index) in list" :news="item" :key="index" />
    <!--<imageList />-->
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import Lines from "@/components/public/Lines";
import NewsList from "@/components/public/NewsList";
import imageList from "@/components/public/imageList";
import { getManual } from "../../apis";

export default {
  name: "dyfuwu",
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
          title: "党费收缴",
          img: baseImgUrl + "dyfw_1.png",
          pageRouter: "/Pay.html"
        },
        {
          title: "积分查询",
          img: baseImgUrl + "dyfw_2.png",
          pageRouter: "/integral.html"
        },
        {
          title: "我的任务",
          img: baseImgUrl + "dyfw_3.png",
          pageRouter: "/mytask.html"
        },
        //  {
        //     title:"工作手册",
        //     img: baseImgUrl + "dyfw_4.png",
        //     pageRouter:"/manual.html"
        // },
        {
          title: "书记信箱",
          img: baseImgUrl + "dyfw_5.png",
          pageRouter: "/mailbox.html"
        },
        {
          title: "我的组织",
          img: baseImgUrl + "dyfw_6.png",
          pageRouter: "/myOrganization.html"
        }
      ],
      list: [],
      banner: baseImgUrl + "dyfw_bg.png",
      img1: baseImgUrl + "Frame 4.png",
      img2: baseImgUrl + "tzkx.png"
    };
  },
  methods: {
    go(pageRouter) {
      this.switchPage({ pageRouter });
    },
    //获取党员学习通知快讯(快讯)列表
    getmaibox() {
      let data = {
        pageSize: 3,
        pageCurrent: 1,
        news_type: 13
      };
      getManual({
        currentObject: this,
        data: data
      }).then(res => {
        if (res.code == 1) {
          this.list = res.data.list;
        }
      });
    }
  },
  created() {
    this.getmaibox();
  }
};
</script>
<style lang="stylus" scoped>
.dyfuwu {
  width: 100%;
  padding-top: func(44);

  .rightTitle {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .imgs {
    width: 100%;
    height: func(188);
  }

  #Tools {
    width: 100%;
    height: func(200);
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
    padding: func(12);
    box-sizing: border-box;
    margin-bottom: func(12);

    div {
      width: 33.33%;
      height: func(100);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border-bottom: func(1) solid #E6E6E6;
      border-right: func(1) solid #E6E6E6;

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

    .left {
      width: func(21);
      height: func(21);
      margin-right: func(5);
    }

    .right {
      font-size: func(16);
      line-height: 100%;
    }

    .genduo {
      position: absolute;
      right: func(15);
    }
  }
}
</style>
