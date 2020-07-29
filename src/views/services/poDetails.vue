<template>
  <div class="poDetails">
    <MyHeader :title="'民意详情'" />
    <div class="title">
      <h3>{{msg.title}}</h3>
    </div>
    <div class="messBox">
      <div class="headbox">
        <img :src="msg.picId?msg.picId:require('@/assets/img/noImg.png')" alt srcset />
      </div>
      <div class="txt">
        <span>{{msg.createUserName}}</span>
        <p>{{msg.createDate}}</p>
      </div>
      <div class="num">
        <p v-if="msg.readCount">{{msg.readCount}}</p>
        <p v-if="!msg.readCount">0</p>
        <span>次浏览</span>
      </div>
    </div>
    <div class="content" v-html="msg.content"></div>
  </div>
</template>
<script>
import { getmingyi } from "@/apis";
import MyHeader from "@/components/public/MyHeader";
import Lines from "@/components/public/Lines";
export default {
  name: "release",
  components: {
    MyHeader,
    Lines
  },
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    getmingyi(id) {
      const data = { id };
      getmingyi({ data }).then(msg => {
        if (msg.code == 200) {
          this.msg = msg.data;
        }
      });
    }
  },
  created() {},
  mounted() {
    const id = this.$route.query.id;
    this.getmingyi(id);
  }
};
</script>
<style lang="stylus" scoped>
.poDetails {
  padding: func(15);
  padding-top: func(44);

  .title {
    padding: func(8) 0;
    color: #444444;
    font-size: func(14);
  }

  .messBox {
    width: 100%;
    border-bottom: 1px solid #F5F5F5;
    min-height: func(44);
    box-sizing: border-box;
    padding: func(19) 0;
    padding-top: func(9);
    position: relative;
    display: flex;

    .headbox {
      width: func(44);
      height: func(44);
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      background: #f2f2f2;
      margin-right: func(12);

      img {
        width: 100%;
      }
    }

    .txt {
      span {
        font-size: func(14);
        color: #444444;
      }

      p {
        font-size: func(12);
        color: #999999;
        margin-top: func(8);
      }
    }

    .num {
      position: absolute;
      right: 0;
      display: flex;

      p {
        font-size: func(12);
        color: #D33333;
      }

      span {
        font-size: func(12);
        color: #999999;
      }
    }
  }

  .content {
    padding: func(12) 0;
  }
}
</style>