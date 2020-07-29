<template>
  <div class="zxks">
    <MyHeader :title="'在线考试'" />
    <!-- 未考试 -->
    <div class="tp" v-for="(item, index) in list" :key="index">
      <div v-if="!item.userStatus">
        <div class="tm">
          <span>{{item.examTitle}}</span>
          <span>{{item.statusName}}</span>
        </div>
        <div class="yuan">
          <div>
            <div>
              <div class="aa"></div>
              <div class="bb">{{item.quesNum}}</div>
            </div>
            <p>考题数量</p>
          </div>
          <div>
            <div>
              <div class="aa"></div>
              <div class="bb">{{item.examTime}}</div>
            </div>
            <p>考试时长(分钟）</p>
          </div>
          <div>
            <div>
              <div class="aa"></div>
              <div class="bb">{{item.passScore}}</div>
            </div>
            <p>合格分数</p>
          </div>
        </div>
        <div class="btnBox">
          <button class="btn" @click="startExam(item.examId)">开始考试</button>
        </div>
      </div>
    </div>
    <!-- 已考试 -->
    <div class="tp bl" v-for="(item, index) in listed" :key="'a'+index">
      <div v-if="item.userStatus==1">
        <div class="tm">
          <span>{{item.examTitle}}</span>
          <span>{{item.statusName}}</span>
        </div>
        <div class="yuan">
          <div>
            <div>
              <div class="aa"></div>
              <div class="bb">{{item.quesNum}}</div>
            </div>
            <p>考题数量</p>
          </div>
          <div>
            <div>
              <div class="aa"></div>
              <div class="bb">{{item.examTime}}</div>
            </div>
            <p>考试时长(分钟）</p>
          </div>
          <div>
            <div>
              <div class="aa"></div>
              <div class="bb">{{item.passScore}}</div>
            </div>
            <p>合格分数</p>
          </div>
        </div>
        <div class="btnBox">
          <button class="btn" @click="startExam(item.examId)">重新考试</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/public/MyHeader";
import { getMyExamination } from "@/apis";
export default {
  name: "zxks",
  components: {
    MyHeader
  },
  data() {
    return {
      list: [], //未考
      listed: [] //已考
    };
  },
  methods: {
    getData() {
      let data = {
        type: "app",
        examStatus: 2
      };
      getMyExamination({ data: data, currentObject: this }).then(res => {
        if (res.code == 200) {
          let list = [];
          let listed = [];
          res.data.list.forEach(obj => {
            obj.examTime = Math.round(obj.examTime / 60);
            if (!obj.userStatus) {
              console.log(1111);
              list.push(obj);
            } else {
              listed.push(obj);
            }
          });
          this.list = list;
          this.listed = listed;
        } else {
          this.GToast({ message: res.msg });
        }
      });
    },
    startExam(e) {
      this.$router.push({
        path: "/examination.html",
        query: {
          id: e
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="stylus" scoped>
.zxks {
  width: 100%;
  padding: func(60) func(18);
  box-sizing: border-box;

  .tp.bl {
    background: linear-gradient(301.7deg, #206AFE 0%, #26F5EA 100%);
    box-shadow: 0px 4px 6px rgba(54, 130, 252, 0.2);
  }

  .tp {
    width: func(340);
    height: func(210);
    border-radius: func(10);
    background: linear-gradient(301.7deg, #220BF7 0%, #F7B0FE 100%);
    box-shadow: 0px 4px 6px rgba(66, 42, 248, 0.2);
    padding: func(20) func(16);
    box-sizing: border-box;
    margin-bottom: func(20);

    .tm {
      display: flex;
      justify-content: space-between;

      span {
        color: #ffffff;
        font-size: func(14);
      }
    }

    .yuan {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: func(16) func(0) 0 func(0);
      box-sizing: border-box;

      div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        p {
          white-space: nowrap;
          color: #ffffff;
          font-size: func(16);
        }

        div {
          width: func(54);
          height: func(54);
          border-radius: 50%;
          position: relative;
          padding: func(4);
          box-sizing: border-box;
          margin-bottom: func(8);

          .aa {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #ffffff;
            opacity: 0.6;
          }

          .bb {
            width: 100%;
            height: 100%;
            background: #ffffff;
            text-align: center;
            line-height: func(38);
            font-size: func(18);
            color: #462FF8;
          }
        }
      }
    }

    .btnBox {
      width: 100%;
      text-align: center;
      margin-top: func(12);

      .btn {
        display: inline-block;
        width: func(124);
        line-height: func(40);
        color: #6CB127;
        text-align: center;
        font-size: func(14);
        background: #ffffff;
        border-radius: func(5);
      }
    }
  }
}
</style>