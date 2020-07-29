<template>
  <div class="Forgetpwd">
    <MyHeader :title="'找回密码'" />
    <div class="topbox">
      <img class="imgbox" src="http://www.mlxc365.com/images/sxccx/icon/组21@2x 1.png" alt />
    </div>
    <div class="all">
      <div class="logintitle">
        <span>找回密码</span>
        <!-- <span>欢迎使用</span> -->
      </div>
      <!-- <div class="formitem">
        \ <span v-if="one===1">用户名</span>
        <span>用户名</span>
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="手机号"
          @blur="inChange(1)"
          @focus="change(1)"
        />
      </div>-->
      <div class="formitem bot">
        <span v-if="two===1" class="mima">新密码</span>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="新密码"
          @blur="inChange(2)"
          @focus="change(2)"
        />
      </div>
      <div class="formitem bot">
        <span v-if="three===1" class="queren">确认密码</span>
        <input
          type="password"
          name="password"
          v-model="newpassword"
          placeholder="确认密码"
          @blur="inChange(3)"
          @focus="change(3)"
        />
      </div>
      <button class="form" @click="submit()">确定</button>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import { Toast, Dialog } from "vant";
import { upPwd } from "@/apis";
import md5 from "js-md5";
export default {
  name: "outPassword",
  components: {
    MyHeader,
    Dialog
  },
  data() {
    return {
      userNumber: this.$route.query.phone,
      userInfo: "",
      username: null,
      password: null,
      newpassword: null,
      one: 0,
      two: 0,
      three: 0
    };
  },
  methods: {
    change(val) {
      let determine = val;
      switch (determine) {
        case 1:
          this.one = 1;
          break;
        case 2:
          this.two = 1;
          break;
        case 3:
          this.three = 1;
          break;
      }
    },
    inChange(val) {
      let determine = val;
      switch (determine) {
        case 1:
          if (!!this.username) {
            this.one = 1;
          } else {
            this.one = 0;
          }
          break;
        case 2:
          if (!!this.password) {
            this.two = 1;
          } else {
            this.two = 0;
          }
          break;
        case 3:
          if (!!this.newpassword) {
            this.three = 1;
          } else {
            this.three = 0;
          }
          break;
      }
    },
    //修改密码
    submit() {
      let password = this.password;
      let newpassword = this.newpassword;
      if (!password) {
        Toast.fail("原密码不能为空");
        return;
      }
      if (!newpassword) {
        Toast.fail("新密码不能为空");
        return;
      }
      if (newpassword != password) {
        Toast.fail("两次输入密码不一致");
        return;
      }
      let data = {
        user_mobile: this.userNumber,
        password: md5(password)
      };
      Dialog.confirm({
        title: "修改密码",
        message: "确认修改密码？"
      }).then(() => {
        upPwd({
          url: "/sys/user/backPassword",
          data: data,
          currentObject: this
        })
          .then(res => {
            if (res.code == 0 && res.status == 200) {
              Toast("修改成功");
              this.$router.replace("/login.html");
            } else {
              Toast(res.msg);
            }
          })
          .catch(() => {
            Toast("取消找回密码");
          });
      });
    }
  },
  created() {
    let info = sessionStorage.getItem("userInfo");
    this.userInfo = JSON.parse(info);
  }
};
</script>
<style lang="stylus" scoped>
.Forgetpwd {
  width: 100%;
  padding-top: func(44);
  box-sizing: border-box;

  .topbox {
    width: 100%;
    height: func(274);
    background: url('http://www.mlxc365.com/images/sxccx/icon/Frame 43.png') no-repeat;
    background-size: 100%;
    position: relative;

    .imgbox {
      width: func(88);
      height: func(88);
      position: absolute;
      bottom: 0;
      left: func(142);
      top: func(139);
    }
  }

  .all {
    width: func(258);
    margin-left: func(58);

    .logintitle {
      width: 100%;
      margin-bottom: func(38);

      span:first-child {
        font-size: func(18);
        font-weight: bold;
      }

      span:first-child {
        font-size: func(24);
      }
    }

    .bot {
      margin-top: func(20);
    }

    .formitem {
      width: 100%;

      input {
        width: func(258);
        height: func(44);
        border: func(1) solid #6CB127;
        padding-left: func(16);
        box-sizing: border-box;
        background: none;
      }

      span {
        position: absolute;
        top: func(381);
        left: func(69);
        background: #ffffff;
        display: block;
        font-size: func(14);
        color: #6CB127;
        padding: 0 func(10);
        text-align: center;
      }

      .mima {
        position: absolute;
        top: func(446);
      }

      .queren {
        position: absolute;
        top: func(510);
      }
    }

    .member {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: func(11);

      span {
        color: #BFBFBF;
        font-size: func(12);
      }
    }

    .form {
      width: func(258);
      height: func(44);
      background: #6CB127;
      color: #ffffff;
      font-size: func(16);
      margin-top: func(27);
    }
  }
}
</style>