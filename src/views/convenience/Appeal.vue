<template>
  <div id="Appeal">
    <!--诉求提交-->
    <MyHeader :title="'诉求提交'" :color="false" />
    <Lines />
    <div class="form">
      <div class="item">
        <p>
          <i>*</i>
          <span>诉求类别：</span>
        </p>
        <input type="text" disabled :value="appealObj?appealObj.app_type_name:'请选择'" />
        <i class="iconfont" @click="show = true">&#xe636;</i>
      </div>
      <div class="item">
        <p>
          <i>*</i>
          <span>诉求人：</span>
        </p>
        <input type="text" placeholder="请输入" v-model="orderUser" />
        <i class="iconfont">&#xe636;</i>
      </div>
      <div class="item">
        <p>
          <i>*</i>
          <span>联系电话：</span>
        </p>
        <input type="text" placeholder="请输入" v-model="orderPhone" />
        <i class="iconfont">&#xe636;</i>
      </div>
      <div class="item">
        <input type="text" class="captcha" placeholder="请输入验证码" v-model="captcha" />
        <button @click="getCaptcha" class="btn" v-show="!timeLeft">发送验证</button>
        <button v-show="timeLeft" class="no">{{timeLeft}}后获取</button>
      </div>
      <div class="item">
        <p>
          <i>*</i>
          <span>诉求标题：</span>
        </p>
        <input type="text" placeholder="请输入" v-model="app_title" />
        <i class="iconfont">&#xe636;</i>
      </div>
    </div>
    <Lines />
    <!--        <div class="item">
                    <p>
                        <i>*</i>
                        <span>内容说明</span>
                    </p>
                    <input type="text" disabled>
    </div>-->
    <textarea placeholder="请输入诉求内容" v-model="app_content" />
    <div class="button" @click="upDataAppeal">立即提交</div>
    <Popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <Picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        value-key="app_type_name"
      ></Picker>
    </Popup>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import Lines from "../../components/public/Lines";
import { getAppealType, getCaptcha, upDataAppeal } from "../../apis";
import { Picker, Popup } from "vant";
export default {
  name: "Appeal",
  data() {
    return {
      show: false,
      columns: [],
      appealObj: null,
      orderUser: "", //诉求人
      orderPhone: "", //联系电话
      app_title: "", //诉求标题
      app_content: "", //诉求内容
      captcha: "", //用户输入验证码
      Captcha: "", //系统返回验证码
      timer: null,
      timeLeft: null
    };
  },
  methods: {
    //获取诉求类型
    getAppealType() {
      getAppealType({
        url: "/apply/typeList",
        currentObject: this
      })
        .then(msg => {
          if (~~msg.code === 200) {
            msg = msg.data;
            this.columns = msg;
          } else {
            this.GToast({ message: "网络错误，获取失败" });
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    },
    onConfirm(value) {
      this.appealObj = value;
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    //获取验证码
    getCaptcha() {
      const phone = this.orderPhone.trim();
      const regExp = /^1[3456789]\d{9}$/;
      if (!regExp.test(phone)) {
        this.GToast({ message: "请正确输入您的手机号码" });
        return false;
      }
      getCaptcha({
        data: {
          mobile: phone
        }
      })
        .then(msg => {
          if (~~msg.code === 0 && ~~msg.status === 200) {
            this.timeLeft = 60;
            this.timer = setInterval(() => {
              if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.timeLeft = null;
              } else {
                this.timeLeft--;
              }
            }, 1000);
            this.Captcha = msg.captcha;
            this.GToast({ message: msg.msg });
          } else {
            this.GToast({ message: msg.msg });
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    },
    //提交
    upDataAppeal() {
      //验证
      if (this.captcha !== this.Captcha) {
        this.GToast({ message: "请正确输入验证码" });
        return false;
      }
      if (this.appealObj === null) {
        this.GToast({ message: "请选择诉求类别" });
        return false;
      }
      if (!this.orderUser.trim().length) {
        this.GToast({ message: "请输入诉求人姓名" });
        return false;
      }
      const regExp = /^1[3456789]\d{9}$/;
      if (!regExp.test(this.orderPhone.trim())) {
        this.GToast({ message: "请正确输入手机号码" });
        return false;
      }
      if (!this.app_title.trim().length) {
        this.GToast({ message: "请输入诉求标题" });
        return false;
      }
      if (!this.app_content.trim().length) {
        this.GToast({ message: "请输入诉求内容" });
        return false;
      }
      upDataAppeal({
        data: {
          appType: this.appealObj.app_type_id,
          app_content: this.app_content,
          app_title: this.app_title,
          orderUser: this.orderUser,
          orderPhone: this.orderPhone
        }
      })
        .then(msg => {
          if (~~msg.code === 200 && ~~msg.data.code === 200) {
            this.GToast({ message: "诉求提交成功" });
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          } else {
            this.GToast({ message: "诉求提交失败，请检查网络" });
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    }
  },
  components: {
    MyHeader,
    Lines,
    Picker,
    Popup
  },
  created() {
    this.getAppealType();
  }
};
</script>

<style scoped lang="stylus">
#Appeal {
  width: 100%;
  min-height: 100vh;
  padding-top: func(44);
  box-sizing: border-box;

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

        &.captcha {
          text-align: left;
        }

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

      > button {
        width: func(80);
        height: func(30);
        background-color: #6cb127;
        color: #fff;
        border-radius: 100vmax;
        font-size: func(14);

        &.no {
          color: #bfbfbf;
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
    padding: func(15);
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
    margin: func(74) auto func(148) auto;
  }
}

input {
  color: #000 !important;
}

.btn {
  width: 100px !important;
}
</style>
