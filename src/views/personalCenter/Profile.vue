<template>
  <div id="Profile">
    <div class="banner">
      <div class="userName">
        <img
          :src="pic ? pic:'data:image/png;base64,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'"
          alt
        />
        <div v-if="!isLogins">
          <router-link to="/login.html">
            <span>登录/</span>
          </router-link>
          <router-link to="/register.html?type=reg">
            <span>注册</span>
          </router-link>
        </div>
        <div v-else>
          <span v-if="!!userInfo.nickName">{{userInfo.nickName}}</span>
          <span v-else>{{userInfo.username}}</span>
        </div>
      </div>
    </div>
    <!--分组-->
    <div class="group">
      <div class="item" @click="onItem(1)">
        <div>
          <img :src=" baseImgUrl1 + 'Frame.png'" />
          <span>我的积分</span>
        </div>
        <i class="iconfont">&#xe608;</i>
      </div>
      <div class="item" @click="onItem(2)">
        <div>
          <img :src="baseImgUrl1 + 'Frame-1.png'" />
          <span>党员缴费</span>
        </div>
        <i class="iconfont">&#xe608;</i>
      </div>
      <!-- <div class="item thr" @click="onItem(3)">
        <div>
          <img :src="baseImgUrl1 +'Frame-4.png'" />
          <span>一键报警</span>
        </div>
        <i class="iconfont">&#xe608;</i>
      </div>-->
    </div>
    <div class="group">
      <div :class="{'item':true,'play':actived==1}" @click="open()">
        <div>
          <img :src="baseImgUrl1 +'Frame-3.png'" />
          <span>党员信息绑定</span>
        </div>
        <i class="iconfont">&#xe608;</i>
      </div>
      <div class="item" @click="onItem(4)">
        <div>
          <img :src="baseImgUrl1 + 'Frame-2.png'" />
          <span>个人资料</span>
        </div>
        <i class="iconfont">&#xe608;</i>
      </div>
    </div>
    <div class="group thr">
      <div class="item" @click="onItem(5)">
        <div>
          <img :src="baseImgUrl1 + 'Frame-5.png'" />
          <span>修改密码</span>
        </div>
        <i class="iconfont">&#xe608;</i>
      </div>
      <div class="item" v-if="isLogins" @click="exit()">
        <div>
          <img :src="baseImgUrl1 + 'Frame-6.png'" />
          <span>账号退出</span>
        </div>
        <i class="iconfont">&#xe608;</i>
      </div>
    </div>
    <MyFooter :page-index="3" />

    <!-- 党员绑定弹窗 -->
    <div class="codes" v-if="showForm">
      <div class="blck" @click="open()"></div>
      <div class="formcontent">
        <div class="formtitle">
          <span>党员绑定</span>
          <!-- <i class="iconfont icon-guanbi" @click="handelForm(0)"></i> -->
        </div>
        <div class="formitem">
          <span v-if="one===1" class="one-span">姓名</span>
          <input
            type="text"
            @focus="change(1)"
            @blur="inChange(1)"
            v-model="name"
            placeholder="请输入姓名"
          />
        </div>
        <div class="formitem botto">
          <span v-if="two===1" class="two-span">证件号码</span>
          <input
            type="text"
            @focus="change(2)"
            @blur="inChange(2)"
            v-model="number"
            placeholder="请输入证件号"
          />
        </div>
        <div class="fontcolor">当前绑定的党员信息为{{orgname}}党员{{name}}</div>
        <!-- <div class="fontcolor" v-else>请输入正确的党员信息绑定</div> -->
        <div class="bnt">
          <span @click="binding">绑定</span>
          <!-- <span class="active">解绑</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyFooter from "../../components/public/MyFooter";
