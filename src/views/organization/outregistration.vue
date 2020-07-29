<template>
  <div id="outregistration">
    <MyHeader :title="'外出登记'" />
    <div class="all">
      <div class="item">
        <p>
          <i style="padding-right:0.6rem">*</i>
          <span>姓名</span>
        </p>
        <input type="text" disabled v-model="userName" />
        <i class="iconfont">&#xe636;</i>
      </div>
      <div class="item">
        <p>
          <i style="padding-right:0.6rem">*</i>
          <span>所属支部</span>
        </p>
        <input type="text" disabled v-model="userOrg" />
        <i class="iconfont">&#xe636;</i>
      </div>
      <div class="item">
        <p>
          <i>*</i>
        </p>
        <Field
          label-class="color8"
          readonly
          clickable
          label="开始时间"
          placeholder="选择时间"
          v-model="TimeValue"
          input-align="right"
          @click="showTime = true"
        />
        <Popup v-model="showTime" position="bottom">
          <DatetimePicker
            type="datetime"
            v-model="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="showTime = false"
            @confirm="showTime = false"
            @change="startTimeChange"
          />
        </Popup>
        <i class="iconfont">&#xe636;</i>
      </div>
      <div class="item">
        <p>
          <i>*</i>
        </p>
        <Field
          label-class="color8"
          readonly
          clickable
          label="结束时间"
          placeholder="选择时间"
          input-align="right"
          v-model="EndTimeValue"
          @click="showEndTime = true"
        />
        <Popup v-model="showEndTime" position="bottom">
          <DatetimePicker
            type="datetime"
            v-model="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="showEndTime = false"
            @confirm="showEndTime = false"
            @change="endTimeChange"
          />
        </Popup>
        <i class="iconfont">&#xe636;</i>
      </div>
      <div class="item">
        <p>
          <i>*</i>
          <span>详细地址</span>
        </p>
        <input type="text" disabled />
      </div>
      <textarea class="txtarea" placeholder="请输入详细地址" v-model="orderContent" />
      <Lines />
      <div class="item">
        <p>
          <i>*</i>
          <span>外出原因</span>
        </p>
        <input type="text" disabled />
      </div>
      <textarea class="txtarea" placeholder="请输入详细说明" v-model="orderReasons" />
      <div @click="upDataOut" class="btn">提交</div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import Lines from "../../components/public/Lines";
import { Toast, Picker, Field, Popup, DatetimePicker } from "vant";
import { getParty, getPartyList, upDataOut } from "../../apis";
export default {
  name: "outregistration",
  data() {
    return {
      TimeValue: "",
      showTime: false,
      EndTimeValue: "",
      showEndTime: false,
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2200, 10, 1),
      currentDate: new Date(),
      userName: "", //姓名
      userOrg: "", //所属支部
      mebId: "", //党员ID
      orderReasons: "", //原因
      orderContent: "" //地址
    };
  },
  methods: {
    //判断是否为党员
    getParty() {
      getParty({
        url: "/fun/partyMember/isMember",
        data: {}
      })
        .then(msg => {
          if (~~msg.code === 1) {
            this.mebId = msg.mebId;
            this.getPartyList();
          } else {
            this.GToast({ message: "网络错误，获取失败" });
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    },
    //获取党员详情
    getPartyList() {
      getPartyList({
        url: "/fun/partyMember/info",
        data: {
          mebId: this.mebId
        }
      })
        .then(msg => {
          if (~~msg.code === 200) {
            this.userName = msg.data.mebName;
            this.userOrg = msg.data.orgName;
          } else {
            this.GToast({ message: "网络错误，获取失败" });
          }
        })
        .catch(err => {
          this.GToast({ message: "网络错误" });
        });
    },
    startTimeChange(e) {
      let endTimeArr = e.getValues(); //["2019", "03", "22", "17", "28"]
      this.TimeValue = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]} ${endTimeArr[3]}:${endTimeArr[4]}:00`;
    },
    endTimeChange(e) {
      let endTimeArr = e.getValues(); //["2019", "03", "22", "17", "28"]
      this.EndTimeValue = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]} ${endTimeArr[3]}:${endTimeArr[4]}:00`;
    },
    //提交
    upDataOut() {
      if (!this.orderContent.trim().length) {
        this.GToast({ message: "请输入地址" });
        return false;
      }
      if (!this.orderReasons.trim().length) {
        this.GToast({ message: "请输入原因" });
        return false;
      }
      upDataOut({
        data: {
          mebId: this.mebId,
          outStartTime: this.TimeValue,
          outEndTime: this.EndTimeValue,
          outAddress: this.orderContent,
          outReason: this.orderReasons
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
    Picker,
    Popup,
    Field,
    DatetimePicker,
    Lines
  },
  created() {
    this.getParty();
  }
};
</script>

<style scoped lang="stylus">
#outregistration {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .item {
    width: 100%;
    height: func(44);
    border-bottom: func(1) solid #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;

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

  .txtarea {
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

  .btn {
    width: 10.84rem;
    height: 1.84rem;
    background: #6cb127;
    margin: 2rem auto 0;
    color: #fff;
    font-size: 0.6rem;
    text-align: center;
    line-height: 1.84rem;
  }
}

.van-cell {
  color: #bfbfbf;
}

.all {
  padding: 0 func(20);
}
</style>
