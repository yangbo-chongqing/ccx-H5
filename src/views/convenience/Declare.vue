<template>
  <div id="Declare">
    <!--现在申报-->
    <MyHeader :title="'在线申报'" :color="false" />
    <Lines />
    <div class="form">
      <div class="item" @click="showPicker(0)">
        <p>
          <i>*</i>
          <span>申报类型</span>
        </p>
        <input type="text" :value="type?type.type_name:'请选择'" disabled />
        <i class="iconfont">&#xe636;</i>
      </div>
      <div class="item">
        <p>
          <i>*</i>
          <span>申报事项</span>
        </p>
        <input type="text" placeholder="请输入" disabled :value="thing? thing.flow_name: ''" />
        <i class="iconfont" @click="showPicker(1)">&#xe636;</i>
      </div>
      <div class="item">
        <p>
          <i>*</i>
          <span>申报标题</span>
        </p>
        <input type="text" placeholder="请输入" v-model="orderName" />
        <i class="iconfont">&#xe636;</i>
      </div>
      <div class="item">
        <p>
          <i>*</i>
          <span>申报人员</span>
        </p>
        <input type="text" placeholder="请输入" v-model="userName" />
        <i class="iconfont">&#xe636;</i>
      </div>
      <div class="item">
        <p>
          <i>*</i>
          <span>联系电话</span>
        </p>
        <input type="text" placeholder="请输入" v-model="userPhone" />
        <i class="iconfont">&#xe636;</i>
      </div>
    </div>
    <Lines />
    <div class="item">
      <p>
        <i>*</i>
        <span>内容说明</span>
      </p>
      <input type="text" disabled />
    </div>
    <textarea style="margin-top:16px" placeholder="请输入详细说明" v-model="orderContent" />
    <Lines />
    <div class="item">
      <p>
        <i>*</i>
        <span>住院发票</span>
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
    <div class="button" @click="upDataProxy">立即提交</div>
    <Popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <Picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        value-key="showName"
      ></Picker>
    </Popup>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import Lines from "../../components/public/Lines";
import { Popup, Picker, Toast, Uploader } from "vant";
import {
  getCaptcha,
  getGuideList,
  getGuideType,
  upDataDeclare,
  upImage
} from "../../apis";
export default {
  name: "Declare",
  data() {
    return {
      fileList: [],
      show: false,
      columns: [],
      type: null, //代办类型
      thing: null, //办理事项
      userName: "", // 申报人
      userPhone: "", //申报人电话
      orderContent: "", // 代办内容
      flag: 0, //0表示获取的是办理类型 1便是hi获取的办理事项
      orderName: "", //申报标题
      orderImg: []
    };
  },
  methods: {
    afterRead(file) {
      this.upImage(file);
    },
    //确认摁钮
    onConfirm(value) {
      if (this.flag === 0) {
        this.type = value;
      } else {
        this.thing = value;
      }
      this.show = false;
    },
    //取消摁钮
    onCancel() {
      this.show = false;
    },
    //展示弹出层
    showPicker(flag) {
      this.flag = flag;
      if (flag === 0) {
        //获取类型
        this.getGuideType();
      } else {
        //获取事项
        this.getGuideList();
      }
    },
    //获取办事指南类型
    getGuideType() {
      getGuideType({
        url: "/flowType/listByDept",
        currentObject: this,
        data: {
          deptId: this.$store.state.userInfo.deptId
        }
      })
        .then(msg => {
          if (~~msg.code === 200) {
            this.show = true;
            msg.data.forEach(item => {
              item.showName = item.type_name;
            });
            this.columns = msg.data;
          } else {
            this.GToast({ message: "网络错误" });
          }
        })
        .catch(err => {
          Toast("网络错误");
        });
    },
    //获取办理事项
    getGuideList() {
      if (this.type) {
        getGuideList({
          url: "/flow/list",
          currentObject: this,
          data: {
            del_lag: 0,
            typeId: this.type.type_id
          }
        }).then(msg => {
          if (~~msg.code === 200) {
            this.show = true;
            msg = msg.data.list;
            msg.forEach(item => {
              item.showName = item.flow_name;
            });
            this.columns = msg;
          }
        });
      } else {
        this.GToast({ message: "请先选择代办类型" });
      }
    },
    //获取验证码
    getCaptcha() {
      const userPhone = this.userPhone.trim();
      const reg = /^1[345678]\d{9}$/;
      if (!reg.test(userPhone)) {
        this.GToast({ message: "请正确输入您的手机号码" });
        return false;
      }
      getCaptcha({ data: { mobile: userPhone } })
        .then(msg => {
          if (~~msg.code === 0 && ~~msg.status === 200) {
            this.GToast({ message: msg.msg });
            this.Captcha = msg.captcha;
            this.timeLeft = 60;
            this.timer = setInterval(() => {
              if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.timer = null;
              } else {
                this.timeLeft--;
              }
            }, 1000);
          } else {
            this.GToast({ message: msg.msg });
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    },
    //提交摁钮
    upDataProxy() {
      //验证
      if (this.type === null) {
        this.GToast({ message: "请选择申报类型" });
        return false;
      }
      if (this.thing === null) {
        this.GToast({ message: "请选择申报事项" });
        return false;
      }
      if (!this.userName.trim().length) {
        this.GToast({ message: "请输入申报人员姓名" });
        return false;
      }
      const regExp = /^1[345678]\d{9}$/;
      if (!regExp.test(this.userPhone)) {
        this.GToast({ message: "请正确输入手机号码" });
        return false;
      }
      if (!this.orderContent.trim().length) {
        this.GToast({ message: "请输入内容说明" });
        return false;
      }
      if (!this.orderName.trim().length) {
        this.GToast({ message: "请输入申报标题" });
        return false;
      }
      const orderImg = this.orderImg.join(",");
      this.upDataDeclare(orderImg);
    },
    upImage(file) {
      upImage(file.file)
        .then(msg => {
          console.log(msg);
          if (~~msg.statusCode === 200 && ~~msg.errno === 0) {
            this.orderImg.push(msg.data[0]);
          } else {
            this.GToast({ message: "网络错误，上传失败" });
            this.fileList.pop();
          }
        })
        .catch(err => {
          console.log(err);
          this.GToast({ message: "网络错误" });
        });
    },
    //提交
    upDataDeclare(orderImg) {
      upDataDeclare({
        url: "/flowOutline/save",
        data: {
          flowTypeId: this.type.type_id,
          flowId: this.thing.flow_id,
          orderName: this.orderName,
          orderContent: this.orderContent,
          orderUser: this.userName,
          orderPhone: this.userPhone,
          orderImg
        }
      })
        .then(msg => {
          if (~~msg.code === 200 && ~~msg.data.code === 200) {
            this.GToast({ message: msg.data.data });
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
      this.orderImg = this.orderImg.filter((item, i) => i !== index);
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
#Declare {
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
    margin-top: func(16);
  }
}

input {
  color: #000 !important;
}

textarea {
  color: #000 !important;
}
</style>
