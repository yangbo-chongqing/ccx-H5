<template>
  <div id="family">
    <MyHeader :title="'家庭信息'" />
    <div class="arBox">
      <div class="area">
        <div class="formwords">
          <img src="http://119.3.196.255:7604/images/iconPic/ic_villagedetail_1.png" />
        </div>
        <div class="picker">
          <p>{{list.householder}}</p>
        </div>
      </div>
      <div class="asta">
        <div class="imgbox">✦</div>
        <p>{{list.poorStatusName}}</p>
      </div>
    </div>
    <!-- 导航 -->
    <div class="navBox">
      <div class="oneNav">
        <div @click="toNewdet">
          <img src="http://119.3.196.255:7604/images/iconPic/ic_wait.png" />
        </div>
        <div @click="toNewdet2">
          <img src="http://119.3.196.255:7604/images/iconPic/ic_edit_3.png" />
        </div>
        <div @click="toNewdet3">
          <img src="http://119.3.196.255:7604/images/iconPic/ic_order.png" />
        </div>
      </div>
      <div class="twoNav">
        <p>家庭成员</p>
        <p>扶贫过程</p>
        <p>扶贫档案</p>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="oneent">
        <div>
          <img src="http://119.3.196.255:7604/images/iconPic/geren6.png" />
        </div>
        <div class="textgg" style="width:86%;margin-left:0;"></div>
      </div>
      <div class="listBox">
        <div class="listone">
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>户主姓名</p>
            <p class="lasttext">{{list.householder}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>贫困状态</p>
            <p class="lasttext">{{list.poorStatusName}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>致贫原因</p>
            <p class="lasttext">{{list.poorReason}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>贫困编号</p>
            <p class="lasttext">{{list.poorNum}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>户主身份证</p>
            <p class="lasttext">{{list.popCard}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>贫困户属性</p>
            <p class="lasttext">{{list.poorTypeName}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>家庭住址</p>
            <p class="lasttext">{{list.nowSiteDetail}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>当前年收入</p>
            <p class="lasttext">{{list.annualIncome}}</p>
          </div>
          <div class="firtlist">
            <div class="imgbox">✦</div>
            <p>生活条件</p>
            <p class="lasttext">{{list.livingConditionName}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/public/MyHeader";
import { getPoorhouse } from "../../apis";
export default {
  name: "family",
  data() {
    return {
      id: "",
      list: []
    };
  },
  methods: {
    getPoorhouse() {
      getPoorhouse({
        url: "/work/helpPoor/getPoorHouse",
        data: {
          id: this.id
        }
      }).then(msg => {
        if (~~msg.code === 0) {
          this.list = msg.data[0];
        } else {
          //获取失败
          this.GToast({ message: "获取失败" });
        }
      });
    },
    toNewdet() {
      let id = this.id;
      this.$router.push({ path: "/familyMember.html", query: { id: id } });
    },
    toNewdet2() {
      let id = this.id;
      this.$router.push({ path: "/processList.html", query: { id: id } });
    },
    toNewdet3() {
      let id = this.id;
      this.$router.push({ path: "/archives.html", query: { id: id } });
    }
  },
  components: {
    MyHeader
  },
  created() {
    this.id = this.$route.query.id;
    this.getPoorhouse();
  }
};
</script>

<style scoped lang="stylus">
#family {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-top: 2rem;

  > img {
    width: 100%;
  }

  .arBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0.5rem;
  }

  .area {
    display: flex;
    align-items: center;
    left: 0.4rem;
    font-size: 0.5rem;
    font-weight: 500;
    padding: 0.6rem 0.5rem 0.8rem 0.5rem;

    .formwords {
      width: 0.7rem;
      height: 0.7rem;
      margin: 0 0.72rem 0 0;
      vertical-align: middle;

      >img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .picker p:first-child {
      color: #6CB127;
      font-size: 0.6rem;
    }
  }

  .asta {
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      color: #6CB127;
      margin-right: 3px;
    }

    p {
      color: #6CB127;
      font-size: 0.5rem;
    }
  }

  .navBox {
    width: 13.8rem;
    height: 4.24rem;
    border: 1px dotted #6CB127;
    padding: 0.6rem 0.8rem 0.7rem 0.85rem;
    box-sizing: border-box;
    margin: 0.8rem 0.6rem 0 0.6rem;

    .oneNav {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .one {
        // height: 100%;
        width: 3rem;
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;

        p {
          color: #444444;
          font-size: 0.6rem;
          display: inline-block;
        }
      }

      div {
        width: 1.8rem;
        height: 1.8rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .twoNav {
      display: flex;
      justify-content: space-between;

      // margin-top: 0.5rem;
      p {
        font-size: 0.6rem;
        color: #6CB127;
      }

      p:nth-child(2) {
        display: inline-block;
      }
    }
  }

  .navBox .oneNav div:nth-child(3) {
    margin-right: 0.3rem;
  }

  .navBox .oneNav div:nth-child(1) {
    margin-left: 0.3rem;
  }

  .content {
    width: 100%;
    margin-top: 0.6rem;

    .oneent {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0.5rem 0 0 0.5rem;
      box-sizing: border-box;

      .textgg {
        width: 10rem;
        height: 1px;
        background: #6CB127;
        margin-left: 0.7rem;
      }

      div {
        width: 0.7rem;
        height: 0.7rem;
        display: flex;
        align-items: center;
        overflow: hidden;
        margin-right: 0.6rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      p {
        color: #8A8A8A;
        font-size: 0.5rem;

        span {
          color: #6CB127;
          font-size: 0.5rem;
        }
      }
    }

    .twoent {
      width: 100%;
      margin: 1rem 0 1rem 0;
      display: flex;
      justify-content: space-between;

      div {
        width: 33.3%;
        text-align: center;
      }
    }
  }

  .bb {
    color: #444444;
    font-size: 0.5rem;
  }

  .aa {
    display: inline-block;
    width: 100%;
    color: #6CB127;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .information {
    width: 100%;
    padding: 0.6rem 0.5rem;

    .inNav {
      display: flex;
      flex-direction: row;
      align-items: center;

      div {
        width: 0.8rem;
        height: 0.8rem;
        display: flex;
        align-items: center;
        overflow: hidden;
        margin-right: 0.6rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      p {
        color: #6CB127;
        font-size: 0.6rem;
      }
    }
  }

  .box {
    width: 100%;
    height: 0.4rem;
    background: #e5e5e5;
  }

  .listBox {
    width: 100%;
    margin-top: 0.8rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    .listone {
      width: 100%;
      padding-left: 1.5rem;

      .firtlist {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        margin-bottom: 0.6rem;

        .imgbox {
          width: 0.6rem;
          height: 0.6rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          margin-right: 3px;
          color: #6CB127;
        }

        p {
          font-size: 0.5rem;
          color: #8A8A8A;
        }

        .lasttext {
          color: #6CB127;
          font-size: 0.5rem;
          position: absolute;
          left: 4rem;
        }
      }
    }
  }
}
</style>
