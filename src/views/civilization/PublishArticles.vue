<template>
  <div id="PublishArticles">
    <!--现在申报-->
    <MyHeader :title="'发布文章'" :color="false" />
    <Lines />
    <div class="form">
      <div class="item">
        <p>
          <i>*</i>
          <span>标题</span>
        </p>
        <input type="text" v-model="orderName" placeholder="请输入" />
        <i class="iconfont">&#xe636;</i>
      </div>
    </div>
    <Lines />
    <div class="item">
      <p>
        <i>*</i>
        <span>内容</span>
      </p>
      <input type="text" disabled />
    </div>
    <textarea placeholder="请输入详细内容" v-model="orderContent" />
    <Lines />
    <div class="item">
      <p>
        <i>*</i>
        <span>附件</span>
      </p>
      <input type="text" disabled />
    </div>
    <Uploader
      v-model="fileList"
      :after-read="afterRead"
      :max-count="3"
      class="IupFile"
      @delete="deleteImg"
    />
    <div class="button" @click="upData">立即提交</div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import Lines from "../../components/public/Lines";
import { Popup, Picker, Toast, Uploader } from "vant";
import { sendPublishArticles, upImage } from "../../apis";
export default {
  name: "PublishArticles",
  data() {
    return {
      fileList: [],
      orderContent: "", // 代办内容
      orderName: "", //标题
      backImg: []
    };
  },
  methods: {
    afterRead(file) {
      this.upImage(file);
    },
    //提交摁钮
    upData() {
      //验证
      if (!this.orderName.trim().length) {
        this.GToast({ message: "请输入申报标题" });
        return false;
      }
      if (!this.orderContent.trim().length) {
        this.GToast({ message: "请输入内容说明" });
        return false;
      }
      const backImg = this.backImg.join(",");
      this.sendPublishArticles(backImg);
    },
    upImage(file) {
      upImage(file.file)
        .then(msg => {
          if (~~msg.statusCode === 200 && ~~msg.errno === 0) {
            this.backImg.push(msg.data[0]);
          } else {
            this.GToast({ message: "网络错误，上传失败" });
            this.fileList.pop();
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    },
    //提交
    sendPublishArticles(backImg) {
      sendPublishArticles({
        url: "/dp_happy_share/save",
        data: {
          title: this.orderName,
          content: this.orderContent,
          backImg
        }
      })
        .then(msg => {
          if (~~msg.code === 0) {
            this.GToast({ message: msg.msg });
            this.$router.go(-1);
          } else {
            this.GToast({ message: "提交失败" });
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    },
    deleteImg(file, current) {
      const index = current.index;
      this.backImg = this.backImg.filter((item, i) => i !== index);
    }
  },
  components: {
    MyHeader,
    Uploader,
    Lines,
    Popup,
    Picker
  },
  created() {}
};
</script>

<style scoped lang="stylus">
#PublishArticles {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: func(44);

  > .form {
    width: 100%;
    box-sizing: border-box;
    padding: 0 func(15);

    > .item {
      width: 100%;
      height: func(44);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: func(1) solid #f5f5f5;

      > input {
        flex: 1;
        border: 0;
        outline: 0;
        background-color: transparent;
        text-align: right;
        box-sizing: border-box;
        color: #BFBFBF;
        padding: 0 func(15);

        &::placeholder {
          color: #BFBFBF;
        }
      }

      > i {
        margin-top: func(4);
        color: #BFBFBF;
      }

      > p {
        span {
          color: #BFBFBF;
        }

        i {
          color: #f00;
        }
      }
    }
  }

  > .item {
    width: 100%;
    height: func(44);
    display: flex;
    align-items: center;
    padding: 0 func(15);
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: func(1) solid #f5f5f5;

    > input {
      flex: 1;
      border: 0;
      outline: 0;
      background-color: transparent;
      text-align: right;
      box-sizing: border-box;
      color: #BFBFBF;
      padding: 0 func(15);

      &::placeholder {
        color: #BFBFBF;
      }
    }

    > i {
      margin-top: func(4);
      color: #BFBFBF;
    }

    > p {
      span {
        color: #BFBFBF;
      }

      i {
        color: #f00;
      }
    }
  }

  > textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 0 func(15);
    color: #BFBFBF;
    height: func(108);
    resize: none;
    border: 0;
    outline: 0;

    &::placeholder {
      color: #BFBFBF;
    }
  }

  > .button {
    width: func(258);
    height: func(44);
    background-color: #6CB127;
    color: #fff;
    font-size: func(16);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: func(37) auto func(25) auto;
  }

  .IupFile {
    box-sizing: border-box;
    padding: 0 func(15);
    margin-top: func(10);
  }
}
</style>