import md5 from "js-md5";
import { Dialog, Toast } from "vant";
import { isLogin, login } from "../../apis";
import {
  modifyArea,
  modifyShowArea,
  modifyUserInfo
} from "../../store/actionTypes";
import { logout, checkpart, bindingParty } from "../../apis";
export default {
  name: "Profile",
  components: {
    MyFooter,
    Dialog,
    Toast
  },
  data() {
    return {
      isLogins: false, //mixins已定义，不要重新定义 login
      userInfo: null,
      showForm: false,
      name: null,
      number: null,
      one: 0,
      two: 0,
      orgname: null,
      idcard: null,
      pic: require("../../assets/img/headicon.png"),
      baseImgUrl1: "http://www.mlxc365.com/images/sxccx/icon/",
      actived: 0
    };
  },

  methods: {
    //检查登录状态
    async checkLogin() {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || "";
      if (userInfo === "") {
        const result = await isLogin();
        console.log(result);
        if (~~result.code === 0 && ~~result.status === 200) {
          //登陆成功
          this.GToast({ message: "登陆成功" });
        } else if (~~result.code === 0 && ~~result.status === 400) {
          //没有登录
          this.isLogins = false;
          this.$store.dispatch(modifyUserInfo);
          this.$store.dispatch(modifyArea);
          this.$store.dispatch(modifyShowArea);
          this.GToast({ message: "暂未登录" });
          this.pic = require("../../assets/img/headicon.png");
        } else {
          //网络错误
          this.pic = require("../../assets/img/headicon.png");
          this.GToast({ message: "网络错误" });
          this.isLogins = false;
        }
      } else {
        this.isLogins = true;
        this.userInfo = userInfo;
        this.orgname = userInfo.partyMember
          ? userInfo.partyMember.deptName
          : "";
        this.name = userInfo.partyMember ? userInfo.partyMember.mebName : "";
        this.number = userInfo.partyMember ? userInfo.partyMember.mebCard : "";
        this.pic = userInfo.picId;
      }
    },
    change(val) {
      let determine = val;
      switch (determine) {
        case 1:
          this.one = 1;
          break;
        case 2:
          this.two = 1;
          break;
      }
    },
    inChange(val) {
      let determine = val;
      switch (determine) {
        case 1:
          if (!!this.name) {
            this.one = 1;
          } else {
            this.one = 0;
          }
          break;
        case 2:
          if (!!this.number) {
            this.two = 1;
          } else {
            this.two = 0;
          }
          break;
      }
    },
    //打开党员绑定弹框
    open() {
      if (!this.isLogins) {
        Dialog.confirm({
          title: "温馨提示",
          message: "您还没有登录，是否前往登录页面？"
        })
          .then(() => {
            this.$router.push("/login.html");
          })
          .catch(err => {});
      } else {
        this.showForm = !this.showForm;
      }
    },

    //点击绑定
    binding() {
      let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
      if (!this.name) {
        Toast("姓名不能为空！");
        return;
      }
      if (!this.number) {
        Toast("证件号码不能为空！");
        return;
      }
      if (!reg.test(this.number)) {
        Toast("证件号码错误！");
        return;
      }
      let data = {
        popName: this.name,
        popCard: this.number
      };
      bindingParty({
        url: "/fun/partyMember/bindingMember",
        data: data
      }).then(res => {
        if (res.code == 200) {
          Toast("绑定成功！");
          this.showForm = false;
        } else {
          Toast(res.msg);
        }
      });
    },
    //退出登录
    exit() {
      Dialog.confirm({
        title: "温馨提示",
        message: "是否确认退出？"
      })
        .then(() => {
          logout().then(msg => {
            if (~~msg.code === 0) {
              this.$store.dispatch(modifyUserInfo);
              this.$store.dispatch(modifyArea);
              this.$store.dispatch(modifyShowArea);
              this.GToast({ message: "退出成功" });
              this.checkLogin();
            }
          });
        })
        .catch(() => {});
    },
    //点击选项
    onItem(e) {
      if (!this.isLogins) {
        Dialog.confirm({
          title: "温馨提示",
          message: "您还没有登录，是否前往登录页面？"
        })
          .then(() => {
            this.$router.push("/login.html");
          })
          .catch(err => {});
      } else {
        switch (e) {
          case 1:
            if (this.actived == 0) {
              Dialog.confirm({
                title: "温馨提示",
                message: "您不是党员，请先进行党员绑定!"
              });
            } else {
              this.$router.push("/integral.html");
            }
            break;
          case 2:
            if (this.actived == 0) {
              Dialog.confirm({
                title: "温馨提示",
                message: "您不是党员，请先进行党员绑定!"
              });
            } else {
              this.$router.push("/Pay.html");
            }
            break;
          case 3:
            this.$router.push("/Police.html");
            break;
          case 4:
            this.$router.push("/personalData.html");
            break;
          case 5:
            this.$router.push("/Forgetpwd.html");
            break;
        }
      }
    },
    // 检查是否是党员
    checkparts() {
      checkpart({
        url: "/fun/partyMember/getMemberByUserId"
      }).then(res => {
        if (res.code == 200 && res.data) {
          this.actived = 1;
        }
      });
    },
    // 刷新登录状态
    login() {
      let userInfo = JSON.parse(window.sessionStorage.userInfo);
      if (!userInfo) {
        return;
      }
      let user = userInfo.username;
      let password = userInfo.plaintextPassword;
      login({
        url: "/login",
        data: {
          username: user,
          password: md5(password)
        }
      }).then(msg => {
        msg = msg.data;
        msg.plaintextPassword = password;
        this.$store.dispatch(modifyUserInfo, msg);
        const area = [];
        if (msg.province) {
          area.push(msg.province);
        }
        if (msg.city) {
          area.push(msg.city);
        }
        if (msg.district) {
          area.push(msg.district);
        }
        if (msg.street) {
          area.push(msg.street);
        }
        if (msg.community) {
          area.push(msg.community);
        }
        this.$store.dispatch(modifyArea, area);
        this.$store.dispatch(modifyShowArea, msg.deptName);
      });
    }
  },
  created() {
    this.checkLogin(); //检查登录状态
    this.checkparts();
    this.login();
  }
};
</script>

