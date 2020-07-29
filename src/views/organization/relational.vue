<template>
  <div id="relational">
    <MyHeader :title="'关系转移'" />
    <div class="form">
      <div class="item">
        <p>
          <i>*</i>
          <span>区域选择</span>
        </p>
        <input type="text" :value="type?type.areaName:''" disabled />
        <i class="iconfont" @click="showPicker(0)">&#xe636;</i>
      </div>
      <div class="item">
        <p>
          <i>*</i>
          <span>转入支部</span>
        </p>
        <input type="text" disabled :value="thing? thing.org_name: ''" />
        <i class="iconfont" @click="showPicker(1)">&#xe636;</i>
      </div>
    </div>
    <Lines />
    <div class="item">
      <p>
        <i>*</i>
        <span>申请理由</span>
      </p>
    </div>
    <textarea placeholder="请输入转移组织原因" v-model="turnInfo" />
    <div class="button" @click="upDataRelation">立即提交</div>
    <Popup v-model="show" position="bottom" :style="{ height: '40%' }">
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
import { Toast, Picker, Field, Popup, DatetimePicker } from "vant";
import { getLocation, upDataRelation, getOrgRelation } from "../../apis";
export default {
  name: "relational",
  data() {
    return {
      show: false,
      columns: [],
      type: null, //区域
      thing: null, //支部
      turnInfo: "", //内容
      flag: 0 //0表示获取的是区域 1是支部
    };
  },
  methods: {
    //获取区域
    getLocation() {
      getLocation({
        url: "/member/turn/mebTurnDeptOrgList",
        currentObject: this,
        data: {}
      })
        .then(msg => {
          if (~~msg.code === 200) {
            this.show = true;
            msg.data.forEach(item => {
              item.showName = item.areaName;
            });
            this.columns = msg.data;
          } else {
            this.GToast({ message: "网络错误，获取失败" });
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    },
    //获取支部
    getOrgRelation() {
      if (this.type) {
        getOrgRelation({
          url: "/partPop/getPopDeptOrgList",
          currentObject: this,
          data: {
            deptId: this.type.dept_id
          }
        }).then(msg => {
          if (~~msg.code === 200) {
            this.show = true;
            msg = msg.data;
            msg.forEach(item => {
              item.showName = item.org_name;
            });
            this.columns = msg;
          }
        });
      } else {
        this.GToast({ message: "请先选择区域" });
      }
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
    //展示弹出层
    showPicker(flag) {
      this.flag = flag;
      if (flag === 0) {
        //获取区域
        this.getLocation();
      } else {
        //获取支部
        this.getOrgRelation();
      }
    },
    onCancel() {
      this.show = false;
    },
    //提交
    upDataRelation() {
      if (this.type === null) {
        this.GToast({ message: "请选择区域" });
        return false;
      }
      if (this.thing === null) {
        this.GToast({ message: "请选择转入支部" });
        return false;
      }
      if (!this.turnInfo.trim().length) {
        this.GToast({ message: "请输入诉求内容" });
        return false;
      }
      upDataRelation({
        data: {
          deptId: this.type.dept_id,
          nowOrg: this.thing.org_id,
          turnInfo: this.turnInfo
        }
      })
        .then(msg => {
          if (~~msg.code === 200) {
            this.GToast({ message: "提交成功" });
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          } else {
            this.GToast({ message: "提交失败，请检查网络" });
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
    Popup,
    Field
  },
  created() {}
};
</script>

<style scoped lang="stylus">
#relational {
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

#relational > .form > .item > input, #relational>textarea {
  color: #333; // 修改輸入的文字樣式
}
</style>
