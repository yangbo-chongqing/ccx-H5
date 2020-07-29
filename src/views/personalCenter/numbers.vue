<template>
  <div class="numbers">
    <MyHeader :title="'注册'" />
    <div class="topbox">
      <img class="imgbox" src="http://www.mlxc365.com/images/sxccx/icon/组21@2x 1.png" alt />
    </div>
    <div class="all">
      <div class="logintitle">
        <span>注册账号</span>
        <!-- <span>欢迎使用</span> -->
      </div>
      <div class="formitem">
        <!-- <span v-if="one===1">用户名</span> -->
        <span>用户名</span>
        <input
          type="text"
          name="username"
          disabled="true"
          v-model="username"
          placeholder="手机号"
          @blur="inChange(1)"
          @focus="change(1)"
        />
      </div>
      <div class="formitem bot">
        <span v-if="two===1" class="mima">密码</span>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="密码"
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
      <button class="form" @click="submit()">注册</button>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import { Toast, Dialog } from "vant";
import { reg } from "@/apis";
import md5 from "js-md5";
export default {
  name: "numbers",
  components: {
    MyHeader
  },
  data() {
    return {
      username: this.$route.query.phone,
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
    //点击注册
    submit() {
      if (!this.password) {
        Toast.fail("密码不能为空");
      } else if (!this.newpassword) {
        Toast.fail("确认密码不能为空");
      } else if (this.password.length < 9) {
        Toast.fail("密码长度需大于8位");
      } else if (this.password !== this.newpassword) {
        Toast.fail("两次密码输入不同");
      } else {
        /*
               用于良心验证截图
              Dialog.alert({
                    title:"温馨提示",
                    message:"密码中不能包含中文且长度需大于8位(必须包含大写字母，小写字母，特殊字符和数字)"
                })*/

        const data = {
          username: this.username,
          password: md5(this.password),
          deptId: 1
          // user_mobile: this.username
        };
        //验证中文
        const china = /[\u4e00-\u9fa5]/;
        //验证大写
        // const Char = /[A-Z]/;
        //验证小写
        const char = /[a-z]/;
        // //验证特殊字符
        // const Special = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/;
        //验证数字
        const num = /[0-9]/;
        //验证密码
        if (china.test(this.password)) {
          //不能包含中文
          this.GToast({ message: "密码中不能包含中文" });
          return null;
        }
        // if (!Char.test(this.password)) {
        //   //大写字母
        //   this.GToast({ message: "密码中必须包含大写字母" });
        //   return null;
        // }
        if (!char.test(this.password)) {
          //小写字母
          this.GToast({ message: "密码中必须包含小写字母" });
          return null;
        }
        // if(!Special.test(this.password)){
        //     //特殊字符
        //     this.GToast({message:"密码中必须包含特殊字符"});
        //     return null;
        // }
        if (!num.test(this.password)) {
          //特殊字符
          this.GToast({ message: "密码中必须包含数字" });
          return null;
        }

        //验证确认密码
        if (china.test(this.newpassword)) {
          //不能包含中文
          this.GToast({ message: "确认密码中不能包含中文" });
          return null;
        }
        // if (!Char.test(this.newpassword)) {
        //   //大写字母
        //   this.GToast({ message: "确认密码中必须包含大写字母" });
        //   return null;
        // }
        if (!char.test(this.newpassword)) {
          //小写字母
          this.GToast({ message: "确认密码中必须包含小写字母" });
          return null;
        }
        // if (!Special.test(this.newpassword)) {
        //   //特殊字符
        //   this.GToast({ message: "确认密码中必须包含特殊字符" });
        //   return null;
        // }
        if (!num.test(this.newpassword)) {
          //特殊字符
          this.GToast({ message: "确认密码中必须包含数字" });
          return null;
        }

        reg({
          url: "/sys/user/save",
          data: data,
          currentObject: this
        }).then(res => {
          if (res.code == 200) {
            this.$router.replace("/login.html");
          } else {
            Toast.fail(res.msg);
          }
        });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.numbers {
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