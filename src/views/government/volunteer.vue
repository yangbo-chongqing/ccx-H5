<template>
  <div class="volunteer">
    <MyHeader :title="'志愿者服务'" />
    <div class="topmenu">
      <div @click="changeMenu(1)">
        <p :class="menu == 1 ? 'active' : ''">未开始</p>
        <span v-if="menu == 1"></span>
      </div>
      <div @click="changeMenu(2)">
        <p :class="menu == 2 ? 'active' : ''">进行中</p>
        <span v-if="menu == 2"></span>
      </div>
      <div @click="changeMenu(3)">
        <p :class="menu == 3 ? 'active' : ''">已结束</p>
        <span v-if="menu == 3"></span>
      </div>
    </div>
    <!-- 未开始 -->
    <div class="noBegin" v-show="menu == 1">
      <ul>
        <li v-for="(item, index) in showList" :key="index" @click="isPostulant(item)">
          <div class="tit" v-text="item.title" />
          <div class="imgbox">
            <img :src="item.content_pic | formatImg" alt srcset />
          </div>
          <div class="txtBox">
            <h6 v-text="item.introduction" />
            <div class="mess">
              <span>距离活动开始时间</span>
              <p>{{full(item.start_time)}}天</p>
              <!--                            <span class="mar"></span>-->
              <!--                            <span>还差</span> <p>{{ item.pop_num - item.signUserNum}}人</p>-->
              <!--                            <span></span>-->
            </div>
          </div>
          <div class="timeBtn">
            <p>活动时间：{{item.start_time | formatCurrentTime}}~{{item.end_time | formatCurrentTime}}</p>
            <!--                        <button @click.stop="toSignUp(item)">报名</button>-->
          </div>
        </li>
      </ul>
    </div>
    <!-- 进行中 -->
    <div class="ing" v-show="menu == 2">
      <ul>
        <li v-for="(item, index) in showList" :key="index" @click="toDetails(item)">
          <div class="tit">{{ item.title }}</div>
          <div class="imgbox">
            <img :src="item.content_pic | formatImg" alt srcset />
          </div>
          <div class="txtBox">
            <h6 v-text="item.introduction" />
            <div class="mess spaceBetween">
              <div style="visibility: hidden">
                <!--                                <p>2人</p>-->
                <!--                                <span>未签到</span>-->
              </div>
            </div>
          </div>
          <div class="timeBtn" @click="isPostulant(item)">
            <p>活动时间：{{ item.start_time | formatCurrentTime}}~{{ item.end_time | formatCurrentTime}}</p>
            <!--                        <button class="ing">签到</button>-->
          </div>
        </li>
      </ul>
    </div>
    <!-- 已结束 -->
    <div class="over" v-show="menu == 3">
      <ul>
        <li v-for="(item, index) in showList" :key="index" @click="toDetails(item)">
          <div class="imgbox">
            <img :src="item.content_pic | formatImg" alt srcset />
          </div>
          <h5>{{ item.title }}</h5>
          <h6>{{ item.ac_content }}</h6>
          <div class="other spaceBetween">
            <div>
              <p>浏览量：</p>
              <span>{{ item.read_count }}</span>
            </div>
            <div>
              <p>{{ item.create_time | formatTime}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import MyHeader from "../../components/public/MyHeader";
import { getVolunteerList, isPostulant } from "../../apis";
import { Dialog } from "vant";
const baseUrl = "http://www.mlxc365.com";
export default {
  name: "volunteer",
  components: {
    MyHeader,
    Dialog
  },
  data() {
    return {
      menu: 0, //1未开始，2进行中，3已结束
      showList: [] //展示列表
    };
  },
  methods: {
    //切换
    async changeMenu(index) {
      let data = { activity_type: 2, app: true };
      switch (index) {
        case 1: //未开始
          data.getNew = true;
          break;
        case 2: //进行中
          data.getActivityNow = true;
          break;
        default:
          data.getFinish = true;
      }

      await getVolunteerList({ data, currentObject: this }).then(msg => {
        if (~~msg.status === 200) {
          msg = msg.data.list;
          this.showList = msg;
        }
      });

      this.menu = index;
    },
    //跳转任务详情
    toDetails(obj) {
      window.sessionStorage.setItem("volunteerInfo", JSON.stringify(obj));
      this.$router.push("/detailsVer.html");
    },
    //跳转报名
    toSignUp() {
      this.$router.push("/BeVolunteer.html");
    },
    //获取志愿服务列表
    getVolunteerList(data) {
      getVolunteerList({
        data,
        currentObject: this
      }).then(msg => {
        //筛选
        const now = new Date();
        /* if(~~msg.code === 0 && ~~msg.status === 200){
                         msg = msg.data.list;
                         msg.forEach(item => {
                             if(item.ac_pic && item.ac_pic !== "null"){
                                 item.showImg = item.ac_pic.split(";")[0];
                                 if(item.showImg.indexOf("http") === -1){
                                     item.showImg = baseUrl + item.showImg;
                                 }
                             }else {
                                 item.showImg = require("../../assets/img/noImg.png");
                             }
                         })
                         //获取还未进行的
                         this.will = msg.filter(item =>{
                             return new Date(item.create_date) > now;
                         })
                         //获取已完成的
                         this.end = msg.filter(item =>{
                             return new Date(item.deadline) < now;
                         })
                         //获取进行中的
                         this.progress = msg.filter(item =>{
                             return new Date(item.deadline) > now && new Date(item.create_date) < now;
                         })
                     }*/
      });
    },
    //是否是志愿者
    isPostulant(obj) {
      isPostulant()
        .then(msg => {
          if (~~msg.status === 200 && ~~msg.code === 0) {
            msg = msg.data;
            if (msg.length === 0) {
              //弹窗是否报名成为志愿者
              Dialog.confirm({
                title: "温馨提示",
                message: "您还不是志愿者，是否报名成功志愿者？"
              })
                .then(() => {
                  // on confirm

                  this.toSignUp();
                })
                .catch(() => {
                  // on cancel
                });
            } else {
              //是志愿者进行跳转
              if (msg[0].audit_status == 0) {
                Dialog.confirm({
                  title: "温馨提示",
                  message: "您还不是志愿者，请等待管理员审核!"
                });
                return;
              }
              this.toDetails(obj);
            }
          } else {
            //检验失败
            this.GToast({ message: "检验失败" });
          }
        })
        .catch(err => {
          //网络错误
          this.GToast({ message: "网络错误" });
        });
    }
  },
  created() {
    this.changeMenu(1);
  },
  computed: {
    full(a) {
      return function(a) {
        // var thisTime = a.split(" ")[0];
        var thisTime = a.replace(/-/g, "/"); //转换为时间戳
        var times = new Date(thisTime);
        times = times.getTime();
        var timestamp = new Date().getTime();
        console.log(times);
        console.log(timestamp);
        times = times - timestamp;
        times = parseInt(times / 3600000 / 24);
        return times;
      };
    }
  },
  filters: {
    formatTime(date) {
      let index = date.lastIndexOf(" "); //截取空格前的年月日  不要具体的时间
      return date.substring(0, index);
    },
    //剩余时间
    surplus(time) {
      var thisTime = time.replace(/-/g, "/"); //转换为时间戳
      var times = new Date(thisTime);
      return times.getTime();
    },
    formatCurrentTime(date) {
      let index = date.lastIndexOf(" "); //截取空格前的年月日  不要具体的时间
      return date.substring(0, index);
    }
  }
};
</script>
<style lang="stylus" scoped>
.spaceBetween {
  display: flex;
  justify-content: space-between;
}

.volunteer {
  min-height: 100vh;
  background: #f8f8f8;
  padding-top: func(44);
  box-sizing: border-box;

  .topmenu {
    min-width: 320px;
    // width: 375px;
    height: func(44);
    /* position fixed
    top func(44)
    left 50%
    transform translateX(-50%) */
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    z-index: 2;

    div {
      position: relative;
      width: 50%;
      text-align: center;

      p {
        font-size: func(14);
        color: #8A8A8A;
        line-height: func(44);
      }

      p.active {
        color: #6CB127;
      }

      span {
        width: func(20);
        height: func(3);
        background: #6CB127;
        position: absolute;
        left: 0;
        right: 0;
        bottom: func(6);
        margin: auto;
        box-shadow: 0 0 func(4) #6CB127;
        border-radius: func(2);
      }
    }
  }

  .noBegin, .ing {
    ul {
      li {
        min-height: func(184);
        background: #ffffff;
        box-sizing: border-box;
        padding-left: func(12);
        margin-top: func(8);
        position: relative;

        .tit {
          border-bottom: 1px solid #F5F5F5;
          line-height: func(40);
          font-size: func(16);
          color: #444444;
          nLine(1);
        }

        .imgbox {
          width: func(110);
          height: func(80);
          border-radius: 2px;
          overflow: hidden;
          position: absolute;
          top: func(53);
          left: func(15);

          img {
            width: 100%;
            height: 100%;
          }
        }

        .txtBox {
          width: func(223);
          position: absolute;
          right: func(15);
          top: func(53);

          h6 {
            font-size: func(14);
            color: #444444;
            nLine(3);
            font-weight: normal;
          }

          .mess {
            margin-top: func(5);

            span {
              display: inline-block;
              font-size: func(12);
              color: #8A8A8A;
            }

            span.mar {
              margin: 0 func(5);
            }

            p {
              display: inline-block;
              font-size: func(12);
              color: #D33333;
            }
          }
        }

        .timeBtn {
          width: 100%;
          position: absolute;
          bottom: func(14);
          left: 0;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 func(15);

          p {
            font-size: func(12);
            color: #8A8A8A;
            line-height: func(24);
          }

          button {
            width: func(50);
            line-height: func(24);
            border-radius: func(12);
            background: #3E95F4;
            color: #ffffff;
            font-size: func(10);
          }

          button.yes {
            background: #DADADA;
          }

          button.ing {
            background: #D33333;
          }

          button.ingYes {
            background: none;
            border: 1px solid #FF9900;
            color: #FF9900;
          }
        }
      }
    }
  }

  .over {
    margin-top: func(8);
    background: #ffffff;
    box-sizing: border-box;
    padding-left: func(15);
    background: #ffffff;

    ul {
      li {
        min-height: func(122);
        border-bottom: 1px solid #F5F5F5;
        position: relative;
        box-sizing: border-box;
        padding-left: func(122);
        padding-top: func(12);
        padding-right: func(15);

        .imgbox {
          width: func(110);
          height: func(86);
          position: absolute;
          left: 0;
          top: func(16);
          overflow: hidden;
          border-radius: 2px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        h5 {
          width: 100%;
          display: block;
          font-size: func(16);
          color: #444444;
          font-weight: 500;
          nLine(1);
        }

        h6 {
          width: 100%;
          display: block;
          font-size: func(14);
          color: #444444;
          font-weight: normal;
          nLine(2);
          margin-top: func(3);
        }

        .other {
          margin-top: func(3);

          p {
            color: #8A8A8A;
            font-size: func(12);
            display: inline;
          }

          span {
            color: #D33333;
            font-size: func(12);
            display: inline;
          }
        }
      }
    }
  }
}
</style>