<style scoped lang="stylus">
#Profile {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding-bottom: func(49);
  min-height: 100vh;

  .banner {
    width: 100%;
    height: func(188);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #11eeaa, #8fe065);
    background: url('http://119.3.196.255:7604/images/iconPic/anner.png') no-repeat center center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;

    .userName {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        width: func(80);
        height: func(80);
        border-radius: 50%;
        margin-bottom: func(10);
      }

      span {
        color: #fff;
      }
    }
  }

  .thr {
    border-bottom: 0;
  }

  .group {
    width: 100%;
    border-bottom: func(8) solid #f5f5f5;

    .item {
      width: 100%;
      height: func(56);
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 func(10);
      border-bottom: func(1) solid #e3e3e3;
      align-items: center;

      div {
        height: 100%;
        display: flex;
        align-items: center;

        img {
          width: func(25);
          height: func(25);
          margin-right: func(8);
        }
      }

      .iconfont {
        color: #aaa;
      }
    }
  }

  .codes {
    .blck {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #000000;
      opacity: 0.5;
      z-index: 1000;
    }

    .formcontent {
      width: func(312);
      height: func(398);
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      z-index: 1001;
      background: #ffffff;
      border-radius: func(14);
      padding: 0 func(27);
      padding-top: func(42);
      box-sizing: border-box;

      .formtitle {
        width: 100%;
        text-align: center;

        span {
          color: #6CB127;
          font-size: func(14);
        }
      }

      .formitem {
        width: 100%;
        height: func(44);
        border: 1px solid #6CB127;
        border-radius: func(4);
        margin-top: func(40);
        position: relative;
        box-sizing: border-box;
        padding: 0 func(11);

        input {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          font-size: func(14);
          border: none;
        }

        span {
          position: absolute;
          color: #6CB127;
          font-size: func(14);
          top: func(-7);
          left: func(10);
          display: block;
          background: #ffffff;
          height: func(14);
          line-height: func(14);
          padding: 0 func(3);
        }
      }

      .fontcolor {
        color: #6CB127;
        font-size: func(14);
        margin-top: func(18);
      }

      .bnt {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: func(48);
        left: 0;

        span {
          display: inline-block;
          width: func(100);
          line-height: func(40);
          border-radius: func(20);
          text-align: center;
          color: #ffffff;
          background: #6CB127;
          font-size: func(16);
        }

        span.active {
          border: 1px solid #6CB127;
          color: #6CB127;
          background: #fff;
        }
      }
    }
  }
}

.play {
  display: none !important;
}
</style>
